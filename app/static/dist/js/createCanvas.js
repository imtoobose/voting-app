'use strict';

function createCharts(res, allcharts) {
    for (var i = 0; i < res.length; i++) {
        var config = createConfig(res[i].options.map(function (data) {
            return data.votes;
        }), res[i].options.map(function (data) {
            return data.optionName;
        }), res[i].name, res[i].chartType.toLowerCase());
        createCanvas(config);
    }

    function createCanvas(config) {
        var canvas = document.createElement('canvas'),
            div = document.createElement('div');

        div.classList.add('charts');
        div.appendChild(canvas);
        allcharts.appendChild(div);
        var chart = new Chart(canvas, config);
    }

    function generateColors(howmany) {
        var result = [];
        var randomstart = Math.floor(Math.random() * 360);

        for (var i = 1; i <= howmany; i++) {
            result.push('hsl(' + (randomstart + i * 20) % 360 + ',75%,60%)');
        }
        return result;
    }

    Chart.defaults.global.defaultFontFamily = "Raleway";
    Chart.defaults.global.defaultFontColor = "#FFF";
    Chart.defaults.global.defaultFontStyle = "normal";
    Chart.defaults.global.defaultFontSize = 12;

    function createConfig(data, labels, title, type) {
        return {
            type: type,
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: generateColors(data.length),
                    borderColor: colors.$charcoal,
                    borderWidth: 4
                }]
            },
            options: {
                title: {
                    display: true,
                    position: 'top',
                    text: title,
                    fontColor: '#FFF',
                    fontSize: 22,
                    fontStyle: 'normal'
                },
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        display: false,
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        display: false,
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            display: false
                        }
                    }]
                }
            }
        };
    }
}