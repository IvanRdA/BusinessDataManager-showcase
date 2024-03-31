import { Router } from 'express'
import { REGEX } from '../../globals/assets/regex'
import { ValidationError } from '../../globals/classes/Errors'
import { handleError } from '../../globals/assets/libs'
import loginController from '../controllers/login.controller'

const router = Router()

// This route will handle the login logic. It gets a request with email and password fields and if they matches the validations, it generates a token and a valid login process.
export const loginRoute = router.post(`/login`, async (req, res) => {
    try{
        const { email, password } = req.body
    
        if(!REGEX.emailString.test(email)){
            throw new ValidationError('El campo email no tiene un formato válido.')
        }
        else if(!REGEX.rawPassword.test(password)){
            throw new ValidationError('El campo contraseña no tiene un formato válido.')
        }

        const response = await loginController(email, password)
        if(response.error === null){
            res.status(200).json(response)
        }else{
            res.status(401).json(response)
        }

    }catch(error: any){
        const handleled = handleError(error)
        if(handleled.error === 'Database operation error' || handleled.error === 'Database connection error'){
            res.status(500).json(handleled)
        }else if(handleled.error === 'Field validation error' || handleled.error === 'No record error'){
            res.status(400).json(handleled)
        }else if(handleled.error === 'Null token' || handleled.error === 'Invalid token'){
            res.status(401).json(handleled)
        }else{
            res.status(304).json(handleled)
        }
    }
})