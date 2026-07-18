chrome.runtime.onMessage.addListener((menssagem, sender, sendResponse) => {
  if (menssagem.origem === "background") {
    sendResponse({ info: capturarTextos() });
  }
});

function capturarTextos() {
  let textos = document.body.innerText;
  return verificarCaracteres(textos);
}

function verificarCaracteres(textos) {
  let resposta = confirm(`Está pagina tem:${textos.length} caracteres. Deseja continuar?`);
  if (resposta) {
    console.log("Texto extraido");
    return textos;
  }
  console.log("Extra cancelada");
  return "";
}

