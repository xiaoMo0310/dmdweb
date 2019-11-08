<template> 
  <certificate-detail :isEdit="true"></certificate-detail>
</template>
<script>
  import CertificateDetail from './components/CertificateDetail'
  export default {
    name: 'updateCertificate',
    components: { CertificateDetail }
  }
</script>


