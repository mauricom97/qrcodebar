import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import routes from './routes';
import dotenv from 'dotenv';
dotenv.config();


const app = express()
app.use(morgan('tiny'))
let corsOptions = {
  origin: ['http://localhost:8080', 'https://app-frontend-qrcodebar.onrender.com'], // Adicione os IPs ou domínios permitidos aqui
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization, token'], // Cabeçalhos permitidos
  }
app.use(cors(corsOptions))
app.use(helmet())
app.use(express.json())

const PORT = process.env.PORT as string || 3353;
 
app.use(routes);
 
app.listen(PORT, () => console.log(`Server is running at ${PORT}.`));