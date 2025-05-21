let counter = Number(sessionStorage.getItem("FPVcounter")) || 0;
document.getElementById("fpvdate").innerHTML +=
  " " +
  ("0" + new Date().getDate()).slice(-2) +
  "/" +
  ("0" + (new Date().getMonth() + 1)).slice(-2) +
  "/" +
  new Date().getFullYear();
let cadastrojsonarr = JSON.parse(sessionStorage.getItem("cadastro"));
let contratojsonarr = JSON.parse(sessionStorage.getItem("contrato"))[
  `contrato${counter}`
];
let FPVjsonarr = JSON.parse(sessionStorage.getItem("FPVs"))[`FPV${counter}`];
let cadastroarr = [
  cadastrojsonarr.find((p) => p.title == "Empresa"),
  cadastrojsonarr.find((p) => p.title == "Razão Social"),
  cadastrojsonarr.find((p) => p.title == "CNPJ"),
  cadastrojsonarr.find((p) => p.title == "Endereço"),
  cadastrojsonarr.find((p) => p.title == "Responsável legal"),
  cadastrojsonarr.find((p) => p.title == "E-mail"),
  cadastrojsonarr.find((p) => p.title == "Telefone"),
];
let cadastrotable = "";
for (let i = 0; i < cadastroarr.length; i++) {
  cadastrotable += "<tr>";
  cadastrotable += `<td>${cadastrojsonarr[i].title}</td>`;
  cadastrotable += `<td>${cadastrojsonarr[i].info}</td>`;
  cadastrotable += "</tr>";
}
let FPVtable = "";
for (let i = 0; i < 2; i++) {
  FPVtable += "<tr>";
  FPVtable += `<td>${contratojsonarr[i].title}</td>`;
  FPVtable += `<td>${contratojsonarr[i].info}</td>`;
  FPVtable += "</tr>";
}
for (let i = 0; i < FPVjsonarr.length; i++) {
  FPVtable += "<tr>";
  FPVtable += `<td>${FPVjsonarr[i].title}</td>`;
  FPVtable += `<td>${FPVjsonarr[i].info}</td>`;
  FPVtable += "</tr>";
}
document.getElementById("FPVEmpresa").innerHTML += cadastrotable;
document.getElementById("FPVVaga").innerHTML += FPVtable;

document.getElementById("nomeresponsavel").innerText = JSON.parse(
  sessionStorage.getItem("cadastro")
).find((p) => p.title === "Responsável legal").info;

document
  .getElementById("fpvassinatura")
  .setAttribute(
    "src",
    `data:image/png;base64, ${sessionStorage.getItem("assinatura")}`
  );

sessionStorage.setItem("FPVcounter", counter + 1);
console.log(sessionStorage.getItem("FPVcounter"));
