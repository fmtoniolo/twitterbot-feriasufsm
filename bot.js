console.log("tchê!");

const Twit = require("twit");
const config = require("./config.js");

const T = new Twit(config);

const ferias = "08/19/2022";
const aulas = "04/11/2022";
const dataHoje = new Date();
console.log(dataHoje);
const dias = 1000 * 60 * 60 * 24;

const qtosDiasParaFerias = (ehDataFerias = true) => {
  const date1 = Math.round(Date.parse(ehDataFerias ? ferias : aulas) / dias);
  console.log(date1);
  const date2 = Math.round(dataHoje / dias);
  console.log(date2);
  const qtosDias = date1 - date2;
  return qtosDias;
};

function botInit() {
  const qtosDias = qtosDiasParaFerias(true);
  const qtosDiasAulas = qtosDiasParaFerias(false);

  if (qtosDias >= 0) {
    T.post(
      "statuses/update",
      {
        status:
          qtosDias === 0
            ? "Sextou! Tamo de férias gurizada 😎"
            : `Faltam ${qtosDias} dias para as férias da UFSM.`
      },
      function (error, tweet, response) {
        if (!error) {
          console.log(tweet);
        } else if (error) {
          console.log(error);
        }
      }
    );
  }
  if (qtosDias < 0) {
    T.post(
      "statuses/update",
      {
        status: `Faltam ${qtosDiasAulas} dias para o início das aulas 👀`
      },
      function (error, tweet, response) {
        if (!error) {
          console.log(tweet);
        } else if (error) {
          console.log(error);
        }
      }
    );
  }
}
//botInit();
//setInterval(botInit, dias);
