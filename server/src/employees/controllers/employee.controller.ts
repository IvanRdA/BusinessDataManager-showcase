import { APIResponse } from "./login.controller";
import { DatabaseOperation, UniqueFieldRepeated, NoRecordError } from "../../globals/classes/Errors";
import EMPLOYEE from "../models/employee.model";
import bcrypt from 'bcrypt'
import { handleError } from "../../globals/assets/libs";

// This function is the main controller for the employees section of the app. It gets some parameters to work with as the fields of the requests, the action to make on the database and a subset if the request
// is not a full employee data update or create operation.
export default async function employeeController(fields: any, action: string, id?: string, subset?: string): Promise<APIResponse> {
    try{

        if (subset === 'Holidays') {
            try {
                const uniqueEmail = await EMPLOYEE.findOne({ _id: id });
        
                if (!uniqueEmail || uniqueEmail._id.toString() !== id) {
                    throw new UniqueFieldRepeated('Este email ya está registrado.');
                }
        
                const updatedHolidays = {
                    ...uniqueEmail?.business?.registers,
                    [fields.year]: fields[fields.year],
                };
        
                const updatedEmployee = await EMPLOYEE.findOneAndUpdate(
                    { _id: id },
                    { $set: { 'business.registers': updatedHolidays } },
                    { new: true } 
                );
        
                if (updatedEmployee) {
                    console.log(updatedEmployee);
                    return { error: null, message: 'Vacaciones actualizadas correctamente.', data: null };
                } else {
                    throw new NoRecordError('Empleado no encontrado.');
                }
            } catch (error) {
                console.error(error);
                throw new DatabaseOperation('No se puede actualizar el empleado de la base de datos. Pruebe de nuevo más tarde.');
            }
        }


        if(action === 'Delete'){
            const deleted = await EMPLOYEE.findOneAndDelete({_id: id}).catch((e: any) => {
                throw new DatabaseOperation('No se puede eliminar el empleado de la base de datos. Pruebe de nuevo más tarde.')
            })

            if(deleted !== null){
                return {error: null, message: 'Empleado eliminado correctamente.', data: null}
            }else{
                throw new NoRecordError('Empleado no encontrado.')
            }
        }

        
        const { dni, ssAffiliation, email, password } = fields.info
        // UNIQUE FIELDS VALIDATION
        const uniqueEmail = await EMPLOYEE.findOne({'info.email': email}).catch((e: any) => {
            throw new DatabaseOperation('No se puede comparar el email con la base de datos. Pruebe de nuevo más tarde.')
        })
        if(uniqueEmail !== null && uniqueEmail._id.toString() !== id){
            throw new UniqueFieldRepeated('Este email ya está registrado.')
        }
        const uniqueDni = await EMPLOYEE.findOne({'info.dni': dni}).catch((e: any) => {
            throw new DatabaseOperation('No se puede comparar el email con la base de datos. Pruebe de nuevo más tarde.')
        })
        if(uniqueDni !== null && uniqueDni._id.toString() !== id){
            throw new UniqueFieldRepeated('Este DNI ya está registrado.')
        }
        const uniqueSS = await EMPLOYEE.findOne({'info.ssAffiliation': ssAffiliation}).catch((e: any) => {
            throw new DatabaseOperation('No se puede comparar el email con la base de datos. Pruebe de nuevo más tarde.')
        })
        if(uniqueSS !== null &&  uniqueSS._id.toString() !== id){
            throw new UniqueFieldRepeated('Este número de afiliación a SS ya está registrado.')
        }
    
        // HASH PASSWORD
        const salt = 10
        const hashedPassword = await bcrypt.hash(password, salt)
        fields.info.password = hashedPassword

        if(action === 'Create'){
            const storedEmployee = new EMPLOYEE(fields)
            await storedEmployee.save().catch((e: any) => {
                console.log(e)
                if(e.name === 'MongoServerError'){
                    throw new UniqueFieldRepeated('Valor único ya registrado. Revise la información e inténtelo de nuevo.')
                }
                throw new DatabaseOperation('No se puede registrar el empleado en la base de datos. Pruebe de nuevo más tarde.')
            })
            return { error: null, message: 'Empleado registrado correctamente.', data: null }
        }else if(action === 'Update'){
            const passwordHandleler = await EMPLOYEE.findOne({_id: id}).catch((e: any) => {
                throw new DatabaseOperation('No se puede comparar el id con la base de datos. Pruebe de nuevo más tarde.')
            })
            const storedPassword = passwordHandleler?.info?.password
            fields.info.password = storedPassword

            const updated = await EMPLOYEE.findOneAndUpdate({_id: id}, fields).catch((e: any) => {
                throw new DatabaseOperation('No se puede actualizar el empleado de la base de datos. Pruebe de nuevo más tarde.')
            })
    
            if(updated !== null){
                return {error: null, message: 'Empleado actualizado correctamente.', data: null}
            }else{
                throw new NoRecordError('Empleado no encontrado.')
            }
        }else {
            return {error: null, message: null, data: null}
        }
    
    }catch(error: any){
        return handleError(error)
    }
}