<template> 
  <certificate-detail :isEdit="false"></certificate-detail>
</template>
<script>
  import CertificateDetail from './components/CertificateDetail'
  export default {
    name: 'addCertificate',
    components: { CertificateDetail }
  }
</script>


