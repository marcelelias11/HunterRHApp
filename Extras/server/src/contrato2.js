let contratojsonarr = JSON.parse(sessionStorage.getItem("contrato"));
let valueimposto = sessionStorage.getItem("imposto");

function valortotalsum() {
  let sum = 0;
  for (const key in contratojsonarr) {
    sum +=
      Number(contratojsonarr[key][1].info) *
      Number(contratojsonarr[key][2].info);
  }
  return sum;
}

let ttext = "";

ttext += '<tr class = "linha0">';
ttext += `<td>Nome da Vaga</td>`;
ttext += `<td>Qtde.</td>`;
ttext += `<td>Valor (R$)</td>`;
ttext += "</tr>";

for (const key in contratojsonarr) {
  ttext += "<tr>";
  for (let i = 0; i < contratojsonarr[key].length; i++) {
    ttext += `<td>${contratojsonarr[key][i].info.replace(".", ",")}</td>`;
  }
  ttext += "</tr>";
  document.getElementById("valorminimo").innerText += `R$${contratojsonarr[
    key
  ][2].info.replace(".", ",")}; `;
}

ttext += "<tr>";
ttext += `<td>Imposto</td>`;
ttext += `<td>${String(valueimposto * 100).replace(".", ",")}%</td>`;
ttext += `<td>${String(valortotalsum() * valueimposto).replace(".", ",")}</td>`;
ttext += "</tr>";

ttext += '<tr class = "linha0">';
ttext += `<td>TOTAL</td>`;
ttext += `<td>-</td>`;
ttext += `<td>${String(
  valortotalsum() + valortotalsum() * valueimposto
).replace(".", ",")}</td>`;
ttext += "</tr>";
document.getElementById("tablecargo").innerHTML += ttext;

document
  .getElementById("assinatura")
  .setAttribute(
    "src",
    `data:image/png;base64, ${sessionStorage.getItem("assinatura")}`
  );
