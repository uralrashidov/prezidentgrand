<template>
  <div class="wrapper">
    <div class="bar" v-if="role == 'ROLE_ADMIN'">
      <side-bar></side-bar>
    </div>
    <div class="bar" v-else-if="role == 'ROLE_UADMIN'">
      <side-bar-two></side-bar-two>
    </div>
    <div class="bar" v-else-if="role == 'ROLE_EXPERT'">
      <side-bar-expert></side-bar-expert>
    </div>
    <div class="main-content">
      <div class="nav">
        <div class="nav__title">
          {{role == 'ROLE_EXPERT' ? `Expert admin panel,   Ta'lim sohasi: ${soha}` : role == 'ROLE_UADMIN' ? univerName : 'Vazirlik admin paneli'}}
        </div>
        <div class="nav__menu">
              <div class="table--btn" v-if="role == 'ROLE_ADMIN' && !(this.$route.params.id)">
                <a-button type="primary" size="large" @click="showModal">
                  Barcha arizalarni natijasini e'lon qilish
                </a-button>
                <a-modal
                  :title="false"
                  :visible="visible"
                  :confirm-loading="confirmLoading"
                  @ok="handleOk"
                  @cancel="handleCancel"
                >
                  <p class="result--p">Diqqat!</p>
                  <p>Eslatma: Siz bu orqali barcha ariza natijalarini e'lon qilasiz va talabalar kabenitida barcha statuslar ko'rinadi.</p>
                  <template slot="footer">
                    <a-button key="back" @click="handleCancel">
                      yo'q
                    </a-button>
                    <a-button key="submit" type="primary" @click="handleOk">
                      Ha
                    </a-button>
                  </template>
                </a-modal>
              </div>
            <div class="nav__input-search nav__item">
                <!-- <a-input-search placeholder="search" class="nav__input" @input="onSearch" v-model="search" />
                <svg width="24" height="24" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_153662_165789)">
                    <path d="M13.2115 12.3535L9.15371 8.2957C9.7834 7.48164 10.124 6.48633 10.124 5.43945C10.124 4.18633 9.63496 3.01133 8.75059 2.12539C7.86621 1.23945 6.68809 0.751953 5.43652 0.751953C4.18496 0.751953 3.00684 1.24102 2.12246 2.12539C1.23652 3.00977 0.749023 4.18633 0.749023 5.43945C0.749023 6.69102 1.23809 7.86914 2.12246 8.75351C3.00684 9.63945 4.1834 10.127 5.43652 10.127C6.4834 10.127 7.47715 9.78633 8.29121 9.1582L12.349 13.2145C12.3609 13.2264 12.375 13.2358 12.3906 13.2422C12.4061 13.2487 12.4228 13.252 12.4396 13.252C12.4565 13.252 12.4731 13.2487 12.4887 13.2422C12.5042 13.2358 12.5184 13.2264 12.5303 13.2145L13.2115 12.5348C13.2234 12.5229 13.2329 12.5087 13.2393 12.4932C13.2458 12.4776 13.2491 12.461 13.2491 12.4441C13.2491 12.4273 13.2458 12.4106 13.2393 12.3951C13.2329 12.3795 13.2234 12.3654 13.2115 12.3535V12.3535ZM7.91152 7.91445C7.24902 8.57539 6.3709 8.93945 5.43652 8.93945C4.50215 8.93945 3.62402 8.57539 2.96152 7.91445C2.30059 7.25195 1.93652 6.37383 1.93652 5.43945C1.93652 4.50508 2.30059 3.62539 2.96152 2.96445C3.62402 2.30352 4.50215 1.93945 5.43652 1.93945C6.3709 1.93945 7.25059 2.30195 7.91152 2.96445C8.57246 3.62695 8.93652 4.50508 8.93652 5.43945C8.93652 6.37383 8.57246 7.25352 7.91152 7.91445Z" fill="#780650"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_153662_165789">
                    <rect width="14" height="14" fill="white" transform="translate(-0.000976562)"/>
                    </clipPath>
                    </defs>
                </svg> -->
            </div>
            <!-- <svg class="nav__question-icon nav__item" width="24" height="24" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_153662_165792)">
                <path d="M6.99902 0.875C3.6166 0.875 0.874023 3.61758 0.874023 7C0.874023 10.3824 3.6166 13.125 6.99902 13.125C10.3814 13.125 13.124 10.3824 13.124 7C13.124 3.61758 10.3814 0.875 6.99902 0.875ZM6.99902 12.0859C4.19082 12.0859 1.91309 9.8082 1.91309 7C1.91309 4.1918 4.19082 1.91406 6.99902 1.91406C9.80723 1.91406 12.085 4.1918 12.085 7C12.085 9.8082 9.80723 12.0859 6.99902 12.0859Z" fill="#780650"/>
                <path d="M8.52459 4.32946C8.11444 3.96989 7.57303 3.77301 6.99881 3.77301C6.42459 3.77301 5.88319 3.97125 5.47303 4.32946C5.04647 4.7027 4.81131 5.20446 4.81131 5.74176V5.84567C4.81131 5.90582 4.86053 5.95504 4.92068 5.95504H5.57693C5.63709 5.95504 5.68631 5.90582 5.68631 5.84567V5.74176C5.68631 5.13883 6.27557 4.64801 6.99881 4.64801C7.72205 4.64801 8.31131 5.13883 8.31131 5.74176C8.31131 6.16696 8.01053 6.5566 7.54432 6.73571C7.25447 6.84645 7.00838 7.04059 6.83201 7.29489C6.65291 7.55465 6.55994 7.86637 6.55994 8.18219V8.47614C6.55994 8.53629 6.60916 8.58551 6.66932 8.58551H7.32557C7.38573 8.58551 7.43494 8.53629 7.43494 8.47614V8.16578C7.43565 8.03306 7.47634 7.90363 7.5517 7.79437C7.62705 7.68511 7.73359 7.6011 7.8574 7.55328C8.66404 7.24293 9.18494 6.53199 9.18494 5.74176C9.18631 5.20446 8.95115 4.7027 8.52459 4.32946ZM6.45193 10.0074C6.45193 10.1524 6.50955 10.2915 6.61211 10.3941C6.71467 10.4966 6.85377 10.5543 6.99881 10.5543C7.14385 10.5543 7.28295 10.4966 7.38551 10.3941C7.48807 10.2915 7.54568 10.1524 7.54568 10.0074C7.54568 9.86235 7.48807 9.72325 7.38551 9.62069C7.28295 9.51813 7.14385 9.46051 6.99881 9.46051C6.85377 9.46051 6.71467 9.51813 6.61211 9.62069C6.50955 9.72325 6.45193 9.86235 6.45193 10.0074Z" fill="#780650"/>
                </g>
                <defs>
                <clipPath id="clip0_153662_165792">
                <rect width="14" height="14" fill="white" transform="translate(-0.000976562)"/>
                </clipPath>
                </defs>
            </svg> -->
            <!-- <div class="nav__bradge-icon nav__item">
                <a-badge count="11">
                    <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.4276 12.5692H12.999V6.49777C12.999 3.97813 11.1365 1.89598 8.71331 1.54955V0.854911C8.71331 0.460268 8.39367 0.140625 7.99902 0.140625C7.60438 0.140625 7.28474 0.460268 7.28474 0.854911V1.54955C4.86152 1.89598 2.99902 3.97813 2.99902 6.49777V12.5692H2.57045C2.25438 12.5692 1.99902 12.8246 1.99902 13.1406V13.7121C1.99902 13.7906 2.06331 13.8549 2.14188 13.8549H5.99902C5.99902 14.9585 6.89545 15.8549 7.99902 15.8549C9.1026 15.8549 9.99902 14.9585 9.99902 13.8549H13.8562C13.9347 13.8549 13.999 13.7906 13.999 13.7121V13.1406C13.999 12.8246 13.7437 12.5692 13.4276 12.5692ZM7.99902 14.7121C7.52581 14.7121 7.14188 14.3281 7.14188 13.8549H8.85617C8.85617 14.3281 8.47224 14.7121 7.99902 14.7121ZM4.28474 12.5692V6.49777C4.28474 5.50491 4.67045 4.57277 5.37224 3.87098C6.07402 3.1692 7.00617 2.78348 7.99902 2.78348C8.99188 2.78348 9.92402 3.1692 10.6258 3.87098C11.3276 4.57277 11.7133 5.50491 11.7133 6.49777V12.5692H4.28474Z" fill="black" fill-opacity="0.85"/>
                    </svg>
                </a-badge>
            </div> -->
            <div class="nav__user nav__item">
                <div class="nav__user-img">
                    <img src="~/assets/images/Setting.png" alt="">
                </div>
                <span>{{fullname}}</span>
            </div>
        </div>
      </div>
      <Nuxt />
    </div>
  </div>
</template>
<script>
import get from "lodash.get";
export default {
  data(){
    return {
      fullname :'',
      role: '',
      univerName: localStorage.getItem('universityName'),
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
      soha: localStorage.getItem('soha')
    }
  },
  computed: {
  },
  mounted() {
    if(localStorage.getItem('fullName')){
      this.fullname = localStorage.getItem('fullName')
    }
    if(localStorage.getItem('role')) {
      this.role = localStorage.getItem('role')
    }
  },
  methods: {
    openNotificationWithIcon(type,message) {
        this.$notification[type]({
            message: 'Diqqat!',
            description: message,
        });
    },
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      let values = {}
      this.$store.dispatch("entity/form", {
          entity: 'acceptApp',
          name: 'all',
          updateData: false,
          prependData: false,
          method: 'post',
          url: 'api/admin/AcceptApp',
          params: {
              p: 'not',
          },
          values: values,
          cb: {
              success: response => {
                  this.openNotificationWithIcon('success', response.data.message)
                  this.visible = false
              },
              error: (error) => {
                if(error.response){
                    this.openNotificationWithIcon('error', error.response.data.message)
                }
              }
          }
      })
    },
    handleCancel(e) {
      console.log('Clicked cancel button');
      this.visible = false;
    },
  },
};
</script>
<style lang="scss"> 
    .nav {
        padding: 24px;
        width: 100%;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        &__title {
            font-style: normal;
            font-weight: 500;
            font-size: 20px;
            line-height: 24px;
            color: rgba(0, 0, 0, 0.85);
        }
        &__menu {
            display: flex;
            align-items: center;
        }
        &__item {
            margin-left: 24px;
            cursor: pointer;
        }
        &__user {
            display: flex;
            align-items: center;
            span {
                font-style: normal;
                font-weight: 400;
                font-size: 18px;
                line-height: 22px;
                color: rgba(0, 0, 0, 0.85);
            }
        }
        &__user-img {
            width: 24px;
            height: 24px;
            position: relative;
            margin-right: 8px;
            img {
                -webkit-transition: 1s;
                -o-transition: 1s;
                transition: 1s;
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                -o-object-fit: cover;
                object-fit: cover;
            }
        }
    }
    .nav__bradge-icon .ant-scroll-number-only-unit.current {
        color: #000;
    }
</style>