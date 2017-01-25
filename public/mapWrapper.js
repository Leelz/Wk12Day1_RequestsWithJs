var MapWrapper = function(container, coords, zoom){
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
  });
}

  MapWrapper.prototype = {
    moveCenter: function(coords){
      this.googleMap.setCenter(new google.maps.LatLng({lat: coords.lat, lng: coords.lng}));
      this.googleMap.setZoom(6);
    },
    zoomLevel: function(area, coords){
      var myLatLng = new google.maps.LatLng(coords[0], coords[1]);
      var circleOptions = {
        center: myLatLng,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: this.googleMap,
        radius: (area/4)*1000
      }
      var myCircle = new google.maps.Circle(circleOptions);
      this.googleMap.fitBounds(myCircle.getBounds);
    }
  }