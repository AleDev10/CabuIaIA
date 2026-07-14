chrome.action.onClicked.addListener(async(tab) => {
  try {
    console.log("clicou no icone da extenção:",tab.id);
    await chrome.sidePanel.open({tabId:tab.id});
  } catch (error) {
    console.log("Erro ao clicar no icone da extenção")
  }
});
