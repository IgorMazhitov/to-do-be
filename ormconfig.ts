import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

// Using environment variables
dotenv.config();

const connectDB =  new DataSource({
    type: "postgres",
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT),
    logging: false,
    synchronize: true,
    ssl: false,
    entities: ["./src/database/entities/*.ts"],
    extra: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

export default connectDB;