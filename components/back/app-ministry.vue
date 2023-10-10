<template>
  <div class="back">
    <div class="back--left">
      <div class="back--svg" @click="back">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.6572 6.32115H3.04378L9.39622 0.892578C9.4978 0.805078 9.43613 0.642578 9.3019 0.642578H7.69655C7.62581 0.642578 7.55869 0.667578 7.50609 0.712221L0.651183 6.56758C0.5884 6.62115 0.538049 6.68739 0.50354 6.76179C0.469031 6.8362 0.451172 6.91704 0.451172 6.99883C0.451172 7.08062 0.469031 7.16146 0.50354 7.23587C0.538049 7.31027 0.5884 7.3765 0.651183 7.43008L7.54599 13.3212C7.5732 13.3444 7.60586 13.3569 7.64032 13.3569H9.30008C9.43431 13.3569 9.49599 13.1926 9.39441 13.1069L3.04378 7.67829H13.6572C13.737 7.67829 13.8023 7.61401 13.8023 7.53544V6.46401C13.8023 6.38544 13.737 6.32115 13.6572 6.32115Z"
            fill="black"
            fill-opacity="0.85"
          />
        </svg>
      </div>
      <div class="back--fullname">
        {{items.lastName}} {{items.firstName}}  {{items.fatherName}}
      </div>
      <div class="back--id">Ariza id:{{app.id}}</div>
    </div>
    <div class="back--right" v-if="this.$route.query.status == 'accepted_in_university'">
      <button @click="showModal(2)">Arizani expertga yubormaslik</button>
      <button @click="showModal(1)">Arizani expertga yuborish</button>
    </div>
    <a-modal
      :class="{ checkconfirm: (isCheck === 1), checkreject: (isCheck === 2)}"
      v-model="visible"
      :title="
        isCheck === 1
          ? 'Arizani expertga yuborish'
          : 'Arizani expretga yubormaslik'
      "
      @cancel="handleCancel"
      :footer="null"
    >
      <a-form :form="form" @submit="handleSubmit">
        <a-row :gutter="16">
          <a-col class="gutter-row" :span="24">
            <div class="gutter-box">
              <a-form-item>
                <a-textarea
                  size="large"
                  placeholder="Qisqacha xabar matni"
                  :auto-size="{ minRows: 3, maxRows: 8 }"
                  v-decorator="[
                    'text',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Ushbu maydon to\'ldirilishi shart.',
                        },
                      ],
                    },
                    form.getFieldDecorator('text', {
                      initialValue: text,
                    }),
                  ]"
                />
              </a-form-item>
            </div>
          </a-col>
        </a-row>
        <div class="modal-footer">
          <a-button size="large" key="back" @click="handleCancel">
            Bekor qilish
          </a-button>
          <a-button
            size="large"
            style="margin-left: 10px"
            html-type="submit"
            type="primary"
          >
            Yuborish
          </a-button>
        </div>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import get from "lodash.get";
export default {
  props: {
    items: {
      typeof: Object,
      default: ''
    },
    app: {
      typeof: Object,
      default: ''
    },
  },
  methods: {
    openNotificationWithIcon(type,message) {
        this.$notification[type]({
            message: 'Diqqat!',
            description: message,
        });
    },
    back() {
      let obj = {
        status: this.$route.query.status,
        page: this.$route.query.page,
      }
      this.$router.push({
        path: '/admin/applications',
        query: obj,
      });
    },
    showModal(id) {
      this.isCheck = id;
      this.visible = true;
      this.form.resetFields()
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          const app = this.app;
          this.$store.dispatch("entity/form", {
            entity: "application",
            name: "all",
            method: "put",
            url: `api/admin/updateApp/${app.id}`,
            params: {
              p: "not",
              extra: {
                status: this.isCheck == 1 ? 'Expertga yuborildi' : 'Expertga yuborilmadi',
                message: values.text
              }
            },
            cb: {
                success: response => {
                    this.isCheck = '';
                    this.visible = false;
                    this.openNotificationWithIcon('success', response.data.message)
                    let obj = {
                      status: this.$route.query.status,
                      page: this.$route.query.page,
                    }
                    this.$router.push({
                      path: '/admin/super/applications',
                      query: obj,
                    })
                    this.$store.dispatch("entity/loadAll", {
                      entity: "countAll",
                      name: "all",
                      url: "api/admin/statistic",
                      params: {
                        p: "not",
                      },
                      cb: {
                        success: (response) => {
                        },
                        error: (response) => {
                          console.log(response);
                        },
                      },
                    });
                },
                error: (error) => {
                    if(error.response){
                        this.isCheck = '';
                        this.visible = false;
                        this.openNotificationWithIcon('error', error.response.data.message)
                    }
                }
            }
          })
        }
      });
    },
    handleCancel() {
      this.visible = false;
      this.isCheck = "";
      this.text = "";
    },
  },
  data() {
    return {
      visible: false,
      isCheck: "",
      text: "",
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
};
</script>
<style lang="scss">
.back {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 25px;
  background-color: #fff;
  border-top: 1px solid rgb(233, 221, 221);
  &--left {
    display: flex;
    align-items: center;
  }
  &--svg {
    margin-right: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
  &--fullname {
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    color: rgba(0, 0, 0, 0.85);
    margin-right: 12px;
  }
  &--right {
    display: flex;
    align-items: center;
    button {
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      text-align: center;
      padding: 8px 16px;
      margin-left: 16px;
      border: unset;
      cursor: pointer;
      &.reject {
        background: #ff4d4f!important;
        box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.043)!important;
        border-radius: 2px!important;
        color: #fff!important;
      }
      &:first-child {
        background: #ff4d4f;
        box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.043);
        border-radius: 2px;
        color: #fff;
      }
      &:nth-child(2n) {
        background: #ff4d4f;
        box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.043);
        border-radius: 2px;
        color: #fff;
      }
      &:last-child {
        background: #52c41a;
        box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.043);
        border-radius: 2px;
        color: #fff;
      }
      &.confirm {
        background: #52c41a!important;
        box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.043)!important;
        border-radius: 2px!important;
        color: #fff!important;
      }
    }
  }
}
</style>