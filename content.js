chrome.runtime.onMessage.addListener((menssagem, sender, sendResponse) => {
  if (menssagem.origem === "content") {
    console.log(menssagem.info);
    sendResponse({ info: capturarTextos() });
  }
});

function capturarTextos() {
  let textos = document.body.innerText;
  return textos;
}
