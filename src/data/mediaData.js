// if you have a larger data set with a lot of line graphs this is the format of data you might want to use. 
// it means you don't have to have loads of separate variables for each line trace. 

var xData = [
    [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2013],
    [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2013],
    [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2013],
    [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2013]
];

var yData = [
    [74, 82, 80, 74, 73, 72, 74, 70, 70, 66, 66, 69],
    [45, 42, 50, 46, 36, 36, 34, 35, 32, 31, 31, 28],
    [13, 14, 20, 24, 20, 24, 24, 40, 35, 41, 43, 50],
    [18, 21, 18, 21, 16, 14, 13, 18, 17, 16, 19, 23]
];

// a simpler way of adding in the line colours, with an object, each can be linked to the position within the objects of the x/y data sets. 
var colors = ['rgba(67,67,67,1)', 'rgba(115,115,115,1)', 'rgba(49,130,189, 1)',
    'rgba(189,189,189,1)'];

var lineSize = [2, 2, 4, 2];

var labels = ['Television', 'Newspaper', 'Internet', 'Radio'];

var mediaData = [];

// this loops through the data sets and adds in the colours to define each line
for (var i = 0; i < xData.length; i++) {
    var result = {
        x: xData[i],
        y: yData[i],
        type: 'lines + markers',
        mode: 'lines',
        name: labels[i],
        line: {
            color: colors[i],
            width: lineSize[i],
        },
    };

    // the scatter points in this graph have been done with separate first and last points, but you could do it for every point as above if you prefer.
    var result2 = {
        x: [xData[i][0], xData[i][11]],
        y: [yData[i][0], yData[i][11]],
        type: 'scatter',
        mode: 'markers',
        marker: {
            color: colors[i],
            size: 12
        },
        showlegend: false,
    };
    mediaData.push(result, result2);
}

export default mediaData;