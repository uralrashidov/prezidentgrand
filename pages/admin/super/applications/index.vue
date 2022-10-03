<template>
    <div class="main--page">
        <div class="table--block">
          <tables-application></tables-application>
        </div>
    </div>
</template>
<script>
export default {
  layout: "DashboardLayout",
  mounted() {
    // this.$store.dispatch("entity/loadAll", {
    //     entity: "applications",
    //     name: "all",
    //     url: "uadmin/getAllAppByDiplomaStatusAndAppStatus",
    //     params: {
    //         extra: {appStatus: 'Ariza yuborildi',diplomaStatus: 'null'},
    //         page: this.$route.query.page ? this.$route.query.page : 1,
    //         limit: this.$route.query.size ? this.$route.query.size : 20,
    //     },
    //     cb: {
    //         success: response => {

    //         },
    //         error: response => {
    //             console.log(response);
    //         }
    //     }
    // });
  },
  computed: {
    // allApplications() {
    //   return this.$store.getters["entity/getEntity"]("applications", "all");
    // },
  }
}
</script>