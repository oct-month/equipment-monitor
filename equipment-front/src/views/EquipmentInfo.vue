<template>
  <div class="info">
    <a-form :form="form" :label-col="{ span: 5}" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
      <a-form-item label="名称">
        <a-input name="name" placeholder="装备名称" v-decorator="['note', { rules: [{required: true, message: '需要名称'}]}]"/>
      </a-form-item>
      <a-form-item label="描述">
        <a-textarea name="info" placeholder="装备描述信息" :rows="4"/>
      </a-form-item>
      <a-form-item label="图片">
        <a-upload
          action="http://127.0.0.1:8082/api/image"
          name="upload"
          list-type="picture-card"
          class="avatar-uploader"
          :default-file-list="fileList"
          :multiple="false"
          :show-upload-list="true"
          :before-upload="beforeUpload"
          @change="handleChange"
        >
          <div v-if="!fileList.length">
            <a-icon :type="loading?'loading':'plus'"/>
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 0 }">
        <a-button type="primary" html-type="submit">
          Submit
        </a-button>
      </a-form-item>
    </a-form>

    <b-card-group columns>
      <b-card
        v-for="equip in equipments"
        :key="equip._id"
        :title="equip.name"
        :img-src="'http://127.0.0.1:8082/uploads/'+equip.image"
        :img-alt="equip.name"
        img-top
        class="mb-2"
        style="max-width: 20rem; display: inline-block"
      >
        <b-card-text>{{ equip.info }}</b-card-text>
      </b-card>
    </b-card-group>

    <!-- <a-card bordered hoverable style="max-width: 20rem; display: inline-block;" v-for="equip in equipments" :key="equip._id" class="mb-2">
      <img
        :src="'http://127.0.0.1:8082/uploads/'+equip.image"
        :alt="equip.name"
        slot="cover"
      />
      <a-card-meta :title="equip.name">
        <template slot="description">{{ equip.info }}</template>
      </a-card-meta>
    </a-card> -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EquipmentInfo",
  data() {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this, {
        name: 'coordinated'
      }),
      fileList: [],
      imgPath: '',
      loading: false,
      equipments: []
    };
  },
  methods: {
    handleSubmit(e) {
      // TODO 提交表单
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (err) {
          console.error(err)
        }
        else {
          console.log(values)
        }
      })
    },
    beforeUpload(file) {
      var isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('图片仅支持JPG或PNG格式')
      }
      var isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('图片大小不能超过2MB')
      }
      if (isJpgOrPng && isLt2M) {
        this.fileList = [file]
        return true
      }
      return false
    },
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      console.log('upload status', info.file.status);
      if (info.file.status === 'done') {
        this.loading = false
        this.imgPath = info.file.response['path']
      }
      if (info.file.status === 'removed') {
        this.fileList = []
        this.imgPath = ''
        this.loading = false
      }
    }
  },
  created() {
    var that = this
    axios
      .get("/api/equipment", {
        baseURL: 'http://127.0.0.1:8081',
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          data: JSON.stringify({
            pagesize: 100,
            pageindex: 0
          })
        },
        withCredentials: false,
        responseType: "json"
      })
      .then((res) => {
        that.equipments = res.data['data']
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
</script>

<style scoped>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
