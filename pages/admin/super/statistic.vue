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
          <div style="display:flex;width: 100%; margin-top:50px;margin-bottom: 20px;"> 
            <a-input-search
                enter-button
                size="large"
                @change="searchOn"
                placeholder="Universitet nomi"
              />
              <!-- <a-button @click="exportExcel" size="large" class="table--btn" type="primary">
                  Export
              </a-button> -->
          </div>
          <a-table
              :loading="false"
              :columns="columns"
              :rowKey="
              (record, index) => {
                  return index;
              }
              "
              :scroll="{ x: 'calc(700px + 40%)', y: 1100 }"
              :data-source="search.length!=0 ? search : allUniverApp"
              :pagination="false"
          >
              <template slot="customRender" slot-scope="text">
                {{text!=null ? text : 0}}
              </template>
          </a-table>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
// import { saveExcel } from "@progress/kendo-vue-excel-export";
import get from "lodash.get";
const columns = [
  {
    title: "Univesitet nomi",
    dataIndex: "univerName",
    width: "25%",
    scopedSlots: { customRender: "customRender" },
  },
  {
    title: "Yangi arizalar soni",
    dataIndex: "newApp",
    width: "20%",
    scopedSlots: { customRender: "customRender" },
        align: 'center'
  },
  {
    title: "Universitet rad etgan arizalar soni",
    dataIndex: "univerRejectApp",
    width: "20%",
    scopedSlots: { customRender: "customRender" },
        align: 'center'
  },
  {
    title: "Vazirlikka kelgan arizalar soni",
    dataIndex: "univerConfirmApp",
    width: "20%",
    scopedSlots: { customRender: "customRender" },
    align: 'center'
  },
  {
    title: "Vazirlik rad etgan arizalar soni",
    dataIndex: "minisRejectApp",
    width: "20%",
    scopedSlots: { customRender: "customRender" },
    align: 'center'
  },
  {
    title: "Expertga yuborilgan arizalar soni",
    dataIndex: "minisConfirmApp",
    width: "20%",
    scopedSlots: { customRender: "customRender" },
        align: 'center'
  },
  {
    title: "Expert tavsiya etgan arizalar soni",
    dataIndex: "expertConfirmApp",
    width: "20%",
    scopedSlots: { customRender: "customRender" },
        align: 'center'
  },
  {
    title: "Expert tavsiya etmagan arizalar soni",
    dataIndex: "expertRejectApp",
    width: "20%",
    scopedSlots: { customRender: "customRender" },
        align: 'center'
  },
  {
    title: "Ja'mi arizalar soni",
    dataIndex: "allAppCount",
    width: "20%",
    customRender: (text, record, index) => {
      return {
        children: `${(record.newApp + record.univerRejectApp + record.univerConfirmApp + record.minisRejectApp + record.minisConfirmApp + record.expertConfirmApp + record.expertRejectApp)}`,
      };
    },
    align: 'center'
  },
];
export default {
  name: "Home",
  layout: "DashboardLayout",
  data() {
    return {
      columns,
      search: [],
      items: [],
      key: 1,
      allUniverApp: []
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
    searchOn(val){
        this.search = this.allUniverApp.filter((el) => 
          el.univerName.toLowerCase().includes(val.target.value.toLowerCase())
        )
    },
    callback(key) {
      // console.log(key);
      this.key = key
    },
  },
  mounted() {
    this.$store.dispatch("entity/loadAll", {
      entity: "countAllApp",
      name: "all",
      url: "api/admin/allStatistic",
      params: {
        p: "not",
      },
      cb: {
        success: (response) => {
          this.allUniverApp = []
          if(response.length != 0) {
            response.forEach(item => {
              const json = {
                newApp: 0,
                univerRejectApp: 0,
                univerConfirmApp: 0,
                minisRejectApp: 0,
                minisConfirmApp: 0,
                expertConfirmApp: 0,
                expertRejectApp: 0,
                univerName: ''
              }
              json.univerName = item.universityName
              if(item.countApps.length!=0) {
                item.countApps.forEach(i => {
                  if(i){
                    if(i.status == 'Ariza shakillantirildi'){
                      json.newApp = i.count
                    }
                    if(i.status == 'Ariza rad etildi') {
                      json.univerRejectApp = i.count
                    } 
                    if(i.status == 'Ariza qabul qilindi') {
                      json.univerConfirmApp = i.count
                    }
                    if(i.status == 'Expertga yuborildi') {
                      json.minisConfirmApp = i.count
                    }
                    if(i.status == 'Expertga yuborilmadi') {
                      json.minisRejectApp = i.count
                    }
                    if(i.status == 'Tavsiya etilmadi') {
                      json.expertRejectApp = i.count
                    }
                    if(i.status == 'Tavsiya etildi') {
                      json.expertConfirmApp = i.count
                    }
                  } else {
                    json.newApp = 0
                    json.univerRejectApp = 0
                    json.univerConfirmApp = 0
                    json.minisRejectApp = 0
                    json.minisConfirmApp = 0
                    json.expertRejectApp = 0
                    json.expertConfirmApp = 0
                  }
                })
                this.allUniverApp.push(json)
              } else {
                  json.newApp = 0
                  json.univerRejectApp = 0
                  json.univerConfirmApp = 0
                  json.minisRejectApp = 0
                  json.minisConfirmApp = 0
                  json.expertRejectApp = 0
                  json.expertConfirmApp = 0
                  this.allUniverApp.push(json)
              }
            })
          }
        },
        error: (response) => {
          console.log(response);
        },
      },
    });
  },
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