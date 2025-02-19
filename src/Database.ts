import { Db, MongoClient } from "mongodb";
import { SyncAwaitVoid } from "src/Support/Deasync" 
import panic from "src/Support/Panic";

import "dotenv/config";

export default class DBConnSingle {
  private static instance: Db | null = null;
  
  private static async connect(): Promise<void> {
    let mongoUri = process.env.MONGO_URI;
    let dbName = process.env.DB_NAME;
    if (mongoUri && dbName) {
      let client = new MongoClient(mongoUri);
      await client.connect();
      DBConnSingle.instance = client.db(dbName);
    }
  }

  public static getDatabase(): Db {
    if (!DBConnSingle.instance) {
      try {
        SyncAwaitVoid(DBConnSingle.connect());
      }
      catch(e: any) {
        panic(e.message);
      }

      if (!DBConnSingle.instance) {
        panic();
      }
      else {
        return DBConnSingle.instance!;
      }
    }
    else {
      return DBConnSingle.instance;
    }
  }
}

  