import express from 'express'
import dotenv from 'dotenv'
import connectDB from './cofig/db.js'
import colors from 'colors'
import productRoutes from './routes/productRoutes.js'
import usersRoutes from './routes/usersRoute.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.get('/', (req, res)=>{
    res.send("API running..")
})

app.use('/api/products', productRoutes)
app.use('/api/users', usersRoutes)

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000 

app.listen(PORT, console.log('server running in dev or 5000'))