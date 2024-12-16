function checkingYaxisRange(rangeData) {
   let yaxisRange = 'auto';
    if ("yaxisRange" in rangeData) {
       yaxisRange = rangeData["yaxisRange"];
    }
    return yaxisRange;
    
}

export default checkingYaxisRange;