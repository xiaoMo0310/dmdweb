<template> 
  <message-detail :sendType = 1></message-detail>
</template>
<script>
    import MessageDetail from './components/MessageDetail'
    export default {
        name: 'addMessage',
        components: { MessageDetail }
    }
</script>
<style></style>
