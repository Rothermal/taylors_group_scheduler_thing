var shuffle = require('./shuffle');
var sort = require('./sortByNum');
var match = require('hopcroft-karp');

var scheduler = {
    //sort keys of schedule before returning object
    sortKeys: function(object){
        var ordered = {};
        Object.keys(object).sort(function(a, b){
            if(a < b){
                return 1;
            }
            if(a > b){
                return -1;
            }
            return 0;
        }).forEach(function(key){
            ordered[key] = object[key];
        });
        return ordered;
    },
    //this fills in 'break' where there were no possible scheduled interviews
    fillGaps: function(scheduled, interviewSlots){
        while(interviewSlots){
            if(!scheduled['slot' + interviewSlots]){
                scheduled['slot' + interviewSlots] = 'Break';
            }
            interviewSlots--;
        }
        return scheduled;
    },
    //this populates an array with the required interview slots and randomizes the order
    getSlots: function(interviewSlots){
        var array = [], i=1;
        while(interviewSlots--){
            array.push(i);
            i++;
        }
        array = shuffle.get(array);
        return array;
    },
    //matches interviews
    match: function(interviewSlots, interviewers, students){
        var slots = scheduler.getSlots(interviewSlots);
        var l = slots.length;
        var schedule = {};
        var counter = {};
        var available = {};
        var maxInterviews = l - 2;

        // create the initial object of available pairs of interviewer / students
        interviewers.forEach(function(interviewer) {
            var currentInterviewer = interviewer.fName + ' - ' + interviewer.company;
            available[currentInterviewer] = {};
            available[currentInterviewer] = students.map( (student) = student.fName + ' ' + student.lName );
            available[currentInterviewer].company = interviewer.company;
            // randomize the array
            available[currentInterviewer] = shuffle.get(available[currentInterviewer]);
        });
        
        // build the counter object for tracking student scheduled interviews
        students.forEach(function(student){
            var fullName = student.fName + ' ' + student.lName;
            counter[fullName] = {}; 
            counter[fullName].interviews = 0;
            counter[fullName].companies = {};
        });
        // while there are interview slots remaining...
        while(l--){
            // grab the current slot to schedule
            var currentSlot = slots[0];
            
            // find the maximum matching available for this slot
            schedule['slot' + currentSlot] = match.hopcroftKarp(available);
            var slot = schedule['slot' + currentSlot];
            
            // remove the selected matches for this slot from the available pairs
            for(interviewer in slot){
                var interviewerAvail = available[interviewer];
                var scheduledStudent = slot[interviewer];
                interviewerAvail.forEach(function(student, index){
                    if(student == scheduledStudent && scheduledStudent !== null) {
                        interviewerAvail.splice(index, 1);
                    }
                });
                
                // increment the student interview counter and add the company 
                if(counter[scheduledStudent]){
                    counter[scheduledStudent].interviews++; 
                    var scheduledCompany = available[interviewer].company;
                    counter[scheduledStudent].companies[scheduledCompany] = counter[scheduledStudent].companies[scheduledCompany] + 1 || 1;     
                }
               
            }
        

            // iterate through the counter and remove students that have received max interview count
            for (student in counter) {
                if(counter[student].interviews >= maxInterviews && counter[student].interviews !== null){
                    for(interviewer in available){
                        available[interviewer].forEach(function(availStudent, index){
                            if(student == availStudent) {
                                available[interviewer].splice(index, 1);
                            }
                        })
                    }
                }
            }
            
            // iterate through the counter and remove avails if the student has already been with this company twice
            for(interviewer in available){
                var currentCompany = available[interviewer].company;
                available[interviewer].forEach(function(student, index){
                    if(counter[student].companies[currentCompany]){
                        available[interviewer].splice(index, 1);
                    }
                })
            }
            slots.splice(0, 1);
        }
        console.log(counter);

        // reformat the schedule to be the way the front end likes it (TODO refactor the front end but i'm tired)
        interviewers.forEach(function(interviewer){
            var iName = interviewer.fName + ' - ' + interviewer.company;
            for(slot in schedule) {
                for(name in schedule[slot]) {
                    if(name == iName){
                        interviewer.scheduled[slot] = schedule[slot][name];
                    }
                }
            }
        });

        // sort slots in schedule before returning
        interviewers.forEach(function(interviewer){
            interviewer.scheduled = scheduler.sortKeys(interviewer.scheduled);
        });

        return {interviewer: interviewers};
    }
};



module.exports = scheduler;