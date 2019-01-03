/*
	assign10.js
	External JS
	Jeremy Bowne - CIS166aa
 	Assignment 10
	This is a personality quiz created to see "Which Framework Are You?"
*/

"use strict";

// global integer
var intQuestions = 0;
var magicNumber = 0;

// global arrays initialized with one value each 
// so that the interpreter knows they are arrays 
// so I didn't have to use the new keyword and saved a line of code
var arrayQuestions = [""];
var arrayAnswer1   =  [""];
var arrayAnswer2   =  [""];
var arrayAnswer3   =  [""];

/*
	@function - changeEvent
	@description - this is the change event for the radio buttons, which calculates the "magicNumber" that is used for figuring out which framework the user will be
	@return string
*/
var changeEvent = function() 
{
	magicNumber = 0;
	$("input:radio:checked").each(
		function()
		{
			magicNumber += parseInt($(this).val());
		}
	);
	sessionStorage.setItem("magicNumber", magicNumber);
	console.log("magicNumber:" + magicNumber);
};

/*
	@function - resetEvent
	@description - resets the sessionStorage and then reloads the window
	@return string
*/
var resetEvent = function()
{
	magicNumber = 0;
	sessionStorage.setItem("magicNumber", magicNumber);
	window.location.reload(true); // hard refresh from server rather than cache
};

/*
	@function - JSONQuestions
	@description - using ajax, load the JSON file with questions/answers into arrays which are then applied to the DOM
	@return string
*/
function JSONQuestions()
{
	arrayQuestions.pop();
	arrayAnswer1.pop();
	arrayAnswer2.pop();
	arrayAnswer3.pop();
	$.ajax({
			type: "get",
			url: "https://web.gccaz.edu/~jer2182916/CIS166AA/assign10/quiz.json",
			beforeSend: function() {
				$("#form_body").html("Loading...");
			},
			timeout: 10000,
			error: function(xhr, status, error) {
				alert("Error: " + xhr.status + " - " + error);
			},
			dataType: "json",
			success: function(data) {
				$("#form_body").empty();
				$.each(data, function() 
				{
					$.each(this, function(key, value) 
					{
						arrayQuestions.push(value.Question);
						arrayAnswer1.push(value.Answer1);
						arrayAnswer2.push(value.Answer2);
						arrayAnswer3.push(value.Answer3);
						intQuestions++;
					});
				});
				for (var i=0;i < arrayQuestions.length;i++)
				{
					var appString = 
						startdiv("div_question" + i) + 
							mkp("Question " + (i+1) + ": " + arrayQuestions[i]) +
							mkradio("a1" + i, "a" + i, 1, arrayAnswer1[i], true) +
							mkradio("a2" + i, "a" + i, 2, arrayAnswer2[i], false) +
							mkradio("a3" + i, "a" + i, 3, arrayAnswer3[i], false) +
						closediv();
					$("#form_body").append(appString);
					$("#a1" + i).change(changeEvent);
					$("#a2" + i).change(changeEvent);
					$("#a3" + i).change(changeEvent);
				}
				sessionStorage.setItem("intQuestions", intQuestions);
			}
		});
}

/*
	@function - startdiv
	@description - generates a string with an html open tag for a div element
	@parameter strID - the id for the new div element
	@return string
*/
function startdiv(strID)
{
	return "<div id=\"" + strID + "\">";
}

/*
	@function - closediv
	@description - generates a string with an html close tag for div
	@return string
*/
function closediv()
{
	return "</div>";
}

/*
	@function - mkp
	@description - generates a string containing a html tagged paragraph
	@return string
*/
function mkp(str)
{
	return "<p>" + str + "</p>";
}

/*
	@function - mkradio
	@description - generates a string containing an html tagged radio button, its' value, and the text associated
	@return string
*/
function mkradio(strID, group, radioValue, radioText, req)
{
	return "<label class=\"containerx\">" + 
	"<input type=\"radio\" id=\"" + strID + "\" name=\"" + group + "\"  value=\"" + radioValue + "\"" + (req ? "required>" : ">") + radioText +
	"<span class=\"checkmark1\"></span></label><br>";
}

/*
	@function - $(document).ready
	@description - After the DOM is loaded, call appropriate functions.
	@return none
*/
$(document).ready(function()
{
	JSONQuestions();
});
