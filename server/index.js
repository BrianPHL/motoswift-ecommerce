import cors from 'cors';
import express from "express";
import session from "express-session";
import { toNodeHandler } from "better-auth/node";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';
import accountsRouter from './accounts.route.js';
import productsRouter from './products.route.js';
import cartsRouter from './carts.route.js';
import reservationsRouter from './reservations.route.js';
import installmentsRouter from './installments.route.js';
import stocksRouter from './stocks.route.js';
import auth from "./auth.service.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
	origin: process.env.NODE_ENV === 'production' 
    	? [ 'https://motoswift-ecommerce-production.up.railway.app' ]
    	: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  	credentials: true,
  	allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(session({
    secret: process.env.SESSION_SECRET || "your-default-session-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        sameSite: "lax"
    }
}));
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());
app.use('/api/accounts', accountsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/reservations', reservationsRouter);
app.use('/api/installments', installmentsRouter);
app.use('/api/stocks', stocksRouter);

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get(/^(?!\/api\/).*/, (req, res) => {
	res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${ PORT }`)
});
