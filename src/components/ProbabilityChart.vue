<template>
  <div class="chart-container">
    <div class="chart">
      <div class="chart-title">chance of winning</div>
      <svg
        :height="height"
        :width="width">
        <g :transform="`translate(${padding.left}, ${padding.top})`">
          <g>
            <line
              class="axis"
              :y2="chartHeight"/>
            <line
              class="axis"
              :x2="chartWidth"
              :y1="chartHeight"
              :y2="chartHeight"/>
            <text
              text-anchor="end"
              x="-5"
              dy=".35em">
              100%
            </text>
            <text
              text-anchor="end"
              x="-5"
              :y="chartHeight / 2"
              dy=".35em">
              50%
            </text>
            <text
              text-anchor="end"
              x="-5"
              :y="chartHeight"
              dy=".35em">
              0%
            </text>
            <line
              class="guideline"
              :x2="chartWidth"
              :y1="chartHeight / 2"
              :y2="chartHeight / 2"/>
          </g>
          <line
            v-for="(prob, index) in chartData"
            :key="`data-line-${index}`"
            class="data-line"
            :x1="index === 0 ? getXCoord(index) : getXCoord(index - 1)"
            :x2="getXCoord(index)"
            :y1="index === 0 ? getYCoord(prob) : getYCoord(chartData[index - 1])"
            :y2="getYCoord(prob)"/>
          <circle
            v-for="(prob, index) in chartData"
            :key="`data-circle-${index}`"
            :class="{
              active: (index === chartData.length - 1),
            }"
            :cx="getXCoord(index)"
            :cy="getYCoord(prob)"
            r="3"/>
          <text
            class="currentProbLabel"
            :x="getXCoord(chartData.length - 1) + 10"
            :y="getYCoord(currentProb)"
            dy="0.35em"
            text-anchor="start">
            {{ Math.round(currentProb * 100) }}%
          </text>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProbabilityChart',
  props: {
    chartData: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    height: 130,
    padding: {
      left: 50,
      right: 20,
      top: 15,
      bottom: 25,
    },
    width: 280,
  }),
  computed: {
    chartHeight() { return this.height - this.padding.top - this.padding.bottom; },
    chartWidth() { return this.width - this.padding.left - this.padding.right; },
    currentProb() { return this.chartData[this.chartData.length - 1]; },
  },
  methods: {
    getXCoord(index) {
      const domain = 5 * Math.ceil(this.chartData.length / 5);
      return this.chartWidth * (index / domain);
    },
    getYCoord(prob) {
      return this.chartHeight - (this.chartHeight * prob);
    },
  },
};
</script>

<style scoped>
.chart {
  background-color: rgba(255, 255, 255, 0.7);
  border: 1px solid #555;
  border-radius: 15px;
  display: inline-block;
}

.chart-title {
  font-size: 0.95em;
  margin-top: 10px;
}

.axis {
  stroke: #333;
}

.guideline {
  stroke: #333;
  stroke-dasharray: 3,3;
}

.data-line {
  stroke: #333;
  stroke-width: 2;
}

circle {
  stroke: #333;
  stroke-width: 1;
  fill: #f9f9f9;
}

circle.active {
  stroke-width: 2;
}

text {
  font-size: 11px;
}

.currentProbLabel {
  font-size: 12px;
  font-weight: 600;
}
</style>
