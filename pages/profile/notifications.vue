<template>
    <div>
        <div class="title">
            Xabarlar
        </div>
        <div class="app--card">
            <div class="application__my">
                <div class="application__my-header">
                    <div class="application__my-left">
                        Xabar
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="application__my-name-left" v-if="application.message">
                            {{application.message}}
                        </div>
                        <div class="application__my-name-left" v-else>
                            Hozircha sizda xabar yo'q
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    layout: 'menuLayout',
    data(){
        return {
            application: ''
        }
    },
    mounted(){
        this.$store.dispatch("entity/loadAll", {
            entity: "application",
            name: "all",
            url: "api/user/application",
            params: {
            p: 'not'
            },
            cb: {
                success: response => {
                    this.application = response
                },
                error: () => {
                }
            }
        });
    }
}
</script>