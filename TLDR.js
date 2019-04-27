document.addEventListener("DOMContentLoaded", function () {
    message = document.getElementById("URL");
    document.getElementById("startTLDR").addEventListener("click", getThisPage);
})

chrome.runtime.onMessage.addListener(function (request, sender) {
    if(request.action == "getSource"){
        //message.innerHTML = request.source;
       // message.innerText = request.source;
        //console.log(message.innerText);
        //message.innerHTML = "Success!";
       message.innerHTML = "Ready? " + tldr(request.source);
    }
});



function getThisPage() {
    chrome.tabs.executeScript(null, {file: "getSourceHTML.js"});
}



//given a string including the whole text
function tldr(html) {
    var wordData = html.split(' '); //splits by space and converts to lowercase //removes special chars
    //var separators = ['.', '!', '?'];
    //var reg = new RegExp(separators.join('|'), 'g');
    var dataInSentences = html.match( /[^\.!\?]+[\.!\?]+/g );

    var freqMap = {}; //stores words with the # of times they're said
    var topSentence = "default"; //can be expanded to a list of sentences for TLDR to output
    var topValue = -1;

    for(var i = 0; i < wordData.length; i++) { //fills map with words and the frequency of them
        wordData[i] = wordData[i].toLowerCase();
        wordData[i] = wordData[i].replace(/[.,?!&:()""]/g,"");
        var key = wordData[i];

        if(key in freqMap) {
            freqMap[key] += 1;
        }
        else {
            freqMap[key] = 1;
        }
    }

    //check words in sentence, find point total
    //sentence with highest point total goes in TLDR
    for(var i = 0; i < dataInSentences.length; i++) {
        var sentencePointTotal = 0;
        if(dataInSentences[i].length !== 0) {
            var cleanedSentence = dataInSentences[i].replace(/[.,?!&:()""]/g, "");
            cleanedSentence = cleanedSentence.toLowerCase();
            var listOfWords = cleanedSentence.split(' '); //list of words in THIS sentence
            for (var j = 0; j < listOfWords.length; j++) { //for each word in the list of words
                if (listOfWords[j] in freqMap) {
                    sentencePointTotal += freqMap[listOfWords[j]]; //if the word is in our map, assign freq as a point
                }
            }
            if (topValue === -1 || sentencePointTotal > topValue) { //there has never been a topSentence assigned or there is a higher point total sentence
                topValue = sentencePointTotal;
                topSentence = dataInSentences[i];
            }
        }
    }
    return(topSentence);
    //Console.log(freqMap);
}

