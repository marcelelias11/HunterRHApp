sessionStorage.setItem("contagem", 0);

fetch("/cartas/dados/carta/contagem")
  .then(async function (response) {
    return await response.text();
  })
  .then(async function (text) {
    for (let i = 0; i < text; i++) {
      document.getElementById(
        "iframediv"
      ).innerHTML += `<iframe id="iframe${i}" src="cartas2.html" title="Carta${i}"></iframe>`;
    }

    console.log(text);
  })
  .catch((error) => {
    console.error(error);
  });

function changepage() {
  const loop = Number(sessionStorage.getItem("contagem"));
  for (let i = 0; i < loop; i++) {
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
