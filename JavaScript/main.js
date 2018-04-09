function request(config) {
  let httpRequest = new XMLHttpRequest();
  httpRequest.addEventListener("load", config.onLoad);
  httpRequest.addEventListener("error", config.onError);
  httpRequest.open(config.httpMethod, config.address);
  httpRequest.send();
}

function printErrorToDom(error) {
  console.log("there is an error:", error);
}

//Entry point for my application.
function startApplication(response) {
  let responseText = JSON.parse(response.currentTarget.responseText);
  console.log("the responseText", responseText);
}
// like planet variable
var requestConfig = {
  httpMethod: "GET",
  address: "https://teamtreehouse.com/krissycaron.json",
  onLoad: startApplication,
  onError: printErrorToDom
};

request(requestConfig);
