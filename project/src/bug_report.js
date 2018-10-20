'use strict;'
// Just for test Webpack bundling
let version = require('./version');
//version();

var _bugReportAdditionalMessage = (!(typeof bugReportAdditionalMessage === 'undefined')) ?
    bugReportAdditionalMessage : 'Поясните дополнительно и укажите контактные данные, если хотите.';

class BugReport {
    static get additionalMessage() { return _bugReportAdditionalMessage; }
    static set additionalMessage(value) { _bugReportAdditionalMessage = value; }
    static sayThanks(show=true){
        var bugReportThanksArea = document.getElementById("bug_report_thanks");
        var bugReportFormArea = document.getElementById("bug_report_form");
        if (bugReportThanksArea){
            bugReportThanksArea.style.visibility = show ? 'visible' : 'hidden';
        }
        if (bugReportFormArea){
            bugReportFormArea.style.visibility = show ? 'hidden': 'visible';
        }
        if (!show) return;
        setTimeout(function() { BugReport.sayThanks(false); }, 3000);
    }
    static getReport(event){
        var selectedText = window.getSelection().toString();
        if (!selectedText) return;
        var message = window.location.href +
                      '\n\n ' +
                      selectedText +
                      '\n\n ' +
                      BugReport.additionalMessage;
        var userPrompt = prompt(message, "");
        if (userPrompt != null) {
            BugReport.sayThanks();
            BugReport.sendReport(message + ':' + userPrompt, true); // honest send: message + user_prompt
            return;
        }
        // force send of uncertain user unprompted message : message + user_message
        BugReport.sendReport(message, false);
    }
    static sendReport(text, honestMarker){
        // send realization
        // alert('SEND: ' + text);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", '/bug_report', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            text: text,
            honestMarker: honestMarker,
        }));
        // check OK
    }
}
var autoLoad = function() {
    var button = document.getElementById("bug_report_button");
    button.onclick = BugReport.getReport;
}
if (window.onload) {
    window.onload = function(){
        window.onload();
        autoLoad();
    }
} else {
    window.addEventListener('load', autoLoad, false);
}
