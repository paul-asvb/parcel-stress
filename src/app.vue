
<template >
  <div>
    <compact-picker v-model="colors" stylE="height:100;" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Compact } from "vue-color";

import { addRxPlugin, createRxDatabase, dbCount } from "rxdb";
addRxPlugin(require("pouchdb-adapter-memory"));

const start = async function () {
  const myDatabase = await createRxDatabase({
    name: "mydatabase", // <- name
    adapter: "memory", // <- storage-adapter
    // password: 'myPassword',     // <- password (optional)
    multiInstance: true, // <- multiInstance (optional, default: true)
    //eventReduce: false // <- eventReduce (optional, default: true)
  });

  const schema = {
    title: "hero schema",
    version: 0,
    description: "describes a simple hero",
    type: "object",
    properties: {
      color: {
        type: "string",
      },
    },
  };

  await myDatabase.addCollections({
    heroes: {
      schema: schema,
    },
  });

  const query = myDatabase.heroes.find();
  query.$.subscribe((results) => {
    console.log("got results: " + results.length);
  });

  myDatabase.heroes.insert({
    color: "foo",
  });

  console.dir(myDatabase.heroes);
};

start();

export default Vue.extend({
  components: {
    "compact-picker": Compact,
  },
  data() {
    return {
      bundler: "Parcel",
      colors: " #194d33",
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  color: green;
}
</style>