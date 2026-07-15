const caixaRespostas = document.getElementById("resultado");
const btnIniciar = document.getElementById("btn-iniciar");
const btnCancelar = document.getElementById("btn-cancelar");

btnIniciar.addEventListener("click", () => {
  chrome.runtime.sendMessage(
    { origem: "frontend", info: "iniciar" }
  );
});

btnCancelar.addEventListener("click", () => {
  chrome.runtime.sendMessage(
    { origem: "frontend", info: "Cancelar" }
  );
});

chrome.runtime.onMessage.addListener((menssagem, sender, sendResponse) => {
    caixaRespostas.innerText = menssagem.info;
  });
