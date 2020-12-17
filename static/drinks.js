// User input from search bar
let search_drink_input = "";
$("#search_button").click(function (e) { 
    e.preventDefault();
    search_drink_input = $("#search_value").val();
    console.log(search_drink_input);
    getSearchDrinks();
});

function getSearchDrinks(){
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + search_drink_input).then(
        function(response) {
            if(response.status !== 200) {
                console.log("Unable to get data");
                return;
            }
            response.json().then(function(data) {
                // console.log(data);
                displayDrinks(data);
            });
        }
    ).catch(function(err) {
        console.log("fetch error", err);
    });
}

// Fetch data from database
var cocktail = []
function getDrinks(){
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=vodka").then(
        function(response) {
            if(response.status !== 200) {
                console.log("Unable to get data");
                return;
            }
            response.json().then(function(data) {
                // console.log(data);
                displayDrinks(data);
            });
        }
    ).catch(function(err) {
        console.log("fetch error", err);
    });
}
getDrinks();

function displayDrinks(cocktail){
    $("#drink_menu").empty();
    if(cocktail.drinks != null){
        for (let i = 0; i < cocktail.drinks.length; i++) {
            let ingredients = []
            for(let j = 1; j <= 15; j++){
                if(cocktail.drinks[i][`strIngredient${j}`] != null){
                    ingredients.push(cocktail.drinks[i][`strIngredient${j}`]);
                }
            }
            // console.log(ingredients);
            let img = $('<img>');
            let list = $('<ul>').addClass("no_bullets");
            for(let x = 0; x < ingredients.length; x++){
                let item = $('<li>').text(ingredients[x]);
                list.append(item);
            }
            $(img).attr("src", cocktail.drinks[i].strDrinkThumb);
            var tr = $('<tr>').append(
                $('<td>').append(img),
                $('<td>').text(cocktail.drinks[i].strDrink),
                $('<td>').append(list),
                $('<td>').text("$4.99 "),
            );
            $("#drink_menu").append(tr);
        } 
    }
}