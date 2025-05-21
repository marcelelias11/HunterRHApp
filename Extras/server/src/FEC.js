let FECcounter = Number(sessionStorage.getItem("FECcounter")) || 0;
document.getElementById("fecdate").innerHTML +=
  " " +
  ("0" + new Date().getDate()).slice(-2) +
  "/" +
  ("0" + (new Date().getMonth() + 1)).slice(-2) +
  "/" +
  new Date().getFullYear();

let FECjsonarr = JSON.parse(sessionStorage.getItem("FECs"))[`FEC${FECcounter}`];

let leftColumnPhrases = [];
for (let i = 0; i < FECjsonarr.length; i++) {
  leftColumnPhrases.push(FECjsonarr[i].titleleft);
}
let rightColumnPhrases = [];
for (let i = 0; i < FECjsonarr.length; i++) {
  rightColumnPhrases.push(FECjsonarr[i].titleright);
}
document.getElementById("Empresa").innerText = `Empresa: ${
  JSON.parse(sessionStorage.getItem("cadastro"))[0].info
}`;
document.getElementById("Cargo").innerText = `Cargo: ${
  JSON.parse(sessionStorage.getItem("contrato"))[`contrato${FECcounter}`][0]
    .info
}`;
let FECdiv = "";
for (let i = 0; i < leftColumnPhrases.length; i++) {
  FECdiv += "<div class = 'contentcontainer'>";
  FECdiv += `<p id = 'contentleft' class = 'content'>${leftColumnPhrases[i]}</p>`;
  FECdiv += "<div id = 'checkboxcontainer'>";
  for (let j = 0; j < 5; j++) {
    let id = 100 - 25 * j;
    FECdiv += `<div id = ${id} class= "checkbox">`;
    if (String(id) + "%" == FECjsonarr[i].valueleft) {
      FECdiv += `<p>X</p>`;
    } else {
      FECdiv += `<p></p>`;
    }
    FECdiv += "</div>";
  }
  FECdiv += "</div>";
  FECdiv += `<p id = 'contentright' class = 'content'>${rightColumnPhrases[i]}</p>`;
  FECdiv += "</div>";
}
document.getElementById("FEC").innerHTML += FECdiv;

document.getElementById("nomeresponsavel").innerText = JSON.parse(
  sessionStorage.getItem("cadastro")
).find((p) => p.title === "Responsável legal").info;

document
  .getElementById("fecassinatura")
  .setAttribute(
    "src",
    `data:image/png;base64, ${sessionStorage.getItem("assinatura")}`
  );

sessionStorage.setItem("FECcounter", FECcounter + 1);
console.log(sessionStorage.getItem("FECcounter"));
