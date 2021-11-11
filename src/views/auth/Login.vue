<template>
<div class="wrapper">
    <main class="form-signin">
        <form>
        
            <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

            <div class="form-floating">
                <input type="email" v-model="form.email" class="form-control"  id="floatingInput" placeholder="name@example.com">
                <label for="floatingInput">Email address</label>
                 <div class="invalid-feedback" v-if="errors.email">{{errors.email[0]}}</div>
            </div>
            <div class="form-floating">
                <input type="password" v-model="form.password" class="form-control" id="floatingPassword" placeholder="Password">
                <label for="floatingPassword">Password</label>
                 <div class="invalid-feedback" v-if="errors.password">{{errors.password[0]}}</div>
            </div>

            <div class="checkbox mb-3">
                <label>
                    <input type="checkbox" v-model="form.remember_me" value="remember-me"> Remember me
                </label>
            </div>
            <button class="w-100 btn btn-lg btn-primary" @click="submit($event)">Sign in</button>
            <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
        </form>
    </main>
</div>
    
</template>
<script>
export default {
    name: 'Login',
    data() {
        return {
            form : {
                email: '',
                password: '',
                remember_me: false,
            },
            errors: []
        }
    },
    methods: {
        async submit(e) {
            e.preventDefault();
            try {
                await this.$API.Auth_api.login(this.form)
                this.$router.push({name: 'Blogs', params: { userData: this.$store.state.profile}})
            } catch (error) {
                switch (error.response.status) {
                    case 422:
                        this.errors = error.response.data.errors;
                        break;
                    case 401: 
                        this.$notify.error({
                            title: 'Error',
                            message: 'Invalid Credentials',
                        });
                        break;
                    default:
                        this.$notify.error({
                            title: 'Error',
                            message: 'Please contact the administrator'
                        });
                        break;
                }
            }
        }
    },
}
</script>
<style scoped>
    .invalid-feedback {
        display: inline-block !important;
    }

    .wrapper {
        display: flex;
        align-items: center;
        padding-top: 40px;
        padding-bottom: 40px;
        background-color: #f5f5f5;
        height: 100%;
    }
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
    .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
    }

    .form-signin .checkbox {
    font-weight: 400;
    }

    .form-signin .form-floating:focus-within {
    z-index: 2;
    }

    .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    }

    .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    }
</style>