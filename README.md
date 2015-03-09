 # assign_05
 
In this lab session, I will learn to use the async series and parallel modules. I will learn to use the
powerful async module in Node.js to orchestrate asynchoronous file system calls.
In more details:
01.Given student-master records in one JSON file (students.json).
   Here the Id and email address of the students are the unique identifiers.
02.There is a set of files which contains records for each subject.
   The format of each subject file is identical. 
03.I need to implement a HTTP REST API which can accept a student’s email address as input, and then
   return the list of all subjects where this particular student is enrolled.
04.I need to implement this in two steps:
   4.1.I need to search for the specified student in the students.json first (based on the Email Id), to
       determine the Id of that student.
   4.2.Second, use that Id to search into the each of the subject files, to determine if this particular
       student is enrolled into any of those subjects.
   (The reading of all 5 subject files can be done in parallel).
05.Read subject files serially and parallel also.
   Checks the time required to complete work in both the cases.
06.Write logs in every callback and function to checks the exact execution flow and time.
07.Test all these APIs using curl command and Google REST client.