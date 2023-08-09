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
// http://codetheory.in/weighted-biased-random-number-generation-with-javascript-based-on-probability/
// https://stackoverflow.com/questions/5915096/get-a-random-item-from-a-javascript-array
var get_random = function (list) {
    return list[Math.floor((Math.random() * list.length))];
};