try {
    var http = require("http");
    var fs = require('fs');
    var qs = require('querystring');
    var jsonReader = require("json-reader");
    var async = require("async");

    //Checks the required modules are available or not.
    if (http === undefined) throw new Error( " Can't access http module" );
    if (fs === undefined) throw new Error( " Can't access fs module" );
    if (qs === undefined) throw new Error( " Can't access qs module" );
    if (jsonReader === undefined) throw new Error( " Can't access json-reader module" );
    if ((async === undefined)) throw new Error( " Can't access async module" );


    //Accepts the JSON object and query string parameter. Returns the error object or the studentId.
    var getStudentId = function (qParam, object, callback) {
        var students = object.students;
        if (students === undefined) {  //If array of students not found then return with error message.
            return callback( new Error(" jsonObject not contain students key."), null );
        } else if (students.length == 0) {  //Checks for the presence of students in an array of the students tag.
            return callback( new Error(" jsonObject not contain students in array."), null );
        } else {
            var studentId = -1;
            for (x in students) {  //Checks in student records for the presence of the email address coming from the qParam. 
                if( students[x].email === qParam.email ) {
                    studentId = students[x].id;
                }
            }
            if (studentId === -1) {  //Retur nwith the error if the student id is not found.
                return callback( new Error(" Record for the email address is not found."), null );
            } else {  //Returns the studentId.
                return callback(null, studentId);
            }
        }
    }


    //Returns the array of names of enrolledSubjects.
    var getEnrolledSubjectNames = function (subjectArray, studentId, callback) {
        var enrolledSubjects = [];
        subjectArray.forEach( function (subject) {  //Saparately access every subject.
            if (subject.enrolledStudents !== undefined ) {  //Get inside only if subject.enrolledStudents is present.
                var enrolledStudents = subject.enrolledStudents;
                for (x in enrolledStudents) {  //Saparately access every enrolledStudent.
                    if (enrolledStudents[x].id === studentId) { //If studentId matches then added the subject name to the array.
                        enrolledSubjects.push(subject.subjectName);
                        break;
                    }
                }//for (x in enrolledStudents)
            }
        });// subjectArray.forEach()
        if(enrolledSubjects.length === 0) {
            return callback(new Error( " Can't found the enrolled subjects for this student." ), null);
        } else {
            return callback(null, enrolledSubjects);
        }
    }//getEnrolledSubjectNames()


    //Accepts studentId and send response according to it using async.parallel.
    var getResponse = function (studentId, cb) {
        var startTime = (new Date()).getTime();
        async.parallel([
            function (callback) {  //Reading sub_1.json
                jsonReader.jsonObject("./sourceFiles/sub_1.json", function ( err, object ) {
                    if(err) {
                        console.log("Failed to read sub_1.json");
                        callback(err, null);
                    } else {
                        callback(err, object);
                    }
                });//jsonReader.
            },
            function (callback) {  //Reading sub_2.json
                jsonReader.jsonObject("./sourceFiles/sub_2.json", function ( err, object ) {
                    if(err) {
                        console.log("Failed to read sub_2.json");
                        callback(err, null);
                    } else {
                        callback(err, object);
                    }
                });//jsonReader.
            },
            function (callback) {  //Reading sub_3.json
                jsonReader.jsonObject("./sourceFiles/sub_3.json", function ( err, object ) {
                    if(err) {
                        console.log("Failed to read sub_3.json");
                        callback(err, null);
                    } else {
                        callback(err, object);
                    }
                });//jsonReader.
            },
            function (callback) {  //Reading sub_4.json
                jsonReader.jsonObject("./sourceFiles/sub_4.json", function ( err, object ) {
                    if(err) {
                        console.log("Failed to read sub_4.json");
                        callback(err, null);
                    } else {
                        callback(err, object);
                    }
                });//jsonReader.
            },
            function (callback) {  //Reading sub_5.json
                jsonReader.jsonObject("./sourceFiles/sub_5.json", function ( err, object ) {
                    if(err) {
                        console.log("Failed to read sub_5.json");
                        callback(err, null);
                    } else {
                        callback(err, object);
                    }
                });//jsonReader.
            }
        ],
        // optional callback 
        function(err, results){
            var diff = (new Date()).getTime() -  startTime;
             console.log("Time required to read subject files in parallel: ", diff);
            if (err) {  //Returns an error if error occured in reading any of the subject files in json objects.
                return cb(err, null);
            } else {  //Process further on the read json objects.
                getEnrolledSubjectNames(results, studentId, function (err, response) {
                    if (err) {
                        return cb(err, response);
                    } else {
                        return cb(err, response);
                    }
                });//getEnrolledSubjectNames()
            }
        });//async.parallel()
    }//sendResponse(parallel).


    //Accepts studentId and send response according to it using async.parallel.
    var getResponse1 = function (studentId, cb) {
        var startTime = (new Date()).getTime();
        async.series([
            function (callback) {  //Reading sub_1.json
                jsonReader.jsonObject("./sourceFiles/sub_1.json", function ( err, object ) {
                    if(err) {
                        console.log("Failed to read sub_1.json");
                        callback(err, null);
                    } else {
                        callback(err, object);
                    }
                });//jsonReader.
            },
            function (callback) {  //Reading sub_2.json
                jsonReader.jsonObject("./sourceFiles/sub_2.json", function ( err, object ) {
                    if(err) {
                        console.log("Failed to read sub_2.json");
                        callback(err, null);
                    } else {
                        callback(err, object);
                    }
                });//jsonReader.
            },
            function (callback) {  //Reading sub_3.json
                jsonReader.jsonObject("./sourceFiles/sub_3.json", function ( err, object ) {
                    if(err) {
                        console.log("Failed to read sub_3.json");
                        callback(err, null);
                    } else {
                        callback(err, object);
                    }
                });//jsonReader.
            },
            function (callback) {  //Reading sub_4.json
                jsonReader.jsonObject("./sourceFiles/sub_4.json", function ( err, object ) {
                    if(err) {
                        console.log("Failed to read sub_4.json");
                        callback(err, null);
                    } else {
                        callback(err, object);
                    }
                });//jsonReader.
            },
            function (callback) {  //Reading sub_5.json
                jsonReader.jsonObject("./sourceFiles/sub_5.json", function ( err, object ) {
                    if(err) {
                        console.log("Failed to read sub_5.json");
                        callback(err, null);
                    } else {
                        callback(err, object);
                    }
                });//jsonReader.
            }
        ],
        // optional callback 
        function(err, results){
            var diff = (new Date()).getTime() -  startTime;
             console.log("Time required to read subject files in series: ", diff);
            if (err) {  //Returns an error if error occured in reading any of the subject files in json objects.
                return cb(err, null);
            } else {  //Process further on the read json objects.
                getEnrolledSubjectNames(results, studentId, function (err, response) {
                    if (err) {
                        return cb(err, response);
                    } else {
                        return cb(err, response);
                    }
                });//getEnrolledSubjectNames()
            }
        });//async.parallel()
    }//getResponse(series).



    var server = http.createServer ( function (req, res) {
        var folderName = req.url.split('/')[1];  //devided url on base of "/".
        folderName = folderName.toLowerCase();  //Converte folder name to lower case.
        if ( folderName === "favicon.ico" ) {
            res.end();   //Avoid un necessory execution of code.
        } else {
            var qParam = qs.parse( req.url.split('?')[1] );  //Splits parameter from the URL.
            if( qParam.email === undefined ) {//if q param is not given in url then
                console.log("ERROR: Email is not given in the url.");
                res.end("ERROR: Email is not given in the url.");
            } else {
                //Read source.json file using "json-reader" module.
                jsonReader.jsonObject("./sourceFiles/students.json", function ( err, object ) {
                    if(err) {  //Error respose if the students.json file is not read.
                        console.log(err);
                        res.end("ERROR: Unable to read students.json file.");
                    } else {  //students.json file is not read correctly.
                        getStudentId(qParam, object, function(err, studentId){
                            if(err){  //Sent message in response that no record found for the student.
                                console.log(err);
                                res.end("ID not found in record.");
                            } else {
                                getResponse1(res, studentId, function (err, response) {
                                    ;
                                });//getResponse().
                                getResponse(studentId, function (err, response) {
                                    if(err) {
                                        res.end("Failed to send an response.");
                                    } else {
                                        res.writeHead(200, {'Content-Type': 'text/plain' });
                                        res.end( JSON.stringify( { Books: response } ) );
                                    }
                                });//getResponse().
                            }
                        });//getStudentId().
                    }
                });//jsonReader.
            }//qParam.email.
        }
    });//Work of createServer is completed.

    server.listen( 1337, "127.0.0.1", function() {
        console.log( "Listening on: 127.0.0.1: 1337" );
    });
} catch (err) {
    console.log(err);
}