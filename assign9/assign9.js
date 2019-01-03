/*
	myCode.js
	External JS
	Jeremy Bowne - CIS166aa
 	Assignment 9
*/

// global variables
"use strict";

// global variables
var runningSubTotal = 0.00;
var runningTax = 0.00;
var runningTotal = 0;
var tax = 0.08;

// for receipt sequence
var globalSequence = 1;

// customer name
var namaste = "";

// cart is a multi dimensional array which stores the data - uses JSON stringify to store in session storage
var cart = [["EMPTY_PRODUCT"], ["EMPTY_SUBPRODUCT"], ["EMPTY_TYPE"], ["EMPTY_TEMP"], [0], [0.00], ["EMPTY_SIZE"]];

// global booleans
var isBtnCreated = false;
var receiptShown = false;
var latteShown = false;
var isEdit = false;
var nutritionShown = true;

var lastSelectedProduct = "Regular";
/*
 * Object ce: "cart enum"
 * Description: This is a new object with enum style attributes and various
 * 				properties pertaining to the specific needs such as
 *				name, value, price, and text
*/
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
		5: {name: "price", value: 5, code: "M",		price: [0.00], 							text: [""]},
		6: {name: "size", value: 6, code: "Z", 		price: [0.50, 0.50, 0.50, 1.00], 		text: ["SM","MD","LG","XL"]}
	}
}



/*
	GetProdIndex
	returns the selected products' index
*/
function GetProdIndex()
{
	return parseInt($("#id_product option:selected").index());
}

/*
	GetSelectedPrice
	returns the selected products price
*/
function GetSelectedPrice()
{
	var opt = 0.00;
	if ($("#id_product").prop("selectedIndex") == 4)
	{
		if (!latteShown)
		{
			$("#select_latte").show();
			latteShown = true;
		}
		opt = ce.properties[ce.SUBPRODUCT].price[$("#select_latte").prop("selectedIndex")];
	}
	else
	{
		if (latteShown)
		{
			$("#select_latte").hide();
			latteShown = false;
		}
		opt = ce.properties[ce.PRODUCT].price[GetProdIndex()];
	}
	return parseFloat(opt);
}
/*
	GetPriceByProduct
	returns the price of the product based on product name and subproduct name
*/

function GetPriceByProduct(product, subproduct)
{
	if (product == "Latte")
		return GetPriceBySubProduct(subproduct);

	for (var q=0;q<ce.properties[ce.PRODUCT].text.length;q++)
	{
		if (product == ce.properties[ce.PRODUCT].text[q] )
			return parseFloat(ce.properties[ce.PRODUCT].price[q]);
	}
	return 0.00;
}

/*
	GetPriceBySubProduct
	returns the price based on subproduct name
*/
function GetPriceBySubProduct(subproduct)
{
	for (var q=0;q<ce.properties[ce.SUBPRODUCT].text.length;q++)
	{
		if (subproduct == ce.properties[ce.SUBPRODUCT].text[q])
			return parseFloat(ce.properties[ce.SUBPRODUCT].price[q]);
	}
	return 0.00;
}


/*
	GetPriceBySize
	returns the cost of the size name
*/
function GetPriceBySize(size)
{
	for (var q=0;q<ce.properties[ce.SIZE].text.length;q++)
	{
		if (size == ce.properties[ce.SIZE].text[q])
			return parseFloat(ce.properties[ce.SIZE].price[q]);
	}
	return 0.00;
}

/*
	GetPriceByTemperature
	returns the cost of the temperature name
*/
function GetPriceByTemperature(temp)
{
	for (var q=0;q<ce.properties[ce.TEMP].text.length;q++)
	{
		if (temp == ce.properties[ce.TEMP].text[q])
			return parseFloat(ce.properties[ce.TEMP].price[q]);
	}
	return 0.00;
}

/*
	btn_click
	When the receipt button is clicked, this will toggle the visibility of it
*/
var btn_click = function()
{
		if (!receiptShown) {
			receiptShown = true;
			$("#id_receipt").show();
		}
		else {
			receiptShown = false;
			$("#id_receipt").hide();
		}
 };

/*
	taxCode
	returns the tax rate based on the code of the city
*/
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

/*
	reset_all
	resets most elements to their default state
*/
var reset_all = function()
{
	$("#select_latte").prop("selectedIndex",0);

	$("#id_tmp_slider").prop("checked", false);

	$("#range_size").val(1);

	$("#id_product").prop("selectedIndex", 0);
	$("#id_tax").prop("selectedIndex", 0);
	$("#id_product").prop("selectedIndex",2);
	$("#id_quantity").prop("selectedIndex",0);

	runningTotal = 0.00,
	runningSubTotal = 0.00,
	runningTax = 0.00,

	tax = taxCode($("#id_tax").val());
	isEdit = false;
	receiptShown = false;
	latteShown = false;

	$("#select_latte").hide();
	$("#id_receipt").hide();

	isBtnCreated = false;

	$("#div_details").empty();

	while (cart[ce.PRODUCT].length > 0)
	{
		var tableString = "#id_row_" + (cart[ce.PRODUCT].length-1).toString();
		$(tableString).remove();
		CartPop();
	}
	UpdateCartTotals();
	totaler(false);
};

/*
	CartPop
	removes the last element of each array in the cart
*/
function CartPop()
{
		cart[ce.PRODUCT].pop();
		cart[ce.SUBPRODUCT].pop();
		cart[ce.TYPE].pop();
		cart[ce.TEMP].pop();
		cart[ce.QUANTITY].pop();
		cart[ce.PRICE].pop();
		cart[ce.SIZE].pop();
		//console.log(JSON.stringify(cart));
}

/*
	resetMore
	resets most elements to their default state, and then clears the session storage
*/
function resetMore()
{
	reset_all();
	sessionStorage.clear();
	namaste = "";
	$("#nameInput").val(namaste);
	$("#nameInput").prop("disabled", false);
	nameFunction();
}

/*
	checkCart
	Checks the cart to see if item is already in the list
	returns the item index for modification if true
	returns 999 if false, so the function knows to add an entirely new row
*/
var checkCart = function(tp, pd, sp, sz)
{
	for (var i=0;(i<cart[ce.PRODUCT].length);i++)
	{
		if ((cart[ce.PRODUCT][i]==pd)&&(cart[ce.TEMP][i]==tp)&&(cart[ce.SUBPRODUCT][i]==sp)&&(cart[ce.SIZE][i]==sz))
			return i;
	}
	return 999;
};

/*
	AddRow
	Adds a row, numbered by index, to the cart and table (parses html)
*/
function AddRow(index)
{
		var tableRow = "<tr id=\"id_row_" + (index).toString() +
						"\"><td class=\"left-align\">" + cart[ce.QUANTITY][index] +
						"</td><td class=\"center-align\">" + cart[ce.SIZE][index] +
						"</td><td class=\"center-align\">" + cart[ce.TEMP][index] +
						"</td><td>";

		tableRow += (cart[ce.PRODUCT][index] == "Latte" ? (cart[ce.SUBPRODUCT][index] + " " + cart[ce.PRODUCT][index]) : (cart[ce.PRODUCT][index] + " " + cart[ce.TYPE][index]));
		tableRow += "</td><td class=\"right-align\">$" + cart[ce.PRICE][index].toFixed(2).toString() + "</td></tr>";
		$("#id_subtotal").before(tableRow);
}

/*
	ModifyRow
	Modifies a row, based on index, on the cart and table (parses html)
*/
function ModifyRow(index)
{
		var string_id = "#id_row_" + index.toString();
		var tableRow = 	"<td class=\"left-align\">" + cart[ce.QUANTITY][index] +
						"</td><td class=\"center-align\">" + cart[ce.SIZE][index] +
						"</td><td class=\"center-align\">" + cart[ce.TEMP][index] +
						"</td><td>";
		tableRow += (cart[ce.PRODUCT][index] == "Latte" ? (cart[ce.SUBPRODUCT][index] + " " + cart[ce.PRODUCT][index]) : (cart[ce.PRODUCT][index] + " " + cart[ce.TYPE][index]));
		tableRow += "</td><td class=\"right-align\">$" + cart[ce.PRICE][index].toFixed(2).toString() + "</td>";
		$(string_id).html(tableRow);
}

/*
	AddToCart
	Takes in selected variables from UI elements and judges whether to add or modify
*/
function AddToCart()
{
	var productIndex = $("#id_product").prop("selectedIndex");
	var productName = ce.properties[ce.PRODUCT].text[productIndex];

	var quantityValue = GetSelectedQuantityValue();
	var temperatureName = GetSelectedTemperatureName();
	var sizeName = GetSelectedSizeName();
	var subProductName = (productIndex == 4 ? GetSelectedSubProduct() : "");

	// cartIndex will return 0 if its a new line, but if it already exists it'll return the index integer for modification
	var	cartIndex = checkCart(temperatureName, productName, subProductName, sizeName);
	if (cartIndex == 999)
	{
		cart[ce.PRODUCT].push(productName);
		cart[ce.SUBPRODUCT].push(subProductName);
		cart[ce.TYPE].push(productIndex == 4 ? "Latte" : "Coffee");
		cart[ce.TEMP].push(temperatureName);
		cart[ce.QUANTITY].push(quantityValue);
		cart[ce.PRICE].push(parseFloat(GetSelectedSubtotal()));
		cart[ce.SIZE].push(sizeName);
		AddRow(cart[ce.PRODUCT].length-1);
	}
	else
	{
		cart[ce.QUANTITY][cartIndex] = parseInt(cart[ce.QUANTITY][cartIndex]) + parseInt(quantityValue);
		cart[ce.PRICE][cartIndex] =
			(GetSelectedPrice() +
			ce.properties[ce.SIZE].price[$("#range_size").val()-1] +
			ce.properties[ce.TEMP].price[temperatureName=="Hot" ? 0.00 : 1.00]) *
			cart[ce.QUANTITY][cartIndex];
		ModifyRow(cartIndex);
	}
}

/*
	GetSelectedSubProduct
	Gets the name of the currently selected SubProduct
*/
function GetSelectedSubProduct()
{
	return $("#select_latte option:selected").text();
}

/*
	GetSelectedTemperatureName
	Gets the name of the currently selected Temperature(hot or cold) element
*/
function GetSelectedTemperatureName()
{
	return ce.properties[ce.TEMP].text[	$("#id_tmp_slider").is(":checked") ? 1 : 0 	];
}

/*
	GetSelectedTemperatureValue
	Gets the value of the currently selected Temperature(hot or cold) element
*/
function GetSelectedTemperatureValue()
{
	return $("#id_tmp_slider").is(":checked") ? 0.50 : 0.00;
}

/*
	GetSelectedSizeName
	Gets the name of the currently selected size element
*/
function GetSelectedSizeName()
{
	return ce.properties[ce.SIZE].text[$("#range_size").val()-1];
}

/*
	GetSelectedSizeValue
	Gets the name of the currently selected Temperature(hot or cold) element
*/
function GetSelectedSizeValue()
{
	return (parseInt($("#range_size").val()) < 4) ? 0.50 : 1.00 ;
}

/*
	GetSelectedQuantityValue
	Gets the name of the currently selected Temperature(hot or cold) element
*/
function GetSelectedQuantityValue()
{
	return parseInt($("#id_quantity").val());
}

/*
	GetSelectedTaxValue
	Gets the tax rate from selection
*/
function GetSelectedTaxValue()
{
	return parseFloat(taxCode($("#id_tax").val()));
}

/*
	GetSelectedSubtotal
	Adds up all of the prices of the current selection for the individual subtotal before adding to cart
*/
function GetSelectedSubtotal()
{
	return (parseFloat(GetSelectedTemperatureValue()) + parseFloat(GetSelectedSizeValue()) + parseFloat(GetSelectedPrice())) * parseInt(GetSelectedQuantityValue().toString());
}

/*
	GetCartSubTotal
	Adds up all of the prices in the cart for one large subtotal
*/
function GetCartSubTotal()
{
	var q = 0.00;
	var tt = 0.00;

	for (var i=0;i<cart[ce.PRICE].length;i++)
	{
		q = 0.00;
		q += parseFloat(GetPriceByProduct(cart[ce.PRODUCT][i], cart[ce.SUBPRODUCT][i]));
		q += parseFloat(GetPriceByTemperature(cart[ce.TEMP][i]));
		q += parseFloat(GetPriceBySize(cart[ce.SIZE][i]));
		q = q * parseFloat(cart[ce.QUANTITY][i]);
		tt += q;
	}

	return parseFloat(tt);
}

/*
	GetCartSubTotal
	Adds up all of the prices in the cart for one large subtotal
*/
function GetCartQuantity()
{
	var q = 0;
	for (var i=0;i<cart[ce.QUANTITY].length;i++)
	{
		q += parseInt(cart[ce.QUANTITY][i]);
	}
	return parseInt(q);
}

/*
	GetCartSubTotal
	Adds up all of the prices in the cart for one large subtotal
*/
function GetCartTaxAmount()
{
	return parseFloat(GetCartSubTotal() * tax);
}


function GetCartTotal()
{
		return parseFloat(GetCartSubTotal() + GetCartTaxAmount());
}

/*
	GetCartSubTotal
	Adds up all of the prices in the cart for one large subtotal
*/
function UpdateCartTotals()
{
		runningSubTotal = GetCartSubTotal();
		runningTax = GetCartTaxAmount();
		runningTotal = runningSubTotal + runningTax;
}

/*
	GetCartSubTotal
	Adds up all of the prices in the cart for one large subtotal
*/
function totaler(isClicked)
{
	tax = GetSelectedTaxValue();

	if (isClicked)
	{
		AddToCart();
		UpdateCartTotals();

		if (!isEdit)
			isEdit = true;
		// create a button if one isnt there yet
		if (!isBtnCreated)
		{
			isBtnCreated = true;
			if (!receiptShown)
				receiptShown = true;
		}
		//WriteSessionStorage();
	}
	WriteSessionStorage();
	UserInterfaceUpdate();
}


/*
	GetCartSubTotal
	Adds up all of the prices in the cart for one large subtotal
*/
function UserInterfaceUpdate()
{
	var t = GetSelectedSubtotal();
	nameFunction();

	$("#id_price").text(	"$" + GetSelectedPrice().toFixed(2)		);
	$("#id_temp").text(		"$" + parseFloat(GetSelectedTemperatureValue()).toFixed(2)	);
	$("#id_size").text(		"$" + parseFloat(GetSelectedSizeValue()).toFixed(2)		);

	$("#subTotalInput").val(	"$" + parseFloat(t).toFixed(2)	);
	$("#cityTaxOutput").val(	"$" + (parseFloat(t) * parseFloat(tax)).toFixed(2)	);
	$("#totalOutput").val(	"$" + parseFloat((t*tax+t)).toFixed(2)	);

	$("#id_date").text(dateString());
	$("#id_cart_quantity").text(	GetCartQuantity().toString()	);

	$("#id_row_subtotal_amount").text("$" + parseFloat(GetCartSubTotal()).toFixed(2));
	$("#id_row_tax_amount").text("$" + parseFloat(GetCartTaxAmount()).toFixed(2));
	$("#id_row_total").text("$" + parseFloat(GetCartTotal()).toFixed(2));

	$("#gTotalOutput").val("$" + parseFloat(GetCartTotal()).toFixed(2));

	$("#id_tax").prop("disabled", isEdit);
	//$("#nameInput").prop("disabled", (isEdit && namaste.length > 0));

	receiptShown ? $("#id_receipt").show() : $("#id_receipt").hide();

	(nutritionShown && $(".table_nut").is(":hidden")) ? $(".table_nut").hide() : $(".table_nut").show();

	if (!nutritionShown) $(".table_nut").hide();
	else $(".table_nut").show();

	$("#btn_chck").prop("disabled", 		(runningTotal > 0 && namaste.length > 0)  ? false : true);
	$("#id_cart_checkout").prop("disabled", (runningTotal > 0 && namaste.length > 0)  ? false : true);

	$("#id_global_sequence").text("SEQ:" + globalSequence.toString());


	if ($("#btn_receipt").length == 0 && isBtnCreated  )
		$(".btn_class").after('<input type="button" id="btn_receipt" class="custom-button" value="Receipt" onclick="btn_click();" />');
	if ($("#btn_receipt").length > 0 && !isBtnCreated )
		$(".btn_class").next().remove();
}

/*
	changeEvent - something changed, add everything up again
*/
var changeEvent = function() {
	totaler(false);
};

/*
	nameFunction
	places a marker next to name based on if it is ok
*/
function nameFunction()
{
	namaste = $("#nameInput").val();
	if (namaste.length < 1)
		$("#errMsg1").html("&#10060");
	else
		$("#errMsg1").html("&#9989");
}

/*
	dateString
	returns a string with the current date/time
*/
 function dateString()
 {
	var d = new Date();
	var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
	var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	return (days[d.getDay()] + ", " + months[d.getMonth()] + ". " + d.getDate() + ", " + d.getFullYear() + "  " +
			d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + "\n");
 }

 /*
	dragElement
	borrowed from w3 schools, makes the div elements draggable like windows
*/
function dragElement(elmnt)
{
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header"))
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
   else
    elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e)
  {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e)
  {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement()
  {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

/*
	ReadSessionStorage
	Reads the session storage and places variables, etc where they need to be
*/
function ReadSessionStorage()
{
	var tax_code = sessionStorage.getItem("tax_code");
	if (sessionStorage.getItem("tax_code"))
	{
		var tax_code = sessionStorage.getItem("tax_code");
		tax = parseFloat(taxCode(tax_code));
		switch (tax_code)
		{
			case "G":
				$("#id_tax").prop("selectedIndex", 0);
			break;

			case "P":
				$("#id_tax").prop("selectedIndex", 1);
			break;

			case "PH":
				$("#id_tax").prop("selectedIndex", 2);
			break;
		}
	}

	if (sessionStorage.getItem("namaste"))
	{
		namaste = sessionStorage.getItem("namaste");
		$("#nameInput").val(namaste);
	}

	if (sessionStorage.getItem("cart"))
	{
		cart = JSON.parse(sessionStorage.getItem("cart"));

		for (var i=0;i<cart[ce.PRODUCT].length;i++)
			AddRow(i);

		isBtnCreated = true;
		isEdit = true;
		latteShown = false;
		receiptShown = true;

		$("#id_receipt").show();
		$("#select_latte").hide();

		tax = GetSelectedTaxValue();
		runningTotal = GetCartTotal();

		UpdateCartTotals();
		UserInterfaceUpdate();
	}
}

/*
	WriteSessionStorage
	Writes all persistent variables to the session storage to be read later
*/
function WriteSessionStorage()
{
		namaste = $("#nameInput").val();

		if (cart[ce.QUANTITY].length > 0)
			sessionStorage.setItem("cart", JSON.stringify(cart));

		if ($("#id_tax").val().length > 0)
			sessionStorage.setItem("tax_code", $("#id_tax").val());

		if (namaste.length > 0)
			sessionStorage.setItem("namaste", namaste);

}
/*
	JSONutrition
	Grabs JSON data using AJAX function through JQUERY.
	I basically bloated instructor (Prof. Marrer)'s function
*/
function JSONutrition(inProduct)
{
	 $.ajax({
				type: "get",
				url: "https://web.gccaz.edu/~jer2182916/CIS166AA/assign9/nutrition.json",
				beforeSend: function() {
					$("#div_details").html("Loading...");
				},
				timeout: 10000,
				error: function(xhr, status, error) {
					alert("Error: " + xhr.status + " - " + error);
				},
				dataType: "json",
				success: function(data) {
						$("#div_details").html("");
						$.each(data, function()
						{
							$.each(this, function(key, value)
							{
							// if my product name is equal to currently cycled json data, make a huge html string and write the data to the dom
								if (value.productName == inProduct)   // added to show only selected coffee
								{
								var nutritionHTML =	"<table class=\"table_nut\"><caption>Nutrition Facts</caption>" +
								"<tr><td colspan = \"4\">Serving Size 1 cup (about 164g)</td>" + "</tr>" +
								"<tr class=\"thick-end\"><td colspan =\"3\">Serving Per Container 1</td>" + "</tr>" +
								"<tr><td>Amount Per Serving</td>" + 	"</tr>" +
								"<tr><td>Calories " 			+ value.calories + "</td>" +
									"<td>Calories from Fat</td><td></td><td>" 	+ value.caloriesFromFat + "</td></tr>" +
								"<tr><td></td><td></td><td></td><td class=\"text-right\">% Daily Value*</td>" + "</tr>" +
								"<tr><td>Total Fat</td><td>" 			+ value.totalFat 	+ "</td><td></td><td class=\"text-right\">" + value.fatPercent + "%</td>" +  "</tr>" +
								"<tr><td>Saturated Fat</td><td>" 		+ value.saturatedFat +"</td><td></td><td>" + value.saturatedFatPercent + "%</td>"+ "</tr>" +
								"<tr><td>Trans Fat</td><td>"			+ value.transFat 	+ "</td></tr>" +
								"<tr><td>Cholesterol</td><td>" 			+ value.cholesterol + "</td><td></td><td>" + value.cholesterolPercent+"%</td>" + "</tr>" +
								"<tr><td>Sodium</td><td>" 				+ value.sodium 		+ "</td><td></td><td>" + value.sodiumPercent + "%</td>" + "</tr>" +
								"<tr><td>Total Carbohydrate</td><td>" 	+ value.carb 		+ "</td><td></td><td>" + value.carbPercent+"%</td>"+ "</tr>" +
								"<tr><td>Dietary Fiber</td><td>"		+ value.fiber 		+ "</td><td></td><td>" + value.fiberPercent+"%</td>"+ "</tr>" +
								"<tr><td>Sugars</td><td>"  				+ value.sugars 		+ "</td></tr>" +
								"<tr class=\"thick-end\"><td>Protein</td><td>" 				+ value.protein 	+ "</td></tr>" +
								"<tr><td>Vitamin A " + value.vitaminA + "%</td><td></td>" + "<td>Vitamin C " + value.vitaminC + "%</td>"+ "</tr>" +
								"<tr><td>Calcium  " + value.calcium   + "%</td><td></td>" + "<td>Iron " 		 + value.iron + "%</td>" + "</tr>" +
								"<tr class=\"small-info\"><td colspan=\"5\">* Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower depending on your calorie needs:</td>" + "</tr>" +
								"<tr><td>Calories:</td><td></td><td>2,000</td><td>2,500</td>"+"</tr>" +
								"<tr><td>Total Fat</td><td>Less than</td><td>65g</td><td>80g</td>"+ "</tr>" +
								"<tr><td>Saturated Fat</td><td>Less than</td><td>20g</td><td>25g</td>"+ "</tr>" +
								"<tr><td>Cholesterol</td><td>Less than</td><td>300mg</td><td>300 mg</td>"+ "</tr>" +
								"<tr><td>Sodium</td><td>Less than</td><td>2,400mg</td><td>2,400mg</td>"+ "</tr>" +
								"<tr><td>Total Carbohydrate</td><td></td><td>300g</td><td>375g</td>"+ "</tr>" +
								"<tr><td>Dietary Fiber</td><td></td><td>25g</td><td>30g</td></tr></table>";

								$("#div_details").append(nutritionHTML);
								}
							});
						});

				}
			});
}

var selectClick = function()
{
//	if (lastSelectedProduct != this.value)
//	{
		totaler(false);
		//console.log("this value is " + this.value);
		JSONutrition(this.value);
		UserInterfaceUpdate();
		lastSelectedProduct = this.value;
//	}
};

/*
	$(document).ready
	After the dom is loaded, this will set everything to where it needs to be
*/
$(document).ready(function()
{
		// set variables to their defaults and event handlers
		$(".e_change").change(changeEvent);
		$("#btn_reset").click(resetMore);
		$("#id_quantity").click(changeEvent);
		$("#id_product").click(selectClick);


		CartPop();

		ReadSessionStorage();
		if (cart[ce.QUANTITY].length > 0)
		{
			UpdateCartTotals();
		}
		else
		{
			reset_all();
		}
		$("#nameInput").focus();

		$("#mainheader").slideDown("slow");

		dragElement(document.getElementById("div_movable"));
		dragElement(document.getElementById("main"));

		//$("#id_product").click();
});
