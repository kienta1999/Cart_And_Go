// Spoonacular API Key: b4d9decc51a7469d984d5ac68699140d

function getSearchCuisine(){
    fetch("https://api.spoonacular.com/recipes/complexSearch?apiKey=b4d9decc51a7469d984d5ac68699140d&type=main%20course&cuisine=american&number=20&offset=" + String(Math.floor(Math.random() * 92) + 1)).then(
        function(response) {
            if(response.status !== 200) {
                console.log("Unable to get data");
                return;
            }
            response.json().then(function(data) {
                // console.log(data);
                displayCuisine(data);
            });
        }
    ).catch(function(err) {
        console.log("fetch error", err);
    });
}

getSearchCuisine();

function displayCuisine(cuisine){
    // console.log(cuisine.results);
    $("#food_menu").empty();
    if(cuisine.results != null){
        for (let i = 0; i < cuisine.results.length; i++) {
            let img = $('<img>');
            $(img).attr("src", cuisine.results[i].image);
            var tr = $('<tr>').append(
                $('<td>').append(img),
                $('<td>').text(cuisine.results[i].title),
            );
            $("#food_menu").append(tr);
        } 
    }
}
