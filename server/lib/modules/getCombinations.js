var random = require('./getRandomInt');

var combinations = {
    generate: function(interviewers, students, event){
        var eventId = event._id;
        var combinations = [], l = students.length, lng = l;

        while(l){
            var student = students[lng-l--], i = interviewers.length, ing = i, studentId = student._id.toString();
            while(i){

                var interviewer = interviewers[ing-i--],
                    interviewerId = interviewer._id.toString(),
                    unavail = interviewer.unavailable,
                    eventUnavail,
                    interviewerWeight = 0,
                    studentWeight = 0;

                for(var prop in unavail){
                    if(prop == eventId){
                        eventUnavail = unavail[prop];
                    }
                }

                event.interviewerWeight.some(function(elem){
                    var thisStudent = elem.studentId.toString(),
                        thisInterviewer = elem.interviewerId.toString();

                    if(interviewerId == thisInterviewer
                   && studentId == thisStudent){
                       interviewerWeight = elem.weight;
                       return true;
                   }
                });

                event.studentWeight.some(function(elem){
                    var thisStudent = elem.studentId.toString(),
                        thisInterviewer = elem.interviewerId.toString();

                   if(studentId == thisStudent
                   && interviewerId == thisInterviewer){
                       studentWeight = elem.weight * 5;
                       return true;
                   }
                });

                var combination = {
                    name: interviewer.fName,
                    company: interviewer.company,
                    student: student.fName + ' ' + student.lName,
                    weight: studentWeight + interviewerWeight,
                    unavailable: eventUnavail,
                    interviewerID: interviewer._id
                };

                combinations.push(combination)
            }
        }
        return combinations;
    }
};

module.exports = combinations;