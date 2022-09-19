<template>
    <div class="container">
        <div class="request">
            <div class="request__loader">
                <lottie-player
                    class="lottie-player"
                    src="https://assets8.lottiefiles.com/packages/lf20_Tkwjw8.json"
                    background="transparent"
                    speed="1"
                    style="width: 180px; height: 180px"
                    autoplay
                ></lottie-player>
            </div>
            <div class="request__unsuccess">
                Kechirasiz sizning ma’lumotlaringiz topilmadi.
            </div>
            <button class="request__btn" @click="clickHome">
                Bosh sahifaga qaytish
            </button>
            <div class="request__warn">
                O‘zbekiston Respublikasi <a href="#">qonunchiligi </a> asosida, shaxsingiz to‘g’risidagi ma’lumotlarni <a href="#">id.egov.uz</a> tizimidan olinganini ma’lum qilamiz
            </div>
        </div>
    </div>
</template>
<script>
export default {
    layout: 'homeLayouts',
    methods: {
        clickHome(){
            this.$router.push({path: '/'})
        }
    }
}
</script>