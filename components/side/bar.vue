<template>
  <div>
    <div class="bar__side">
      <div class="bar__logo">
        <img src="~/assets/images/logo/mag-logo.png" alt="">
        <span>Prezidentgranti.edu.uz</span>
      </div>
    </div>
    <a-menu
      :default-selected-keys="Defaultselectedkeys"
      :default-open-keys="[`${openKey}`]"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
      @click="garri"
    >
      <a-menu-item v-for="i in nuxtLink" :key="`${i.key}`">
        <nuxt-link :to="i.link" tag="a">
          <a-icon :type="i.icon" />
          <span>{{i.name}}</span>
        </nuxt-link>
      </a-menu-item>
      <a-sub-menu key="sub1">
        <span slot="title"
          ><a-icon type="file-text" :style="{ fontSize: '20px' }" /><span
            >Arizalar</span
          ></span
        >
        <a-menu-item key="7">
          <nuxt-link to="/admin/super/applications?status=new" tag="a" class="badge-flex">
            <span>Yangi arizalar</span>
            <a-badge
              show-zero
              :overflow-count="999"
              :count="countAll.newCountApp"
              :number-style="{ backgroundColor: '#fff', color: '#999' }"
            />
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="8">
          <nuxt-link to="/admin/super/applications?status=rejected_in_university" tag="a" class="badge-flex">
            <span>Universitet rad etgan arizalar</span>
            <a-badge
              show-zero
              :overflow-count="999"
              :count="countAll.univerRejectApp"
              :number-style="{
                backgroundColor: '#FF4D4F',
                color: '#fff',
                borderColor: '#FF4D4F',
              }"
            />
            </nuxt-link>
        </a-menu-item>
        <a-menu-item key="10">
          <nuxt-link to="/admin/super/applications?status=accepted_in_university" tag="a" class="badge-flex">
            <span>Vazirlikka kelgan arizalar soni</span>
            <a-badge
              show-zero
              :overflow-count="999"
              :count="countAll.univerConfirmApp"
              :number-style="{
                backgroundColor: '#52C41A',
                color: '#fff',
                borderColor: '#52C41A',
              }"
            />
            </nuxt-link>
        </a-menu-item>
        <a-menu-item key="13">
          <nuxt-link to="/admin/super/applications?status=rejected_in_ministry" tag="a" class="badge-flex">
            <span>Expertga yuborilmagan arizalar</span>
            <a-badge
              show-zero
              :overflow-count="999"
              :count="countAll.expertNotSentApp"
              :number-style="{
                backgroundColor: 'rgb(125 31 132)',
                color: '#fff',
                borderColor: '#FF4D4F',
              }"
            />
            </nuxt-link>
        </a-menu-item>
        <a-menu-item key="14">
          <nuxt-link to="/admin/super/applications?status=accepted_in_ministry" tag="a" class="badge-flex">
            <span>Expertga yuborilgan arizalar</span>
            <a-badge
              show-zero
              :overflow-count="999"
              :count="countAll.expertSentApp"
              :number-style="{
                backgroundColor: 'rgb(44 104 236)',
                color: '#fff',
                borderColor: '#52C41A',
              }"
            />
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="11">
          <nuxt-link to="/admin/super/applications?status=recommend_in_commission" tag="a" class="badge-flex">
            <span>Expert tavsiya etgan arizalar</span>
            <a-badge
              show-zero
              :overflow-count="999"
              :count="countAll.expertConfirmApp"
              :number-style="{
                backgroundColor: '#52C41A',
                color: '#fff',
                borderColor: '#52C41A',
              }"
            />
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="12">
          <nuxt-link to="/admin/super/applications?status=notrecommend_in_commission" tag="a" class="badge-flex">
            <span>Expert tavsiya etmagan arizalar</span>
            <a-badge
              show-zero
              :overflow-count="999"
              :count="countAll.expertRejectApp"
              :number-style="{
                backgroundColor: '#FF4D4F',
                color: '#fff',
                borderColor: '#FF4D4F',
              }"
            />
          </nuxt-link>
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item key="9" @click="logout">
        <a-icon type="logout" />
        <span>Chiqish</span>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collapsed: false,
      nuxtLink: [
        {key: 6, link: '/admin/super/statistic', name: 'Statistika', icon: 'area-chart'},
        {key: 5, link: '/admin/super/user', name: 'Foydalanuvchilar', icon: 'bank'},
        {key: 15, link: '/admin/super/universityuser', name: 'Universitet adminlari', icon: 'user'},
      ],
      key: 5,
      Openkeys: ['5'],
      Defaultselectedkeys: ['5'],
      Defaultopenkeys: ['5'],
      openKey: "sub0",
    };
  },
  mounted() {
    this.$store.dispatch("entity/loadAll", {
      entity: "countAll",
      name: "all",
      url: "api/admin/statistic",
      params: {
        p: "not",
      },
      cb: {
        success: (response) => {
        },
        error: (response) => {
          console.log(response);
        },
      },
    });
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    logout() {
        this.$router.push({path: '/admin/super'})
        this.$cookies.remove("token")
        localStorage.clear();
    },
    garri(e){
      if(e.key != 9) {
        this.$store.dispatch("entity/loadAll", {
            entity: "applications",
            name: "all",
            url: "api/admin/AppsByUadmin",
            params: {
                extra: {status: this.$route.query.status == 'new' ? `Ariza shakillantirildi` : (this.$route.query.status == 'rejected_in_university' ? 'Ariza rad etildi' : (this.$route.query.status == 'rejected_in_ministry' ? 'Expertga yuborilmadi' : (this.$route.query.status == 'recommend_in_commission' ? 'Tavsiya etildi' : this.$route.query.status == 'notrecommend_in_commission' ? 'Tavsiya etilmadi' : (this.$route.query.status == 'accepted_in_ministry' ? 'Expertga yuborildi' : 'Ariza qabul qilindi'))))},
                page: this.$route.query.page ? this.$route.query.page : 1,
                limit: this.$route.query.size ? this.$route.query.size : 20,
            },
            cb: {
                success: response => {
  
                },
                error: response => {
                    console.log(response);
                }
            }
        });
      }
       if(e.keyPath.length>1){
        sessionStorage.setItem('key', e.keyPath[0])
        sessionStorage.setItem('openKey', e.keyPath[1])
        this.openKey = e.keyPath[1]
        if(e.keyPath[0]!=9){
          sessionStorage.setItem('key', e.keyPath[0])
          this.Defaultselectedkeys = [`${e.keyPath[0]}`]
        } else {
          sessionStorage.setItem('key', 5)
          this.Defaultselectedkeys = [`${5}`]
        }
      } else {
        sessionStorage.setItem('key', e.keyPath[0]==11 ? 1 : e.keyPath[0])
        sessionStorage.setItem('openKey', 'sub0')
        this.openKey = 'sub0'
        if(e.keyPath[0]!=9){
          sessionStorage.setItem('key', e.keyPath[0])
          this.Defaultselectedkeys = [`${e.keyPath[0]}`]
        } else {
          sessionStorage.setItem('key', 5)
          this.Defaultselectedkeys = [`${5}`]
        }
      }
    },
  },
  beforeMount(){
    if(sessionStorage.getItem('openKey')) {
      this.openKey = sessionStorage.getItem('openKey')
    }
    let key = sessionStorage.getItem('key')
    if(!key){
      this.Defaultselectedkeys = ['5']
    } else {
      if(parseInt(key)===9){
        this.Defaultselectedkeys = [`${5}`]
      } else {
        this.Defaultselectedkeys = [`${key}`]
      }
    }
  },
  computed: {
     countAll() {
      let data = this.$store.getters["entity/getEntity"](
        "countAll",
        "all"
      ).items;

      const result = {
          newCountApp: 0,
          univerConfirmApp: 0,
          univerRejectApp: 0,

          expertSentApp: 0,
          expertNotSentApp: 0,

          expertRejectApp: 0,
          expertConfirmApp: 0,
      };

      if(data){
        if(data.countApps){
          data.countApps.forEach(i => {
            if(i.status == 'Ariza shakillantirildi'){
              result.newCountApp = i.count ? i.count : 0
            } else if(i.status == 'Ariza qabul qilindi'){
              result.univerConfirmApp = i.count ? i.count : 0
            } else if(i.status == 'Ariza rad etildi'){
              result.univerRejectApp = i.count ? i.count : 0
            } else if(i.status == 'Expertga yuborildi') {
              result.expertSentApp = i.count ? i.count : 0
            } else if(i.status == 'Expertga yuborilmadi') {
              result.expertNotSentApp = i.count ? i.count : 0
            } else if(i.status == 'Tavsiya etildi'){
              result.expertConfirmApp = i.count ? i.count : 0
            } else if(i.status == 'Tavsiya etilmadi'){
              result.expertRejectApp = i.count ? i.count : 0
            }
          })
        }
      }
      return result
    },
  },
};
</script>
