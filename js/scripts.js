var trafficLayer = new google.maps.TrafficLayer();
var rendererOptions = { draggable: true };
var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);;
var directionsService = new google.maps.DirectionsService();
var map;
var geocoder;

function initialize() {
    var kent = new google.maps.LatLng(47.333354, -122.333353);
    var mapOptions = { zoom: 18, center: kent, mapTypeId: google.maps.MapTypeId.ROADMAP }
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
	map.setTilt(0);
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById("directionsPanel"));
    trafficLayer.setMap(map);
}

function calcRoute() {
    var start = document.getElementById("start").value;
    var end = document.getElementById("end").value;
    var request = { origin:start, destination:end, travelMode: google.maps.TravelMode.DRIVING, provideRouteAlternatives: true };
      
    directionsService.route(request, function(result, status) {
    	if (status == google.maps.DirectionsStatus.OK) { 
       		directionsDisplay.setDirections(result);            
       		document.getElementById("directionsPanel").style.display="block";
       	}
      });
	  
	$('#myModal').modal('hide');
}

function search() {
	var address = $("#searchBox").val();
	
	geocoder = new google.maps.Geocoder();
	geocoder.geocode({ 'address': address }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
		map.setZoom(15);
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
}

google.maps.event.addDomListener(window, 'load', initialize);