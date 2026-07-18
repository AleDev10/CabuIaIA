let estadoPAinel = false;
let contCaracter = 0;

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
  chrome.runtime.sendMessage({ origem: "back", info: mensagem, contador: contCaracter });
}

function verificarTextosRecibidos(mensagem) {
  if (mensagem==="") {
    console.log("Analise da pagina cancelado[String null]");
  }else{
    contCaracter = mensagem.length;
    enviarFront(mensagem);
  }
}

async function enviarContent(tab) {
  try {
    if (tab.id) {
      const resposta = await chrome.tabs.sendMessage(tab.id, {
        origem: "background",
        info: "Extrair texto",
      });
      verificarTextosRecibidos(resposta.info)
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

function caminhoPagina(menssagem) {
  console.log("Iniciar analise da pagina");
  identificarTab();
}

function escolherCaminho(menssagem) {
  switch (menssagem.caminho) {
    case "pagina":
      caminhoPagina(menssagem);
      break;

    default:
      console.log("Erro [escolherCaminho()]");
      break;
  }
}

function ReceberMensagens() {
  chrome.runtime.onMessage.addListener((menssagem, sender, sendResponse) => {
    escolherCaminho(menssagem);
  });
}

//comunicação com o frontend
ReceberMensagens();
