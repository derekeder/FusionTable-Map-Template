# Fusion Table Searchable Map Template
You want to put your data on a searchable, filterable map. This is a free, open source template to help you do it.

[![Searchable Map Template screenshot](https://raw.github.com/derekeder/FusionTable-Map-Template/master/images/searchable-map-template-v1.2.jpg)](http://derekeder.github.io/FusionTable-Map-Template/)

[See the working demo &raquo;](http://derekeder.github.io/FusionTable-Map-Template/)

## Features

* full screen, iframe and content templates
* display up to 100,000 map points
* address search (with variable radius and geocomplete)
* geolocation (find me!)
* results count
* RESTful URLs for sharing searches
* ability to easily add additional search filters (checkboxes, sliders, etc)
* mobile and tablet friendly using responsive design
* built with HTML, CSS and Javascript - no server side code required


## Releases

* [v 1.4](https://github.com/derekeder/FusionTable-Map-Template/releases/tag/v1.4) - iframe template, MapsLib class
* [v 1.3](https://github.com/derekeder/FusionTable-Map-Template/releases/tag/v1.3) - Bootstrap 3.2, more robust query function, dynamic zoom
* [v 1.2](https://github.com/derekeder/FusionTable-Map-Template/releases/tag/v1.2) - Bootstrap 3, jQuery 1.10.2, jQuery Address 1.6
* [v 1.1](https://github.com/derekeder/FusionTable-Map-Template/releases/tag/v1.1) - Bootstrap 2.0.3, jQuery 1.7.1, jQuery Address 1.4 
  
## Dependencies

* [Google Fusion Tables](http://www.google.com/fusiontables/Home)
* [Google Maps API V3](https://developers.google.com/maps/documentation/javascript)
* [jQuery](http://jquery.org)
* [jQuery Address](https://github.com/asual/jquery-address)
* [Bootstrap 3.2.0](http://getbootstrap.com/)

## Community
There's a [public Google Group](https://groups.google.com/forum/#!forum/fusion-table-map-template) for anyone who wants to or has used the Searchable Map Template. Join the growing community of map makers to learn, share and benefit from each other!

[Join the Fusion Table Map Template Google Group &raquo;](https://groups.google.com/forum/#!forum/fusion-table-map-template)

## Setup

Follow the steps below and you'll be in business with your own map.

1. Create a Fusion Table ([here's a great tutorial](https://support.google.com/fusiontables/answer/2527132?hl=en&topic=2573107&ctx=topic))
1. Make sure at least one column is set to a type of Location and that Fusion Tables has geocoded it
1. Set the Fusion Table to be publicly visible (via the Share button in the upper right) and make sure 'Allow Download' is enabled.
1. Turn on the Fusion Tables API
   1. Go to the [Google APIs Console](https://code.google.com/apis/console/)
   2. Click 'Enable an API' and set __Fusion Tables API__ to 'On'
   3. On the Credentials page, create a new __Public API access__ key
   4. Select __Browser key__
   5. Leave the ACCEPT REQUESTS FROM THESE HTTP REFERERS __blank__ and click __Create__
   6. Copy the API KEY, which should look something like `AIzaSyA3FQFrNr5W2OEVmuENqhb2MBB2JabdaOY`
1. At the bottom of index.html, set your map options ([see the full list of options](#mapslib-options))
   1. **fusionTableId** - the ID of your Fusion Table (found in Fusion Tables under File => About this table)
   1. **googleApiKey** - the API key from your [Google API Console](https://code.google.com/apis/console/)
   1. **locationColumn** - the name of your location column in your Fusion Table
   1. **map_center** - the lat/long you want your map to center on ([find yours here](http://www.itouchmap.com/latlong.html))
   1. **locationScope** - the area you want to limit searches to (set to 'chicago' by default)
1. Add/modify additional filters to maps_lib.js. This will depend on the data you are trying to map. Take a look at the [wiki](https://github.com/derekeder/FusionTable-Map-Template/wiki) for [filter examples](https://github.com/derekeder/FusionTable-Map-Template/wiki/Filter-examples) and [list views](https://github.com/derekeder/FusionTable-Map-Template/wiki/List-search-results) to get started.
1. Upload this map and all the supporting files (css, fonts, images and js folders) to your site 

## MapsLib options

You can configure your map by passing in a dictionary of options when you create a new `MapsLib` instance in `index.html` or `index_iframe.html`. Here's an example:

```javascript
var myMap = new MapsLib({
  fusionTableId:      "1m4Ez9xyTGfY2CU6O-UgEcPzlS0rnzLU93e4Faa0",
  googleApiKey:       "AIzaSyA3FQFrNr5W2OEVmuENqhb2MBB2JabdaOY",
  locationColumn:     "geometry",
  map_center:         [41.8781136, -87.66677856445312],
  locationScope:      "chicago"
});
```

| Option           | Default value           | Notes                                                                                                                                                         |
|------------------|-------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| fusionTableId    |                         | **Required**. Table ID of your Fusion Table (found under File => About).                                                                                      |
| googleApiKey     |                         | **Required**. Found at https://console.developers.google.com/ The key provided in this template is for demonstration purposes only. Please register your own. |
| map_centroid     |                         | **Required**. Center [latitude, longitude] that your map defaults to.                                                                                         |
| recordName       | record                  | Used for showing the count of results.                                                                                                                        |
| recordNamePlural | records                 |                                                                                                                                                               |
| searchRadius     | 805                     | Default search radius. Defined in meters. Default is 1/2 mile.                                                                                                |
| locationColumn   | geometry                | Name of the location column in your Fusion Table. If your location column name has spaces in it, surround it with single quotes like this "'my location'".    |
| locationScope    | chicago                 | Appended to all address searches to keep results within a geographic area.                                                                                    |
| defaultZoom      | 11                      | Default zoom level when map is loaded (bigger is more zoomed in).                                                                                             |
| addrMarkerImage  | images/blue-pushpin.png | Image used to identify your address search on the map. Setting it to blank will hide the marker.                                                              |


## Custom Filters and Views

Take a look at the [wiki](https://github.com/derekeder/FusionTable-Map-Template/wiki/Filter-examples) to see how to add your own custom filters and views like:

* [Checkboxes](https://github.com/derekeder/FusionTable-Map-Template/wiki/Filter-examples#wiki-checkboxes)
* [Radio buttons](https://github.com/derekeder/FusionTable-Map-Template/wiki/Filter-examples#wiki-radiobuttons)
* [Drop down lists](https://github.com/derekeder/FusionTable-Map-Template/wiki/Filter-examples#drop-down-lists)
* [Text searches](https://github.com/derekeder/FusionTable-Map-Template/wiki/Filter-examples#wiki-textsearches)
* [Results lists](https://github.com/derekeder/FusionTable-Map-Template/wiki/List-search-results)
* [Text searches](https://github.com/derekeder/FusionTable-Map-Template/wiki/Filter-examples#wiki-textsearches)
* [Sliders](https://github.com/derekeder/FusionTable-Map-Template/wiki/Filter-examples#wiki-sliders)
* [Date sliders](https://github.com/derekeder/FusionTable-Map-Template/wiki/Filter-examples#wiki-date-sliders)

## iframe Template

If you want to embed the template in a page on your website, the easiest way to do it is with an iframe. We provide an iframe-optimized template for this purpose:

[![Searchable Map Template iframe screenshot](https://raw.github.com/derekeder/FusionTable-Map-Template/master/images/searchable-map-template-iframe.png)](http://derekeder.github.io/FusionTable-Map-Template/iframe_test.html)

[See the working demo &raquo;](http://derekeder.github.io/FusionTable-Map-Template/iframe_test.html)

This template works exactly the same way as the standard full screen template. All the javascript code is still contained in `js/maps_lib.js`.

To embed, you can use the following code on your page:

```html
<iframe 
  style="border-style: none;" 
  src="/path/to/map-template/index_iframe.html" 
  width="600" 
  height="950" >
</iframe>
```

You must explicitly set the size of the iframe, so midify the `height` and `width` attributes as necessary. You can also control the height of the map in `css/custom.css`:

```css
.iframe #map_canvas { height: 500px; }
```

## FusionTable-Map-2-layers

If you want to create a map with two layers - one with points and another with polygons, take a look at Jack Dougherty's [FusionTable-Map-2-layers](https://github.com/JackDougherty/FusionTable-Map-2-layers), based on this template. It's a great place to start.

## Resources

Fusion Tables 

* [Fusion Tables Home](http://www.google.com/fusiontables/Home)
* [v1 API Documentation](https://developers.google.com/fusiontables/docs/v1/using)
* [v1 API Migration Guide](https://developers.google.com/fusiontables/docs/v1/migration_guide)

Community

* [Fusion Table Map Template Google Group](https://groups.google.com/forum/#!forum/fusion-table-map-template)
* [Fusion Tables Issue Tracker](http://code.google.com/p/fusion-tables/issues/list)
* [Fusion Tables Google Group](http://groups.google.com/group/fusion-tables-users-group)

Reference Guides

* [Google Maps API](http://code.google.com/apis/maps/documentation/javascript/overlays.html#FusionTables)
* [Fusion Tables API Developer Guide](http://code.google.com/apis/fusiontables/docs/developers_guide.html)
* [Fusion Tables API Reference Guide](http://code.google.com/apis/fusiontables/docs/developers_reference.html)

## Common issues/troubleshooting

If your map isn't displaying any data, try the following:

1. Use the [Chrome developer console](https://developers.google.com/chrome-developer-tools/docs/console) or install [Firebug](http://getfirebug.com/) for FireFox. This will allow you to debug your javascript.
1. Load your map in the browser and open the javascript console 
   * Chrome developer console on a Mac: Option+Command+J
   * Chrome developer console on a PC: Control+Shift+J
   * Firebug in Firefox: Tools => Web Developer => Firebug => Open Firebug) 
1. If you aren't seeing any javascript errors:
   * Make sure that you have at least one column with address or lat/long points set to type 'Location'. You can check this in Fusion Tables under Edit => Modify Columns.
   * Make sure that Fusion Tables has geocoded your column. You check this by going to View => Map. If you see your points on the map, you're good!
   * Check that your Fusion Table is public (in Fusion Tables, upper right corner => Share button)
1. If you do see javascript errors:
   * The error will tell you what line it is failing on. Best to start by going there!
   * Columns in Fusion Tables are case sensitive, so make sure they are correct.
   * For columns that have multiple words in the title, make sure to surround the column name in your code with single quotes (example: "'first name'") 

#### My custom map styles won't display! 

This is due to a recent change to the FusionTablesLayer and only effects tables created after mid-November 2012. A __styleId__ and __templateId__ must be defined.

When you create custom styles for the first time, the styleId will be 2. For custom info window layouts, the first templateId will also be 2. The __latest version of this template has these defaults set__, but in case you want to add it to an existing project, use the following code:

```javascript
   MapsLib.searchrecords = new google.maps.FusionTablesLayer({
     query: {
       from:   MapsLib.fusionTableId,
       select: MapsLib.locationColumn,
       where:  whereClause
     },
     styleId: 2,
     templateId: 2
   });
```

For reference, styleId 1 is the default look - usually small red dots or red polygons. templateId 1 is the default info window that just shows the first few columns in your table.

For more information, see [Working with styles](https://developers.google.com/fusiontables/docs/v1/using#WorkingStyles) and [Working with templates](https://developers.google.com/fusiontables/docs/v1/using#WorkingInfoWindows) in the Fusion Tables documentation.

#### I want to display custom icons on my map

By default, Fusion Tables only provides 10 (5 large and 5 small) marker icons. 

<img src="http://storage.googleapis.com/support-kms-prod/SNP_2752125_en_v0" alt="small red map dot" title="small red map dot" width="9" height="9">&nbsp;<img src="http://storage.googleapis.com/support-kms-prod/SNP_2752063_en_v0" alt="small yellow map dot" title="small yellow map dot" width="9" height="9">&nbsp;<img src="http://storage.googleapis.com/support-kms-prod/SNP_2752129_en_v0" alt="small green map dot" title="small green map dot" width="9" height="9">&nbsp;<img src="http://storage.googleapis.com/support-kms-prod/SNP_2752068_en_v0" alt="small blue map dot" title="small blue map dot" width="9" height="9">&nbsp;<img src="http://storage.googleapis.com/support-kms-prod/SNP_2752264_en_v0" alt="small purple map dot" title="small purple map dot" width="9" height="9">&nbsp;<img alt="large_red" src="http://chart.googleapis.com/chart?chst=d_map_pin_letter&amp;chld=|FF0000">&nbsp;<img alt="large_yellow" src="http://chart.googleapis.com/chart?chst=d_map_pin_letter&amp;chld=|FFFF00">&nbsp;<img alt="large_green" src="http://chart.googleapis.com/chart?chst=d_map_pin_letter&amp;chld=|00FF00">&nbsp;<img alt="large_blue" src="http://chart.googleapis.com/chart?chst=d_map_pin_letter&amp;chld=|6699FF">&nbsp;<img alt="large_purple" src="http://chart.googleapis.com/chart?chst=d_map_pin_letter&amp;chld=|9933FF">

From my understanding, this is for performance reasons (the map and icon tiles are cached). However, there are two ways to work around it:

1. Use some of the 200 additional icons provided by Google. [This page](http://support.google.com/fusiontables/answer/2679986?hl=en) gives a good tutorial.
1. Use the Fusion Tables API to fetch your data and then draw your own markers using the Google Maps v3 API. Take a look at [this example](https://code.google.com/p/gmaps-samples/source/browse/trunk/fusiontables/custom_markers.html?spec=svn2515&r=2515) (warning: more advanced programming ahead!)

#### My map works, but the results count returns 0

The results counter uses the Fusion Tables API, which requires an API key and some specific sharing permissions. Try the following in this order:

1. Make sure you set fusionTableId to a valid API key. It should look something like `1m4Ez9xyTGfY2CU6O-UgEcPzlS0rnzLU93e4Faa0`. To get a new one, go to the [Google API Console](https://code.google.com/apis/console/)
1. Make sure that 'Allow Downloads' is checked for your Fusion Table (File => About this table => Edit table information)

#### Still can't figure it out or more detail needed?
Ask for help on our [Fusion Table Map Template Google Group](https://groups.google.com/forum/#!forum/fusion-table-map-template)!

## Bug fixes and pull requests

Notice a bug or want to add a feature? [Open an issue](https://github.com/derekeder/FusionTable-Map-Template/issues) or submit a pull request like so:
 
1. Fork the project.
1. Make your feature addition or bug fix.
1. Commit and send me a pull request.

## Contributors 

* [Derek Eder](http://derekeder.com) - primary contributor
* [Chris Keller](http://www.chrislkeller.com/) - [recenter map on resize](https://github.com/derekeder/FusionTable-Map-Template/pull/11)
* [nb-ofs](https://github.com/nb-ofs) - [Windows 8 touch screen ability](https://github.com/derekeder/FusionTable-Map-Template/pull/14), [Google Maps Visual Refresh](https://github.com/derekeder/FusionTable-Map-Template/pull/18), [Noscript message](https://github.com/derekeder/FusionTable-Map-Template/pull/19)
* [Felipe Figueroa](https://github.com/amenadiel) - [Geocomplete update](https://github.com/derekeder/FusionTable-Map-Template/pull/36), [Updates to query function](https://github.com/derekeder/FusionTable-Map-Template/pull/38), [maps_lib.js javascript class](https://github.com/derekeder/FusionTable-Map-Template/pull/45)

## Copyright and attribution

Copyright (c) 2015 Derek Eder. Released under the MIT License.

If you use this template, please provide the following attribution in the footer: 

```html
<a href='http://derekeder.com/searchable_map_template/'>Searchable Map Template</a> 
by <a href='http://derekeder.com'>Derek Eder</a>.
```

See [LICENSE](https://github.com/derekeder/FusionTable-Map-Template/blob/master/LICENSE) for more details.
