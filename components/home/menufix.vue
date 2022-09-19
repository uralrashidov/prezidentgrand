<template>
    <div class="menufix">
        <nuxt-link tag="a" to="/" class="menufix__item" exact-active-class="active">
            <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.60991 9.06128C0.94991 9.50128 1.56991 9.58128 2.00991 9.25128L2.99991 8.49128V16.8713C2.99991 17.4213 3.44991 17.8713 3.99991 17.8713H17.9999C18.5499 17.8713 18.9999 17.4213 18.9999 16.8713V8.49128L19.9899 9.25128C20.4299 9.59128 21.0599 9.50128 21.3899 9.06128C21.7299 8.62128 21.6399 7.99128 21.1999 7.66128L11.5999 0.331284C11.2399 0.0612842 10.7399 0.0612842 10.3899 0.331284L0.78991 7.66128C0.35991 8.00128 0.26991 8.63128 0.60991 9.06128ZM6.99991 11.8713C6.44991 11.8713 5.99991 11.4213 5.99991 10.8713C5.99991 10.3213 6.44991 9.87128 6.99991 9.87128C7.54991 9.87128 7.99991 10.3213 7.99991 10.8713C7.99991 11.4213 7.54991 11.8713 6.99991 11.8713ZM10.9999 11.8713C10.4499 11.8713 9.99991 11.4213 9.99991 10.8713C9.99991 10.3213 10.4499 9.87128 10.9999 9.87128C11.5499 9.87128 11.9999 10.3213 11.9999 10.8713C11.9999 11.4213 11.5499 11.8713 10.9999 11.8713ZM14.9999 11.8713C14.4499 11.8713 13.9999 11.4213 13.9999 10.8713C13.9999 10.3213 14.4499 9.87128 14.9999 9.87128C15.5499 9.87128 15.9999 10.3213 15.9999 10.8713C15.9999 11.4213 15.5499 11.8713 14.9999 11.8713Z" fill="#8C8C8C"/></svg>
            <span>Asosiy</span>
        </nuxt-link>
        <nuxt-link tag="a" :disabled="!(profile.isAuth)" :class="{'disabled': !(profile.isAuth)}" to="/profile/portfolios" class="menufix__item"  exact-active-class="active">
            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" class=""><path d="M13 16h-2c-.55 0-1-.45-1-1H3.01v4c0 1.1.9 2 2 2H19c1.1 0 2-.9 2-2v-4h-7c0 .55-.45 1-1 1zm7-9h-4c0-2.21-1.79-4-4-4S8 4.79 8 7H4c-1.1 0-2 .9-2 2v3c0 1.11.89 2 2 2h6v-1c0-.55.45-1 1-1h2c.55 0 1 .45 1 1v1h6c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 7c0-1.1.9-2 2-2s2 .9 2 2H9.99 10z" fill="currentColor"></path></svg>
            <span>Portfolio</span>
        </nuxt-link>
        <nuxt-link tag="a" :disabled="!(profile.isAuth)" :class="{'disabled': !(profile.isAuth)}" to="/profile/application" class="menufix__item"  exact-active-class="active">
            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" class=""><path d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8.83c0-.53-.21-1.04-.59-1.41l-4.83-4.83c-.37-.38-.88-.59-1.41-.59H6zm7 6V3.5L18.5 9H14c-.55 0-1-.45-1-1z" fill="currentColor"></path></svg>
            <span>Ariza</span>
        </nuxt-link>
        <nuxt-link tag="a" :disabled="!(profile.isAuth)" :class="{'disabled': !(profile.isAuth)}" to="/profile/personal" class="menufix__item"  exact-active-class="active">
            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" class=""><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4z" fill="currentColor"></path></svg>
            <span>Ma'lumotlar</span>
        </nuxt-link>
        <nuxt-link tag="a" :disabled="!(profile.isAuth)" :class="{'disabled': !(profile.isAuth)}" to="/profile/notifications" class="menufix__item"  exact-active-class="active">
            <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.41 5.41L10.58 0.58C10.21 0.21 9.7 0 9.17 0H2C0.9 0 0.0100002 0.9 0.0100002 2L0 18C0 19.1 0.89 20 1.99 20H14C15.1 20 16 19.1 16 18V6.83C16 6.3 15.79 5.79 15.41 5.41ZM6.23 15.29L4.11 13.17C3.72 12.78 3.72 12.15 4.11 11.76C4.5 11.37 5.13 11.37 5.52 11.76L6.93 13.17L10.47 9.63C10.86 9.24 11.49 9.24 11.88 9.63C12.27 10.02 12.27 10.65 11.88 11.04L7.64 15.28C7.26 15.68 6.62 15.68 6.23 15.29ZM10 7C9.45 7 9 6.55 9 6V1.5L14.5 7H10Z" fill="#8C8C8C"/></svg>
            <span>Xabarlar</span>
        </nuxt-link>
    </div>
</template>
<script>
export default {
    computed: {
        profile() {
            return {isAuth: true};
            // return this.$store.getters["auths/profile"];
        },
    }
}
</script>