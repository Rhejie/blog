<template>
    <div class="container">
        <div class="nav-scroller py-1 mb-2">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/" v-if="$store.state.profile.name" >{{$store.state.profile.name}}</a>
                    <a class="navbar-brand" href="/" v-if="!$store.state.profile.name" >Your Diaries</a>
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0" >
                            <li class="nav-item" v-if="$store.state.profile.name">
                                <router-link class="nav-link" :to="{name: 'Blogs',params : { userData: this.$store.state.profile}}" exact>Blogs</router-link>
                            </li>
                            <li class="nav-item" v-if="$store.state.profile.name">
                                <router-link class="nav-link" :to="{name: 'Create Blog', params : { userData: this.$store.state.profile}}" exact>Create</router-link>
                            </li>
                        </ul>
                        <div class="d-flex">
                            <SearchInput/>
                            <router-link class="btn btn-outline-success " to="/login" v-if="!$store.state.profile.name">Login</router-link> &nbsp;
                            <button class="btn btn-outline-primary" @click="logout" v-if="$store.state.profile.name">Logout</button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </div>
</template>
<script>
import * as auth from '.././api/auth_api/auth_api'
import SearchInput from './Search.vue'
export default {
    name: 'Navbar',
    components : {
        SearchInput
    },
    data() {
        return {
            
        }
    },
    methods: {
        async logout() {
            try {
                await auth.logout();
                this.$router.push({name: 'Welcome Blogs'})
            } catch (error) {
                console.log(error);
            }
        }
    },
}
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>