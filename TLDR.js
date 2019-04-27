
chrome.runtime.onMessage.addListener(function (request, sender) {
    if(request.action == "getSource"){
        message.innerHTML = request.source;
    }
});



function getThisPage() {
    chrome.tabs.executeScript(null, {file: "getSourceHTML.js"}, function () {
        if(chrome.runtime.lastError){
            message.innerHTML = "Oops Something went wrong :(";
        }
    });

}

window.onload = function () {
    message = document.getElementById("URL");
    var button = document.getElementById("startTLDR");

    if (button != null){
        button.addEventListener("click", getThisPage, false);
    }
}










function tldr(html) {
    var wordData = ["big", "dog", "it","is","so","big"]; //break up incoming data, split by space to get list of words
    var dataInSentences = ["big dog.", "it is so uuge.", "people disagree it's big."];
    var freqMap = new Map([]); //stores words with the # of times they're said
    var badWords = ["in","a","an","the"];

    for(var i = 0; i < htmlData.length; i++) { //fills map with words and the frequency of them
        var key = htmlData[i];
        if(badWords.includes(key)) {

        }
        if(freqMap.has(key)) {
            var newVal = freqMap.get(key) + 1;
            freqMap.set(key,newVal);
        }
        else {
            freqMap.set(key, 1);
        }
    }

    //check words in sentence, find point total
    //sentence with highest point total goes in TLDR
    for(var i = 0; i < dataInSentences.length; i++) {
        var sentencePointTotal = 0;

    }
    Console.log(freqMap);
}