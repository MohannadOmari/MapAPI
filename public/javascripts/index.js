let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 31.9515694, lng: 35.9239625 },
    zoom: 12,
    disableDefaultUI: true,
  });
}

window.initMap = initMap;

$("#map").ready(function() {
  $(".loader-wrapper").fadeOut("slow");
});

let search = document.getElementById('searchBtn');
let city = document.getElementById('searchInput');

search.onclick = function() {
  if (city.value == '') {
    alert('Please Input a city to search for');
  } else { 
    $.ajax({
      method: 'GET',
      url: 'https://api.api-ninjas.com/v1/geocoding?city=' + city.value,
      headers: { 'X-Api-Key': '28C9mnKK3nKXGjjOhylv/w==lLSnT6fBxAXVmtAJ'},
      async: true,
      contentType: 'application/json',
      success: function(result) {
        console.log(result);
        if (result.length != 0) {
          let postion = {lat: result[0].latitude, lng: result[0].longitude}
          map.setCenter(postion);
          map.setZoom(12);
        }
        else {
          alert('City not found');
        }
      },
      error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
        alert('Something went wrong');
      }
    });
  }
}

$(document).ajaxStart(function() {
  $(".loader-wrapper").show();
});
$(document).ajaxStop(function() {
  $(".loader-wrapper").fadeOut("slow");
});