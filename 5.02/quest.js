function loadQuestions() {
  return [
      "Вопрос первый",
      "Вопрос второй",
      "Вопрос третий",
      "Вопрос четвертый"
  ];
}

async function generateTable(questions) {
  let res = '<table class="quest-table">';
  let n = 1;
  for (let quest of questions) {
      res += `<tr data-quest=${n}>
          <td>${n}. ${quest}</td>
          <td><input id="radio-quest-${n}1" name="radio-quest-${n}" value="negative" type="radio"><label for="radio-quest-${n}1">:(</label></td>
          <td><input id="radio-quest-${n}2" name="radio-quest-${n}" value="neutral" type="radio"><label for="radio-quest-${n}2">:|</label></td>
          <td><input id="radio-quest-${n}3" name="radio-quest-${n}" value="positive" type="radio"><label for="radio-quest-${n}3">:)</label></td>
          <tr>`;
      n += 1;
  }
  res += "</table><button onclick='doneClick()'>Готово</button>";
  return res;
}

document.addEventListener('DOMContentLoaded', function () {
  generateTable(loadQuestions())
      .then(html => document.getElementById("table-container").innerHTML = html);
});

function doneClick() {
  const questElements = document.querySelectorAll('[data-quest]');
  let results = [];
  let missed = [];
  for (let quest of questElements) {
      let n = quest.getAttribute('data-quest');
      let name = `radio-quest-${n}`;
      let radio = quest.querySelector(`input[name = "${name}"]:checked`);
      //console.log(radio);
      if(radio == null){
          missed.push(n);
      }
      // results.push({
      //     "question" : n,
      //     "answer": radio.value
      // });
  }
  if(missed.length > 0){
      let stringMissed = "";
      for(let n of missed)
          stringMissed += `${n} `
      alert('Вы забыли дать ответ на вопрос; ' + stringMissed);
  }
  //console.log(results);
}

//alert('Вы забыли дать ответ на вопрос №' + n);
