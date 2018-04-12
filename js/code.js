
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
    if(localStorage.getItem(user) === null)
        localStorage.setItem(user, "");
    else if(localStorage.getItem(user) === "");
    else
    {
        var s = document.getElementById("s");
        var l = document.getElementById("l");
        var t = l.cloneNode(true);
        
        t.innerHTML = "Logout";
        t.onclick = function() { 
            localStorage.setItem(user, ""); 
        };
        
        s.parentNode.removeChild(s);
        l.parentNode.insertBefore(t, l);
        l.parentNode.removeChild(l);
        
        
        document.getElementById("uname").innerHTML = "Logged in as: " + localStorage.getItem(user);
    }   
};

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
            
            localStorage.removeItem(user);
            localStorage.setItem(user, login);
            window.location.href = "leaderboard.html";  
            return false;
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
