/*
	myCode.js
	External JS
	Jeremy Bowne - CIS166aa
 	Assignment 7
*/

// global variables
"use strict";
//var orderString = "";
var grandTotal = 0;
var subtotal = 0;
var tax = 0.08;
var total = 0.00;

var runningSubTotal = 0.00;
var runningTax = 0.00;

var isEdit = false;
var orderStringText = "";
var name = "Valued Customer";
var showLatte = false;
var arrayProducts = ["Hazelnut","Regular Decaf","Regular","Americano","Latte"];
var arrayPrices = [2.25, 2.50, 2.25, 2.75, 4.00];

var isBtnCreated = false;
var t;
var shown = false;


/* 
	return price, product name, based on getProdIndex
*/
function getProdIndex()
{	
	//return $("#id_product").prop("selectedIndex");
	console.log($("#id_product option:selected").index());
	return $("#id_product option:selected").index();
	//return $("#id_product").index();
}
function getProdName()
{
	return arrayProducts[getProdIndex()];
}


function getPrice()
{
	if ($("#id_product").prop("selectedIndex") == 4)
	{
		//$("#select_latte").show();
		$("#select_latte").fadeIn();
		$("#select_latte").fadeIn("slow");
		$("#select_latte").fadeIn(3000);
		var opt = $("#select_latte option:selected").val();

		$("#id_price").html("<span id=\"id_price\" style=\"color: green;font-weight: bold;\"> $" + parseFloat(opt).toFixed(2) + "</span>");
		return parseFloat(opt).toFixed(2);
	}
	else 
	{		
		//$("#select_latte").hide();
		var tmp = arrayPrices[getProdIndex()];
		console.log(tmp);
		$("#select_latte").fadeOut();
		$("#select_latte").fadeOut("slow");
		$("#select_latte").fadeOut(3000);
		$("#id_price").html("<span id=\"id_price\" style=\"color: green;font-weight: bold;\"> $" + parseFloat(tmp).toFixed(2) + "</span>");
		//$("#id_price").text = arrayPrices[getProdIndex()];
		return tmp;
	}
}

//btn_click event for 
 var btn_click = function()
 {
		if (!shown) 
		{
			shown = true;
			//$("#myTextArea").show();
			$("#myTextArea").fadeIn();
			$("#myTextArea").fadeIn("slow");
			$("#myTextArea").fadeIn(3000);
			$("#myTextArea").val(orderStringText);
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

	var re = orderStringText.replace(/\n/g, "<br />");
	var x=window.open();
	x.document.open();

	x.document.write("<!DOCTYPE html><head><title>Receipt</title></head><body>" +
		"<p>" + re + "<br /><br />" + 
		"------------------<br /><br />" +
		"Subtotal: $" + parseFloat(runningSubTotal).toFixed(2) + 
		"<br />Total Taxes: $" + parseFloat(runningTax).toFixed(2) + 
		"<br />Total Bill: $" + parseFloat(grandTotal).toFixed(2) + 
		"<br><br>------------------<br><br>" +
		"Thank you " + name +
		"<br><br />Tip:______<br />" + 
		"Total With Tip:_______<br /></p></body></html>");
	x.document.close();
	
	$("#hotRadio").prop("checked", true);
	$("#smallCoffee").prop("checked", true);
	
		
	total = 0.00;
	subtotal = 0.00;
	grandTotal = 0.00;
	
	$("#nameInput").val("");
	
	$("#gTotalOutput").val("0");
	$("#totalOutput").val("0");
	$("#subTotalInput").val("0");
	
	$("#id_product").prop("selectedIndex", 0);	
	$("#id_tax").prop("selectedIndex", 0);
	$("#id_product").prop("selectedIndex",2);
	
	
	tax = taxCode($("#id_tax").val());

	isEdit = false;	
	$("#id_tax").prop("disabled",false);
	$("#nameInput").prop("disabled",false);
	
	$("#select_latte").prop("selectedIndex",0);	

	$("#select_latte").hide();
	
	orderStringText = "Glendale Community Coffee\n" + "6000 W. Olive\n" + "Glendale,AZ  85302\n(623)555-1234\n\n" + "Online Order\n" + "------------------\n" + dateString() + "------------------\n";
	$("#myTextArea").val("");
	$("#myTextArea").hide();

	runningSubTotal = 0.00;
	runningTax = 0.00;
	
	if (isBtnCreated)
	{
		$(".btn_class").next().remove();
		isBtnCreated = false;
		shown = false;
	}
	totaler(false);
	console.log("checkOut() end");
	
	$("#nameInput").focus();
}
/* 
	totaler - gathers information into variables
*/ 
function getOrderString()
{
	var orderString = "";
	var hotcoldradios = $("#id_main input:radio[name='hotcoldradio']");
	var hotcoldindex = hotcoldradios.index(hotcoldradios.filter(":checked"));

	var sizeradios = $("#id_main input:radio[name='radiobuttons']");
	var sizeindex = sizeradios.index(sizeradios.filter(":checked"));
	
	var ix = $("#id_product").prop("selectedIndex");
	
	var pd = arrayProducts[ix];
	var sz = "";
	var tp = "";
	
	switch (hotcoldindex)
	{
		case 0:
		tp = "Hot";
		break;
		case 1:
		tp = "Cold";				
		break;
	}
	switch (sizeindex)
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
	
	orderString = "1 " + sz + " " + tp + " " + pd + " coffee";
	if (ix == 4)
		orderString += " (" + $("#select_latte option:selected").text() + ")";
	
	orderString += " - $" + parseFloat(total).toFixed(2);
	console.log(orderString);
	return orderString;
}


function totaler(isClicked)
{
	console.log("Totaler() begin");

	total = 0.00;

	var hotcoldradios = $("#id_main input:radio[name='hotcoldradio']");
	var hotcoldindex = hotcoldradios.index(hotcoldradios.filter(":checked"));
	var hotcoldval = hotcoldradios.filter(":checked").val();
	
	var sizeradios = $("#id_main input:radio[name='radiobuttons']");
	var sizeindex = sizeradios.index(sizeradios.filter(":checked"));
	var sizeval = sizeradios.filter(":checked").val();
	
	total += parseFloat(hotcoldval);
	total += parseFloat(sizeval);
	
	hotcoldradios.each(function() 
	{
			if ($(this).is(":checked"))
			{
				switch(hotcoldradios.index(this))
				{
					case 0:
						$("#id_hot_coffee").prop("style", "width:64px;height:64px;border-color: green;border:4;");
						$("#id_hot_coffee").prop("border", "4");
					break;
					case 1:
						$("#id_cold_coffee").prop("style", "width:64px;height:64px;border-color: green;border:4;");
						$("#id_cold_coffee").prop("border", "4");
					break;
				}
			}
			else
			{
				switch(hotcoldradios.index(this))
				{
					case 0:
						$("#id_hot_coffee").prop("style", "width:64px;height:64px;border-color: black;border:2;");
						$("#id_hot_coffee").prop("border", "2");
					break;
					case 1:
						$("#id_cold_coffee").prop("style", "width:64px;height:64px;border-color: black;border:2;");
						$("#id_cold_coffee").prop("border", "2");
					break;
				}
			}
	});
	
	sizeradios.each(function()
	{
		if ($(this).is(":checked"))
		{
			switch(sizeradios.index(this))
			{
				case 0:
					$("#id_size_sml").prop("style","width:24px;height:24px;border-color: green;");
					break;
				case 1:
					$("#id_size_med").prop("style","width:38px;height:38px;border-color: green;");
					break;
				case 2:
					$("#id_size_lrg").prop("style","width:48px;height:48px;border-color: green;");
					break;
				case 3:
					$("#id_size_xlg").prop("style","width:64px;height:64px;border-color: green;");
					break;
			}
		}
		else
		{
			switch(sizeradios.index(this))
			{
				case 0:
					$("#id_size_sml").prop("style", "width:24px;height:24px;");
					break;
				case 1:
					$("#id_size_med").prop("style","width:38px;height:38px;");
					break;
				case 2:
					$("#id_size_lrg").prop("style","width:48px;height:48px;");
					break;
				case 3:
					$("#id_size_xlg").prop("style","width:64px;height:64px;");
					break;
			}
		}
	});

	tax = taxCode($("#id_tax").val());//.toFixed(2);	
	
	total += parseFloat(getPrice());
	console.log("total: $" + total);
	
	
	$("#subTotalInput").val("$" + parseFloat(total).toFixed(2));
	$("#totalOutput").val("$" + parseFloat((total*tax + total)).toFixed(2));
	$("#cityTaxOutput").val((tax * 100).toFixed(2) + "%");
	$("#id_temp").text("$" + hotcoldval);
	$("#id_size").text("$" + sizeval);
	
	nameFunction();



	if (isClicked) 
	{	
		runningSubTotal += total;
		runningTax += ((total*tax + total) - total);

		$("#myTextArea").val("");
		$("#myTextArea").text("");
		
		grandTotal += ((total*tax) + total);
		orderStringText = orderStringText + "\n" + getOrderString();

		$("#myTextArea").val(orderStringText);
		
		if (!isEdit)
		{
			// dont allow editing name and tax rate once order process has begun
			isEdit = true;			
			$("#id_tax").prop("disabled", true);
			$("#nameInput").prop("disabled", true);
		}
		// create a button if one isnt there yet
		if (!isBtnCreated) 
		{
			var r = '<input type="button" id="id_receipt" class="btn btn-primary" value="Receipt" onclick="btn_click()" /> ';
			isBtnCreated = true;
			$(".btn_class").after(r);
		}
	}
	
	$("#gTotalOutput").val("$" + parseFloat(grandTotal).toFixed(2));

	console.log("Totaler() end");
}

/*
	changeEvent - something changed, add everything up again
*/ 

var changeEvent = function()
{
	totaler(false);
};

 

function nameFunction()
{
	name = $("#nameInput").val();
	if ($("#nameInput").val().length < 1) 
	{ 	// red X if name length is 0
		$("#errMsg1").html("<span id=\"errMsg1\" style=\"color: red;\"> &#10060</span>");
		name = "Valued Customer";
		$("#nameInput").val(name)
	}
	else if ($("#nameInput").val() === "Valued Customer")
		$("#errMsg1").html("<span id=\"errMsg1\" style=\"color: white;\"> &#10069</span>");
	else	// green check mark if name is acceptable
		$("#errMsg1").html("<span id=\"errMsg1\" style=\"color: green;\"> &#9989</span>");
}
 
 /* 
	init function
 */
 function dateString()
 {
		var d = new Date();
		var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		return (days[d.getDay()] + ", " + months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear() + "\n");
 }
 
// set the event handler function
$(document).ready(function(){
	
		// set variables to their defaults and 
		// event handlers for radiobuttons
		$(":radio").each(function() {
			$(this).change(changeEvent);
		});

		$("#id_tax").change(changeEvent);
		$("#id_product").change(changeEvent);
		$("#select_latte").change(changeEvent);
		$("#nameInput").change(changeEvent);
		
		$("#nameInput").val("Valued Customer");
		$("#nameInput").focus();

		$("#myTextArea").hide();

		$("#id_price").prop("selectedIndex", 0);
		$("#select_latte").prop("selectedIndex", 0);
		$("#select_latte").hide();
		
		tax = taxCode($("#id_tax").val());
		
		orderStringText = "Glendale Community Coffee\n" + "6000 W. Olive\n" + "Glendale,AZ  85302\n(623)555-1234\n\n" + "Online Order\n" + "------------------\n" + dateString() + "------------------\n";

		
		totaler(false);

        $("#main").fadeIn();
        $("#main").fadeIn("slow");
        $("#main").fadeIn(6000);

		$("#panel").slideDown("slow");
		
		console.log("init() finished ");
});