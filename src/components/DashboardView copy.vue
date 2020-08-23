<template>
  <v-tabs v-model="tab">
    <v-tab>Recently Completed</v-tab>
    <v-tab>Charts</v-tab>

    <v-tab-item>
        <ClosedItemsList/>
    </v-tab-item>

    <v-tab-item>
      <v-container fluid>
        second tab here
      </v-container>
    </v-tab-item>

  </v-tabs>
</template>

<script>
import ClosedItemsList from './ClosedItemsList'

export default {
  name: 'DashboardView',

  components: {
    ClosedItemsList,
  },

  props: {
  },

  data: () => ({
    tab:0,
  }),
  mounted() {
    let wm=this.$am.wheelModel;
    this.$am.backend.loadProjects(this,function(projects) {
      console.log("building hiearachy..");
      wm.buildProjectsHierarchy(projects);
      console.log("init axes..");
      wm.initAxes();
      console.log("axes: ",wm.listAxes());
    }).catch(e => {
      console.log('projects loading failed '+e);
      // vm.error=e;
    });
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
