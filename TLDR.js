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
       message.innerHTML = tldr(request.source);
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
    var topSentence = "<ul>"; //can be expanded to a list of sentences for TLDR to output
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

    var sentenceRankings = [];

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
            sentenceRankings.push([dataInSentences[i], sentencePointTotal, i]);
        }
    }



    sentenceRankings = sentenceRankings.sort(sortByRating);
    sentenceRankings = sentenceRankings.slice(0,5);
    sentenceRankings = sentenceRankings.sort(sortByChrono);

    sentenceRankings.forEach(function (value) { topSentence += "<li>"+value[0]+"</li>" })
    return(topSentence + "</ul>");
    //Console.log(freqMap);
}



function sortByRating(s1, s2){
    return s2[1] - s1[1];
}

function sortByChrono(s1, s2) {
    return s1[2] - s2[2];
}

