<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="productTem"
             :rules="rules"
             ref="productTemFrom"
             label-width="150px">
      <el-form-item label="产品名称名称：" prop="productName">
        <el-input v-model="productTem.productName"></el-input>
      </el-form-item>
      <el-form-item label="潜水地址：" prop="addressId">
        <el-select v-model="productTem.addressId"
                   placeholder="请选择潜水地址" @change ="changeAddressIntroduction">
          <el-option
            v-for="item in selectPlayAddressList"
            :key="item.id"
            :label="item.address"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="潜水时间：" prop="divingTime">
        <el-input v-model="productTem.divingTime">
          <template slot="append">天</template>
        </el-input>
      </el-form-item>
      <el-form-item label="行程价格：" prop="productPrice">
        <el-input v-model="productTem.productPrice">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item v-for="(filterProductTem, index) in filterProductTemList"
                    :label="index | filterLabelFilter"
                    :key="filterProductTem.key"
      >
        <el-input v-model="filterProductTem.price" class="input-with-select"  placeholder="请输入价格">
          <el-cascader
            clearable
            v-model="filterProductTem.value"
            :options="filterCates" slot="prepend" @change="clearPriceInputMessage(filterProductTem)">
          </el-cascader>
          <el-button slot="append" @click.prevent="removeFilterAttr(filterProductTem)">删除</el-button>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="handleAddFilterAttr()">新增</el-button>
      </el-form-item>
      <el-form-item label="潜水动图片：" prop="divingImage">
        <multi-upload v-model="imageList"/>
      </el-form-item>
      <el-form-item label="潜点介绍：">
        <tinymce :width="500" :height="400" v-model="productTem.divingDescription"></tinymce>
      </el-form-item>
      <el-form-item label="是否显示：">
        <el-radio-group v-model="productTem.showStatus">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input v-model="productTem.sort"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('productTemFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('productTemFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import {fetchList, createOrUpdateProductTem, getProductTemplateById} from '@/api/courseProductTem';
  import {findCateByParentId, findProductCateIds} from '@/api/courseProductCate';
  import {findPlayAddressByPage} from '@/api/playAddress';
  import Tinymce from '@/components/common/Tinymce';
  import MultiUpload from '@/components/Upload/multiUpload'

  const defaultProductCate = {
    productName: '',
    productPrice: '',
    divingTime: '',
    showStatus: 1,
    sort: 0,
    divingDescription: null
  };
  export default {
    name: "ProductTemDetail",
    components: {Tinymce, MultiUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        productTem: Object.assign({}, defaultProductCate),
        selectPlayAddressList: [],
        imageList: [],
        rules: {
          productName: [
            {required: true, message: '请输入模板名称', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ],
          productPrice: [
            {required: true, message: '请输入产品价格', trigger: 'blur'},
          ],
          addressId: [
            {required: true, message: '请输入潜水地址', trigger: 'blur'},
          ],
          divingTime: [
            {required: true, message: '请输入潜水时间', trigger: 'blur'},
          ],
          divingImage: [
            {required: true, message: '请输入潜水图片', trigger: 'blur'},
          ],
        },
        filterCates: [],
        filterProductTemList: [{
          value: [],
          price: null
        }]
      }
    },
    created() {
      if (this.isEdit) {
        getProductTemplateById(this.$route.query.id).then(response => {
          this.productTem = response.result;
          if(this.productTem.divingImage != null){
            this.imageList = this.productTem.divingImage.split(",")
          }
          let relatedProductArray = JSON.parse(this.productTem.relatedProduct);
          let filterRelatedProduct = [];
          if(relatedProductArray.length !== 0){
            for (let j = 0; j < relatedProductArray.length; j++) {
              filterRelatedProduct.push({
                key: Date.now() + j,
                value: [relatedProductArray[j].parentId, relatedProductArray[j].id],
                price: relatedProductArray[j].price
              })
            }
            this.filterProductTemList = filterRelatedProduct;
            /*let sonIds = relatedProductArray.map(val => val.id)
            let data = new URLSearchParams();
            data.append('ids',sonIds);
            findProductCateIds(data).then(response => {
              if (response.result != null && response.result.length > 0) {
                this.filterProductTemList = [];
                for (let i = 0; i < response.result.length; i++) {
                  for (let j = 0; j < relatedProductArray.length; j++) {
                    if(relatedProductArray[j].id === response.result[i].sonId){
                      this.filterProductTemList.push({
                        key: Date.now() + i,
                        value: [response.result[i].parentId, response.result[i].sonId],
                        price: relatedProductArray[j].price
                      })
                    }
                  }
                }
              }
            });*/
          }
        });
      } else {
        this.productTem = Object.assign({}, defaultProductCate);
      }
      this.getSelectPlayAddressList();
      this.getProductCateList();
    },
    methods: {
      getSelectPlayAddressList() {
        findPlayAddressByPage({pageSize: 100, pageNum: 1}).then(response => {
          this.selectPlayAddressList = response.result.list;
        });
      },
      changeAddressIntroduction(val){
        let playAddress = this.selectPlayAddressList.find(playAddress => {
          return playAddress.id === val;
        })
        this.productTem.playAddress = playAddress.address;
        let imageHtml = '';
        if(playAddress.atlas != null){
          let imageList = playAddress.atlas.split(",");
          for (var i = 0; i < imageList.length; i++) {
            imageHtml += `<p><img class="wscnph" src="${imageList[i]}" /></p>`
          }
        }
        this.productTem.divingDescription = '<p>'+playAddress.addressIntroduction+'</p>' + imageHtml
      },
      clearPriceInputMessage(val){
        val.price = null;
      },
      getProductCateList() {
        findCateByParentId(0, {pageSize: 100, pageNum: 1}).then(response => {
          let list = response.result.list;
          for (let i = 0; i < list.length; i++) {
            let courserProductCate = list[i];
            let children = [];
            if (courserProductCate.children != null && courserProductCate.children.length > 0) {
              for (let j = 0; j < courserProductCate.children.length; j++) {
                children.push({
                  label: courserProductCate.children[j].name,
                  value: courserProductCate.children[j].id
                })
              }
            }
          this.filterCates.push({label: courserProductCate.name, value: courserProductCate.id, children: children});
          }
        });
      },
      getProductCateAndPriceList() {
        //获取选中的筛选商品属性
        let productCateAndPriceList = [];
        for (let i = 0; i < this.filterProductTemList.length; i++) {
          let item = this.filterProductTemList[i];
          if (item.value !== null && item.value.length === 2) {
            let productCateAndPrice = {"parentId":null, "id":null, "text":null, "price":null};
            productCateAndPrice.parentId = item.value[0]
            productCateAndPrice.id = item.value[1];
            productCateAndPrice.price = item.price;
            let productCate = null;
            for (let i = 0; i < this.filterCates.length; i++) {
              productCate = this.filterCates[i].children.find(val => {
                return val.value === item.value[1]
              })
              if(productCate != null){
                break;
              }
            }
            productCateAndPrice.text = productCate.label;
            productCateAndPriceList.push(productCateAndPrice);
          }
        }
        return JSON.stringify(productCateAndPriceList);
      },
      onSubmit(formName) {
        let atlas = ''
        for (let i = 0; i < this.imageList.length; i++) {
          if(i === 0){
            atlas = this.imageList[i]
          }else {
            atlas = atlas + "," + this.imageList[i]
          }
        }
        this.productTem.divingImage = atlas;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                this.productTem.relatedProduct = this.getProductCateAndPriceList();
                this.productTem.id = this.$route.query.id;
                createOrUpdateProductTem(this.productTem).then(response => {
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back();
                });
              } else {
                this.productTem.relatedProduct = this.getProductCateAndPriceList();
                createOrUpdateProductTem(this.productTem).then(response => {
                  this.$refs[formName].resetFields();
                  this.resetForm(formName);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration: 1000
                  });

                });
              }
            });

          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration: 1000
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.productTem = Object.assign({}, defaultProductCate);
        this.getSelectPlayAddressList();
        this.filterProductTemList = [{
          price: null,
          value: []
        }];
      },
      removeFilterAttr(productAttributeId) {
        if (this.filterProductTemList.length === 1) {
          this.$message({
            message: '至少保留一个',
            type: 'warning',
            duration: 1000
          });
          return;
        }
        var index = this.filterProductTemList.indexOf(productAttributeId);
        if (index !== -1) {
          this.filterProductTemList.splice(index, 1)
        }
      },
      handleAddFilterAttr() {
        /*if (this.filterProductTemList.length === 3) {
          this.$message({
            message: '最多添加三个',
            type: 'warning',
            duration: 1000
          });
          return;
        }*/
        this.filterProductTemList.push({
          value: null,
          price: null,
          key: Date.now()
        });
      }
    },
    filters: {
      filterLabelFilter(index) {
        if (index === 0) {
          return '筛选分类：';
        } else {
          return '';
        }
      }
    }
  }
</script>

<style scoped>

</style>
