<template>
    <div>
        <div class="row al-center">
            <div class="col-lg-9 col-md-6 col-sm-6 col-12">
                <div class="title">
                    Portfolio
                </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6 col-12">
                <button class="por--tabs-btn" @click="showDrawer">
                    <span>Qo'shish</span>
                    <a-icon type="plus-circle" />
                </button>
            </div>
        </div>
        <div class="por--tabs">
            <a-tabs size="large" :default-active-key="`${key}`" @change="callback">
                <a-tab-pane key="1">
                    <span slot="tab">
                        Hammasi({{allAchievements.items.length + allCertificate.items.length + scientificAchievement.items.length}})
                        <a-icon type="read" />
                    </span>
                    <div class="row" v-if="allAchievements.items.length || allCertificate.items.length">
                        <div class="col-lg-12" v-for="(item,index) in allAchievements.items" :key="index">
                            <por-card :item="item" @inputEditId="inputUpdateId"></por-card>
                        </div>
                        <div class="col-lg-12" v-for="(item,index) in scientificAchievement.items" :key="index + 'B'">
                            <por-card3 :item="item" @inputEditId3="inputUpdateId3"></por-card3>
                        </div>
                        <div class="col-lg-12" v-for="(item,index) in allCertificate.items" :key="index + 'A'">
                            <por-card-lang :item="item" @inputEditIdLang="inputUpdateIdLang"></por-card-lang>
                        </div>
                    </div>
                    <div v-else>
                        <a-empty description="Ma'lumot yo'q" />
                    </div>
                </a-tab-pane>
                <a-tab-pane key="2">
                    <span slot="tab">
                        Yutuqlar({{allAchievements.items.length}})
                        <a-icon type="trophy" />
                    </span>
                    <div class="row" v-if="allAchievements.items.length">
                        <div class="col-lg-12" v-for="(item,index) in allAchievements.items" :key="index">
                            <por-card :item="item" @inputEditId="inputUpdateId"></por-card>
                        </div>
                    </div>
                    <div v-else>
                        <a-empty description="Ma'lumot yo'q" />
                    </div>
                </a-tab-pane>
                <a-tab-pane key="4">
                    <span slot="tab">
                       Ilmiy yutuqlar({{scientificAchievement.items.length}})
                        <a-icon type="trophy" />
                    </span>
                    <div class="row" v-if="scientificAchievement.items.length">
                        <div class="col-lg-12" v-for="(item,index) in scientificAchievement.items" :key="index">
                            <por-card3 :item="item" @inputEditId3="inputUpdateId3"></por-card3>
                        </div>
                    </div>
                    <div v-else>
                        <a-empty description="Ma'lumot yo'q" />
                    </div>
                </a-tab-pane>
                <a-tab-pane key="3">
                    <span slot="tab">
                        Chet tili sertifikatlari({{allCertificate.items.length}})
                        <a-icon type="global" />
                    </span>
                    <div class="row" v-if="allCertificate.items.length">
                        <div class="col-lg-12" v-for="(item,index) in allCertificate.items" :key="index">
                            <por-card-lang :item="item" @inputEditIdLang="inputUpdateIdLang"></por-card-lang>
                        </div>
                    </div>
                    <div v-else>
                        <a-empty description="Ma'lumot yo'q" />
                    </div>
                </a-tab-pane>
            </a-tabs>
        </div>
        <a-drawer
            title="Portfolio"
            :width="1024"
            :visible="visible"
            :body-style="{ paddingBottom: '80px' }"
            @close="onClose"
        >
        <div class="por--modal-tabs">
            <div class="por--modal-flex">
                <div class="row">
                    <div class="col-lg-3">
                        <button class="por--modal-i" :class="{'active' : (key == 2 || key == 1)}" @click="keyClick(2)">
                            Yutuqlar
                            <a-icon type="trophy"/>
                        </button>
                    </div>
                    <div class="col-lg-3">
                        <button class="por--modal-i" :class="{'active' : key == 4}" @click="keyClick(4)">
                            Ilmiy yutuqlar
                            <a-icon type="trophy"/>
                        </button>
                    </div>
                    <div class="col-lg-6">
                        <button class="por--modal-i" :class="{'active' : key == 3}" @click="keyClick(3)">
                            Chet tili sertifikatlari(ixtiyoriy)
                            <a-icon type="global"/>
                        </button>
                    </div>
                </div>
                <div class="por--modal-body" v-if="key == 2 || key == 1">
                    <a-form :form="form" @submit="handleSubmit">
                        <div class="row">
                            <div class="col-lg-6">
                                <a-form-item label="Yutuq turi">
                                    <a-select
                                        size="large"
                                        placeholder="Yutuq turini tanlang"
                                        v-decorator="[
                                            'winningType',
                                            {rules: [{ required: true, message: 'Iltimos yutuq turini tanlang!' }]},
                                        ]"
                                    >
                                        <a-select-option value="Diplom">
                                            Diplom
                                        </a-select-option>
                                        <a-select-option value="Sertifikat (tanlov)">
                                            Sertifikat (tanlov)
                                        </a-select-option>
                                        <a-select-option value="Sertifikat (konferensiya)">
                                            Sertifikat (konferensiya)
                                        </a-select-option>
                                        <a-select-option value="Intelektual mulk (DGU)">
                                            Intellektual mulk (DGU)
                                        </a-select-option>
                                    </a-select>
                                </a-form-item>
                            </div>
                            <div class="col-lg-6">
                                <a-form-item label="Yutuq berilgan sana">
                                    <a-date-picker 
                                        size="large"
                                        placeholder="Yutuq berilgan sananini tanlang"
                                        v-decorator="[
                                            'winningDate',
                                            {rules: [{ required: true, message: 'Iltimos yutuq sanasini tanlang!' }]},
                                        ]"
                                    />
                                </a-form-item>
                            </div>
                            <!-- <div class="col-lg-12">
                                <a-form-item label="Nomi">
                                    <a-input
                                        size="large"
                                        v-decorator="['winningName', { rules: [{ required: true, message: 'Iltimos yutuq nomini tanlang!' }] }]"
                                        placeholder="Nomini kiriting"
                                    />
                                </a-form-item>
                            </div> -->
                            <div class="col-lg-6">
                                <a-form-item label="Fayl">
                                    <file-upload v-decorator="['winningFile', { rules: [{ required: true, message: 'Iltimos fileni kiriting!' }] }]" :files="fileDown" @inputDown="updateInput"></file-upload>
                                </a-form-item>
                            </div>
                            <div class="col-lg-6">
                                <a-form-item label="Havola(Majburiy emas)">
                                    <a-input
                                        size="large"
                                        v-decorator="['winningLink', { rules: [{ required: false, message: 'Iltimos yutuq nomini tanlang!' }] }]"
                                        placeholder="Nomini kiriting"
                                    />
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
                    </a-form>
                </div>
                <div class="por--modal-body" v-else-if="key == 4">
                    <a-form :form="form3" @submit="handleSubmit3">
                        <div class="row">
                            <div class="col-lg-6">
                                <a-form-item label="Ilmiy yutuq turi">
                                    <a-select
                                        size="large"
                                        placeholder="Ilmiy yutuq turini tanlang"
                                        v-decorator="[
                                            'winningType',
                                            {rules: [{ required: true, message: 'Iltimos yutuq turini tanlang!' }]},
                                        ]"
                                    >
                                        <a-select-option value="1-ilmiy tadqiqot ishi">
                                            1-ilmiy tadqiqot ishi
                                        </a-select-option>
                                        <a-select-option value="2-ilmiy tadqiqot ishi">
                                            2-ilmiy tadqiqot ishi
                                        </a-select-option>
                                        <a-select-option value="va boshqa">
                                            Boshqa ilmiy tadqiqot ishi
                                        </a-select-option>
                                    </a-select>
                                </a-form-item>
                            </div>
                            <div class="col-lg-6">
                                <a-form-item label="Ilmiy yutuq berilgan sana">
                                    <a-date-picker 
                                        size="large"
                                        placeholder="Ilmiy yutuq berilgan sananini tanlang"
                                        v-decorator="[
                                            'winningDate',
                                            {rules: [{ required: true, message: 'Iltimos yutuq sanasini tanlang!' }]},
                                        ]"
                                    />
                                </a-form-item>
                            </div>
                            <!-- <div class="col-lg-12">
                                <a-form-item label="Ilmiy yutuq nomi">
                                    <a-input
                                        size="large"
                                        v-decorator="['winningName', { rules: [{ required: true, message: 'Iltimos yutuq nomini tanlang!' }] }]"
                                        placeholder="Nomini kiriting"
                                    />
                                </a-form-item>
                            </div> -->
                            <div class="col-lg-6">
                                <a-form-item label="Fayl">
                                    <file-upload v-decorator="['winningFile', { rules: [{ required: true, message: 'Iltimos fileni kiriting!' }] }]" :files="fileDown3" @inputDown="updateInput3"></file-upload>
                                </a-form-item>
                            </div>
                            <div class="col-lg-6">
                                <a-form-item label="Havola(Majburiy emas)">
                                    <a-input
                                        size="large"
                                        v-decorator="['winningLink', { rules: [{ required: false, message: 'Iltimos yutuq nomini tanlang!' }] }]"
                                        placeholder="Nomini kiriting"
                                    />
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
                    </a-form>
                </div>
                <div class="por--modal-body" v-else>
                    <a-form :form="form2" @submit="handleSubmit2">
                        <div class="row">
                            <div class="col-lg-6">
                                <a-form-item label="Chet tili">
                                    <a-select
                                        @change="changeLange"
                                        size="large"
                                        :filter-option="filterOption"
                                        show-search
                                        placeholder="Chet tili tanlang"
                                        v-decorator="[
                                            'foreignLang',
                                            {rules: [{ required: true, message: 'Iltimos tilni tanlang!' }]},
                                        ]"
                                    >
                                        <a-select-option :value="item.id" v-for="(item,index) in languages" :key="index">
                                            {{item.name}}
                                        </a-select-option>
                                    </a-select>
                                </a-form-item>
                            </div>
                            <div class="col-lg-6">
                                <a-form-item label="Sertifikat turi">
                                    <a-select
                                        size="large"
                                        :filter-option="filterOptionType"
                                        show-search
                                        placeholder="Sertifikat turini tanlang"
                                        v-decorator="[
                                            'foreignSerType',
                                            {rules: [{ required: true, message: 'Iltimos sertifikat turini tanlang!' }]},
                                        ]"
                                    >
                                        <a-select-option :value="i.id" v-for="(i,index) in certificateTypes" :key="index">
                                            {{i.name}}
                                        </a-select-option>
                                    </a-select>
                                </a-form-item>
                            </div>
                            <div class="col-lg-6">
                                <a-form-item label="Sertifikat darajasi">
                                    <a-select
                                        size="large"
                                        placeholder="Sertifikat darajasi tanlang"
                                        v-decorator="[
                                            'foreignSerDegree',
                                            {rules: [{ required: true, message: 'Iltimos sertifikat darajasini tanlang!' }]},
                                        ]"
                                    >
                                        <a-select-option value="B2">
                                            B2
                                        </a-select-option>
                                        <a-select-option value="C1">
                                            C1
                                        </a-select-option>
                                        <a-select-option value="C2">
                                            C2
                                        </a-select-option>
                                    </a-select>
                                </a-form-item>
                            </div>
                            <div class="col-lg-6">
                                <a-form-item label="Sertifikat seriya va raqami*">
                                    <a-input
                                        size="large"
                                        v-decorator="['foreignSerName', { rules: [{ required: true, message: 'Iltimos sertifikat seriya va raqami kiriting!' }] }]"
                                        placeholder="Sertifikat seriya va raqami kiriting"
                                    />
                                </a-form-item>
                            </div>
                            <div class="col-lg-6">
                                <a-form-item label="Sertifikat berilgan sana">
                                    <a-date-picker 
                                        size="large"
                                        placeholder="Sertifikat berilgan sanani kiriting"
                                        v-decorator="[
                                            'foreignSerDate',
                                            {rules: [{ required: true, message: 'Iltimos sertifikat berilgan sanani kiriting!' }]},
                                        ]"
                                    />
                                </a-form-item>
                            </div>
                            <div class="col-lg-6">
                                <a-form-item label="Fayl">
                                    <file-upload v-decorator="['winningFileLang', { rules: [{ required: true, message: 'Iltimos fileni kiriting!' }] }]" :files="fileDownLang" @inputDown="updateInputLang"></file-upload>
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
                            <a-button size="large" :style="{ marginRight: '8px' }" @click="onClose">
                                Bekor qilish
                            </a-button>
                            <a-button size="large" type="primary" html-type="submit">
                                Saqlash
                            </a-button>
                        </div>
                    </a-form>
                </div>
            </div>
        </div>
        </a-drawer>
    </div>
</template>
<script>
import moment from 'moment';
export default {
    layout: 'menuLayout',
    data(){
        return {
            visible: false,
            isUpdate: false,
            isUpdate2: false,
            key: '1',
            winningType: '',
            fileDown: '',
            fileDown3: '',
            fileDownLang: '',
            moment,
            id: '',
            languages: [],
            certificateTypes: []
        }
    },
    mounted(){
        this.$store.dispatch("entity/loadAll", {
            entity: "languages",
            name: "all",
            url: "api/user/languages",
            params: {
            p: 'not'
            },
            cb: {
                success: response => {
                    this.languages = response
                },
                error: () => {
                }
            }
        });
        this.$store.dispatch("entity/loadAll", {
            entity: "achievement",
            name: "all",
            url: "api/user/achievements",
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
        this.$store.dispatch("entity/loadAll", {
            entity: "achievement",
            name: "all",
            url: "api/user/achievements",
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
        this.$store.dispatch("entity/loadAll", {
            entity: "certificate",
            name: "all",
            url: "api/user/certificates",
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
    methods: {
        changeLange(val){
            this.form2.setFieldsValue({
                foreignSerType: '',
            });
            this.$store.dispatch("entity/loadAll", {
                entity: "certificateTypes",
                name: "all",
                url: `api/user/certificateTypes/${val}`,
                params: {
                p: 'not'
                },
                cb: {
                    success: response => {
                        this.certificateTypes = response
                    },
                    error: () => {
                    }
                }
            });
        },
        openNotificationWithIcon(type,message) {
            this.$notification[type]({
                message: 'Diqqat!',
                description: message,
            });
        },
        inputUpdateId(val, id){
            this.id = id
            this.visible = val
            this.isUpdate = val
            this.key = '2'
            this.$store.dispatch("entity/loadOne", {
                entity: "achievement",
                name: id,
                url: `api/user/achievement/${id}/`,
                params: {
                    p: 'not'
                },
                cb: {
                    success: response => {
                        if(response){
                                // this.form.setFieldsValue({
                                //     winningName: response.name,
                                // });
                                this.form.setFieldsValue({
                                    winningType: response.type,
                                });
                                this.form.setFieldsValue({
                                    winningDate: response.givenDate ? moment(response.givenDate,'DD-MM-YYYY') : null,
                                });
                                this.form.setFieldsValue({
                                    winningFile: response.fileUrl,
                                });
                                this.fileDown = response.fileUrl
                                this.form.setFieldsValue({
                                    winningLink: response.link,
                                });
                            }
                        }
                    }
            })
        },
        inputUpdateId3(val, id){
            this.key = '4'
            this.id = id
            this.visible = val
            this.isUpdate = val
            this.$store.dispatch("entity/loadOne", {
                entity: "scientificAchievement",
                name: id,
                url: `api/user/scientificAchievement/${id}/`,
                params: {
                    p: 'not'
                },
                cb: {
                    success: response => {
                        if(response){
                                // this.form3.setFieldsValue({
                                //     winningName: response.name,
                                // });
                                this.form3.setFieldsValue({
                                    winningType: response.type,
                                });
                                this.form3.setFieldsValue({
                                    winningDate: response.givenDate ? moment(response.givenDate,'DD-MM-YYYY') : null,
                                });
                                this.form3.setFieldsValue({
                                    winningFile: response.fileUrl,
                                });
                                this.fileDown3 = response.fileUrl
                                this.form3.setFieldsValue({
                                    winningLink: response.link,
                                });
                            }
                        }
                    }
            })
        },
        inputUpdateIdLang(val, id){
            this.key = '3'
            this.id = id
            this.visible = val
            this.isUpdate2 = val
            this.$store.dispatch("entity/loadOne", {
                entity: "certificate",
                name: id,
                url: `api/user/certificate/${id}/`,
                params: {
                    p: 'not'
                },
                cb: {
                    success: response => {
                        if(response){
                                this.$store.dispatch("entity/loadAll", {
                                    entity: "certificateTypes",
                                    name: "all",
                                    url: `api/user/certificateTypes/${response.languageId}`,
                                    params: {
                                    p: 'not'
                                    },
                                    cb: {
                                        success: response => {
                                            this.certificateTypes = response
                                        },
                                        error: () => {
                                        }
                                    }
                                })
                                this.form2.setFieldsValue({
                                    foreignLang: response.languageId,
                                });
                                this.form2.setFieldsValue({
                                    foreignSerType: response.certificateTypeId,
                                });
                                this.form2.setFieldsValue({
                                    foreignSerDegree: response.level,
                                });
                                this.form2.setFieldsValue({
                                    foreignSerName: response.serialAndNumber,
                                });
                                this.form2.setFieldsValue({
                                    foreignSerDate: response.givenDate ? moment(response.givenDate,'DD-MM-YYYY') : null,
                                });
                                this.fileDownLang = response.fileUrl
                                this.form2.setFieldsValue({
                                    winningFileLang: response.fileUrl,
                                });
                            }
                        }
                    }
            })
        },
        showDrawer() {
            this.visible = true;
        },
        onClose() {
            this.visible = false;
            this.isUpdate = false
            this.fileDown = ''
            this.fileDown3 = ''
            this.fileDownLang = ''
            this.form.resetFields()
            this.form2.resetFields()
            this.form3.resetFields()
        },
        callback(key) {
            this.key = key
        },
        keyClick(key) {
            this.key = key
        },
        handleSubmit(e) {
            e.preventDefault();
            this.form.validateFields((err, values) => {
                if (!err) {
                    let bodyConst = {
                        type: values.winningType,
                        givenDate: this.formatDate(values.winningDate._d, 'DD-MM-YYYY'),
                        // name: values.winningName,
                        fileUrl: values.winningFile,
                        link: values.winningLink,
                    }
                    this.$store.dispatch("entity/form", {
                        entity: 'achievement',
                        name: 'all',
                        id: this.id,
                        updateData: this.isUpdate ? true : false,
                        prependData: this.isUpdate ? false : true,
                        method: this.isUpdate ? 'put' : 'post',
                        url: this.isUpdate ? `api/user/achievement/${this.id}` : 'api/user/achievement',
                        params: {
                            p: 'not',
                        },
                        values: bodyConst,
                        cb: {
                            success: response => {
                                this.$store.dispatch("entity/loadAll", {
                                    entity: "achievement",
                                    name: "all",
                                    url: "api/user/achievements",
                                    params: {
                                        p: 'not'
                                    },
                                    cb: {
                                        success: (response) => {
                                        },
                                        error: () => {
                                            
                                        }
                                    }
                                });
                                this.openNotificationWithIcon('success', response.data.message)
                                this.visible = false
                                this.isUpdate = false
                                this.fileDown = ''
                                this.form.resetFields()
                            },
                            error: (error) => {
                
                            }
                        }
                    })
                }
            });
        },
        handleSubmit3(e) {
            e.preventDefault();
            this.form3.validateFields((err, values) => {
                if (!err) {
                    let bodyConst = {
                        type: values.winningType,
                        givenDate: this.formatDate(values.winningDate._d, 'DD-MM-YYYY'),
                        // name: values.winningName,
                        fileUrl: values.winningFile,
                        link: values.winningLink,
                    }
                    this.$store.dispatch("entity/form", {
                        entity: 'scientificAchievement',
                        name: 'all',
                        id: this.id,
                        updateData: this.isUpdate ? true : false,
                        prependData: this.isUpdate ? false : true,
                        method: this.isUpdate ? 'put' : 'post',
                        url: this.isUpdate ? `api/user/scientificAchievement/${this.id}` : 'api/user/scientificAchievement',
                        params: {
                            p: 'not',
                        },
                        values: bodyConst,
                        cb: {
                            success: response => {
                                this.$store.dispatch("entity/loadAll", {
                                    entity: "scientificAchievement",
                                    name: "all",
                                    url: "api/user/scientificAchievements",
                                    params: {
                                        p: 'not'
                                    },
                                    cb: {
                                        success: (response) => {
                                        },
                                        error: () => {
                                            
                                        }
                                    }
                                });
                                this.openNotificationWithIcon('success', response.data.message)
                                this.visible = false
                                this.isUpdate = false
                                this.fileDown3 = ''
                                this.form3.resetFields()
                            },
                            error: (error) => {
                
                            }
                        }
                    })
                }
            });
        },
        handleSubmit2(e) {
            e.preventDefault();
            this.form2.validateFields((err, values) => {
                if (!err) {
                    let bodyConst = {
                        languageId: values.foreignLang,
                        certificateTypeId: values.foreignSerType,
                        level: values.foreignSerDegree,
                        serialAndNumber: values.foreignSerName,
                        givenDate: this.formatDate(values.foreignSerDate._d, 'DD-MM-YYYY'),
                        fileUrl: values.winningFileLang
                    }  
                    this.$store.dispatch("entity/form", {
                        entity: 'certificate',
                        name: 'all',
                        id: this.id,
                        updateData: this.isUpdate2 ? true : false,
                        prependData: this.isUpdate2 ? false : true,
                        method: this.isUpdate2 ? 'put' : 'post',
                        url: this.isUpdate2 ? `api/user/certificate/${this.id}` : 'api/user/certificate',
                        params: {
                            p: 'not',
                        },
                        values: bodyConst,
                        cb: {
                            success: response => {
                                this.$store.dispatch("entity/loadAll", {
                                    entity: "certificate",
                                    name: "all",
                                    url: "api/user/certificates",
                                    params: {
                                        p: 'not'
                                    },
                                    cb: {
                                        success: (response) => {
                                        },
                                        error: () => {
                                            
                                        }
                                    }
                                });
                                this.openNotificationWithIcon('success', response.data.message)
                                this.visible = false
                                this.isUpdate2 = false
                                this.fileDownLang = ''
                                this.form2.resetFields()
                            },
                            error: (error) => {
                
                            }
                        }
                    })                                                                                                                                                                          
                }
            });
        },
        updateInput(val) {
            this.fileDown = val;
            this.form.setFieldsValue({
                winningFile: val ? val : '',
            });
        },
        updateInput3(val) {
            this.fileDown3 = val;
            this.form3.setFieldsValue({
                winningFile: val ? val : '',
            });
        },
        updateInputLang(val) {
            this.fileDownLang = val;
            this.form2.getFieldDecorator('winningFileLang', { initialValue: val ? val : '' })
            this.form2.setFieldsValue({
                winningFileLang: val ? val : '',
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
        filterOption(input, option) {
            return (
                option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
            );
        },
        filterOptionType(input, option) {
            return (
                option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
            );
        },
    },
    computed: {
        allAchievements() {
            return this.$store.getters["entity/getEntity"]("achievement", 'all');
        },
        allCertificate() {
            return this.$store.getters["entity/getEntity"]("certificate", 'all');
        },
        scientificAchievement() {
            return this.$store.getters["entity/getEntity"]("scientificAchievement", 'all');
        },
    },
    beforeCreate() {
        this.form = this.$form.createForm(this, { name: 'normal_login' });
        this.form2 = this.$form.createForm(this, { name: 'normal_login2' });
        this.form3 = this.$form.createForm(this, { name: 'normal_login3' });
    },
}
</script>