import mongoose from "mongoose";
import dotenv from "dotenv";
import { app } from "./app"
import { populateDB } from "./utils/populateDB";

dotenv.config();

const PORT: number = process.env.PORT ? Number(process.env.PORT) : 3001
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://mongo:V4tOgItk0gl2MBFsYTJz@containers-us-west-188.railway.app:7297")
  .then(() => {
    app.listen(PORT, () => console.log(`Servidor iniciado na porta ${PORT}.`));
    populateDB()
  })
  .catch((error) => console.log(`${error}`));
