<template>
    <div class="main--page">
        <div class="table--block">
          <tables-application :appItems="allApplications.items.content" :isFetched="allApplications.isFetched" :meta="allApplications.items"></tables-application>
        </div>
    </div>
</template>
<script>
export default {
  layout: "DashboardLayout",
  mounted() {
    this.$store.dispatch("entity/loadAll", {
        entity: "applications",
        name: "all",
        url: "api/expert/AppsByUadmin",
        params: {
            extra: {status: this.$route.query.status == 'new' ? `Expertga yuborildi` : (this.$route.query.status == 'recommend_in_commission' ? 'Tavsiya etildi' : 'Tavsiya etilmadi')},
            page: this.$route.query.page ? this.$route.query.page : 1,
            limit: this.$route.query.size ? this.$rofute.query.size : 20,
        },
        cb: {
            success: response => {

            },
            error: response => {
                console.log(response);
            }
        }
    });
  },
  computed: {
    allApplications() {
      return this.$store.getters["entity/getEntity"]("applications", "all");
    },
  }
}
</script>