import { Router } from "express"
import { NoRecordError } from "../../globals/classes/Errors"
import { handleError } from "../../globals/assets/libs"
import employeeController from "../controllers/employee.controller"

const router = Router()

// This route handles the delete action for employee model. It gets an id field generated by the database in order to check which employee to delete.
export const deleteEmployee = router.delete(`/deleteEmployee/:employee`, /*verifyToken,*/ async (req, res) => {
    const { employee } = req.params
    try{
        const deleted = await employeeController(undefined, 'Delete', employee)

        if(deleted.error === null){
            res.status(200).json(deleted)
        }else{
            throw new NoRecordError('Empleado no encontrado.')
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