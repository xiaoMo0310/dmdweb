<template> 
  <topic-detail :isEdit="false"></topic-detail>
</template>
<script>
  import TopicDetail from './components/TopicDetail'
  export default {
    name: 'addTopicList',
    components: { TopicDetail }
  }
</script>
<style></style>
