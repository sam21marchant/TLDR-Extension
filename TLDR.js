document.addEventListener('DOMContentLoaded', function() {
    var startButton = document.getElementById('startTLDR');
    //fetch data
    startButton.addEventListener('click',function() { //starts TLDR progess, write algorithm here

        //var myHeading = document.querySelector('h1');
        //myHeading.textContent = 'Hello world';
    })
});

function tldr(html) {
    var htmlData = ["the", "big", "dog", "dog"]; //break up incoming data, split by space to get list of words
    var freqMap = new Map([]);

    for(var i = 0; i < htmlData.length; i++) {
        var key = htmlData[i];
        if(freqMap.has(key)) {
            var newVal = freqMap.get(key) + 1;
            freqMap.set(key,newVal);
        }
        else {
            freqMap.set(key, 1);
        }
    }
    Console.log(freqMap);
}