// * SETTINGS
import {} from 'dotenv/config'
import dotenv from 'dotenv'
dotenv.config()

import morgan from 'morgan'
import cors from 'cors'
import Express from 'express'
import dbConnection from './database/connection'
import { getAllEmployees, getSingleEmployee } from './employees/routes/getEmployees.route'
import { loginRoute } from './employees/routes/login.route'
import { newEmployeeRoute } from './employees/routes/newEmployee.route'
import { deleteEmployee } from './employees/routes/deleteEmployee.route'
import { updateEmployee } from './employees/routes/updateEmployee.route'
import { getAllSales, getSingleSale } from './sales/routes/getSales.route'
import { newSale } from './sales/routes/newSale.route'
import { updateSale } from './sales/routes/updateSale.route'
import { deleteSale } from './sales/routes/deleteSale.route'
import { verifyTokenRoute } from './globals/routes/verifyToken.route'

const port = process.env.PORT ?? 8080

const app = Express()

// * DB CONNECTION
dbConnection()

// * MIDDLEWARES
app.use(Express.json())
app.use(morgan(process.env.WORK_MODE ?? 'dev'))
app.use(cors())

// * ROUTES
// EMPLOYEES
app.use(loginRoute)
app.use(getAllEmployees)
app.use(getSingleEmployee)
app.use(newEmployeeRoute)
app.use(deleteEmployee)
app.use(updateEmployee)
// SALES
app.use(getAllSales)
app.use(getSingleSale)
app.use(newSale)
app.use(updateSale)
app.use(deleteSale)

app.use(verifyTokenRoute)

// * RUNNING-UP SERVER
app.listen(port, () => {
    console.log(`⚡️[SERVER SAYS]: \nWELCOME! Server is listening on port ${port}.`)
})