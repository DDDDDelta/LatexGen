import { ApolloServer } from '@apollo/server';
import DBConnSingle from './Database';

export default class APIServer {
    
    public static instance: ApolloServer | null = null;

    static async startServer() {

        const typeDefs = `type Mutation { storeInfo(owner: String!, text: String!): Boolean! }`;
        const resolvers = { Mutation: { storeInfo: this.storeInfo } };

        APIServer.instance = new ApolloServer({ typeDefs, resolvers });

        await APIServer.instance.start();
    }

    static storeInfo = async (owner: string, text: string) => {
        const db =  DBConnSingle.getDatabase();
        if (db) {
            const result = await db.collection("info").insertOne({
                owner: owner,
                text: text,
            });
            return result.acknowledged;
        }
        return false;
    }
}
