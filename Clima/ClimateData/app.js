$(document).ready(function(){ // Check Jq loaded
    $("#view_chart").click(function(){ //Click event for button
      var yearRange = $("#yearRange").val();

        //TODO Country Code 
        var inputVal=document.getElementById('searchTerm'),
          inputVal=inputVal.value
       

      //TODO get type -done
      var Apitype=document.getElementById('dataType'),
       ApiType = Apitype.value
      console.log(ApiType)

      var climateType = ApiType == 'tas' ? "Temperature" : "Precipitation";
      var climateApiURL = "http://climatedataapi.worldbank.org/climateweb/rest/v1/country/mavg/cccma_cgcm3_1/"+ ApiType +"/"+yearRange+"/"+inputVal;
      var graphData = [["Month",climateType]];
      var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      $.getJSON(climateApiURL, {
        format: "json"
      }).done(function (climateData) {
        $.each( climateData[0], function( key, climateValues ) {
          if(key == "monthVals"){
            $.each(climateValues, function( key, climateValue ) {
              graphData.push([months[key],climateValue])
            });
            google.charts.load('current', {'packages':['corechart']});
            google.setOnLoadCallback(function() {
              drawChart(graphData);
            });

          }
        });
      });

      function drawChart(climateGraphData) {
        var data = google.visualization.arrayToDataTable(climateGraphData);
        var options = {
         
          title: 'Climate Data',
          curveType: 'function',
          legend: { position: 'bottom' }
        };
        
        var chart = new google.visualization.ColumnChart(document.getElementById('climate-chart'));
        chart.draw(data, options);
      }

    });
    
  });
  
