<template>
<div>
  <a-row type="flex" justify="space-around" align="middle">
    <a-col :span="4">
      <a-card v-if="!showEquipment" class="r1 m-2">
        <p class="fs-4 fw-bold text-start">统计数据</p>
        <a-statistic title="设备总数" :value="equipmentsCount" suffix="台"/>
        <a-statistic title="当前地图设备数量" :value="equipments.length" suffix="台"/>
        <a-statistic title="异常的设备" :value="0" suffix="台"/>
        <a-statistic title="有异常征兆的设备" :value="0" suffix="台"/>
      </a-card>
      <a-card v-else class="r1 m-2">
        <p class="fs-4 fw-bold text-start border-bottom">{{nowEquipment.name}}</p>
        <b-img class="border-bottom" :src="nowEquipment.image" fluid/>
        <div class="border-bottom">
          <p>
            <span v-for="info in nowEquipment.infos">{{info}}<br/></span>
          </p>
        </div>
        <a-statistic title="健康状况" value="良好"/>
        <a-statistic class="border-bottom" title="预计剩余寿命" value="11" suffix="年"/>
      </a-card>
    </a-col>
    <a-col :span="18">
      <div class="r1" id="map"></div>
    </a-col>
    <a-col :span="2">
      <a-card class="r1 m-2">
        <p class="fs-6 fw-bold text-center">当地天气</p>
        <p class="fs-1 fw-bold text-center">18°</p>
        <p class="fs-8 badge bg-success text-wrap">88 良</p>
        <p>多云</p>
        <p>湿度67.0%</p>
      </a-card>
    </a-col>
  </a-row>

  <div v-if="showEquipment">
    <a-row v-for="ops in optionsSplit" :key="ops[0].title" class="m-2" type="flex" justify="space-around" align="middle">
      <a-col v-for="op in ops" :key="op.title" :span="Math.floor(24/ops.length)">
        <p>{{op.title}}</p>
        <v-chart class="chart r2" :option="op.option" autoresize/>
      </a-col>
    </a-row>
  </div>
</div>

  <!-- <div>
    <div id="map"></div>
    <v-chart class="chart" :option="option" autoresize/>
  </div> -->
</template>

<style scoped>
.r1 {
  height: 700px;
}

.r2 {
  height: 300px;
}

.bg-blue {
  background: rgb(21, 34, 79);
}

.text-white {
  color: white;
}

.chart {
  padding-right: 5px;
}

#map {
  padding: 0px;
  margin: 0px;
  width: 100%;
}
</style>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'
import { THEME_KEY } from 'vue-echarts';
import axios from 'axios';

import config from '@/config'

var AMap = null
var map = null

/**
 * @param {Number} s
 */
function sleep(s) {
  return new Promise((resolve) => setTimeout(resolve, s * 1000))
}

// /**
//  * @param {String} content
//  * @returns {String}
//  */
// function encodeHtml(content) {
//   let div = document.createElement('div')
//   div.append(content)
//   return div.innerHTML
// }

/**
 * @param {String} text
 * @returns {Array<String>}
 */
function splitWrapAround(text) {
  let sps = []
  text.split('\n').forEach(t => {
    if (t) {
      sps.push(t)
    }
  })
  return sps
}

export default {
  name: 'Monitoring',
  provide: {
    [THEME_KEY]: 'dark',
  },
  data() {
    return {
      imageBaseUrl: '',
      equipments: [],
      equipmentsCount: 0,
      lastMapMoveDate: new Date(),
      showEquipment: false,
      nowEquipment: {},
      sensorData: []
    }
  },
  computed: {
    options() {
      let sds = this.sensorData.filter((v) => v.id === '40191783')//this.nowEquipment.id)
      let X = []
      let Y = {}
      sds.forEach((sd) => {
        for(let k in sd) {
          if (k != 'id') {
            if (k == 'date') {
              X.push(sd[k])
            }
            else if (k == 'longitude') {
              // TODO
            }
            else if (k == 'latitude') {
              // TODO
            }
            else {
              if (k in Y) {
                Y[k].push(sd[k])
              }
              else {
                Y[k] = [sd[k]]
              }
            }
          }
        }
      })
      let ops = []
      for (let k in Y) {
        let muban = {
          title: k,
          option: {
            backgroundColor: '#333',
            xAxis: {
              type: 'category',
              data: X,
              axisLabel: {
                interale: 0,
                rotate: -40,
                formatter: function (dt) {
                  let t_date = new Date(dt)
                  return [t_date.getHours(), t_date.getMinutes(), t_date.getSeconds()].join(':')
                }
              }
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data: Y[k],
                type: 'line',
                label: {
                  show: true,
                  position: 'top',
                  textStyle: {
                    fontSize: 15
                  },
                  formatter: function (v) {
                    if (v.dataIndex % 2 != 0) {
                      return v.data
                    }
                    else {
                      return ''
                    }
                  }
                }
              }
            ]
          }
        }
        ops.push(muban)
      }
      return ops
    },
    optionsSplit() {
      let options = this.options
      let l = options.length
      let res = []
      for (let i = 0; i < l; i += 3) {
        res.push(options.slice(i, i + 3))
      }
      return res
    }
  },
  watch: {
    equipments: function(newval, oldval) {
      if (AMap != null && map != null) {
        var markerList = map.getAllOverlays('marker')
        var addM = []       // oldval 没有 newval 有的加上
        newval.forEach(equipNew => {
          let flag = true
          oldval.every(equipOld => {
            if (equipNew.id === equipOld.id) {
              flag = false
              return false
            }
            return true
          })
          if (flag) {
            let marker = new AMap.Marker({
              title: equipNew.name,
              label: equipNew.name,
              position: equipNew.position,
              clickable: true,
              topWhenClick: true,
              animation: 'AMAP_ANIMATION_BOUNCE',
              extData: {
                id: equipNew.id
              }
            })
            // let content = [
            //   `<h5>${encodeHtml(equipNew.name)}</h5>`,
            //   `<p>${encodeHtml(equipNew.info)}</p>`
            // ]
            // let infowindow = new AMap.InfoWindow({
            //   content: content.join(''),
            //   offset: new AMap.Pixel(0, -32)
            // })
            let ws = null
            marker.on('click', () => {
              // infowindow.open(map, equipNew.position)
              this.nowEquipment = {
                id: equipNew.id,
                name: equipNew.name,
                image: config.imageBaseUrl + equipNew.image,
                infos: splitWrapAround(equipNew.info),
                position: equipNew.position
              }
              this.showEquipment = true
              // 展示监测信息
              if (ws != null) {
                ws.close()
              }
              ws = new WebSocket(config.wsBaseUrl + '/api/sensordata')
              ws.onmessage = (evt) => {
                let sd = JSON.parse(evt.data)
                this.sensorData.push(sd)
                if (sd.longitude != 0 && sd.latitude != 0) {
                  marker.position = [sd.longitude, sd.latitude]
                }
              }
            })
            // marker.on('mouseover', () => {
            //   infowindow.open(map, equipNew.position)
            // })
            // marker.on('mouseout', () => {
            //   infowindow.close()
            // })
            addM.push(marker)
          }
        })
        var deleteM = []    // oldval 有 newval 没有的删掉
        oldval.forEach(equipOld => {
          let flag = true
          newval.every(equipNew => {
            if (equipOld.id === equipNew.id) {
              flag = false
              return false
            }
            return true
          })
          if (flag) {
            deleteM.push(equipOld.id)
          }
        })
        // 移除
        markerList.forEach(marker => {
          let flag = false
          deleteM.every(deleteId => {
            if (marker.getExtData().id === deleteId) {
              flag = true
              return false
            }
            return true
          })
          if (flag) {
            map.remove(marker)
          }
        })
        // 增加
        map.add(addM)
      }
    }
  },
  methods: {
    getEquipmentPosition(countFlag=false) {
      if (map) {
        var nw = map.getBounds().getNorthWest()  // 左上
        var se = map.getBounds().getSouthEast()  // 右下
        axios.get('/api/equipment/position', {
          baseURL: config.backBaseUrl,
          headers: {
            'Content-Type': 'application/json'
          },
          params: {
            data: JSON.stringify({
              nw: nw,
              se: se,
              count: countFlag
            })
          },
          withCredentials: false,
          responseType: 'json'
        })
          .then((res) => {
            this.equipments = res.data['data']
            if (countFlag) {
              this.equipmentsCount = res.data['count']
            }
            // console.log(this.equipments)
          })
          .catch((err) => {
            console.error(err);
          })
      }
    },
    initMap() {
      AMapLoader.load({
        key: config.mapKey,
        version: '2.0',
        plugins: [
          'AMap.ToolBar',
          'AMap.Scale',
          'AMap.MapType',
          'AMap.Geolocation'
        ]
      })
        .then((AMap_) => {
          AMap = AMap_
          map = new AMap.Map('map', {
            resizeEnable: true,
            viewMode: '2D',
            zoom: 14,
            // center: [108.918, 34.232],
            // layers: [new AMap.TileLayer.Satellite(), new AMap.TileLayer.RoadNet()],
            // mapStyle: 'amap://styles/blue'
          })

          map.addControl(new AMap.ToolBar())
          map.addControl(new AMap.Scale())
          map.addControl(new AMap.MapType())

          var geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, // 使用高精度定位
            timeout: 10,              // 超时 s
            maximumAge: 0,            // 定位结果缓存时间
            convert: true,            // 转换为高德坐标
            showButton: true,         // 显示按钮
            position: 'LB',           // 按钮位置
            offset: [10, 50],
            showMarker: true,         // 显示定位标记
            showCircle: true,         // 显示精度范围
            panToLocation: true,      // 移动到定位点
            zoomToAccuracy: true      // 自动重设视野范围
          })
          map.addControl(geolocation)

          geolocation.getCurrentPosition(() => {
            sleep(2).then(() => {
              // 等待地图定位完成后，获取装备信息lastMapMoveDate
              this.getEquipmentPosition(true)
              map.on('zoomend', () => {
                if (new Date() - this.lastMapMoveDate > 1000) {
                  this.getEquipmentPosition()
                  this.lastMapMoveDate = new Date()
                }
              })
              map.on('moveend', () => {
                if (new Date() - this.lastMapMoveDate > 1000) {
                  this.getEquipmentPosition()
                  this.lastMapMoveDate = new Date()
                }
              })
            })
          })

          // // 标点
          // var marker = new AMap.Marker({
          //   // icon: new AMap.Icon({
          //   //   image: require('@/assets/logo.png'),
          //   //   size: new AMap.Size(40, 50),
          //   //   imageSize: new AMap.Size(40, 50),
          //   //   imageOffset: new AMap.Pixel(0, -6)
          //   // }),
          //   title: 'nas',
          //   position: [108.91781429574087, 34.232201009296396],
          //   offset: new AMap.Pixel(0, 0),
          //   anchor: 'bottom-center',
          //   clickable: true,
          //   topWhenClick: true,
          //   animation: 'AMAP_ANIMATION_BOUNCE'
          // })
          // marker.on('click', (ev) => {
          //   console.log(ev)
          //   this.isShow = 1
          //   this.options = this.options1
          // })
          // map.add(marker)

          // var marker2 = new AMap.Marker({
          //   title: 'edge',
          //   position: [108.9, 34.24],
          //   offset: new AMap.Pixel(0, 0),
          //   anchor: 'bottom-center',
          //   clickable: true,
          //   topWhenClick: true,
          //   animation: 'AMAP_ANIMATION_BOUNCE'
          // })
          // marker2.on('click', (ev) => {
          //   console.log(ev)
          //   this.isShow = 2
          //   this.options = this.options2
          // })
          // map.add(marker2)

          // map.on('complete', () => {
          //   console.log('地图加载完成')
          // })
          // map.on('zoomstart', () => {
          //   console.log('地图开始缩放')
          // })
          // map.on('zoomend', () => {
          //   console.log('地图缩放结束')
          // })
          // map.on('mapmove', () => {
          //   console.log('地图移动中')
          // })
          // map.on('movestart', () => {
          //   console.log('地图开始移动')
          // })
          // map.on('moveend', () => {
          //   console.log('地图移动结束')
          // })
          // map.on('resize', () => {
          //   console.log('地图尺寸改变')
          // })
        })
        .catch((e) => {
          console.error(e)
        })
    }
  },
  mounted() {
    this.imageBaseUrl = config.imageBaseUrl
    this.initMap()
  },
  beforeDestroy() {
    map.destroy()
  }
};
</script>
