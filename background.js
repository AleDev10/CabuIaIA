chrome.action.onClicked.addListener(async (tab) => {
  try {
    //abrir a extenção
    abrirPainel(tab);
  } catch (error) {
    console.log("Erro ao clicar no icone da extenção");
  }
});

async function abrirPainel(tab) {
  console.log("clicou no icone da extenção:", tab.id);
  await chrome.sidePanel.open({ tabId: tab.id });
}

function ReceberMensagens() {
  chrome.runtime.onMessage.addListener((menssagem, sender, sendResponse) => {
    if (menssagem.origem === "frontend") {
      console.log(menssagem.info);
      sendResponse({ status: "ok", info: "iniciado" });
    }
  });
}

//comunicação com o frontend
ReceberMensagens();
