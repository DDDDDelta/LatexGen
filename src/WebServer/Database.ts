import { Db, MongoClient } from "mongodb";
import { SyncAwaitVoid } from "src/Support/Deasync" 
import panic from "src/Support/Panic";
import { getProcEnvNoFail } from "src/Support/Process";

import "dotenv/config";

export default class DBConnSingle {
  private static instance: Db | null = null;
  
  private static async connect(): Promise<void> {
    let mongoUri = getProcEnvNoFail("MONGO_URI");
    let dbName = getProcEnvNoFail("DB_NAME");
    let client = new MongoClient(mongoUri);
    await client.connect();
    DBConnSingle.instance = client.db(dbName);
  }

  public static async getDatabase(): Promise<Db> {
    if (!DBConnSingle.instance) {
      try {
        await DBConnSingle.connect();
      }
      catch(e: any) {
        panic(e);
      }

      return DBConnSingle.instance!;
    }
    else {
      return DBConnSingle.instance;
    }
  }
}

  