$(document).ready(function(){
var public_api = "c9f20c574c0989558b1693b816bba31b";
 var private_api = "3051be9fc6637b092f1c20e86cff5f82cda8e01f";

 var ts = Math.floor(Math.random() * Math.floor(1000));

 $("#add-topic").on("click", function (event) {
    event.preventDefault();
    var date1 = $("#start-date").val().toLowerCase().trim();
    var date2 = $("#end-date").val().toLowerCase().trim();
    // var queryURL = "http://gateway.marvel.com/v1/public/comics?dateRange=" + date1 + "%2C" + date2 + "&apikey=${public_api}&hash=${hash}&ts=${ts}";
   // var queryURL = "https://gateway.marvel.com:443/v1/public/comics?dateRange=1999-5-6%2C2000-2-6&apikey=c9f20c574c0989558b1693b816bba31b";
   var hash = CryptoJS.MD5(`${ts}${private_api}${public_api}`);
   var queryURL = "http://gateway.marvel.com/v1/public/comics?dateRange=" + date1 + "%2C" + date2 + "&apikey="+ public_api + "&hash=" + hash + "&ts=" + ts;



   $.ajax({
    url: queryURL,
    method: "GET"
    })
    .then(function(response) {
    console.log(queryURL);
        var results = response.data.results;
    var comicLength = 6
    console.log(results[1].dates[0].date);
    console.log(results)
    $("#comic-thumbnails").empty();

        for (i = 0; i < comicLength; i++) {
            if(results[i].format === "Comic" || results[i.format === "Digital Comic"]){
                console.log(results[i].format)
            }
            else{
                comicLength++
                i++
            }
            var comicDiv = $("<div>");
            comicDiv.addClass("col m2");
            var comicImg = $("<img>");
            comicImg.addClass("responsive-img materialboxed z-depth-2");
            var newImg = (results[i].thumbnail.path + ".jpg");
            comicImg.attr("src", newImg);
            comicImg.attr("title", results[i].title);
            console.log(results[i].thumbnail.path + ".jpg");
            var comicTitle = $("<p>" + results[i].title + "</p>");

            comicDiv.append(comicImg, comicTitle);


           $("#comic-thumbnails").append(comicDiv);
          }
    }
    )});
});
