<template>
<div>
  <a-row type="flex" justify="space-around" align="middle">
    <a-col :span="4">
      <a-card v-if="!isShow" class="r1 m-2">
        <p class="fs-4 fw-bold text-start">统计数据</p>
        <a-statistic title="存储类设备" :value="34" suffix="台"/>
        <a-statistic title="边缘设备" :value="14" suffix="台"/>
        <a-statistic title="展示设备" :value="21" suffix="台"/>
        <a-statistic title="异常的设备" :value="0" suffix="台"/>
        <a-statistic title="有异常征兆的设备" :value="0" suffix="台"/>
      </a-card>
      <a-card v-else class="r1 m-2">
        <p class="fs-4 fw-bold text-start border-bottom">群晖NAS</p>
        <b-img class="border-bottom" :src="require('@/assets/nas.jpeg')" fluid/>
        <div class="border-bottom">
          <p>用于文化展演视频的存储、备份</p>
          <p>容量为10T</p>
          <p>购置日期为2022-03-03</p>
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

  <a-row v-if="isShow" class="m-2" type="flex" justify="space-around" align="middle">
    <a-col v-for="op in options" :key="op.title" :span="Math.floor(24/options.length)">
      <p>{{op.title}}</p>
      <v-chart class="chart r2" :option="op.option" autoresize/>
    </a-col>
  </a-row>
</div>

  <!-- <div>
    <div id="map"></div>
    <v-chart class="chart" :option="option" autoresize/>
  </div> -->
</template>

<style scoped>
.r1 {
  height: 600px;
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


export default {
  name: 'Monitoring',
  provide: {
    [THEME_KEY]: 'dark',
  },
  data() {
    return {
      AMap: null,
      map: null,
      isShow: false,
      options: [
        {
          title: '温度',
          option: {
            backgroundColor: '#333',
            xAxis: {
              type: 'category',
              data: ['20:10', '20:20', '20:30', '20:40', '20:50', '21:00']
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data: [34.4, 34.4, 35.7, 36.3, 37.1, 37.2],
                type: 'line',
                label: {
                  show: true,
                  position: 'top',
                  textStyle: {
                    fontSize: 20
                  }
                }
              }
            ]
          }
        },
        {
          title: '湿度',
          option: {
            backgroundColor: '#222',
            xAxis: {
              type: 'category',
              data: ['20:10', '20:20', '20:30', '20:40', '20:50', '21:00']
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data: [0.67, 0.67, 0.67, 0.68, 0.68, 0.67],
                type: 'line',
                label: {
                  show: true,
                  position: 'top',
                  textStyle: {
                    fontSize: 20
                  }
                }
              }
            ]
          }
        },
        {
          title: '电压',
          option: {
            backgroundColor: '#111',
            xAxis: {
              type: 'category',
              data: ['20:10', '20:20', '20:30', '20:40', '20:50', '21:00']
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data: [15.4, 15.5, 15.6, 15.5, 15.4, 15.4],
                type: 'line',
                label: {
                  show: true,
                  position: 'top',
                  textStyle: {
                    fontSize: 20
                  }
                }
              }
            ]
          }
        },
        {
          title: '电流',
          option: {
            backgroundColor: '#000',
            xAxis: {
              type: 'category',
              data: ['20:10', '20:20', '20:30', '20:40', '20:50', '21:00']
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data: [3.2, 3.21, 3.23, 3.21, 3.19, 3.1],
                type: 'line',
                label: {
                  show: true,
                  position: 'top',
                  textStyle: {
                    fontSize: 20
                  }
                }
              }
            ]
          }
        }
      ]
    }
  },
  methods: {
    initMap() {
      AMapLoader.load({
        key: 'fb10d68786e5060551e53489063e8b34',
        version: '2.0',
        plugins: [
          'AMap.ToolBar',
          'AMap.Scale',
          'AMap.MapType',
          'AMap.Geocoder'
        ]
      })
        .then((AMap) => {
          this.AMap = AMap
          this.map = new AMap.Map('map', {
            viewMode: '2D',
            zoom: 14,
            center: [108.918, 34.232],
            // layers: [new AMap.TileLayer.Satellite(), new AMap.TileLayer.RoadNet()],
            mapStyle: 'amap://styles/blue'
          })

          this.map.addControl(new AMap.ToolBar())
          this.map.addControl(new AMap.Scale());
          this.map.addControl(new AMap.MapType())

          // 标点
          var marker = new AMap.Marker({
            // icon: new AMap.Icon({
            //   image: require('@/assets/logo.png'),
            //   size: new AMap.Size(40, 50),
            //   imageSize: new AMap.Size(40, 50),
            //   imageOffset: new AMap.Pixel(0, -6)
            // }),
            title: '西安',
            position: [108.91781429574087, 34.232201009296396],
            offset: new AMap.Pixel(0, 0),
            anchor: 'bottom-center',
            clickable: true,
            topWhenClick: true,
            animation: 'AMAP_ANIMATION_BOUNCE'
          })
          marker.on('click', (ev) => {
            console.log(ev)
            this.isShow = true
          })
          this.map.add(marker)

          // new AMap.Geocoder({
          //   city: '全国',
          //   radius: 500,
          //   batch: false,
          //   extensions: 'base'
          // }).getAddress(new AMap.LngLat(108, 34), (status, result) => {
          //   console.log(status)
          //   console.log(result)
          // })
        })
        .catch((e) => {
          console.error(e)
        })
    }
  },
  mounted() {
    this.initMap()
  },
  beforeDestroy() {
    this.map.destroy()
  }
};
</script>
