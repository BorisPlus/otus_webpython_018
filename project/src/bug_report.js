let _templateIdInstruction = "bug_report_instruction";
let _templateIdButton = "bug_report_button";
let _templateIdThanks = "bug_report_thanks";

class BugReport {
    // static methods
    static get idInstruction() { return _templateIdInstruction; }
    static get idButton() { return _templateIdButton; }
    static get idThanks() { return _templateIdThanks; }

    // make names of containers by templates
    getInstructionId() { return this.name ? this.name + "_" + BugReport.idInstruction : BugReport.idInstruction; }
    getButtonId() { return this.name ? this.name + "_" + BugReport.idButton : BugReport.idButton; }
    getThanksId() { return this.name ? this.name + "_" + BugReport.idThanks : BugReport.idThanks; }

    constructor(name, promptMessage) {
        this.name = name || "";
        this.promptMessage = promptMessage || "Оставте комментарий и контакт для связи с Вами, если хотите.";
        // auto binding
        this._bind()
    }

    // bind BugReport object to containers at page
    _bind() {
        let button = document.getElementById(this.getButtonId());
        if (!button) return;
        let that = this;
        button.onclick = function() { that.getReport(); }
        // button.addEventListener('onclick', function() { that.getReport(); }, false)
    }

    getReport() {
        let selectedText = window.getSelection().toString();
        if (!selectedText) return;
        var message = window.location.href + "\n\n " + selectedText + "\n\n " + this.promptMessage;
        var userPrompt = prompt(message, "");
        if (userPrompt != null) {
            this.sayThanks();
            this.sendReport(message + ':' + userPrompt, true); // honest send: message + user_prompt
            return;
        }
        // I wanna know all attempts
        // force send of uncertain user unprompted message : message + user_message
        this.sendReport(message, false);
    }

    sayThanks(show=true) {
        // hide or swow thanksContainer
        var thanksContainer = document.getElementById(this.getThanksId());
        if (thanksContainer){
            thanksContainer.style.visibility = show ? 'visible' : 'hidden';
        }
        // hide or swow instructionContainer
        var instructionContainer = document.getElementById(this.getInstructionId());
        if (instructionContainer){
            instructionContainer.style.visibility = show ? 'hidden': 'visible';
        }
        // hide or swow buttonContainer
        var buttonContainer = document.getElementById(this.getButtonId());
        if (buttonContainer){
            buttonContainer.style.visibility = show ? 'hidden': 'visible';
        }
        //
        if (!show) return;
        var that = this;
        setTimeout(function() { that.sayThanks(false); }, 3000);
    }
    sendReport(text, honestMarker){
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
};

// default BugReport object
let bug_report = new BugReport();

export {BugReport};
