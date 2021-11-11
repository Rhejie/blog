<template>
    <div>
        <NavbarComponent/>

        
        <main class="container">
            <div class="row g-5">
            
              <router-view />
              
                <SidebarComponent/>
            </div>
        </main>
    </div>
</template>
<script>

import NavbarComponent from '.././components/Navbar.vue'
import SidebarComponent from '.././components/Archives.vue'
export default {
    name: 'Welcome',
    components: {
      NavbarComponent, 
      SidebarComponent
    },
    data() {
        return {
            
        }
    },
}
</script>