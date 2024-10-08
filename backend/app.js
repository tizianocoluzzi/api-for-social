import express from 'express';
import mongoose from 'mongoose';
import router from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";
import login from "./routes/login-routes.js";
import signup from "./routes/signup-routes.js";
import { handleRefreshToken } from './controllers/refreshToken-controller.js';
import { verifyJWT } from './middleware/verifyJWT.js';
import cookieParser from 'cookie-parser';
import { handleLogout } from './controllers/logout-controller.js';
import {credentials} from './middleware/credentials.js';
import {corsOptions} from './config/corsOptions.js';
import cors from 'cors';
import def from './routes/default.js'
const app = express();
const port = 5000;

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json()); //fa in modo che i dati siano tutti json

app.use(cookieParser()); //per i cookie
//in teoria questo fa in modo che il login sia richiesto sempre tranne per le pagine di signup e di login
app.use("/api/landing", def);
app.use("/api/user/signup", signup);
app.use("/api/user/login", login);
app.use("/api/refresh", handleRefreshToken);
app.use("/api/logout", handleLogout);
app.use(verifyJWT);
app.use("/api/user",router);
app.use("/api/blog", blogRouter);
//connsessione al database
mongoose.connect('mongodb+srv://tizianocoluzzipersonal:7AYpXlLFlzyg8tFA@cluster0.dqpakob.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>app.listen(port, '127.0.0.1')).then(console.log("connected to database")).catch((err)=>console.log("err"))
//password of mongo: 7AYpXlLFlzyg8tFA

