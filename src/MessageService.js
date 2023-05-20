
export class MessageService {
    static messageDivHtmlObject = null;
    static directionsDivHtmlObject = null;
    static initMessageDiv(absoluteHeight, absoluteWidth) {
        const gameDiv = document.getElementById("game-common");
        const newDiv = document.createElement("div");
        newDiv.id = "messages";
        newDiv.style.height = absoluteHeight;
        newDiv.style.width = absoluteWidth;
        this.messageDivHtmlObject = gameDiv.appendChild(newDiv);
    }
    static initDirectionsDiv(canvasW, canvasH) {
        const gameDiv = document.getElementById("game-common");
        const newDivTopLevel = document.createElement("div");
        var newPositionH = (canvasH) / 2 - (32 * 3) / 2;
        var newPositionW = (canvasW) / 2 - (32 * 3) / 2;
        newDivTopLevel.id = "directions";
        newDivTopLevel.style.top = newPositionH;
        newDivTopLevel.style.left = newPositionW;            

        const newDivLeft = document.createElement("div");
        newDivLeft.id = "direction-left"
        newDivTopLevel.appendChild(newDivLeft);
        const newDivRight = document.createElement("div");
        newDivRight.id = "direction-right"
        newDivTopLevel.appendChild(newDivRight);

        const newDivUp = document.createElement("div");
        newDivUp.id = "direction-top"
        newDivTopLevel.appendChild(newDivUp);
        const newDivDown = document.createElement("div");
        newDivDown.id = "direction-bottom"
        newDivTopLevel.appendChild(newDivDown);

        this.directionsDivHtmlObject = gameDiv.appendChild(newDivTopLevel);
    }

    static toggleDirectionsDisplay() {
        if ((this.directionsDivHtmlObject.style.display === "none")|| (this.directionsDivHtmlObject.style.display === "")) {
            this.directionsDivHtmlObject.style.display = "block";
    } else {
            this.directionsDivHtmlObject.style.display = "none";
    }
    }

    static addMessage(textMsg) {
        const newDiv = document.createElement("div");
        newDiv.className = "singlemessage";
        newDiv.textContent = textMsg;
        this.messageDivHtmlObject.prepend(newDiv);
    }
}