    var appid = "JayGoss-Marvelti-PRD-d7f3df809-292061ff";
    keyword = "spiderman"
    var queryURL = `https://cors-anywhere.herokuapp.com/http://open.api.ebay.com/shopping?callname=FindProducts&responseencoding=JSON&appid=JayGoss-Marvelti-PRD-d7f3df809-292061ff&siteid=0&version=967&QueryKeywords=` + keyword + `&AvailableItemsOnly=true&MaxEntries=5`
   
    $.ajax({
      url: queryURL,
      method: "GET",
      data: { format: "json"},
      crossDomain: true,
      dataType: 'JSON',
 
    }).then(function(response) {
      console.log("YES");
      console.log(response);

    });
