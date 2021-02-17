import {
    addRxPlugin,
    createRxDatabase,
    dbCount
} from 'rxdb';
addRxPlugin(require('pouchdb-adapter-memory'));

const myDatabase: MyDatabase = await createRxDatabase<MyDatabaseCollections>({
    name: 'mydb',
    adapter: 'memory'
});

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

await myDatabase.addCollections({
    heroes: {
        schema: schema
    }
});

const query = myDatabase.heroes.find();
query.$.subscribe(results => {
    console.log('got results: ' + results.length);
});

myDatabase.heroes.insert({
    color: 'foo',
});

console.dir(myDatabase.heroes);
