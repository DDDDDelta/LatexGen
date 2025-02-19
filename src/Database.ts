import { Db, MongoClient } from "mongodb";
import "dotenv/config";

export default class Database {
    
    public static instance: Db | null = null;
    
    static async connect() {
        let mongoUri = process.env.MONGO_URI;
        let dbName = process.env.DB_NAME;
        if (mongoUri && dbName) {
            let client = new MongoClient(mongoUri);
            await client.connect();
            Database.instance = client.db(dbName);
        }
        return Database.instance;
    }

    static getDatabase() {
        return Database.instance;
    }
}

  