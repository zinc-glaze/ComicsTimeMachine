    // keyword = "spiderman"
       
    $(document).on("click", "#img-link", function() {
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

      //creates div for one eBay result 
      var ebayDiv = $("<div>");
      ebayDiv.addClass("row collection-item");

      //creates div for eBay image
      var imgDiv = $("<div>");
      imgDiv.addClass("col m3");

      //creates div for comic title and auction link
      var titleDiv = $("<div>");
      titleDiv.addClass("col m9");

      //stores image tag to variable and adds src and max-height attributes
      var comicPicture = results[i].StockPhotoURL;
      var picture = $("<img>")
      picture.attr("src", comicPicture);
      picture.addClass("z-depth-1")

      //creates heading element for comic title
      var comicTitle = results[i].Title;
      var title = $("<h6>").text(comicTitle);

      //creates anchor element for auction link
      var auctionPage = results[i].DetailsURL;
      var auctionLink = $("<a>").text(auctionPage);
      auctionLink.attr("href", auctionPage);
      auctionLink.attr("target", "_blank");

      //constructs complete div for one result
      imgDiv.append(picture);
      titleDiv.append(title, auctionLink);
      ebayDiv.append(imgDiv, titleDiv);
      
      //Prepends result to container div
      $("#ebay-results").prepend(ebayDiv);

    }
      });
    });