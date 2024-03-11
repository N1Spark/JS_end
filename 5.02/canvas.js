document.addEventListener('DOMContentLoaded', () => {
  const figure = document.getElementById("figure");
  if (!figure) throw "Element '#figure' not found";
  const context = figure.getContext('2d');
  window.gdc = context;

  const line1Button = document.getElementById('line-1-button');
  if (!figure) throw "Element '#line-1-button' not found";
  line1Button.onclick = drawLine1;

  const line2Button = document.getElementById('line-2-button');
  if (!figure) throw "Element '#line-2-button' not found";
  line2Button.onclick = drawLine2;

  const expandButton = document.getElementById("expand-button");
  if (!expandButton) throw "Element '#expand-button' not found";
  expandButton.onclick = expand;

  const resoluteButton = document.getElementById("resolution-button");
  if (!resoluteButton) throw "Element '#resolution-button' not found";
  resoluteButton.onclick = resolute;

  const cosinusButton = document.getElementById("cos-button");
  if (!cosinusButton) throw "Element '#cos-button' not found";
  cosinusButton.onclick = drawCos;
});

function drawCos() {
  const w = 2;
  window.gdc.beginPath();
  const color = document.getElementById('Cos-color-input');
  if (!color) throw "Element '#Cos-color-input' not found";
  window.gdc.strokeStyle = color.value;
  window.gdc.lineWidth = w;
  window.gdc.moveTo(0, 75 - 75 * Math.cos(0 - 150) / 10);
  for (let i = 0; i < 300; i += w) {
      window.gdc.lineTo(i, 75 - 60 * Math.cos((i - 150) / 10));
  }
  window.gdc.stroke();
  window.gdc.beginPath();
  window.gdc.strokeStyle = "#444";
  window.gdc.lineWidth = w;
  window.gdc.stroke()
}

function resolute() {
  window.figure.width = "600";
  window.figure.height = "300";
}

function expand() {
  window.figure.style.width = "600px";
  window.figure.style.height = "300px";
}

function drawLine1() {
  window.gdc.beginPath();
  const color = document.getElementById('X-color-input');
  if (!color) throw "Element '#X-color-input' not found";
  window.gdc.strokeStyle = color.value;
  window.gdc.lineWidth = 2;
  window.gdc.moveTo(0, 75);
  window.gdc.lineTo(300, 75);
  window.gdc.stroke();
}

function drawLine2() {
  window.gdc.beginPath();
  const color = document.getElementById('Y-color-input');
  if (!color) throw "Element '#Y-color-input' not found";
  window.gdc.strokeStyle = color.value;
  window.gdc.lineWidth = 2;
  window.gdc.moveTo(150, 0);
  window.gdc.lineTo(150, 150);
  window.gdc.stroke();
}

function CheckColor(colorInput) {
  var colorCheck = document.createElement("div");
  colorCheck.style.color = colorInput;
  return colorCheck.style.color === colorInput;
}

document.addEventListener('DOMContentLoaded', () => {
  loadAssets();
  window.location.hash = "";
  window.onhashchange = coinChanged;
  $("#clear-rates").click(clearRates);
  let canvas = $("#rates-canvas")[0];
  window.dcW = canvas.clientWidth;
  window.dcH = canvas.clientHeight;
  canvas.width = dcW;
  canvas.height = dcH;
  window.dc = canvas.getContext('2d');
});

function clearRates() {
  window.dc.clearRect(0, 0, window.dcW, window.dcH);
  window.location.hash = "";
}

function coinChanged() {
  //console.log(document.location.hash);
  loadHistory(document.location.hash.substring(1));
}

function loadHistory(assetId) {
  const linkElement = document.querySelector(`a[href="#${assetId}"]`);
  let r = Math.floor(150 * Math.random());
  let g = Math.floor(150 * Math.random());
  let b = Math.floor(150 * Math.random());
  let a = 0.6;
  $.ajax({
      method: "GET",
      url: `https://api.coincap.io/v2/assets/${assetId}/history?interval=d1`,
  })
      .done(j => {
          linkElement.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a})`;
          //console.log(j);
          let minRate = Number(j.data[0].priceUsd);
          let maxRate = Number(j.data[0].priceUsd);
          let minTime = j.data[0].time;
          let maxTime = j.data[0].time;
          let timestamp = j.timestamp;
          let date = new Date(timestamp);
          let curDate = "";
          if (date.getDate() < 10)
              curDate += "0";
          curDate += date.getDate() + ".";
          if (date.getMonth() < 10)
              curDate += "0";
          curDate += date.getMonth() + "." + date.getFullYear();
          let prevDate = "";
          if (date.getDate() < 10)
              prevDate += "0";
          prevDate += date.getDate() + ".";
          if (date.getMonth() < 10)
              prevDate += "0";
          prevDate += date.getMonth() + "." + (date.getFullYear() - 1);
          for (let rec of j.data) {
              let rate = Number(rec.priceUsd)
              if (rate > maxRate) maxRate = rate;
              if (rate < minRate) minRate = rate;
              if (rec.time > maxTime) maxTime = rec.time;
              if (rec.time < minTime) minTime = rec.time;
          }
          clearRates();
          const dc = document.getElementById("rates-canvas").getContext('2d');
          dc.beginPath();
          dc.lineWidth = 1;
          dc.strokeStyle = `rgba(${r},${g},${b},${a})`;
          for (let rec of j.data) {
              let rate = Number(rec.priceUsd);
              let x = (rec.time - minTime) * window.dcW / (maxTime - minTime);
              let y = window.dcH - 10 - (rate - minRate) * (window.dcH - 20) / (maxRate - minRate);
              dc.lineTo(x, y)
          }
          dc.stroke();
          a = 0.15;
          dc.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
          dc.lineTo(window.dcW, window.dcH);
          dc.lineTo(0, window.dcH);
          dc.fill();
          dc.fillStyle = "#000"
          dc.fillText(Math.round(maxRate) + " $", window.dcW - 50, 25);
          dc.fillText(Math.round(minRate) + " $", window.dcW - 50, window.dcH - 20);
          dc.fillText(curDate, window.dcW - 55, window.dcH - 5);
          dc.fillText(prevDate, 5, window.dcH - 5);
      });

}

function loadAssets() {
  $.ajax({
      method: "GET",
      url: "https://api.coincap.io/v2/assets?limit=7",
  })
      .done(j => {
          //  console.log(j);
          let html = "";
          for (let asset of j.data) {
              html += `<a href="#${asset.id}" class="btn btn-flat rate-button">${asset.name}</a>`;
          }
          document.getElementById("assets-block").innerHTML = html;
      });
}

///////////////////////////////// STORAGE ////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
  $("#local-button").click(localButtonClick);
  $("#session-button").click(sessionButtonClick);
  window.timedrop = document.getElementById('session-timer');
  let saved = localStorage.getItem("saved");

  if (saved) {
      $("#local-input").val(saved)
  }
  $("#local-delete").click(_ => {
      localStorage.removeItem("saved");
      $("#local-input").val("")
  });
  $("#session-delete").click(_ => {
      sessionStorage.removeItem("saved");
      $("#session-input").val("")
  });
  setInterval(timerTick, 1000);
});

function localButtonClick() {
  localStorage.setItem(
      "saved",
      $("#local-input").val()
  );
  localStorage.setItem(
      "moment",
      new Date()
  );
}

function sessionButtonClick() {
  sessionStorage.setItem("saved", $("#session-input").val());
  sessionStorage.setItem(
      "moment",
      new Date()
  );
}

function timerTick() {
  var currentTime = new Date();
  var timeValue = window.timedrop.value;
  let savedMoment = localStorage.getItem("moment");
  let sessionMoment = sessionStorage.getItem("moment");
  if (savedMoment) {
      let moment = new Date(localStorage.getItem("moment"));
      let period = (new Date().getTime() - moment.getTime()) / 1000;
      $("#local-period").text(Math.round(period));
      const currentHourMinute = currentTime.getHours() * 60 + currentTime.getMinutes();
      const inputHourMinute = parseInt(timeValue.split(':')[0]) * 60 + parseInt(timeValue.split(':')[1]);
      if (currentHourMinute >= inputHourMinute) {
          localStorage.removeItem("saved");
          localStorage.removeItem("moment");
          localButtonClick();
          period = 0;
          window.timedrop.value = null;
      }
  }
  else{
      $("#local-period").text("---");
  }
  if (sessionMoment) {
      let moment = new Date(sessionStorage.getItem("moment"));
      let period = (new Date().getTime() - moment.getTime()) / 1000;
      //console.log(moment);
      $("#session-period").text(Math.round(period));
      const currentHourMinute = currentTime.getHours() * 60 + currentTime.getMinutes();
      const inputHourMinute = parseInt(timeValue.split(':')[0]) * 60 + parseInt(timeValue.split(':')[1]);
      if (currentHourMinute >= inputHourMinute) {
          sessionStorage.removeItem("saved");
          sessionStorage.removeItem("moment");
          sessionButtonClick();
          period = 0;
          window.timedrop.value = null;
      }
  }
  else {
      $("#session-period").text("---");
  }
}