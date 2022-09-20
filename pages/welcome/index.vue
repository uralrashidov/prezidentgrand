<template>
    <div class="container">
        <div class="request">
            <div class="request__box">
                <div class="request__loader">
                    <lottie-player
                        class="lottie-player"
                        src="https://assets7.lottiefiles.com/private_files/lf30_nrnx3s.json"
                        background="transparent"
                        speed="1"
                        style="width: 180px; height: 180px"
                        autoplay
                    ></lottie-player>
                </div>
                <div class="request__hello">
                    Assalomu alaykum!
                </div>
                <div class="request__full-name">
                  {{getName}}
                </div>
                <div class="request__welcome">
                    Qabul.edu.uz tizimiga xush kelibsiz!
                </div>
            </div>
            <button class="request__btn" @click="routeClick">
                Ma‘lumotnomani to‘ldirish va ariza topshirish
            </button>
            <div class="request__warn">
                O‘zbekiston Respublikasi <a href="#">qonunchiligi </a> asosida, shaxsingiz to‘g’risidagi ma’lumotlarni <a href="#">id.egov.uz</a> tizimidan olinganini ma’lum qilamiz
            </div>
        </div>
    </div>
</template>
<script>
import get from "lodash.get";

export default {
    layout: 'homeLayouts',
    computed: {
        profile() {
            return this.$store.getters["auths/profile"];
        },
        getName(){
            if(get(this.$store.getters["auths/profile"], 'data.firstName') && get(this.$store.getters["auths/profile"], 'data.lastName')) {
                return get(this.$store.getters["auths/profile"], 'data.firstName') + ' ' + get(this.$store.getters["auths/profile"], 'data.lastName')
            }
        }
    },
    data(){
        return {
            options: {
                playerSize: "standard",
                playerOne: null,
            }
        }
    },
    methods: {
        routeClick(){
            this.$router.push({path: '/profile/personal'})
        }
    },
}
</script>