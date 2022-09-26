<template>
    <div class="questions">
        <div class="container">
            <div class="questions__htext">
                Ko‘p beriladigan savollar
            </div>
            <div class="questions__ptext">
                Suhbatga oid eng ko‘p berilgan savol javoblar
            </div>
            <div class="questions__box">
                <div class="questions__item">
                    <div class="questions__block" @click="show(1)">
                        <div class="questions__item-text">
                            Bir dona 3 baho bo‘lasa ham suhbatda kiritiladimi?
                        </div>
                        <div class="questions__item-svg" v-if="this.idShow!=1">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 7L16 16.1924M16 16.1924L6.80762 16.1924M16 16.1924L16.0001 25.3847M16 16.1924L25.1924 16.1924" stroke="black" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </div>
                        <div class="questions__item-svg" v-else>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.6001 16L24.4051 16" stroke="black" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </div>
                    </div>
                    <div class="questions__show" :class="{'show': this.idShow===1}">
                        Olimpiada o‘tkazilish tartibi qanday? 
                        Olimpiada ishtirokchilari olimpiada.edu.uz elektron platformasidan ro‘yxatdan o‘tadi. Ro‘yxatdan o‘tish boshlanishi haqida vazirlikning rasmiy sahifalarida va elektron platformada e’lon beriladi. Ro‘yxatdan o‘tish jarayoni olimpiadani oʻtkazish sanasidan 2 kun oldin toʻxtatiladi.
                        <br> <br>
                        Olimpiadaning oʻtkazish kuni vazirlikning muvofiqlashtiruvchi Tashkiliy qoʻmitasi tomonidan belgilanadi. <br> <br>
                        Olimpiadani oʻtkazish sanasi va vaqti boʻyicha jadval asosida olimpiada.edu.uz portaliga maʼlumot joylanadi. <br> <br>                        
                        <b> Olimpiada 2 turda oʻtkaziladi va 100 ballik tizimda baholanadi: <br>
                        1-tur. Nazariy qism - 50 ball. </b> <br> <br>
                        <a href="/">olimpiada.edu.uz</a> elektron platformasida test shaklida boʻlib oʻtadi. Ishtirokchilar testni har bir fan boʻyicha olimpiadani oʻtkazishga masʼul hisoblangan oliy taʼlim muassasasi binosida video kuzatuv kamerasi nazoratida topshiradi. <br> <br>
                        Test topshiriqlari soni – 50 ta. Umumiy beriladigan vaqt - 60 daqiqa. <br>
                        Har bir toʻgʻri javob 1 balldan baholanadi. Ishtirokchilar topshiriqlarni bajarishga berilgan vaqt oraligʻida tegishli fan boʻyicha test savollariga javob beradi. <br>
                        Ishtirokchilarning 1-tur boʻyicha olgan ballari toʻgʻrisidagi maʼlumot test yakunlangandan soʻng 1 soat ichida olimpiada.edu.uz elektron platformasiga joylanadi. <br>
                        Ishtirokchilar 1-tur bo‘yicha test savollarga 70% to‘g‘ri javob bersa 
                        (50 balldan 35 ball to‘plasa) keyingi 2-tur bosqichiga o‘tkaziladi. <br> 
                        <b>2-tur. Amaliy qism - 50 ball.</b><br>
                        Birinchi turdan o‘tgan ishtirokchilar kimyo, biologiya va fizika fanlari boʻyicha laboratoriya mashgʻulotlarini, informatika va axborot texnologiyalari boʻyicha amaliy topshiriqlarni bajaradi. Topshiriqni bajarishga 120 daqiqa vaqt beriladi. <br>
                        Amaliy qismida har bir fan boʻyicha 1 ta topshiriq beriladi. Topshiriqlarning toʻgʻri va toʻliq bajarilganligiga qarab 50 ballgacha baholanadi. <br>
                        Olimpiadaning amaliy qismi uchun baholash mezonlari hakamlar hayʼati tomonidan ishlab chiqiladi. <br>
                        Ikkinchi turda berilgan topshiriqni muddatidan oldin to‘g‘ri va aniq bajargan ishtirokchilarga ustunlik beriladi.
                    </div>
                </div>
                <div class="questions__item">
                    <div class="questions__block" @click="show(2)">
                        <div class="questions__item-text">
                            Balim 67 dan pas bo‘lsa ham apilatsiyaga topshira olamanmi?
                        </div>
                        <div class="questions__item-svg" v-if="this.idShow!=2">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 7L16 16.1924M16 16.1924L6.80762 16.1924M16 16.1924L16.0001 25.3847M16 16.1924L25.1924 16.1924" stroke="black" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </div>
                        <div class="questions__item-svg" v-else>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.6001 16L24.4051 16" stroke="black" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </div>
                    </div>
                    <div class="questions__show" :class="{'show': this.idShow===2}">
                        Shikoyat va arizalar Olimpiada natijalari eʼlon qilingandan soʻng, apellyatsiya komissiyasida yozma tarzda qabul qilinadi va shu kunning oʻzida koʻrib chiqilib, murojaatchiga eʼlon qilinadi.
                        Talabalar tomonidan topshiriqlarga boʻlgan eʼtirozlar topshiriqlar bazasini ekspertizadan oʻtkazishga masʼul boʻlgan professor-oʻqituvchilar tomonidan koʻrib chiqiladi va appelyatsiya xulosasi tayyorlanib oliy ta’lim muassasasining Tashkiliy qoʻmitasiga taqdim etiladi. 
                    </div>
                </div>
                <div class="questions__item">
                    <div class="questions__block" @click="show(3)">
                        <div class="questions__item-text">
                            Bitiruvchi uzrli sabab bilan suhbatga borolmasa nima bo‘ladi?
                        </div>
                        <div class="questions__item-svg" v-if="this.idShow!=3">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 7L16 16.1924M16 16.1924L6.80762 16.1924M16 16.1924L16.0001 25.3847M16 16.1924L25.1924 16.1924" stroke="black" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </div>
                        <div class="questions__item-svg" v-else>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.6001 16L24.4051 16" stroke="black" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </div>
                    </div>
                    <div class="questions__show" :class="{'show': this.idShow===3}">
                        Olimpiada gʻoliblari 1- va 2-tur davomida toʻplagan baliga qarab aniqlanadi. Har bir fan boʻyicha eng yuqori ball toʻplagan 3 nafar ishtirokchi gʻolib deb topiladi.
                        Barcha talabalar oʻrtasida oʻrinlarni taqsimlash olimpiadaning nazariy 
                        va amaliy qismida toʻplagan ballar ketma-ketligi asosida yuqoridan pastga qarab 
                        I, II va III oʻrin shaklida belgilanadi. 
                        Olimpiada gʻoliblari har bir fan uchun I, II va III oʻrinlarga bittadan belgilanadi.
                    </div>
                </div>
                <div class="questions__item">
                    <div class="questions__block" @click="show(4)">
                        <div class="questions__item-text">
                             Biturvchining qanday holatda apellyasiya shikoyatlari qabul qilinadi?
                        </div>
                        <div class="questions__item-svg" v-if="this.idShow!=4">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 7L16 16.1924M16 16.1924L6.80762 16.1924M16 16.1924L16.0001 25.3847M16 16.1924L25.1924 16.1924" stroke="black" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </div>
                        <div class="questions__item-svg" v-else>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.6001 16L24.4051 16" stroke="black" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </div>
                    </div>
                    <div class="questions__show" :class="{'show': this.idShow===4}">
                        Daʼvogarlar ichida milliy yoki unga mos darajadagi xalqaro sertifikatga ega ishtirokchilar ustunlikka ega boʻladi. Bunda, filologiya yoʻnalishlari boʻyicha kamida C1 darajadagi milliy yoki unga mos darajadagi xalqaro sertifikat, nofilologik yoʻnalishlari boʻyicha esa B2 darajadagi milliy yoki unga mos darajadagi xalqaro sertifikat boʻlishi lozim. Bunda nomzodning ikkita tur boʻyicha toʻplagan umumiy baliga xalqaro sertifikatdagi bali qoʻshilgan holda gʻolib aniqlanadi.
                        Munosib nomzodni saralab olish maqsadida vazirlikning muvofiqlashtiruvchi Tashkiliy qoʻmitasi qarori bilan 3 nafar mutaxassisdan iborat Komissiya tuziladi.
                    </div>
                </div>
                <div class="questions__item">
                    <div class="questions__block" @click="show(6)">
                        <div class="questions__item-text">
                            O‘qishga qabul qilishda grant ham bormi?
                        </div>
                        <div class="questions__item-svg" v-if="this.idShow!=6">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 7L16 16.1924M16 16.1924L6.80762 16.1924M16 16.1924L16.0001 25.3847M16 16.1924L25.1924 16.1924" stroke="black" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </div>
                        <div class="questions__item-svg" v-else>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.6001 16L24.4051 16" stroke="black" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </div>
                    </div>
                    <div class="questions__show" :class="{'show': this.idShow===6}">
                        Olimpiadada Oʻzbekiston Respublikadagi oliy taʼlim muassasalarining  <b>kimyo, biologiya, fizika hamda informatika va axborot texnologiyalari </b>bakalavriat taʼlim yoʻnalishlarida tahsil olayotgan bitiruvchi bosqich talabalari ishtirok etishlari mumkin.
                    </div>
                </div>
                <div class="questions__item">
                    <div class="questions__block" @click="show(7)">
                        <div class="questions__item-text">
                            Texnikumni bitirganiga 2 yil bo‘lgan bituruvchilar ham ariza topshira oladimi? 
                        </div>
                        <div class="questions__item-svg" v-if="this.idShow!=7">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 7L16 16.1924M16 16.1924L6.80762 16.1924M16 16.1924L16.0001 25.3847M16 16.1924L25.1924 16.1924" stroke="black" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </div>
                        <div class="questions__item-svg" v-else>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.6001 16L24.4051 16" stroke="black" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </div>
                    </div>
                    <div class="questions__show" :class="{'show': this.idShow===7}">
                        2021/2022 o‘quv yilidan boshlab bitiruvchilarni oliy ta’lim muassasasi bakalavriat ta’lim yo‘nalishiga kirish imtihonlarisiz, yakka tartibdagi suhbat orqali qabul qilish tartibi texnikumni tamomlagan yildan boshlab ikki yil mobaynida tatbiq etiladi.
                        <br> <br>
                        Yuqorida qayd etilgan toifaga kirmaydigan hamda texnikumni bitirganiga ikki yildan oshganlar o‘qishga kirish istagini bildirganda, ularni oliy ta’lim muassasalarining bakalavriat ta’lim yo‘nalishlariga o‘qishga qabul qilish umumiy belgilangan tartibda amalga oshiriladi.
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            idShow: ''
        }
    },
    methods: {
        show(id){
            if(this.idShow===id){
                this.idShow = ''
            }
            else {
                this.idShow = id
            }
        }
    }
}
</script>