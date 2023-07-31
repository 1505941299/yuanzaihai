const backgroundColor = '#101736';
const colors = ['#FF3D10', '#16CEB9'];
const title = {
    show: true,
    text: '元朝各省区疫灾情况统计表',
    textStyle: {
        fontSize: 28,
        color: '#ffffff',
        fontFamily: 'PingFangSC-Medium, PingFang SC',
        fontWeight: 500,
        textShadowColor: '#4bb2ff',
        textShadowBlur: 12,
        textShadowOffsetX: 0,
        textShadowOffsetY: 0,
    },
    padding: 0,
    top: 20,
    left: 25,
};
const legend = {
    show: true,
    //data，就是取得每个series里面的name属性。
    orient: 'horizontal',
    icon: 'circle', //图例形状
    padding: 0,
    top: 35,
    right: 40,
    itemWidth: 14, //小圆点宽度
    itemHeight: 14, // 小圆点高度
    itemGap: 21, // 图例每项之间的间隔。[ default: 10 ]横向布局时为水平间隔，纵向布局时为纵向间隔。
    textStyle: {
        fontSize: 14,
        color: '#ffffff',
    },
};
const tooltip = {
    show: true,
    trigger: 'axis',
    axisPointer: {
        type: 'shadow',
    },
    //之所以formatter写的那么复杂是因为数据出水实警里面是负数。要把负数转为正数
    formatter: (params) => {
        let str = `<div>${params[0].name}</div>`
        return str+=params
            .map((item) => {
                return `<div><span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;background-color:${item.color}"></span>
                ${item.seriesName} ${Math.abs(item.value)}</div>
                `
            })
            .join('');
        
    },
};
const getBorderRadius = (index) => {
    if (index === 0) return [0, 100, 100, 0];
    if (index === 1) return [100, 0, 0, 100];
    return 0;
};
// x轴
const nameArr = [
    '南方四省',
    '江浙行省',
    '湖广行省',
    '江西行省',
    '云南行省',
    '北方四省',
    '宣政院辖地',
    '陕西行省',
    '河南行省',
    '中书省',
];

const originData = [
     {
        name: '灾害频度%',
        value: [45.56, 33.33, 13.33, 16.67, 3.33, 33.33, 2.22, 4.44,12.22, 26.67],
    },
    {
        name: '人口密度/km2',
        value: [22.84, 92.27, 12.80, 36.13, 1.48, 2.79, 0.95, 2.25, 13.90,4.18],
    },
   
];
const series = originData.map((item, index) => ({
    name: item.name,
    type: 'bar',
    stack: 'total',
    label: {
        show: false, //不显示item上面的数字
    },
    lineStyle: {
        width: 2,
        color: colors[index], // 线条颜色
    },
    barWidth: 22,
    itemStyle: {
        color: colors[index],
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: getBorderRadius(index),
    },
    data: item.value,
}));

option = {
    backgroundColor,
    title,
    tooltip,
    legend,

    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
    },
    xAxis: [
        {
            type: 'value',
            show: false,
        },
    ],
    yAxis: [
        {
            type: 'category',
            axisTick: { show: false },
            data: nameArr,
            axisLabel: {
                color: '#FFFFFF',
                fontSize: 14,
            },
            axisLine: {
                show: false,
            },
        },
    ],

    series: series,
};

