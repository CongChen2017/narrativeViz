d3.json("https://raw.githubusercontent.com/CongChen2017/CongChen2017.github.io/master/temp/data.json", function (error, goData) {
  if (error) console.error;

  console.log(goData);

var $selSamples = Plotly.d3.select("#ddlViewBy");
var $plotly = Plotly.d3.select('#PieChart').select(".plotly");
var col1 = 'rgba(255, 99, 132, 0.7)';
var col2 = 'rgba(54, 162, 235, 0.7)';
var col3 = 'rgba(255, 206, 86, 0.7)';

$selSamples.on("change", myFunction);
function myFunction() {
    selected = Plotly.d3.select('select').property('value');
    console.log(selected);
    if ( selected === '1' ) {
        var response = goData.slice(0,10);
        buildtable(response);
    }
    else if (selected === '2') {
        var response = goData.slice(0,20);
        buildtable(response);
    }
    else if (selected === '3') {
        var response = goData.slice(0,30);
        buildtable(response);
    }
    // console.log(endpoint);
    }

var endpoint = goData.slice(0,20);
buildtable(endpoint);

function buildtable(response) {

        var name_list = [];
        var elo_list = [];
        var nation_list = [];
        var rank_list = [];

        for (i=0; i<response.length; i++) {
            name_list.push(response[i]["Name"]);
            elo_list.push(response[i]["Elo"]);
            nation_list.push(response[i]["Nation"]);
            rank_list.push(response[i]["Rank"]);
        };


        console.log(nation_list);

        var nation_color = [];

        for (c=0; c<nation_list.length; c++) {
            if (nation_list[c]==='cn') {
                nation_color.push(col1);
            }
            else if (nation_list[c] === 'kr') {
                nation_color.push(col2);
            }
            else {
                nation_color.push(col3);
            }
        };

        
        var country_count =[];
        

        var unique_nation = ['kr', 'jp', 'cn'];

        for (j=0; j<unique_nation.length; j++){
            var count = 0;
            for(var i = 0; i < nation_list.length; ++i){
            if(nation_list[i] == unique_nation[j])
                count++;
            }
            country_count.push(count);
        };

        // console.log(country_count);

        var pie_data = [{
                values: country_count,
                labels: unique_nation,
                text: "Nationality",
                type: 'pie',
                // textinfo: 'none',
                marker: {
                    colors: [col2, col3, col1]
                  },
                hole: .4
            }];

            // Define pie plot layout
            var pie_layout = {
                height: 400,
                width: 400,
                margin: {
                    l: 0,
                    r: 100,
                    b: 80,
                    t: 50,
                    pad: 4
                  }
                };

            Plotly.newPlot("PieChart", pie_data, pie_layout);
   

        var table_values = [
          rank_list,
          name_list,
          nation_list,
          elo_list
          ]

        var table_data = [{
          type: 'table',
          columnwidth: [50,140,100,60],
          header: {
            values: [["Rank"], ["Name"],
                         ["Nationality"], ["Elo"]],
            align: "center",
            line: {width: 1, color: 'black'},
            fill: {color: "grey"},
            font: {family: "Arial", size: 14, color: "white"}
          },
          cells: {
            values: table_values,
            align: "center",
            line: {color: "black", width: 1},
            font: {family: "Arial", size: 14, color: ["black"]}
          }
        }]

        var table_layout = {
          autosize: false,
          width: 350,
          height: 600,
          margin: {
            l: 0,
            r: 50,
            b: 100,
            t: 10,
            pad: 4
          },
          plot_bgcolor: '#c7c7c7'
        };

        Plotly.newPlot('tabletable', table_data, table_layout);


        if(window.myHorizontalBar) {window.myHorizontalBar.destroy()};

        var ctx = document.getElementById('myChart').getContext('2d');

        window.myHorizontalBar = new Chart(ctx,{
                       type:'horizontalBar',
                       data:{
                           labels:name_list,
                           datasets:[{
                               data:elo_list,
                           backgroundColor:nation_color,
                           borderWidth:1,
                           hoverBorderWidth:2

                           }],
                       },
                       options:{

                           legend:{
                             display: false
                               }
                           }}
                       
                   );
    };


});