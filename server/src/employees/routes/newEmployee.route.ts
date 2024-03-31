import { Router } from 'express'
import { handleError } from '../../globals/assets/libs'
import employeeController from '../controllers/employee.controller'
import { validateEmployeeFields } from '../assets/libs'

const router = Router()

// This route handles the employee creation process. Takes the fields from the request that comes from the client side, validates they and then store the result into the database if all went good.
export const newEmployeeRoute = router.post(`/newEmployee`, /*verifyToken*/ async (req, res) => {
    try{
        const fieldsValidation = validateEmployeeFields(req.body.state, 'Create')
        if(fieldsValidation !== true){
            res.status(400).json(fieldsValidation)
        }else{
            const registration = await employeeController(req.body.state, 'Create')
            if(registration.error === null){
                res.status(200).json(registration)
            }else{
                res.status(400).json(registration)
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