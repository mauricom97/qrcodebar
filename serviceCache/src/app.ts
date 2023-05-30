import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import routes from './routes';
import dotenv from 'dotenv';
dotenv.config();


const app = express()
app.use(morgan('tiny'))
app.use(cors())
app.use(helmet())
app.use(express.json())

const PORT = process.env.PORT as string || 3353;
 
app.use(routes);
 
app.listen(PORT, () => console.log(`Server is running at ${PORT}.`));