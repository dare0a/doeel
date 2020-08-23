<template>
  <v-container class="fill-height">
    <v-row>
      <v-col xs="6">
            <v-card outlined>
                    <v-card-title>card1</v-card-title>
                    <v-card-text>text</v-card-text>
                </v-card></v-col>
      <v-col xs="6" align-self="end" ju>
        <v-card>
            <v-card-title>card1.2</v-card-title>
        </v-card>
        
        </v-col>
    </v-row>
    <v-row>
      <v-col xs="4">
          <v-text-field hint="hint" label="label" placeholder="[placeholder]">text</v-text-field>
      </v-col>
      <v-col xs="3">cola2.2</v-col>
      <v-col xs="3">cola2.3</v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "DashboardView",

  components: {},

  props: {},

  data: () => ({}),
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
