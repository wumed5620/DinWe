window.onload = function () {
	setData();
	document.getElementById("dashboard").addEventListener("click", function () {
		console.log("OK")

		document.getElementById("pieLTitle").innerHTML = "會員等級比例";
		document.getElementById("pieLRitle").innerHTML = "店家分布";
		document.getElementById("chartTitle").innerHTML = "單筆消費金額分布";

		// 左圓餅圖數據
		let pieL = [
			{ category: "白金會員", value: 100 },
			{ category: "金級會員", value: 300 },
			{ category: "銀級會員", value: 200 },
			{ category: "銅級會員", value: 100 }
		];

		// 右圓餅圖數據
		let pieR = [
			{ category: "北", value: 22 },
			{ category: "中", value: 22 },
			{ category: "南", value: 11 },
			{ category: "東", value: 11 }
		];

		let chartdata = [
			{ category: "1-1000", value1: 250 },
			{ category: "1001-2000", value1: 300 },
			{ category: "2001-3000", value1: 400 },
			{ category: "3001-4000", value1: 200 },
			{ category: "4001-5000", value1: 50 },
			{ category: "above 5000", value1: 66 }
		];

		// 設定圓餅圖數據
		setPieChart(pieL, pieR);

		setData(chartdata);
	})

	// 導覽列會員統計按鈕 切換數據
	document.getElementById("memberStastic").addEventListener("click", function () {
		console.log("OK")

		document.getElementById("pieLTitle").innerHTML = "會員等級比例";
		document.getElementById("pieLRitle").innerHTML = "會員年齡比例";
		document.getElementById("chartTitle").innerHTML = "單筆消費金額分布";

		// 左圓餅圖數據
		let pieL = [
			{ category: "白金會員", value: 100 },
			{ category: "金級會員", value: 300 },
			{ category: "銀級會員", value: 200 },
			{ category: "銅級會員", value: 100 }
		];

		// 右圓餅圖數據
		let pieR = [
			{ category: "小於 20", value: 33 },
			{ category: "21-25", value: 22 },
			{ category: "26-30", value: 11 },
			{ category: "31-35", value: 11 },
			{ category: "36-40", value: 11 },
			{ category: "41-45", value: 11 },
			{ category: "46-50", value: 11 },
			{ category: "大於 50", value: 11 },
		];

		let chartdata = [
			{ category: "1-1000", value1: 250 },
			{ category: "1001-2000", value1: 300 },
			{ category: "2001-3000", value1: 400 },
			{ category: "3001-4000", value1: 200 },
			{ category: "4001-5000", value1: 50 },
			{ category: "above 5000", value1: 66 }
		];

		// 設定圓餅圖數據
		setPieChart(pieL, pieR);

		setData(chartdata);
	})


	document.getElementById("shopStastic").addEventListener("click", function () {
		console.log("OK")

		document.getElementById("pieLTitle").innerHTML = "店家分布比例";
		document.getElementById("pieLRitle").innerHTML = "店家評價比例";
		document.getElementById("chartTitle").innerHTML = "店家當月訂單總額";

		// 左圓餅圖數據
		let pieL = [
			{ category: "北", value: 22 },
			{ category: "中", value: 22 },
			{ category: "南", value: 11 },
			{ category: "東", value: 11 }
		];

		// 右圓餅圖數據
		let pieR = [
			{ category: ">= 4 ★", value: 35 },
			{ category: ">= 3 ★", value: 66 },
			{ category: ">= 2 ★", value: 23 },
			{ category: ">= 1 ★", value: 10 },
			{ category: ">= 0 ★", value: 2 }
		];

		let chartdata = [
			{ category: "0-5萬", value1: 5 },
			{ category: "6-10萬", value1: 26 },
			{ category: "11-15萬", value1: 30 },
			{ category: "16-20萬", value1: 50 },
			{ category: "21-25萬", value1: 20 },
			{ category: "大於25萬", value1: 2 }
		];

		// 設定圓餅圖數據
		setPieChart(pieL, pieR);

		setData(chartdata);
	})
}

// bar圖
var chartData = [
	{
		"chart": "members",
		"title": "所有會員",
		"data": [
			{ category: "所有會員", value1: 1000 },
			{ category: "銅級會員", value1: 500 },
			{ category: "銀級會員", value1: 300 },
			{ category: "金級會員", value1: 200 }]
	},
	{
		"chart": "resDis",
		"title": "店家分布",
		"data": [
			{ category: "總店家數", value1: 66 },
			{ category: "北", value1: 22 },
			{ category: "中", value1: 22 },
			{ category: "南", value1: 11 },
			{ category: "東", value1: 11 }]
	},
	{
		"chart": "ageDis",
		"title": "會員年齡分布",
		"data": [
			{ category: "20-25", value1: 50 },
			{ category: "26-30", value1: 75 },
			{ category: "31-35", value1: 125 },
			{ category: "36-40", value1: 175 },
			{ category: "41-45", value1: 50 },
			{ category: "46-50", value1: 25 },
			{ category: "above 50", value1: 5 }]
	},
	{
		"chart": "orderMonDis",
		"title": "訂單消費金額分布",
		"data": [
			{ category: "1-1000", value1: 250 },
			{ category: "1001-2000", value1: 300 },
			{ category: "2001-3000", value1: 400 },
			{ category: "3001-4000", value1: 200 },
			{ category: "4001-5000", value1: 50 },
			{ category: "above 5000", value1: 66 }]
	}, {
		"chart": "orderNumDis",
		"title": "每次訂位人數",
		"data": [
			{ category: "1-4", value1: 268 },
			{ category: "4-8", value1: 500 },
			{ category: "9-12", value1: 800 },
			{ category: "12-16", value1: 600 },
			{ category: "16-20", value1: 200 },
			{ category: "above 20", value1: 50 }]
	},
	{
		"chart": "timeDis",
		"title": "消費時段分布(%)",
		"data": [
			{ category: "10-12", value1: 12 },
			{ category: "12-14", value1: 13 },
			{ category: "14-16", value1: 25 },
			{ category: "16-18", value1: 20 },
			{ category: "18-20", value1: 15 },
			{ category: "20-22", value1: 10 },
			{ category: "after 22", value1: 5 }]
	}
];

chartData.forEach((element, index) => {
	document.getElementById(`${element.chart}`).addEventListener('click', function () {
		// 更改標題
		document.getElementById('chartTitle').innerHTML = `${element.title}`;
		// 更改數據
		setData(element.data);
	})
});


var root = am5.Root.new("chartdiv");

root.setThemes([
	am5themes_Animated.new(root)
]);

var chart = root.container.children.push(
	am5xy.XYChart.new(root, {
		panY: false,
		wheelY: "zoomX",
		layout: root.verticalLayout
	})
);
// Define data
data = [
	{ category: "1-1000", value1: 250 },
	{ category: "1001-2000", value1: 300 },
	{ category: "2001-3000", value1: 400 },
	{ category: "3001-4000", value1: 200 },
	{ category: "4001-5000", value1: 50 },
	{ category: "above 5000", value1: 66 }];

// Craete Y-axis
var yAxis = chart.yAxes.push(
	am5xy.ValueAxis.new(root, {
		renderer: am5xy.AxisRendererY.new(root, {
		})
	})
);

// Create X-Axis
var xAxis = chart.xAxes.push(
	am5xy.CategoryAxis.new(root, {
		maxDeviation: 0.2,
		renderer: am5xy.AxisRendererX.new(root, {
		}),
		categoryField: "category"
	})
);
xAxis.data.setAll(data);

// Create series
var series1 = chart.series.push(
	am5xy.ColumnSeries.new(root, {
		name: "Series",
		xAxis: xAxis,
		yAxis: yAxis,
		valueYField: "value1",
		categoryXField: "category",
		tooltip: am5.Tooltip.new(root, {})
	})
);
series1.data.setAll(data);

// 第二資料bar 打開可設定
// var series2 = chart.series.push(
//   am5xy.ColumnSeries.new(root, {
//     name: "Series",
//     xAxis: xAxis,
//     yAxis: yAxis,
//     valueYField: "value2",
//     categoryXField: "category"
//   })
// );
// series2.data.setAll(data);

// Add legend
var legend = chart.children.push(am5.Legend.new(root, {}));
legend.data.setAll(chart.series.values);

// 透過此function設定圖表數據
function setData(cdata) {
	// Create root and chart
	if (cdata) {
		data = cdata;
		series1.data.setAll(data);
		xAxis.data.setAll(data);
	} else {
		series1.data.setAll(data);
		xAxis.data.setAll(data);
	}
}

// 圓餅圖
// am5.ready(function () {

// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var rootL = am5.Root.new("chartL");
var rootR = am5.Root.new("chartR");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
rootL.setThemes([
	am5themes_Animated.new(rootL)
]);

rootR.setThemes([
	am5themes_Animated.new(rootR)
]);

// Create chart
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
var chartL = rootL.container.children.push(
	am5percent.PieChart.new(rootL, {
		endAngle: 270
	})
);
var chartR = rootR.container.children.push(
	am5percent.PieChart.new(rootR, {
		endAngle: 270
	})
);

// Create series
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
var seriesL = chartL.series.push(
	am5percent.PieSeries.new(rootL, {
		valueField: "value",
		categoryField: "category",
		endAngle: 270
	})
);

seriesL.states.create("hidden", {
	endAngle: -90
});

var seriesR = chartR.series.push(
	am5percent.PieSeries.new(rootR, {
		valueField: "value",
		categoryField: "category",
		endAngle: 270
	})
);

seriesR.states.create("hidden", {
	endAngle: -90
});

// Set data
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
seriesL.data.setAll([{
	category: "白金會員",
	value: 100
}, {
	category: "金級會員",
	value: 300
}, {
	category: "銀級會員",
	value: 200
}, {
	category: "銅級會員",
	value: 100
}]);

seriesR.data.setAll([{
	category: "北",
	value: 33
}, {
	category: "中",
	value: 22
}, {
	category: "南",
	value: 11
}, {
	category: "東",
	value: 11
}]);

seriesL.appear(1000, 100);
seriesR.appear(1000, 100);


function setPieChart(pieL, pieR) {

	seriesL.data.setAll(pieL);
	seriesR.data.setAll(pieR);

	seriesL.appear(1000, 100);
	seriesR.appear(1000, 100);
}
// }); // end am5.ready()