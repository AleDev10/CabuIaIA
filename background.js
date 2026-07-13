chrome.action.onClicked.addListener(() => {
  console.log("clicou no icone");
  chrome.sidePanel.setPanelBehavior({
    openPanelOnActionClick: true,
  });
});
