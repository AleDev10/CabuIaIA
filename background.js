chrome.action.onClicked.addListener(async (tab) => {
  try {
    abrirPainel(tab);
  } catch (error) {
    console.log("Erro [eventoClick]");
  }
});

async function abrirPainel(tab) {
  console.log("clicou no icone da extenção:", tab.id);
  await chrome.sidePanel.open({ tabId: tab.id });
}

function enviarMenssagem(mensagem) {
  chrome.runtime.sendMessage({ origem: "back", info: mensagem });
}

async function enviarContent(tab) {
  try {
    if (tab.id) {
      const resposta = await chrome.tabs.sendMessage(tab.id, {
        origem: "content",
        info: "Extrair texto",
      });
      enviarMenssagem(resposta.info);
    }
  } catch (error) {
    console.log("Erro [enviarContent()]");
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
  } else if (menssagem.info === "Cancelar") {
    console.log(menssagem.info);
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
