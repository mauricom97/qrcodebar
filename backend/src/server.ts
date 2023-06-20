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
      origin: ['http://localhost:8080', 'https://app-frontend-qrcodebar.onrender.com'], // Adicione os IPs ou domínios permitidos aqui
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
      allowedHeaders: ['Content-Type', 'Authorization, token'], // Cabeçalhos permitidos
      }
});


app.use(morgan('tiny'))

let corsOptions = {
  origin: ['http://localhost:8080', 'https://app-frontend-qrcodebar.onrender.com'], // Adicione os IPs ou domínios permitidos aqui
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization, token'], // Cabeçalhos permitidos
  };


app.use(cors(corsOptions))
app.use(helmet())
app.use(express.json())

const PORT = parseInt(`${process.env.PORT || 3006}`);
 
app.use(routes);

io.on('connection', (socket) => {
    console.log('A new user connected')
})

export { io }

server.listen(PORT, () => console.log(`Server is running at ${PORT}.`));