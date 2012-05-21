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

var MapsLib = MapsLib || {};
var MapsLib = {
  
  //Setup - put your Fusion Table details here
  fusionTableId:      2086698,        //the ID of your Fusion Table (found under File => About)
  locationColumn:     "geometry",     //name of the location column in your Fusion Table
  map_centroid:       new google.maps.LatLng(41.8781136, -87.66677856445312), //center that your map defaults to
  locationScope:      "chicago",      //geographical area appended to all address searches
  recordName:         "result",       //for showing number of results
  recordNamePlural:   "results", 
  
  searchRadius:       805,            //in meters ~ 1/2 mile
  defaultZoom:        11,             //zoom level when map is loaded (bigger is more zoomed in)
  addrMarkerImage: 'http://derekeder.com/images/icons/blue-pushpin.png',
  
  initialize: function() {
    $( "#resultCount" ).html("");
  
    geocoder = new google.maps.Geocoder();
    var myOptions = {
      zoom: MapsLib.defaultZoom,
      center: MapsLib.map_centroid,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map($("#map_canvas")[0],myOptions);
  
    $("#ddlRadius").val(MapsLib.searchRadius);
    
    $("#cbType1").attr("checked", "checked");
    $("#cbType2").attr("checked", "checked");
    $("#cbType3").attr("checked", "checked");
    
    MapsLib.searchrecords = null;
    $("#txtSearchAddress").val("");
    MapsLib.doSearch();
  },
  
  doSearch: function() {
    MapsLib.clearSearch();
    var address = $("#txtSearchAddress").val();
    MapsLib.searchRadius = $("#ddlRadius").val();

    var searchStr = "SELECT " + MapsLib.locationColumn + " FROM " + MapsLib.fusionTableId + " WHERE " + MapsLib.locationColumn + " not equal to ''";
    
    //-----filter by type-------
    //remove MapsLib if you don't have any types to filter
    
    var type1 = $("#cbType1").is(':checked');
    var type2 = $("#cbType2").is(':checked');
    var type3 = $("#cbType3").is(':checked');
    
    //best way to filter results by a type is to create a 'type' column and assign each row a number (strings work as well, but numbers are faster). then we can use the 'IN' operator and return all that are selected
    var searchType = "type IN (-1,";
    if (type1) searchType += "1,";
    if (type2) searchType += "2,";
    if (type3) searchType += "3,";
  
    searchStr += " AND " + searchType.slice(0, searchType.length - 1) + ")";
    
    //-------end of filter by type code--------
    
    //the geocode function does a callback so we have to handle it in both cases - when they search for and address and when they dont
    if (address != "") {
      if (address.toLowerCase().indexOf(MapsLib.locationScope) == -1)
        address = address + " " + MapsLib.locationScope;
  
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          map.setCenter(results[0].geometry.location);
          map.setZoom(14);
          
          MapsLib.addrMarker = new google.maps.Marker({
            position: results[0].geometry.location, 
            map: map, 
            icon: MapsLib.addrMarkerImage,
            animation: google.maps.Animation.DROP,
            title:address
          });
          MapsLib.drawSearchRadiusCircle(results[0].geometry.location);
          
          searchStr += " AND ST_INTERSECTS(" + MapsLib.locationColumn + ", CIRCLE(LATLNG" + results[0].geometry.location.toString() + "," + MapsLib.searchRadius + "))";
          
          MapsLib.submitSearch(searchStr, map);
        } 
        else {
          alert("We could not find your address: " + status);
        }
      });
    }
    else { //search without geocoding callback
      MapsLib.submitSearch(searchStr, map);
    }
  },
  
  submitSearch: function(searchStr, map) {
    //get using all filters
    MapsLib.searchrecords = new google.maps.FusionTablesLayer(MapsLib.fusionTableId, {
      query: searchStr
    });
  
    MapsLib.searchrecords.setMap(map);
    MapsLib.displayCount(searchStr);
  },
  
  clearSearch: function() {
    if (MapsLib.searchrecords != null)
      MapsLib.searchrecords.setMap(null);
    if (MapsLib.addrMarker != null)
      MapsLib.addrMarker.setMap(null);  
    if (MapsLib.searchRadiusCircle != null)
      MapsLib.searchRadiusCircle.setMap(null);
  },
  
  findMe: function() {
    // Try W3C Geolocation (Preferred)
    var foundLocation;
    
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        foundLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
        MapsLib.addrFromLatLng(foundLocation);
      }, null);
    }
    else {
      alert("Sorry, we could not find your location.");
    }
  },
  
  addrFromLatLng: function(latLngPoint) {
    geocoder.geocode({'latLng': latLngPoint}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          $('#txtSearchAddress').val(results[1].formatted_address);
          $('.hint').focus();
          MapsLib.doSearch();
        }
      } else {
        alert("Geocoder failed due to: " + status);
      }
    });
  },
  
  drawSearchRadiusCircle: function(point) {
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
        radius: parseInt(MapsLib.searchRadius)
      };
      MapsLib.searchRadiusCircle = new google.maps.Circle(circleOptions);
  },
  
  query: function(sql, callback) {
    var sql = encodeURIComponent(sql);
    $.ajax({url: "https://www.google.com/fusiontables/api/query?sql="+sql+"&jsonCallback="+callback, dataType: "jsonp"});
  },
  
  displayCount: function(searchStr) {
    searchStr = searchStr.replace("SELECT " + MapsLib.locationColumn + " ","SELECT Count() ");
    MapsLib.query(searchStr,"MapsLib.displaySearchCount");
  },
  
  displaySearchCount: function(json) { 
    var numRows = json["table"]["rows"][0];
    
    if (numRows == null)
      numRows = 0;
    
    var name = MapsLib.recordNamePlural;
    if (numRows == 1)
    name = MapsLib.recordName;
    $( "#resultCount" ).fadeOut(function() {
        $( "#resultCount" ).html(MapsLib.addCommas(numRows) + " " + name + " found");
      });
    $( "#resultCount" ).fadeIn();
  },
  
  addCommas: function(nStr) {
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
}