require("dotenv").config();
import { ExtendedClient } from "./classes/Client";
import { DB } from "./classes/Mongo"
export const client = new ExtendedClient();
export const db = new DB();
client.start();
db.connect();