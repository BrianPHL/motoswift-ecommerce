import cors from 'cors';
import express from "express";
import dotenv from "dotenv";
import { Pool } from "pg";
import accountRoutes from './account.route.js';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/api/accounts', accountRoutes);

app.get('/', (req, res) => res.send("Backend running!"));

app.listen(PORT, () => {
    console.log(`Server running on port: ${ PORT }`)
})
