<template>
    <div class="header">
        <div class="container">
            <div class="header__block">
                <nuxt-link to="/" tag="div" class="header__logo">
                    <div class="header__logo-img">
                        <img src="~/assets/images/logo/logo-img.png" alt="">
                    </div>
                    <div class="header__logo-text">
                        prezidentgranti.edu.uz
                    </div>
                </nuxt-link>
                <div class="header__menu">
                    <a href="https://prezidentgranti.edu.uz/api/auth/oneId" class="header__menu-btn" v-if="!profile.isAuth">
                        <span>ONE ID orqali kirish</span>
                        <span class="res">Kirish</span>
                    </a>
                    <div v-else class="header__menu-select">
                        <a-dropdown :trigger="['click']" class="header__select-box">
                            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                                <button>{{getName}}</button>
                                <span>Mening profilim</span>
                                <a-icon type="down" />
                            </a>
                            <a-menu slot="overlay" class="header__select-box-over">
                                <a-menu-item>
                                    <nuxt-link tag="a" to="/profile/application" class="menu__side-item" :class="{'active': isActive==='myapplication'}">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 2C4.9 2 4.01 2.9 4.01 4L4 20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8.83C20 8.3 19.79 7.79 19.41 7.42L14.58 2.59C14.21 2.21 13.7 2 13.17 2H6ZM13 8V3.5L18.5 9H14C13.45 9 13 8.55 13 8Z" fill="#8C8C8C"/></svg>
                                        <div class="menu__side-text">
                                            Mening arizam
                                        </div>
                                    </nuxt-link>
                                </a-menu-item>
                                <a-menu-item>
                                    <nuxt-link tag="a" to="/profile/portfolios" class="menu__side-item" :class="{'active': isActive==='myapplication'}">
                                        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" class=""><path d="M13 16h-2c-.55 0-1-.45-1-1H3.01v4c0 1.1.9 2 2 2H19c1.1 0 2-.9 2-2v-4h-7c0 .55-.45 1-1 1zm7-9h-4c0-2.21-1.79-4-4-4S8 4.79 8 7H4c-1.1 0-2 .9-2 2v3c0 1.11.89 2 2 2h6v-1c0-.55.45-1 1-1h2c.55 0 1 .45 1 1v1h6c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 7c0-1.1.9-2 2-2s2 .9 2 2H9.99 10z" fill="#8C8C8C"></path></svg>
                                        <div class="menu__side-text">
                                            Portfolio
                                        </div>
                                    </nuxt-link>
                                </a-menu-item>
                                <a-menu-item>
                                    <nuxt-link tag="a" to="/profile/personal" class="menu__side-item" :class="{'active': isActive==='myapplication'}">
                                        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" class=""><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4z" fill="#8C8C8C"></path></svg>
                                        <div class="menu__side-text">
                                            Shaxsiy ma'lumotlar
                                        </div>
                                    </nuxt-link>
                                </a-menu-item>
                                <a-menu-item>
                                    <nuxt-link tag="a" to="/profile/notifications" class="menu__side-item" :class="{'active': isActive==='result'}">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.0013 21.75C13.1013 21.75 14.0013 20.85 14.0013 19.75H10.0013C10.0013 20.85 10.8913 21.75 12.0013 21.75ZM18.0013 15.75V10.75C18.0013 7.68 16.3613 5.11 13.5013 4.43V3.75C13.5013 2.92 12.8313 2.25 12.0013 2.25C11.1713 2.25 10.5013 2.92 10.5013 3.75V4.43C7.63127 5.11 6.00127 7.67 6.00127 10.75V15.75L4.71127 17.04C4.08127 17.67 4.52127 18.75 5.41127 18.75H18.5813C19.4713 18.75 19.9213 17.67 19.2913 17.04L18.0013 15.75Z" fill="#8C8C8C"/></svg>
                                        <div class="menu__side-text">
                                            Xabarlar
                                        </div>
                                    </nuxt-link>
                                </a-menu-item>
                                <a-menu-item class="header__logout" @click="logout">
                                    Chiqish
                                </a-menu-item>
                            </a-menu>
                        </a-dropdown>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import get from "lodash.get";
export default {
    data(){
        return {
        }
    },
    computed: {
        profile() {
            return this.$store.getters["auths/profile"];
        },
        getName(){
            if(get(this.$store.getters["auths/profile"], 'data.firstName') && get(this.$store.getters["auths/profile"], 'data.lastName')) {
                return get(this.$store.getters["auths/profile"], 'data.firstName').slice(0,1) + get(this.$store.getters["auths/profile"], 'data.lastName').slice(0,1)
            }
        },
        getApp(){
            if(get(this.$store.getters["entity/getEntity"]("application", 'all'), 'items')){
                return get(this.$store.getters["entity/getEntity"]("application", 'all'), 'items')
            }
        },
        isActive() {
            if (this.$route && this.$route.path) {
                return this.$route.path.split('/')[1]
            }
        }
    },
    methods: {
        visibleClick(val){
            this.visible = val
        },
        logout(){
            this.$cookies.remove("token")
            this.$cookies.remove("refresh_token")
            window.location.href = "/"
        },
    },
}
</script>
