try {
    var http = require("http");
    var fs = require('fs');
    var qs = require('querystring');
    var jsonReader = require("json-reader");

    //Checks the required modules are available or not.
    if (http === undefined) throw new Error( " Can't access http module" );
    if (fs === undefined) throw new Error( " Can't access fs module" );
    if (qs === undefined) throw new Error( " Can't access qs module" );
    if (jsonReader === undefined) throw new Error( " Can't access json-reader module" );


    var getStudentId = function (res, qParam, object, callback) {
        var students = object.students;
        if(students === undefined) {
            console.log(" jsonObject not contain students key.");
            res.end(" jsonObject not contain students key.");
        } else if (students.length == 0) {  //checks for the presence of students inan array of the students tag.
            console.log(" jsonObject not contain students in array.");
            res.end(" jsonObject not contain students in array.");
        } else {

            students.forEach(function (value) {
                if( value.email === qParam.email ) {
                    console.log("student is not in record", qParam.email);
                    res.end("student is not in record" + qParam.email);
                } else {
                    console.log("student id: ", value.id);
                    res.end("student id: " + value.id);
                }
            });

        }
    }



    var server = http.createServer ( function (req, res) {
        var folderName = req.url.split('/')[1]; //devided url on base of "/".
        folderName = folderName.toLowerCase(); //Converte folder name to lower case.
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
                    if(err) {
                        console.log(err);
                        res.end(err);
                    } else {
                        getStudentId(res, qParam, object, function(err, response){
                            if(err){
                                ;
                            } else {
                                ;
                            }
                        });
                        ;
                        ;
                        console.log("student id test");
                        res.end("student id test");
                    }
                });
            }
        }
    });//Work of createServer is completed.

    server.listen( 1337, "127.0.0.1", function() {
        console.log( "Listening on: 127.0.0.1: 1337" );
    });
} catch (err) {
    console.log(err);
}