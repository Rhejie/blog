<template>
    <div class="col-md-8" v-loading="loading">
        <h3 class="pb-4 mb-4 fst-italic border-bottom">
            From the Firehose
        </h3>

        <article class="blog-post" v-for="(blog, index) in blogs" :key="index">
            <h2 class="blog-post-title">{{blog.title}}</h2>
            <p class="blog-post-meta">
                {{blog.created_at}} <small>{{blog.user.name}}</small>
            </p>

            <p>
                {{blog.subject}}
            </p>
            <hr />
            <div v-html="blog.body"></div>
        </article>
        <global-pagination
            :current_page="current_page"
            :current_size="current_size"
            :pagination="blogsPaginations"
            :total="filters.total"
            @handleSizeChange="handleSizeChange"
            @handleCurrentChange="handleCurrentChange">
        </global-pagination>
    </div>
</template>
<script>
import paginate from '.././mixin/pagination'
import GlobalPagination from '.././components/GlobalPagination.vue'
export default {
    name: 'Blogs',
    mixins: [paginate],
    components: {
        GlobalPagination
    },
    data() {
        return {
            blogs: [],
            blogsPaginations: [],
            loading: false,
            current_page: 1,
            current_size: 25,
            search: ''
        }
    },
    created() {
        this.getBlogs();
        this.$EventDispatcher.listen('SEARCH_ENTER', data => {
            this.search = data
            this.getBlogs();
        })
    },
    methods: {
        async getBlogs() {
            try {
                this.loading = true;
                let params = {
                    current_size: this.current_size,
                    current_page: this.current_page,
                    search: this.search,
                };
                const res = await this.$API.Blog_api.getWelomeBlogs(params)
                this.blogs = res.data.data
                this.blogsPaginations = res.data
                this.loading = false
            } catch (error) {
                console.log(error);
            }
        },
        handleSizeChange(val) {
            this.current_size = val;
            this.getBlogs();
        },
        handleCurrentChange(val) {
            this.current_page = val;
            this.getBlogs();
        },
        applySearch() {
            this.getBlogs();
        },
    },
    watch: {
        search(val) {
            if( val == '') {
                this.getBlogs();
            }
        }
    }
}
</script>
<style>
.bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
}

@media (min-width: 768px) {
    .bd-placeholder-img-lg {
        font-size: 3.5rem;
    }
}
</style>