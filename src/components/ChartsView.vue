<template>
  <v-container>
    <v-row wrap>
      <v-col xs="6" md="4">
        <v-card outlined>
          <v-card-title>Last week</v-card-title>
        <RadarChart v-if="loaded" :chartdata="chartdata" :options="options" />
        </v-card>
      </v-col>
      <v-col xs="6" md="4">
        <v-card outlined>
          <v-card-title>Last month</v-card-title>
        <RadarChart v-if="loaded" :chartdata="chartdata" :options="options" />
        </v-card>
      </v-col>
      <v-col xs="6" md="4">
        <v-card outlined>
          <v-card-title>Last Quarter</v-card-title>
        <RadarChart v-if="loaded" :chartdata="chartdata" :options="options" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
//import {color} from "@/Chart.js";
import { group_array2map } from "../classes/HelperFunctions";
import RadarChart from "./RadarChart.vue";

const chartColors = {
  red: "rgb(255, 99, 132)",
  orange: "rgb(255, 159, 64)",
  yellow: "rgb(255, 205, 86)",
  green: "rgb(75, 192, 192)",
  blue: "rgb(54, 162, 235)",
  purple: "rgb(153, 102, 255)",
  grey: "rgb(231,233,237)",
};
// let color = Radar.helpers.color;

export default {
  name: "ChartsView",
  components: { RadarChart },
  data: () => ({
    loaded: false,
    chartdata: null,
    options: null,
  }),
  created() {
    this.options = {
      legend: {
        position: "top",
        labels: {
          fontColor: "white",
        },
      },
      // title: {
      //   display: true,
      //   text: 'Chart.js Radar Chart',
      //   fontColor: 'white'
      // },
      scale: {
        ticks: {
          beginAtZero: true,
          fontColor: "white", // labels such as 10, 20, etc
          showLabelBackdrop: false, // hide square behind text
        },
        pointLabels: {
          fontColor: "white", // labels around the edge like 'Running'
        },
        gridLines: {
          color: "rgba(255, 255, 255, 0.2)",
        },
        angleLines: {
          color: "white", // lines radiating from the center
        },
      },
    };
  },
  // async mounted () {
  //   this.loaded = false
  //   try {
  //     const { userlist } = await fetch('/api/userlist')
  //     this.chartdata = userlist
  //     this.loaded = true
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }
  mounted() {
    this.loaded = false;
    let tasks_groups;

    let vm = this;
    vm.$am.backend
      .loadCompletedTasks(this, null, function (tasks) {
        // vm.tasks=tasks;
        console.log("init taskgoups ");
        tasks_groups = group_array2map(
          tasks,
          (task) => vm.$am.wheelModel.classifyTask(task).name
        );
        tasks_groups.delete(vm.$am.wheelModel.axisOther.name);
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

        let axis_names = [];
        let axis_scores = [];
        for (const [key, val] of tasks_groups.entries()) {
          axis_names.push(key);
          axis_scores.push(val.totalScore);
        }

        vm.chartdata = {
          labels: axis_names, // ['Running', 'Swimming', 'Eating', 'Cycling','Sleaping'],
          datasets: [
            {
              label: false,
              data: axis_scores,
              backgroundColor: "rgba(54, 162, 235, 0.2)", //color(chartColors.red).alpha(0.2).rgbString(),
              borderColor: chartColors.blue,
              pointBackgroundColor: chartColors.blue,
            },
          ],
        };
        vm.loaded = true;
      })
      .catch((e) => {
        console.error(e);
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
