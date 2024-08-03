import express from "express";
import cors from "cors";
import morgan from "morgan";
import config from "./config.js";
import path from "path";
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars';

import mainRoutes from "./routes/main.routes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('port', config.port);


//hbs config
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.resolve(__dirname, './views'));

//static files
app.use(express.static(path.join(__dirname, './public')));


//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes

app.use('/', mainRoutes);
app.use((req, res)=>{
    return res.status(404).send('Page not found');
});


export default app;