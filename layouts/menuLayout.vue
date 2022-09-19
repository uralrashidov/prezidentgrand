<template>
    <div class="outer-wrapper">
        <Header/>       
        <div class="wrapper">
            <div class="mob-navbar is-fixed">
                <Menufix/>
            </div>
            <div class="container">
                <div class="wrraper-box">
                    <div class="wrraper-box__menu">
                        <Menu/>
                    </div>
                    <div class="wrraper-box__index">
                        <Nuxt/>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
</template>
<script>
import Header from '../components/header/header.vue';
import Footer from '../components/footer/footer.vue';
import Menu from '~/components/layout/menu.vue';
import Menufix from '~/components/home/menufix.vue';
export default {
    components: {
        Header,
        Footer,
        Menu,
        Menufix
    },
    // mounted() {
    //     const profile = this.$store.getters["auth-check/profile"];
    //     if (!profile.isAuth) {
    //         this.$store.dispatch("auth-check/authGetMe");
    //     }
    // },
    // computed: {
    //     profile() {
    //         return this.$store.getters["auth-check/profile"];
    //     },
    // }
}
</script>