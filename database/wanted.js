import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
const { DB_USER, DB_PASS, DB_URL, DB_PORT } = process.env;

const dbName = "bot-db";
const collectionName = "wanted";


const uri = `mongodb://${DB_USER}:${DB_PASS}@${DB_URL}:${DB_PORT}/${dbName}?authSource=admin`;
const client = new MongoClient(uri);
await client.connect();

const db = client.db(dbName);
const collection = db.collection(collectionName);

export async function getAllWantedDB() {
    try {
        const data = await collection.find().toArray();
        return data;
    } catch (error) {
        return error;
    }
}

export async function createWantedDB(
    knownAs, 
    discordId, 
    robloxId, 
    bounty
) {
    try {
        await collection.insertOne(
            {
                "knownAs": knownAs,
                "discordId": discordId,
                "robloxId": robloxId,
                "bounty": bounty
            }
        );
    } catch (error) {
        return error;
    }
}

export async function deleteWantedDB(knownAs) {
    try {
        await collection.deleteOne({"knownAs": knownAs})
    } catch (error) {
        return error;
    }
}