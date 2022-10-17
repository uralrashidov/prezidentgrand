<template>
  <div>
    <div>
      <back-app :items="items.candidateResponse" :app="items.applicationResponse"></back-app>
      <a-card
        style="width: 100%; border: 0"
        :tab-list="tabListNoTitle"
        :active-tab-key="noTitleKey"
        @tabChange="(key) => onTabChange(key, 'noTitleKey')"
      > 
      </a-card>
      <div v-if="noTitleKey === 'article'">
        <div class="card--box" v-if="items.candidateResponse">
          <a-row :gutter="[24, 8]">
            <a-col :span="12">
              <a-card
                title="Abituryent ma’lumotlari"
                :bordered="false"
                style="width: 100%"
              >
                <div class="student__box">
                  <div class="student__personal">
                    <div
                      class="student__per-img"
                      v-if="items.candidateResponse.fotoUrl"
                    >
                      <img
                        :src="`data:image/png;base64,${items.candidateResponse.fotoUrl}`"
                        alt=""
                      />
                    </div>
                    <div class="student__bio">
                      <div class="student__bio-fullname">
                        {{ items.candidateResponse.lastName }}
                        {{ items.candidateResponse.firstName }}
                        {{ items.candidateResponse.fatherName }}
                      </div>
                      <ul class="student__bio-data">
                        <li class="student__bio-item">
                          <div class="student__bio-item-title">
                            Jinsi va tug’ilgan yili:
                          </div>
                          <div class="student__bio-item-text">
                            {{items.candidateResponse.gender}}, {{ formatDate(items.candidateResponse.birthDate)}}
                          </div>
                        </li>
                        <li class="student__bio-item">
                          <div class="student__bio-item-title">Fuqaroligi:</div>
                          <div class="student__bio-item-text">
                            {{ items.candidateResponse.citizenship }}
                          </div>
                        </li>
                        <li class="student__bio-item">
                          <div class="student__bio-item-title">
                            Doimiy yashash manzili:
                          </div>
                          <div class="student__bio-item-text">
                           {{ items.candidateResponse.region}},  {{ items.candidateResponse.district}}, {{ items.candidateResponse.address}}
                          </div>
                        </li>
                        <li class="student__bio-item">
                          <div class="student__bio-item-title">JSHSHR raqami:</div>
                          <div class="student__bio-item-text">
                            {{ items.candidateResponse.pinfl }}
                          </div>
                        </li>
                        <li class="student__bio-item">
                          <div class="student__bio-item-title">
                            Telefon raqam:
                          </div>
                          <div class="student__bio-item-text">
                            {{items.candidateResponse.phoneNumber }}
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="student__diplom">
                    <div class="student__diplom-title">Ariza ma’lumotlari</div>
                    <div class="student__diplom-box" v-if="items.applicationResponse">
                      <div class="student__diplom-item">
                        <div class="student__diplom-i-title">
                          OTM rektori (direktori) tomonidan berilgan tavsifnoma:
                        </div>
                        <div class="student__diplom-i-text">
                          <a target="_blank" download :href="items.applicationResponse.credential">Yuklash</a>
                        </div>
                      </div>
                      <div class="student__diplom-item">
                        <div class="student__diplom-i-title">Reyting daftarcha nusxasi:</div>
                        <div class="student__diplom-i-text">
                          <a target="_blank" download :href="items.applicationResponse.ratingNotebookUrl">Yuklash</a>
                        </div>
                      </div>
                      <div class="student__diplom-item">
                        <div class="student__diplom-i-title">Ilmiy ishlar ro'yxati(tasdiqlangan):</div>
                        <div class="student__diplom-i-text">
                          <a target="_blank" download :href="items.applicationResponse.listScientificWorks">Yuklash</a>
                        </div>
                      </div>
                      <div class="student__diplom-item">
                        <div class="student__diplom-i-title">Davlat (o'zbek) tilini bilish bo'yicha tegishli kafedra xulosasi:</div>
                        <div class="student__diplom-i-text">
                          <a target="_blank" download :href="items.applicationResponse.ozbekLanguageCredential">Yuklash</a>
                        </div>
                      </div>
                      <div class="student__diplom-item">
                        <div class="student__diplom-i-title">
                          Xorijiy tilni bilish bo'yicha tegishli kafedra xulosasi:
                        </div>
                        <div class="student__diplom-i-text">
                          <a target="_blank" download :href="items.applicationResponse.foreignLanguageCredential">Yuklash</a>
                        </div>
                      </div>
                      <div class="student__diplom-item">
                        <div class="student__diplom-i-title">
                          O'zbekiston tarixini bilish bo'yicha tegishli kafedra xulosasi:
                        </div>
                        <div class="student__diplom-i-text">
                          <a target="_blank" download :href="items.applicationResponse.ozbIstoryCredential">Yuklash</a>
                        </div>
                      </div>
                      <div class="student__diplom-item">
                        <div class="student__diplom-i-title">
                          Rektor yo'llanma xati:
                        </div>
                        <div class="student__diplom-i-text">
                          <a target="_blank" download :href="items.applicationResponse.rectorReferralLetter">Yuklash</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a-card>
            </a-col>
            <a-col :span="12" v-if="items.applicationResponse">
              <a-card
                v-if="items.applicationResponse"
                style="width: 100%"
                title="Ariza ma'lumotlari"
                :tab-list="tabList"
                :active-tab-key="key"
                @tabChange="(key) => onTabChange(key, 'key')"
              >
                <div v-if="key == 1" class="file-img">
                  <iframe
                      v-if="(items.applicationResponse.credential.split('.')[items.applicationResponse.credential.split('.').length - 1]).toLowerCase() == 'pdf'
                      "
                      :src="items.applicationResponse.credential"
                      frameborder="0"
                    ></iframe>
                </div>
                <div v-if="key == 2" class="file-img">
                  <iframe
                      v-if="(items.applicationResponse.ratingNotebookUrl.split('.')[items.applicationResponse.ratingNotebookUrl.split('.').length - 1]).toLowerCase() == 'pdf'
                      "
                      :src="items.applicationResponse.ratingNotebookUrl"
                      frameborder="0"
                    ></iframe>
                </div>
                <div v-if="key == 3" class="file-img">
                  <iframe
                      v-if="(items.applicationResponse.listScientificWorks.split('.')[items.applicationResponse.listScientificWorks.split('.').length - 1]).toLowerCase() == 'pdf'
                      "
                      :src="items.applicationResponse.listScientificWorks"
                      frameborder="0"
                    ></iframe>
                </div>
                <div v-if="key == 4" class="file-img">
                  <iframe
                      v-if="(items.applicationResponse.ozbekLanguageCredential.split('.')[items.applicationResponse.ozbekLanguageCredential.split('.').length - 1]).toLowerCase() == 'pdf'
                      "
                      :src="items.applicationResponse.ozbekLanguageCredential"
                      frameborder="0"
                    ></iframe>
                </div>
                <div v-if="key == 5" class="file-img">
                  <iframe
                      v-if="(items.applicationResponse.foreignLanguageCredential.split('.')[items.applicationResponse.foreignLanguageCredential.split('.').length - 1]).toLowerCase() == 'pdf'
                      "
                      :src="items.applicationResponse.foreignLanguageCredential"
                      frameborder="0"
                    ></iframe>
                </div>
                <div v-if="key == 6 " class="file-img">
                  <iframe
                      v-if="(items.applicationResponse.ozbIstoryCredential.split('.')[items.applicationResponse.ozbIstoryCredential.split('.').length - 1]).toLowerCase() == 'pdf'
                      "
                      :src="items.applicationResponse.ozbIstoryCredential"
                      frameborder="0"
                    ></iframe>
                </div>
                <div v-if="key == 7 " class="file-img">
                  <iframe
                      v-if="(items.applicationResponse.rectorReferralLetter.split('.')[items.applicationResponse.rectorReferralLetter.split('.').length - 1]).toLowerCase() == 'pdf'
                      "
                      :src="items.applicationResponse.rectorReferralLetter"
                      frameborder="0"
                    ></iframe>
                </div>
              </a-card>
            </a-col>
          </a-row>
        </div>
      </div>
      <div v-if="noTitleKey === 'app'">
        <div class="card--box" v-if="items">
          <a-row :gutter="[24, 8]">
            <a-col :span="18">
              <a-card
                title="Abituryent ma’lumotlari"
                :bordered="false"
                style="width: 100%"
              >
                <div class="student__box">
                  <div class="student__personal">
                    <div
                      class="student__per-img"
                      v-if="items.candidateResponse.fotoUrl"
                    >
                      <div class="student__per-auto">
                        <img
                          :src="`data:image/png;base64,${items.candidateResponse.fotoUrl}`"
                          alt=""
                        />
                      </div>
                    </div>
                    <div class="student__bio">
                      <div class="student__bio-fullname">
                        {{ items.candidateResponse.lastName }}
                        {{ items.candidateResponse.firstName }}
                        {{ items.candidateResponse.fatherName }}
                      </div>
                      <ul class="student__bio-data">
                        <li class="student__bio-item">
                          <div class="student__bio-item-title">
                            Jinsi va tug’ilgan yili:
                          </div>
                          <div class="student__bio-item-text">
                            {{items.candidateResponse.gender}}, {{ formatDate(items.candidateResponse.birthDate)}}
                          </div>
                        </li>
                        <li class="student__bio-item">
                          <div class="student__bio-item-title">Fuqaroligi:</div>
                          <div class="student__bio-item-text">
                            {{ items.candidateResponse.citizenship }}
                          </div>
                        </li>
                        <li class="student__bio-item">
                          <div class="student__bio-item-title">
                            Doimiy yashash manzili:
                          </div>
                          <div class="student__bio-item-text">
                           {{ items.candidateResponse.region}},  {{ items.candidateResponse.district}}, {{ items.candidateResponse.address}}
                          </div>
                        </li>
                        <li class="student__bio-item">
                          <div class="student__bio-item-title">JSHSHR raqami:</div>
                          <div class="student__bio-item-text">
                            {{ items.candidateResponse.pinfl }}
                          </div>
                        </li>
                        <li class="student__bio-item">
                          <div class="student__bio-item-title">
                            Telefon raqam:
                          </div>
                          <div class="student__bio-item-text">
                            {{items.candidateResponse.phoneNumber }}
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </a-card>
            </a-col>
            <a-col :span="6">
              <a-card
                title="Ariza holati"
                :bordered="false"
                style="width: 100%"
              >
              <a-steps direction="vertical" :current="current">
                  <a-step :status="items.applicationResponse.status== 'Ariza shakillantirildi' ? 'finish' : (items.applicationResponse.status== 'Ariza rad etildi' ? 'error' : (items.applicationResponse.status== 'Ariza rad etildi' ? 'error' : (items.applicationResponse.status== 'Expertga yuborildi' ? 'finish' : (items.applicationResponse.status== 'Expertga yuborilmadi' ? 'error' : (items.applicationResponse.status== 'Tavsiya etildi' ? 'finish' : (items.applicationResponse.status== 'Tavsiya etilmadi' ? 'error' : 'finish'))))))" :title="items.applicationResponse.status" />
                </a-steps>
              </a-card>
            </a-col>
            <a-col :span="24">
              <a-card :bordered="false" style="width: 100%">
                <div class="card--title">
                  Portfolio
                </div>
                <div class="por--tabs">
                  <a-tabs size="large" :default-active-key="`${key2}`" @change="callback">
                      <a-tab-pane key="1">
                          <span slot="tab">
                              Yutuqlar({{items.achievementResponse.length}})
                              <a-icon type="trophy" />
                          </span>
                          <tables-portfolio :data="items.achievementResponse"></tables-portfolio>
                      </a-tab-pane>
                      <a-tab-pane key="2">
                          <span slot="tab">
                            Ilmiy yutuqlar({{items.scientificAchievementResponse.length}})
                              <a-icon type="trophy" />
                          </span>
                          <tables-portfolio :data="items.scientificAchievementResponse"></tables-portfolio>
                      </a-tab-pane>
                      <a-tab-pane key="3">
                          <span slot="tab">
                              Chet tili sertifikatlari({{items.certificateResponse.length}})
                              <a-icon type="global" />
                          </span>
                          <tables-portfolio-for :data="items.certificateResponse"></tables-portfolio-for>
                      </a-tab-pane>
                  </a-tabs>
              </div>
              </a-card>
            </a-col>
          </a-row>
        </div>
        <a-skeleton v-else active />
      </div>
      <div v-if="noTitleKey === 'education'">
        <div class="card--box" v-if="items.candidateResponse">
          <a-row :gutter="[24, 8]">
            <a-col :span="12">
              <a-card
                title="Abituryent ma’lumotlari"
                :bordered="false"
                style="width: 100%"
              >
                <div class="student__box">
                  <div class="student__personal">
                    <div
                      class="student__per-img"
                      v-if="items.candidateResponse.fotoUrl"
                    >
                      <img
                        :src="`data:image/png;base64,${items.candidateResponse.fotoUrl}`"
                        alt=""
                      />
                    </div>
                    <div class="student__bio">
                      <div class="student__bio-fullname">
                        {{ items.candidateResponse.lastName }}
                        {{ items.candidateResponse.firstName }}
                        {{ items.candidateResponse.fatherName }}
                      </div>
                      <ul class="student__bio-data">
                        <li class="student__bio-item">
                          <div class="student__bio-item-title">
                            Jinsi va tug’ilgan yili:
                          </div>
                          <div class="student__bio-item-text">
                            {{items.candidateResponse.gender}}, {{ formatDate(items.candidateResponse.birthDate)}}
                          </div>
                        </li>
                        <li class="student__bio-item">
                          <div class="student__bio-item-title">Fuqaroligi:</div>
                          <div class="student__bio-item-text">
                            {{ items.candidateResponse.citizenship }}
                          </div>
                        </li>
                        <li class="student__bio-item">
                          <div class="student__bio-item-title">
                            Doimiy yashash manzili:
                          </div>
                          <div class="student__bio-item-text">
                           {{ items.candidateResponse.region}},  {{ items.candidateResponse.district}}, {{ items.candidateResponse.address}}
                          </div>
                        </li>
                        <li class="student__bio-item">
                          <div class="student__bio-item-title">JSHSHR raqami:</div>
                          <div class="student__bio-item-text">
                            {{ items.candidateResponse.pinfl }}
                          </div>
                        </li>
                        <li class="student__bio-item">
                          <div class="student__bio-item-title">
                            Telefon raqam:
                          </div>
                          <div class="student__bio-item-text">
                            {{items.candidateResponse.phoneNumber }}
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </a-card>
            </a-col>
            <a-col :span="12">
              <a-card title="Ta'lim ma’lumotlari"
                :bordered="false"
                style="width: 100%">
                <div class="student__diplom">
                  <div class="student__diplom-box">
                    <div class="student__diplom-item">
                      <div class="student__diplom-i-title">
                        OTM nomi:
                      </div>
                      <div class="student__diplom-i-text">
                        {{items.candidateResponse.university}}
                      </div>
                    </div>
                    <div class="student__diplom-item">
                      <div class="student__diplom-i-title">Yo‘nalish nomi:</div>
                      <div class="student__diplom-i-text">
                          {{items.candidateResponse.speciality}}
                      </div>
                    </div>
                    <div class="student__diplom-item">
                      <div class="student__diplom-i-title">Ta’lim bosqichi:</div>
                      <div class="student__diplom-i-text">
                        {{items.candidateResponse.course}}
                      </div>
                    </div>
                    <div class="student__diplom-item">
                      <div class="student__diplom-i-title">Ta‘lim shakli:</div>
                      <div class="student__diplom-i-text">
                        {{items.candidateResponse.educationForm}}
                      </div>
                    </div>
                    <div class="student__diplom-item">
                      <div class="student__diplom-i-title">Ta‘lim sohasi:</div>
                      <div class="student__diplom-i-text">
                        {{items.candidateResponse.soha}}
                      </div>
                    </div>
                  </div>
                </div>
              </a-card>
            </a-col>
          </a-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import 'viewerjs/dist/viewer.css'
// import VueViewer from 'v-viewer'
// import Vue from 'vue'
// Vue.use(VueViewer)

export default {
  layout: "DashboardLayout",
  data() {
    return {
      title: '',
      visible: false,
      current: 1,
      id: this.$route.params.id,
      items: '',
      tabList: [
        {
          key: "1",
          tab: "OTM rektori (direktori) tomonidan berilgan tavsifnoma:",
        },
        {
          key: "2",
          tab: "Reyting daftarcha nusxasi:",
        },
        {
          key: "3",
          tab: "Ilmiy ishlar ro'yxati(tasdiqlangan):",
        },
        {
          key: "4",
          tab: "Davlat (o'zbek) tilini bilish bo'yicha tegishli kafedra xulosasi:",
        },
        {
          key: "5",
          tab: "Xorijiy tilni bilish bo'yicha tegishli kafedra xulosasi:",
        },
        {
          key: "6",
          tab: "O'zbekiston tarixini bilish bo'yicha tegishli kafedra xulosasi:",
        },
        {
          key: "7",
          tab: "Rektor yo'llanma xati:",
        },
      ],
      key: "1",
      tabListNoTitle: [
        {
          key: "article",
          tab: "Ariza ma'lumoti",
        },
        {
          key: "app",
          tab: "Portfolio",
        },
        {
          key: "education",
          tab: "Ta’lim ma’lumoti",
        },
      ],
      noTitleKey: "app",
      text: '',
      key2: '1'
    };
  },
  methods: {
    callback(key) {
        this.key2 = key
    },
    visibleModal(status, id, text){
      if(id == 1) {
        this.visible = status
        this.title = 'Diplom izohi'
        this.text = text
      } else {
        this.visible = status
        this.title = 'Ariza izohi'
        this.text = text
      }
    },
    onTabChange(key, type) {
      this[type] = key;
    },
    formatDate(date, format) {
      let dt = new Date(date);
      let month = ("00" + (dt.getMonth() + 1)).slice(-2);
      let day = ("00" + dt.getDate()).slice(-2);
      let year = dt.getFullYear();
      let hours = ("00" + dt.getHours()).slice(-2);
      let minutes = ("00" + dt.getMinutes()).slice(-2);
      let seconds = ("00" + dt.getSeconds()).slice(-2);

      switch (format) {
        case "YYYY":
          return year
        case "DD-MM-YYYY":
          return day + "-" + month + "-" + year;
        case "YYYY-MM-DD":
          return year + "-" + month + "-" + day;
        case "DD.MM.YYYY / HH:mm:ss":
          return (
            day +
            "." +
            month +
            "." +
            year +
            " / " +
            hours +
            ":" +
            minutes +
            ":" +
            seconds
          );
        case "forComment":
          return hours + ":" + minutes + " / " + day + "." + month + "." + year;
        default:
          return day + "." + month + "." + year;
      }
    },
  },
  mounted() {
    this.$store.dispatch("entity/loadOne", {
      entity: "applications",
      name: this.id,
      url: `api/uadmin/getAppByIdUAdmin/${this.id}`,
      params: {
        p: "not",
      },
      cb: {
        success: (response) => {
          if (response) {
            this.items = response;
          }
        },
      },
    });
  },
};
</script>