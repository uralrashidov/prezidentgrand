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
      <a-menu-item key="9" @click="logout">
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
      nuxtLink: [
        {key: 5, link: '/admin/super/user', name: 'Foydalanuvchilar', icon: 'bank'},
      ],
      key: 5,
      Openkeys: ['5'],
      Defaultselectedkeys: ['5'],
      Defaultopenkeys: ['5'],
      openKey: "sub0",
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    logout() {
        this.$router.push({path: '/admin/super'})
        localStorage.clear();
        this.$cookies.remove("token")
    },
    garri(e){
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
    }
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
  }
};
</script>
