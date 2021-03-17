<template>
    <div class="grey darken-1 empty-layout">
        <router-view/>
    </div>
</template>

<script>
/*global M*/
export default {
    computed: {
        error() {
            return this.$store.getters.error
        }
    },
    watch: {
        error(fbError) {
            console.log(fbError)
            if(fbError.code == 'auth/user-not-found'){
            M.toast({html: fbError.message})
            }
            M.toast({html: fbError.message})
        }
    }
}
</script>