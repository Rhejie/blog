<template>
    <input
        class="form-control me-2"
        type="search"
        v-model="search"
        placeholder="Search"
        aria-label="Search"
        @keypress.enter="searchButton"
    />
</template>
<script>
export default {
    name: 'Search',
    data() {
        return {
            search: ''
        }
    },
    methods: {
        searchButton() {
            this.$EventDispatcher.fire('SEARCH_ENTER', this.search);
        }
    },
    watch: {
        search(val) {
            if(!val) {
                this.$EventDispatcher.fire('SEARCH_ENTER', '');
            }
        }
    }
}
</script>