var the_object;
var http_request = new XMLHttpRequest();
http_request.open( "GET", url, true );
http_request.send(null);
http_request.onreadystatechange = function () {
    if ( http_request.readyState == 4 ) {
        if ( http_request.status == 200 ) {
	    switch(http_request.getResponseHeader("Content-Type")) {
	    case "text/json":
	    case "text/javascript":
	    case "application/json":
	    case "application/javascript":
	    case "application/x-javascript":
	        the_object = !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(http_request.responseText.replace(/"(\\.|[^"\\])*"/g, ''))) && eval('(' + http_request.responseText+ ')');
	    }            
        } else {
            alert( "There was a problem with the URL." );
        }
        http_request = null;
    }
};