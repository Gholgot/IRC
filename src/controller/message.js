module.exports = class Modal {
    
    constructor(parameters = {}) {
        if (parameters.html != undefined) {
            this.html = paramaters.html;
        }
        if (parameters.type != undefined) {
            this.type = parameters.type;
        }
    }

    show() {
        
    }    
}
