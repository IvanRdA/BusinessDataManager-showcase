import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { NullTokenError, InvalidToken } from '../classes/Errors'
import { handleError } from './libs'

// This middleware verifies the request JSON Web Token and proceeds to the route or not depending on the validity of the token.
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try{
        const token = req.header('Authorization')
        const secret: string = process.env.SECRET_TOKEN as string
    
        if(!token){
            throw new NullTokenError('Token requerido para validación de seguridad.')
        }

        try{
            const decoded = jwt.verify(token, secret)
            next()
        }catch(jwtError: any) {
            throw new InvalidToken('Sin autorización. Token inválido.')
        }
    }catch(error: any){
        res.status(401).json(handleError(error))
    } 
}