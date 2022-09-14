<template>
    <div class="outer-wrapper">
        <Header/>
        <div class="wrapper">
            <Nuxt />
        </div>
        <Footer/>
    </div>
</template>
<script>
import Header from '../components/header/header.vue';
import Footer from '../components/footer/footer.vue';
export default {
    components: {
        Header,
        Footer
    }
}
</script>
