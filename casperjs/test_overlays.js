var casper = require('casper').create({
    verbose: true,
    logLevel: 'debug',
    clientScripts: ['lib/jquery-2.0.2.min.js']
});
//var utils = require('utils');
var jsvars;
//http://www.motorolasolutions.com/FR-FR/Home
//http://www.quest.com/legal/privacy.aspx?inEU=true

//casper.start('http://www.motorolasolutions.com/FR-FR/Home');
//casper.start('http://www.quest.com/legal/privacy.aspx?inEU=true');
casper.start('http://www.dell.se');

casper.wait(1000,function startFunction() {
    this.echo('Getting window and document objects for javascript testing....');
    jsvars = casper.evaluate(function evaluatePageFunction() {
        return {
            window: window,
            document: document,
            cookie: document.cookie,
            mini_overlay: $('div').filter(function() {return this.id.match(/ENS_mini$/);}).eq(0).length,
            overlay_link: $('.privacysettingslink').eq(0).length
        }
    });
});

casper.then(function testOverlays() {
    if (jsvars.mini_overlay) {
        casper.test.pass("mini overlay found");
    }
    if (jsvars.overlay_link) {
        casper.test.pass("overlay link found");
    }
    if (!(jsvars.overlay_link || jsvars.mini_overlay)) {
        casper.test.fail("could not find any privacy link or mini overlay on this page");
    }

    var bs = jsvars.window['Bootstrapper'];
    this.test.assertTruthy(bs, 'Bootstrapper loaded');
    this.test.assertTruthy(bs.privacyDialog, 'privacy dialog loaded');
});

casper.wait(1000, function checkCookies() {
    var cookies = jsvars.cookie.split(/\s*;\s*/);
    this.log("cookie: " + jsvars.cookie, 'debug');
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
        this.log("no cookies set for Ensighten on this domain", 'warn');
        this.echo("WARNING: no cookies set for Ensighten on this domain.  This may be the expected case for the opt-in/explicit use cases.");
    }
});

casper.run(function () {
    this.test.done(); // checks that 5 assertions have been executed

    this.test.renderResults(true);
});