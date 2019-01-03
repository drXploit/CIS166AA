/*
	myCode.js
	External JS
	Jeremy Bowne - CIS166aa
 	Assignment 5
*/

// global variables
"use strict";
var orderString = "";
var grandTotal = 0;
var subtotal = 0;
var tax = 0.08;
var total = 0;
var editing = false;

var name = "John Doe";

var arrayProducts = ["Hazelnut","Regular Decaf","Regular","Americano","Latte"];
var arrayPrices = [2.25, 2.50, 2.25, 2.75, 4.00];

var $ = function(id) { return document.getElementById(id); };

/* 
	handler for when page is finished writing DOM
*/
var startLoad = function()
{
	init();
	totaler(false);	
};

/* 
	return price, product name, based on getProdIndex
*/
function getProdIndex()
{
	return $("id_product").selectedIndex;
}
function getProdName()
{
	return arrayProducts[getProdIndex()];
}
function getPrice()
{
	return arrayPrices[getProdIndex()];
}


function taxCode(arg1)
{
	"use strict";
	arg1 = arg1.toUpperCase(arg1);
	switch (arg1)
	{
		case "P":
			return 0.081;
		break;
		case "G":
			return 0.092;
			break;
		case "PH":
			return 0.086;
			break;
		default:
			return 0.08;
			break;
	}
}


/*
	totaled - shows grand total, then resets radios and name
*/
function totaled()
{
	console.log("totaled() begin");
	var rad = document.mainForm.hotcoldradio;
	var rad2 = document.mainForm.radiobuttons;
	
	console.log(getOrderString());
	
	rad[0].checked = true;
	rad2[0].checked = true;
	
	total = 0.00;
	subtotal = 0.00;
	grandTotal = 0.00;
	
	$("nameInput").value = "John Doe";
	$("nameInput").focus();
	
	$("gTotalOutput").value = "0";
	$("totalOutput").value = "0";
	$("subTotalInput").value = "0";
	$("id_product").selectedIndex = 0;
	
	$("id_tax").selectedIndex = 0;
	$("id_product").selectedIndex = 2;
	tax = taxCode($("id_tax").value);	
	$("myTextArea").value = dateString() + "Cart:";	
	editing = false;	
	$("id_tax").disabled = false;
	$("nameInput").disabled = false;
	
	console.log("totaled() end");
	totaler(false);
}
/* 
	totaler - gathers information into variables
*/ 
function getOrderString()
{
	var rad = document.mainForm.hotcoldradio;
	var rad2 = document.mainForm.radiobuttons;
	var ix = $("id_product").selectedIndex;
	var pd = arrayProducts[ix];
	var sz = "";
	var tp = "";

	//var sz = rad2.value;
	for(var i=0; i<rad.length; i++) 
	{
		if (rad[i].checked) 
		{
			switch (i)
			{
				case 0:
				tp = "Hot";
				break;
				case 1:
				tp = "Cold";				
				break;
			}
		}
	}
	for(var i=0; i<rad2.length; i++) 
	{
		if (rad2[i].checked) 
		{
			switch (i)
			{
				case 0:
				sz = "Small";
				break;
				case 1:
				sz = "Medium";				
				break;
				case 2:
				sz = "Large";				
				break;
				case 3:
				sz = "Extra Large";				
				break;
			}
		}
	}
	
	orderString = "$" + parseFloat(total).toFixed(2) + " - One " + sz + " " + tp + " " + pd + " coffee";

	return orderString;
}
function totaler(clicked)
{
	console.log("Totaler() begin");
	var rad1 = document.mainForm.hotcoldradio;
	var rad2 = document.mainForm.radiobuttons;
	total = 0.00;


	
	for (var i=0;i<rad1.length;i++)
	{
		if (rad1[i].checked) {
			total += parseFloat(rad1[i].value);
			switch (i)
			{
				case 0:
				$("id_hot_coffee").style =  "width:64px;height:64px;border-color: green;";
				$("id_hot_coffee").border = 4;

				break;
				case 1:
				$("id_cold_coffee").style = "width:64px;height:64px;border-color: green;";
				$("id_cold_coffee").border = 4;

				break;
			}
			
		}
		else {
			switch (i)
			{
				case 0:
				$("id_hot_coffee").style = "width:64px;height:64px;border-color: black;";
				$("id_hot_coffee").border = 2;
				break;
				case 1:
				$("id_cold_coffee").style = "width:64px;height:64px;border-color: black;";
				$("id_cold_coffee").border = 2;
				break;
			}
		}
	}
	for (var i=0;i<rad2.length;i++)
	{
		if (rad2[i].checked) {
			total += parseFloat(rad2[i].value);
			switch(i)
			{
				case 0:
					$("id_size_sml").style = "width:24px;height:24px;border-color: green;";
					break;
				case 1:
					$("id_size_med").style = "width:38px;height:38px;border-color: green;";
					break;
				case 2:
					$("id_size_lrg").style = "width:48px;height:48px;border-color: green;";
					break;
				case 3:
					$("id_size_xlg").style = "width:64px;height:64px;border-color: green;";
					break;
			} 
		}
		else {
			switch(i)
			{
				case 0:
					$("id_size_sml").style = "width:24px;height:24px;";
					break;
				case 1:
					$("id_size_med").style = "width:38px;height:38px;";
					break;
				case 2:
					$("id_size_lrg").style = "width:48px;height:48px;";
					break;
				case 3:
					$("id_size_xlg").style = "width:64px;height:64px;";
					break;
			} 
		}

	}

	// get the taxCodeValue and run it through the taxCode function

	tax = taxCode($("id_tax").value);
	
	console.log(getPrice() + " " + getProdName());
	
	$("id_price").innerHTML = "<span id=\"id_price\" style=\"color: green;font-weight: bold;\">$" + parseFloat(getPrice()).toFixed(2) + "</span>"

	
	// set the id cityTaxOutput to the percentage in a string	
	$("cityTaxOutput").value = (tax * 100).toFixed(2) + "%";
	
	total += getPrice();
	
	$("subTotalInput").value = "$" + parseFloat(total).toFixed(2);
	
	$("totalOutput").value = "$" + parseFloat((total*tax + total)).toFixed(2);
	
	name = $("nameInput").value;

	if (name.length < 1) { 	// red X if name length is 0
		$("errMsg1").innerHTML = "<span id=\"errMsg1\" style=\"color: red;\"> &#10060</span>";
		if (clicked) 
		{
			$("nameInput").value = "John Doe";
			name = "John Doe";
			$("errMsg1").innerHTML = "<span id=\"errMsg1\" style=\"color: white;\"> &#10069</span>";
		}
	}
	else if ($("nameInput").value == "John Doe")
		$("errMsg1").innerHTML = "<span id=\"errMsg1\" style=\"color: white;\"> &#10069</span>";
	else	// green check mark if name is acceptable
		$("errMsg1").innerHTML = "<span id=\"errMsg1\" style=\"color: green;\"> &#9989</span>";


	$("id_temp").innerHTML = "<span id=\"id_temp\" style=\"color: green;font-weight: bold;\"> $" + rad1.value + "</span>";
	$("id_size").innerHTML = "<span id=\"id_size\" style=\"color: green;font-weight: bold;\"> $" + rad2.value + "</span>";

	if (clicked) {
		grandTotal += ((total*tax) + total);
		$("myTextArea").value = $("myTextArea").value + "\n\t" + orderString;
		if (!editing)
		{

			$("id_tax").disabled = true;
			$("nameInput").disabled = true;
			editing = true;
		}
	}
	
	$("gTotalOutput").value = "$" + parseFloat(grandTotal).toFixed(2);
	
	console.log(getOrderString());
	
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
		if (rad[i].checked) //&& lastselected1 != this)
			totaler(false);
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
		if (rad2[j].checked)
			totaler(false);
	}
	console.log("changeEvent2() end");
 };
 
 var selectBoxChangeEvent = function()
 {
	totaler(false);
 };
 
 var standardChangeEvent = function()
 {
	totaler(false);
 };
 
 /* 
	init function
 */
 function init()
 {
		// set variables to their defaults and 
		// event handlers for radiobuttons
		console.log("init() begin");
		
		var rad = document.mainForm.hotcoldradio;
		for (var i = 0;i < rad.length;i++)
		{
			rad[i].onchange = changeEvent;
		}
		var rad2 = document.mainForm.radiobuttons;
		for (var j=0;j < rad2.length;j++)
		{
			rad2[j].onchange = changeEvent2;
		}
		$("id_tax").onchange = standardChangeEvent;
		$("id_product").onchange = standardChangeEvent;
		
		$("nameInput").value = "";
		$("nameInput").onchange = standardChangeEvent;
		$("nameInput").onclick = standardChangeEvent;
		$("nameInput").onblur = standardChangeEvent;
		$("nameInput").onkeypress = standardChangeEvent;
		$("nameInput").onstop = standardChangeEvent;
		$("nameInput").focus();
		//$("nameInput").selected;
		
		tax = taxCode($("id_tax").value);

		$("myTextArea").value = dateString() + "Cart:";
		
		console.log("init() finished ");
 }
 function dateString()
 {
		var d = new Date();
		var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		return days[d.getDay()] + ", " + months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear() + "\n";
 }
 
// set the event handler function
window.onload = startLoad;
