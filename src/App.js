import Plot from 'react-plotly.js';
import './App.css';
import React, { useState, useEffect } from 'react';
import erosionOfBlade from './data/erosionOfBlade.json';
import powerCurveData from './data/power_curve_data.json';

// this data is made up as an example of what this type of graph could look like, please insert real data or you can remove this graph entirely
import heatMapData from './data/rainfallHeatMap.js';
import revenueFile from './data/revenue.json';
import createTurbineErosionGraph from './components/createTurbineErosionGraph.js';
import checkingYaxisRange from './components/checkingYaxisRange.js';
import staticInformationFunction from './components/StaticInformation.js';

function App() {

  // this gives attributes to plotly js for the vertical line 
  var spikeMode = {
    showspikes: true,
    spikemode: 'toaxis+across',
    spikedash: 'solid',
    spikecolor: 'rgba(102, 102, 102, 1)',
    spikesnap: "cursor",
    showline: true,
    showgrid: true,
    
  };

  var hoverMode = {
    hovermode: 'x',
    showlegend: true,
    hovertemplate:' Erosion length: %{x} <br> Years: %{y} <extra></extra>'
  };

  var hoverMode2 = {
    hovermode: 'x unified',
    showlegend: true    
  };

  // these useStates toggle different attributes within the Plotly graph software for each individual graph. 
  const [graphType, setGraphType] = useState();
  const [graphTitle, setGraphTitle] = useState();
  const [currentData, setCurrentData] = useState();
  const [xaxisTitle, setXaxisTitle] = useState();
  const [yaxisTitle, setYaxisTitle] = useState();
  const [staticInfo, setStaticInfo] = useState();
  const [yaxisRange, setYaxisRange] = useState();
  const [extraLayout, setExtraLayout] = useState();
  const [hoverLayout, setHoverLayout] = useState();
  const [xtickAngle, setXtickAngle] = useState();
  const [ytickAngle, setYtickAngle] = useState();

  // this is the selector for the graph data, it also sets all the attributes for calling Plotly graphs.
  // if you want to add extra graphs and buttons later, copy and paste an extra button in the btton container <div> in the App
  // then change the setgraph type and add an extra else if clause below with the imported data and the plotly attributes set.
  useEffect(() => {
    if ("TURBINE_EROSION" === graphType) {
      var trace1 = erosionOfBlade.erosionLineData;
      var erosionData = erosionOfBlade.erosionLineData;
      var erosionOverTime = [];
      erosionOverTime.push(trace1, createTurbineErosionGraph(erosionData));
     
      setGraphTitle("Erosion of turbine over time");
      setCurrentData(erosionOverTime);
       // this is set to a constant as we will keep the range of years for the erosion blade information the same. 
      setYaxisRange([0, 25]);
      setXaxisTitle('Total erosion length(m)');
      setYaxisTitle('Time (years)');
      setStaticInfo(staticInformationFunction(erosionData));
      setExtraLayout(spikeMode);
      setHoverLayout(hoverMode);
      setXtickAngle(null);
      setYtickAngle(null);
    } else if ("POWER_AGAINST_WINDSPEED" === graphType) {
      var powerCurve = powerCurveData.powerCurveData;
      setGraphTitle("Erosion of a turbine blade over time");
      setCurrentData(powerCurve);
      setYaxisRange([0, 3000]);
      setXaxisTitle('Windspeed [m/s]');
      setYaxisTitle('Generated power KW');
      setExtraLayout(spikeMode);
      setHoverLayout(hoverMode2);
      setStaticInfo(staticInformationFunction(powerCurve[0]));
      setXtickAngle(null);
      setYtickAngle(null);
    } else if ("AREA_RAINFALL" === graphType) {
      setGraphTitle("Rainfall levels across Glasgow");
      setCurrentData(heatMapData);
      setYaxisRange(null);
      setXaxisTitle('longitude');
      setYaxisTitle('latitude');
      setExtraLayout(null);
      setHoverLayout(null);
      setStaticInfo(staticInformationFunction(heatMapData[0]));
      setXtickAngle(20);
      setYtickAngle(70);
    } else if ("REVENUE" === graphType) {
      let revenueDataJson = revenueFile.revenue;
      let revenueRangeData = checkingYaxisRange(revenueDataJson);
      setGraphTitle("Bar graph of changes to profit with different erosion conditions");
      setCurrentData([revenueDataJson]);
      setXaxisTitle('State');
      setYaxisTitle('Profits (£1,000s)');
      setYaxisRange(revenueRangeData);
      setExtraLayout(null);
      setHoverLayout(null);
      setStaticInfo(staticInformationFunction(revenueDataJson));
      setXtickAngle(null);
      setYtickAngle(null);
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
                width: 1000, height: 600, title: graphTitle,
                font: {
                  size: 14,
                  color: 'rgba(102, 102, 102, 1)'
                },
                ...hoverLayout,
                xaxis: {
                  title: { text: xaxisTitle },
                  font: {
                    size: 10
                  },
                  tickangle: xtickAngle,
                  ...extraLayout,
                  autorange: true
                },
                yaxis: {
                  title: { text: yaxisTitle },
                  font: {
                    size: 10
                  },
                  range: yaxisRange,
                  tickangle: ytickAngle,
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
