try {
    var fs = require('fs');
    var http = require("http");
    var async = require("async");
    var qs = require('querystring');
    var jsonReader = require("json-reader");

    //Checks the required modules are available or not.
    if (fs === undefined) {
        throw new Error(" Can't access fs module.");
    }
    if (http === undefined) {
        throw new Error(" Can't access http module.");
    }
    if (async === undefined) {
        throw new Error(" Can't access async module.");
    }
    if (qs === undefined) {
        throw new Error(" Can't access querystring module.");
    }
    if (jsonReader === undefined) {
        throw new Error(" Can't access jsonReader module.");
    }


    //Accepts the JSON object and query string parameter. Returns the error object or the studentId.
    var getStudentId = function (qParam, object, callback) {
        var students = object.students;
        if (students === undefined) {  //If array of students not found then return with error message.
            return callback( new Error(" jsonObject not contain students key."), null );
        } else if (students.length == 0) {  //Checks for the presence of students in an array of the students tag.
            return callback( new Error(" jsonObject not contain students in array."), null );
        }
        var studentId = -1;
        for (x in students) {  //Checks in student records for the presence of the email address coming from the qParam. 
            if( students[x].email === qParam.email ) {
                studentId = students[x].id;
            }
        }
        if (studentId === -1) {  //Retur nwith the error if the student id is not found.
            return callback( new Error(" Record for the email address is not found."), null );
        }
        return callback(null, studentId);
    }

    //Returns the array of names of enrolledSubjects.
    var getEnrolledSubjectNames = function (subjectArray, studentId, callback) {
        var enrolledSubjects = [];
        for (x in subjectArray) {
            if (subjectArray[x].enrolledStudents !== undefined ) {  //Get inside only if subject.enrolledStudents is present.
                var enrolledStudents = subjectArray[x].enrolledStudents;
                for (x in enrolledStudents) {  //Saparately access every enrolledStudent.
                    if (enrolledStudents[x].id === studentId) {  //If studentId matches then added the subject name to the array.
                        enrolledSubjects.push(subjectArray[x].subjectName);
                        break;
                    }
                }//for (x in enrolledStudents)
            }
        }
        if(enrolledSubjects.length === 0) {
            return callback(new Error( " Can't found the enrolled subjects for this student." ), null);
        }
        return callback(null, enrolledSubjects);
    }//getEnrolledSubjectNames()


    //Accepts studentId and send response according to it using async.parallel.
    var getResponseParallely = function (studentId, cb) {
        var startTime = (new Date()).getTime();
        async.parallel([
            function (callback) {  //Reading sub_1.json
                jsonReader.jsonObject("./sourceFiles/sub_1.json", function subject1Reader(err, object) {
                    if(err) {
                        console.log("Failed to read sub_1.json");
                        callback(err, null);
                    } else {
                        callback(err, object);
                    }
                });//jsonReader.
            },
            function (callback) {  //Reading sub_2.json
                jsonReader.jsonObject("./sourceFiles/sub_2.json", function subject2Reader(err, object) {
                    if(err) {
                        console.log("Failed to read sub_2.json");
                        callback(err, null);
                    } else {
                        callback(err, object);
                    }
                });//jsonReader.
            },
            function (callback) {  //Reading sub_3.json
                jsonReader.jsonObject("./sourceFiles/sub_3.json", function subject3Reader(err, object) {
                    if(err) {
                        console.log("Failed to read sub_3.json");
                        callback(err, null);
                    } else {
                        callback(err, object);
                    }
                });//jsonReader.
            },
            function (callback) {  //Reading sub_4.json
                jsonReader.jsonObject("./sourceFiles/sub_4.json", function subject4Reader(err, object) {
                    if(err) {
                        console.log("Failed to read sub_4.json");
                        callback(err, null);
                    } else {
                        callback(err, object);
                    }
                });//jsonReader.
            },
            function (callback) {  //Reading sub_5.json
                jsonReader.jsonObject("./sourceFiles/sub_5.json", function subject5Reader(err, object) {
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
        function parallelHandler(err, results) {
            var diff = (new Date()).getTime() - startTime;
            console.log("Time required to read subject files in parallel: ", diff);
            if (err) {  //Returns an error if error occured in reading any of the subject files in json objects.
                return cb(err, null);
            }
            getEnrolledSubjectNames(results, studentId, function subjectNamesHandler(err, response) {
                if (err) {
                    return cb(err, response);
                }
                return cb(err, response);
            });//getEnrolledSubjectNames()
        });//async.parallel()
    }//getResponseParallely().

    //Accepts studentId and send response according to it using async.parallel.
    var getResponseSerially = function (studentId, cb) {
        var startTime = (new Date()).getTime();
        async.parallel([
            function (callback) {  //Reading sub_1.json
                jsonReader.jsonObject("./sourceFiles/sub_1.json", function subject1Reader(err, object) {
                    if(err) {
                        console.log("Failed to read sub_1.json");
                        callback(err, null);
                    } else {
                        callback(err, object);
                    }
                });//jsonReader.
            },
            function (callback) {  //Reading sub_2.json
                jsonReader.jsonObject("./sourceFiles/sub_2.json", function subject2Reader(err, object) {
                    if(err) {
                        console.log("Failed to read sub_2.json");
                        callback(err, null);
                    } else {
                        callback(err, object);
                    }
                });//jsonReader.
            },
            function (callback) {  //Reading sub_3.json
                jsonReader.jsonObject("./sourceFiles/sub_3.json", function subject3Reader(err, object) {
                    if(err) {
                        console.log("Failed to read sub_3.json");
                        callback(err, null);
                    } else {
                        callback(err, object);
                    }
                });//jsonReader.
            },
            function (callback) {  //Reading sub_4.json
                jsonReader.jsonObject("./sourceFiles/sub_4.json", function subject4Reader(err, object) {
                    if(err) {
                        console.log("Failed to read sub_4.json");
                        callback(err, null);
                    } else {
                        callback(err, object);
                    }
                });//jsonReader.
            },
            function (callback) {  //Reading sub_5.json
                jsonReader.jsonObject("./sourceFiles/sub_5.json", function subject5Reader(err, object) {
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
        function seriesHandler(err, results) {
            var diff = (new Date()).getTime() - startTime;
            console.log("Time required to read subject files in parallel: ", diff);
            if (err) {  //Returns an error if error occured in reading any of the subject files in json objects.
                return cb(err, null);
            }
            getEnrolledSubjectNames(results, studentId, function subjectNamesHandler(err, response) {
                if (err) {
                    return cb(err, response);
                }
                return cb(err, response);
            });//getEnrolledSubjectNames()
        });//async.series()
    }//getResponseSerially().


    var server = http.createServer ( function serverHandler(req, res) {
        var folderName = req.url.split('/')[1];  //devided url on base of "/".
        folderName = folderName.toLowerCase();
        if ( folderName === "favicon.ico" ) {
            res.end();  //Avoid un necessory execution of code.
        } else {
            var qParam = qs.parse( req.url.split('?')[1] );  //Splits parameter from the URL.
            if ( qParam.email === undefined ) {
                res.end("ERROR: Email is not given in the url.");
                throw new Error(" Email is not given in the url.");
            }
            //Emailid found in url move further.
            //Read source.json file using "json-reader" module.
            jsonReader.jsonObject("./sourceFiles/students.json", function jsonReaderHandler( err, object ) {
                if (err) {  //Error respose if the students.json file is not read correctly.
                    res.end("ERROR: Unable to read students.json file.");
                    throw err;
                }
                getStudentId(qParam, object, function getStudIdHandler(err, studentId) {
                    if (err) {  //Sent message in response that no record found for the student.
                        res.end("ID not found in record.");
                        throw err;
                    }
                    //getResponseSerially(studentId, function getResponseSeriallyHandler(err, response) {
                    getResponseParallely(studentId, function getResponseParallelyHandler(err, response) {
                        if (err) {
                            res.end("Failed to send an response.");
                            throw err;
                        }
                        res.writeHead(200, {'Content-Type': 'text/plain'});
                        res.end( JSON.stringify({ "Books": response }) );
                    });//getResponse().
                });//getStudentId().
            });//jsonReader.
        }
    });//Work of createServer is completed.

    server.listen(1337, "127.0.0.1", function listenerHandler() {
        console.log("Listening on: 127.0.0.1: 1337");
    });
} catch (err) {
    console.log(err);
}