let cadastrojsonarr = JSON.parse(sessionStorage.getItem("cadastro"));

let cadastroarr = [
  cadastrojsonarr.find((p) => p.title === "Empresa"),
  cadastrojsonarr.find((p) => p.title === "CNPJ"),
  cadastrojsonarr.find((p) => p.title === "Endereço"),
  cadastrojsonarr.find((p) => p.title === "Bairro"),
  cadastrojsonarr.find((p) => p.title === "CEP"),
  cadastrojsonarr.find((p) => p.title === "Cidade"),
  cadastrojsonarr.find((p) => p.title === "Estado"),
  cadastrojsonarr.find((p) => p.title === "Telefone"),
  cadastrojsonarr.find((p) => p.title === "E-mail"),
  cadastrojsonarr.find((p) => p.title === "Responsável legal"),
  cadastrojsonarr.find((p) => p.title === "CPF"),
  cadastrojsonarr.find((p) => p.title === "Cargo"),
];
let cadastrosection = "";
for (let i = 0; i < cadastroarr.length - 1; i++) {
  switch (cadastroarr[i].title) {
    case "Bairro":
      cadastrosection += `<section id="infolocal" class="infoempresa">`;
      for (let j = i; j < i + 4; j++) {
        cadastrosection += `<p>${cadastroarr[j].title}: ${cadastroarr[j].info}</p>`;
      }
      cadastrosection += `</section>`;
      i = i + 3;
      break;

    case "Telefone":
      cadastrosection += `<section id="infocontato" class="infoempresa">`;
      for (let j = i; j < i + 2; j++) {
        cadastrosection += `<p>${cadastroarr[j].title}: ${cadastroarr[j].info}</p>`;
      }
      cadastrosection += `</section>`;
      i = i + 1;
      break;

    case "CPF":
      cadastrosection += `<section id="infopessoal" class="infoempresa">`;
      for (let j = i; j < i + 2; j++) {
        cadastrosection += `<p>${cadastroarr[j].title}: ${cadastroarr[j].info}</p>`;
      }
      cadastrosection += `</section>`;
      break;
    case "Empresa":
      cadastrosection += `<section class="infoempresa">`;
      cadastrosection += `<p>${cadastroarr[i].title} CONTRANTE: ${cadastroarr[i].info}</p>`;
      cadastrosection += `</section>`;
      break;
    default:
      cadastrosection += `<section class="infoempresa">`;
      cadastrosection += `<p>${cadastroarr[i].title}: ${cadastroarr[i].info}</p>`;
      cadastrosection += `</section>`;
      break;
  }
}

document
  .getElementById("assinatura")
  .setAttribute(
    "src",
    `data:image/png;base64, ${sessionStorage.getItem("assinatura")}`
  );

document.getElementById("infoempresa").innerHTML += cadastrosection;

document.getElementById("inputspace").innerText = cadastroarr[0].info;
