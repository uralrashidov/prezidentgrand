<template>
  <div>
    <div class="header-college">
      <a-input-search
        placeholder="input search text"
        style="width: 400px; margin-bottom: 20px"
        @keyup="onSearch"
      />
      <a-button type="primary" size="large" class="add-btn" @click="openVisible"> Yangi universitet admini</a-button>
    </div>
    <a-table
      :columns="columns"
      :rowKey="
        (record, index) => {
          return index;
        }
      "
      :data-source="user"
      :pagination="false"
      :loading="loading"
    >
      <template slot="name" slot-scope="name">
        {{name}}
      </template>
      <span slot="action" slot-scope="name">
        <div @click="putClick(name.id)">
          <a-button type="primary" shape="circle">
            <a-icon type="edit" />
          </a-button>
        </div>
      </span>
    </a-table>
    <div class="table--pagination">
      <a-pagination
        v-model="current"
        :total="total"
        @change="handelChange"
        :page-size="pageSize"
      >
        <template slot="buildOptionText" slot-scope="props">
          <span>{{ props.value }} ta dan</span>
        </template>
      </a-pagination>
    </div>
    <a-modal @cancel="ddd" :width="576" on-ok="handleOk" :footer="null" v-model="visible" title="Yangi universitet admini yaratish">
        <div class="table--check">
            <a-form :form="form2" @submit="handleSubmit2" v-if="!isCheck">
                <a-row :gutter="16">
                    <a-col class="gutter-row" :span="24">
                        <div class="gutter-box">
                            <a-form-item label="JSHSHR raqami (pnfl)">
                                <a-input
                                    placeholder="JSHSHR raqami (pnfl) ni kiriting"
                                    size="large"
                                    v-decorator="[
                                    'pinfl',
                                    {rules: [{ required: true, message: 'Ushbu maydon to\'ldirilishi shart.' }]},
                                    ]"
                                />
                            </a-form-item>
                        </div>
                    </a-col>
                    <a-col class="gutter-row" :span="24">
                        <div class="gutter-box">
                            <a-form-item label="Passport berilgan sana">
                            <a-date-picker placeholder="Passport berilgan sanani kiriting" size="large" v-decorator="[
                                    'given_date',
                                    {rules: [{ required: true, message: 'Ushbu maydon to\'ldirilishi shart.' }]},
                                    ]"  />
                            </a-form-item>
                        </div>
                    </a-col>
                </a-row>
                <div class="modal-footer">
                <a-button @click="cancel" type="danger">
                    Bekor qilish
                </a-button>
                <a-button type="primary" html-type="submit">
                    Saqlash
                </a-button>
                </div>
            </a-form>
            <div class="table--per" v-else>
                <h1>Haqiqatdan shu yangi adminni qo'shmoqchisizmi?</h1>
                <div class="table--img">
                    <img :src="`data:image/png;base64,${checkData.photo}`" alt="" />
                </div>
                <div class="table--fullname">
                    {{checkData.last_name}} {{checkData.first_name}} {{checkData.middle_name}}
                </div>
                <a-form :form="form" @submit="handleSubmit">
                    <a-row :gutter="16">
                        <a-col class="gutter-row" :span="24">
                            <div class="gutter-box">
                                <a-form-item label="Universitetni nomi">
                                    <a-select
                                        placeholder="Universitetni kiriting"
                                        show-search
                                        option-filter-prop="children"
                                        :filter-option="filterOption"
                                        size="large"
                                        v-decorator="[
                                        'universityId',
                                        {rules: [{ required: true, message: 'Ushbu maydon to\'ldirilishi shart.' }]},
                                        ]"
                                        
                                    >
                                    <a-select-option :value="item.id" v-for="(item,index) in universities" :key="index">
                                        {{item.name}}
                                    </a-select-option>
                                    </a-select>
                                </a-form-item>
                            </div>
                        </a-col>
                    </a-row>
                    <div class="modal-footer">
                        <a-button @click="cancel2" type="danger">
                            Bekor qilish
                        </a-button>
                        <a-button v-if="isUpdate" type="primary" html-type="submit">
                            O'zgartirish
                        </a-button>
                        <a-button v-else type="primary" html-type="submit">
                            Saqlash
                        </a-button>
                    </div>
                </a-form>
            </div>
        </div>
    </a-modal>
  </div>
</template>
<script>
const columns = [
  {
    title: "T/R",
    dataIndex: "id",
    sorter: true,
    width: "10%",
    scopedSlots: { customRender: "id" },
  },
  {
    title: "JSHSHR raqami (pinfl)",
    dataIndex: "pinfl",
    sorter: true,
    width: "20%",
    scopedSlots: { customRender: "pinfl" },
  },
  {
    title: "Universitet nomi",
    dataIndex: "university",
    sorter: true,
    width: "30%",
    scopedSlots: { customRender: "university" },
  },
//   {
//     title: "Action",
//     width: "10%",
//     key: "action",
//     scopedSlots: { customRender: "action" },
//   },
];
export default {
  props: {
    user: {
      typeof: Array,
      default: null
    },
    total: {
      typeof: Number,
      default: null
    },
    totalPages: {
      typeof: Number,
      default: null
    },
  },
  data() {
    return {
      current: parseInt(this.$route.query.page)
        ? parseInt(this.$route.query.page)
        : 1,
      pageSize: 10,
      loading: false,
      columns,
      items: [],
      visible: false,
      id: "",
      search: [],
      searchText: "",
      isUpdate: false,
      data: [{id: '1', name: 'sss'}],
      universities: [],
      checkData: '',
      isCheck: false,
      pinfl: ''
    };
  },
  mounted() {
    this.$store.dispatch("entity/loadAll", {
        entity: "university",
        name: "all",
        url: "api/user/Universities/",
        params: {
        p: 'not'
        },
        cb: {
            success: response => {
              this.universities = response
            },
            error: () => {
            }
        }
    });
  },
  methods: {
    cancel(){
      this.visible = false
      this.form2.setFieldsValue({
          pinfl: '',
      });
      this.form2.setFieldsValue({
          given_date: '',
      });
    },
    cancel2(){
      this.visible = false
      this.isCheck = false
      this.form.setFieldsValue({
          universityId: null,
      });
    },
    openVisible(){
      this.isUpdate = false
      this.visible = true
    },
    ddd(){
      this.isUpdate = false
      this.form2.setFieldsValue({
          pinfl: '',
      });
      this.form2.setFieldsValue({
          given_date: '',
      });
      this.form.setFieldsValue({
          universityId: '',
      });
      this.isCheck = false
    },
    onSearch(e){
      if(e.target.value){
        this.$store.dispatch("entity/loadAll", {
            entity: "user",
            name: "all",
            url: `api/admin/searchUser`,
            params: {
                page: 1,
                limit: 10,
                extra: {
                  search: e.target.value
                }
            },
            cb: {
                success: response => {
                },
                error: () => {
                }
            }
        });
      } else {
          this.$store.dispatch("entity/loadAll", {
                entity: "user",
                name: "all",
                url: "api/admin/users",
                params: {
                    page: this.$route.query.page ? this.$route.query.page : 1,
                    limit: 10,
                },
                cb: {
                    success: response => {
                        this.universities = response
                    },
                    error: () => {
                    }
                }
            });
      }
    },
    putClick(id) {
      this.id = id
      this.visible = true
      this.isUpdate = true
      this.isCheck = true
      this.$store.dispatch("entity/loadOne", {
          entity: "user",
          name: id,
          url: `api/admin/uAdmin/${id}`,
          params: {
              p: 'not'
          },
          cb: {
              success: response => {
                  if(response){
                      this.form.setFieldsValue({
                          pinfl: response.pinfl,
                      });
                      this.form.setFieldsValue({
                          universityId: response.universityId,
                      });
                    }
                  }
              }
      })
    },
    handelChange(current) {
      this.$router.push({ query: { page: current } });
      this.$store.dispatch("entity/loadAll", {
          entity: "user",
          name: "all",
          url: "api/admin/UAdmins",
          params: {
              page: parseInt(current),
              limit: 20,
          },
          cb: {
              success: response => {
              },
              error: () => {
              }
          }
      });
    },
    handleSubmit2(e){
      e.preventDefault();
      this.form2.validateFields((err, values) => {
          if (!err) {   
            let val = {
                pinfl: values.pinfl,
                given_date: this.formatDate(values.given_date, 'YYYY-MM-DD'),
            }
            this.pinfl = values.pinfl
            this.$store.dispatch("entity/form", {
                  entity: 'userAdmin',
                  name: 'all',
                  id: this.id,
                  updateData: false,
                  prependData: false,
                  method: 'post',
                  url: 'api/admin/check',
                  params: {
                      p: 'not'
                  },
                  values: val,
                  cb: {
                      success: response => {   
                        if(response.data.data != null){
                            this.checkData = response.data.data
                            this.isCheck = true
                            this.form2.resetFields();
                        } else {
                            this.isCheck = false
                            this.openNotificationWithIcon('error', "Ma'lumotlar xato kiritilgan bo'lishi mumkin!")
                        }   
                      },
                      error: (error) => {
                          if(error.response){
                              this.openNotificationWithIcon('error', error.response.data.message)
                          }
                      }
                  }
              })
          }
      });
    },
    handleSubmit(e){
      e.preventDefault();
      this.form.validateFields((err, values) => {
          if (!err) {   
            let val = {
                pinfl: this.pinfl,
                universityId: values.universityId
            }
            this.$store.dispatch("entity/form", {
                  entity: 'user',
                  name: 'all',
                  id: this.id,
                  updateData: false,
                  prependData: false,
                  method: 'post',
                  url: 'api/admin/createUAdmin',
                  params: {
                      p: 'not'
                  },
                  values: val,
                  cb: {
                      success: response => {   
                        this.openNotificationWithIcon('success', response.data.message)
                        this.form.resetFields();
                        this.visible = false
                        this.isCheck = false
                        this.$store.dispatch("entity/loadAll", {
                            entity: "user",
                            name: "all",
                            url: "api/admin/UAdmins",
                            params: {
                                page: this.$route.query.page ? this.$route.query.page : 1,
                                limit: 10,
                            },
                            cb: {
                                success: response => {
                                },
                                error: () => {
                                }
                            }
                        });
                      },
                      error: (error) => {
                          if(error.response){
                              this.openNotificationWithIcon('error', error.response.data.message)
                          }
                      }
                  }
            })
          }
      });
    },
    openNotificationWithIcon(type, message) {
      this.$notification[type]({
        message: "Diqqat!",
        description: message,
      });
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
    showDeleteConfirm(id){
      this.$store.dispatch("entity/formDefault", {
          url: `api/admin/deleteUser/${id}/`,
          method: 'delete',
          params: {
              p: 'not'
          },
          cb: {
              success: response => {
                  this.$store.dispatch("entity/loadAll", {
                      entity: "user",
                      name: "all",
                      url: "api/admin/users",
                      params: {
                        page: this.isUpdate ? this.$route.query.page : this.totalPages,
                        limit: 10,
                      },
                      cb: {
                          success: response => {
                          },
                          error: () => {
                          }
                      }
                  });
                  this.openNotificationWithIcon('success', response.data.message)
              },
              error: (response) => {
                this.openNotificationWithIcon('error', response.data.message)
              }
          }
      })
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
  computed: {
  },
  beforeCreate() {
      this.form2 = this.$form.createForm(this, { name: 'normal_login2' });
      this.form = this.$form.createForm(this, { name: 'normal_login' });
  },
};
</script>
