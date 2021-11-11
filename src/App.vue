<template>
    <div id="app">
        <!-- <div id="nav">
      <router-link to="/">Home</router-link> | 
      <router-link to="/blogs">Blogs</router-link> |
      <router-link to="/blogs/create">Create Blog</router-link>
    </div> -->
    
        <router-view :user-data="profile"></router-view>
    </div>
</template>
<script>
import * as auth from './api/auth_api/auth_api'
export default {
    name: 'App',
    data() {
        return {
            profile: {}
        }
    },
    async mounted() {
        try {
            if(auth.isLoggedIn()) {
                const res = await this.$API.Auth_api.getProfie();
                this.profile = res.data
                console.log('rruniad');
                await this.$store.dispatch('authenticate', res.data)
            }
        } catch (error) {
            console.log(error);
            auth.logout()
        }
    }
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
