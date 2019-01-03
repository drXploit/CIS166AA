/*
	assign10.js
	External JS
	Jeremy Bowne - CIS166aa
 	Assignment 10
*/

"use strict";

// global integer
var magicNumber = 0;

/*
	@function - getMagicNumber
	@description - retrieves the magic number from the sessionStorage and then uses that information figure out which image and link to display
	@parameter - none
	@return none
*/
function getMagicNumber()
{
	// empty local variable strings;
	var appString = "";
	var imgString = "";
	var imgLink = "";
	
	// load the magicNumber
	magicNumber = parseInt(sessionStorage.getItem("magicNumber"));
	console.log("magic number: " + magicNumber);
	
	/* logically figure out which personality the user is
	// 8 is "grandmother JS"
	// 9 - 16 is node js
	// 17- 22 is react
	 anything else (23+) is angular */
	
	if (magicNumber < 9) 
	{
		imgString = "1.png";
		imgLink = "https://www.pbs.org/newshour/nation/save-economy-teach-grandma-code";
	}
	else if (magicNumber < 17) 
	{
		imgString = "2.png";
		imgLink = "https://nodejs.org/";		
	}
	else if (magicNumber < 23) 
	{
		imgString = "3.png";
		imgLink = "https://reactjs.org/";		
	}
	else 
	{
		imgString = "4.png";
		imgLink = "https://angular.io/";
	}
	// build the HTML string
	appString = "<a href=\"" + imgLink + "\">";
	appString += "<img src=\"" + imgString + "\" alt=\"" + imgString + "\" style=\"width:100%;height:100%;\" >";
	appString += "</a>";
	
	// take that HTML string and append it to the form body (modify DOM)
	$("#form_body").append(appString);
}

/*
	@function - $(document).ready
	@description - called after the DOM is loaded
	@parameter - Function() with applicable loading procedure
	@return none
*/
$(document).ready(function()
{
	getMagicNumber();
});
