import { Router } from "express"
import { NoRecordError } from "../../globals/classes/Errors"
import { handleError } from "../../globals/assets/libs"
import { validateEmployeeFields } from "../assets/libs"
import employeeController from "../controllers/employee.controller"


const router = Router()

// This route handles the update operation for employee model. This sends to the controller the action "Update" and then the method proceeds with this action instead of the creation one.
export const updateEmployee = router.put(`/updateEmployee/:employee`, /*verifyToken,*/ async (req, res) => {
    const { employee } = req.params
    const { subset } = req.query
    try{
        let updated: any = {}

        if(subset === 'Holidays'){
            const fieldsValidation = validateEmployeeFields(req.body.state, 'Update', 'Holidays')
            if(fieldsValidation !== true){
                res.status(400).json(fieldsValidation)
            }else {
                updated = await employeeController(req.body.state, 'Update', employee, 'Holidays')
    
                if(updated.error === null){
                    res.status(200).json(updated)
                }else{
                    throw new NoRecordError('Empleado no encontrado.')
                }
            }
        }else{
            const fieldsValidation = validateEmployeeFields(req.body.state, 'Update')
            if(fieldsValidation !== true){
                res.status(400).json(fieldsValidation)
            }else {
                updated = await employeeController(req.body.state, 'Update', employee)
    
                if(updated.error === null){
                    res.status(200).json(updated)
                }else{
                    throw new NoRecordError('Empleado no encontrado.')
                }
            }
        }


    }catch(error: any){
        const handleled = handleError(error)
        if(handleled.error === 'Database operation error' || handleled.error === 'Database connection error'){
            res.status(500).json(handleled)
        }else{
            res.status(400).json(handleled)
        }
    }
})