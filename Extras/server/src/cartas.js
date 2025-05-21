let tablecheck = 0;
document.getElementById("tablediv").classList.toggle("tablehide");

document
  .getElementById("showtable")
  .addEventListener("click", function tableToggle() {
    fetch("/cartas/dados/enviados")
      .then(async function (response) {
        return await response.json();
      })
      .then(async function (text) {
        document.getElementById("senttable").innerHTML = "";
        for (let i = 0; i < text.length; i++) {
          let cartasrow = document.createElement("tr");
          let tableempresa = document.createElement("td");
          tableempresa.innerText = text[i].empresas;
          cartasrow.appendChild(tableempresa);
          let tablecandidato = document.createElement("td");
          tablecandidato.innerText = text[i].candidatos;
          cartasrow.appendChild(tablecandidato);
          document.getElementById("senttable").appendChild(cartasrow);
        }
        console.log("This is the table data:" + JSON.stringify(text));
      })
      .catch((error) => {
        console.error(error);
      });
    if (tablecheck == 0) {
      document.getElementById("tablediv").classList.remove("tablehide");
      document.getElementById("tablediv").classList.toggle("tableshow");
      tablecheck = 1;
      return;
    }
    if (tablecheck == 1) {
      document.getElementById("tablediv").classList.remove("tableshow");
      document.getElementById("tablediv").classList.toggle("tablehide");
      tablecheck = 0;
      return;
    }
  });
let index = 0;

const cartasobj = {
  cartasstate: 0,
  contagemempresa: 0,
  contagemcandidato: 0,
};

fetch("/cartas/dados/receber", {
  method: "POST",
  mode: "cors",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    empresa: document.getElementById("empresas").value,
    candidato: document.getElementById("candidatos").value,
  }),
})
  .then(async function (response) {
    return await response.json();
  })
  .then(async function (text) {
    console.log(text);

    for (let i = 0; i < text.empresasenviar.length; i++) {
      let empresaoption = document.createElement("option");
      empresaoption.setAttribute("value", text.empresasenviar[i].EMPRESA);
      empresaoption.setAttribute("id", text.empresasenviar[i].EMPRESA);
      empresaoption.innerText = text.empresasenviar[i].EMPRESA;
      document.getElementById(`empresas`).appendChild(empresaoption);
    }

    for (let i = 0; i < text.candidatosenviar.length; i++) {
      let candidatooption = document.createElement("option");

      candidatooption.setAttribute("value", text.candidatosenviar[i].candidato);

      candidatooption.setAttribute("id", text.candidatosenviar[i].candidato);

      if (
        text.candidatosenviar[i].cor == "Azul" ||
        text.candidatosenviar[i].cor == "azul"
      ) {
        candidatooption.setAttribute("class", "blue");
      } else if (
        text.candidatosenviar[i].cor == "Verde" ||
        text.candidatosenviar[i].cor == "verde"
      ) {
        candidatooption.setAttribute("class", "green");
      } else if (
        text.candidatosenviar[i].cor == "Amarelo" ||
        text.candidatosenviar[i].cor == "amarelo"
      ) {
        candidatooption.setAttribute("class", "yellow");
      } else if (
        text.candidatosenviar[i].cor == "Vermelho" ||
        text.candidatosenviar[i].cor == "vermelho"
      ) {
        candidatooption.setAttribute("class", "red");
      }

      candidatooption.innerText = text.candidatosenviar[i].candidato;
      document.getElementById(`candidatos`).appendChild(candidatooption);
      cartasobj.cartasstate = text.cartasstate;
      cartasobj.contagemempresa = text.contagemempresa;
      cartasobj.contagemcandidato = text.contagemcandidato;
    }
  })
  .catch((error) => {
    console.error(error);
  });

function candidatolimit(element) {
  console.log("Cor:" + element.getAttribute("class"));
  console.log("Id:" + element.getAttribute("id"));
  if (element.getAttribute("class") == "blue") {
    return 1;
  } else if (element.getAttribute("class") == "green") {
    return 2;
  } else if (element.getAttribute("class") == "yellow") {
    return 3;
  } else if (element.getAttribute("class") == "red") {
    return 4;
  }
}

document
  .getElementById("formsubmit")
  .addEventListener("click", function sendData() {
    console.log("I got here:" + cartasobj.cartasstate);
    fetch("/cartas/dados", {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        empresa: document.getElementById("empresas").value,
        candidato: document.getElementById("candidatos").value,
      }),
    })
      .then(async function (response) {
        console.log(response);
        return await response.json();
      })
      .then(async function (text) {
        cartasobj.cartasstate = text.cartasstate;
        cartasobj.contagemempresa = text.contagemempresa;
        cartasobj.contagemcandidato = text.contagemcandidato;

        if (cartasobj.cartasstate == 0) {
          fetch("/cartas/dados/confirm", {
            method: "POST",
            mode: "cors",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              empresa: document.getElementById("empresas").value,
              candidato: document.getElementById("candidatos").value,
            }),
          })
            .then(async function (response) {
              console.log(response);
              return await response.json();
            })
            .then(async function (text) {
              cartasobj.cartasstate = text.cartasstate;
              cartasobj.contagemempresa = text.contagemempresa;
              cartasobj.contagemcandidato = text.contagemcandidato;
              document.getElementById(
                document.getElementById("empresas").value
              ).innerText =
                document.getElementById("empresas").value +
                `(${cartasobj.contagemempresa + 1}/4)`;
              document.getElementById(
                document.getElementById("candidatos").value
              ).innerText =
                document.getElementById("candidatos").value +
                `(${cartasobj.contagemcandidato + 1}/${candidatolimit(
                  document.getElementById(
                    document.getElementById("candidatos").value
                  )
                )})`;
              alert("Candidato cadastrado com sucesso!");
            })
            .catch((error) => {
              console.error(error);
            });
        } else if (cartasobj.cartasstate == 1) {
          if (
            confirm(
              "Essa empresa já recebeu o número máximo de candidatos! Enviar mesmo assim?"
            ) == true
          ) {
            fetch("/cartas/dados/confirm", {
              method: "POST",
              mode: "cors",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                empresa: document.getElementById("empresas").value,
                candidato: document.getElementById("candidatos").value,
              }),
            })
              .then(async function (response) {
                console.log(response);
                return await response.json();
              })
              .then(async function (text) {
                cartasobj.cartasstate = text.cartasstate;
                cartasobj.contagemempresa = text.contagemempresa;
                cartasobj.contagemcandidato = text.contagemcandidato;
                document.getElementById(
                  document.getElementById("empresas").value
                ).innerText =
                  document.getElementById("empresas").value +
                  `(${cartasobj.contagemempresa + 1}/4)`;
                document.getElementById(
                  document.getElementById("candidatos").value
                ).innerText =
                  document.getElementById("candidatos").value +
                  `(${cartasobj.contagemcandidato + 1}/${candidatolimit(
                    document.getElementById(
                      document.getElementById("candidatos").value
                    )
                  )})`;
                alert("Candidato cadastrado com sucesso!");
              })
              .catch((error) => {
                console.error(error);
              });
          }
        } else if (cartasobj.cartasstate == 2) {
          if (
            confirm(
              "Esse candidato já foi enviado para o número máximo de empresas! Enviar mesmo assim?"
            ) == true
          ) {
            fetch("/cartas/dados/confirm", {
              method: "POST",
              mode: "cors",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                empresa: document.getElementById("empresas").value,
                candidato: document.getElementById("candidatos").value,
              }),
            })
              .then(async function (response) {
                console.log(response);
                return await response.json();
              })
              .then(async function (text) {
                cartasobj.cartasstate = text.cartasstate;
                cartasobj.contagemempresa = text.contagemempresa;
                cartasobj.contagemcandidato = text.contagemcandidato;
                document.getElementById(
                  document.getElementById("empresas").value
                ).innerText =
                  document.getElementById("empresas").value +
                  `(${cartasobj.contagemempresa + 1}/4)`;
                document.getElementById(
                  document.getElementById("candidatos").value
                ).innerText =
                  document.getElementById("candidatos").value +
                  `(${cartasobj.contagemcandidato + 1}/${candidatolimit(
                    document.getElementById(
                      document.getElementById("candidatos").value
                    )
                  )})`;
                alert("Candidato cadastrado com sucesso!");
              })
              .catch((error) => {
                console.error(error);
              });
          }
        } else if (cartasobj.cartasstate == 3) {
          if (
            confirm(
              "A empresa e o candidato já alcançaram o limite máximo de envios! Enviar mesmo assim?"
            ) == true
          ) {
            fetch("/cartas/dados/confirm", {
              method: "POST",
              mode: "cors",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                empresa: document.getElementById("empresas").value,
                candidato: document.getElementById("candidatos").value,
              }),
            })
              .then(async function (response) {
                console.log(response);
                return await response.json();
              })
              .then(async function (text) {
                cartasobj.cartasstate = text.cartasstate;
                cartasobj.contagemempresa = text.contagemempresa;
                cartasobj.contagemcandidato = text.contagemcandidato;
                document.getElementById(
                  document.getElementById("empresas").value
                ).innerText =
                  document.getElementById("empresas").value +
                  `(${cartasobj.contagemempresa + 1}/4)`;
                document.getElementById(
                  document.getElementById("candidatos").value
                ).innerText =
                  document.getElementById("candidatos").value +
                  `(${cartasobj.contagemcandidato + 1}/${candidatolimit(
                    document.getElementById(
                      document.getElementById("candidatos").value
                    )
                  )})`;
                alert("Candidato cadastrado com sucesso!");
              })
              .catch((error) => {
                console.error(error);
              });
          }
        } else if (cartasobj.cartasstate == 4) {
          alert("Esse candidato já foi enviado para essa empresa!");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });
