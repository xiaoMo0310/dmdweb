<template> 
  <Integration-Rule-detail :isEdit="true"></Integration-Rule-detail>
</template>
<script>
  import IntegrationRuleDetail from './components/IntegrationRuleDetail'
  export default {
    name: 'IntegrationRule',
    components: { IntegrationRuleDetail }
  }
</script>
<style></style>
