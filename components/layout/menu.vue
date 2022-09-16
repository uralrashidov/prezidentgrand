<template>
    <div class="menu__box">
        <div class="menu__brandcame">
            <nuxt-link to="/" tag="div" class="menu__brand-home">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.5492 2.53318C11.3872 1.82618 12.6128 1.82618 13.4508 2.53318L20.2008 8.22772C20.7076 8.65523 21 9.28447 21 9.94747V19.7504C21 20.7169 20.2165 21.5004 19.25 21.5004H16.25C15.2835 21.5004 14.5 20.7169 14.5 19.7504V14.7504C14.5 14.3362 14.1642 14.0004 13.75 14.0004H10.25C9.83579 14.0004 9.5 14.3362 9.5 14.7504V19.7504C9.5 20.7169 8.7165 21.5004 7.75 21.5004H4.75C3.7835 21.5004 3 20.7169 3 19.7504V9.94747C3 9.28447 3.29241 8.65523 3.79916 8.22772L10.5492 2.53318Z" fill="#212121"/></svg>
                <span>Bosh sahifa</span>
            </nuxt-link >
            <div class="menu__brand-arrow">
                <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.221001 1.25871C-0.0911684 0.954347 -0.0700798 0.479854 0.268104 0.198901C0.606288 -0.0820516 1.1335 -0.0630718 1.44567 0.241293L4.779 3.49129C5.07367 3.77859 5.07367 4.22141 4.779 4.50871L1.44567 7.75871C1.1335 8.06307 0.606288 8.08205 0.268104 7.8011C-0.0700798 7.52015 -0.0911684 7.04565 0.221001 6.74129L3.03258 4L0.221001 1.25871Z" fill="#1A1A1A" fill-opacity="0.3"/></svg>
            </div>
            <div class="menu__brand-prof">
                mening profolim
            </div>
        </div>
        <div class="menu__block">
            <div class="menu__logo-layout">
                    <a-avatar :size="56" icon="user" class="menu__logo-img" />
                <div class="menu__logo-text">
                    Ural Rashidov
                </div>
            </div>
            <div class="menu__title">
                Shaxsiy kabinet
            </div>
            <div class="menu__side-bar">
                <nuxt-link tag="a" to="/profile/application" class="menu__side-item" :class="{'active': isActive==='application'}">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 2C4.9 2 4.01 2.9 4.01 4L4 20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8.83C20 8.3 19.79 7.79 19.41 7.42L14.58 2.59C14.21 2.21 13.7 2 13.17 2H6ZM13 8V3.5L18.5 9H14C13.45 9 13 8.55 13 8Z" fill="#8C8C8C"/></svg>
                    <div class="menu__side-text">
                        Mening arizam
                    </div>
                </nuxt-link>
                <nuxt-link tag="a" to="/profile/portfolios" class="menu__side-item" :class="{'active': isActive==='portfolios'}">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.41 7.41L14.58 2.58C14.21 2.21 13.7 2 13.17 2H6C4.9 2 4.01 2.9 4.01 4L4 20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8.83C20 8.3 19.79 7.79 19.41 7.41ZM10.23 17.29L8.11 15.17C7.72 14.78 7.72 14.15 8.11 13.76C8.5 13.37 9.13 13.37 9.52 13.76L10.93 15.17L14.47 11.63C14.86 11.24 15.49 11.24 15.88 11.63C16.27 12.02 16.27 12.65 15.88 13.04L11.64 17.28C11.26 17.68 10.62 17.68 10.23 17.29ZM14 9C13.45 9 13 8.55 13 8V3.5L18.5 9H14Z" fill="#8C8C8C"/></svg>
                    <div class="menu__side-text">
                        Portfolio
                    </div>
                </nuxt-link>
                <nuxt-link tag="a" to="/profile/personal" class="menu__side-item" :class="{'active': isActive==='personal'}">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V19C4 19.55 4.45 20 5 20H19C19.55 20 20 19.55 20 19V18C20 15.34 14.67 14 12 14Z" fill="#8C8C8C"/></svg>
                    <div class="menu__side-text">
                        Shaxsiy ma’lumotlarim
                    </div>
                </nuxt-link>
                <nuxt-link tag="a" to="/profile/notifications" class="menu__side-item" :class="{'active': isActive==='notifications'}">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.0013 21.75C13.1013 21.75 14.0013 20.85 14.0013 19.75H10.0013C10.0013 20.85 10.8913 21.75 12.0013 21.75ZM18.0013 15.75V10.75C18.0013 7.68 16.3613 5.11 13.5013 4.43V3.75C13.5013 2.92 12.8313 2.25 12.0013 2.25C11.1713 2.25 10.5013 2.92 10.5013 3.75V4.43C7.63127 5.11 6.00127 7.67 6.00127 10.75V15.75L4.71127 17.04C4.08127 17.67 4.52127 18.75 5.41127 18.75H18.5813C19.4713 18.75 19.9213 17.67 19.2913 17.04L18.0013 15.75Z" fill="#8C8C8C"/></svg>
                    <div class="menu__side-text">
                        Xabarlar
                    </div>
                </nuxt-link>
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
        isActive() {
            if (this.$route && this.$route.path) {
                return this.$route.path.split('/')[2]
            }        
        },
        profile() {
            return this.$store.getters["auth-check/profile"];
        },
        // getName(){
        //     if(get(this.$store.getters["auth-check/profile"], 'data.first_name') && get(this.$store.getters["auth-check/profile"], 'data.last_name')) {
        //         return get(this.$store.getters["auth-check/profile"], 'data.first_name') + ' ' + get(this.$store.getters["auth-check/profile"], 'data.last_name')
        //     }
        // },
    },
}
</script>