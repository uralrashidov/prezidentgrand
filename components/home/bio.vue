<template>
    <div class="bio">
        <div class="container">
            <div class="row">
                <div class="col-lg-7">
                    <h1 class="bio__htext">
                        Oliy ta’lim muassasalari bakalavr kirish imtihonlarida eng yuqori ball to'plagan talabalar uchun <span>prezident granti</span>
                    </h1>
                    <div class="bio__ptext">
                        Talabalar uchun prezident granti tanloviga onlayn ariza yuborish portaliga xush kelibsiz!
                    </div>
                    <a href="http://172.18.9.93:8082/api/auth/oneId">
                        <button class="bio__btn">
                            <span>Ariza topshirish</span>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 19L13.59 17.59L18.17 13H2V11H18.17L13.58 6.41L15 5L22 12L15 19Z" fill="white"/></svg>
                        </button>
                    </a>
                    <div class="bio__resault">
                        <div class="bio__resault-num">
                          0
                        </div>
                        <div class="bio__resault-text">
                            Jami <br>
                            ro‘yxatdan o‘tganlar
                        </div>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="bio__img">
                       <img src="~/assets/images/img-bio.svg" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {

}
</script>