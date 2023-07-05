import express, { urlencoded } from "express";
import cors from "cors";

const app = express();

app.use(cors);
app.use(express.json());
app.use(urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
