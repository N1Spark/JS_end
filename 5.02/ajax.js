Number.prototype.localeCompare = function (other) {
  const self = this.valueOf();
  if (self < other) return -1;
  if (self > other) return 1;
  return 0;
}
window.ascSymbol = "▾";
window.descSymbol = "▴";
window.sortMode = "none";

document.addEventListener('DOMContentLoaded', () => {
  const loadRatesButton = document.getElementById("load-rates-button");
  if (!loadRatesButton) {
    throw "Element #load-rates-button not found";
  }
  const loadRatesDate = document.getElementById("load-rates-date");
  if (!loadRatesDate) {
    throw "Element #load-rates-date not found";
  }
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();
  let end = yyyy + '-' + mm + '-' + dd;
  loadRatesDate.value = end;
  loadRatesButton.addEventListener('click', loadRatesButtonClick);
});

function loadRatesButtonClick() {
  const loadRatesDate = document.getElementById("load-rates-date");
  if (!loadRatesDate) {
    throw "Element #load-rates-date not found";
  }
  let date = loadRatesDate.value;
  date = date.replace(/-/g, '');
  const url = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${date}&json`;

  fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Connection': 'close'
    },
  })
    .then(r => {
      //console.log(r);
      //outBlock.innerHTML = `status-code: <b>${r.status}</b><br/>ok: <b>${r.ok}</b><br/>`;
      if (r.status != 200)
        alert('fetch error: status ' + r.status);
      else {
        r.json()
          .then(j => {
            window.rates = j;
            showTable();
          });
      }
    })
    .catch(reason => {
      alert('fetch error: status ' + reason);
    });

}

function showTable() {
  if (typeof window.rates == 'undefined')
    throw "showTable() calls with empty 'window.rates'";
  const outBlock = document.getElementById("out-block");
  if (!outBlock)
    throw "Element #out-block not found";
  const r030Symbol = window.sortMode == "r030Asc" ? window.descSymbol : window.ascSymbol;
  const ccSymbol = window.sortMode == "ccAsc" ? window.descSymbol : window.ascSymbol;
  const txtSymbol = window.sortMode == "txtAsc" ? window.descSymbol : window.ascSymbol;
  const rateSymbol = window.sortMode == "rateAsc" ? window.descSymbol : window.ascSymbol;
  let table = `<table class='rates-table'><tr>
  <th>Код<b data-sort='r030'>${r030Symbol}</b></th>
  <th>Валюта<b data-sort='cc'>${ccSymbol}</b></th>
  <th>Назва <b data-sort='txt'>${txtSymbol}</b></th>
  <th>Курс <b data-sort='rate'>${rateSymbol}</b></th>
  <th>Дата</th></tr>`;
  for (let rate of window.rates) {
    table += `<tr><td>${rate.r030}</td><td>${rate.cc}</td><td>${rate.txt}</td><td>${rate.rate}</td><td>${rate.exchangedate}</td></tr>`;
  }
  table += "</table>";
  outBlock.innerHTML = table;
  addSortListeners();
}

function addSortListeners() {
  for (let b of document.querySelectorAll("[data-sort]")) {
    b.addEventListener('click', sortClick);
  }
}

function sortClick(e) {
  if (typeof window.rates == 'undefined')
    throw "sortClick() calls with empty 'window.rates'";
  const sortField = e.target.getAttribute("data-sort");
  console.log(`Sorted by '${sortField}'`);
  let suffix;
  if (window.sortMode == `${sortField}Asc`) {
    window.rates.sort((b, a) => a[sortField].localeCompare(b[sortField]));
    suffix = "Desc";
  }
  else {
    window.rates.sort((a, b) => a[sortField].localeCompare(b[sortField]));
    suffix = "Asc";
  }
  window.sortMode = `${sortField}${suffix}`;
  showTable();
}

// &#x25B2; ▲

// &#x25B4; ▴

// &#x25BC; ▼

// &#x25BE; ▾