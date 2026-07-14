const caixaRespostas = document.getElementById("resultado");
const btnIniciar = document.getElementById("btn-iniciar");
const btnCancelar = document.getElementById("btn-cancelar");

btnIniciar.addEventListener("click", () => {
  chrome.runtime.sendMessage(
    { origem: "frontend", info: "iniciar" },
    (response) => {
      console.log("Background respondeu:", response.info);
    },
  );
});

btnCancelar.addEventListener("click", () => {
  chrome.runtime.sendMessage(
    { origem: "frontend", info: "Cancelar" },
    (response) => {
      console.log("Background respondeu:", response.info);
    },
  );
});
