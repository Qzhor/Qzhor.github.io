var myChart = echarts.init(document.getElementById('main'));

var option = {
    grid:{
        x:60,
        y:20,
        x2:5,
        y2:50
    },
    xAxis: {
        data: ["责任站点总量", "待回复量", "发布问题件总量", "待结案量"],
        axisTick: {
            alignWithLabel: true
        }
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'line',
        data: [15, 26, 12, 8]
    }]
};

myChart.setOption(option);
