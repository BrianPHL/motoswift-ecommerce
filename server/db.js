import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { Pool } from "pg";

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

export default pool;