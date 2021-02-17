
<template >
  <div>
    <compact-picker v-model="colors" stylE="height:100;" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Compact } from "vue-color";

import DatabaseService from "./database.service";

export default Vue.extend({
  components: {
    "compact-picker": Compact,
  },
  watch: {
    colors: async function (val) {
      const db = await DatabaseService.get();
      const query = db.heroes.findOne();
      await query.update({
        $set: {
          color: val.hex,
        },
      });
    },
  },
  async mounted() {
    const db = await DatabaseService.get();

    const query = db.heroes.find();

    query.$.subscribe((results) => {
      console.log("got results in vue: ", results);
    });

    db.heroes.insert({
      color: "foo",
    });
    
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