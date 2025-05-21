let i = 1;

for (i; i < 4; i++) {
  document.getElementById(
    "iframediv"
  ).innerHTML += `<iframe id="iframe${i}" src="contrato${i}.html" title="contrato${i}"></iframe>`;
}
fetch("/dados")
  .then(async function (response) {
    return await response.json();
  })
  .then(async function (text) {
    sessionStorage.setItem("cadastro", JSON.stringify(text.cadastro));
    sessionStorage.setItem("contrato", JSON.stringify(text.contratos));
    sessionStorage.setItem("imposto", text.valueimposto);
    sessionStorage.setItem("formapagamento", text.formapagamento);
    sessionStorage.setItem("FPVs", JSON.stringify(text.FPVs));
    sessionStorage.setItem("FECs", JSON.stringify(text.FECs));

    for (const key in JSON.parse(sessionStorage.getItem("contrato"))) {
      document.getElementById(
        "iframediv"
      ).innerHTML += `<iframe id="iframe${i}" src="FPV.html" title="FPV"></iframe>`;
      i++;
      document.getElementById(
        "iframediv"
      ).innerHTML += `<iframe id="iframe${i}" src="FEC.html" title="FPV"></iframe>`;
      i++;
    }
  })
  .catch((error) => {
    console.error(error);
  });

fetch("/sign")
  .then(async function (response) {
    return await response.json();
  })
  .then(async function (text) {
    sessionStorage.setItem("assinatura", text.assinatura);
  })
  .catch((error) => {
    console.error(error);
  });

console.log(i);

sessionStorage.setItem("counter", String(i));

sessionStorage.setItem("FECcounter", 0);

function changepage() {
  const loop =
    Number(sessionStorage.getItem("counter")) +
    Number(sessionStorage.getItem("FPVcounter")) +
    Number(sessionStorage.getItem("FECcounter"));
  for (let i = 0; i < loop - 1; i++) {
    let iframediv = document.createElement("div");
    iframediv.appendChild(
      document
        .getElementById(`iframe${i + 1}`)
        .contentWindow.document.getElementById("bodyexport")
    );
    document.getElementById("toprint").appendChild(iframediv);
  }
  document.getElementById("iframediv").remove();
}

setTimeout(changepage, 10000);
