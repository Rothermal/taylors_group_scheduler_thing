var sortByNum = {
    high: function(array){
        return array.sort(function compareNumbers(a,b){
            if(a.weight < b.weight){
                return 1;
            }
            if(a.weight > b.weight){
                return -1;
            }
            return 0;
        })
    },
    low: function(array){
        return array.sort(function compareNumbers(a,b){
            if(a.weight > b.weight){
                return 1;
            }
            if(a.weight < b.weight){
                return -1;
            }
            return 0;
        })
    }
};

module.exports = sortByNum;