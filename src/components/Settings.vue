<template>
  <v-container>
    <v-row>
      <v-col xs="12" md="6">
    <v-card outlined  class="pa-5" tile>
          <v-select
            v-model="settings.todoEngine"
            disabled
            :items="todoEnginesSelection"
            label="Base ToDo service"
          />
          <v-text-field
            label="Todoist API token"
            placeholder="Put your token in here"
            hint="Go to Todoist -> Settings -> Integrations"
            v-model="settings.todoistAPItoken"
          ></v-text-field>
          <v-text-field
            label="Root project name"
            placeholder="#projectname"
            hint="we buld down your wheel axes from that project"
            v-model="settings.rootProject"
          ></v-text-field>
          <v-text-field
            label="Scoreing regexp"
            placeholder="\!(.d)"
            hint="reg expression to get numeric scoring for completed item"
            v-model="settings.scoreingRegexp"
          ></v-text-field>
        <v-card-actions>
                    <v-btn @click="persistAPIkey">Save settings</v-btn>

        </v-card-actions>
    </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Settings",
  data: () => ({
    todoEnginesSelection: ["Todoist", "AnyDO", "Remember the milk"],
    settings: null,
  }),
  created() {
    this.settings = this.$am.settings;
  },
  methods: {
    persistAPIkey() {
      localStorage.settings = JSON.stringify(this.settings);
      console.log("saved " + this.settings.todoistAPItoken);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
