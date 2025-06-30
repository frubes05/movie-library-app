import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { errorHandler } from "./middlewares";
import movieRoutes from "./routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());

app.use("/movies", movieRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
