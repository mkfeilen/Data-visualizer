import Plot from 'react-plotly.js';
import './App.css';
import React, { useState, useEffect } from 'react';
import erosionOfBlade from './data/erosionOfBlade.json';
import powerCurveData from './data/power_curve_data.json';
// this data is made up as an example of what this type of graph could look like, please insert real data
import heatMapData from './data/rainfallHeatMap.js';
import revenueFile from './data/revenue.json';
import createTurbineErosionGraph from './components/createTurbineErosionGraph.js';
import checkingYaxisRange from './components/checkingYaxisRange.js';
import staticInformationFunction from  './components/StaticInformation.js';

function App() {

  var powerCurve = powerCurveData.powerCurveData;
  var revenueDataJson = revenueFile.revenue;
  var revenueRangeData = checkingYaxisRange(revenueDataJson);

  // all the variable for the erosion of blade against time graph
  var trace1 = erosionOfBlade.erosionLineData;
  var erosionData = erosionOfBlade.erosionLineData;
  var erosionOverTime = [];
  erosionOverTime.push(trace1, createTurbineErosionGraph(erosionData));
  // this is set to a constant as we will keep the range of years for the erosion blade information the same
  const yearsRange = {
    range: [0, 25]
  }

  // this gives attributes to plotly js for the vertical line on the blade erosion graph
  var spikeMode = {
    showspikes: true,
    spikedistance: -1,
    spikemode: 'across+toaxis',
    spikedash: 'solid',
    spikecolor: 'rgba(102, 102, 102, 1)',
    spikesnap: 'cursor',
    showline: true,
    showgrid: true,
  };

  var hoverMode = {
    hovermode: 'x',
  };

  // these useStates toggle different atrributes within the Plotly graph software for each individual graph. 
  const [graphType, setGraphType] = useState();
  const [graphTitle, setGraphTitle] = useState();
  const [currentData, setCurrentData] = useState();
  const [xaxisTitle, setXaxisTitle] = useState();
  const [yaxisTitle, setYaxisTitle] = useState();
  const [staticInfo, setStaticInfo] = useState();
  const [yaxisRange, setYaxisRange] = useState();
  const [extraLayout, setExtraLayout] = useState();
  const [hoverLayout, setHoverLayout] = useState();
  

  // this is the selector for the graph data, it also sets all the attributes for calling Plotly graphs.
  // if you want to add extra graphs and buttons later, copy and paste an extra button in the btton container <div> in the App
  // then change the setgraph type and add an extra else if clause below with the imported data and the plotly attributes set.
  useEffect(() => {
    if ("TURBINE_EROSION" === graphType) {
      setGraphTitle("Erosion of turbine over time");
      setCurrentData(erosionOverTime);
      setYaxisRange(yearsRange);
      setXaxisTitle('Total erosion length(m)');
      setYaxisTitle('Time (years)');
      setStaticInfo(staticInformationFunction(erosionData));
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
      setStaticInfo(staticInformationFunction(powerCurve[0]));
    } else if ("AREA_RAINFALL" === graphType) {
      setGraphTitle("Rainfall levels across Glasgow");
      setCurrentData(heatMapData);
      setYaxisRange(null);
      setXaxisTitle('longitude');
      setYaxisTitle('latitude');
      setExtraLayout(null);
      setStaticInfo(staticInformationFunction(heatMapData[0]))
    } else if ("REVENUE" === graphType) {
      setGraphTitle("Bar graph of changes to profit with different erosion conditions");
      setCurrentData([revenueDataJson]);
      setXaxisTitle('State');
      setYaxisTitle('Profits (£1,000s)');
      setYaxisRange(revenueRangeData);
      setExtraLayout(null);
      setStaticInfo(staticInformationFunction(revenueDataJson));
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
                  range: yaxisRange
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
