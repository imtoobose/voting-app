qwest.get('/polls/all')
.then((xhr, response)=>{
  createCharts(response.polls);
})
.catch((e)=> {
  console.log(e);
});

var createCharts = (res) => {
    console.log(res.length);
  for (var i=0; i<res.length; i++){
    var config = createConfig(
                  res[i].options.map((data)=> data.votes), 
                  res[i].options.map((data)=> data.optionName),
                  res[i].name,
                  res[i].chartType.toLowerCase()
                  );
    createCanvas(config);
  }
}
var allcharts = document.getElementById('allcharts');

var createCanvas = (config) =>{
    console.log('called');
    console.log(config);
    var 
        canvas = document.createElement('canvas'),
        div    = document.createElement('div');

    div.classList.add('charts');
    div.appendChild(canvas);
    allcharts.appendChild(div);
    var chart = new Chart(canvas, config);
}

var colors = {
    $sandy: '#EAD2AC',
    $darkred: '#FE938C',
    $reallydarkred: '#ED6A5A',
    $lightred: '#E6B89C',
    $darkblue: '#4281A4',
    $lightblue: '#9CAFB7',
    $charcoal: '#1B1B1E'
}

var generateColors = (howmany) =>{
    var result = [];
    var randomstart = Math.floor(Math.random()*(361));

    for(var i=1; i<=howmany; i++){
        result.push('hsl('+ (randomstart+ (i*15))%360 +',75%,60%)');
    }
    return result;
}

Chart.defaults.global.defaultFontFamily = "Raleway";
Chart.defaults.global.defaultFontColor ="#FFF";
Chart.defaults.global.defaultFontStyle ="normal";
Chart.defaults.global.defaultFontSize = 12;

function createConfig(data, labels, title, type){ 
    return {
        type: type,
        data: {
            labels: labels,
            datasets: [{                
                data: data,
                backgroundColor: generateColors(data.length),
                borderColor: colors.$charcoal,
                borderWidth: 4
            }],
        },
        options: {
            title : {
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
            scales : {
                xAxes: [{
                    display: false,
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        display: false
                    }
                }],
                yAxes:[{
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
    }
} 

// var ctx = document.getElementById("myChart");
// var myChart = new Chart(ctx, createConfig([12, 19, 3, 5, 2, 3], ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"] ,"My Polls", "doughnut"));
// var canvas2 = document.createElement('canvas');
// canvas2.height = "250px";
// var div = document.createElement('div');
// div.classList.add('charts');
// div.appendChild(canvas2);

// document.getElementById('allcharts').appendChild(div);
// var myChart2 = new Chart(canvas2, createConfig([12, 19, 3, 4], ["Red", "Blue", "Yellow", "Green"], "More Polls", "bar"));