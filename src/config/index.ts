import * as dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();

if (envFound.error) {
    throw new Error("Couldn't find .env file");
}

export default {
    port: process.env.SERVER_PORT,
    host: process.env.SERVER_HOST
}