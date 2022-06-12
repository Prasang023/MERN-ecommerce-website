import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './cofig/db.js'
import colors from 'colors'
import productRoutes from './routes/productRoutes.js'
import usersRoutes from './routes/usersRoute.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
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
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID)
})

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000 

app.listen(PORT, console.log('server running in dev or 5000'))