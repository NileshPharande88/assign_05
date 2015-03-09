try {
	var http = require("http");
    var fs = require('fs');
    var qs = require('querystring');

    //Checks the required modules are available or not.
    if ((http === undefined)) throw new Error( " Can't access http module" );
    if ((fs === undefined)) throw new Error( " Can't access fs module" );
    if ((qs === undefined)) throw new Error( " Can't access qs module" );



    
} catch (err) {
	console.log(err);
}