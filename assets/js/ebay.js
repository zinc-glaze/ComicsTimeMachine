    // keyword = "spiderman"
       
    $(document).on("click", ".responsive-img", function() {
      var keyword = $(this).attr("title");

      var queryURL = `https://cors-anywhere.herokuapp.com/http://open.api.ebay.com/shopping?callname=FindProducts&responseencoding=JSON&appid=JayGoss-Marvelti-PRD-d7f3df809-292061ff&siteid=0&version=967&QueryKeywords=` + keyword + `&AvailableItemsOnly=true&MaxEntries=4`
      var appid = "JayGoss-Marvelti-PRD-d7f3df809-292061ff";

      $.ajax({
      url: queryURL,
      method: "GET",
      data: { format: "json"},
      crossDomain: true,
      dataType: 'JSON',
 
    }).then(function(response) {
      console.log(response);
      $("#ebay-results").empty();
      var results = response.Product;

     for (i = 0; i < results.length; i++) {
      var ebayDiv = $("<div>");

      var comicPicture = results[i].StockPhotoURL;
      var picture = $("<img>")
      picture.attr("src", comicPicture);

      var comicTitle = results[i].Title;
      var title = $("<p>").text(comicTitle);

      var auctionPage = results[i].DetailsURL;
      var auctionLink = $("<a>").text(auctionPage);
      auctionLink.attr("href", auctionPage);
   
      ebayDiv.append(picture, title, auctionLink);
 
      $("#ebay-results").prepend(ebayDiv);

    }
      });
    });