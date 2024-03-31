import { DatabaseConnection, DatabaseOperation, NoRecordError, UniqueFieldRepeated, UserNotAllowed, ValidationError, NullTokenError, InvalidToken } from "../classes/Errors"

// This is the function that handles all the custom Error classes instanced for the server. Gets the error, checks it's type and return a response depending on that type.
// I could implement that logic in any response catch on server routes, but I think this way is much more effective and maintanable than implementing it directly on the routes.
export const handleError = (error: any) => {
    if(error instanceof DatabaseConnection){
        console.error(`⛔️ ⛔️ ⛔️[CRITICAL ERROR]: \nImpossible to connect to the database...: \n${error.message} `)
        return {error: error.name, message: error.message, data: null}
    }else if(error instanceof DatabaseOperation){
        console.error(`⛔️ ⛔️ ⛔️[CRITICAL ERROR]: \nImpossible to operate with the database...: \n${error.message} `)
        return {error: error.name, message: error.message, data: null}
    }else if(error instanceof ValidationError){
        return {error: error.name, message: error.message, data: null}
    }else if(error instanceof NoRecordError){
        return {error: error.name, message: error.message, data: null}
    }else if(error instanceof UserNotAllowed){
        console.warn(`⛔️[WARNING]: \nUser not allowed trying to access to the platform: \n${error.message} `)
        return {error: error.name, message: error.message, data: null}
    }else if(error instanceof UniqueFieldRepeated){
        return { error: error.name, message: error.message, data: null}
    }else if(error instanceof NullTokenError || error instanceof InvalidToken){
        console.warn(`⛔️[WARNING]: \nUser without authorization trying to query on the platform: \n${error.message} at ${new Date().getTime()}`)
        return { error: error.name, message: error.message, data: null}
    }else{
        console.error(`⛔️ ⛔️ ⛔️[INTERNAL SERVER ERROR]: \nUnidentified internal server error.`)
        console.error(error)
        return {error: 'Internal server error', message: 'Internal server error', data: null}
    }
}