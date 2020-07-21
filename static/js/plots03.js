var $size = Plotly.d3.select("#teamsize");
$size.on('change', function() {
    var teamsize = $size.property('value');

    Plotly.d3.json("https://raw.githubusercontent.com/CongChen2017/CongChen2017.github.io/master/temp/fulldata.json", function(error, response) {
            console.log(response);
            // console.log(teamsize);
    var cn_names = [];
    var cn_age = [];
    var cn_total = [];
    var cn_winrate = [];
    var kr_names = [];
    var kr_age = [];
    var kr_total = [];
    var kr_winrate = [];
    

    for (i=0; i<response.length; i++) {
        if (response[i].Nation == "kr" & kr_names.length < teamsize) {
            kr_names.push(response[i].Name);
            kr_age.push(2020-response[i].Birthday.slice(0,4));
            kr_winrate.push(response[i].Wins/response[i].Total*100);
            kr_total.push(response[i].Total);
        }
        if (response[i].Nation == "cn" & cn_names.length < teamsize) {
            cn_names.push(response[i].Name);
            cn_age.push(2020-response[i].Birthday.slice(0,4));
            cn_winrate.push(response[i].Wins/response[i].Total*100);
            cn_total.push(response[i].Total);
        }
    };
    
    var max_age = Math.max.apply(Math, kr_age.concat(cn_age));
    console.log(max_age);

    var trace1 = {
      x: cn_age,
      y: cn_winrate,
      mode: 'markers',
      type: 'scatter',
      name: 'Team China',
      text: cn_names,
      marker: { size: 12,
      color: 'rgba(255, 99, 132, 0.7)' }
    };

    var trace2 = {
      x: kr_age,
      y: kr_winrate,
      mode: 'markers',
      type: 'scatter',
      name: 'Team S. Korea',
      text: kr_names,
      marker: { size: 12,
      color: 'rgba(54, 162, 235, 0.7)' }
    };

    var data = [ trace1, trace2 ];
    // console.log(data);

    var color = Chart.helpers.color;

    var layout = {
      xaxis: {
        range: [ 18, max_age+2 ],
        title: {
          text: 'Age',
          font: {
            family: 'Courier New, monospace',
            size: 18,
            color: 'black'
          }
      },
    },
      yaxis: {
        range: [40, 80],
        title: {
          text: 'Win Rate (%)',
          font: {
            family: 'Arial, monospace',
            size: 18,
            color: '#7f7f7f'
          }
      },
      },
      legend: {
        y: 0.5,
        yref: 'paper',
        font: {
          family: 'Arial, sans-serif',
          size: 16,
          color: 'grey',
        }
      },
      title:"Top Player's Age vs Win Rate"
    };

    Plotly.newPlot('summary', data, layout);


    });
});


   