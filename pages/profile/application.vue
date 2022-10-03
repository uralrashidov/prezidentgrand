<template>
    <div>
        <div class="title">
            Mening arizam
        </div>
        <div>
            <div class="app--remember" v-if="!application">
                <div class="app--remmeber-title">
                    Diqqat!
                </div>
                <div class="app--remmember-text">
                    Arizani faqat <nuxt-link tag="a" to="/profile/portfolios">portfoliongizni</nuxt-link> to‘ldirganizdan so‘ng jo‘natishingiz mumkin.
                </div>
            </div>
            <button class="app--btn" :class="{'disabled': scientificAchievement.items.length >= 2 ? false : true}" v-if="!application" @click="showDrawer" :disabled="scientificAchievement.items.length >= 2 ? false : true">
                Ariza to'ldirish
            </button>
            <a-drawer
                title="Ariza"
                :width="720"
                :visible="visible"
                :body-style="{ paddingBottom: '100px' }"
                @close="onClose"
            >
            <div>
                <a-form :form="form" @submit="handleSubmit">
                    <div class="row">
                        <div class="col-lg-12">
                            <a-form-item label="OTM rektori (direktori) tomonidan berilgan tavsifnoma">
                                <file-upload v-decorator="['credential', { rules: [{ required: true, message: 'Iltimos fileni kiriting!' }] }]" :files="fileCredential" @inputDown="updateCredential"></file-upload>
                            </a-form-item>
                        </div>
                        <div class="col-lg-12">
                            <a-form-item label="Reyting daftarcha nusxasi">
                                <file-upload v-decorator="['ratingNotebookUrl', { rules: [{ required: true, message: 'Iltimos fileni kiriting!' }] }]" :files="fileratingNotebookUrl" @inputDown="updateFileratingNotebookUrl"></file-upload>
                            </a-form-item>
                        </div>
                        <div class="col-lg-12">
                            <a-form-item label="Ilmiy ishlar ro'yxati(tasdiqlangan)">
                                <file-upload v-decorator="['listScientificWorks', { rules: [{ required: true, message: 'Iltimos fileni kiriting!' }] }]" :files="fileListScientificWorks" @inputDown="updateFileListScientificWorks"></file-upload>
                            </a-form-item>
                        </div>
                        <div class="col-lg-12">
                            <a-form-item label="Davlat (o'zbek) tilini bilish bo'yicha tegishli kafedra xulosasi">
                                <file-upload v-decorator="['ozbekLanguageCredential', { rules: [{ required: true, message: 'Iltimos fileni kiriting!' }] }]" :files="fileOzbekLanguageCredential" @inputDown="updateFileOzbekLanguageCredential"></file-upload>
                            </a-form-item>
                        </div>
                        <div class="col-lg-12">
                            <a-form-item label="Xorijiy tilni bilish bo'yicha tegishli kafedra xulosasi">
                                <file-upload v-decorator="['foreignLanguageCredential', { rules: [{ required: true, message: 'Iltimos fileni kiriting!' }] }]" :files="fileForeignLanguageCredential" @inputDown="updateFileForeignLanguageCredential"></file-upload>
                            </a-form-item>
                        </div>
                        <div class="col-lg-12">
                            <a-form-item label="O'zbekiston tarixini bilish bo'yicha tegishli kafedra xulosasi">
                                <file-upload v-decorator="['ozbIstoryCredential', { rules: [{ required: true, message: 'Iltimos fileni kiriting!' }] }]" :files="fileOzbIstoryCredential" @inputDown="updateFileOzbIstoryCredential"></file-upload>
                            </a-form-item>
                        </div>
                        <div class="col-lg-12">
                            <a-form-item label="Rektor yo'llanma xati">
                                <file-upload v-decorator="['rectorReferralLetter', { rules: [{ required: true, message: 'Iltimos fileni kiriting!' }] }]" :files="fileRectorReferralLetter" @inputDown="updateFileRectorReferralLetter"></file-upload>
                            </a-form-item>
                        </div>
                        <div class="col-lg-12" v-if="!isUpdate">
                            <a-checkbox value="true" v-model="valueCheck">
                                Barcha shartlarga rozimisiz
                            </a-checkbox>
                        </div>
                    </div>
                    <div
                        :style="{
                            position: 'absolute',
                            right: 0,
                            bottom: 0,
                            width: '100%',
                            borderTop: '1px solid #e9e9e9',
                            padding: '10px 16px',
                            background: '#fff',
                            textAlign: 'right',
                            zIndex: 1,
                        }"
                    >
                        <div
                            :style="{
                            position: 'absolute',
                            right: 0,
                            bottom: '30px',
                            width: '100%',
                            borderTop: '1px solid #e9e9e9',
                            padding: '10px 16px',
                            background: '#fff',
                            textAlign: 'right',
                            zIndex: 1,
                            }"
                        >
                            <a-button size="large" :style="{ marginRight: '8px' }" @click="onClose">
                                Bekor qilish
                            </a-button>
                            <a-button size="large" v-if="isUpdate" type="primary" html-type="submit">
                                O'zgartirish
                            </a-button>
                            <a-button :disabled="!(valueCheck)" size="large" v-else type="primary" html-type="submit">
                                Saqlash
                            </a-button>
                        </div>
                    </div>
                </a-form>
            </div>
            </a-drawer>
        </div>
        <div class="app--card">
            <div class="application__my" v-if="application">
                <div class="application__my-header">
                    <div class="application__my-left">
                        Ariza id: 
                        {{application.id}}
                    </div>
                    <div class="application__my-right">
                        <span>Ariza topshirilgan vaqt: </span>
                        {{formatDate(application.createDate, 'DD.MM.YYYY / HH:mm:ss')}}
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6">
                        <div class="application__my-name-left">
                            Ariza holati:
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="application__my-univer-left">
                            {{application.status}}
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6">
                        <div class="application__my-name-left">
                            OTM rektori (direktori) tomonidan berilgan tavsifnoma:
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="application__my-univer-left">
                            <a :href="application.credential" target="_blank">{{application.credential ? application.credential.split('-')[1] : ''}}</a>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6">
                        <div class="application__my-name-left">
                            Reyting daftarcha nusxasi:
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="application__my-univer-left">
                            <a :href="application.ratingNotebookUrl" target="_blank">{{application.ratingNotebookUrl ? application.ratingNotebookUrl.split('-')[1] : ''}}</a>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6">
                        <div class="application__my-name-left">
                            Ilmiy ishlar ro'yxati(tasdiqlangan):
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="application__my-univer-left">
                            <a :href="application.listScientificWorks" target="_blank">{{application.listScientificWorks ? application.listScientificWorks.split('-')[1] : ''}}</a>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6">
                        <div class="application__my-name-left">
                            Davlat (o'zbek) tilini bilish bo'yicha tegishli kafedra xulosasi:
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="application__my-univer-left">
                            <a :href="application.ozbekLanguageCredential" target="_blank">{{application.ozbekLanguageCredential ? application.ozbekLanguageCredential.split('-')[1] : ''}}</a>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6">
                        <div class="application__my-name-left">
                            Xorijiy tilni bilish bo'yicha tegishli kafedra xulosasi:
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="application__my-univer-left">
                            <a :href="application.foreignLanguageCredential" target="_blank">{{application.foreignLanguageCredential ? application.foreignLanguageCredential.split('-')[1] : ''}}</a>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6">
                        <div class="application__my-name-left">
                            O'zbekiston tarixini bilish bo'yicha tegishli kafedra xulosasi:
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="application__my-univer-left">
                            <a :href="application.ozbIstoryCredential" target="_blank">{{application.ozbIstoryCredential ? application.ozbIstoryCredential.split('-')[1] : ''}}</a>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6">
                        <div class="application__my-name-left">
                            Rektor yo'llanma xati:
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="application__my-univer-left">
                            <a :href="application.rectorReferralLetter" target="_blank">{{application.rectorReferralLetter ? application.rectorReferralLetter.split('-')[1] : ''}}</a>
                        </div>
                    </div>
                </div>
                <div class="app--footer" @click="edit(application.id)">
                    <a-icon type="edit" theme="filled" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    layout: 'menuLayout',
    data(){
        return {
            visible: false,
            isUpdate: false,
            fileCredential: '',
            fileratingNotebookUrl: '',
            fileListScientificWorks: '',
            fileOzbekLanguageCredential: '',
            fileForeignLanguageCredential: '',
            fileOzbIstoryCredential: '',
            fileRectorReferralLetter: '',
            application: '',
            id: '',
            valueCheck: false,
        }
    },
    methods: {
        showDrawer() {
            this.visible = true;
        },
        onClose() {
            this.visible = false;
            this.isUpdate = false
            this.fileCredential = ''
            this.fileratingNotebookUrl = ''
            this.fileListScientificWorks = ''
            this.fileOzbekLanguageCredential = ''
            this.fileForeignLanguageCredential = ''
            this.fileOzbIstoryCredential = ''
            this.fileRectorReferralLetter = ''
            this.form.resetFields()
        },
        updateCredential(val){
            this.fileCredential = val
            this.form.setFieldsValue({
                credential: val ? val : '',
            });
        },
        updateFileratingNotebookUrl(val){
            this.fileratingNotebookUrl = val
            this.form.setFieldsValue({
                ratingNotebookUrl: val ? val : '',
            });
        },
        updateFileListScientificWorks(val){
            this.fileListScientificWorks = val
            this.form.setFieldsValue({
                listScientificWorks: val ? val : '',
            });
        },
        updateFileOzbekLanguageCredential(val){
            this.fileOzbekLanguageCredential = val
            this.form.setFieldsValue({
                ozbekLanguageCredential: val ? val : '',
            });
        },
        updateFileForeignLanguageCredential(val){
            this.fileForeignLanguageCredential = val
            this.form.setFieldsValue({
                foreignLanguageCredential: val ? val : '',
            });
        },
        updateFileOzbIstoryCredential(val){
            this.fileOzbIstoryCredential = val
            this.form.setFieldsValue({
                ozbIstoryCredential: val ? val : '',
            });
        },
        updateFileRectorReferralLetter(val){
            this.fileRectorReferralLetter = val
            this.form.setFieldsValue({
                rectorReferralLetter: val ? val : '',
            });
        },
        edit(id){
            this.visible = true
            this.isUpdate = true
            this.$store.dispatch("entity/loadOne", {
                entity: "application",
                name: id,
                url: `api/user/application/`,
                params: {
                    p: 'not'
                },
                cb: {
                    success: response => {
                        if(response){
                                this.fileCredential = response.credential
                                this.fileratingNotebookUrl = response.ratingNotebookUrl
                                this.fileListScientificWorks = response.listScientificWorks
                                this.fileOzbekLanguageCredential = response.ozbekLanguageCredential
                                this.fileForeignLanguageCredential = response.foreignLanguageCredential
                                this.fileOzbIstoryCredential = response.ozbIstoryCredential
                                this.fileRectorReferralLetter = response.rectorReferralLetter

                                this.form.setFieldsValue({
                                    credential: response.credential,
                                });
                                this.form.setFieldsValue({
                                    ratingNotebookUrl: response.ratingNotebookUrl,
                                });
                                this.form.setFieldsValue({
                                    listScientificWorks: response.listScientificWorks,
                                });
                                this.form.setFieldsValue({
                                    ozbekLanguageCredential: response.ozbekLanguageCredential,
                                });
                                this.form.setFieldsValue({
                                    foreignLanguageCredential: response.foreignLanguageCredential,
                                });
                                this.form.setFieldsValue({
                                    ozbIstoryCredential: response.ozbIstoryCredential,
                                });
                                this.form.setFieldsValue({
                                    rectorReferralLetter: response.rectorReferralLetter,
                                });
                            }
                        }
                    }
            })
        },
        handleSubmit(e) {
            e.preventDefault();
            this.form.validateFields((err, values) => {
                if (!err) {
                    this.$store.dispatch("entity/form", {
                        entity: 'application',
                        name: 'all',
                        id: this.id,
                        updateData: this.isUpdate ? true : false,
                        prependData: this.isUpdate ? false : true,
                        method: this.isUpdate ? 'put' : 'post',
                        url: this.isUpdate ? `api/user/application/` : 'api/user/application',
                        params: {
                            p: 'not',
                        },
                        values: values,
                        cb: {
                            success: response => {
                                this.$store.dispatch("entity/loadAll", {
                                    entity: "application",
                                    name: "all",
                                    url: "api/user/application",
                                    params: {
                                        p: 'not'
                                    },
                                    cb: {
                                        success: (response) => {
                                            this.application = response
                                        },
                                        error: () => {
                                            
                                        }
                                    }
                                });
                                this.openNotificationWithIcon('success', response.data.message)
                                this.visible = false
                                this.isUpdate = false
                                this.fileCredential = ''
                                this.fileratingNotebookUrl = ''
                                this.fileListScientificWorks = ''
                                this.fileOzbekLanguageCredential = ''
                                this.fileForeignLanguageCredential = ''
                                this.fileOzbIstoryCredential = ''
                                this.fileRectorReferralLetter = ''
                                this.form.resetFields()
                            },
                            error: (error) => {
                            }
                        }
                    })
                }
            })
        },
        openNotificationWithIcon(type,message) {
            this.$notification[type]({
                message: 'Diqqat!',
                description: message,
            });
        },
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
    mounted(){
        this.$store.dispatch("entity/loadAll", {
            entity: "application",
            name: "all",
            url: "api/user/application",
            params: {
            p: 'not'
            },
            cb: {
                success: response => {
                    this.application = response
                },
                error: () => {
                }
            }
        });
        this.$store.dispatch("entity/loadAll", {
            entity: "scientificAchievement",
            name: "all",
            url: "api/user/scientificAchievements",
            params: {
            p: 'not'
            },
            cb: {
                success: response => {
                },
                error: () => {
                }
            }
        });
    },
    computed: {
        allApplication() {
            return this.$store.getters["entity/getEntity"]("application", 'all');
        },
        scientificAchievement() {
            return this.$store.getters["entity/getEntity"]("scientificAchievement", 'all');
        },
    },
    beforeCreate() {
        this.form = this.$form.createForm(this, { name: 'normal_login' });
    },
}
</script>