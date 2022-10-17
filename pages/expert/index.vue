<template>
    <div class="login">
        <div class="login__left">
            <div class="login__logo">
                <div class="login__img">
                    <img src="~/assets/images/logo/mag-logo.png" alt="">
                    <span>prezidentgranti.edu.uz</span>
                </div>
            </div>
            <div class="login__bottom">
                <div class="login__title">
                    Prezident granti <br>
                    <span>2022</span>
                </div>
                <div class="login__desc">
                    Oliy ta’lim muassasalari bakalavriatining kunduzgi ta’lim shakliga kirish imtihonlaridan eng yuqori ball to'plagan 200 nafar talabalar uchun O‘zbekiston Respublikasi Prezidenti granti
                </div>
            </div>
        </div>
        <div class="login__form">
            <div class="login__form-box">
                <div class="login__form-title">
                    Tizimga kirish
                </div>
                <a href="https://prezidentgranti.edu.uz/api/auth/oneId" @click="click" class="login__one-circle">
                    <span>ONE ID orqali kirish</span>
                    <div class="login__one-anime" style="animation-delay: 0s">
                    </div>
                    <div class="login__one-anime" style="animation-delay: 0.5s">
                    </div>
                </a>
                <div class="login__form-bottom-title">
                    O‘zbekiston Respublikasi qonunchiligi asosida, <br> shaxsingiz to‘g’risidagi ma’lumotlarni id.egov.uz <br> tizimidan olinganini ma’lum qilamiz
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        beforeCreate() {
            this.form = this.$form.createForm(this, { name: 'normal_login' });
        },
        methods: {
            click(){
                localStorage.setItem('admin', 2)
            }
        }
    };
</script>
<style lang="scss" scoped>
    #components-form-demo-normal-login .login-form {
        max-width: 300px;
    }
    #components-form-demo-normal-login .login-form-forgot {
        float: right;
    }
    #components-form-demo-normal-login .login-form-button {
        width: 100%;
    }
    .login {
        display: flex;
        &__left {
            width: 66%;
            flex-basis: 66%;
            height: 100vh;
            background-image: url(~/assets/images/761.jpg);
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            position: relative;
            &::after {
                content: '';
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 1;
                // background: radial-gradient(55% 58.18% at 0% 100%, rgba(67, 39, 186, 0.58) 0%, rgba(67, 39, 186, 0.14) 100%)
                // background-color: #4327BA;
            }
        }
        &__logo {
            position: absolute;
            top: 40px;
            left: 40px;
            z-index: 2;
        }
        &__img {
            display: flex;
            align-items: center;
            img {
                margin-right: 12px;
            }
            span {
                font-weight: 500;
                font-size: 20px;
                line-height: 28px;
                color: #FFFFFF;
            }
        }
        &__bottom {
            position: absolute;
            bottom: 40px;
            z-index: 2;
            padding: 32px;
            // background: url(~/assets/images/login-bottom.png), rgba(211, 211, 211, 0.44);
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            background-blend-mode: normal, luminosity;
            backdrop-filter: blur(60px);
            border-radius: 8px;
            margin: 0px 40px;
        }
        &__title {
            font-style: normal;
            font-weight: 400;
            font-size: 68px;
            line-height: 92px;
            color: #FFFFFF;
            span {
                font-style: normal;
                font-weight: 400;
                font-size: 68px;
                line-height: 92px;
                color: #FFC947;
            }
        }
        &__desc {
            font-style: normal;
            font-weight: 400;
            font-size: 24px;
            line-height: 32px;
            color: #FFFFFF;
            opacity: 0.8;
        }
        &__form {
            flex-basis: 44%;
            width: 44%;
        }
        &__form-box {
            padding-top: 136px;
            padding-left: 92px;
            padding-right: 68px;
            padding-bottom: 40px;
            position: relative;
            height: 100%;
        }
        &__form-title {
            font-style: normal;
            font-weight: 500;
            font-size: 38px;
            line-height: 46px;
            color: rgba(0, 0, 0, 0.85);
            text-align: center;
        }
        &__one-anime {
            width: 276px;
            height: 276px;
            background: #4327BA;
            position: absolute;
            border-radius: 50%;
            opacity: 0;
            animation: scaleIn 1.6s infinite cubic-bezier(.36, .11, .89, .32);
            z-index: -1;
        }
        &__one-circle {
            span {
                font-style: normal;
                font-weight: 500;
                font-size: 16px;
                line-height: 24px;
                text-align: center;
                color: #FFFFFF;
            }
            width: 228px;
            height: 228px;
            background: #4327BA;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            cursor: pointer;
            margin-top: 154px;
            margin-left: auto;
            margin-right: auto;
            position: relative;
            z-index: 9;
        }
        &__form-bottom-title {
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 22px;
            text-align: center;
            color: rgba(0, 0, 0, 0.45);
            margin-top: 280px;
        }
        &__form-input {
            margin-top: 142px;
            max-width: 80%;
            margin-left: auto;
            margin-right: auto;
        }
    }
    @keyframes scaleIn {
        from {
            transform: scale(.8, .8);
            opacity: .5;
        }
        to {
            transform: scale(1.5, 1.5);
            opacity: 0;
        }
    }
</style>