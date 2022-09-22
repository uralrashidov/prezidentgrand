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
            <button class="app--btn" v-if="!application" @click="showDrawer">
                Ariza to'ldirish
            </button>
            <a-drawer
                title="Ariza"
                :width="720"
                :visible="visible"
                :body-style="{ paddingBottom: '80px' }"
                @close="onClose"
            >
            <div>
                <a-form :form="form" @submit="handleSubmit">
                    <div class="row">
                        <div class="col-lg-6">
                            <a-form-item label="Ma'lumotnoma">
                                <file-upload v-decorator="['credential', { rules: [{ required: true, message: 'Iltimos fileni kiriting!' }] }]" :files="fileCredential" @inputDown="updateCredential"></file-upload>
                            </a-form-item>
                        </div>
                        <div class="col-lg-6">
                            <a-form-item label="Konfrensiyalardagi tavsifnoma">
                                <file-upload v-decorator="['conferenceUrl', { rules: [{ required: true, message: 'Iltimos fileni kiriting!' }] }]" :files="fileConferenceUrl" @inputDown="updateConferenceUrl"></file-upload>
                            </a-form-item>
                        </div>
                        <div class="col-lg-6">
                            <a-form-item label="Reyting daftarcha nusxasi">
                                <file-upload v-decorator="['ratingNotebookUrl', { rules: [{ required: true, message: 'Iltimos fileni kiriting!' }] }]" :files="fileratingNotebookUrl" @inputDown="updateFileratingNotebookUrl"></file-upload>
                            </a-form-item>
                        </div>
                    </div>
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
                            <a-button size="large" v-else type="primary" html-type="submit">
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
                            Ma'lumotnoma:
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
                            Konfrensiyalardagi tavsifnoma:
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="application__my-univer-left">
                            <a :href="application.conferenceUrl" target="_blank">{{application.conferenceUrl ? application.conferenceUrl.split('-')[1] : ''}}</a>
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
            fileConferenceUrl: '',
            fileratingNotebookUrl: '',
            application: '',
            id: ''
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
            this.fileConferenceUrl = ''
            this.fileratingNotebookUrl = ''
            this.form.resetFields()
        },
        updateCredential(val){
            this.fileCredential = val
            this.form.setFieldsValue({
                credential: val ? val : '',
            });
        },
        updateConferenceUrl(val){
            this.fileConferenceUrl = val
            this.form.setFieldsValue({
                conferenceUrl: val ? val : '',
            });
        },
        updateFileratingNotebookUrl(val){
            this.fileratingNotebookUrl = val
            this.form.setFieldsValue({
                ratingNotebookUrl: val ? val : '',
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
                                this.fileConferenceUrl = response.conferenceUrl
                                this.fileratingNotebookUrl = response.ratingNotebookUrl
                                this.form.setFieldsValue({
                                    credential: response.credential,
                                });
                                this.form.setFieldsValue({
                                    conferenceUrl: response.conferenceUrl,
                                });
                                this.form.setFieldsValue({
                                    ratingNotebookUrl: response.ratingNotebookUrl,
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
                    let bodyConst = {
                        ratingNotebookUrl: values.credential,
                        conferenceUrl: values.ratingNotebookUrl,
                        credential: values.credential
                    }
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
                        values: bodyConst,
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
                                this.fileConferenceUrl = ''
                                this.fileratingNotebookUrl = ''
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
    },
    computed: {
        allApplication() {
            return this.$store.getters["entity/getEntity"]("application", 'all');
        },
    },
    beforeCreate() {
        this.form = this.$form.createForm(this, { name: 'normal_login' });
    },
}
</script>