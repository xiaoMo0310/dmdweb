<template> 
  <address-detail :isEdit="false"></address-detail>
</template>
<script>
  import AddressDetail from './components/AddressDetail'
  export default {
    name: 'addPlayAddress',
    components: { AddressDetail }
  }
</script>


