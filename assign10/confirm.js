/*
	assign10.js
	External JS
	Jeremy Bowne - CIS166aa
 	Assignment 10
*/

"use strict";

// global variables

var magicNumber = 0;
var delayInMilliseconds = 300;
var active = false;
var cTimeout;
var cIndex = 0;
var cLength = 0; 
var cText = ""; 
var buildString = "";

/*
	@function - startdiv
	@description - this function is called after the timer runs out, it gets the next character that should be capitalized, and capitalizes it - if the entire string has been capitalized it stops the timer
	@parameter - none
	@return none
*/
function animateCN()
{
	// local variables
	var char1;
	var splitString;
	
	// first run only
	if (!active)
	{
		cText = document.getElementById("title").innerHTML;
		active = true;
		console.log(cText);
	}
	
	cLength = cText.length;
	
	// if we are still capitalizing the string, do so
	if (cIndex < cLength)
	{
		// split the string into two parts, the uppercase part, and the lowercase part
		splitString = cText.substr(cIndex+1);
		
		// get the next character that needs to be uppercase and capitalize it
		char1 = cText.substr(cIndex, 1).toUpperCase();
		
		// put the string back together with the uppercase character
		buildString = buildString + char1;		
		
		// update the dom with the updated string
		document.getElementById("title").innerHTML = (buildString + splitString);
		
		// increment the index so that the next run will go to the next character
		cIndex++;
		
		// start the timer again
		cTimer();
	}
	else 
	{
		// the entire string has been capitalized, so stop the timer
		cStopTimer();
		console.log("cIndex = " + cIndex);
	}
}

/*
	@function - cTimer
	@description - waits for a certain period of time described in delayInMilliseconds global variable, and then call the animateCN function
	@parameter - none
	@return none
*/
function cTimer() 
{
    cTimeout = setTimeout(function()
	{ 
		// call the animation function
		animateCN();
	}, delayInMilliseconds); 
}

/*
	@function - cStopTimer
	@description - stops the timer from repeating
	@parameter - none
	@return none
*/
function cStopTimer() 
{
	// stop all timers
	clearTimeout(cTimeout);
	
	// make inactive
	active = false;
	
	// update the DOM with a message letting the user know they can proceed
	document.getElementById("title").innerHTML = "Click proceed to see your results!";
	
	// show the proceed button
	$("#id_proceed").show();
	
	// slide down the "down arrow"
	$("#id_down").slideDown();
}

/*
	@function - getMagicNumber
	@description - loads magicNumber from the users session storage
	@parameter - none
	@return none
*/
function getMagicNumber()
{
	// load magicNumber from the users local sessionStorage
	magicNumber = sessionStorage.getItem("magicNumber");
}

/*
	@function - $(document).ready
	@description - called after the DOM is loaded
	@parameter - Function() with applicable loading procedure
	@return none
*/
$(document).ready(function()
{
	// hide the proceed button
	$("#id_proceed").hide();
	
	// hide the down arrow image
	$("#id_down").hide();
	
	// get the magic number (not used)
	getMagicNumber(); // not needed, only for testing
	
	// start the timer function which animates the text in the DOM
	cTimer();
});
