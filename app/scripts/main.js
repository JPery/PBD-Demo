var zoom = zoom || 3;

var map = L.map('map', {
		zoomControl: true,
		attributionControl: false
});

L.tileLayer('https://api.mapbox.com/styles/v1/fediazgon/ciouky95m0031ddmkoxm9o589/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZmVkaWF6Z29uIiwiYSI6ImNpb3VrcGVtdzAwNG12dmx3MTNjczN4ZmIifQ.39QVufsizGt9zB2qMpB4uQ').addTo(map);

map.setView([39.482568, -6.375012], zoom);

map.zoomControl.setPosition('bottomright');

var GeoJsonLayer;
function getData(text){
	var query = 'http://api.gdeltproject.org/api/v1/gkg_geojson?QUERY='+text+'&TIMESPAN=1440&OUTPUTFIELDS=url,name,sharingimage';
	showLoading();
    if(GeoJsonLayer!=undefined){
        map.removeLayer(GeoJsonLayer);
    }
	$.getJSON(query,function(data){
            data.features;
			console.log(data);
			GeoJsonLayer = L.geoJSON(data.features, {
				onEachFeature: function (feature, layer) {
				    layer.bindPopup('<b>'+feature.properties.name+'</b><img src=\''+feature.properties.urlsocialimage+'\' style=\'width:100%;\'></img><a href=\''+feature.properties.url+'\'>Article Link</a>');
				}
			});
            GeoJsonLayer.addTo(map);
			hideLoading();
		});
};

function addPoint(lat,long){
		var marker = L.marker([lat, long]).addTo(map);
		map.setView([lat,long],16);
};

function showLoading(){
	var style = 'background: url(http://www.estudieenelexterior.com.co/programas/cursos-de-idiomas/N2/Images/Carga/ajax-loader.gif) center no-repeat #fff;background-size: contain; width:70px;height:35px;';
	var button = document.getElementById('submit');
	button.setAttribute('style', style);
	button.disabled = true;
	button.textContent='';
}

function hideLoading(){
	var style = '';
	var button = document.getElementById('submit');
	button.setAttribute('style', style);
	button.disabled = false;
	button.textContent='Submit';
}

$(function () {
  $('form').on('submit', function (e) {
      e.preventDefault();
			var text = document.getElementById('search').value;
			getData(text);
  });
});
