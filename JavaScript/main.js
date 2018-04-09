const filterNameData = e => {
  let inputNameData = e.target.value;
  let inputLength = e.target.value.length;
  console.log("value", inputNameData);
};

function request(config) {
  let httpRequest = new XMLHttpRequest();
  httpRequest.addEventListener("load", config.onLoad);
  httpRequest.addEventListener("error", config.onError);
  httpRequest.open(config.httpMethod, config.address);
  httpRequest.send();
}

function checkForUser(e) {
  let name = e.target.value;

  var requestConfig = {
    httpMethod: "GET",
    address: `https://teamtreehouse.com/${name}.json`,
    onLoad: response => {
      if (response.currentTarget.response !== "Not found") {
        buildUser(JSON.parse(response.currentTarget.responseText), e.target.id);
      }
      //show player not found div
    },
    onError: printErrorToDom
  };

  request(requestConfig);
}

function buildUser(player, inputId) {
  if (player) {
    setProfilePicture(`${inputId}-image`, player.gravatar_url);
  }
}

function setProfilePicture(containerId, photoUrl) {
  console.log(containerId, photoUrl);
  let image = document.getElementById(containerId);
  image.src = photoUrl;
}

function printErrorToDom(error) {
  console.log("there is an error:", error);
}

function getElementsById(arrayOfElementsIds) {
  let elements = [];
  for (let i = 0; i < arrayOfElementsIds.length; i++) {
    let currentElement = document.getElementById(arrayOfElementsIds[i]);
    elements.push(currentElement);
  }

  return elements;
}

//Entry point for my application.
function startApplication() {
  let inputFields = getElementsById(["first-player", "second-player"]);

  inputFields.forEach(field => {
    field.addEventListener("keyup", checkForUser);
  });
}

startApplication();
