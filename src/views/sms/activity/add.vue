<template> 
  <activity-detail :is-edit='false'></activity-detail>
</template>
<script>
  import ActivityDetail from './components/ActivityDetail'
  export default {
    name: 'addShopActivity',
    components: { ActivityDetail }
  }
</script>
<style>
</style>


