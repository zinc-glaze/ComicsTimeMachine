$(document).ready(function(){
  var public_api = "c9f20c574c0989558b1693b816bba31b";
  var private_api = "3051be9fc6637b092f1c20e86cff5f82cda8e01f";

  var ts = Math.floor(Math.random() * Math.floor(1000));

  $("#add-topic").on("click", function (event) {
    event.preventDefault();
    var date1 = $("#start-date").val().toLowerCase().trim();


    //VALIDATES USER INPUT
    //Checks to see if date1 is 10 characters long as has "-" as 5th and 8th character
    if (date1.length === 10 && date1[4] === "-" && date1[7] === "-") {
      var dateFormat = true;
    }
    else {
      dateFormat = false;
    }
    //Splits date1 into three strings
    var dateArray = date1.split("-");

    //Checks to see if all three numbers are within valid range
    if (parseInt(dateArray[0]) <= 2018 && parseInt(dateArray[1]) <=12 && parseInt(dateArray[2]) <=31) {
      var dateRange = true;
    }
    else {
      dateRange = false;
    }

    //If conditions for user date1 input are not met: give error message, clear input box, and exit the click event
    if (dateFormat === false || dateRange === false) {
      $("#error-msg").text("Please enter valid date in YYYY-MM-DD format!");
      document.getElementById("start-date").value = "";
      return;
    }

    //User input is validated and accepted
    //Restore original form text
    $("#error-msg").text("Enter Your Birth Date Here (YYYY-MM-DD)");

    //Generate date2
    var date2 = moment(date1).add(1, 'months').format("YYYY-MM-DD");
    
    //Removes user input from text box
    document.getElementById("start-date").value = "";


    // var queryURL = "http://gateway.marvel.com/v1/public/comics?dateRange=" + date1 + "%2C" + date2 + "&apikey=${public_api}&hash=${hash}&ts=${ts}";
    // var queryURL = "https://gateway.marvel.com:443/v1/public/comics?dateRange=1999-5-6%2C2000-2-6&apikey=c9f20c574c0989558b1693b816bba31b";
    var hash = CryptoJS.MD5(`${ts}${private_api}${public_api}`);
    var queryURL = "https://gateway.marvel.com/v1/public/comics?dateRange=" + date1 + "%2C" + date2 + "&apikey="+ public_api + "&hash=" + hash + "&ts=" + ts;


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
            if(results[i].thumbnail.path !== "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" && (results[i].format === "Comic" || results[i].format === "Digital Comic")){
                console.log(results[i].format)
                var comicDiv = $("<div>");
                comicDiv.addClass("col m2");
                var comicImg = $("<img>");
                comicImg.addClass("responsive-img z-depth-2");
                comicImg.attr("id", "img-link");
                var newImg = (results[i].thumbnail.path + ".jpg");
                comicImg.attr("src", newImg);
                comicImg.attr("title", results[i].title);
                console.log(results[i].thumbnail.path + ".jpg");
                var comicTitle = $("<p>" + results[i].title + "</p>");
    
                comicDiv.append(comicImg, comicTitle);
    
    
                $("#comic-thumbnails").append(comicDiv);
            }
            else{
                comicLength++
            }
          }
    }
  
  )});
});
