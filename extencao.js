const caixaRespostas = document.getElementById("resultado");
const btnAnalisarPagina = document.getElementById("btn-iniciar");
const contCaracter = document.getElementById("contCaracter");

function limparInfo() {
  caixaRespostas.innerText = "";
  contCaracter.innerText = `Nº caracteres enviados:0`;
}

btnAnalisarPagina.addEventListener("click", () => {
  limparInfo();
  chrome.runtime.sendMessage({ caminho: "pagina"});
});

chrome.runtime.onMessage.addListener((menssagem, sender, sendResponse) => {
  caixaRespostas.innerText = menssagem.info;
  contCaracter.innerText = `Nº caracteres enviados:${menssagem.contador}`;
});
