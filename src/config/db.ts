import "reflect-metadata";
import { DataSource } from "typeorm";
import { Contacts } from "../entities/Contact";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Contacts],
  migrations: [],
  subscribers: [],
});

export const initializeDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Base de datos conectada");
  } catch (error) {
    console.error("Error en la conexión", error);
    throw error;
  }
};