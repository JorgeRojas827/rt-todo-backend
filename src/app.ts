import express from 'express';
import morgan from 'morgan';
import cors from "cors";
import router from './routes/router';

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/app', router);

export default app;