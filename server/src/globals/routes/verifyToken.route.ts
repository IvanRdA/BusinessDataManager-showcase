import { Router } from "express";
import { NullTokenError, InvalidToken } from "../classes/Errors";
import jwt from 'jsonwebtoken'
import { handleError } from "../assets/libs";

const router = Router()

// This is the route that verifies a token. Is created just for showcasing purposes because the real one is not implemented yet.
export const verifyTokenRoute = router.get(`/verifyTokenRoute`, async (req, res) => {
    try{
        const token = req.header('Authorization')
        const secret: string = process.env.SECRET_TOKEN as string
    
        if(!token){
            throw new NullTokenError('Token requerido para validación de seguridad.')
        }

        try{
            const decoded = jwt.verify(token, secret)
            res.status(200).json({error: null, message: 'Token válido.', data: true})
        }catch(jwtError: any) {
            throw new InvalidToken('Sin autorización. Token inválido.')
        }
    }catch(error: any){
        res.status(401).json(handleError(error))
    } 
})