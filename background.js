let estadoPAinel = false;

chrome.action.onClicked.addListener((tab) => {
  verificarEstadoPainel(tab);
});

chrome.sidePanel.onClosed.addListener(() => {
  estadoPAinel = false;
});

async function abrirPainel(tab) {
  try {
    console.log("Abriu a extenção no separador nº:", tab.id);
    await chrome.sidePanel.open({ tabId: tab.id });
  } catch (error) {
    console.log("Erro [abrirPainel()]");
  }
}

async function fecharPainel(tab) {
  try {
    console.log("Fechou a extenção na janela nº:", tab.windowId);
    await chrome.sidePanel.close({ windowId: tab.windowId });
  } catch (error) {
    console.log("Erro [fecharPainel()]", error);
  }
}

function verificarEstadoPainel(tab) {
  if (!estadoPAinel) {
    abrirPainel(tab);
    estadoPAinel = true;
  } else {
    fecharPainel(tab);
    estadoPAinel = false;
  }
}

function enviarFront(mensagem) {
  chrome.runtime.sendMessage({ origem: "back", info: mensagem });
}

async function enviarContent(tab) {
  try {
    if (tab.id) {
      const resposta = await chrome.tabs.sendMessage(tab.id, {
        origem: "content",
        info: "Extrair texto",
      });
      enviarFront(resposta.info);
    }
  } catch (error) {
    console.log("Erro [enviarContent()]",error);
  }
}

async function identificarTab() {
  try {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    enviarContent(tab);
  } catch (error) {
    console.log("Erro [identificarTab()]");
  }
}

function origemFrontend(menssagem) {
  if (menssagem.info === "iniciar") {
    console.log(menssagem.info);
    identificarTab();
  }
}

function escolherOrigem(menssagem) {
  switch (menssagem.origem) {
    case "frontend":
      origemFrontend(menssagem);
      break;

    default:
      console.log("Erro [escolherOrigem()]");
      break;
  }
}

function ReceberMensagens() {
  chrome.runtime.onMessage.addListener((menssagem, sender, sendResponse) => {
    escolherOrigem(menssagem);
  });
}

//comunicação com o frontend
ReceberMensagens();
