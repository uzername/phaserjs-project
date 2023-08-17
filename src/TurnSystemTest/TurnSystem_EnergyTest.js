// specific to html test file

// canvas got blurry...
var PIXEL_RATIO = (function () {
    var ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
              ctx.mozBackingStorePixelRatio ||
              ctx.msBackingStorePixelRatio ||
              ctx.oBackingStorePixelRatio ||
              ctx.backingStorePixelRatio || 1;

    return dpr / bsr;
})();

var setHiDPICanvas = function(canvas, w, h, ratio) {
    if (!ratio) { ratio = PIXEL_RATIO; }
    var can = canvas;
    can.width = w * ratio;
    can.height = h * ratio;
    can.style.width = w + "px";
    can.style.height = h + "px";
    can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
}


class GamefieldParameters {
    constructor(in_horSym, in_verSym, in_symSz) {
        /**
         * number of symbols: horizontal and vertical direction
         */
        this.horizontalFieldSz = in_horSym;
        this.verticalFieldSz = in_verSym;
        /**
        * size of font in pixels
        */
        this.fontSz = in_symSz;
        this.gamefieldFontWeight = "bold";
        this.gamefieldFontName = "monospace";
        /**
        * width of symbol displayed on canvas. Calculated in main_init, should not be changed by user
        */
        this.symbolWidth = 0;
        /**
        * here is stored canvas JS object
        */
        this.canvasItm = null;
        this.canvasCtx = null;
    }
}
// it is for rencering map or part of it on canvas. Map is in energyActionResolverInst.CurrentMap
class GamefieldRenderer {
    constructor() {
        /**
        *cached pre-rendered fragments
        */
        this.gamefieldCache = [];

        /**
        *graphical renderer
        */
        this.instGamefield = new GamefieldParameters(80, 25, 15);
        this.instGamefield.canvasItm = document.getElementById("gamefield");
        this.instGamefield.canvasCtx = this.instGamefield.canvasItm.getContext('2d');
        this.instGamefield.canvasCtx.font = "" + this.instGamefield.gamefieldFontWeight + " " + this.instGamefield.fontSz + "px " + this.instGamefield.gamefieldFontName;
        this.instGamefield.symbolWidth = Math.ceil(this.instGamefield.canvasCtx.measureText("W").width);
        this.instGamefield.canvasItm.width = this.instGamefield.horizontalFieldSz * this.instGamefield.symbolWidth;
        this.instGamefield.canvasItm.height = this.instGamefield.verticalFieldSz * this.instGamefield.fontSz;
        setHiDPICanvas(this.instGamefield.canvasItm, this.instGamefield.horizontalFieldSz * this.instGamefield.symbolWidth, this.instGamefield.verticalFieldSz * this.instGamefield.fontSz);
        /**
        * How to render objects on field
        */
        this.allTiles = {
            actors: [{ type: "gardengnome", fg: 'rgb(0,0,0)', bg: 'rgb(255,255,255)', sym: 'g' },
            { type: "badbug", fg: 'rgb(0,0,0)', bg: 'rgb(255,255,255)', sym: 'b' },
            { type: "fineflower", fg: 'rgb(0,0,0)', bg: 'rgb(255,255,255)', sym: 'f' }],
            terrain:
                [{ type: "ground", fg: 'rgb(0,0,0)', bg: 'rgb(255,255,255)', sym: '.' },
            { type: "water", fg: 'rgb(0,0,0)', bg: 'rgb(255,255,255)', sym: '~' },
            { type: "wall", fg: 'rgb(0,0,0)', bg: 'rgb(255,255,255)', sym: '#' }]
        }
    }
    /**
    * completely fill the gamefield
    */
    renderGamefieldComplete() {
        console.log(this.instGamefield);
        //draw_character([5, 3, ',', 'rgb(0,0,255)', 'rgb(0,0,0)']);
        for (var hor = 0; hor < this.instGamefield.horizontalFieldSz; hor++) {
            for (var ver = 0; ver < this.instGamefield.verticalFieldSz; ver++) {
                var tileIndex = energyActionResolverInst.CurrentMap[ver][hor];
                //console.log(hor, ver);
                this.draw_character([hor, ver, this.allTiles.terrain[tileIndex].sym, this.allTiles.terrain[tileIndex].fg, this.allTiles.terrain[tileIndex].bg]);
            }
        }
    }

    renderActors() {
        energyActionResolverInst.turnSystem_EnergyInst.allActors.forEach((element) => {
            var hor = element.Xpos; var ver = element.Ypos;
            var tileIndex = element.tileIndex;
            this.draw_character([hor, ver, this.allTiles.actors[tileIndex].sym, this.allTiles.actors[tileIndex].fg, this.allTiles.actors[tileIndex].bg]);
            }
        );
    }
	/**
     * draw symbol on field. takes array data[]
     * data[0] - x coord; data[1] - y coord; data[2] - character; data[3] - string with 'rgb(...,...,...)' format for foreground; data[4] - background color
     * */
    draw_character(data) {
    var x = data[0];
    var y = data[1];
    var ch = data[2]; //character
    var fg = data[3]; //foreground color
    var bg = data[4]; //background color
    var hash = ""+ch+fg+bg;
	if ((x<0)||(x>this.instGamefield.horizontalFieldSz)||(y<0)||(y>this.instGamefield.verticalFieldSz)) {return;}
	if (hash in this.gamefieldCache) {
	    var canvasInternal = this.gamefieldCache[hash];
	} else {
	    //console.log('rendering character to canvas');
		//console.log(data);
	    var canvasInternal = document.createElement("canvas");
        var ctxInternal = canvasInternal.getContext("2d");
		canvasInternal.width = this.instGamefield.symbolWidth;
        canvasInternal.height = this.instGamefield.fontSz+1;
		ctxInternal.fillStyle = bg/*'rgb(100,100,100)'*/;
        ctxInternal.fillRect(0, 0, this.instGamefield.symbolWidth, canvasInternal.height);
		ctxInternal.fillStyle = fg;/*'rgb(80,0,0)'*/;
        ctxInternal.font = ""+this.instGamefield.gamefieldFontWeight+" "+this.instGamefield.fontSz+"px "+this.instGamefield.gamefieldFontName;
        ctxInternal.textAlign = "center";
        ctxInternal.textBaseline = "middle";
		        
		ctxInternal.fillText(ch, this.instGamefield.symbolWidth/2, Math.ceil(this.instGamefield.fontSz/2));
		
		this.gamefieldCache[hash] = canvasInternal;
	}
	//console.log(gamefieldCache);
	this.instGamefield.canvasCtx.drawImage(canvasInternal, x*this.instGamefield.symbolWidth, y*this.instGamefield.fontSz);
	}
}


/**
 * Entry point
 * */
function MainRoutine() {
    var instGamefieldRenderer = new GamefieldRenderer();
    // declared in TurnSystem_EnergyActionResolver.js . 
    energyActionResolverInst = new TurnSystem_EnergyActionResolver();

    instGamefieldRenderer.renderGamefieldComplete();
    instGamefieldRenderer.renderActors();
    //add there onclick event for NEXT TURN button
    document.getElementById("nextTurnBtn").onclick = function () {
        energyActionResolverInst.turnSystem_EnergyInst.nextStep();
        instGamefieldRenderer.renderGamefieldComplete();
        instGamefieldRenderer.renderActors();
    }
}

MainRoutine();