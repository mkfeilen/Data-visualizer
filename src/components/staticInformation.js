function staticInformationFunction(analyticalData) {
    let staticInformation = "";
    if ("static_information" in analyticalData) {
        staticInformation = analyticalData["static_information"];
    } 
    return staticInformation;


}

export default staticInformationFunction;