import get from "lodash.get";

export const state = () => ({
    profile: {
        isAuth: false,
        isFetched: false,
        data: null
    }
})

export const mutations = {
    authGetMeRequest(state) {
        state.profile = {
            isAuth: false,
            isFetched: false,
            data: null
        }
    },
    authGetMeSuccess(state, response) {
        state.profile = {
            isAuth: true,
            isFetched: true,
            data: response
        }
    },
    authGetMeFailure(state) {
        state.profile = {
            isAuth: false,
            isFetched: false,
            data: null
        }
    },
}

export const actions = {
    authLogin({commit},{data, cbSuccess, cbError}){
        commit('authGetMeRequest')
        return this.$axios.$post('api/auth/adminSignIn',data).then((response) => {
            if (cbSuccess) cbSuccess(response)
            this.$cookies.set("token", response.object.jwtToken)
            localStorage.setItem('role', response.object.role)
        }).catch((errors) => {
            if (cbError) cbError(errors)
        })
    },
    authLoginOneId({commit},{data, cbSuccess, cbError}){
        return this.$axios.$post(`api/auth/oneId/signIn?code=${data}`).then((response) => {
            if (cbSuccess) cbSuccess(response)
            this.$cookies.set("token", response.object.token)
            this.$cookies.set("token_expire", response.object.token_expire)
            localStorage.setItem('role', response.object.roles[0])
        }).catch((errors) => {
            if (cbError) cbError(errors)
        })
    },
    authGetMe({commit, rootState}, payload) {

        const cbSuccess = get(payload, 'cbSuccess');
        const cbError = get(payload, 'cbError');

        const cookieToken = this.$cookies.get("token")
        const config = (cookieToken) ? {
            headers: {
                Authorization: `Bearer ${cookieToken}`,
            }
        } : {}
        
        commit('authGetMeRequest')

        return this.$axios.$get(`uadmin/uadmininfo`, config).then((response) => {
            commit('authGetMeSuccess', response)
            if (cbSuccess) cbSuccess(response)
        }).catch((errors) => {
            commit('authGetMeFailure')
            if(errors.response){
                if(errors.response.status===401){
                    // this.$router.push({path: '/login/super'})
                }
            }
            if (cbError) cbError(errors)
        })
    }
}

export const getters = {
    profile: state => state.profile,
}