import DBConnSingle from './Database';

const storeInfo = async (owner: string, text: string) => {
    const db =  DBConnSingle.getDatabase();
    if (db) {
        const result = await db.collection("info").insertOne({
            owner: owner,
            text: text,
        });
        return result.acknowledged;
    }
    return false;
};

const resolvers = { 
    Query: { 
        hello: () => "hi" 
    }, 
    Mutation: { 
        storeInfo: storeInfo 
    } 
};

export default resolvers;