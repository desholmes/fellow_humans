/*! fellow_humans - v0.0.1 by Des Holmes (@whodadada) */
(function() {
    // performance vars
    var p1, p2, numberOfMatches = 0;
    // start performance timer
    p1 = performance.now();
    //Native tree walker from:
    // http://stackoverflow.com/questions/2579666/getelementsbytagname-equivalent-for-textnodes
    var getTextNodesCollection = function() {
        var node, textNodes = [], walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, // select only text nodes
        null, false);
        while (node = walker.nextNode()) {
            textNodes.push(node);
        }
        return textNodes;
    };
    var init = function() {
        // replace instances in page title
        document.title = replaceInstances(document.title);
        // fetch all text nodes
        var textNodes = getTextNodesCollection();
        // itterate through and replace instances in text nodes
        for (var i = 0; i < textNodes.length; i++) {
            textNodes[i].nodeValue = replaceInstances(textNodes[i].nodeValue);
        }
    };
    var replaceInstances = function(text) {
        // only replace if we have a match
        if (text.match(/migrant/gi)) {
            numberOfMatches += 1;
            text = text.replace(/migrant/g, "fellow human");
            text = text.replace(/Migrant/g, "Fellow Human");
        }
        return text;
    };
    // let's get started!
    init();
    // end performance timer
    p2 = performance.now();
    // show number of instances replaced and time taken
    console.log("_FHMS replaced " + numberOfMatches + " instances of 'migrant' in " + Math.round(p2 - p1) + " milliseconds.");
})();