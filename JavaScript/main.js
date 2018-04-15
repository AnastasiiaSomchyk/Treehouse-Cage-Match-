
let player1Data;
let player2Data;

function getElementsById(arrayOfElementsIds) {
  let elements = [];
  for (let i = 0; i < arrayOfElementsIds.length; i++) {
    let currentElement = document.getElementById(arrayOfElementsIds[i]);
    elements.push(currentElement);
  }
  return elements;
}

function savePlayer(playerNumber, playerData){
  if(playerNumber === "1"){
    player1Data = playerData
  }

  if(playerNumber === "2"){
    player2Data = playerData
  }
}

function buildUserProfile(e, containerIds){
  console.log(e)
  if(e.currentTarget.response !== "Not found"){
    let treeHouseUser = JSON.parse(e.currentTarget.response)
    console.log("treeHouseUser: ", treeHouseUser, '\ncontainerIds: ', containerIds)

      let playerNumber = containerIds.playerNumber
      let imageContainer = document.getElementById(containerIds.imageContainerId);
      let scoreContainer = document.getElementById(containerIds.scoreContainerId);
      
      savePlayer(playerNumber, treeHouseUser)
      scoreContainer.innerHTML = treeHouseUser.points.total
      imageContainer.src = treeHouseUser.gravatar_url
     
  }
}


function request(config) {
  let httpRequest = new XMLHttpRequest();
  httpRequest.addEventListener("load", config.onLoad);
  httpRequest.addEventListener("error", config.onError);
  httpRequest.open(config.httpMethod, config.address);
  httpRequest.send();
}

function printErrorToConsole(error) {
  console.log("there is an error:", error);
}



function findUser(e) {
  let name = e.target.value;
  let containerIds = e.target.dataset;


  if(name){
    var requestConfig = {
      httpMethod: "GET",
      address: `https://teamtreehouse.com/${name}.json`,
      onLoad: (e)=>{
        buildUserProfile(e, containerIds)
      },
      onError: printErrorToConsole
    };

    request(requestConfig);
  } 
}



function analyzeScore(){
  
  let winnerContainer = document.getElementById("winner");
  let player1Score = player1Data.points.total
  let player2Score = player2Data.points.total
  if(player1Score > player2Score){
    winnerContainer.innerHTML = `${player1Data.name} WINS`
  }

  if(player1Score < player2Score){
    winnerContainer.innerHTML = `${player2Data.name} WINS`
  }

  if(player1Score === player2Score){
    winnerContainer.innerHTML = `It's a tie!`
  }

}


function addListenerForName(inputs){
  inputs.forEach((element) => {
    element.addEventListener("keyup", findUser)
  })
}

//Entry point for my application.
function startApplication() {
  let inputs = getElementsById([`player-1-input`, `player-2-input`])
  addListenerForName(inputs)

  let startMatchButton = document.getElementById("start-cage-match");
  startMatchButton.addEventListener("click", analyzeScore)

}





startApplication();
