let estadoPAinel = false;
let contCaracter = 0;

chrome.action.onClicked.addListener((tab) => {
  verificarEstadoPainel(tab);
});

chrome.sidePanel.onClosed.addListener((info) => {
  estadoPAinel = false;
  console.log("Fechou a extenção na janela nº:", info.windowId);
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
  chrome.runtime.sendMessage({
    origem: "back",
    info: mensagem,
    contador: contCaracter,
  });
}

function verificarTextosRecibidos(mensagem) {
  if (mensagem.info === "") {
    if (mensagem.caminho ==="pagina") {
      console.log("Analise da pagina cancelada[String null]");
    } else if (mensagem.caminho ==="seleção") {
      console.log("Analise da seleção cancelada[String null]");
    }
  } else {
    contCaracter = mensagem.info.length;
    enviarFront(mensagem.info);
  }
}

async function enviarContent(tab, menssagem) {
  try {
    if (tab.id) {
      const resposta = await chrome.tabs.sendMessage(tab.id, menssagem);
      verificarTextosRecibidos({ info: resposta.info, caminho: resposta.caminho });
    }
  } catch (error) {
    console.log("Erro [enviarContent()]", error);
  }
}

async function identificarTab(menssagem) {
  try {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    enviarContent(tab, menssagem);
  } catch (error) {
    console.log("Erro [identificarTab()]");
  }
}

function caminhoPagina() {
  console.log("Iniciar analise da pagina");
  identificarTab({
    origem: "background",
    info: "Extrair texto da pagina",
    caminho: "pagina"
  });
}

function caminhoSelecao() {
  console.log("Iniciar analise da seleção");
  identificarTab({
    origem: "background",
    info: "Extrair texto selecionado",
    caminho: "seleção"
  });
}

function escolherCaminho(menssagem) {
  switch (menssagem.caminho) {
    case "pagina":
      caminhoPagina();
      break;
    case "seleção":
      caminhoSelecao();
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
