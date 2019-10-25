<template> 
  <topic-detail :isEdit="true"></topic-detail>
</template>
<script>
  import TopicDetail from './components/TopicDetail'
  export default {
    name: 'updateTopicList',
    components: { TopicDetail }
  }
</script>
<style></style>
