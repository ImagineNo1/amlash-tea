import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
let client;
let clientPromise;

export function hasMongoConfig() {
  return Boolean(uri);
}

export async function getDb() {
  if (!uri) throw new Error("MONGODB_URI is not configured");
  if (!clientPromise) {
    client = new MongoClient(uri);
    clientPromise = client.connect();
  }
  const connectedClient = await clientPromise;
  return connectedClient.db();
}
