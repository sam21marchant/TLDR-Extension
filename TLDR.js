document.addEventListener('DOMContentLoaded', function() {
    var startButton = document.getElementById('startTLDR');
    //fetch data
    startButton.addEventListener('click',function() { //starts TLDR progess, write algorithm here

        //var myHeading = document.querySelector('h1');
        //myHeading.textContent = 'Hello world';
    })
});

function getSiteData(url) {
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var request = new XMLHttpRequest();
    request.onreadystatechange=function() {
        if (this.readyState == 4 && this.status == 200) {
            tldr(this.responseText)
            //var webData = this.response
        }
    };
    request.open("GET", url, true);
    request.send();
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