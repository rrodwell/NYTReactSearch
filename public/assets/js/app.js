//Setup Variables
let authKey = "b1fe253f41ce4e66819bdb044a84a61e";

let searchInput = "";
let numArticles = 0;
let startYear = 0;
let endYear = 0;

let queryURLBase = "http://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey;

//on click function to start

	$("#search-btn").click (function(){
                alert("Test this function is invoked on click of search button");
                searchInput = $("#search").val();
                //$("#num-records").val(); //may "for" attribute to properly store this selection in the variable see line 34 in the HTML
                startYear = $("#start-year").val();
                endYear = $("#end-year").val();
                numArticles = $("#num-records").val();
                console.log(searchInput);
                console.log(startYear);
                console.log(endYear);


         var queryURL = queryURLBase + "&q=" + searchInput;
         //This logic validates and builds the URL
                //This represents the start year query, the validation format by NYT requires the YYYYMMDD format
                //we concatenated the year inside the condition so we didn't conflict with the parseInt function type number, not string.
                if (parseInt(startYear)){
                    startYear = startYear + "0101";
                    queryURL = queryURL + "&begin_date=" + startYear;
                }

                //This represents the end year query, the validation format by NYT requires the YYYYMMDD format
                //we concatenated the year inside the condition so we didn't conflict with the parseInt function type number, not string.
                if (parseInt(endYear)){
                    endYear = endYear + "1231"
                    queryURL = queryURL + "&end_date=" + endYear;
                }

                /*This represents a page query-to help limit return--only the third option requires a second page: ?page=2
                if (numArticles < 10)
                	{
                    queryURL = queryURL + "&page=1";
                	}
                else if (numArticles == 10)
                    {
                    	queryURL = queryURL + "&page=2";
                    } This does not work.*/


        console.log(queryURL);

        //API call to NYTimes
        $.ajax({
        	url: queryURL,
        	method: "GET"
        }).done(function(response){
            console.log(queryURL);
        	console.log(response);
        	// this for loop is used to control the amount of articles that can be accessed. The type has been changed to number as it comes from the DOM as a string.
        	for (var i =0; i< Number(numArticles); i++)
        	{ 
        	  //stores current record into a reference variable
        	  var searchResults = response.docs[i];
        	  //selects results of the current record to display to DOM
        	  var msg1= $("<p> Title: "+searchResults.headline.main+"</p>");
        	  var output = $(msg1+ "<br>Summary: "+searchResults.snippet+"<br><span>Source: "+searchResults.source+", "+searchResults.pub_date+".<br>website: "+searchResults.web_url);
        	  //appends article search to the search result div
        	  $("#results").append(output);
        	  console.log(output);
        	}

        }).fail(function(err){
                throw err;
        });
        //This statement stop the search button from reloading the page, since it's type attribute =submit
        return false;

	});
