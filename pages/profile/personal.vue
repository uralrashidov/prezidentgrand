<template>
    <div>
        <div class="title">
            Shaxsiy ma’lumotlar
        </div>
        <div class="student__box">
            <div class="student__personal" v-if="profile.data">
                <div class="student__per-img" v-if="true">
                    <img :src="`data:image/png;base64,${profile.data.fotoUrl}`" alt="" />
                </div>
              <div class="student__bio">
                <div class="student__bio-fullname">
                    {{profile.data.lastName}} {{profile.data.firstName}} {{profile.data.fatherName}} 
                </div>
                <ul class="student__bio-data">
                  <li class="student__bio-item">
                    <div class="student__bio-item-title">
                      Jinsi va tug’ilgan yili:
                    </div>
                    <div class="student__bio-item-text">
                        {{profile.data.gender}}, {{formatDate(profile.data.birthDate,'DD-MM-YYYY')}}
                    </div>
                  </li>
                  <li class="student__bio-item">
                    <div class="student__bio-item-title">Fuqaroligi:</div>
                    <div class="student__bio-item-text">
                    {{profile.data.citizenship}}
                    </div>
                  </li>
                  <li class="student__bio-item">
                    <div class="student__bio-item-title">
                      Doimiy yashash manzili:
                    </div>
                    <div class="student__bio-item-text">
                      {{profile.data.address}}
                    </div>
                  </li>
                  <li class="student__bio-item">
                    <div class="student__bio-item-title">Telefon raqam:</div>
                    <div class="student__bio-item-text">
                     {{profile.data.phoneNumber}}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <a-skeleton v-else active />
            <div class="student__diplom" v-if="profile.data">
              <div class="student__diplom-title">Ta'lim ma’lumotlari</div>
              <div class="student__diplom-box">
                <div class="student__diplom-item">
                  <div class="student__diplom-i-title">OTM nomi:</div>
                  <div class="student__diplom-i-text">
                  {{profile.data.university}}
                  </div>
                </div>
                <div class="student__diplom-item">
                  <div class="student__diplom-i-title">Yo‘nalish nomi:</div>
                  <div class="student__diplom-i-text">
                     {{profile.data.speciality}}
                  </div>
                </div>
                <div class="student__diplom-item">
                  <div class="student__diplom-i-title">Ta’lim bosqichi:</div>
                  <div class="student__diplom-i-text">
                      {{profile.data.course}}
                  </div>
                </div>
                <div class="student__diplom-item">
                  <div class="student__diplom-i-title">Ta’lim shakli:</div>
                  <div class="student__diplom-i-text">
                      {{profile.data.educationForm}}
                  </div>
                </div>
                <div class="student__diplom-item">
                  <div class="student__diplom-i-title">Ta’lim sohasi:</div>
                  <div class="student__diplom-i-text">
                  {{profile.data.soha}}
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    layout: 'menuLayout',
    computed: {
        profile() {
            return this.$store.getters["auths/profile"];
        },
    },
    methods: {
      formatDate(date, format){
            let dt = new Date(date);
            let month = ("00" + (dt.getMonth() + 1)).slice(-2);
            let day = ("00" + dt.getDate()).slice(-2);
            let year = dt.getFullYear();
            let hours = ("00" + dt.getHours()).slice(-2);
            let minutes = ("00" + dt.getMinutes()).slice(-2);
            let seconds = ("00" + dt.getSeconds()).slice(-2);

            switch (format) {
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
                    return (
                        hours + ":" + minutes + " / " + day + "." + month + "." + year
                    );
                default:
                    return day + "." + month + "." + year;
            }
        },
    },
}
</script>