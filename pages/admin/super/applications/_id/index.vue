<template>
  <div>
    <div v-if="items">
      <!-- <back-app :items="items" :institutionOldNameId="items.diplomaResponse"></back-app> -->
      <a-card
        style="width: 100%; border: 0"
        :tab-list="tabListNoTitle"
        :active-tab-key="noTitleKey"
        @tabChange="(key) => onTabChange(key, 'noTitleKey')"
      >
      </a-card>
      <div v-if="noTitleKey === 'article'" class="card--box">
        <a-row :gutter="[24, 8]">
          <a-col :span="18">
            <a-card
              v-if="items"
              title="Abituryent ma’lumotlari"
              :bordered="false"
              style="width: 100%"
            >
              <div class="student__box">
                <div class="student__personal" v-if="items.enrolleeResponse">
                  <div
                    class="student__per-img"
                    v-if="items.enrolleeResponse.photo"
                  >
                    <img
                      :src="`data:image/png;base64,${items.enrolleeResponse.photo.image}`"
                      alt=""
                    />
                  </div>
                  <div class="student__bio">
                    <div class="student__bio-fullname">
                      {{ items.enrolleeResponse.lastname }}
                      {{ items.enrolleeResponse.firstname }}
                      {{ items.enrolleeResponse.middleName }}
                    </div>
                    <ul class="student__bio-data">
                      <li class="student__bio-item">
                        <div class="student__bio-item-title">
                          Jinsi va tug’ilgan yili:
                        </div>
                        <div class="student__bio-item-text">
                          {{
                            items.enrolleeResponse.gender == 1 ? "Erkak" : "Ayol"
                          }}
                          ,{{ items.enrolleeResponse.dateOfBirth }}
                        </div>
                      </li>
                      <li class="student__bio-item">
                        <div class="student__bio-item-title">Fuqaroligi:</div>
                        <div class="student__bio-item-text">
                          {{ items.enrolleeResponse.citizenship }}
                        </div>
                      </li>
                      <li class="student__bio-item">
                        <div class="student__bio-item-title">
                          Doimiy yashash manzili:
                        </div>
                        <div class="student__bio-item-text">
                          {{ items.enrolleeResponse.permanentAddress }}
                        </div>
                      </li>
                      <li class="student__bio-item">
                        <div class="student__bio-item-title">J.SH.SH.I.R:</div>
                        <div class="student__bio-item-text">
                          {{ items.enrolleeResponse.pinfl }}
                        </div>
                      </li>

                      <li class="student__bio-item">
                        <div class="student__bio-item-title">Telefon raqam:</div>
                        <div class="student__bio-item-text">
                          {{ "+" + items.enrolleeResponse.phoneNumber }}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="student__diplom">
                  <div class="student__diplom-title">
                    Abituriyent arizasining ma’lumotlari
                  </div>
                  <div class="student__diplom-box">
                    <div class="student__diplom-item">
                      <div class="student__diplom-i-title">OTM nomi:</div>
                      <div class="student__diplom-i-text">
                        {{ items.futureInstitutionName }}
                      </div>
                    </div>
                    <div class="student__diplom-item">
                      <div class="student__diplom-i-title">Yo‘nalish nomi:</div>
                      <div class="student__diplom-i-text">
                        {{ items.directionName }}
                      </div>
                    </div>
                    <div class="student__diplom-item">
                      <div class="student__diplom-i-title">Ta’lim tili:</div>
                      <div class="student__diplom-i-text">
                        {{ items.tilName }}
                      </div>
                    </div>
                    <div class="student__diplom-item">
                      <div class="student__diplom-i-title">Ta’lim shakli:</div>
                      <div class="student__diplom-i-text">
                        {{ items.shaklName }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="student__diplom" v-if="items.diplomaResponse">
                  <div class="student__diplom-title">
                    Abituriyentning tamomlagan ta’lim ma’lumotlari
                  </div>
                  <div class="student__diplom-box">
                    <div class="student__diplom-item">
                      <div class="student__diplom-i-title">
                        OTM joylashgan davlat:
                      </div>
                      <div class="student__diplom-i-text">
                        {{ items.diplomaResponse.countryName }}
                      </div>
                    </div>
                    <div class="student__diplom-item">
                      <div class="student__diplom-i-title">OTM nomi:</div>
                      <div class="student__diplom-i-text">
                        {{ items.diplomaResponse.institutionName }}
                      </div>
                    </div>
                    <div class="student__diplom-item">
                      <div class="student__diplom-i-title">Yo‘nalish nomi:</div>
                      <div class="student__diplom-i-text">
                        {{ items.diplomaResponse.specialityName }}
                      </div>
                    </div>
                    <div class="student__diplom-item">
                      <div class="student__diplom-i-title">Ta’lim shakli:</div>
                      <div class="student__diplom-i-text">
                        {{ items.diplomaResponse.eduFormName }}
                      </div>
                    </div>
                    <div class="student__diplom-item">
                      <div class="student__diplom-i-title">
                        Diplom seriyasi va raqami:
                      </div>
                      <div class="student__diplom-i-text">
                        {{ items.diplomaResponse.diplomaNumberAndDiplomaSerial }}
                      </div>
                    </div>
                    <div class="student__diplom-item">
                      <div class="student__diplom-i-title">Tamomlagan yili:</div>
                      <div class="student__diplom-i-text">
                        {{ formatDate(items.diplomaResponse.eduFinishingDate, "YYYY") }}
                        
                      </div>
                    </div>
                    <div
                      class="student__diplom-item"
                      v-if="items.diplomaResponse.fileResponse"
                    >
                      <div class="student__diplom-i-title">Diplom nusxasi:</div>
                      <div class="student__diplom-i-text" v-if="items.diplomaResponse.fileResponse.diplomaCopyResponse">
                        <a
                          download
                          :href="
                            items.diplomaResponse.fileResponse.diplomaCopyResponse
                              .url
                          "
                          target="_blank"
                          >Yuklash</a
                        >
                      </div>
                    </div>
                    <div
                      class="student__diplom-item"
                      v-if="items.diplomaResponse.fileResponse"
                    >
                      <div class="student__diplom-i-title">Diplom ilovasi::</div>
                      <div class="student__diplom-i-text" v-if="items.diplomaResponse.fileResponse.diplomaIlovaResponse">
                        <a
                          download
                          :href="
                            items.diplomaResponse.fileResponse
                              .diplomaIlovaResponse.url
                          "
                          target="_blank"
                          >Yuklash</a
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </a-card>
          </a-col>
          <a-col :span="6">
            <a-card v-if="items">
              <div class="application--action">
                <div class="application--action-title">Ariza holati</div>
                <a-steps direction="vertical" :current="current">
                  <a-step status="finish" :title="`Ariza yuborildi`" />
                  <a-step
                    :status="
                      items.diplomaStatus == 'null'
                        ? 'wait'
                        : items.diplomaStatus === 'true'
                        ? 'finish'
                        : 'error'
                    "
                    :title="
                      items.diplomaStatus == 'null'
                        ? 'Diplom tasdiqlandi/Diplom tasdiqlanmadi'
                        : items.diplomaStatus == 'true'
                        ? 'Diplom tasdiqlandi'
                        : 'Diplom tasdiqlanmadi'
                    "
                  >
                  <span @click="visibleModal(true, 1, items.storyMessageResponse.diploma)" v-if="(items.diplomaStatus == 'true') || (items.diplomaStatus == 'false')" slot="description" class="desc">Izoh</span>
                  </a-step>
                  <a-step
                    :status="
                      items.appStatus === 'Ariza yuborildi' ? 'process' : 'finish'
                    "
                    v-if="items.appStatus === 'Ariza yuborildi'"
                    title="Ariza ko'rib chiqilmoqda"
                  />
                  <a-step
                    :status="
                      items.appStatus === 'Ariza yuborildi'
                        ? 'wait'
                        : items.appStatus === 'Ariza qabul qilindi'
                        ? 'finish'
                        : 'error'
                    "
                    :title="
                      items.appStatus === 'Ariza yuborildi'
                        ? 'Ariza qabul qilindi/Ariza rad etildi'
                        : items.appStatus === 'Ariza qabul qilindi'
                        ? 'Ariza qabul qilindi'
                        : 'Ariza rad etildi'
                    "
                  >
                    <span @click="visibleModal(true, 2, items.storyMessageResponse.app)"  v-if="(items.appStatus == 'Ariza qabul qilindi') || (items.appStatus == 'Ariza rad etildi')" slot="description" class="desc">Izoh</span>
                  </a-step>
                </a-steps>
                <a-modal :width="1024" v-model="visible" :title="title" on-ok="handleOk">
                  <p class="modal-table">
                    <!-- <pre>{{text}}</pre> -->
                    <table>
                      <tr>
                        <th>Kim tomonidan</th>
                        <th>Holati</th>
                        <th>Izoh matni</th>
                        <th>Izoh yozilgan vaqt</th>
                      </tr>
                      <tr v-for="(i,index) in text" :key="index" :class="{'confirm': (i.status === 'true' ? true : (i.status=='Ariza qabul qilindi')), 'reject': (i.status === 'false' ? true : (i.status=='Ariza rad etildi'))}">
                        <td>{{i.createBy}}</td>
                        <td>{{(i.status === 'true' ? 'Diplom tasdiqlangan' : (i.status === 'false' ? 'Diplom rad etilgan' : i.status))}}</td>
                        <td>{{i.message}}</td>
                        <td>{{formatDate(i.time,'DD.MM.YYYY / HH:mm:ss')}}</td>
                      </tr>
                    </table>
                  </p>
                  <template slot="footer">
                    <a-button key="back" @click="visible = false">
                      Yopish
                    </a-button>
                  </template>
                </a-modal>
              </div>
            </a-card>
            <a-skeleton v-else active />
          </a-col>
        </a-row>
      </div>
      <div v-if="noTitleKey === 'app'">
        <div class="card--box" v-if="items">
          <a-row :gutter="[24, 8]">
            <a-col :span="12">
              <a-card
                title="Abituryent ma’lumotlari"
                :bordered="false"
                style="width: 100%"
              >
                <div class="student__box">
                  <div class="student__personal" v-if="items.enrolleeResponse">
                    <div
                      class="student__per-img"
                      v-if="items.enrolleeResponse.photo"
                    >
                      <img
                        :src="`data:image/png;base64,${items.enrolleeResponse.photo.image}`"
                        alt=""
                      />
                    </div>
                    <div class="student__bio">
                      <div class="student__bio-fullname">
                        {{ items.enrolleeResponse.lastname }}
                        {{ items.enrolleeResponse.firstname }}
                        {{ items.enrolleeResponse.middleName }}
                      </div>
                      <ul class="student__bio-data">
                        <li class="student__bio-item">
                          <div class="student__bio-item-title">
                            Jinsi va tug’ilgan yili:
                          </div>
                          <div class="student__bio-item-text">
                            {{
                              items.enrolleeResponse.gender == 1
                                ? "Erkak"
                                : "Ayol"
                            }}
                            ,{{ items.enrolleeResponse.dateOfBirth }}
                          </div>
                        </li>
                        <li class="student__bio-item">
                          <div class="student__bio-item-title">Fuqaroligi:</div>
                          <div class="student__bio-item-text">
                            {{ items.enrolleeResponse.citizenship }}
                          </div>
                        </li>
                        <li class="student__bio-item">
                          <div class="student__bio-item-title">
                            Doimiy yashash manzili:
                          </div>
                          <div class="student__bio-item-text">
                            {{ items.enrolleeResponse.permanentAddress }}
                          </div>
                        </li>
                        <li class="student__bio-item">
                          <div class="student__bio-item-title">J.SH.SH.I.R:</div>
                          <div class="student__bio-item-text">
                            {{ items.enrolleeResponse.pinfl }}
                          </div>
                        </li>

                        <li class="student__bio-item">
                          <div class="student__bio-item-title">
                            Telefon raqam:
                          </div>
                          <div class="student__bio-item-text">
                            {{ "+" + items.enrolleeResponse.phoneNumber }}
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="student__diplom">
                    <div class="student__diplom-title">Diplom ma’lumotlari</div>
                    <div class="student__diplom-box">
                      <div class="student__diplom-item">
                        <div class="student__diplom-i-title">
                          OTM joylashgan davlat:
                        </div>
                        <div class="student__diplom-i-text">
                          {{ items.diplomaResponse.countryName }}
                        </div>
                      </div>
                      <div class="student__diplom-item">
                        <div class="student__diplom-i-title">OTM nomi:</div>
                        <div class="student__diplom-i-text">
                          {{ items.diplomaResponse.institutionName }}
                        </div>
                      </div>
                      <div class="student__diplom-item">
                        <div class="student__diplom-i-title">Yo‘nalish nomi:</div>
                        <div class="student__diplom-i-text">
                          {{ items.diplomaResponse.specialityName }}
                        </div>
                      </div>
                      <div class="student__diplom-item">
                        <div class="student__diplom-i-title">Ta’lim shakli:</div>
                        <div class="student__diplom-i-text">
                          {{ items.diplomaResponse.eduFormName }}
                        </div>
                      </div>
                      <div class="student__diplom-item">
                        <div class="student__diplom-i-title">
                          Diplom seriyasi va raqami:
                        </div>
                        <div class="student__diplom-i-text">
                          {{
                            items.diplomaResponse.diplomaNumberAndDiplomaSerial
                          }}
                        </div>
                      </div>
                      <div class="student__diplom-item">
                        <div class="student__diplom-i-title">
                          Tamomlagan yili:
                        </div>
                        <div class="student__diplom-i-text">
                          {{formatDate(items.diplomaResponse.eduFinishingDate, 'YYYY') }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a-card>
            </a-col>
            <a-col :span="12" v-if="items.diplomaResponse">
              <a-card
                v-if="items.diplomaResponse.fileResponse"
                style="width: 100%"
                title="Diplom nusxasi va ilovasi"
                :tab-list="tabList"
                :active-tab-key="key"
                @tabChange="(key) => onTabChange(key, 'key')"
              >
                <div v-if="key == 1" slot="extra">
                  <div
                    v-if="items.diplomaResponse.fileResponse.diplomaCopyResponse"
                  >
                    <a
                      download
                      :href="
                        items.diplomaResponse.fileResponse.diplomaCopyResponse.url
                      "
                      >Yuklash</a
                    >
                  </div>
                </div>
                <div v-else slot="extra">
                  <div
                    v-if="items.diplomaResponse.fileResponse.diplomaCopyResponse"
                  >
                    <a
                      download
                      :href="
                        items.diplomaResponse.fileResponse.diplomaIlovaResponse
                          .url
                      "
                      >Yuklash</a
                    >
                  </div>
                </div>
                <div v-if="key == 1" class="file-img">
                  <div
                    v-if="items.diplomaResponse.fileResponse.diplomaCopyResponse"
                  >
                    <iframe
                      v-if="(items.diplomaResponse.fileResponse.diplomaCopyResponse.url.split('.')[items.diplomaResponse.fileResponse.diplomaCopyResponse.url.split('.').length - 1]).toLowerCase() == 'pdf'
                      "
                      :src="
                        items.diplomaResponse.fileResponse.diplomaCopyResponse.url
                      "
                      frameBorder="0"
                      scrolling="auto"
                      height="95%"
                      width="100%"
                    ></iframe>
                    <viewer style="cursor: pointer" ref="viewer" :options="options" v-else rebuild class="viewer">
                      <img :src="items.diplomaResponse.fileResponse.diplomaCopyResponse.url" alt="">
                    </viewer>
                  </div>
                </div>
                <div v-else class="file-img">
                  <div
                    v-if="items.diplomaResponse.fileResponse.diplomaIlovaResponse"
                  >
                    <iframe
                      v-if="(items.diplomaResponse.fileResponse.diplomaIlovaResponse.url.split('.')[items.diplomaResponse.fileResponse.diplomaIlovaResponse.url.split('.').length - 1]).toLowerCase() == 'pdf'
                      "
                      :src="
                        items.diplomaResponse.fileResponse.diplomaIlovaResponse
                          .url
                      "
                      frameborder="0"
                    ></iframe>
                    <viewer style="cursor: pointer" ref="viewer" :options="options" v-else rebuild class="viewer">
                      <img :src="items.diplomaResponse.fileResponse.diplomaIlovaResponse
                          .url" alt="">
                    </viewer>
                  </div>
                </div>
              </a-card>
            </a-col>
          </a-row>
        </div>
        <a-skeleton v-else active />
      </div>
    </div>
    <a-skeleton v-else active />
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
          tab: "Diplom nusxasi",
        },
        {
          key: "2",
          tab: "Diplom ilovasi",
        },
      ],
      key: "1",
      tabListNoTitle: [
        {
          key: "article",
          tab: "Ariza",
        },
        {
          key: "app",
          tab: "Diplom ma’lumotlari",
        },
      ],
      noTitleKey: "article",
      text: ''
    };
  },
  methods: {
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
      entity: "diploma",
      name: this.id,
      url: `uadmin/getAppOne/${this.id}`,
      params: {
        p: "not",
      },
      cb: {
        success: (response) => {
          if (response) {
            this.items = response.object;
          }
        },
      },
    });
  },
};
</script>