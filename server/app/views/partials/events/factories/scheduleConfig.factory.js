
/*
 Data formatting factory for an event schedule
 */
app.factory('scheduleConfig', ['$http', function($http) {

    return {

        // function takes in event ID and UI Grid arrays with time slot info populated
        formatSchedule: function (uglySchedule, gridCols, gridData) {

            // empty variables for storing data
            var schedDetails = {};

            // store schedule ID in case it is saved
            schedDetails.id = uglySchedule._id;

            //sort schedule by company name
            uglySchedule.interviewer.sort(function (a, b){
                if (a.company < b.company){
                    return -1;
                } else if (a.company > b.company) {
                    return 1;
                }
                return 0;
            });
            console.log(uglySchedule);
            // iterate over the interviewer array within the response
            // create various arrays and objects to meet UI Grid data requirements
            uglySchedule.interviewer.forEach(function (item, pos) {

                // push the company and interviewer name into the column names array
                // this will be the column header for a particular interviewer
                gridCols.push({ 
                    name: item.company + ' / ' + item.fName,
                    field: item.company + '_' + item.fName,
                    enableColumnMenu: false,
                    cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex) {
                        if (grid.getCellValue(row,col).trim() === 'Break' || grid.getCellValue(row,col) === 'Unavailable') {
                            return 'breakCell';
                        }
                    },
                    width: 200,
                    displayName: item.company + ' / ' + item.fName
                });

                // set the scheduled object to a variable
                // this object contains the entire schedule for an interviewer
                var sched = item.scheduled;

                // initiate an empty students array
                // this will be used to store the formatted schedule for each company
                var students = [];

                // iterate over the scheduled object using the getOwnPropertyNames method
                Object.getOwnPropertyNames(sched).forEach(function (elem, index, array) {

                    // create an array of objects that contains each scheduled item
                    // this array will contain the formatted schedule for an interviewer
                    titleObj = {};
                    titleObj[item.company + '_' + item.fName] = sched[elem];
                    students.push(titleObj);
                });

                // push the updated schedule array into the master gridData array
                gridData.push(students);
            });

            // gridData is still not correctly formatted
            // each item represents an interviewer column
            // when in fact, UI Grid requires each item in the array to be a row of data
            // Underscore unzip function performs necessary matrix transformation
            gridData = _.unzip(gridData);

            // initiate empty array to store each row as an object of objects
            var gridArr = [];

            // iterate over unzipped gridData
            gridData.forEach(function (item, pos) {

                // initiate empty object for storing individual schedule items
                var rowObj = {};

                // iterate over the schedule row
                // each item in the row array represents a single cell in the grid
                item.forEach(function (elem, index) {
                    // use Underscore extend method to "push" each item into row object
                    _.extend(rowObj, elem);
                });

                // push the row object into the previously initiated grid array
                gridArr.push(rowObj);
            });

            gridData = gridArr;

            schedDetails.cols = gridCols;
            schedDetails.data = gridData;

            return schedDetails;
        }
    };
}]);