function verificarCaracteres(textos) {
  let resposta = confirm(
    `Está pagina tem:${textos.length} caracteres. Deseja continuar?`,
  );
  if (resposta) {
    console.log("Texto extraido");
    return textos;
  }
  console.log("Extra cancelada");
  return "";
}

function capturarTextos() {
  let textos = document.body.innerText;
  return verificarCaracteres(textos);
}

function verificarTextoSelecionado(textoSelecionado) {
  console.log(textoSelecionado);
  if (textoSelecionado === "") {
    alert("Nenhum texto selecionado");
    return "";
  }
  return textoSelecionado;
}

function capturarTextoSelecionado() {
  let selecao = window.getSelection();
  let textoSelecionado = selecao.toString();
  return verificarTextoSelecionado(textoSelecionado);
}

function definirOrigem(menssagem, sendResponse) {
  if (menssagem.origem === "background") {
    switch (menssagem.caminho) {
      case "pagina":
        sendResponse({ info: capturarTextos(), caminho: "pagina" });
        break;
      case "seleção":
        sendResponse({ info: capturarTextoSelecionado(), caminho: "seleção" });
        break;

      default:
        console.log("Erro [definirOrigem()]");
        break;
    }
  }
}

chrome.runtime.onMessage.addListener((menssagem, sender, sendResponse) => {
  definirOrigem(menssagem, sendResponse);
});
