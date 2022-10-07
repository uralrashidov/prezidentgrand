<template>
    <div>
        
    </div>
</template>
<script>
export default {
    mounted(){
        if(localStorage.getItem('admin') == 1){
            this.$store.dispatch("adminAuth/authLoginOneId", {
                data: this.$route.query.code,
                cbSuccess: (response) => {
                    this.$router.push('/admin/statistic')
                },
                cbError: (error) => {
                    if(error.response){
                        this.$router.push({path: '/denied', query: {remember: error.response.data.message}})
                    }
                }
            }) 
        } else if(localStorage.getItem('admin') == 2){
            this.$store.dispatch("adminAuth/authLoginOneIdExpert", {
                data: this.$route.query.code,
                cbSuccess: (response) => {
                    this.$router.push('/admin/expert/')
                },
                cbError: (error) => {
                    if(error.response){
                        this.$router.push({path: '/denied', query: {remember: error.response.data.message}})
                    }
                }
            }) 
        } else {
            this.$store.dispatch("auths/authLoginOneId", {
                data: this.$route.query.code,
                cbSuccess: (response) => {
                    this.$router.push('/welcome')
                },
                cbError: (error) => {
                    if(error.response){
                        this.$router.push({path: '/denied', query: {remember: error.response.data.message}})
                    }
                }
            }) 
        }
    }
}
</script>