<template>
    <div>
        <NavbarComponent/>

        
        <main class="container">
            <div class="row g-5">
            
              <router-view :user-data="userData"/>
              
                <SidebarComponent/>
            </div>
        </main>
    </div>
</template>

<script>
// @ is an alias to /src

import NavbarComponent from '.././components/Navbar.vue'
import SidebarComponent from '.././components/Archives.vue'

export default {
    name: 'Home',
    props: {
        userData: {}
    },
    components: {
      NavbarComponent, 
      SidebarComponent
    }
}
</script>
