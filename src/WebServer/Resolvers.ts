import DBConnSingle from './Database';

const storeInfo = async (_: any, query: any) => {
    const db =  await DBConnSingle.getDatabase();
    if (db) {
        let owner = query.owner;
        let text = query.text;
        const filter = { owner: owner };
        const update = { 
            $push: { text: text }
        };
        const options = { upsert: true };
        const result = await db.collection('info').updateOne(filter, update, options);
        return result.acknowledged;
    }
    return false;
};

const viewInfo = async (_: any, query: any) => {
    const db = await DBConnSingle.getDatabase();
    if (db) {
        let owner = query.owner;
        const result = await db.collection('info').findOne({
            owner: owner
        });
        if (result) {
            return JSON.stringify(result);
        } else {
            return 'Not Found';
        }
    }
    return 'Error';
}

const resolvers = { 
    Query: { 
        viewInfo: viewInfo
    }, 
    Mutation: { 
        storeInfo: storeInfo 
    } 
};

export default resolvers;