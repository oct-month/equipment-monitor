<template>
  <div class="ezuikit">
    <div id="video-container"></div>
  </div>
</template>


<style scoped>
.video-container {
  width: 900px;
  height: 600px;
}
</style>


<script>
import qs from 'qs'
import axios from 'axios'
import EZUIKit from 'ezuikit-js'

export default {
  name: 'Monitoring',
  data() {
    return {
      player: null
    }
  },
  mounted() {
    axios({
      method: 'POST',
      url: 'https://open.ys7.com/api/lapp/token/get',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: qs.stringify({
        appKey: '6f1e338e10214d74884e8bf2065c9aca',
        appSecret: '092ff92d7ae65d7d5e29656f3ce12168'
      }),
      withCredentials: false,
      responseType: 'json'
    })
      .then((res) => {
        if (res.data.code == 200) {
          this.player = new EZUIKit.EZUIKitPlayer({
            id: 'video-container',
            accessToken: res.data.data.accessToken,
            url:"ezopen://open.ys7.com/J59194897/1.hd.live",
            autoplay: true,
            template: 'theme',
            plugin: ['talk'],
            width: 900,
            height: 600
          })
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
}
</script>
