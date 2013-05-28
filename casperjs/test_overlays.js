var casper = require('casper').create({
//    verbose: true,
//    logLevel: 'debug',
    clientScripts: ['lib/jquery.min.js']
});
//var utils = require('utils');
var jsvars;

//http://www.motorolasolutions.com/FR-FR/Home
//http://www.quest.com/legal/privacy.aspx?inEU=true

casper.start('http://www.dell.se');

casper.then(function startFunction() {
    this.echo('Getting window and document objects for javascript testing....');
    jsvars = casper.evaluate(function evaluatePageFunction() {
        window.Bootstrapper.privacyDialog.expand();
        return {
            window: window,
            document: document,
            cookie: document.cookie
        }
    });
    var bs = jsvars.window['Bootstrapper'];
    this.test.assertTruthy(bs, 'Bootstrapper loaded');
    this.test.assertTruthy(bs.privacyDialog, 'privacy dialog loaded');
});

casper.then(function checkCookies() {
    var cookie = casper.evaluate(function () {
        __utils__.echo(document.cookie);
        return document.cookie;
    });

    var cookies = cookie.split(/\s*;\s*/);
    this.echo("cookie: " + jsvars.cookie);
    var isCookieSet = false;
    for (var idx in cookies) {
        var str = cookies[idx];
        if (/ENSIGHTEN/.test(cookies[idx])) {
            casper.test.pass("cookie set to: " + str);
            isCookieSet = true;
        }
    }
    if (isCookieSet) {
        casper.test.pass("cookies have been properly set by overlay");
    } else {
        casper.test.fail("no cookies set for Ensighten on this domain");
    }
});

casper.run(function () {
//    this.test.done(5); // checks that 5 assertions have been executed

    this.test.renderResults(true);
});
