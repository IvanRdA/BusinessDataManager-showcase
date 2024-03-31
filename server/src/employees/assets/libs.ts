import { REGEX } from "../../globals/assets/regex"
import { ValidationError } from "../../globals/classes/Errors"
import { APIResponse } from "../controllers/login.controller"
import { handleError } from "../../globals/assets/libs"

// Valiedation function for the employees data requests. This is still unfinished but at the time works with the implemented sections on the client side.
export const validateEmployeeFields = (fields: any, method: string, subset?: string): APIResponse | boolean => {
    if(subset === 'Holidays'){
        return true
    }

    const { firstName, surName, dni, ssAffiliation, email, password, phone} = fields.info
    const { type, hours, duration, role, category, monthlyCost} = fields.contractual
    const { assignedTeam, turnAssigned } = fields.business



    try{
        if(!REGEX.firstNameString.test(firstName)){
            throw new ValidationError('El campo nombre no tiene un formato válido.')
        }
        if(!REGEX.fullNameString.test(surName)){
            throw new ValidationError('El campo apellido no tiene un formato válido.')
        }
        if(!REGEX.dniString.test(dni)){
            throw new ValidationError('El campo dni no tiene un formato válido.')
        }
        if(!REGEX.ssString.test(ssAffiliation)){
            throw new ValidationError('El campo afiliación a SS no tiene un formato válido.')
        }
        if(!REGEX.emailString.test(email)){
            throw new ValidationError('El campo email no tiene un formato válido.')
        }
        if(method !== 'Update' && !REGEX.rawPassword.test(password)){
            throw new ValidationError('El campo contraseña no tiene un formato válido.')
        }
        if(!REGEX.phoneString.test(phone)){
            throw new ValidationError('El campo teléfono no tiene un formato válido.')
        }
        if(!REGEX.contractType.test(type)){
            throw new ValidationError('El campo tipo de contrato no tiene un formato válido.')
        }
        if(isNaN(hours) || hours < 0){
            throw new ValidationError('El campo horas no tiene un formato válido.')
        }
        if(isNaN(duration) || duration < 0){
            throw new ValidationError('El campo duración del contrato no tiene un formato válido.')
        }
        if(!REGEX.roleString.test(role)){
            throw new ValidationError('El campo rol no tiene un formato válido.')
        }
        if(!REGEX.roleString.test(category)){
            throw new ValidationError('El campo categoría no tiene un formato válido.')
        }
        if(isNaN(monthlyCost) || monthlyCost < 0){
            throw new ValidationError('El campo coste mensual no tiene un formato válido.')
        }
            if(!REGEX.assignedEmployeeTeam.test(assignedTeam)){
                throw new ValidationError('El campo equipo asignado no tiene un formato válido.')
            }
            if(!REGEX.assignedEmployeeTurn.test(turnAssigned)){
                throw new ValidationError('El campo turno asignado no tiene un formato válido.')
            }
        return true
    }catch(error: any) {
        return handleError(error)
    }
}