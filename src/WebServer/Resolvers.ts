import DBConnSingle from './Database';

const storeInfo = async (_: any, query: any) => {
    const db =  DBConnSingle.getDatabase();
    if (db) {
        let owner = query.owner;
        let text = query.text;
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