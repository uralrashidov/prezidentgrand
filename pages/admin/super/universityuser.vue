<template>
  <div class="main__page">
    <div class="table__header">
        <div class="main__title">
            Universitet adminlari
        </div>
    </div>
    <tables-university :user="allUser.items.content" :total="allUser.items.totalElements" :totalPages="allUser.items.totalPages"></tables-university>
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
                url: "api/admin/UAdmins",
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