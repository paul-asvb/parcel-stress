import {
    addRxPlugin,
    createRxDatabase,
} from 'rxdb';

addRxPlugin(require('pouchdb-adapter-memory'));

const initDB = async function () {
    const myDatabase = await createRxDatabase({
        name: 'mydatabase',           // <- name
        adapter: 'memory',          // <- storage-adapter
        // password: 'myPassword',     // <- password (optional)
        // multiInstance: true,         // <- multiInstance (optional, default: true)
        //eventReduce: false // <- eventReduce (optional, default: true)
    })

    const schema = {
        "title": "hero schema",
        "version": 0,
        "description": "describes a simple hero",
        "type": "object",
        "properties": {
            "color": {
                "type": "string"
            },
        }
    }

    const collection = await myDatabase.addCollections({
        heroes: {
            schema: schema
        }
    });

    const query = myDatabase.heroes.find();
    query.$.subscribe(results => {
        console.log('changed: ' + results.length);
    });

    myDatabase.heroes.insert({
        color: 'foo',
    });

    return myDatabase
}

const DatabaseService = {
    DB_CREATE_PROMISE: initDB(),
    get() {
        return this.DB_CREATE_PROMISE;
    }
};

export default DatabaseService;
