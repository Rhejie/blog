import {http} from '.././services/http_service'
import jwt from 'jsonwebtoken'
import store from '../.././store/index'

export default {
    login(user) {
        return http().post('/auth/login', user)
            .then(res => {
                if(res.status === 200) {
                    setToken(res.data)
                }

                return res.data
            })
    },
    getProfie() {
        return http().get('/auth/profile')
    }
    
}

export function isLoggedIn() {
    const token = localStorage.getItem('rhejie-diaries');
    return token != null
}

export function logout() {
    http().get('/auth/logout');
    localStorage.removeItem('rhejie-diaries')
    store.dispatch('authenticate', '')
}

export function getAccessToken() {
    const token = localStorage.getItem('rhejie-diaries');
    if(!token) {
        return null
    }

    const tokenData = jwt.decode(token);
    return tokenData.user.access_token
}

function setToken(user){
    // JSON.stringify(user)
    const token  = jwt.sign({ user }, 'blog');
    localStorage.setItem('rhejie-diaries', token)
    store.dispatch('authenticate', user.user)
}  
