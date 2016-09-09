'use strict';

function createCharts(res, allcharts, detailed) {
    for (var i = 0; i < res.length; i++) {
        var config = createConfig(res[i].options.map(function (data) {
            return data.votes;
        }), res[i].options.map(function (data) {
            return data.optionName;
        }), res[i].name, res[i].chartType.toLowerCase(), detailed);
        createCanvas(res[i]._id, config);
    }

    function createCanvas(id, config) {
        var canvas = document.createElement('canvas'),
            a = document.createElement('a');

        a.classList.add('charts');
        a.setAttribute('href', '/single?pollid=' + id);
        a.appendChild(canvas);
        allcharts.insertBefore(a, allcharts.firstChild);
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

    function createConfig(data, labels, title, type, detailed) {
        var colors = {
            $sandy: '#EAD2AC',
            $darkred: '#FE938C',
            $reallydarkred: '#ED6A5A',
            $lightred: '#E6B89C',
            $darkblue: '#4281A4',
            $lightblue: '#9CAFB7',
            $charcoal: '#1B1B1E'
        };

        return {
            type: type,
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: generateColors(data.length),
                    borderColor: colors.$charcoal,
                    borderWidth: type == "bar" ? 0 : 4
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
                    display: detailed ? type == 'pie' || type == 'doughnut' ? true : false : false,
                    position: 'bottom',
                    labels: {
                        boxWidth: 5,
                        fontSize: 15,
                        padding: 15
                    }
                },
                scales: {
                    xAxes: [{
                        display: type == "bar" && detailed ? true : false,
                        gridLines: {
                            display: true,
                            drawBorder: false,
                            drawTicks: true,
                            color: 'rgba(0,0,0, 0)',
                            zeroLineColor: colors.$reallydarkred,
                            zeroLineWidth: 3
                        },
                        ticks: {
                            display: true
                        }
                    }],
                    yAxes: [{
                        type: "linear",
                        display: type == "bar" && detailed ? true : false,
                        gridLines: {
                            color: 'hsla(0, 30%, 30%, 0.2)',
                            display: true,
                            drawTicks: false,
                            drawBorder: false,
                            drawOnChartArea: true,
                            lineWidth: 1,
                            zeroLineWidth: 3,
                            zeroLineColor: colors.$reallydarkred
                        },
                        ticks: {
                            display: true,
                            beginAtZero: true,
                            stepSize: 1
                        }
                    }]
                }
            }
        };
    }
}