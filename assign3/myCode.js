/*
	myCode.js
	External JS
	Jeremy Bowne - CIS166aa
 	Assignment 3
*/


function taxCode(arg1)
{
	"use strict";
	if (arg1 == "P" || arg1 == "p") 
	{
		console.log("Peoria City Code Selected - 0.081");
		return 0.081;
	}
	else if (arg1 == "G" || arg1 == "g") 
	{	
		console.log("Glendale City Code Selected - 0.092");
		return 0.092;	
	}
	else if (arg1 == "PH" || arg1 == "ph") 
	{
		console.log("Phoenix City Code Selected - 0.086");
		return 0.086;
	}
	else
	{
		alert("Unknown option: " + arg1 + "\nUsing default of 8 percent.");
		console.log("Unknown Option Selected - Using Default of 0.08");
		return 0.08;
	}
}
function coffeeCalc()
{
	"use strict";
	console.log("coffeeCalc function started.");
	var tax = 0.00;
	var total = 0.00;
	var subtotal = 0.00;
	var name = "John Doe";

	// get the customer name
	var name = document.getElementById("nameInput").value;
	console.log("Name: " + name);

	// get the subtotal for calculations
	subtotal = parseFloat(document.getElementById("subTotalInput").value);
	if (isNaN(subtotal))
	{
		alert("Subtotal needs to be a valid number greater than 0.0");
		subtotal = 0.0;
	}
	console.log("Subtotal: $" + subtotal);	

	// get the taxCodeValue and run it through the taxCode function
	var taxCodeValue = document.getElementById("cityTaxInput").value;
	tax = taxCode(taxCodeValue);

	// set the id cityTaxOutput to the percentage in a string	
	document.getElementById("cityTaxOutput").value = (tax * 100) + " percent";

	total = subtotal + (subtotal * tax);
	console.log("Total: " + total);	

	// set the id totalOutput to hold the total
	document.getElementById("totalOutput").value = "$" + total;

	console.log("coffeeCalc function ended.");
}

 