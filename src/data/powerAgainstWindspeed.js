// this is the most basic way of adding in a line graph. If you want to have a single line the type must be line +marker otherwise it can be scatter.
//colours and names are easier to control and edit in this format rather than the json
var  trace1 = {
    x: [1, 2, 3, 4],
    y: [10, 15, 13, 17],
    type: 'line + marker',
    line: {color: 'rgb(19,81,145)'},
    marker: {color: 'rgb(19,81,145)'} ,
    name: 'turbine 123'
  };

 var trace2 = {
    x: [1, 2, 3, 4],
    y: [16, 5, 11, 9],
    type: 'line + marker',
    line: {color: 'rgb(176,232,17)'},
    marker: {color: 'rgb(176,232,17)'} ,
    name: 'turbine 456'
  };

 var powerAgainstWindspeedData = [trace1, trace2];



export default powerAgainstWindspeedData;