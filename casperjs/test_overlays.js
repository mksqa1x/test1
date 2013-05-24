var casper = require('casper').create({
//    verbose: true,
//    logLevel: 'debug',
    clientScripts: ['lib/jquery.min.js']
});
//var utils = require('utils');
var jsvars;

//http://www.motorolasolutions.com/FR-FR/Home
//http://www.quest.com/legal/privacy.aspx?inEU=true

casper.start('http://www.motorolasolutions.com/FR-FR/Home');

// attempt to wait a second for the page to fully load (dialogs load asynchronously)
casper.wait(1000, function startFunction() {
    this.echo('Getting window and document objects for javascript testing');
    var jsvars = casper.evaluate(function evaluatePageFunction() {
        return {
            window: window,
            document: document,
            bool: window.Bootstrapper.privacyDialog.expand
        }
    });
    var bs = jsvars.window['Bootstrapper'];
    this.test.assertTruthy(bs, 'Bootstrapper loaded');
    this.test.assertTruthy(bs.privacyDialog, 'privacy dialog loaded');
    this.echo(JSON.stringify(jsvars.bool));
});

casper.run(function() {
//    this.test.done(5); // checks that 5 assertions have been executed

    this.test.renderResults(true);
});
