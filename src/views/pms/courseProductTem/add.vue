<template> 
  <product-tem-detail :is-edit='false'></product-tem-detail>
</template>
<script>
  import ProductTemDetail from './components/ProductTemDetail'
  export default {
    name: 'addProductTem',
    components: { ProductTemDetail }
  }
</script>
<style>
</style>


