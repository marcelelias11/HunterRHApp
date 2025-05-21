const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8080;
const compression = require("compression");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const RateLimit = require("express-rate-limit");
const path = require("path");

const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "hunterh",
});

app.use(cors());

/*app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": [
        "'self'",
        "code.jquery.com",
        "cdn.jsdelivr.net",
        "https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js",
        "https://html2canvas.hertzen.com/dist/html2canvas.js",
      ],
    },
  })
);*/

const limiter = RateLimit({
  windowMs: 1 * 30 * 1000,
  max: 20,
});
//app.use(limiter);

app.use(express.json());

app.use(express.static("src"));
app.use(compression());

let content = {
  dados: {
    cadastro: [
      {
        title: "Empresa",
        info: "",
      },
      {
        title: "Razão Social",
        info: "",
      },
      {
        title: "CNPJ",
        info: "",
      },
      {
        title: "CEP",
        info: "",
      },
      {
        title: "Endereço",
        info: "",
      },
      {
        title: "Bairro",
        info: "",
      },
      {
        title: "Cidade",
        info: "",
      },
      {
        title: "Estado",
        info: "",
      },
      {
        title: "E-mail",
        info: "",
      },
      {
        title: "Telefone",
        info: "",
      },
      {
        title: "Responsável legal",
        info: "",
      },
      {
        title: "CPF",
        info: "",
      },
      {
        title: "Cargo",
        info: "",
      },
    ],
    contratos: {
      contrato0: [
        {
          title: "Título da vaga",
          info: "",
        },
        {
          title: "Número de vagas",
          info: "",
        },
        {
          title: "Valor da vaga (Em R$)",
          info: "",
        },
      ],
    },
    imposto: 0,
    formapagamento: "",
    FPVs: {
      FPV0: [
        {
          title: "Data do Requerimento",
          info: "",
        },
        {
          title: "Idade Mínima",
          info: "",
        },
        {
          title: "Idade Máxima",
          info: "",
        },
        {
          title: "Gênero",
          info: "",
        },
        {
          title: "Requisitos do Candidato",
          info: "",
        },
        {
          title: "Região onde deverá residir",
          info: "",
        },
        {
          title: "Escolaridade",
          info: "",
        },
        {
          title: "Descreva o que é desejável no perfil do candidato",
          info: "",
        },
        {
          title: "Salário Fixo",
          info: "",
        },
        {
          title: "Comissões",
          info: "",
        },
        {
          title: "Divulgar valor? (Sim/Não)",
          info: "",
        },
        {
          title: "Faixa salarial",
          info: "",
        },
        {
          title: "Benefícios",
          info: "",
        },
        {
          title: "Descrimine o valor dos benefícios",
          info: "",
        },
        {
          title: "Atribuições da Função",
          info: "",
        },
        {
          title: "Carga horária",
          info: "",
        },
        {
          title: "Tipo de Contratação (CLT/MEI/RPA/Outro)",
          info: "",
        },
        {
          title: "Previsão para contratação",
          info: "",
        },
        {
          title: "Observações finais",
          info: "",
        },
      ],
    },
    FECs: {
      FEC0: [
        {
          titleleft: "Realista",
          titleright: "Otimista",
          valueleft: "",
          valueright: "",
        },
        {
          titleleft: "Habilidade em análise",
          titleright: "Habilidade em comunicação",
          valueleft: "",
          valueright: "",
        },
        {
          titleleft: "Habilidade introspectiva",
          titleright: "Habilidade social",
          valueleft: "",
          valueright: "",
        },
        {
          titleleft: "Sensível",
          titleright: "Motivador",
          valueleft: "",
          valueright: "",
        },
        {
          titleleft: "Reservado",
          titleright: "Comunicador e divulgador",
          valueleft: "",
          valueright: "",
        },
        {
          titleleft: "Atento a detalhes",
          titleright: "Generalista",
          valueleft: "",
          valueright: "",
        },
        {
          titleleft: "Busca exatidão em seu trabalho",
          titleright: "Entusiasta",
          valueleft: "",
          valueright: "",
        },
        {
          titleleft: "Busca decisões mais seguras",
          titleright: "Busca decisões mais rápidas",
          valueleft: "",
          valueright: "",
        },
        {
          titleleft: "Condescendente",
          titleright: "Dominante",
          valueleft: "",
          valueright: "",
        },
        {
          titleleft: "Tem o trabalhar estruturado",
          titleright: "Executa várias coisas ao mesmo tempo",
          valueleft: "",
          valueright: "",
        },
        {
          titleleft: "Gosta de trabalhar com o conhecido",
          titleright: "Gosta de novos empreendimentos",
          valueleft: "",
          valueright: "",
        },
        {
          titleleft: "Se preocupa com a regularidade",
          titleright: "Se preocupa com a praticidade",
          valueleft: "",
          valueright: "",
        },
        {
          titleleft: "Tem estilo consultivo",
          titleright: "Tem o estilo agressivo",
          valueleft: "",
          valueright: "",
        },
        {
          titleleft: "Calmo",
          titleright: "Agitado",
          valueleft: "",
          valueright: "",
        },
        {
          titleleft: "Gosta de rotina",
          titleright: "Não gosta de rotina",
          valueleft: "",
          valueright: "",
        },
        {
          titleleft: "Cauteloso",
          titleright: "Destemido",
          valueleft: "",
          valueright: "",
        },
        {
          titleleft: "Gosta de ambientes calmos",
          titleright: "Gosta de ambientes agitados",
          valueleft: "",
          valueright: "",
        },
        {
          titleleft: "Concentrado",
          titleright: "Dinâmico",
          valueleft: "",
          valueright: "",
        },
        {
          titleleft: "Prefere ser orientado",
          titleright: "Gosta de tomar a frente",
          valueleft: "",
          valueright: "",
        },
        {
          titleleft: "Evita riscos",
          titleright: "Assume riscos",
          valueleft: "",
          valueright: "",
        },
        {
          titleleft: "Introvertido",
          titleright: "Extrovertido",
          valueleft: "",
          valueright: "",
        },
        {
          titleleft: "Mais formal",
          titleright: "Mais informal",
          valueleft: "",
          valueright: "",
        },
        {
          titleleft: "É mais crítico",
          titleright: "Amigável",
          valueleft: "",
          valueright: "",
        },
        {
          titleleft: "Se desenvolve via Trabalho",
          titleright: "Se desenvolve via Relacionamentos",
          valueleft: "",
          valueright: "",
        },
      ],
    },
  },
  assinatura: {
    assinatura: "iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAYAAABS3GwHAAAABGdBTUEAALGPC",
  },
  cartassql: {
    empresasenviar: "",
    candidatosenviar: "",
    contagemempresa: 0,
    contagemcandidato: 0,
    cartasstate: 0,
    cor: "",
  },
  cartasexport: {},
};

/*app.post("/contrato", (req, res) => {
  content.contrato = req.body;
  connection.connect();
  connection.query("SELECT 1 + 1 AS solution", (err, rows, fields) => {
  if (err) throw err;
  console.log("The solution is: ", rows[0].solution);
  });
  connection.end(); 
  res.status(201).send("Página Cadastrada!");
});*/
connection.connect();
app.post("/dados", (req, res) => {
  content.dados = req.body;
  /*const onlyLettersPattern = /^[A-Za-z]+$/;

  if (!content.dados.match(onlyLettersPattern)) {
    return res
      .status(400)
      .json({ err: "No special characters and no numbers, please!" });
  }*/

  for (let i = 0; i < content.dados.cadastro.length; i++) {
    connection.query(
      `INSERT INTO cadastro VALUES ${content.dados.cadastro[i].info};`,
      (err, rows, fields) => {
        if (err) throw err;
        console.log(rows[0]);
        console.log(rows[rows.length - 1]);
      }
    );
  }

  res.status(201).send("Página Cadastrada!");
});

app.get("/dados", (req, res) => {
  res.status(200).send(content.dados);
});

app.get("/dados/CNPJ", (req, res) => {
  connection.query(
    `SELECT * FROM cadastro WHERE CNPJ = ${req.body.CNPJ}`,
    (err, rows, fields) => {
      if (err) throw err;
      console.log(rows[0]);
      console.log(rows[rows.length - 1]);
      res.status(200).send(rows);
    }
  );
});

app.post("/cartas/dados", (req, res) => {
  /*const onlyLettersPattern = /^[A-Za-z]+$/;

  if (!content.dados.match(onlyLettersPattern)) {
    return res
      .status(400)
      .json({ err: "No special characters and no numbers, please!" });
  }*/
  connection.query(
    `SELECT * FROM enviados WHERE empresas = "${req.body.empresa}" AND candidatos = "${req.body.candidato}"`,
    (err, rows, fields) => {
      if (err) throw err;

      if (rows[0] == undefined) {
        connection.query(
          `SELECT COUNT(*) AS contagemempresas FROM enviados WHERE empresas = "${req.body.empresa}";`,
          (err, rows, fields) => {
            if (err) throw err;

            content.cartassql.contagemempresa = rows[0].contagemempresas;
          }
        );
        connection.query(
          `SELECT COUNT(*) AS contagemcandidatos FROM enviados WHERE candidatos = "${req.body.candidato}";`,
          (err, rows, fields) => {
            if (err) throw err;

            content.cartassql.contagemcandidato = rows[0].contagemcandidatos;
          }
        );
        connection.query(
          `SELECT cor FROM candidatos WHERE candidato = "${req.body.candidato}";`,
          (err, rows, fields) => {
            if (err) throw err;

            content.cartassql.cor = String(rows[0].cor);
          }
        );

        let empresasmax = 0;
        let candidatosmax = 0;
        if (content.cartassql.contagemempresa + 1 >= 4) {
          empresasmax = 1;
        }

        switch (content.cartassql.cor) {
          case "Azul" || "azul":
            console.log(
              "I ended up here in blue. Extra info:" +
                content.cartassql.contagemcandidato
            );
            if (content.cartassql.contagemcandidato >= 1) {
              candidatosmax = 1;
            }
            break;
          case "Verde" || "verde":
            console.log(
              "I ended up here in green. Extra info:" +
                content.cartassql.contagemcandidato
            );
            if (content.cartassql.contagemcandidato >= 2) {
              candidatosmax = 1;
            }
            break;
          case "Amarelo" || "amarelo":
            console.log(
              "I ended up here in yellow. Extra info:" +
                content.cartassql.contagemcandidato
            );
            if (content.cartassql.contagemcandidato >= 3) {
              candidatosmax = 1;
            }
            break;
          case "Vermelho" || "vermelho":
            console.log(
              "I ended up here in red. Extra info:" +
                content.cartassql.contagemcandidato
            );
            if (content.cartassql.contagemcandidato >= 4) {
              candidatosmax = 1;
            }
            break;
        }

        /*if (
          content.cartassql.cor == "Azul" ||
          content.cartassql.cor == "azul"
        ) {
          if (content.cartassql.contagemcandidato + 1 >= 1) {
            candidatosmax = 1;
          }
        } else if (
          content.cartassql.cor == "Verde" ||
          content.cartassql.cor == "verde"
        ) {
          if (content.cartassql.contagemcandidato + 1 >= 2) {
            candidatosmax = 1;
          }
        } else if (
          content.cartassql.cor == "Amarelo" ||
          content.cartassql.cor == "amarelo"
        ) {
          if (content.cartassql.contagemcandidato + 1 >= 3) {
            candidatosmax = 1;
          }
        } else if (
          content.cartassql.cor == "Vermelho" ||
          content.cartassql.cor == "vermelho"
        ) {
          if (content.cartassql.contagemcandidato + 1 >= 4) {
            candidatosmax = 1;
          }
        }*/

        if (empresasmax == 1 && candidatosmax == 1) {
          content.cartassql.cartasstate = 3;
        } else if (empresasmax == 1) {
          content.cartassql.cartasstate = 1;
        } else if (candidatosmax == 1) {
          content.cartassql.cartasstate = 2;
        } else {
          content.cartassql.cartasstate = 0;
        }
        res.status(201).send(content.cartassql);
      } else {
        content.cartassql.cartasstate = 4;
        console.log(
          "Requisição negada, lembrar de colocar a mensagem no cliente"
        );
        res.status(400).send(content.cartassql);
      }
    }
  );
});

app.post("/cartas/dados/confirm", (req, res) => {
  content.cartassql.cartasstate = 0;
  connection.query(
    `INSERT INTO enviados (empresas, candidatos) VALUES ("${req.body.empresa}", "${req.body.candidato}");`,
    (err, rows, fields) => {
      if (err) throw err;
    }
  );
  connection.query(
    `SELECT * FROM empresasenvio WHERE empresa = "${req.body.empresa}";`,
    (err, rows, fields) => {
      if (err) throw err;

      if (rows[0] == undefined) {
        connection.query(
          `INSERT INTO empresasenvio SELECT * FROM empresas WHERE EMPRESA = "${req.body.empresa}";`,
          (err, rows, fields) => {
            if (err) throw err;
          }
        );
      }
    }
  );
  res.status(201).send(content.cartassql);
});

app.post("/cartas/dados/receber", (req, res) => {
  content.cartassql.cartasstate = 0;
  connection.query(`SELECT EMPRESA FROM empresas`, (err, rows, fields) => {
    if (err) throw err;
    content.cartassql.empresasenviar = rows;
  });
  connection.query(`SELECT * FROM candidatos`, (err, rows, fields) => {
    if (err) throw err;
    content.cartassql.candidatosenviar = rows;
  });
  connection.query(
    `SELECT COUNT(*) AS contagemempresas FROM enviados WHERE empresas = "${req.body.empresa}";`,
    (err, rows, fields) => {
      if (err) throw err;
      content.cartassql.contagemempresa = rows[0].contagemempresas;
    }
  );
  connection.query(
    `SELECT COUNT(*) AS contagemcandidatos FROM enviados WHERE candidatos = "${req.body.candidato}";`,
    (err, rows, fields) => {
      if (err) throw err;
      content.cartassql.contagemcandidato = rows[0].contagemcandidatos;
    }
  );
  res.status(201).send(content.cartassql);
});

app.get("/cartas/dados/carta", (req, res) => {
  connection.query(`SELECT * FROM empresasenvio;`, (err, rows, fields) => {
    if (err) throw err;
    content.cartasexport = rows;
    res.status(200).send(content.cartasexport);
  });
});

app.get("/cartas/dados/carta/contagem", (req, res) => {
  connection.query(
    `SELECT COUNT(*) AS contagem FROM empresasenvio;`,
    (err, rows, fields) => {
      if (err) throw err;
      res.status(200).send(String(rows[0].contagem));
    }
  );
});

app.get("/cartas/dados/enviados", (req, res) => {
  connection.query(`SELECT * FROM enviados;`, (err, rows, fields) => {
    if (err) throw err;
    res.status(200).send(rows);
  });
});

app.get("/carta", (req, res) => {
  res.sendFile(path.join(__dirname, "/src/cartasindex.html"));
});

app.get("/cartaenvio", (req, res) => {
  res.sendFile(path.join(__dirname, "/src/cartas.html"));
});

/*app.get("/cartas/dados/contagem", (req, res) => {
  connection.query(
    `SELECT COUNT(*) AS contagemempresas FROM enviados WHERE empresas = "${req.body.empresa}";`,
    (err, rows, fields) => {
      if (err) throw err;
      console.log("Contagem SQL:" + rows[0].contagemempresas);
      content.contagem.contagemempresa = rows[0].contagemempresas;
      console.log("Contagem enviada:" + content.contagem.contagemempresa);
    }
  );
  connection.query(
    `SELECT COUNT(*) AS contagemcandidatos FROM enviados WHERE candidatos = "${req.body.candidato}";`,
    (err, rows, fields) => {
      if (err) throw err;
      content.contagem.contagemcandidato = rows[0].contagemcandidatos;
    }
  );
  res.status(200).send(content.contagem);
});*/

app.post("/sign", (req, res) => {
  content.assinatura = req.body;
  res.status(201).send("Assinatura Cadastrada!");
});

app.get("/sign", (req, res) => {
  res.status(200).send(content.assinatura);
});

app.get("/connectioncheck", (req, res) => {
  res.status(200).send("Conexão bem sucedida!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
