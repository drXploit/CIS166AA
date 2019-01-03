/*
	myCode.js
	External JS
	Jeremy Bowne - CIS166aa
 	Assignment 4
*/

// global variables
"use strict";
var grandSum = 0;
var subtotal = 0;
var tax = 0.08;
var total = 0;
var lastselected1 = null;
var lastselected2 = null;
var name = "John Doe";

/* 
	handler for when page is finished writing DOM
*/
var startLoad = function()
{
	init();
	totaler(false);	
};
/*
	totaled - shows grand total, then resets radios and name
*/
function totaled()
{
	console.log("totaled() begin");
	alert(name + "'s bill total is $" + grandSum);
	document.mainForm.hotcoldradio[0].checked = true;
	document.mainForm.radiobuttons[0].checked = true;
	document.getElementById("gTotalOutput").value = "0";
	document.getElementById("totalOutput").value = "0";
	document.getElementById("nameInput").value = "John Doe";
	console.log("totaled() end");
}
/* 
	totaler - gathers information into variables
*/ 

function totaler(clicked)
{
	console.log("Totaler() begin");
	var rad1 = document.mainForm.hotcoldradio;
	var rad2 = document.mainForm.radiobuttons;
	total = 0.00;
	for (var i=0;i<rad1.length;i++)
	{
		if (rad1[i].checked) 
		{
			total += parseFloat(rad1[i].value);
		}
	}
	for (var i=0;i<rad2.length;i++)
	{
		if (rad2[i].checked)
		{
			total += parseFloat(rad2[i].value);
		}
	}
	
	document.getElementById("subTotalInput").value = "$" + parseFloat(total);
	document.getElementById("totalOutput").value = "$" + parseFloat((total*tax) + total);
	if (clicked)
	{
		name = document.getElementById("nameInput").value;
		grandSum += ((total*tax) + total);
	}
	document.getElementById("gTotalOutput").value = "$" + parseFloat(grandSum);
	console.log("Totaler() end");
}

/*
	changeEvent for second set of radiobuttons
*/ 

var changeEvent = function()
{
	console.log("changeEvent() triggered");
	var rad = document.mainForm.hotcoldradio;
	for (var i=0;i < rad.length;i++)
	{
		if (rad[i].checked && lastselected1 != this)
		{
			lastselected1 = this;
			totaler(false);
		}
	}
	console.log("changeEvent() end");
};

 
/* 
	changeEvent2 for second set of radiobuttons
*/ 
var changeEvent2 = function()
{
	console.log("changeEvent2() triggered");
	var rad2 = document.mainForm.radiobuttons;
	for (var j=0;j<rad2.length;j++)
	{
		if (rad2[j].checked && lastselected2 != this)
		{
			lastselected2 = this;
			totaler(false);
		}
	}
	console.log("changeEvent2() end");
 };
 
 /* 
	init function
 */
 function init ()
 {
		// set variables to their defaults and 
		// event handlers for radiobuttons
		console.log("init() begin");
		var rad = document.mainForm.hotcoldradio;
		for (var i = 0;i < rad.length;i++)
		{
			rad[i].onclick = changeEvent;
			if (rad[i].checked) 
				lastselected1 = rad[i];
		}
		var rad2 = document.mainForm.radiobuttons;
		for (var j=0;j < rad2.length;j++)
		{
			rad2[j].onclick = changeEvent2;
			if (rad2[j].checked) 
				lastselected2 = rad2[j];
		}
		tax = 0.08;
		document.getElementById("nameInput").value = "John Doe";

		console.log("init() finished ");
 }

// set the event handler function
window.onload = startLoad;
