<template>
    <div class="outer-wrapper">
        <Header/>
        <div class="wrapper">
            <div class="mob-navbar is-fixed">
                <Menufix/>
            </div>
            <Nuxt />
        </div>
        <Footer/>
    </div>
</template>
<script>
import Header from '../components/header/header.vue';
import Footer from '../components/footer/footer.vue';
import Menufix from '~/components/home/menufix.vue';
export default {
    components: {
        Header,
        Footer,
        Menufix
    }
}
</script>
