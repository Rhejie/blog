import {http} from '.././services/http_service'

export default {
    store(data) {
        return http().post(`/user/blog/store`, data)
    },
    getBlogs(id, params) {
        return http().get(`/user/blog/get-blogs/${id}?page=${params.current_page}&count=${params.current_size}&search=${params.search}`)
    },
    
    getWelomeBlogs(params) {
        return http().get(`/blog/get-welcome-blogs?page=${params.current_page}&count=${params.current_size}&search=${params.search}`)
    },
}