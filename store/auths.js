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
    authLoginOneId({commit},{data, cbSuccess, cbError}){
        return this.$axios.$post(`api/auth/oneId/signIn/${data}`).then((response) => {
            if (cbSuccess) cbSuccess(response)
            this.$cookies.set("token", response.object.jwtToken)
            localStorage.setItem('role', response.object.role)
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

        return this.$axios.$get(`api/user/candidate`, config).then((response) => {
            commit('authGetMeSuccess', response)
            if (cbSuccess) cbSuccess(response)
        }).catch((errors) => {
            commit('authGetMeFailure')
            if(errors.response){
                if(errors.response.status===401){
                    // this.$router.push({path: '/'})
                }
            }
            if (cbError) cbError(errors)
        })
    }
}

export const getters = {
    profile: state => state.profile,
}