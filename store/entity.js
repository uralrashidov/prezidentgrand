import get from "lodash.get";
import queryBuilder from '../services/queryBuilder'

export const state = () => ({
    achievement: {
        all: {
            items: [],
            isFetched: false,
            meta: {}
        },
    },
    certificate: {
        all: {
            items: [],
            isFetched: false,
            meta: {}
        },
    },
    application: {
        all: {
            items: [],
            isFetched: false,
            meta: {}
        },
    },
    scientificAchievement: {
        all: {
            items: [],
            isFetched: false,
            meta: {}
        },
    },
    university: {
        all: {
            items: [],
            isFetched: false,
            meta: {}
        },
    },
    user: {
        all: {
            items: [],
            isFetched: false,
            meta: {}
        },
    },
    languages: {
        all: {
            items: [],
            isFetched: false,
            meta: {}
        }
    },
    certificateTypes: {
        all: {
            items: [],
            isFetched: false,
            meta: {}
        }
    },
    applications: {
        all: {
            items: [],
            isFetched: false,
            meta: {}
        }
    },
    countAll: {
        all: {
            items: [],
            isFetched: false,
            meta: {}
        }
    },
    countAllApp: {
        all: {
            items: [],
            isFetched: false,
            meta: {}
        }
    },
})

export const actions = {
    loadAll({
                state,
                commit,
                rootState
            }, {
                url,
                entity,
                name,
                params,
                appendData = false,
                prependData = false,
                dataKey = 'items',
                metaKey = 'meta',
                cb = {
                    success: () => {
                    },
                    error: () => {
                    },
                }
            }) {
        commit('LOAD_ALL_REQUEST', {
            entity,
            name
        })
        
        const cookieToken = this.$cookies.get("token")
        const config = (cookieToken) ? {
            headers: {
                Authorization: `Bearer ${cookieToken}`,
            }
        } : {}
        
        return this.$axios.$get(queryBuilder(url, params), config).then((response) => {
            let array = {
                items: response
            }
            commit('LOAD_ALL_SUCCESS', {
                entity,
                name,
                appendData,
                prependData,
                data: typeof dataKey === 'function' ? dataKey(array) : array[dataKey],
                meta: typeof metaKey === 'function'
                    ? metaKey(response)
                    : response[metaKey]
            })
            cb.success(response)
        }).catch((errors) => {
            if(errors.response){
                if(errors.response.status===401){
                    this.$router.push({path: '/'})
                    localStorage.clear();
                }
            }
            if(cb.error){
                cb.error(errors)
                
            }
            commit('LOAD_ALL_FAILURE', {
                entity,
                name
            })
        })
    },
    loadOne({state, commit, rootState}, {
        url,
        entity,
        name,
        params,
        dataKey = 'data',
        cb = {
            success: () => {
            },
            error: () => {
            },
        }
    }) {
        commit('LOAD_ONE_REQUEST', {
            entity,
            name
        })

        const cookieToken = this.$cookies.get("token")
        const config = (cookieToken) ? {
            headers: {
                Authorization: `Bearer ${cookieToken}`,
            }
        } : {}

        return this.$axios.$get(queryBuilder(url, params), config).then((response) => {
            commit('LOAD_ONE_SUCCESS', {
                entity,
                name,
                data: typeof dataKey === 'function' ? dataKey(response) : response
            })
            cb.success(typeof dataKey === 'function' ? dataKey(response) : response)
        }).catch((errors) => {
            commit('LOAD_ONE_FAILURE', {
                entity,
                name
            })
            cb.error(errors)
            if(errors.response){
                if(errors.response.status===401){
                    this.$router.push({path: '/'})
                    localStorage.clear();
                }
            }
        })
    },
    loadDefault({state, commit, rootState}, {
        url,
        params,
        cb = {
            success: () => {
            },
            error: () => {
            },
        }
    }) {
        const token = get(rootState, 'auth.profile.access_token')
        const cookieToken = this.$cookies.get("access_token")
        const config = (cookieToken || token) ? {
            headers: {
                Authorization: `Bearer ${cookieToken ? cookieToken : token}`
            }
        } : {}

        return this.$axios.$get(queryBuilder(url, params), config).then((response) => {
            cb.success(response)
        }).catch((errors) => {
            cb.error(errors)
        })
    },
    form({state, commit, rootState}, {
        id,
        url,
        entity,
        name,
        params,
        method,
        values,
        appendData,
        prependData,
        updateData,
        deleteData,
        primaryKey='id',
        dataKey = 'data',
        cb = {
            success: () => {
            },
            error: () => {
            }
        }
    }) {
        commit('FORM_REQUEST', {
            entity,
            name
        })
        const cookieToken = this.$cookies.get("token")
        const config = (cookieToken) ? {
            headers: {
                Authorization: `Bearer ${cookieToken}`,
            }
        } : {}

        return this.$axios[method](queryBuilder(url, params), values, config).then((response) => {
            cb.success(response)
            commit('FORM_SUCCESS', {
                primaryKey,
                id,
                entity,
                name,
                data: typeof dataKey === 'function' ? dataKey(response.data) : response.data,
                appendData,
                prependData,
                updateData,
                deleteData
            })
        }).catch((errors) => {
            if(errors.response){
                if(errors.response.status===401){
                    this.$router.push({path: '/'})
                    localStorage.clear();
                }
            }
            commit('FORM_FAILURE', {
                entity,
                name
            })
            cb.error(errors)
        })
    },
    formPatch({state, commit, rootState}, {
        url,
        params,
        method,
        values,
        cb = {
            success: () => {
            },
            error: () => {
            }
        }
    }) {
        
        const cookieToken = this.$cookies.get("token")
        const config = (cookieToken) ? {
            headers: {
                Authorization: `Bearer ${cookieToken}`,
            }
        } : {}

        return this.$axios[method](queryBuilder(url, params), values ,config).then((response) => {
            cb.success(response)
        }).catch((errors) => {
            cb.error(errors)
        })
    },
    formDefault({state, commit, rootState}, {
        url,
        params,
        method,
        cb = {
            success: () => {
            },
            error: () => {
            }
        }
    }) {
        
        const cookieToken = this.$cookies.get("token")
        const config = (cookieToken) ? {
            headers: {
                Authorization: `Bearer ${cookieToken}`,
            }
        } : {}

        return this.$axios[method](queryBuilder(url, params), config).then((response) => {
            cb.success(response)
        }).catch((errors) => {
            cb.error(errors)
            if(errors.response){
                if(errors.response.status===401){
                    this.$router.push({path: '/'})
                    localStorage.clear();
                }
            }
        })
    },
    formDelete({state, commit},{
        id,
        url,
        entity,
        name,
        params,
        primaryKey='id',
        dataKey = 'data',
        deleteData,
        cb = {
            success: () => {
            },
            error: () => {
            }
        }
    }) {
        commit('FORM_DELETE_REQUEST', {
            entity,
            name
        })

        const cookieToken = this.$cookies.get("token")
        const config = (cookieToken) ? {
            headers: {
                Authorization: `Bearer ${cookieToken}`,
            }
        } : {}

        return this.$axios.$delete(queryBuilder(url, params), config).then((response) => {
            // commit('FORM_DELETE_SUCCESS', {
            //     primaryKey,
            //     id,
            //     entity,
            //     name,
            //     data: typeof dataKey === 'function' ? dataKey(response.data) : response.data,
            //     deleteData
            // })
            cb.success(response)
        }).catch((errors) => {
            // commit('FORM_DELETE_FAILURE', {
            //     entity,
            //     name
            // })
            cb.error(errors)
            if(errors.response){
                if(errors.response.status===401){
                    this.$router.push({path: '/'})
                    localStorage.clear();
                }
            }
        })
    },
}
export const mutations = {
    // ------- LOAD ALL MUTATIONS -------
    LOAD_ALL_REQUEST(state, {
        entity,
        name
    }) {
        state[entity] = {
            ...state[entity],
            [name]: {
                items: get(state, `${entity}.${name}.items`, []),
                isFetched: false,
                meta: get(state, `${entity}.${name}.meta`, {})
            }
        }
    },
    LOAD_ALL_SUCCESS(state, {
        entity,
        name,
        appendData,
        prependData,
        data,
        meta
    }) {
        let items = []
        if (appendData) {
            const oldItems = state[entity][name].items
            items = Array.isArray(oldItems) ? [...oldItems, ...data] : [...data]
        } else if (prependData) {
            const oldItems = state[entity][name].items
            items = Array.isArray(oldItems) ? [...data, ...oldItems] : [...data]
        } else {
            items = data
        }
        state[entity] = {
            ...state[entity],
            [name]: {
                items,
                isFetched: true,
                meta
            }
        }
    },
    LOAD_ALL_FAILURE(state, {
        entity,
        name
    }) {
        state[entity] = {
            [name]: {
                items: get(state, `${entity}.${name}.items`, []),
                isFetched: true,
                meta: get(state, `${entity}.${name}.meta`, {})
            }
        }
    },
    // ------- LOAD ONE MUTATIONS -------
    LOAD_ONE_REQUEST(state, {
        entity,
        name
    }) {
        state[entity] = {
            ...state[entity],
            [name]: {
                item: get(state, `${entity}.${name}.item`, null),
                isFetched: false,
            }
        }
    },
    LOAD_ONE_SUCCESS(state, {
        entity,
        name,
        data
    }) {
        state[entity] = {
            ...state[entity],
            [name]: {
                item: data,
                isFetched: true
            }
        }
    },
    LOAD_ONE_FAILURE(state, {
        entity,
        name
    }) {
        state[entity] = {
            [name]: {
                item: get(state, `${entity}.${name}.item`, null),
                isFetched: true
            }
        }
    },
    // ------- FORM MUTATIONS -------
    FORM_REQUEST(state, {
        entity,
        name
    }) {
        state[entity] = {
            ...state[entity],
            [name]: {
                ...get(state, `${entity}.${name}`, {}),
                isFetched: false,
            }
        }
    },
    FORM_SUCCESS(state, {
        primaryKey,
        data,
        id,
        entity,
        name,
        appendData,
        prependData,
        updateData,
        deleteData
    }) {
        let items = []
        if (appendData) {
            const oldItems = state[entity][name].items
            items = Array.isArray(oldItems) ? [...oldItems, data] : [data]
        } else if (prependData) {
            const oldItems = state[entity][name].items
            items = Array.isArray(oldItems) ? [data, ...oldItems] : [data]
        } else if (deleteData) {
            const oldItems = state[entity][name].items
            items = Array.isArray(oldItems) ? oldItems.filter(i => i[primaryKey] !== id) : []
        } else if (updateData) {
            let oldItems = state[entity][name].items
            const objIndex = oldItems.findIndex((obj => obj[primaryKey] === id));
            oldItems[objIndex] = data;
            items = oldItems
        }
        state[entity] = {
            ...state[entity],
            [name]: {
                ...state[entity][name],
                items,
                isFetched: true,
            }
        }
    },
    FORM_FAILURE(state, {
        entity,
        name
    }) {
        state[entity] = {
            ...state[entity],
            [name]: {
                ...get(state, `${entity}.${name}`, {}),
                isFetched: true
            }
        }
    },
    FORM_DELETE_REQUEST(state, {
        entity,
        name
    }) {
        state[entity] = {
            ...state[entity],
            [name]: {
                ...get(state, `${entity}.${name}`, {}),
                isFetched: false,
            }
        }
    },
}
export const getters = {
    getEntity(state) {
        return (entity, name) => get(state, `${entity}.${name}`)
    }
}
