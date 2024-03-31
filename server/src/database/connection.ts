import mongoose from 'mongoose'
import { DatabaseConnection } from '../globals/classes/Errors'

// This is the method that connects the server with the instance of the database. For now it runs locally, but changing the environment value to a real URI will connect the server to a real database.
// The method includes an asset function that retries the connection up to 5 times in a 2 seconds time span if anything fails trying to connect. If retries get to 5 the function returns an internal server error.
const dbConnection = async (maxTries: number = 6): Promise<void> => {
    const dbURI = process.env.DB_URI ?? ''
    let currTry = 1

    const connectWithRetry = async (): Promise<void> => {
        try{
            const conn = await mongoose.connect(dbURI)
            if (conn) {
                console.log('⚡️[SERVER SAYS]: \nDatabase connected successfully.')
                return
              }
        }catch (error: any) {
            console.error(
              `⛔️[ERROR]: \nError connecting to database: ${error.message}`
            )
            if (currTry < maxTries) {
              console.log(
                `⚡️[SERVER SAYS]: \nRetrying database connection (Retry ${currTry}/${
                  maxTries - 1
                })...`
              )
              currTry += 1
              await new Promise((resolve) => setTimeout(resolve, 2000))
              return connectWithRetry()
            } else {
              throw new DatabaseConnection('Se ha excedido el número de reintentos de conexión a la base de datos. Vuelva a probarlo más tarde.')
            }
          }
        }
        try {
          await connectWithRetry()
        } catch (error: any) {
          if (error instanceof DatabaseConnection) {
            console.log(
              `⛔️ ⛔️ ⛔️[CRITICAL ERROR]: \nImpossible to connect to the database... ${error.message} `
            )
            return
          }
    }
}

export default dbConnection