<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item link to="/">
          <v-list-item-action>
            <v-icon>mdi-ab-testing</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>test view</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/tasks">
          <v-list-item-action>
            <v-icon>mdi-playlist-check</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Closed tasks</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/charts">
          <v-list-item-action>
            <v-icon>mdi-spider-web</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Charts</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/settings">
          <v-list-item-action>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-footer app>
      <span>darelf &copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<style lang="scss">
</style>

<script>
export default {
  props: {
    source: String,
  },
  data: () => ({
    drawer: true,
  }),
  created() {
    const settings = this.$am.loadSettings();
    this.$am.initApplication(settings);
    console.debug(settings);
    this.$vuetify.theme.dark = true;
  },
  mounted() {
    console.log("mounted app")
    let wm = this.$am.wheelModel;
    this.$am.backend
      .loadProjects(this, function (projects) {
        console.log("building hiearachy..");
        wm.buildProjectsHierarchy(projects);
        console.log("init axes..");
        wm.initAxes();

        console.log(
          "axes: ",
          wm.axes.map((item) => item.name)
        );
      })
      .catch((e) => {
        console.error("projects loading failed " + e);
        // vm.error=e;
      });
  },
};
</script>
