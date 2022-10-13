<template>
  <div class="statics--rec">
    <a-row :gutter="[24, 8]">
      <a-col :span="4" v-if="role != 'ROLE_EXPERT'">
        <div class="statics--rec-box color1">
          <div class="statics--rec-title">
            Yangi arizalar soni
          </div>
          <div class="statics--rec-text">
            {{ countAll.newCountApp}}
          </div>
          <div class="statics--rec-result">
            Jami arizlarning:
            <span
              >
              {{
                (
                  ((countAll.newCountApp) /
                    (parseInt(countAll.newCountApp) + parseInt(countAll.univerConfirmApp) + parseInt(countAll.univerRejectApp) + parseInt(countAll.expertNotSentApp) + parseInt(countAll.expertSentApp) + parseInt(countAll.expertRejectApp) + parseInt(countAll.expertConfirmApp))) *
                  100
                ).toFixed(2)
              }}%
              </span
            >
          </div>
        </div>
      </a-col>
      <a-col :span="4" v-if="role != 'ROLE_EXPERT'">
        <div class="statics--rec-box color5">
          <div class="statics--rec-title">
            Vazirlikka yuborilgan arizalar soni
          </div>
          <div class="statics--rec-text">
            {{countAll.univerConfirmApp}}
          </div>
          <div class="statics--rec-result">
            Jami arizlarning:
            <span
              >
              {{
                (
                  ((countAll.univerConfirmApp) /
                    (parseInt(countAll.newCountApp) + parseInt(countAll.univerConfirmApp) + parseInt(countAll.univerRejectApp) + parseInt(countAll.expertNotSentApp) + parseInt(countAll.expertSentApp) + parseInt(countAll.expertRejectApp) + parseInt(countAll.expertConfirmApp))) *
                  100
                ).toFixed(2)
              }}%
              </span
            >
          </div>
        </div>
      </a-col>
      <a-col :span="4" v-if="role != 'ROLE_EXPERT'">
        <div class="statics--rec-box color6">
          <div class="statics--rec-title">
            Universitet rad etgan arizalar soni:
          </div>
          <div class="statics--rec-text">
            {{countAll.univerRejectApp}}
          </div>
          <div class="statics--rec-result">
            Jami arizlarning:
            <span
              >
             {{
                (
                  ((countAll.univerRejectApp) /
                    (parseInt(countAll.newCountApp) + parseInt(countAll.univerConfirmApp) + parseInt(countAll.univerRejectApp) + parseInt(countAll.expertNotSentApp) + parseInt(countAll.expertSentApp) + parseInt(countAll.expertRejectApp) + parseInt(countAll.expertConfirmApp))) *
                  100
                ).toFixed(2)
              }}%
              </span
            >
          </div>
        </div>
      </a-col>
      <a-col :span="4">
        <div class="statics--rec-box color2">
          <div class="statics--rec-title"> {{role != 'ROLE_EXPERT' ? 'Expertga yuborilgan arizalar soni' : 'Yangi arizalar soni'}} </div>
          <div class="statics--rec-text">
            {{countAll.expertSentApp}}
          </div>
          <div class="statics--rec-result">
            Jami arizlarning:
            <span
              >
               {{
                (
                  ((countAll.expertSentApp) /
                    (parseInt(countAll.newCountApp) + parseInt(countAll.univerConfirmApp) + parseInt(countAll.univerRejectApp) + parseInt(countAll.expertNotSentApp) + parseInt(countAll.expertSentApp) + parseInt(countAll.expertRejectApp) + parseInt(countAll.expertConfirmApp))) *
                  100
                ).toFixed(2)
              }}%
              </span
            >
          </div>
        </div>
      </a-col>
      <a-col :span="4" v-if="role != 'ROLE_EXPERT'">
        <div class="statics--rec-box color3">
          <div class="statics--rec-title">Vazirlik rad etgan arizalar soni</div>
          <div class="statics--rec-text">
           {{countAll.expertNotSentApp}}
          </div>
          <div class="statics--rec-result">
            Jami arizlarning:
            <span
              >
              {{
                (
                  ((countAll.expertNotSentApp) /
                    (parseInt(countAll.newCountApp) + parseInt(countAll.univerConfirmApp) + parseInt(countAll.univerRejectApp) + parseInt(countAll.expertNotSentApp) + parseInt(countAll.expertSentApp) + parseInt(countAll.expertRejectApp) + parseInt(countAll.expertConfirmApp))) *
                  100
                ).toFixed(2)
              }}%
              </span
            >
          </div>
        </div>
      </a-col>
      <a-col :span="4">
        <div class="statics--rec-box color4">
          <div class="statics--rec-title">Jami arizalar soni:</div>
          <div class="statics--rec-text">
            {{(parseInt(countAll.newCountApp) + parseInt(countAll.univerConfirmApp) + parseInt(countAll.univerRejectApp) + parseInt(countAll.expertNotSentApp) + parseInt(countAll.expertSentApp) + parseInt(countAll.expertRejectApp) + parseInt(countAll.expertConfirmApp))}}
          </div>
        </div>
      </a-col>
      <a-col :span="4">
        <div class="statics--rec-box color6">
          <div class="statics--rec-title">
            Expert tavsiya etmagan arizalar soni
          </div>
          <div class="statics--rec-text">
            {{countAll.expertRejectApp}}
          </div>
          <div class="statics--rec-result">
            Jami arizlarning:
            <span
              >
              {{
                (
                  ((countAll.expertRejectApp) /
                    (parseInt(countAll.newCountApp) + parseInt(countAll.univerConfirmApp) + parseInt(countAll.univerRejectApp) + parseInt(countAll.expertNotSentApp) + parseInt(countAll.expertSentApp) + parseInt(countAll.expertRejectApp) + parseInt(countAll.expertConfirmApp))) *
                  100
                ).toFixed(2)
              }}%
              </span
            >
          </div>
        </div>
      </a-col>
      <a-col :span="4">
        <div class="statics--rec-box color2">
          <div class="statics--rec-title"> Expert tavsiya etgan arizalar soni</div>
          <div class="statics--rec-text">
              {{countAll.expertConfirmApp}}
          </div>
          <div class="statics--rec-result">
            Jami arizlarning:
            <span
              >
              {{
                (
                  ((countAll.expertConfirmApp) /
                    (parseInt(countAll.newCountApp) + parseInt(countAll.univerConfirmApp) + parseInt(countAll.univerRejectApp) + parseInt(countAll.expertNotSentApp) + parseInt(countAll.expertSentApp) + parseInt(countAll.expertRejectApp) + parseInt(countAll.expertConfirmApp))) *
                  100
                ).toFixed(2)
              }}%
              </span
            >
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>

export default {
  data(){
    return {
      role: localStorage.getItem('role')
    }
  },
  computed: {
     countAll() {
      let data = this.$store.getters["entity/getEntity"](
        "countAll",
        "all"
      ).items;

      const result = {
          newCountApp: 0,
          univerConfirmApp: 0,
          univerRejectApp: 0,

          expertSentApp: 0,
          expertNotSentApp: 0,

          expertRejectApp: 0,
          expertConfirmApp: 0,
      };

      if(data){
        if(data.countApps){
          data.countApps.forEach(i => {
            if(i.status == 'Ariza shakillantirildi'){
              result.newCountApp = i.count ? i.count : 0
            } else if(i.status == 'Ariza qabul qilindi'){
              result.univerConfirmApp = i.count ? i.count : 0
            } else if(i.status == 'Ariza rad etildi'){
              result.univerRejectApp = i.count ? i.count : 0
            } else if(i.status == 'Expertga yuborildi') {
              result.expertSentApp = i.count ? i.count : 0
            } else if(i.status == 'Expertga yuborilmadi') {
              result.expertNotSentApp = i.count ? i.count : 0
            } else if(i.status == 'Tavsiya etildi'){
              result.expertConfirmApp = i.count ? i.count : 0
            } else if(i.status == 'Tavsiya etilmadi'){
              result.expertRejectApp = i.count ? i.count : 0
            }
          })
        }
      }
      return result
    },
  },
};

</script>