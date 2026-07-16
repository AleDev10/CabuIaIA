const caixaRespostas = document.getElementById("resultado");
const btnIniciar = document.getElementById("btn-iniciar");

btnIniciar.addEventListener("click", () => {
  chrome.runtime.sendMessage(
    { origem: "frontend", info: "iniciar" }
  );
});

chrome.runtime.onMessage.addListener((menssagem, sender, sendResponse) => {
    caixaRespostas.innerText = menssagem.info;
  });
