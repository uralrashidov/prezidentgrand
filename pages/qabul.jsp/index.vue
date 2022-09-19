<template>
    <div>
        
    </div>
</template>
<script>
export default {
    mounted(){
        this.$store.dispatch("auths/authLoginOneId", {
            data: this.$route.query.code,
            cbSuccess: (response) => {
                this.$router.push('/welcome')
            },
            cbError: (error) => {
                if(error.response){
                    this.$router.push({path: '/denied'})
                }
            }
        }) 
    }
}
</script>