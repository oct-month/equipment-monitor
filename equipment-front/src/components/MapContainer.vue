<template>
  <div id="container"></div>
</template>

<style scoped>
#container {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 800px;
}
</style>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'

export default {
  name: 'MapContainer',
  data() {
    return {
      map: null
    }
  },
  methods: {
    initMap() {
      AMapLoader.load({
        key: 'fb10d68786e5060551e53489063e8b34',
        version: '2.0',
        plugins: ['AMap.Scale']
      })
        .then((AMap) => {
          this.map = new AMap.Map('container', {
            viewMode: '3D',
            zoom: 14,
            center: [108.918, 34.232]
          })
          // 标点
          var marker = new AMap.Marker({
            position: [108.91781429574087, 34.232201009296396]
          })
          this.map.add(marker)
        })
        .catch((e) => {
          console.error(e)
        })
    }
  },
  mounted() {
    this.initMap()
  }
};
</script>
