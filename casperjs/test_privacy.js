var casper = require('casper').create({
//    verbose: true,
//    logLevel: 'debug',
    clientScripts: ['lib/jquery-2.0.2.min.js']
});
//var utils = require('utils');
var jsvars;

casper.start('http://www.norgren.com/uk', function() {
    this.echo('Getting window and document objects for javascript testing');
    jsvars = casper.evaluate(function() {
        var funcs = {
            appendChild: [],
            insertBefore: [],
            replaceChild: [],
            removeChild: []
        };
        $('*').each(function(index, value) {
            for (var prop in funcs) {
                funcs[prop].push(value[prop] + '');
            }
        });
        return {
            window: window,
            document: document,
            funcs: funcs
        };
    });
    this.echo('page elements and stuff gotten.... lets test!');
});


casper.then(function testBootstrapperAndPrivacy() {
    this.echo('testing if bootstrapper and privacy are working on the page');
    var Bootstrapper = jsvars.window['Bootstrapper'];
    this.test.assertTruthy(Bootstrapper, 'bootstrapper exists');
    this.test.assertTruthy(Bootstrapper.enablePrivacy, 'privacy enabled');
    this.test.assertTruthy(Bootstrapper.gateway, 'privacy exists');
});

casper.then(function testOverriddenFunctions() {
    this.echo('making sure necessary element functions have been taken over properly');
    var nativeFuncRegex = new RegExp("function\\s+.+?\\(\\s*\\)" + "\\s*{\\s*\\[native code\\]\\s*}");
    for (var prop in jsvars.funcs) {

        var functionName = prop;
        var passed = true;
        for (var tmp in jsvars.funcs[prop]) {
            passed = !nativeFuncRegex.test(tmp);
        }
        if (passed) {
            this.test.pass(functionName + " usurped for all elements");
        } else {
            this.test.fail(functionName + " not usurped for all elements");
        }
    }
});

//casper.then(function testUIDialogExists() {
//    var link = casper.evaluate(function () {
//        var overlaylink = $('a.privacysettingslink');
//        overlaylink.click();
//        return overlaylink;
//    });
//    this.test.assertTruthy(link, 'overlay link exists');
//});

casper.run(function() {
    var numFunctionsToCheck = Object.keys(jsvars.funcs).length;
    this.test.done(numFunctionsToCheck + 3); // checks that some number of assertions have been executed

    this.test.renderResults(true);
});
