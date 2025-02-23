import DBConnSingle from './Database';

const storeInfo = async (_: any, query: any) => {
    const db =  DBConnSingle.getDatabase();
    if (db) {
        let owner = query.owner;
        let text = query.text;
        const filter = { owner: owner };
        const update = { 
            $set: { text: text } 
        };
        const options = { upsert: true };
        const result = await db.collection('info').updateOne(filter, update, options);
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