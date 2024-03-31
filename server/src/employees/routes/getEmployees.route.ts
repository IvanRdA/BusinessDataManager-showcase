import { Router } from "express"
import { DatabaseOperation, NoRecordError } from "../../globals/classes/Errors"
import EMPLOYEE from "../models/employee.model"
import { handleError } from "../../globals/assets/libs"

const router = Router()

// * OBTAIN ALL THE EMPLOYEES REGISTERED IN THE DATABASE
export const getAllEmployees = router.get(`/getAllEmployees`, /*verifyToken,*/ async (_req, res) => {
    try{
        const allEmployees = await EMPLOYEE.find().catch((e: any) => {
            throw new DatabaseOperation('No se puede obtener todos los empleados de la base de datos. Pruebe de nuevo más tarde.')
        })

        if(allEmployees !== null || allEmployees !== undefined){
            res.status(200).json({error: null, message: null, data: allEmployees})
        }else{
            throw new NoRecordError('Empleados no encontrados.')
        }
    }catch(error){
        const handleled = handleError(error)
        if(handleled.error === 'Database operation error' || handleled.error === 'Database connection error'){
            res.status(500).json(handleled)
        }else{
            res.status(400).json(handleled)
        }
    }
})

// * OBTAIN AN EMPLOYEE BY HIS _id FIELD REGISTERED IN THE DATABASE
export const getSingleEmployee = router.get(`/getSingleEmployee/:employee`, /*verifyToken,*/ async (req, res) => {
    try{
        const { employee } = req.params
        const singleEmployee = await EMPLOYEE.findOne({_id: employee}).catch((e: any) => {
            console.log(e)
            throw new DatabaseOperation('No se puede obtener el empleado de la base de datos. Pruebe de nuevo más tarde.')
        })

        if(singleEmployee !== null){
            singleEmployee.info.password = ''
            res.status(200).json({error: null, message: null, data: singleEmployee})
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