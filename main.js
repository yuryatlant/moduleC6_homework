const wsUri = "wss://echo-ws-service.herokuapp.com";
const output = document.getElementById("output");
const btnSend = document.querySelector('.j-btn-send');
const btnLocation = document.querySelector('.j-btn-location');

let websocket;

function writeToScreen(message) {
  let pre = document.createElement("p");
  pre.style.wordWrap = "break-word";
  pre.innerHTML = message;
  output.appendChild(pre);
}

function SendGeolocationScreen(link) {
  let pr = document.createElement("a");
  pr.setAttribute('href', link);
  pr.innerHTML = "Ссылка на карту";
  output.appendChild(pr);
  }


websocket = new WebSocket(wsUri);
websocket.onmessage = function(evt) {
    writeToScreen(
      '<span style="color: blue;">Сообщение от сервера: ' + evt.data+'</span>'
    );
  };

btnSend.addEventListener('click', () => {
  var message = document.querySelector('.label__input').value;
  writeToScreen("Сообщение отправителя " + message);
  websocket.send(message);
});

const error = () => {
  writeToScreen("Невозможно получить ваше местоположение");
}

const success = (position) => {
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  output.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  SendGeolocationScreen(output.href)
 };


btnLocation.addEventListener('click', () => {
  if (!navigator.geolocation) {
    writeToScreen("Геолокация не поддерживается вашим браузером");
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
});



