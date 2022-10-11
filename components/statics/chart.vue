<template>
  <div class="statics--chart">
    <a-row :gutter="[24, 8]" class="statics--chart-i">
      <a-col :span="16">
        <div class="statics--chart-box">
          <apexchart
            type="area"
            height="430"
            :options="chartOptionsAll"
            :series="seriesAll"
          ></apexchart>
        </div>
      </a-col>
      <a-col :span="8" class="statics--chart-i">
        <div class="statics--chart-box">
          <div class="statics--chart-title">
            Arizalarning jins bo‘yicha statistikasi
          </div>
          <apexchart
            class="statics--chart-apex"
            type="pie"
            width="450"
            :options="chartOptions"
            :series="series"
          ></apexchart>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
// import get from 'lodash.get';
export default {
  props: {
    timeChart: {
      typeof: Array,
      default: null
    },
    genderCount: {
      typeof: Array,
      default: null
    },
  },
  data() { 
    const time = this.timeChart
    const count = []
    const year = []
    time.forEach(i => {
      count.push(i.count)
      year.push(i.sana)
    })
    const gender = this.genderCount
    console.log(gender);
    const allGender = []
    gender.forEach((j,index) => {
      if(j.gender == "Erkak"){
        allGender.push(j.count)
      }
    })
    gender.forEach((j,index) => {
      if(j.gender == "Ayol"){
        allGender.push(j.count)
      }
    })
    return {
      series: allGender,
      chartOptions: {
        colors: ["#5B5FC7", "#52C41A"],
        chart: {
          width: 450,
          type: "pie",
        },
        dataLabels: {
          formatter(val, opts) {
            return opts.w.config.series[opts.seriesIndex];
          },
        },
        labels: ["Erkaklar", "Ayollar"],
        legend: {
          position: "bottom",
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
      seriesAll: [
        {
          name: "Arizalar",
          data: count,
        }
      ],
      chartOptionsAll: {
        title: {
            text: 'Arizalarning vaqt bo\'yicha statistikasi',
            align: 'left'
        },
        chart: {
          height: 700,
          type: "area",
        },
        dataLabels: {
          enabled: true,
          formatter(val, opts) {
            return val;
          },
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          categories: year,
        },
        tooltip: {
          x: {
            format: "dd/MM/yy",
          },
        },
      },
    };
  },
};
</script>