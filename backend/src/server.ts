import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import routes from './routes';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io'

dotenv.config();

const app = express()

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
});


app.use(morgan('tiny'))
app.use(cors())
app.use(helmet())
app.use(express.json())

const PORT = parseInt(`${process.env.PORT || 3006}`);
 
app.use(routes);

io.on('connection', (socket) => {
    console.log('A new user connected', socket)
})

export { io }

server.listen(PORT, () => console.log(`Server is running at ${PORT}.`));