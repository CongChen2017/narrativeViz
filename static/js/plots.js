
var $selSamples = Plotly.d3.select("#selSamples");  // Locate dropdown box containing samples
var $choose = Plotly.d3.select("#choose");
var $plotly = Plotly.d3.select('#plot').select(".plotly");

function BuildDropdown() {
    Plotly.d3.json("https://raw.githubusercontent.com/CongChen2017/CongChen2017.github.io/master/temp/fulldata.json", function(error, response) {
        // console.log(response[1])

        // On select of new sample, add data to the array and chart
        $selSamples.on('change', optionChanged);

        // Add options to dropdown
        var options = $selSamples
            .selectAll('option')
            .data(response).enter()
            .append('option')
                .attr("value", (d => d.Rank))
                .text(d => d.Name);
        
        // Add a blank option at the top.
        var $ddBlank = $selSamples.insert("option", ":first-child")
            .text("Select...").attr("value", "").attr("selected", true);
        });
}

function BuildDropdown2() {

    Plotly.d3.json("https://raw.githubusercontent.com/CongChen2017/CongChen2017.github.io/master/temp/fulldata.json", function(error, response) {
        // console.log(response);

        // On select of new sample, add data to the array and chart
        $choose.on('change', optionChanged2);

        // Add options to dropdown
        var options2 = $choose
            .selectAll('option')
            .data(response).enter()
            .append('option')
                .attr("value", (d => d.Rank))
                .text(d => d.Name);
        
        // Add a blank option at the top.
        var $ddBlank = $choose.insert("option", ":first-child")
            .text("Select...").attr("value", "").attr("selected", true);
        });
}

BuildDropdown();

BuildDropdown2();

function optionChanged() {
    // Obtain selected sample from dropdown
    selectedPlayer = Plotly.d3.select('select').property('value');
    console.log(selectedPlayer)
    // Call plot function with the new sample value
    buildLineChart(selectedPlayer);
};

function optionChanged2() {
    // Obtain selected sample from dropdown
    selectedPlayer = Plotly.d3.select('#choose').property('value');
    // console.log(selectedPlayer)
    // Call plot function with the new sample value
    updateLineChart(selectedPlayer);
};


function buildLineChart(player) {

     Plotly.d3.json("https://raw.githubusercontent.com/CongChen2017/CongChen2017.github.io/master/temp/fulldata.json", function(error, all_data) {
         // console.log(response.Games.Result);
         
         var response = all_data[player-1];
         console.log(response)
         var winrate = response.Wins/response.Total*100;
         var rate = winrate.toFixed(2)

         // console.log(response.Wins);
         // console.log(rate);
         // Place sample metadata values into table
         $sidebar = Plotly.d3.select(".sample-sidebar");
         $sidebar.select("table").classed("displayed", true);  // Show table
         $sidebar.select(".rank").text(response.Rank);
         $sidebar.select(".rating").text(response.Elo);
         $sidebar.select(".age").text(response.Birthday);
         $sidebar.select(".location").text(response.Nation.toUpperCase());
         $sidebar.select(".total").text(response.Total);
         $sidebar.select(".wins").text(response.Wins);
         $sidebar.select(".losses").text(response.Losses);
         $sidebar.select(".rate").text(rate+"%");

         // Place sample name in header
         Plotly.d3.select(".col-md-9").select("#PlayerName").text("Name: " + response.Name);  


         var trace = {
            type: "scatter",
            mode: "lines",
            name: response.Name,
            x: response.Games.Date,
            y: response.Games.Rating,
            line: {color: '#17BECF'}

        }

        global_trace = trace;

        var data = [trace];

        var layout = {
              // width: 800,
              // height: 450,
              title: "Go Player(s) Rating",
              yaxis: {
                title: "Elo Score"
              },
              xaxis: {
                title: "Date"
              }
            };
        
        Plotly.newPlot('plot', data, layout);

        
            

    });
};





function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

function updateLineChart(player) {


     Plotly.d3.json("https://raw.githubusercontent.com/CongChen2017/CongChen2017.github.io/master/temp/fulldata.json", function(error, all_data) {
         var response = all_data[player-1];
         console.log(response)

         var newcolor = getRandomColor();
         var trace = {
            type: "scatter",
            mode: "lines",
            name: response.Name,
            x: response.Games.Date,
            y: response.Games.Rating,
            line: {color: newcolor}

        }

        Plotly.addTraces('plot', trace);


    });
};

