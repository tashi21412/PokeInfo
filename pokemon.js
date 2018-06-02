var limit = 40;
var offset = 0;


//creates div automatically when cliked on "ListAll"
//call back function
function loadPokemon(pokemon){
	var allPokeInfo = pokemon.results;
	
	var div = document.getElementById("contain");
	
	for (var i = 0 ; i <= allPokeInfo.length; i++ ){

	var mydiv = document.createElement("div");
	mydiv.setAttribute('class', 'indi_poke');
	mydiv.style.background='#00E5FF';
	mydiv.style.float = "left";
	var para = document.createElement("p");
	var node = document.createTextNode(allPokeInfo[i].name);
	
	para.appendChild(node);
	
	var pokeImg = document.createElement("IMG");
	pokeImg.style.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
	var myPokeNumber = offset+i+1;
	
	var pokeImgurl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+myPokeNumber+".png"
	
	pokeImg.src = pokeImgurl;
	
	mydiv.appendChild(pokeImg);
	mydiv.appendChild(para);
	div.height = $(mydiv).width();
	console.log( $(mydiv).width());
	div.appendChild(mydiv);
	
	}
	
}

// Gets number of pokemon depending on limit and offset
function getPokemon(limitx, offsety){
	
	var xhr;
	//Step 1. Open XHR
		xhr = new XMLHttpRequest();
		
		//Step 2. function to handle ready state change of response
		xhr.onreadystatechange = function() {
			
			if(xhr.readyState == 4 && xhr.status == 200){
				
				console.log(xhr.responseText);
				var pokemon = JSON.parse(xhr.responseText);
				
				loadPokemon(pokemon);
				
				
			}
			
		}
		
		//Step 3. Open connection
		xhr.open("GET", "https://pokeapi.co/api/v2/pokemon/?limit="+limitx+"&offset="+offsety, true);
		//Step 4. Send request
		xhr.send();
		
	
		
}

//Find Pokemon through search bar
$(document).ready(function () {
	
	$("#pokeSearch").on("click", function(){
	var pokemonId = document.getElementById("pokeSearchValue").value;
	
			
	var xhr;
		//Step 1. Open XHR
		xhr = new XMLHttpRequest();
		
		//Step 2. function to handle ready state change of response
		xhr.onreadystatechange = function() {
			
			if(xhr.readyState == 4 && xhr.status == 200){
				
				var pokemon = JSON.parse(xhr.responseText);
				
				loadPokemonInfoCard(pokemon);
			
				
			}
			else if (xhr.status==404){
				alert("Pokemon not found");
			}
			
			
			
		}
		
		//Step 3. Open connection
		xhr.open("GET", "https://pokeapi.co/api/v2/pokemon/"+pokemonId, true);
		//Step 4. Send request
		xhr.send();
});
  
});




$("#contain").on("click",".indi_poke", function(){
	var pokemonName = $(this).text();
	alert(pokemonName);
	$(".curtain").fadeIn();
	  getIndividualPokemon(pokemonName);
});




function getIndividualPokemon(pokemonName){
		document.getElementById("there_poke_name").innerHTML = pokemonName;
		var xhr;
		//Step 1. Open XHR
		xhr = new XMLHttpRequest();
		
		//Step 2. function to handle ready state change of response
		xhr.onreadystatechange = function() {
			
			if(xhr.readyState == 4 && xhr.status == 200){
				
				console.log(xhr.responseText);
				var pokemon = JSON.parse(xhr.responseText);
				
				loadIndividualPokemon(pokemon);
				
				
			}
			
		}
		
		//Step 3. Open connection
		xhr.open("GET", "https://pokeapi.co/api/v2/pokemon/"+pokemonName, true);
		//Step 4. Send request
		xhr.send();
		
	
		
}
	
function loadIndividualPokemon(foundPokemon){
	$("#pokemonCard").show();
	document.getElementById("pokemonImg").src = foundPokemon.sprites.front_default;
}

function loadPokemonInfoCard(foundPokemon){
	document.getElementById("pokemonName").innerHTML = foundPokemon.name;
	document.getElementById("infoCardPokemon").src = foundPokemon.sprites.front_default;

	//list what type it belongs to
	var types = foundPokemon.types;
	var allTypes ="";

	for (i in types){
		allTypes = allTypes +" "+ types[i].type.name+ "<br>";
	} 
	//decide background color
	var decideBackground = types[0].type.name;

	switch (decideBackground){
		case 'normal':
			infoCard.style.background= 'brown';
			break;
		case 'fire':
			infoCard.style.background= '#FF5722';
			break;
		case 'water':
			infoCard.style.background= '#03A9F4';
			break;
		case 'grass':
			infoCard.style.background= '#CAF50';
			break;
		case 'electric':
			infoCard.style.background= '#FFEB3B';
			break;
		case 'fighting':
			infoCard.style.background= '#FF9800';
			break;
		case 'poison':
			infoCard.style.background= '#4CAF50';
			break;

		case 'ground':
			infoCard.style.background= '#795548';
			break;

		case 'flying':
			infoCard.style.background= '#81D4FA';
			break;
		case 'psychic':
			infoCard.style.background= '#EEEEEE';
			break;
		case 'bug':
			infoCard.style.background= '#CDDC39';
			break;

		case 'rock':
			infoCard.style.background= '#607D8B';
			break;

		case 'dragon':
			infoCard.style.background= '#AB47BC';
			break;

		case 'dark':
			infoCard.style.background= '#212121';
			break;

		case 'steel':
			infoCard.style.background= '#607D8B';
			break;
		case 'fairy':
			infoCard.style.background= '#EC407A';
		break;
		default:
			infoCard.style.background='#1DE9B6';

	}


	document.getElementById("type").innerHTML = "Type: "+ allTypes;
	document.getElementById("hp").innerHTML = foundPokemon.id;
	document.getElementById("heightweight").innerHTML = "Height: "+foundPokemon.height + "cm Weight: "+ foundPokemon.weight + "kg";

	// lists all it's power
	var moves = foundPokemon.abilities;
	var allAbilities="";
	for (i in moves){
		allAbilities = allAbilities +" "+ moves[i].ability.name +"<br>";
	} 
	document.getElementById("moves").innerHTML = allAbilities;
}

function getAll(){
	$('#contain').empty();
	$("#content").show();
	$("#intro").hide();
	offset = 0;
	limit=151;
	getPokemon(limit,offset);
	
}
function resetLimit(){
	$("#content").hide();
	$("#intro").show();
	
}
$(document).ready(function(){
   
    $("#pika").animate({right: '175px'},1500);
   
});

function pikaDisappear(){
	$("#pika").fadeOut("slow");
}

function curtainOff(){
	$(".curtain").fadeOut("slow");
}
$(document).ready(function(){
	$("#pokemonName").click( function(){
		
		$("#morePokeInfo").show();
	
	});
});
var aud = document.getElementById("myAud"); 
$(document).ready(function(){
	$("#play").click( function(){
		aud.play();
		$("#play").hide();
		$("#pause").show();
	
	});
});
$(document).ready(function(){
	$("#pause").click( function(){
		aud.pause();
		$("#play").show();
		$("#pause").hide();
	
	});
});

//window.onload = function(){getPokemon(limit,offset);};