<template>
  <div>
    <div class="header-college">
      <a-input-search
        placeholder="input search text"
        style="width: 400px; margin-bottom: 20px"
        @keyup="onSearch"
      />
      <a-button type="primary" size="large" class="add-btn" @click="visible=true"> Yangi foydalanuvchilar</a-button>
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
        <a-divider type="vertical" />
        <!-- <a-button
          type="primary"
          @click="showDeleteConfirm(name.id)"
          shape="circle"
        >
          <a-icon type="delete" />
        </a-button> -->
        <a-divider type="vertical" />
      </span>
      <span slot="action" slot-scope="name">
        <div @click="putClick(name.id)">
          <a-button type="primary" shape="circle">
            <a-icon type="edit" />
          </a-button>
        </div>
        <a-divider type="vertical" />
        <a-button
          type="primary"
          @click="showDeleteConfirm(name.id)"
          shape="circle"
        >
          <a-icon type="delete" />
        </a-button>
        <a-divider type="vertical" />
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
    <a-modal @cancel="ddd" :width="1024" on-ok="handleOk" :footer="null" v-model="visible" title="Yangi talaba qo'shish">
      <a-form :form="form2" @submit="handleSubmit2">
          <a-row :gutter="16">
              <a-col class="gutter-row" :span="24">
                  <div class="gutter-box">
                      <a-form-item label="JSHSHR raqami (pnfl)">
                          <a-input
                              size="large"
                              v-decorator="[
                              'pinfl',
                              {rules: [{ required: true, message: 'Ushbu maydon to\'ldirilishi shart.' }]},
                              form2.getFieldDecorator('pinfl', { initialValue: derName }),
                              ]"
                          />
                      </a-form-item>
                  </div>
              </a-col>
              <a-col class="gutter-row" :span="24">
                  <div class="gutter-box">
                      <a-form-item label="Universitetni nomi">
                        <a-select
                              show-search
                              option-filter-prop="children"
                              :filter-option="filterOption"
                              size="large"
                              v-decorator="[
                              'universityId',
                              {rules: [{ required: true, message: 'Ushbu maydon to\'ldirilishi shart.' }]},
                                form2.getFieldDecorator('universityId', { initialValue: univerName }),
                              ]"
                              placeholder="Universitet nomini tanlang"
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
            <a-button @click="visible=false" type="danger">
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
    dataIndex: "universityName",
    sorter: true,
    width: "30%",
    scopedSlots: { customRender: "universityName" },
  },
  {
    title: "Action",
    width: "10%",
    key: "action",
    scopedSlots: { customRender: "action" },
  },
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
      derName: '',
      univerName: '',
      isUpdate: false,
      data: [{id: '1', name: 'sss'}],
      universities: []
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
    ddd(){
      this.derName = ''
      this.univerName = ''
      this.isUpdate = false
    },
    onSearch(e){
      if(e.target.value){
        this.$store.dispatch("entity/loadAll", {
            entity: "user",
            name: "all",
            url: `api/admin/searchUser`,
            params: {
                page: this.$route.query.page ? this.$route.query.page : 1,
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
      this.$store.dispatch("entity/loadOne", {
          entity: "user",
          name: id,
          url: `api/admin/user/${id}`,
          params: {
              p: 'not'
          },
          cb: {
              success: response => {
                  if(response){
                      this.derName = response.pinfl
                      this.univerName = response.universityId
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
          url: "api/admin/users",
          params: {
              page: parseInt(current),
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
    handleSubmit2(e){
      e.preventDefault();
      this.form2.validateFields((err, values) => {
          if (!err) {   
            this.$store.dispatch("entity/form", {
                  entity: 'user',
                  name: 'all',
                  id: this.id,
                  updateData: this.isUpdate ? true : false,
                  prependData: this.isUpdate ? false : true,
                  method: this.isUpdate ? 'put' : 'post',
                  url: this.isUpdate ? `api/admin/updateUser/${this.id}` : 'api/admin/createUser',
                  params: {
                      p: 'not'
                  },
                  values: values,
                  cb: {
                      success: response => {   
                        this.visible = false          
                        this.openNotificationWithIcon('success', response.data.message)
                        this.form2.resetFields()
                        this.current = this.isUpdate ? (this.$route.query.page ? parseInt(this.$route.query.page) : 1) : parseInt(this.totalPages)
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
                        this.isUpdate = false   
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
    handleCancel(e) {
      this.visible = false;
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
    }
  },
  computed: {
  },
  beforeCreate() {
      this.form2 = this.$form.createForm(this, { name: 'normal_login2' });
  },
};
</script>
