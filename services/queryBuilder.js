import {query} from 'js-query-builder';
import qs from 'qs';

const queryBuilder = (url, {fields = [], include = [], append = [], limit = 20, sort = '', search = '', p = '', filter = {}, page = 1, extra = {} } = {}) => {
    const queryObj = query(url)

    if(fields.length){
        queryObj.param('fields', fields)
    }

    if(include.length){
        queryObj.include(include)
    }

    if(append.length) {
        queryObj.append(append)
    }

    if(sort) {
        queryObj.sort(sort)
    }

    if(search) {
        queryObj.param('search', search)
    }

    if(p !== 'not'){
        if(limit > 0) {
            queryObj.param('size', Number(limit))
        }
    }
    if (Object.keys(filter).length) {
        Object.keys(filter).forEach((item) => {
            const normalized = qs.stringify({ filter: { [item]: filter[item] } }, { encode: false }).split('&')
            normalized.forEach((item) => {
            const splited = item.split('=')
            if (splited.length === 2 && splited[0] && splited[1]) {
                    queryObj.param(splited[0], splited[1])
                }
            })
        })
    }

    if (Object.keys(extra).length) {
        Object.keys(extra).forEach((key) => {
            if (key && extra[key]) {
                queryObj.param(key, extra[key])
            }
        })
    }


    if(p !=='not'){
        if(page >= 1) {
            queryObj.page(Number(page))
        }
    }
    
    return decodeURIComponent(queryObj.build())
}

export default queryBuilder
