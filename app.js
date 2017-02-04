var state = {
	YOUTUBE_URL: 'https://www.googleapis.com/youtube/v3/search',
	nextPageToken: '',
	prevPageToken: '',
	query : {
		key: 'AIzaSyBN3XdPfXSAXSKd823uZZVWyEV2ROFivw0',
		q: '',
		part: 'snippet',
		r: 'json',
		pageToken: ''
	}
}

function getDataFromAPI(callback) {
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

	$.getJSON(state.YOUTUBE_URL, state.query, callback);
}

function displaySearchData(data){
	var resultElement = "";
  	if (data.items) {
    	data.items.forEach(function(item) {
     	resultElement +=
     	'<div class="js-render-result">' +
     		'<img src="' + item.snippet.thumbnails.medium.url + '">' + 
     		'<h2>' + item.snippet.title + '</h2>' +
     		'<h3>Channel: <a target="_blank" href="https://www.youtube.com/channel/' +
     		item.snippet.channelId + '">' + item.snippet.channelTitle + '</a></h3>' +
     	'</div>';
    	});
  	}
  	else {
    	resultElement += '<p>No results</p>';
  	}

  	$('.js-div-result').html(resultElement);

  	//handle next button
  	if (data.nextPageToken){
  		$('.button-next').removeClass('hidden');
  		state.nextPageToken = data.nextPageToken;
  	}
  	else
  		$('.button-next').addClass('hidden');

  	//handel prev button
  	if (data.prevPageToken){
  		$('.button-prev').removeClass('hidden');
  		state.prevPageToken = data.prevPageToken;
  	}
  	else
  		$('.button-prev').addClass('hidden');
}

//Navigate to next page
$('.button-next').on('click', function(event){
	state.query.pageToken = state.nextPageToken;
	getDataFromAPI(displaySearchData);
})

//Navigate to prev page
$('.button-prev').on('click', function(event){
	state.query.pageToken = state.prevPageToken;
	getDataFromAPI(displaySearchData);
})

//Start search
$('.js-search-form').submit(function(event){
	event.preventDefault();
	state.query.q = $(this).find('.js-user-input').val();
	getDataFromAPI(displaySearchData);
})