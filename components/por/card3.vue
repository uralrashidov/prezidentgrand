<template>
  <div class="por--card">
    <div class="por--card-header">
      <div class="por--card-logo">
        <span> Ilmiy yutuq </span>
        <a-icon type="trophy" />
      </div>
      <button class="por--card-edit" @click="edit(item.id)">
        <a-icon type="edit" />
      </button>
    </div>
    <div class="por--body-flex">
      <!-- <div class="row">
        <div class="col-lg-4">
          <div class="por--body-htext">
            Nomi: 
          </div>
        </div>
        <div class="col-lg-8">
          <div class="por--body-ptext">
            {{item.name}}
          </div>
        </div>
      </div> -->
      <div class="row">
        <div class="col-lg-4">
          <div class="por--body-htext">
            Turi: 
          </div>
        </div>
        <div class="col-lg-8">
          <div class="por--body-ptext">
            {{item.type}}
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4">
          <div class="por--body-htext">
            Fayl: 
          </div>
        </div>
        <div class="col-lg-8">
          <div class="por--body-ptext">
            <a :href="item.fileUrl" target="_blank">{{item.fileUrl ? item.fileUrl.split('-')[1] : ''}}</a>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4">
          <div class="por--body-htext">
            Ilmiy yutuq berilgan sana
          </div>
        </div>
        <div class="col-lg-8">
          <div class="por--body-ptext">
            {{item.givenDate}}
          </div>
        </div>
      </div>
    </div>
    <div class="por--body-footer" @click="achievementDelete(item.id)">
      <a-icon type="delete" theme="filled" />
    </div>
  </div>
</template>
<script>
export default {
    props: ['item'],
    methods: {
      edit(id){
        this.$emit('inputEditId3', true, id)
      },
      openNotificationWithIcon(type,message) {
            this.$notification[type]({
                message: 'Diqqat!',
                description: message,
            });
        },
      achievementDelete(id){
          this.$store.dispatch("entity/formDefault", {
              url: `api/user/scientificAchievement/${id}/`,
              method: 'delete',
              params: {
                  p: 'not'
              },
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
                  },
                  error: (response) => {
                    this.openNotificationWithIcon('error', response.data.message)
                  }
              }
          })
        },
    }
}
</script>