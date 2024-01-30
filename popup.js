document.getElementById("detectButton").addEventListener('click' , ()=>{
alert("Hello jii kys")
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  alert("hess mil gya")
  if (message.action === "displayResults") {
    const resultsElement = document.getElementById("results");
    resultsElement.innerHTML = formatResults(message.results);
  }
});
});
// (Implement `formatResults` to display results appropriately)
