document.getElementById("date").innerHTML +=
  " " +
  ("0" + new Date().getDate()).slice(-2) +
  "/" +
  ("0" + (new Date().getMonth() + 1)).slice(-2) +
  "/" +
  new Date().getFullYear();

let pag = sessionStorage.getItem("formapagamento");
document.getElementById("formapagamento").innerText = pag;
document.getElementById("nomeresponsavel").innerText = JSON.parse(
  sessionStorage.getItem("cadastro")
).find((p) => p.title === "Responsável legal").info;
document
  .getElementById("assinatura")
  .setAttribute(
    "src",
    `data:image/png;base64, ${sessionStorage.getItem("assinatura")}`
  );
document
  .getElementById("assinatura2")
  .setAttribute(
    "src",
    `data:image/png;base64, ${sessionStorage.getItem("assinatura")}`
  );
