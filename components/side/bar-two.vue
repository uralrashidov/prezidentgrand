<template>
  <div>
    <div class="bar__side">
      <div class="bar__logo">
        <img src="~/assets/images/logo/mag-logo.png" alt="" />
        <span>Ikkinchitalim.edu.uz
        </span>
      </div>
    </div>
    <a-menu
      :default-selected-keys="[`${key}`]"
      :default-open-keys="[`${openKey}`]"
      mode="inline"
      theme="dark"
      :inline-collapsed="false"
      :selected-keys="[`${key}`]"
      @click="handleClick"
    >
      <a-menu-item key="1">
        <nuxt-link to="/statics" tag="a">
          <a-icon type="bar-chart" :style="{ fontSize: '20px' }" />
          <span class="bar--label">Statistika</span>
        </nuxt-link>
      </a-menu-item>
      <a-sub-menu key="sub1">
        <span slot="title"
          ><a-icon type="file-text" :style="{ fontSize: '20px' }" /><span
            >Milliy diplomlar</span
          ></span
        >
        <a-menu-item key="2">
          <nuxt-link to="/diploma" tag="a" class="badge-flex">
            <span>Yangi diplomlar</span>
            <a-badge
              show-zero
              :overflow-count="999"
              :count="conutAll.countDipAll ? conutAll.countDipAll : 0"
              :number-style="{ backgroundColor: '#fff', color: '#999' }"
          /></nuxt-link>
        </a-menu-item>
        <a-menu-item key="3">
          <nuxt-link to="/diploma/reject" tag="a" class="badge-flex">
            <span>Rad etilganlar</span>
            <a-badge
              show-zero
              :overflow-count="999"
              :count="conutAll.countDipReject ? conutAll.countDipReject : 0"
              :number-style="{
                backgroundColor: '#FF4D4F',
                color: '#fff',
                borderColor: '#FF4D4F',
              }"
            />
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="4">
          <nuxt-link to="/diploma/confirm" tag="a" class="badge-flex"
            ><span>Tasdiqlanganlar</span>
            <a-badge
              show-zero
              :overflow-count="999"
              :count="conutAll.countDipConfirm ? conutAll.countDipConfirm : 0"
              :number-style="{
                backgroundColor: '#52C41A',
                color: '#fff',
                borderColor: '#52C41A',
              }"
          /></nuxt-link>
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub3">
        <span slot="title"
          ><a-icon type="file-text" :style="{ fontSize: '20px' }" /><span
            >Xorijiy diplomlar</span
          ></span
        >
        <a-menu-item key="8">
          <nuxt-link to="/foreigndiplom" tag="a" class="badge-flex">
            <span>Yangi diplomlar</span>
            <a-badge
              show-zero
              :overflow-count="999"
              :count="conutAll.countDipForAll ? conutAll.countDipForAll : 0"
              :number-style="{ backgroundColor: '#fff', color: '#999' }"
            />
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="9">
          <nuxt-link to="/foreigndiplom/reject" tag="a" class="badge-flex">
            <span>Rad etilganlar</span>
            <a-badge
              show-zero
              :overflow-count="999"
              :count="conutAll.countDipForReject ? conutAll.countDipForReject : 0"
              :number-style="{
                backgroundColor: '#FF4D4F',
                color: '#fff',
                borderColor: '#FF4D4F',
              }"
            />
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="10">
          <nuxt-link to="/foreigndiplom/confirm" tag="a" class="badge-flex">
            <span>Tasdiqlanganlar</span>
            <a-badge
              show-zero
              :overflow-count="999"
              :count="conutAll.countDipForConfirm ? conutAll.countDipForConfirm : 0"
              :number-style="{
                backgroundColor: '#52C41A',
                color: '#fff',
                borderColor: '#52C41A',
              }"
          /></nuxt-link>
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <span slot="title"
          ><a-icon type="solution" :style="{ fontSize: '20px' }" /><span
            class="bar--label"
            >Arizalar</span
          ></span
        >
        <a-menu-item key="5">
          <nuxt-link to="/application" tag="a" class="badge-flex">
            <span>Diplom tekshirilmoqda</span>
            <a-badge
              show-zero
              :overflow-count="999"
              :count="conutAll.countAppDipAll ? conutAll.countAppDipAll : 0"
              :number-style="{ backgroundColor: '#fff', color: '#999' }"
            />
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="12">
          <nuxt-link to="/application/diplomaconfirm" tag="a" class="badge-flex">
            <span>Diplom tasdiqlanganlar</span>
            <a-badge
              show-zero
              :overflow-count="999"
               :count="conutAll.countAppDipConfirm ? conutAll.countAppDipConfirm : 0"
              :number-style="{ backgroundColor: 'rgb(59 130 246 / 0.5)', color: '#fff' }"
            />
          </nuxt-link>
        </a-menu-item>
        <!-- <a-menu-item key="13">
          <nuxt-link to="/application/diplomareject" tag="a" class="badge-flex">
            <span>Diplom tasdiqlanmaganlar</span>
            <a-badge
              show-zero
              :overflow-count="999"
              count="0"
              :number-style="{ backgroundColor: '#fff', color: '#999' }"
            />
          </nuxt-link>
        </a-menu-item> -->
        <a-menu-item key="6">
          <nuxt-link to="/application/reject" tag="a" class="badge-flex">
            <span> Rad etilganlar arizalar</span>
            <a-badge
              show-zero
              :overflow-count="999"
              :count="conutAll.countAppReject ? conutAll.countAppReject : 0"
              :number-style="{
                backgroundColor: '#FF4D4F',
                color: '#fff',
                borderColor: '#FF4D4F',
              }"
            />
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="7">
          <nuxt-link to="/application/confirm" tag="a" class="badge-flex">
            <span>Tasdiqlanganlar arizalar</span>
            <a-badge
              show-zero
              :overflow-count="999"
              :count="conutAll.countAppConfirm ? conutAll.countAppConfirm : 0"
              :number-style="{
                backgroundColor: '#52C41A',
                color: '#fff',
                borderColor: '#52C41A',
              }"
            />
          </nuxt-link>
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item key="11" @click="logout">
        <a-icon type="logout" />
        <span>Chiqish</span>
        <a-icon type="form" />
      </a-menu-item>
    </a-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
      key: "1",
      openKey: "sub0",
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    logout() {
      this.$router.push({ path: "/login/regional" });
      localStorage.clear();
      sessionStorage.clear();
      this.$cookies.remove("token");
      this.$cookies.remove("token_expire");
    },
    handleClick(e){
      if(e.keyPath.length>1){
        this.key = e.keyPath[0]
        sessionStorage.setItem('key', e.keyPath[0])
        sessionStorage.setItem('openKey', e.keyPath[1])
        this.openKey = e.keyPath[1]
      } else {
        this.key = e.keyPath[0]
        sessionStorage.setItem('key', e.keyPath[0]==11 ? 1 : e.keyPath[0])
        sessionStorage.setItem('openKey', 'sub0')
        this.openKey = 'sub0'
      }
    }
  },
  mounted() {
    this.$store.dispatch("entity/loadAll", {
      entity: "countlayout",
      name: "all",
      url: "uadmin/countAll",
      params: {
        p: "note",
      },
      cb: {
        success: () => {
        },
        error: (response) => {
          console.log(response);
        },
      },
    });
  },
  computed: {
    conutAll(){
      let data = this.$store.getters["entity/getEntity"]("countlayout", "all").items
      const result = {
        countAppDipAll: '',
        countAppDipConfirm: '',
        countAppConfirm: '',
        countAppReject: '',

        countDipAll: '',
        countDipConfirm: '',
        countDipReject: '',

        countDipForAll: '',
        countDipForConfirm: '',
        countDipForReject: ''
      }
      if(data){
        if(data.countApp) {
          data.countApp.forEach((i) => {
            if (i.status == "Ariza qabul qilindi") {
              result.countAppConfirm = `${i.count ? i.count : 0}`;
            } else if (i.status == "Ariza rad etildi") {
              result.countAppReject = `${i.count ? i.count : 0}`;
            }
          });
        }
        if(data.countAppByDiplomaStatus) {
          data.countAppByDiplomaStatus.forEach((i) => {
            if (i.status == null) {
              result.countAppDipAll = `${i.count ? i.count : 0}`;
            } else if (i.status == "true") {
              result.countAppDipConfirm = `${i.count ? i.count : 0}`;
            }
          });
        }
        if(data.countDiploma){
          data.countDiploma.forEach((i) => {
            if (i.status == null) {
              result.countDipAll = `${i.count ? i.count : 0}`;
            } else if (i.status == "true") {
              result.countDipConfirm = `${i.count ? i.count : 0}`;
            } else if (i.status == "false") {
              result.countDipReject = `${i.count ? i.count : 0}`;
            }
          });
        }
        if(data.countForeignDiploma) {
          data.countForeignDiploma.forEach((i) => {
            if (i.status == null) {
              result.countDipForAll = `${i.count ? i.count : 0}`;
            } else if (i.status == "true") {
              result.countDipForConfirm = `${i.count ? i.count : 0}`;
            } else if (i.status == "false") {
              result.countDipForReject = `${i.count ? i.count : 0}`;
            }
          });
        }
      }
      return result;
    }
  },
  beforeMount(){
    if(sessionStorage.getItem('key')){
      this.key = sessionStorage.getItem('key')
    }
    if(sessionStorage.getItem('openKey')) {
      this.openKey = sessionStorage.getItem('openKey')
    }
  }
};
</script>