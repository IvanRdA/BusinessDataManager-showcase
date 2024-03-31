import { Schema, model } from 'mongoose'
import { REGEX } from '../../globals/assets/regex'

// This is the employee model for the database.
const employeeModel = new Schema({
    info: {
        firstName: {type: String, required: true, validate: REGEX.firstNameString},
        surName: {type: String, required: true, validate: REGEX.fullNameString},
        dni: {type: String, required: true, unique: true, validate: REGEX.dniString},
        ssAffiliation: {type: String, required: true, unique: true, validate: REGEX.ssString},
        dob: {type: Date},
        email: {type: String, required: true, unique: true, validate: REGEX.emailString},
        password: {type: String, required: true, default: 'Testing4Password$Default', validate: REGEX.rawPassword},
        phone: {type: String, required: true, validate: REGEX.phoneString},
    },
    contractual: {
        startedAt: {type: Date},
        type: {type: String, required: true, validate: REGEX.contractType},
        hours: {type: Number, min: 1, max: 40, default: 30},
        duration: {type: Number, min: 0, max: 24, default: 9},
        finishAt: {type: Date},
        role: {type: String, required: true, validate: REGEX.roleString, default: 'Camarero'},
        category: {type: String, validate: REGEX.roleString},
        monthlyCost: {type: Number, min: 0},
        nextPossibleReturn: {type: Date},
        lastActivation: { type: Date}
    
    },
    business: {
        assignedTeam: {type: String, default: 'Sala', validate: REGEX.assignedEmployeeTeam},
        turnAssigned: {type: String, default: 'Comodín', validate: REGEX.assignedEmployeeTurn},
        isActive: {type: Boolean, default: true},
        // ! UPDATE VALIDATION FUNCTION WITH NEW FIELDS FROM HERE TO BOTTOM
        registers: 
            {
                type: Schema.Types.Mixed,
                default: {},
            },
    },
})

const EMPLOYEE = model('Employee', employeeModel)

export default EMPLOYEE