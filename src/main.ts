import dotenv from "dotenv";
import { createApp } from "./app";
import { initializeDB } from "./config/db";
import contactsRouter from "./routes/rontacts.routes";

dotenv.config();

const PORT = process.env.SERVER_PORT;
const app = createApp();

app.use("/api/contacts", contactsRouter);


const startServer = async () => {
  await initializeDB();

  app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
};

startServer();
