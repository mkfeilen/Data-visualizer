import Plot from 'react-plotly.js';
import './App.css';
import React, { useState, useEffect } from 'react';
import erosionOverTime from './data/erosionOverTime.json';
import powerAgainstWindspeedData from './data/powerAgainstWindspeed.js';
import mediaData from './data/mediaData.js';
import erosionData from './data/power_curve_data.json';
import rainfallData from './data/rainfallChart.js';

function App() {

  var data3= erosionOverTime.erosionLineData;
  var data4 =erosionData.erosionLineData;

  

  const [graphType, setGraphType] = useState();
  const [graphTitle, setGraphTitle] = useState();
  const [currentData, setCurrentData] = useState();
  const [lineColor,setLineColor] = useState();
  const [xaxisTitle, setXaxisTitle] = useState();
  const [yaxisTitle, setYaxisTitle] = useState();
  

  useEffect(() => {
    if ("POWER_AGAINST_WINDSPEED" === graphType) {
      setGraphTitle("Power Against Windspeed");
      setCurrentData(powerAgainstWindspeedData);
      setXaxisTitle('Windspeed [m/s]');
      setYaxisTitle('Generated power KW');
    } else if ("TURBINE_EROSION" === graphType) {
      setGraphTitle("Erosion of turbine over time");
      setCurrentData(data4);
      setXaxisTitle ('Windspeed [m/s]');
      setYaxisTitle ('Generated power KW');
    } else if ("AREA_RAINFALL" === graphType){
      setGraphTitle("Rainfall levels across Glasgow");
        setCurrentData(rainfallData);
        setXaxisTitle ('longitude');
      setYaxisTitle ('latitude');
    } else if ("OTHER" === graphType){
      setGraphTitle("table of different media audience sizes through time");
        setCurrentData(mediaData);
        setXaxisTitle ('Year');
      setYaxisTitle ('Audience share by %');
    }
  }, [graphType])


  return (
    <div className="App">
      <head className="App-header">
        <script src="https://cdn.plot.ly/plotly-2.35.2.min.js" ></script>
      </head>

      <div class="buttonContainer">
        <button id="button1" type="button" className="button" onClick={() => setGraphType("POWER_AGAINST_WINDSPEED")} >Power against windspeed</button>
        <button type="button" className="button"  onClick={() => setGraphType("TURBINE_EROSION")}>Turbine erosion over time</button>
        <button type="button" className="button" onClick={() => setGraphType("AREA_RAINFALL")}>Area rainfall</button>
        <button type="button" className="button" onClick={() => setGraphType("OTHER")}>other blade info graph</button>

      </div>
      <div class="staticInformationBox"></div>
      <div id="graphicBox"></div>
      <div>
        {graphType && <Plot
          data={currentData} responsive={true}
          layout={{ width: 1000, height: 500, title: graphTitle, 
            font: {
              size: 14,
              color: 'rgba(102, 102, 102, 1)'
            },   
            xaxis: {
              title: {text: xaxisTitle},
              font: {
                size: 12
              }
            },
            yaxis: {
              title: {text: yaxisTitle},
              font: {
                size: 12
              }
            },
           // trace1:{line: {color: lineColor}},    
          }}
        />}
      </div>

    </div>
  );
}

export default App;
