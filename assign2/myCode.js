/*
	myCode.js
	External JS
	Jeremy Bowne - CIS166aa
 	Assignment 2
 */

// init() function will gather customer name and bill amount and calculate tax and total
// while also writing information to the console log and the screen
function init()
{	
	// variable declaration
	var name = "Customer";
	var amt = 0.00;
	var twoPlacedFloat = 0.00;
	var tax = 0.00;
	var total = 0.00;
	
	// tell the console log, for debug purposes, that the init() function started
	console.log("init() called");
	
	// prompt for name of customer
	name = prompt("Hi, enter customer name:  ");
	
	// write the customer name to the page
	document.writeln("<br>Customer: " + name + "<br><br>");	
	console.log("Customer: " + name);
	
	// ask for the bill amount
	amt = prompt("Enter amount for coffee bill: ");
	
	// convert the bill amount from string to a parsed float with 2 decimals trailing
	amt = parseFloat(amt).toFixed(2);
	
	// write the information to the page
	document.writeln("Amt: $" + amt + "<br><br>");
	console.log("Amt: $" + amt);
	
	// calculate the tax amount and convert to float with 2 trailing decimals
	tax = parseFloat(amt * 0.09).toFixed(2);

	// write information to the page for tax amount
	document.writeln("Tax: $" + tax + "<br><br>");
	
	// write same info to debug console log
	console.log("Tax: $" + tax);
	
	// calculate the total and convert to float with 2 decimals
	total = parseFloat(amt) + parseFloat(tax);
	console.log("Total: $" + parseFloat(total).toFixed(2));
	document.writeln("Total: $" + parseFloat(total).toFixed(2) + "<br><br>");
	
	// let the debug console log know this function is done
	console.log("init() complete");
}

 