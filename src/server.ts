import { PrismaClient } from "@prisma/client";
import { route as taskRoute } from "./routes/task";
import express, { urlencoded } from "express";
import cors from "cors";

export const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: false }));

app.use("/task", taskRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
