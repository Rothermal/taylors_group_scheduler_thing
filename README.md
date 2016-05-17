# Interview App for Prime Academy

A simple app for generating a schedule pairing Prime Academy students with interested companies. End results will resemble this but INTERNET-IFIED:

![Whiteboard schedule](http://i.imgur.com/bgxBY3Z.jpg)

## Problem
- Through mailchimp email anyone tagged as a recruiter to get them signed up for Mock Interviews.
- Keeping track of who RSVP’d in a Google spreadsheet manually.
- Taylor manually sorts the responses by what type of position they’re hiring for (back end, front end, JS, etc). 
- Matches students with recruiters based on their interests. 
- 15+ actual people here reviewing. 
- Each student meets with at least 5 people. 
- There can be more than one person from more than one company. Can be a recruiter and a sales person for example.
- Invariably, someone calls and drops out. Then the entire board has to be redone from the ground up.
- Each slot is 20 minutes. For example, 1:00 to 1:20. This includes time for breaks.

## Some functionality
- There should be matches that favor the student’s preferences.
- Profiles for recruiters? Students can review and rate to better make matches.
- When we hit “go” it sorts and we’re done. If someone drops out, we can remove them and rerun it.
- Admin should be able to enter employer preferences of who they’re interested in interviewing the most.
- Employers may have ranking preferences too. This may be manually entered information entered by admin.
- What if there are time slots recruiters can’t attend? They should have slots entered like a virtual calendar. 
- Admin interface could be super simple. Perhaps a grid of students/companies, and then rankings in the intercepts.

## MVP
- Manually enter rankings of: students preferences on companies/recruiters and employers preferences of everyone they want to meet.
- You take the student’s interest in the recruiters + the recruiters ranking on the students as the weight.
- “Calendar” grid generation, and regeneration when data changes.
- Students can overlap times, obviously.
- Once day has begun, there is no regeneration.
- Students should have an equivalent number of interviews. Make it completely equal, and leave gaps to Taylor can fill in extras (by hand to start with).
- Blackout slots in case the recruiter can’t be there the whole time

## Stretch
- Allow students to rank their preferences on companies/recruiters via some interface that’s linked out to students. 
- Company Bios.
- Export to CSV.
- Web view of schedule as a calendar
- Sending google invites for meetings

## Project Details
Prime Digital Academy Assignment  
Team Programming Project  
Team: [Matt Brown](https://github.com/brow1726), [Vas Leckas](https://github.com/vleckas), [Jason Spidle](https://github.com/panoptican), [Brendan Telzrow](https://github.com/PsychicCat)  
Technologies: JavaScript, Angular, Node.js, Exress.js, MongoDB, Underscore.js   
Instructor: [Joseph Szczesniak](https://github.com/NukaPunk) and [Antoinette Smith](https://github.com/antauth)
