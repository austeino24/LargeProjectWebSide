
var urlBase = 'http://64.37.54.24';
var extension = "php";

var userId = 0;
var overlay = $('#overlay');
var contacts = $('#contacts');
var nav = $('#nav');
user = "user";

$.getScript("http://www.myersdaily.org/joseph/javascript/md5.js");

window.onload = function()
{ 
    if(read_cookie(user) === null)
        bake_cookie(user, "");
    else if(read_cookie(user) === "");
    else
    {
        var s = document.getElementById("s");
        var l = document.getElementById("l");
        
        s.parentNode.removeChild(s);
        l.parentNode.removeChild(l);
        
        document.getElementById("uname").innerHTML = "Logged in as: " + read_cookie(user);
    }   
};

function bake_cookie(name, value) {
  var cookie = [name, '=', JSON.stringify(value), '; domain=.', window.location.host.toString(), '; path=/;'].join('');
  document.cookie = cookie;
}

function read_cookie(name) {
 var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
 result && (result = JSON.parse(result[1]));
 return result;
}

function delete_cookie(name) {
  document.cookie = [name, '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/; domain=.', window.location.host.toString()].join('');
}

function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";
	
	var login = document.getElementById("loginName").value;
	var password = document.getElementById("loginPassword").value;
	
	document.getElementById("loginResult").innerHTML = "";
	
	var jsonPayload = '{"username" : "' + login + '", "password" : "' + md5(password) + '"}';
	var url = urlBase + '/login.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	//xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        
	try
	{
		xhr.send(jsonPayload);
		
		var jsonObject = JSON.parse( xhr.responseText );
                
                console.log(jsonObject);
		
		userId = jsonObject.id;
		
		if( userId < 1 )
		{
			document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
			return;
		}
            
            delete_cookie(user);
            bake_cookie(user, login);
                
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}
	
}

function doSignup()
{
	userId = 0;
	firstName = "";
	lastName = "";
	
        var first = document.getElementById("firstName").value;
        var last = document.getElementById("lastName").value;
        var user = document.getElementById("username").value;
	var password = document.getElementById("loginPassword").value;
        var confirmPass = document.getElementById("loginConfirmPassword").value;
	var email = document.getElementById("email").value;
        
	document.getElementById("signupResult").innerHTML = "";
        
        /*if(!password.equals(confirmPass))
        {
            document.getElementById("loginResult").innerHTML = "Passwords did not match!";
            return;
        } */
	
	var jsonPayload = '{"username" : "' + user + '", "password" : "' + md5(password) + '", "nickname" : "' + first + '_' + last + '"}';
        console.log(jsonPayload);
	var url = urlBase + '/addUser.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
        
	try
	{
		xhr.send(jsonPayload);
		
		var jsonObject = JSON.parse( xhr.responseText );
                
                console.log(jsonObject);
		
		document.getElementById("titleBox").innerHTML = "Signup Succeeded!"
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}
	
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";	

	hideOrShow( "loggedInDiv", false);
	hideOrShow( "accessUIDiv", false);
	overlay.slideUp(400, contacts.slideDown(400));
}

function hideOrShow( elementId, showState )
{
	var vis = "visible";
	var dis = "block";
	if( !showState )
	{
		vis = "hidden";
		dis = "none";
	}
	
	document.getElementById( elementId ).style.visibility = vis;
	document.getElementById( elementId ).style.display = dis;
}
