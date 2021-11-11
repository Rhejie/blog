import axios from 'axios'
import store from '../.././store/index'
import * as auth from '.././auth_api/auth_api'

export function http() {
    return axios.create({
        baseURL : store.state.apiURL,
        headers: {
            Authorization: 'Bearer '+auth.getAccessToken()
        }
    })
}

// if contain file
export function httpFile() {
    return axios.create({
        baseURL : store.state.apiURL,
        headers: {
            Authorization: 'Bearer '+auth.getAccessToken(),
            'Content-Type' : 'multipart/form-data'
        }
    })
}