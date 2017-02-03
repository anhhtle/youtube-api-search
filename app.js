var	YOUTUBE_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromAPI(userInput, callback) {
	/*var settings = {
		url: YOUTUBE_URL,
		data: {
			key: 'AIzaSyBN3XdPfXSAXSKd823uZZVWyEV2ROFivw0',
			q: userInput,
			part: 'snippet',
			r: 'json',
		},
		dataType: 'json',
		type: 'GET',
		success: callback
	}
	$.ajax(settings);*/

	var query = {
		key: 'AIzaSyBN3XdPfXSAXSKd823uZZVWyEV2ROFivw0',
		q: userInput,
		part: 'snippet',
		r: 'json',
	}
	$.getJSON(YOUTUBE_URL, query, callback);
}

function displaySearchData(data){
	var resultElement = "";
  	if (data.items) {
    	data.items.forEach(function(item) {
     	resultElement +=
     	'<div class="js-render-result">' +
     		'<img src="' + item.snippet.thumbnails.medium.url + '">' + 
     		'<h2>' + item.snippet.title + '</h2>' +
     		'<h3>Channel: ' + item.snippet.channelTitle + '</h3>' +
     	'</div>';
    	});
  	}
  	else {
    	resultElement += '<p>No results</p>';
  	}
  	$('.js-div-result').html(resultElement);
}


$('.js-search-form').submit(function(event){
	event.preventDefault();
	var userInput = $(this).find('.js-user-input').val();
	getDataFromAPI(userInput, displaySearchData);
})

/*
{"Search":[{
  "Title":"Star Wars: Episode IV - A New Hope",
  "Year":"1977",
  "imdbID":"tt0076759",
  "Type":"movie"},
  ...
  ]
}
*/