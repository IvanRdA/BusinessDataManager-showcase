import { handleError } from "../../globals/assets/libs"
import { DatabaseOperation, NoRecordError, UserNotAllowed } from "../../globals/classes/Errors"
import EMPLOYEE from "../models/employee.model"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export type APIResponse = {
    error: string | null
    message: string | null
    data: any
}

// Login controller file. This checks the inputs received and compare to the database registered information. Then checks if the role of the user matches some restrictions and if so returns the token to localStorage.
export default async function loginController(email: string, password: string): Promise<APIResponse> {
    try{
        const checkedEmail = await EMPLOYEE.findOne({'info.email': email}).catch((e: any) => {
            throw new DatabaseOperation('No se puede comparar el email del empleado en la base de datos. Pruebe de nuevo más tarde.')
        })
        
        if(checkedEmail === null || checkedEmail === undefined){
            throw new NoRecordError('No se encuentra a ningún empleado con ese email asignado.')
        }else{
            const hashed = checkedEmail?.info?.password ?? ''
            const passValidate = await bcrypt.compare(password, hashed)
            const role = checkedEmail?.contractual?.role ?? ''
            const mail = checkedEmail?.info?.email ?? ''
            
            if(passValidate){
                if(role !== 'Director'){
                    throw new UserNotAllowed(`El usuario ${mail} no está autorizado a iniciar sesión.`)
                }else{
                    const secret: string = process.env.SECRET_TOKEN as string
                    const token = jwt.sign({ userId: checkedEmail._id, email: email }, secret, { expiresIn: '2h' })
                    
                    return {error: null, message: 'Login correcto.', data: {name: `${checkedEmail.info?.surName}, ${checkedEmail.info?.firstName}`, token: token}}
                }
            }else{
                throw new NoRecordError('Las contraseñas no coinciden.')
            }
        }
    }catch(error){
        return handleError(error)
    }
}