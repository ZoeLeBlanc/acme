"use strict";

$(document).ready(() => {
	console.log("loading");
	let choiceDiv = $("#choice");
	let productsDiv = $("#products");
	var categories = [];
	var types = [];
	var products = [];

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
			var dropdownId = parseInt(event.target.id);
			getTypes().then( (typesData) => {
				types = typesData.types;
				// console.log(dropdownId);
				loadTypes(dropdownId);
			});
			

		});
	}

	function loadTypes(categoryId) {
		getProducts().then( (productsData) => {
			products = productsData.products;
		});
		$.each(types, (key, type) => {
			if (categoryId === types[key].category) {
				var clickId = types[key].id;
				loadProducts(clickId);
			}
		});
		
		
	}
	function loadProducts(typeId) {
		// $.each(typeId, (key, id) =>{
		// 	console.log(typeId[key].id);
		// });
		$.each(products, (key, product) =>{
			console.log(products[key].type);
		});
	}

	
});
