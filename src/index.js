import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import clientsRouter from "./routes/clientsRouter.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


app.use(clientsRouter);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server is running on ${port}`));
