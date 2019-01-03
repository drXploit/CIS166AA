/*
	myCode.js
	External JS
	Jeremy Bowne - CIS166aa
 	Assignment 6
*/

// global variables
"use strict";
var orderString = "";
var grandTotal = 0;
var subtotal = 0;
var tax = 0.08;
var total = 0.00;
var editing = false;

var name = "John Doe";
var showLatte = false;
var arrayProducts = ["Hazelnut","Regular Decaf","Regular","Americano","Latte"];
var arrayPrices = [2.25, 2.50, 2.25, 2.75, 4.00];

var btn;
var btnCreated = false;
var t;
var shown = false;
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
	var lb = document.getElementById("select_latte");

	if ($("id_product").selectedIndex == 4)
	{
		var opt = lb.options[lb.selectedIndex];	
		lb.style.display = "inline";
		$("id_price").innerHTML = "<span id=\"id_price\" style=\"color: green;font-weight: bold;\"> $" + parseFloat(opt.value).toFixed(2) + "</span>";

		return opt.value;
	}
	else 
	{		
		lb.style.display = "none";
		console.log(arrayPrices[getProdIndex()]);
		$("id_price").innerHTML = "<span id=\"id_price\" style=\"color: green;font-weight: bold;\"> $" + arrayPrices[getProdIndex()] + "</span>";
		return arrayPrices[getProdIndex()];	
	}
}

//btn_click event for 
 var btn_click = function()
 {
		console.log("btn.onclick");
		if (!shown) {
			$("myTextArea").style.visibility = "visible";
			$("myTextArea").style.display = "inline";
			shown = true;
		}
			
 };

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
function checkOut()
{
	console.log("checkOut() begin");
	var rad = document.mainForm.hotcoldradio;
	var rad2 = document.mainForm.radiobuttons;
	var lb = document.getElementById("select_latte");

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
	
	lb.selectedIndex = 0;
	lb.style.display = "none";
	$("myTextArea").style.display = "none";
	if (btnCreated) 
	{
		$("placeholder1").removeChild(btn);
		btnCreated = false;
		shown = false;
	}
	totaler(false);
	console.log("checkOut() end");

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
	var lb = document.getElementById("select_latte");
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
	if (ix == 4)
		orderString += " (" + lb.options[lb.selectedIndex].innerHTML + ")";
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

		if (rad1[i].checked)
		{
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
	
	// set the id cityTaxOutput to the percentage in a string	
	$("cityTaxOutput").value = (tax * 100).toFixed(2) + "%";
		
	total += parseFloat(getPrice());

	$("subTotalInput").value = "$" + parseFloat(total).toFixed(2);
	
	$("totalOutput").value = "$" + parseFloat((total*tax + total)).toFixed(2);
	
	nameFunction();

	$("id_temp").innerHTML = "<span id=\"id_temp\" style=\"color: green;font-weight: bold;\"> $" + rad1.value + "</span>";
	$("id_size").innerHTML = "<span id=\"id_size\" style=\"color: green;font-weight: bold;\"> $" + rad2.value + "</span>";

	
	if (clicked) {	
		grandTotal += ((total*tax) + total);
		$("myTextArea").value = $("myTextArea").value + "\n" + orderString;
		if (!editing)
		{
			// dont allow editing name and tax rate once order process has begun
			$("id_tax").disabled = true;
			$("nameInput").disabled = true;
			editing = true;
		}
		// create a button if one isnt there yet
		if (!btnCreated) 
		{
			btn = document.createElement("INPUT");
			btn.setAttribute("type","button");
			btn.setAttribute("value","Receipt");
	
			btn.id = "id_receipt";

			document.getElementById("placeholder1").appendChild(btn);
			btnCreated = true;
			
			$("id_receipt").onclick = btn_click;
		}
	}
	
	$("gTotalOutput").value = "$" + parseFloat(grandTotal).toFixed(2);
	
	console.log(getOrderString());
	
	console.log("Totaler() end");
}

/*
	changeEvent - something changed, add everything up again
*/ 

var changeEvent = function()
{
	totaler(false);
};

 
// deal with the name and error icons
 function nameFunction()
{
	name = $("nameInput").value;
	if (name.length < 1) 
	{ 	// red X if name length is 0
		$("errMsg1").innerHTML = "<span id=\"errMsg1\" style=\"color: red;\"> &#10060</span>";
		name = "John Doe";
	}
	else if ($("nameInput").value == "John Doe")
		$("errMsg1").innerHTML = "<span id=\"errMsg1\" style=\"color: white;\"> &#10069</span>";
	else	// green check mark if name is acceptable
		$("errMsg1").innerHTML = "<span id=\"errMsg1\" style=\"color: green;\"> &#9989</span>";
}
 
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
			rad2[j].onchange = changeEvent;
		}
		$("id_tax").onchange = changeEvent;
		$("id_product").onchange = changeEvent;
		
		$("nameInput").value = "";
		$("nameInput").onchange = changeEvent;
		$("nameInput").onclick = changeEvent;
		$("nameInput").onblur = changeEvent;
		$("nameInput").onkeypress = changeEvent;
		$("nameInput").onstop = changeEvent;
		$("nameInput").focus();

		
		tax = taxCode($("id_tax").value);

		$("myTextArea").value = dateString() + "Cart:";
		$("myTextArea").style.visibility = "hidden";
		$("myTextArea").style.display = "none";
		
		$("id_price").selectedIndex = 0;
		
		$("select_latte").selectedIndex = 0;
		$("select_latte").onchange = changeEvent;
	
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
