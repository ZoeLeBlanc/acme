"use strict";
$(document).ready(() => {
	console.log("loading");
	let choiceDiv = $("#choice");
	let productsDiv = $("#products");
	var categories = [];
	var types = [];
	var products = [];
	var productsList = [];

	function getCategories(){
		return new Promise( (resolve, reject) => {
			$.ajax({
				url: "json/categories.json"
			}).done( (data) => {
				resolve(data);
			}).fail( (error) => {
				reject(error);
			});
		});
	}

	function getTypes(){
		return new Promise( (resolve, reject) => {
			$.ajax({
				url: "json/types.json"
			}).done( (data) => {
				resolve(data);
			}).fail( (error) => {
				reject(error);
			});
		});
	}

	function getProducts(){
		return new Promise( (resolve, reject) => {
			$.ajax({
				url: "json/products.json"
			}).done( (data) => {
				resolve(data);
			}).fail( (error) => {
				reject(error);
			});
		});
	}
	getCategories().then( (categoriesData) =>{
		categories = categoriesData.categories;
		loadCategories(categories);
	});
	
	getProducts().then( (productsData) =>{
				products =productsData.products;
				$.each(products, (key, product) =>{
				productsList = products[key];
				});
	});
	function loadCategories(categoriesList) {
		choiceDiv.html("");
		var choiceConcat =`<div class="dropdown open">
  			<button class="btn btn-secondary btn-lg dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Select Category</button><div class="dropdown-menu" aria-labelledby="dropdownMenuButton">`;
  			$.each(categoriesList, (key, name) =>{
  				choiceConcat +=`<button class="dropdown-item" type="button" id=${key}>${categoriesList[key].name}</button>`;
  			});
  		choiceConcat+=`</div></div>`;
		console.log(choiceConcat);
		choiceDiv.append(choiceConcat);
  		$('#dropdownMenuButton').dropdown();
		$(".dropdown-item").click(function (event){
			productsDiv.html("");
			var dropdownId = parseInt(event.target.id);
			var dropdownName =event.target.innerHTML;
			getTypes().then( (typesData) => {
				types = typesData.types;
				// console.log(dropdownId);
				loadTypes(dropdownId, dropdownName);
			});
			
		});
	}

	function loadTypes(categoryId, categoryName) {
		
		$.each(types, (key, type) => {
			if (categoryId === types[key].category) {
				var clickId = types[key].id;
				var clickName = types[key].name;
				loadProducts(clickId, clickName, categoryName);
			

			}
		});
		
		
	}
	function loadProducts(typeId, typeName, categoryName) {
			var productsConcat = `<div class="container"><div class="row">`
			$.each(productsList, (key, item) =>{
				if (typeId === productsList[key].type){
					productsConcat += `<div class="col-md-4"><h4>${productsList[key].name}</h4><li>${typeName}</li><li>${categoryName}</li></div>`;
					
				}
				
			});
			productsConcat += `</div></div>`;
			productsDiv.append(productsConcat);


	}

	
});
