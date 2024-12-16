function createTurbineErosionGraph(erosionData) {
  let bladeLength = 83;
  if ("blade_length" in erosionData) {
    bladeLength = erosionData["blade_length"];
  }

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

export default createTurbineErosionGraph;