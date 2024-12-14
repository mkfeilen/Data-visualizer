import Plot from 'react-plotly.js';
import './App.css';
import React, { useState, useEffect } from 'react';
import erosionOfBlade from './data/erosionOfBlade.json';
import powerCurveData from './data/power_curve_data.json';
//import coordinatesData from './data/rainfallChart.js';
// import rainfall from './data/rainfall.json';
// this data is made up as an example of what this type of graph could look like, please insert real data
import heatMapData from './data/rainfallHeatMap.js';
//import rainfalls2 from './data/rainfall2.json';
import revenueFile from './data/revenue.json';
// import coordinatesData2 from './data/rainfallSmallChart.js';
import turbineBladePoints from './data/turbineBladePoints.json';

function App() {

  // var trace1 = erosionOfBlade.erosionLineData;
  // var trace2 = turbineBladePoints.turbineBladePoints;
  var powerCurve = powerCurveData.powerCurveData;
  //var rainfallPlots = rainfall.rainfallPoints;
  //var rainfallPlots2 = rainfalls2.rainfallMarkerData;
  var revenueDataJson = revenueFile.revenue;
  //var erosionOverTime = ('erosionOverTime', [trace1, trace2]);

  var trace1 = erosionOfBlade.erosionLineData;
  var erosionData = erosionOfBlade.erosionLineData;
  var erosionOverTime = [];
  erosionOverTime.push(trace1, createTurbineErosionGraph(erosionData));

  function createTurbineErosionGraph(erosionData) {
    console.log(erosionData);
    if ("blade_length" in erosionData) {

      var trace2X = [];
      let bladeLength = erosionData["blade_length"];

      trace2X.push(bladeLength, (bladeLength * 0.96), (bladeLength * 0.72), (bladeLength * 0.48), (bladeLength * 0.24), (bladeLength * 0.12), (bladeLength * 0.06), (bladeLength * 0.036), (bladeLength * 0.012), 0, (bladeLength * 0.012), (bladeLength * 0.024), (bladeLength * 0.036), (bladeLength * 0.048), (bladeLength * 0.06), (bladeLength * 0.12), (bladeLength * 0.24), (bladeLength * 0.36), (bladeLength * 0.48), (bladeLength * 0.60), (bladeLength * 0.72), (bladeLength * 0.843), (bladeLength * 0.904), (bladeLength * 0.928), (bladeLength * 0.940), (bladeLength * 0.964), (bladeLength * 0.976), (bladeLength * 0.988), (bladeLength));

      return {
        "x": trace2X,
        "y": [
          0.9,
          0.7,
          0.7,
          0.7,
          0.7,
          0.7,
          0.7,
          0.7,
          0.8,
          1,
          1.1,
          1.2,
          1.2,
          1.2,
          1.3,
          1.4,
          1.6,
          1.8,
          2,
          2.2,
          2.4,
          2.8,
          3,
          2.9,
          2.8,
          2.6,
          2.5,
          2.4,
          2.3
        ],
        "name": "turbine blade",
        "type": "lines + markers",
        "mode": "lines",
        "line": { "color": "rgba(93,235,246,0.8)" }
      }
    } else {
      let bladeLength = 83;
      var trace2X = [];
      trace2X.push(bladeLength, (bladeLength * 0.96), (bladeLength * 0.72), (bladeLength * 0.48), (bladeLength * 0.24), (bladeLength * 0.12), (bladeLength * 0.06), (bladeLength * 0.036), (bladeLength * 0.012), 0, (bladeLength * 0.012), (bladeLength * 0.024), (bladeLength * 0.036), (bladeLength * 0.048), (bladeLength * 0.06), (bladeLength * 0.12), (bladeLength * 0.24), (bladeLength * 0.36), (bladeLength * 0.48), (bladeLength * 0.60), (bladeLength * 0.72), (bladeLength * 0.843), (bladeLength * 0.904), (bladeLength * 0.928), (bladeLength * 0.940), (bladeLength * 0.964), (bladeLength * 0.976), (bladeLength * 0.988), (bladeLength));
      return {
        x: trace2X,
        y: [
          0.9,
          0.7,
          0.7,
          0.7,
          0.7,
          0.7,
          0.7,
          0.7,
          0.8,
          1,
          1.1,
          1.2,
          1.2,
          1.2,
          1.3,
          1.4,
          1.6,
          1.8,
          2,
          2.2,
          2.4,
          2.8,
          3,
          2.9,
          2.8,
          2.6,
          2.5,
          2.4,
          2.3
        ],
        name: "turbine blade",
        type: 'lines + markers',
        mode: 'lines',
        line: { color: 'rgba(93,235,246,0.8)' }
      }
    }
  }

  // this gives the vertical line on the blade erosion graph
  var spikeMode = {
    showspikes: true,
    spikedistance: -1,
    spikemode: 'across+toaxis',
    spikedash: 'solid',
    spikecolor: 'rgba(102, 102, 102, 1)',
    spikemode: 'across',
    spikesnap: 'cursor',
    showline: true,
    showgrid: true,
  };

  var hoverMode = {
    hovermode: 'x',
  };
  const yearsRange = {
    range: [0, 25]
  }
  // this is tro change the specific y value range for the revenue graph
  var rangeValue = {
    range: [700, 800]
  };

  // this toggles different atrributes within the Plotly graphs for each individual graph. 
  const [graphType, setGraphType] = useState();
  const [graphTitle, setGraphTitle] = useState();
  const [currentData, setCurrentData] = useState();
  const [xaxisTitle, setXaxisTitle] = useState();
  const [yaxisTitle, setYaxisTitle] = useState();
  const [staticInfo, setStaticInfo] = useState();
  const [yaxisRange, setYaxisRange] = useState();
  const [extraLayout, setExtraLayout] = useState();
  const [hoverLayout, setHoverLayout] = useState();

  // this is the selector for the graph data, it also sets all the attributes for the Plotly part.
  // if you want to add extra graphs and buttons later, copy and paste an extra button in the btton container <div> in the App
  // then change the setgraph type and add an extra else if clause below with the imported data and the plotly attributes set.
  useEffect(() => {
    if ("TURBINE_EROSION" === graphType) {
      setGraphTitle("Erosion of turbine over time");
      setCurrentData(erosionOverTime);
      setYaxisRange(yearsRange);
      setXaxisTitle('Total erosion length(m)');
      setYaxisTitle('Time (years)');
      setStaticInfo("This is a graph that shows the erosion of a wind turbine blade over time under average conditions.");
      setExtraLayout(spikeMode);
      setHoverLayout(hoverMode);
    } else if ("POWER_AGAINST_WINDSPEED" === graphType) {
      setGraphTitle("Erosion of a turbine blade over time");
      setCurrentData(powerCurve);
      setYaxisRange(null);
      setXaxisTitle('Windspeed [m/s]');
      setYaxisTitle('Generated power KW');
      setExtraLayout(spikeMode);
      setHoverLayout(hoverMode);
      setStaticInfo("This is a graph that shows the power output of a turbine blade against windspeed by comparing uneroded, current erosion levels and forecasted erosim after 12 months.");
    } else if ("AREA_RAINFALL" === graphType) {
      setGraphTitle("Rainfall levels across Glasgow");
      setCurrentData(heatMapData);
      setYaxisRange(null);
      setXaxisTitle('longitude');
      setYaxisTitle('latitude');
      setExtraLayout(null);
      setStaticInfo("This graphic shows the average rainfall in mm across the area of Greater Glasgow. The rainfall is distributed by geographical co-ordinates.")
    } else if ("REVENUE" === graphType) {
      setGraphTitle("Bar graph of changes to profit with different erosion conditions");
      setCurrentData(revenueDataJson);
      setXaxisTitle('State');
      setYaxisTitle('Profits (£1,000s)');
      setYaxisRange(rangeValue);
      setExtraLayout(null);
      setStaticInfo("needs more info");
    }
  }, [graphType])


  return (
    <div className="App">
      <head className="App-header">
        <script src="https://cdn.plot.ly/plotly-2.35.2.min.js" ></script>
      </head>

      <div class="buttonContainer">
        <button id="button1" type="button" className="button" onClick={() => setGraphType("TURBINE_EROSION")} >Blade erosion over time</button>
        <button type="button" className="button" onClick={() => setGraphType("POWER_AGAINST_WINDSPEED")}>Power against windspeed</button>
        <button type="button" className="button" onClick={() => setGraphType("AREA_RAINFALL")}>Area rainfall</button>
        <button type="button" className="button" onClick={() => setGraphType("REVENUE")}>Profit against turbine condition</button>

      </div>
      <div class="analysisContainer">
        <div class="staticInformationBox" >{staticInfo}</div>
        <div class="graphicBox">
          <div>
            {graphType && <Plot
              data={currentData} responsive={true}
              layout={{
                // you can alter these if you want to change to overall size of the graphs
                width: 900, height: 600, title: graphTitle,
                font: {
                  size: 14,
                  color: 'rgba(102, 102, 102, 1)'
                },
                hoverLayout,
                xaxis: {
                  title: { text: xaxisTitle },
                  font: {
                    size: 10
                  },
                  tickangle: 20,
                  ...extraLayout,
                },
                yaxis: {
                  title: { text: yaxisTitle },
                  font: {
                    size: 10
                  },
                  ...yaxisRange,
                },
              }}
            />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
