/*
	checkout.js
	External JS
	Jeremy Bowne - CIS166aa
 	Assignment 9
*/

// global variables
"use strict";
var tax = 0.092;
var tax_code = "G";

var name = "Morning Joe";

var runningSubTotal = 0.00;
var	runningTax = 0.00;
var	grandTotal = 0.00;

var emailAddress = "";
var	cardNumber = "0000000000000000";
var	expirationDate = "01/2020";

var visaPattern = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
var mastPattern = /^(?:5[1-5][0-9]{14})$/;
var amexPattern = /^(?:3[47][0-9]{13})$/;
var discPattern = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;

var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var validEmail = false;
var validCreditCard = false;
var validName = false;
var validCVV = false;

var ce =
{
	PRODUCT: 0,
	SUBPRODUCT: 1,
	TYPE: 2,
	TEMP: 3,
	QUANTITY: 4,
	PRICE: 5,
	SIZE: 6,
	properties: {
		0: {name: "product", value: 0, code: "P", 	price: [2.25, 2.50, 2.25, 2.75, 4.00], 	text: ["Hazelnut","Regular Decaf","Regular","Americano","Latte"]},
		1: {name: "subproduct", value: 1, code: "S",price: [2.00, 2.50, 2.75, 3.00], 		text: ["Mocha", "Macchiato", "Cappuccino", "Cafe au lait"]},
		2: {name: "type", value: 2, code: "T", 		price: [0.00, 0.00], 					text: ["Coffee","Latte"] },
		3: {name: "temp", value: 3, code: "D", 		price: [0.00, 0.50], 					text: ["Hot", "Cold"] },
		4: {name: "quantity", value: 4, code: "Q", 	price: [0.00], 							text: [""]},
		5: {name: "price", value: 5, code: "$",		price: [0.00], 							text: [""]},
		6: {name: "size", value: 6, code: "S", 		price: [0.50, 0.50, 0.50, 1.00], 		text: ["SM","MD","LG","XL"]}
	}
}


var cart = [["EMPTY_PRODUCT"], ["EMPTY_SUBPRODUCT"], ["EMPTY_TYPE"], ["EMPTY_TEMP"], [1], [0.00], ["EMPTY_SIZE"]];

function taxCode(arg1) 
{
	arg1 = arg1.toUpperCase(arg1);
	switch (arg1) {
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
function CartPop()
{
		cart[ce.PRODUCT].pop();
		cart[ce.SUBPRODUCT].pop();
		cart[ce.TYPE].pop();
		cart[ce.TEMP].pop();
		cart[ce.QUANTITY].pop();
		cart[ce.PRICE].pop();
		cart[ce.SIZE].pop();
}
function GetPriceByProduct(product, subproduct)
{
	if (product == "Latte")
		return parseFloat(GetPriceBySubProduct(subproduct));
	
	for (var q=0;    q<ce.properties[ce.PRODUCT].text.length;q++)
	{
		if (product == ce.properties[ce.PRODUCT].text[q] )
			return parseFloat(ce.properties[ce.PRODUCT].price[q]);

	}
	return 0.00;
}

function GetPriceBySubProduct(subproduct)
{
	for (var q=0;q<ce.properties[ce.SUBPRODUCT].text.length;q++)
	{
		if (subproduct == ce.properties[ce.SUBPRODUCT].text[q])
			return parseFloat(ce.properties[ce.SUBPRODUCT].price[q]);
	}
	return 0.00;
}
function GetPriceBySize(size)
{
	for (var q=0;q<ce.properties[ce.SIZE].text.length;q++)
	{
		if (size == ce.properties[ce.SIZE].text[q]) 
		{
			//console.log(ce.properties[ce.SIZE].text[q]);
			//console.log(ce.properties[ce.SIZE].price[q])
			return parseFloat(ce.properties[ce.SIZE].price[q]);
		}
	}
	return 0.00;
}
function GetPriceByTemperature(temp)
{
	for (var q=0;q<ce.properties[ce.TEMP].text.length;q++)
	{
		if (temp == ce.properties[ce.TEMP].text[q])
			return parseFloat(ce.properties[ce.TEMP].price[q]);
	}
	return 0.00;
}

function AdjustCartQuantities()
{
	for (var i=0;i<cart[ce.QUANTITY].length;i++)
	{
		AdjustCartQuantity(i);
	}
}
function AdjustCartQuantity(index)
{
		var item_string  = "#item_quant_" + index;
		var quant = $(item_string).val();
		cart[ce.QUANTITY][index] = quant;
		console.log(cart[ce.QUANTITY][index]);
}
function AdjustCartTotals()
{
	var runningSub = 0.00;
	for (var i=0;i<cart[ce.QUANTITY].length;i++)
	{
		var str_ttl = "#item_ttl_" + i.toString();
		console.log("-----------");
		console.log(str_ttl);
		console.log(cart[ce.PRODUCT][i])
		console.log(GetPriceByProduct(cart[ce.PRODUCT][i],cart[ce.SUBPRODUCT][i]));
		console.log(cart[ce.SIZE][i])
		console.log(GetPriceBySize(cart[ce.SIZE][i]));
		console.log(cart[ce.TEMP][i]);
		console.log(GetPriceByTemperature(cart[ce.TEMP][i]));
		console.log(cart[ce.QUANTITY][i]);
		
		console.log("***********");
		var subtotal = parseFloat(GetPriceByProduct(cart[ce.PRODUCT][i],cart[ce.SUBPRODUCT][i])) +
			parseFloat(GetPriceBySize(cart[ce.SIZE][i])) +
			parseFloat(GetPriceByTemperature(cart[ce.TEMP][i]));
		subtotal *= parseInt(cart[ce.QUANTITY][i]);
		console.log("st: " + subtotal);
		cart[ce.PRICE][i] = parseFloat(subtotal);
		$(str_ttl).text("$" + subtotal.toFixed(2));
		runningSub += subtotal;
		console.log("END");
	}
	$("#item_subtotal_price").text("Subtotal: $" + runningSub.toFixed(2));
	$("#item_tax_price").text("Tax: $" + (runningSub * tax).toFixed(2));
	$("#item_total_price").text("Total: $" + (runningSub + (runningSub * tax)).toFixed(2));
	
}
var minus_btn_click = function(e)
{
    e.preventDefault();
    var $this = $(this);
    var $input = $this.closest('div').find('input');
    var value = parseInt($input.val());
    if (value > 1)
        value = value - 1;
    else 
        value = 0;
    
	$input.val(value);
	AdjustCartQuantities();
	AdjustCartTotals();
};
var plus_btn_click = function(e)
{
    e.preventDefault();
    var $this = $(this);
    var $input = $this.closest('div').find('input');
    var value = parseInt($input.val());
 
    if (value < 100) 
        value = value + 1;
	else 
        value =100;
 
    $input.val(value);
	AdjustCartQuantities();
	AdjustCartTotals();
};

function AddRow(index)
{
		var divRow = "<div class=\"item\" id=\"item_" + index + "\">" +
				"<div class=\"quantity\"><button class=\"minus-btn\" type=\"button\" name=\"button\">-</button>" +
				"<input type=\"text\" id=\"item_quant_" + index + "\" class=\"qbox\" name=\"name\" value=\"" + cart[ce.QUANTITY][index] + "\" disabled>" +
				"<button class=\"plus-btn\" type=\"button\" name=\"button\">+</button>" +
				"</div>" +
				"<div class=\"description\"><span>"+cart[ce.SIZE][index]+"</span><span>"+ cart[ce.TEMP][index] + "</span><span>";
		divRow += (cart[ce.PRODUCT][index] == "Latte" ? (cart[ce.SUBPRODUCT][index] + " " + cart[ce.PRODUCT][index]) : (cart[ce.PRODUCT][index] 
				+ " " + cart[ce.TYPE][index]));
		divRow += "</span></div><div class=\"tpr\" id=\"item_ttl_" + index + "\">$" + cart[ce.PRICE][index].toFixed(2) + "</div></div>"
		console.log(divRow);
		$("#item_totals").before(divRow);
}
var ValidateEmail = function() 
{
	emailAddress = $("#id_emailadd").val();
	
	if (emailPattern.test(emailAddress))
	{
		console.log("email true");
		$("#id_email_error").html("&#9989");
		validEmail = true;
	}
	else
	{
		$("#id_email_error").html("&#10060");
		validEmail = false;
	}
	ValidateAll();
	return validEmail;
};

function ValidateCreditCardNumber(value) {
  // accept only digits, dashes or spaces
	if (/[^0-9-\s]+/.test(value)) 
		return false;

	// The Luhn Algorithm. It's so pretty.
	var nCheck = 0, nDigit = 0, bEven = false;
	value = value.replace(/\D/g, "");

	for (var n = value.length - 1; n >= 0; n--) {
		var cDigit = value.charAt(n), 
		nDigit = parseInt(cDigit, 10);

		if (bEven) 
		{
			if ((nDigit *= 2) > 9) 
				nDigit -= 9;
		}

		nCheck += nDigit;
		bEven = !bEven;
	}
	return (nCheck % 10) == 0;
}

var ValidateCard = function() {

    var ccNum  = $("#id_cardnumber").val();
	
    var isVisa = visaPattern.test( ccNum ) === true;
    var isMast = mastPattern.test( ccNum ) === true;
    var isAmex = amexPattern.test( ccNum ) === true;
    var isDisc = discPattern.test( ccNum ) === true;

    if( isVisa || isMast || isAmex || isDisc ) 
	{
        if (ValidateCreditCardNumber(ccNum))
		{
			$("#id_credit_error").html("&#9989");		
			validCreditCard = true;
		}
		else 
		{
			$("#id_credit_error").html("&#10060");
			validCreditCard = false;
		}
    }
    else
	{
		$("#id_credit_error").html("&#10060");
			validCreditCard = false;
	}
	ValidateAll();
	return validCreditCard;
};

var ValidateName = function()
{

	if ($("#id_cardname").val().length > 0)
	{
		$("#id_name_error").html("&#9989");
		validName = true;
	}
	else
	{
		$("#id_name_error").html("&#10060");	
		validName = false;
	}
	ValidateAll();
	return validName;
};

var ValidateCVV = function()
{
	var cvv = parseInt($("#id_cvv").val());
	if (cvv > 100 && cvv < 10000)
	{
		$("#id_cvv_error").html("&#9989");
		validCVV = true;
	}
	else
	{
		$("#id_cvv_error").html("&#10060");	
		validCVV = false;
	}
	ValidateAll();
	return validCVV;
};
var ValidateAll = function()
{
	if (validCVV && validCreditCard && validName && validEmail)
	{
		$("#id_proceed").slideDown("slow");
	}
	else 
		$("#id_proceed").fadeOut(3000);
};

function ReadSessionStorage()
{
	if (sessionStorage.getItem("tax_code"))
	{
		tax_code = sessionStorage.getItem("tax_code");
		tax = taxCode(tax_code);
		console.log("tax is : " + tax + " - tax_code is : " + tax_code);
	}

	if (sessionStorage.getItem("namaste"))
	{
		name = sessionStorage.getItem("namaste");
		console.log("name is : " + name);
		$("#id_cardname").val(name);
	}
	
	if (sessionStorage.getItem("email_address"))
	{
		emailAddress = sessionStorage.getItem("email_address");
		$("#id_emailadd").val(emailAddress);
	}
	
	var cartData = sessionStorage.getItem("cart");
	if (sessionStorage.getItem("cart"))
	{
		cart = JSON.parse(cartData);
		for (var i=0;i<cart[ce.PRODUCT].length;i++)
		{
			AddRow(i);
		}
		AdjustCartTotals();
		$(".plus-btn").on("click", plus_btn_click );
		$(".minus-btn").on("click", minus_btn_click );
	}
	else
	{
		alert("Couldn't find any items in your cart!");
		history.back();
	}
}
function WriteSessionStorage()
{
		sessionStorage.setItem("cart", JSON.stringify(cart));
		sessionStorage.setItem("tax_code", tax_code);
		sessionStorage.setItem("email_address", emailAddress);
		sessionStorage.setItem("namaste", $("#id_cardname").val().length > 0 ? $("#id_cardname").val().toString() : "Morning Joe");
}

// set the event handler function

$(document).ready(function()
{
		// set variables to their defaults and event handlers
		CartPop();
		ReadSessionStorage();

		AdjustCartTotals();

		$("#id_cardname").keyup(ValidateName);
		$("#id_emailadd").keyup(ValidateEmail);
		$("#id_cardnumber").keyup(ValidateCard);
		$("#id_cvv").keyup(ValidateCVV);

		$("#id_cardname").change(ValidateAll);
		$("#id_emailadd").change(ValidateAll);
		$("#id_cardnumber").change(ValidateAll);
		$("#id_cvv").change(ValidateAll);

		ValidateName();
		ValidateCard();
		ValidateCVV();
		ValidateEmail();
		$("#id_back").click(function (){history.back()});
		$("#id_proceed").hide();
});