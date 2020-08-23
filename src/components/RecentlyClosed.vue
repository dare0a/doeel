<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <v-list>
          <v-list-item-group v-for="(group_key,i) in group_keys" v-bind:key="group_key">
            <v-subheader :inset="true">{{formatKey(group_key)}} [{{group_scores[i] }}]</v-subheader>

            <v-list-item v-for="item in group_tasks[i]" v-bind:key="item.id">
              <v-list-item-content>
                <v-list-item-title>{{item.content}}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-action-text v-text="item.score"></v-list-item-action-text>
              </v-list-item-action>
            </v-list-item>

            <v-divider></v-divider>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-col cols="4">
        <v-radio-group v-model="groupBy">
          <v-radio :label="'group by date'"></v-radio>
          <v-radio :label="'group by axis'"></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { group_array2map } from "../classes/HelperFunctions";

export default {
  name: "RecentlyClosed",
  props: {
    settings: Object,
  },
  data: () => ({
    error: Object,
    items: null,
    tasks: null,
    group_keys: [],
    group_tasks: [],
    group_scores: [],
    groupBy: 0,
  }),
  mounted() {
    console.log("mounted recntlyclosed");

    let vm = this;
    let backend = this.$am.backend;
    console.log("tok: " + backend.api_token);

    backend
      .loadCompletedTasks(this, null, function (tasks) {
        vm.tasks = tasks;

        console.log("init taskgoups ");
        let tasks_groups;
        tasks_groups = group_array2map(
          tasks,
          (task) => vm.$am.wheelModel.classifyTask(task).name
        );
        console.log(tasks_groups);

        //calcaulte total score per group
        for (const tasks_group of tasks_groups.values()) {
          tasks_group.totalScore = tasks_group.tasks.reduce(function (
            accum,
            current
          ) {
            return parseInt(accum) + parseInt(current.score);
          },
          0);
        }

        //redo on arrays
        let group_keys = [];
        let group_tasks = [];
        let group_scores = [];
        for (let [key, value] of tasks_groups) {
          group_keys.push(key);
          group_tasks.push(value.tasks);
          group_scores.push(value.totalScore);
        }

        // vm.items = response.data.items;
        // vm.tasks_groups = tasks_groups;
        vm.group_keys = group_keys;
        vm.group_tasks = group_tasks;
        vm.group_scores = group_scores;
      })
      .catch((e) => {
        console.error(e);
        vm.error = e;
      });
  },

  computed: {
    // groups: function () {
    //   // console.log('groups');
    //   // console.log(this.items.keys());
    //   if (this.items) {
    //     return Array.from(this.items.keys());
    //   }
    //   return [];
    //   // return this.items.keys();
    // },
    // group_tasks: function (group_key) {
    //   console.log('grouptasks -conpu');
    //   console.log(typeof(this.items));
    //   console.log(group_key,this.items.has(group_key));
    //   console.log(this.items);
    //   console.log(this.items.toString());
    //   return this.items.get(group_key).tasks;
    // }
  },
  watch: {
    groupBy: function (val) {
      let tasks_groups;
      // group tasks by date
      console.log("switching radio..", val);

      if (val == 0) {
        tasks_groups = group_array2map(this.tasks, (task) => task.date);
      } else if (val == 1) {
        tasks_groups = group_array2map(
          this.tasks,
          (task) => this.$am.wheelModel.classifyTask(task).name
        );
      }
      console.log(tasks_groups);

      //calcaulte total score per group
      for (const tasks_group of tasks_groups.values()) {
        tasks_group.totalScore = tasks_group.tasks.reduce(function (
          accum,
          current
        ) {
          return parseInt(accum) + parseInt(current.score);
        },
        0);
      }

      //redo on arrays
      let group_keys = [];
      let group_tasks = [];
      let group_scores = [];
      for (let [key, value] of tasks_groups) {
        group_keys.push(key);
        group_tasks.push(value.tasks);
        group_scores.push(value.totalScore);
      }
      this.group_keys = group_keys;
      this.group_tasks = group_tasks;
      this.group_scores = group_scores;
    },
  },
  beforeDestroy() {
    console.log("recently closed view before destroy");
  },

  methods: {
    formatKey: function (group_key) {
      if (this.groupBy == 0) {
        let options = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        return new Date(group_key).toLocaleDateString("en-GB", options);
      }
      return group_key;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
