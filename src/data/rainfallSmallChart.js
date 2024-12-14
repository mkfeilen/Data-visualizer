// if you have a larger data set with a lot of points this is the format of data you might want to use. 

var xData = [0, 1, 2, 3, 4]
var yData = [0, 1, 2, 3, 4];

var rainfall = [
    [4, 3, 3, 4, 5 ],
    [4, 3, 2, 4, 5],
    [4, 2, 2, 1, 4],
    [4, 3, 5, 5, 5],
    [4, 3, 4, 5, 5],
   

];


// a simpler way of adding in the scatter point colours, with an array. Each can be linked to the position within the array of the x/y data sets. 
var colours = ['rgba(0,0,0,0.8)','rgba(210,245,248,0.8)', 'rgba(93,235,246,0.8)', 'rgba(9,151,248, 0.8)', 'rgba(9,71,248,0.8)', 'rgba(7,9,219, 0.8)'];

var coordinatesData2 = [];

// this loops through the x/y coordinates and adds in the colours to define each scatterpoint.
for (var i = 0; i < xData.length; i++) {
   for (var j = 0; j < yData.length; j++) {
        //   let currentPoint = xData[i].yData[j];
        var rainfallCurrentPoint = rainfall[i][j];
        var result = {
            x: xData[i],
            y: yData[j],
           type: 'markers',
            mode: 'markers',
            marker: {
                color: colours[rainfallCurrentPoint],
                size: 4
            }
        };
       
       coordinatesData2.push(result);

   };

};

export default coordinatesData2;