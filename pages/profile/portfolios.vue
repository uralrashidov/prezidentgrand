<template>
    <div>
        <div class="row">
            <div class="col-lg-6">
                <div class="title">
                    Portfolio
                </div>
            </div>
            <div class="col-lg-6">
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
                        Hammasi(0)
                        <a-icon type="read" />
                    </span>
                    Tab 1
                </a-tab-pane>
                <a-tab-pane key="2">
                    <span slot="tab">
                        Yutuqlar(0)
                        <a-icon type="trophy" />
                    </span>
                    Tab 2
                </a-tab-pane>
                <a-tab-pane key="3">
                    <span slot="tab">
                        Chet tili sertifikatlari(0)
                        <a-icon type="global" />
                    </span>
                    Tab 3
                </a-tab-pane>
            </a-tabs>
        </div>
        <a-drawer
            title="Portfolio"
            :width="820"
            :visible="visible"
            :body-style="{ paddingBottom: '80px' }"
            @close="onClose"
        >
        <div class="por--modal-tabs">
            <div class="por--modal-flex">
                <div class="row">
                    <div class="col-lg-6">
                        <button class="por--modal-i" :class="{'active' : (key == 2 || key == 1)}" @click="keyClick(2)">
                            Yutuqlar
                            <a-icon type="trophy" />
                        </button>
                    </div>
                    <div class="col-lg-6">
                        <button class="por--modal-i" :class="{'active' : key == 3}" @click="keyClick(3)">
                            Chet tili sertifikatlari
                            <a-icon type="global" />
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
                                        <a-select-option value="male">
                                            Diplom
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
                            <div class="col-lg-12">
                                <a-form-item label="Nomi">
                                    <a-input
                                        size="large"
                                        v-decorator="['winningName', { rules: [{ required: true, message: 'Iltimos yutuq nomini tanlang!' }] }]"
                                        placeholder="Nomini kiriting"
                                    />
                                </a-form-item>
                            </div>
                            <div class="col-lg-6">
                                <a-form-item label="Fayl">
                                    <file-upload v-decorator="['winningFile', { rules: [{ required: true, message: 'Iltimos fileni kiriting!' }] }]" :files="fileDown" @inputDown="updateInput"></file-upload>
                                </a-form-item>
                            </div>
                            <div class="col-lg-6">
                                <a-form-item label="Havola">
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
                            <a-button size="large" type="primary" html-type="submit">
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
                                        size="large"
                                        placeholder="Chet tili tanlang"
                                        v-decorator="[
                                            'foreignLang',
                                            {rules: [{ required: true, message: 'Iltimos tilni tanlang!' }]},
                                        ]"
                                    >
                                        <a-select-option value="male">
                                            Ingiliz
                                        </a-select-option>
                                    </a-select>
                                </a-form-item>
                            </div>
                            <div class="col-lg-6">
                                <a-form-item label="Sertifikat turi">
                                    <a-select
                                        size="large"
                                        placeholder="Sertifikat turini tanlang"
                                        v-decorator="[
                                            'foreignSerType',
                                            {rules: [{ required: true, message: 'Iltimos sertifikat turini tanlang!' }]},
                                        ]"
                                    >
                                        <a-select-option value="male">
                                            Ingiliz
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
                                        <a-select-option value="male">
                                            Ingiliz 
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
                                    <file-upload v-decorator="['winningFile', { rules: [{ required: true, message: 'Iltimos fileni kiriting!' }] }]" :files="fileDown" @inputDown="updateInput"></file-upload>
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
export default {
    layout: 'menuLayout',
    data(){
        return {
            visible: false,
            key: '1',
            winningType: '',
            fileDown: '',
        }
    },
    methods: {
        showDrawer() {
            this.visible = true;
        },
        onClose() {
            this.visible = false;
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
                    console.log('Received values of form: ', values);
                }
            });
        },
        handleSubmit2(e) {
            e.preventDefault();
            this.form2.validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                }
            });
        },
        updateInput(val) {
            this.fileDown = val;
            this.form.setFieldsValue({
                winningFile: val.name ? val.name : '',
            });
        },
    },
    beforeCreate() {
        this.form = this.$form.createForm(this, { name: 'normal_login' });
        this.form2 = this.$form.createForm(this, { name: 'normal_login2' });
    },
}
</script>