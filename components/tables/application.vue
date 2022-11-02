<template>
  <div>
    <div class="table--header">
      <a-row>
        <a-col :span="12">
          <div class="table--title">{{this.$route.query.status == 'new' ? `Yangi arizalar` : (this.$route.query.status == 'rejected_in_university' ? 'Universitet rad etgan arizalar' : (this.$route.query.status == 'rejected_in_ministry' ? 'Vazirlik expertga yubormagan arizalar' : (this.$route.query.status == 'recommend_in_commission' ? 'Expertga tavsiya etgan arizalar' : this.$route.query.status == 'notrecommend_in_commission' ? 'Expert tavsiya etmagan arizalar' : (this.$route.query.status == 'accepted_in_ministry' ? 'Vazirlik expertga yuborgan arizalar' : 'Universitet qabul qilgan arizalar'))))}}</div>
        </a-col>
        <a-col :span="12">
          <div class="table--flex">
            <a-input-search
              enter-button
              @change="searchOn"
              size="large"
              @search="onSearch"
              placeholder="Familiya ism"
              v-model="searchModel"
            />
            <!-- <a-button :loading="loading" @click="exportExcel" size="large" class="table--btn" type="primary">
              Export
            </a-button> -->
          </div>
        </a-col>
      </a-row>
    </div>
    <a-table
      :scroll="{ x: 'calc(700px + 40%)', y: '100%' }"
      :data-source="appItems" 
      :columns="columns"
      :pagination="false"
      :loading="!isFetched"
      :rowKey="
        (record, index) => {
          return index;
        }
      "
    >
      <div
        slot="filterDropdown"
        slot-scope="{
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
          column,
        }"
        style="padding: 8px"
      >
        <a-input
          v-ant-ref="(c) => (searchInput = c)"
          :placeholder="`Search ${column.dataIndex}`"
          :value="selectedKeys[0]"
          style="width: 188px; margin-bottom: 8px; display: block"
          @change="
            (e) => setSelectedKeys(e.target.value ? [e.target.value] : [])
          "
          @pressEnter="
            () => handleSearch(selectedKeys, confirm, column.dataIndex)
          "
        />
        <a-button
          type="primary"
          icon="search"
          size="small"
          style="width: 90px; margin-right: 8px"
          @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
        >
          Search
        </a-button>
        <a-button
          size="small"
          style="width: 90px"
          @click="() => handleReset(clearFilters)"
        >
          Reset
        </a-button>
      </div>
      <a-icon
        slot="filterIcon"
        slot-scope="filtered"
        type="search"
        :style="{ color: filtered ? '#108ee9' : undefined }"
      />
      <template slot="customRender" slot-scope="text, record, index, column">
        <span v-if="searchText && searchedColumn === column.dataIndex">
          <template
            v-for="(fragment, i) in text
              .toString()
              .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
          >
            <mark
              v-if="fragment.toLowerCase() === searchText.toLowerCase()"
              :key="i"
              class="highlight"
              >{{ fragment }}</mark
            >
            <template v-else>{{ fragment }}</template>
          </template>
        </span>
        <template v-else>
          {{
            column.dataIndex === "createdDate"
              ? formatDate(text, "DD.MM.YYYY / HH:mm:ss")
              : text
          }}
        </template>
      </template>
      <span slot="action" slot-scope="text, record">
        <div class="a" @click="putClick(record.appId)">
          Batafsil <a-icon type="eye" theme="twoTone" />
        </div>
      </span>
    </a-table>
    <div class="table--pagination">
      <a-pagination
        v-model="current"
        :total="meta.totalElements"
        @change="handelChange"
        :page-size="pageSize"
        @showSizeChange="onShowSizeChange"
      >
        <template slot="buildOptionText" slot-scope="props">
          <span>{{ props.value }} ta dan</span>
        </template>
      </a-pagination>
    </div>
  </div>
</template>
<script>
// import { saveExcel } from "@progress/kendo-vue-excel-export";
const columns = [
  {
    title: "ID",
    dataIndex: "appId",
    sorter: true,
    width: "10%",
    key: "appId",
    scopedSlots: { customRender: "customRender" },
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: "Familiya Ism Sharif",
    dataIndex: "fullname",
    width: "20%",
    customRender: (text, record, index) => {
      return {
        children: `${record.lastName} ${record.firstName} ${record.fatherName}`,
      };
    },
    scopedSlots: {
      filterDropdown: "filterDropdown",
      filterIcon: "filterIcon",
    },
    onFilter: (value, record) =>
      record.enrolleeResponse.lastname
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()) ||
      record.enrolleeResponse.firstname
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()) ||
      record.enrolleeResponse.middleName
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          this.searchInput.focus();
        }, 0);
      }
    },
    defaultSortOrder: "descend",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Unversitet",
    dataIndex: "universityName",
    key: "universityName",
    width: "25%",
    scopedSlots: {
      filterDropdown: "filterDropdown",
      filterIcon: "filterIcon",
      customRender: "customRender",
    },
    onFilter: (value, record) =>
      record.directionName
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          this.searchInput.focus();
        });
      }
    },
    defaultSortOrder: "descend",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Fakulteti",
    dataIndex: "facultyName",
    key: "facultyName",
    width: "12%",
    scopedSlots: {
      filterDropdown: "filterDropdown",
      filterIcon: "filterIcon",
      customRender: "customRender",
    },
    onFilter: (value, record) =>
      record.directionName
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          this.searchInput.focus();
        });
      }
    },
    defaultSortOrder: "descend",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Ta'lim sohasi",
    dataIndex: "soha",
    key: "soha",
    width: "12%",
    scopedSlots: {
      filterDropdown: "filterDropdown",
      filterIcon: "filterIcon",
      customRender: "customRender",
    },
    onFilter: (value, record) =>
      record.directionName
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          this.searchInput.focus();
        });
      }
    },
    defaultSortOrder: "descend",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Passport seria raqami",
    dataIndex: "passportSerialNumber",
    key: "passportSerialNumber",
    width: "16%",
    scopedSlots: {
      filterDropdown: "filterDropdown",
      filterIcon: "filterIcon",
      customRender: "customRender",
    },
    onFilter: (value, record) =>
      record.createdDate.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          this.searchInput.focus();
        }, 0);
      }
    },
    defaultSortOrder: "descend",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Batafsil",
    key: "action",
    width: "10%",
    scopedSlots: { customRender: "action" },
  },
];
export default {
  props: {
    appItems: {
      type: Array,
      default: null,
    },
    isFetched: {
      type: Boolean,
      default: false,
    },
    meta: {
      default: null,
    },
  },
  watch: {
    $route(to, from) {
      if(from.query.status != to.query.status){
        this.searchModel = ''
      }
    }
  },
  data() {
    return {
      searchModel: '',
      total: 100,
      loading: false,
      columns,  
      searchText: "",
      searchInput: null,
      searchedColumn: "",
      loading: false,
      current: parseInt(this.$route.query.page)
        ? parseInt(this.$route.query.page)
        : 1,
      pageSize: parseInt(this.$route.query.size)
        ? parseInt(this.$route.query.size)
        : 20,
      diploma: [],
      roles: localStorage.getItem('role')
    };
  },
  methods: {
    exportExcel() {
      const meta = this.meta
      this.loading = true

      const appType = this.appType;
      const diplomType = this.diplomType

      this.$store.dispatch("entity/loadAll", {
          entity: "allitems",
          name: "all",
          url: "uadmin/exportApp",
          params: {
              extra: {
                appStatus: appType === "all" ? (diplomType === "all" ? 'Ariza yuborildi' : (diplomType === "confirm" ? 'Ariza yuborildi' : 'Ariza yuborildi')) : (appType === "confirm" ? 'Ariza qabul qilindi' : 'Ariza rad etildi'),
                diplomaStatus: appType === "all" ? (diplomType === "all" ? 'null' : (diplomType === "confirm" ? 'true' : 'false')) : "ural",
              },
              page: 0,
              limit: meta.totalElements
          },
          cb: {
              success: response => {
                if(response.length != 0) {
                  saveExcel({
                    data: response,
                    fileName: appType === "all" ? (diplomType==="all" ? "DiplomTekshiralayotganArizalar" : (diplomType==="confirm" ? 'DiplomTasdiqlanganArizalar' : 'DiplomRadetilganArizalar')) : appType === "confirm" ? "TasdiqlanganArizalar" : "RadetilganArizalar",
                    columns: [
                      { field: "appId", title: "Ariza ID" },
                      { field: 'lastName', title: "Familiya" },
                      { field: 'firstName', title: "Ism" },
                      { field: 'middleName', title: "Otasining ismi" },
                      { field: "phoneNumber", title: "Telefon raqami" },
                      { field: "pinfl", title: "JSHSHIR(pnfl) raqami" },
                      { field: "passportSerialNumber", title: "Passport seria raqami" },
                      { field: "givenDate", title: "Passport berilgan sana" },
                      { field: "futureInstitutionName", title: "Ariza topshirgan OTM nomi" },
                      { field: "directionName", title: "Ariza topshirgan yo'nalishi" },
                      { field: "talimShakli", title: "Arizasining ta'lim shakli" },
                      { field: "language", title: "Arizasining ta'lim tili" },
                      { field: "institutionName", title: "Bitirgan OTM nomi" },
                      { field: "diplomaSerialAndNumber", title: "Diplom seria raqami" },
                      { field: "finishingDate", title: "Bitirgan yili" },                      
                    ],
                  });
                  this.loading = false
                }
              },
              error: response => {
                  console.log(response);
              }
          }
      });

    },
    putClick(id) {
      this.$router.push({
        path: (localStorage.getItem('role') == 'ROLE_EXPERT' ? `/admin/expert/applications/${id}` : localStorage.getItem('role') == 'ROLE_UADMIN' ? `/admin/applications/${id}` : `/admin/super/applications/${id}`),
        query: {
          page: this.current ? this.current : 1,
          size: this.pageSize,
          status: this.$route.query.status
        },
      });
    },
    searchOn(val) {
      let role = localStorage.getItem('role')
      if (!val.target.value) {
        this.$store.dispatch("entity/loadAll", {
          entity: "applications",
          name: "all",
          url: role === "ROLE_ADMIN" ? 'api/admin/AppsByUadmin' : (role === "ROLE_EXPERT" ? 'api/expert/AppsByUadmin' : 'api/uadmin/AppsByUadmin'),
          params: {
            extra: {
              status: this.$route.query.status == 'new' ? `Ariza shakillantirildi` : (this.$route.query.status == 'rejected_in_university' ? 'Ariza rad etildi' : (this.$route.query.status == 'rejected_in_ministry' ? 'Expertga yuborilmadi' : (this.$route.query.status == 'recommend_in_commission' ? 'Tavsiya etildi' : this.$route.query.status == 'notrecommend_in_commission' ? 'Tavsiya etilmadi' : (this.$route.query.status == 'accepted_in_ministry' ? 'Expertga yuborildi' : 'Ariza qabul qilindi')))),
            },
            page: parseInt(this.current),
            limit: this.pageSize,
          },
          cb: {
            success: (response) => {},
            error: (response) => {
              console.log(response);
            },
          },
        });
      }
    },
    onSearch(val) {
      let role = localStorage.getItem('role')
      this.$store.dispatch("entity/loadAll", {
        entity: "applications",
        name: "all",
        url: role === "ROLE_ADMIN" ? 'api/admin/searchApp' : (role === "ROLE_EXPERT" ? 'api/expert/searchApp' : 'api/uadmin/searchApp'),
        params: {
          extra: {
            status: this.$route.query.status == 'new' ? `Ariza shakillantirildi` : (this.$route.query.status == 'rejected_in_university' ? 'Ariza rad etildi' : (this.$route.query.status == 'rejected_in_ministry' ? 'Expertga yuborilmadi' : (this.$route.query.status == 'recommend_in_commission' ? 'Tavsiya etildi' : this.$route.query.status == 'notrecommend_in_commission' ? 'Tavsiya etilmadi' : (this.$route.query.status == 'accepted_in_ministry' ? 'Expertga yuborildi' : 'Ariza qabul qilindi')))),
            search: val,
          },
          page: parseInt(this.current),
          limit: this.pageSize,
        },
        cb: {
          success: (response) => {},
          error: (response) => {
            console.log(response);
          },
        },
      });
    },
    handleSearch(selectedKeys, confirm, dataIndex) {
      confirm();
      this.searchText = selectedKeys[0];
      this.searchedColumn = dataIndex;
    },
    handleReset(clearFilters) {
      clearFilters();
      this.searchText = "";
    },
    onShowSizeChange(current, pageSize) {
      this.pageSize = pageSize;
      this.$store.dispatch("entity/loadAll", {
        entity: "applications",
        name: "all",
        url: "api/uadmin/AppsByUadmin",
        params: {
          extra: {status: this.$route.query.status == 'new' ? `Ariza yuborildi` : (this.$route.query.status == 'rejected_in_university' ? 'Ariza rad etildi' : 'Ariza qabul qilindi')},
          page: current,
          limit: pageSize,
        },
        cb: {
          success: (response) => {},
          error: (response) => {
            console.log(response);
          },
        },
      });
    },
    handelChange(current) {
      let role = localStorage.getItem('role')
      this.$router.push({ query: { page: current } });
      this.$store.dispatch("entity/loadAll", {
        entity: "applications",
        name: "all",
        url: role === "ROLE_ADMIN" ? 'api/admin/AppsByUadmin' : (role === "ROLE_EXPERT" ? 'api/expert/AppsByUadmin' : 'api/uadmin/AppsByUadmin'),
        params: {
          extra: {status: this.$route.query.status == 'new' ? `Ariza yuborildi` : (this.$route.query.status == 'rejected_in_university' ? 'Ariza rad etildi' : 'Ariza qabul qilindi')},
          page: parseInt(current),
          limit: this.pageSize,
        },
        cb: {
          success: (response) => {},
          error: (response) => {
            console.log(response);
          },
        },
      });
    },
    formatDate(date, format) {
      let dt = new Date(date);
      let month = ("00" + (dt.getMonth() + 1)).slice(-2);
      let day = ("00" + dt.getDate()).slice(-2);
      let year = dt.getFullYear();
      let hours = ("00" + dt.getHours()).slice(-2);
      let minutes = ("00" + dt.getMinutes()).slice(-2);
      let seconds = ("00" + dt.getSeconds()).slice(-2);

      switch (format) {
        case "DD-MM-YYYY":
          return day + "-" + month + "-" + year;
        case "YYYY-MM-DD":
          return year + "-" + month + "-" + day;
        case "DD.MM.YYYY / HH:mm:ss":
          return (
            day +
            "." +
            month +
            "." +
            year +
            " / " +
            hours +
            ":" +
            minutes +
            ":" +
            seconds
          );
        case "forComment":
          return hours + ":" + minutes + " / " + day + "." + month + "." + year;
        default:
          return day + "." + month + "." + year;
      }
    },
  },
};
</script>