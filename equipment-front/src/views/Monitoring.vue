<template>
  <div>
    <v-chart class="chart" :option="option" autoresize/>
  </div>
</template>

<script>
import { THEME_KEY } from 'vue-echarts';

export default {
  name: 'Monitoring',
  provide: {
    [THEME_KEY]: 'dark',
  },
  data() {
    return {
      option: {
        xAxis: {
          type: 'category',
          data: ['01-05', '01-06', '01-07', '01-08', '01-09']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [30.4, 35.4, 30.7, 33.3, 37.1],
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
  },
  methods: {},
  created() {},
};
</script>

<style scoped>
.chart {
  height: 400px;
  width: 600px;
}
</style>
