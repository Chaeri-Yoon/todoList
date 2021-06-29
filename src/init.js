import "regenerator-runtime";
import dotenv from "dotenv";
dotenv.config();

import "./db";
import app from "./app";

const PORT = process.env.PORT;

const handleListening = () => console.log(`Listening on: http://localhost:${PORT}`);
app.listen(PORT, handleListening);