
export class MessageService {
    static messageDivHtmlObject = null;
    static initMessageDiv(absoluteHeight, absoluteWidth) {
        const gameDiv = document.getElementById("game-common");
        const newDiv = document.createElement("div");
        newDiv.id = "messages";
        newDiv.style.height = absoluteHeight;
        newDiv.style.width = absoluteWidth;
        this.messageDivHtmlObject = gameDiv.appendChild(newDiv);
    }
    static addMessage(textMsg) {
        this.messageDivHtmlObject.prepend(textMsg);
    }
}