/*!
 * Searchable Map Template with Google Fusion Tables
 * http://derekeder.com/searchable_map_template/
 *
 * Copyright 2012, Derek Eder
 * Licensed under the MIT license.
 * https://github.com/derekeder/FusionTable-Map-Template/wiki/License
 *
 * Date: 5/2/2012
 * 
 */

//Setup section - put your Fusion Table details here
var fusionTableId = 2086698; //replace this with the ID of your Fusion Table
var locationColumn = 'geometry'; //name of the location column in your Fusion Table

var map_centroid = new google.maps.LatLng(41.8781136, -87.66677856445312); //center that your map defaults to
var searchRadius = 805; //in meters ~ 1/2 mile
var locationScope = 'chicago'; //geographical area appended to all address searches if not present
var recordName = "result";
var recordNamePlural = "results";


var map;
var geocoder;
var addrMarker;
var addrMarkerImage = 'http://derekeder.com/images/icons/blue-pushpin.png';

var searchrecords;
var searchStr;
var searchRadiusCircle;

function initialize() {
  $( "#resultCount" ).html("");

	geocoder = new google.maps.Geocoder();
  var myOptions = {
    zoom: 11,
    center: map_centroid,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map($("#map_canvas")[0],myOptions);

  $("#ddlRadius").val(searchRadius);
  
  $("#cbType1").attr("checked", "checked");
  $("#cbType2").attr("checked", "checked");
  $("#cbType3").attr("checked", "checked");
  
  searchrecords = null;
  $("#txtSearchAddress").val("");
  doSearch();
}

function doSearch() 
{
	clearSearch();
	var address = $("#txtSearchAddress").val();
	searchRadius = $("#ddlRadius").val();
	
	var type1 = $("#cbType1").is(':checked');
	var type2 = $("#cbType2").is(':checked');
	var type3 = $("#cbType3").is(':checked');
	
	searchStr = "SELECT " + locationColumn + " FROM " + fusionTableId + " WHERE " + locationColumn + " not equal to ''";
	
	//-----filter by type-------
	//remove this if you don't have any types to filter
	
	//best way to filter results by a type is to create a 'type' column and assign each row a number (strings work as well, but numbers are faster). then we can use the 'IN' operator and return all that are selected
	var searchType = "type IN (-1,";
      if (type1) //drop-off center
		searchType += "1,";
	if (type2) //private
		searchType += "2,";
	if (type3) //hazardous waste site
		searchType += "3,";

  searchStr += " AND " + searchType.slice(0, searchType.length - 1) + ")";
	
	//-------end of filter by type code--------
	
	// because the geocode function does a callback, we have to handle it in both cases - when they search for and address and when they dont
	if (address != "") {
		if (address.toLowerCase().indexOf(locationScope) == -1)
			address = address + " " + locationScope;

		geocoder.geocode( { 'address': address}, function(results, status) {
		  if (status == google.maps.GeocoderStatus.OK) {
  			//console.log("found address: " + results[0].geometry.location.toString());
  			map.setCenter(results[0].geometry.location);
  			map.setZoom(14);
  			
  			addrMarker = new google.maps.Marker({
  			  position: results[0].geometry.location, 
  			  map: map, 
  			  icon: addrMarkerImage,
  			  animation: google.maps.Animation.DROP,
  			  title:address
  			});
  			drawSearchRadiusCircle(results[0].geometry.location);
  			
  			searchStr += " AND ST_INTERSECTS(" + locationColumn + ", CIRCLE(LATLNG" + results[0].geometry.location.toString() + "," + searchRadius + "))";
  			
  			//get using all filters
  			//console.log(searchStr);
  			searchrecords = new google.maps.FusionTablesLayer(fusionTableId, {
  				query: searchStr
  		  });
  		
  			searchrecords.setMap(map);
  			displayCount(searchStr);
		  } 
		  else {
		    alert("We could not find your address: " + status);
		  }
		});
	}
	else {
		//get using all filters
		//console.log(searchStr);
		searchrecords = new google.maps.FusionTablesLayer(fusionTableId, {
			query: searchStr
		});
	
		searchrecords.setMap(map);
		displayCount(searchStr);
	}
}

function clearSearch() {
	if (searchrecords != null)
		searchrecords.setMap(null);
	if (addrMarker != null)
		addrMarker.setMap(null);	
	if (searchRadiusCircle != null)
		searchRadiusCircle.setMap(null);
}

function findMe() {
  // Try W3C Geolocation (Preferred)
  var foundLocation;
  
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      foundLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      addrFromLatLng(foundLocation);
    }, null);
  }
  else {
  	alert("Sorry, we could not find your location.");
  }
}

function addrFromLatLng(latLngPoint) {
    geocoder.geocode({'latLng': latLngPoint}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          $('#txtSearchAddress').val(results[1].formatted_address);
          $('.hint').focus();
          doSearch();
        }
      } else {
        alert("Geocoder failed due to: " + status);
      }
    });
  }

function drawSearchRadiusCircle(point) {
    var circleOptions = {
      strokeColor: "#4b58a6",
      strokeOpacity: 0.3,
      strokeWeight: 1,
      fillColor: "#4b58a6",
      fillOpacity: 0.05,
      map: map,
      center: point,
      clickable: false,
      zIndex: -1,
      radius: parseInt(searchRadius)
    };
    searchRadiusCircle = new google.maps.Circle(circleOptions);
}

function Query(sql, callback) {
  var sql = encodeURIComponent(sql);
	$.ajax({url: "https://www.google.com/fusiontables/api/query?sql="+sql+"&jsonCallback="+callback, dataType: "jsonp"});
}

function displayCount(searchStr) {
  //set the query using the parameter
  searchStr = searchStr.replace("SELECT " + locationColumn + " ","SELECT Count() ");
  
  //set the callback function
  Query(searchStr,"displaySearchCount");
}

function displaySearchCount(json) {
  var numRows = json["table"]["rows"][0];
  
  var name = recordNamePlural;
  if (numRows == 1)
	name = recordName;
  $( "#resultCount" ).fadeOut(function() {
      $( "#resultCount" ).html(addCommas(numRows) + " " + name + " found");
    });
  $( "#resultCount" ).fadeIn();
};

function addCommas(nStr) {
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}