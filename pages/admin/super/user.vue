<template>
  <div class="main__page">
    <div class="main__title">
        Foydalanuvchilar
    </div>
    <tables-user :user="allUser.items.content" :total="allUser.items.totalElements" :totalPages="allUser.items.totalPages" :isFetched="allUser.isFetched"></tables-user>
  </div>
</template>
<script>
    export default {
        layout: 'DashboardLayout',
        data(){
            return {
                items: []
            }
        },
        mounted() {
            this.$store.dispatch("entity/loadAll", {
                entity: "user",
                name: "all",
                url: "api/admin/users",
                params: {
                    page: this.$route.query.page ? this.$route.query.page : 1,
                    limit: 20,
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
        computed: {
            allUser() {
                return this.$store.getters["entity/getEntity"]("user", "all");
            },
        }
    }
</script>