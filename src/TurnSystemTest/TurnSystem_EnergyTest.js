// specific to html test file
// http://codetheory.in/weighted-biased-random-number-generation-with-javascript-based-on-probability/
var rand = function (min, max) {
    return Math.random() * (max - min) + min;
};
var getRandomItem = function (list, weight) {
    var total_weight = weight.reduce(function (prev, cur, i, arr) {
        return prev + cur;
    });
    var random_num = rand(0, total_weight);
    var weight_sum = 0;
    //console.log(random_num)     
    for (var i = 0; i < list.length; i++) {
        weight_sum += weight[i];
        weight_sum = +weight_sum.toFixed(2);

        if (random_num <= weight_sum) {
            return list[i];
        }
    }
    // end of function
};

function GamefieldParameters(in_horSym, in_verSym, in_symSz) {
    /**
     * number of symbols: horizontal and vertical direction
     */
    this.horizontalFieldSz = in_horSym;
    this.verticalFieldSz = in_verSym;
    /**
    * size of font in pixels
    */
    this.fontSz = in_symSz;
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

function GamefieldRenderer() {
    
    /**
    * completely fill the gamefield
    */
    this.renderGamefieldComplete = function () {
        //draw_character([5, 3, ',', 'rgb(0,0,255)', 'rgb(0,0,0)']);
        for (var hor = 0; hor < instGamefield.horizontalFieldSz; hor++) {
            for (var ver = 0; ver < instGamefield.verticalFieldSz; ver++) {
                draw_character([hor, ver, '.', 'rgb(0,0,0)']);
            }
        }
    }
    
}