import express from 'express';
import mongoose from 'mongoose';
import router from "./routes/user-routes";
import blogRouter from "./routes/blog-routes";
import login from "./routes/login-routes";
import signup from "./routes/signup-routes";
import { verifyJWT } from './middleware/verifyJWT';
import cookieParser from 'cookie-parser';

const app = express();
const port = 5000;

app.use(express.json()); //fa in modo che i dati siano tutti json

app.use(cookieParser()); //per i cookie
//in teoria questo fa in modo che il login sia richiesto sempre tranne per le pagine di signup e di login
app.use("/api/user", signup);
app.use("/api/user", login);
app.use(verifyJWT);
app.use("/api/user",router);
app.use("/api/blog", blogRouter);
//connsessione al database
mongoose.connect('mongodb+srv://tizianocoluzzipersonal:7AYpXlLFlzyg8tFA@cluster0.dqpakob.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>app.listen(port, '127.0.0.1')).then(console.log("connected to database")).catch((err)=>console.log("err"))
//password of mongo: 7AYpXlLFlzyg8tFA

