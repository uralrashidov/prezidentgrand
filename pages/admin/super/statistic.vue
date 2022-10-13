<template>
  <div class="statics">
    <div class="statics--header">
      <div class="statics--title">
          {{key==1 ? 'Ariza' : key==2 ? 'Milliy diplomlar' : 'Xorijiy diplomlar'}} ma’lumotlari bo’yicha statistik ma’lumotlar
      </div>
    </div>
    <a-tabs class="statics--box" default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="Ariza bo’yicha">
        <div class="statics--card">
          <statics-rectangle></statics-rectangle>
          <statics-chart v-if="timeChartAll.isFetched" :timeChart="timeChartAll.items.appCountByDates" :genderCount="genderCountAll"></statics-chart>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
// import { saveExcel } from "@progress/kendo-vue-excel-export";
import get from "lodash.get";
export default {
  name: "Home",
  layout: "DashboardLayout",
  data() {
    return {
      items: [],
      key: 1
    };
  },
  methods: {
    exportExcel() {
      saveExcel({
        data: this.items,
        fileName: "myFile",
        columns: [
          { field: "maktabNomi", title: "Maktab nomi" },
          { field: "viloyat", title: "Viloyat" },
          { field: "tuman", title: "Tuman" },
          { field: "umumiyArizalarSoni", title: "Ummumiy arizalar soni" },
        ],
      });
    },
    callback(key) {
      // console.log(key);
      this.key = key
    },
  },
  // mounted() {
  //   this.$store.dispatch("entity/loadAll", {
  //     entity: "countAll",
  //     name: "all",
  //     url: "api/admin/statistic",
  //     params: {
  //       p: "not",
  //     },
  //     cb: {
  //       success: (response) => {
  //       },
  //       error: (response) => {
  //         console.log(response);
  //       },
  //     },
  //   });
  // },
  computed: {
    timeChartAll(){
      return this.$store.getters["entity/getEntity"]("countAll", "all")
    },
    genderCountAll(){
      if(get(this.$store.getters["entity/getEntity"]("countAll", "all"), 'items')){
        return get(this.$store.getters["entity/getEntity"]("countAll", "all"), 'items.countAppByGenders')
      }
    },
  }
};
</script>