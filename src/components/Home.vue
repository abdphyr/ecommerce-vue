<template>
  <div>

  </div>
</template>

<script>
import { defineComponent } from 'vue';


defineComponent({
  data() {
    return {
      pageNumber: 1,
      brand: ""
    }
  },
  methods: {
    pageClick(page) {
      this.pageNumber = page;
      this.fetchProducts();
    }
    
    filterBrand() {
      this.brand = brand;
      this.fetchProducts();
    }

    fetchProducts() {
      this.$store.dispatch("GET_PRODUCTS_FROM_API", {
        page: this.page,
        brand: this.brand
      })
    }
  }
})
</script>