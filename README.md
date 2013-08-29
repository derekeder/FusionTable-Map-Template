# Fusion Table Searchable Map Template
You want to put your data on a searchable, filterable map. This is a free, open source tool to help you do it.

[![Searchable Map Template screenshot](http://derekeder.com/images/map-template-screenshot.png)](http://derekeder.github.io/FusionTable-Map-Template/)

### [See the working demo &raquo;](http://derekeder.github.io/FusionTable-Map-Template/d)

## Features

* clean, full screen layout
* mobile and tablet friendly using responsive design
* address search (with variable radius and geocomplete)
* geolocation (find me!)
* results count (using Google's Fusion Tables v1 API)
* RESTful URLs for sharing searches
* ability to easily add additional search filters (checkboxes, sliders, etc)
* all done with HTML, CSS and Javascript - no server side code required
  
## Dependencies

* [Google Fusion Tables](http://www.google.com/fusiontables/Home)
* [Google Maps API V3](https://developers.google.com/maps/documentation/javascript)
* [jQuery](http://jquery.org)
* [jQuery Address](http://www.asual.com/jquery/address)
* [Twitter Bootstrap](http://twitter.github.com/bootstrap)

## Setup

This template is now supports the Fusion Tables v1 API. For more info on this, see the [migration guide](https://developers.google.com/fusiontables/docs/v1/migration_guide).

Follow the steps below and you'll be in business with your own map.

1. Create a Fusion Table ([here's a great tutorial](http://support.google.com/fusiontables/bin/answer.py?hl=en&answer=184641))
1. Make sure at least one column is set to a type of Location and that Fusion Tables has geocoded it
1. Set the Fusion Table to be publicly visible (via the Share button in the upper right) and make sure 'Allow Download' is enabled.
1. Turn on the Fusion Tables API in the [Google APIs Console](https://code.google.com/apis/console/)
1. In source/maps_lib.js, set your 
   1. __fusionTableId__ to the encrypted ID of your Fusion Table. __Note__: Google is phasing out numeric IDs soon
   1. __googleApiKey__ to the API key from your [Google API Console](https://code.google.com/apis/console/)
   1. __locationColumn__ to the name of your location column in your Fusion Table
   1. __map_centroid__ to the lat/long you want your map to center on
   1. __locationScope__ to the area you want to limit searches to (set to 'Chicago' by default)
   1. __recordName__ and __recordNamePlural__ to the name of the items in your Fusion Table
1. Add/modify additional filters to maps_lib.js. This will depend on the data you are trying to map. Take a look at the [wiki](https://github.com/derekeder/FusionTable-Map-Template/wiki) for [filter examples](https://github.com/derekeder/FusionTable-Map-Template/wiki/Filter-examples) and [list views](https://github.com/derekeder/FusionTable-Map-Template/wiki/List-search-results) to get started. You can also take a look at these examples:
   * [Connect Chicago Locator](http://locations.weconnectchicago.org)
   * [Chicago Buildings](http://chicagobuildings.org)
   * [Chicago Bike Crash Reports](http://derekeder.com/maps/chicago-bike-crash-reports/index.html)
   * [Chicago TIF Projects](http://derekeder.com/maps/chicago-tif/index.html)
1. Upload this map and all the supporting files (source and styles folders) to your site 

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

## Resources

Fusion Tables 

* [Fusion Tables Home](http://www.google.com/fusiontables/Home)
* [v1 API Documentation](https://developers.google.com/fusiontables/docs/v1/using)
* [v1 API Migration Guide](https://developers.google.com/fusiontables/docs/v1/migration_guide)

Community

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
   * Chrome developer console on a Mac: option+command+j
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

### My custom map styles won't display! 

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

### I want to display custom icons on my map

By default, Fusion Tables only provides 10 (5 large and 5 small) marker icons. 

<img src="http://storage.googleapis.com/support-kms-prod/SNP_2752125_en_v0" alt="small red map dot" title="small red map dot" width="9" height="9">&nbsp;<img src="http://storage.googleapis.com/support-kms-prod/SNP_2752063_en_v0" alt="small yellow map dot" title="small yellow map dot" width="9" height="9">&nbsp;<img src="http://storage.googleapis.com/support-kms-prod/SNP_2752129_en_v0" alt="small green map dot" title="small green map dot" width="9" height="9">&nbsp;<img src="http://storage.googleapis.com/support-kms-prod/SNP_2752068_en_v0" alt="small blue map dot" title="small blue map dot" width="9" height="9">&nbsp;<img src="http://storage.googleapis.com/support-kms-prod/SNP_2752264_en_v0" alt="small purple map dot" title="small purple map dot" width="9" height="9">&nbsp;<img alt="large_red" src="http://chart.googleapis.com/chart?chst=d_map_pin_letter&amp;chld=|FF0000">&nbsp;<img alt="large_yellow" src="http://chart.googleapis.com/chart?chst=d_map_pin_letter&amp;chld=|FFFF00">&nbsp;<img alt="large_green" src="http://chart.googleapis.com/chart?chst=d_map_pin_letter&amp;chld=|00FF00">&nbsp;<img alt="large_blue" src="http://chart.googleapis.com/chart?chst=d_map_pin_letter&amp;chld=|6699FF">&nbsp;<img alt="large_purple" src="http://chart.googleapis.com/chart?chst=d_map_pin_letter&amp;chld=|9933FF">

From my understanding, this is for performance reasons (the map and icon tiles are cached). However, there are two ways to work around it:

1. Use some of the 200 additional icons provided by Google. [This page](http://support.google.com/fusiontables/answer/2679986?hl=en) gives a good tutorial.
1. Use the Fusion Tables API to fetch your data and then draw your own markers using the Google Maps v3 API. Take a look at [this example](https://code.google.com/p/gmaps-samples/source/browse/trunk/fusiontables/custom_markers.html?spec=svn2515&r=2515) (warning: more advanced programming ahead!)

### My map works, but the results count returns 0

The results counter uses the Fusion Tables API, which requires an API key and some specific sharing permissions. Try the following in this order:

1. Make sure you set fusionTableId to a valid API key. It should look something like `1m4Ez9xyTGfY2CU6O-UgEcPzlS0rnzLU93e4Faa0`. To get a new one, go to the [Google API Console](https://code.google.com/apis/console/)
1. Make sure that 'Allow Downloads' is checked for your Fusion Table (File => About this table => Edit table information)

## Still can't figure it out or more detail needed?

1. Check out some [previously answered questions on Stack Overflow](http://stackoverflow.com/search?q=%5Bgoogle-fusion-tables%5D+template+derek). Someone may already have a solution for you.
1. If you're stuck and just need some guidance, [post your question to Stack Overflow](http://stackoverflow.com/questions/tagged/google-fusion-tables). I or someone from the community will do our best to answer your question.
1. If you would like to build a map that's a little more complicated or you need some help, [contact me](mailto:info@datamade.us) at [DataMade](http://datamade.us) and I can assist you at an hourly rate.

## Bug fixes and pull requests

Notice a bug or want to add a feature? [Open an issue](https://github.com/derekeder/FusionTable-Map-Template/issues) or submit a pull request like so:
 
* Fork the project.
* Make your feature addition or bug fix.
* Commit and send me a pull request.

## Contributors 

* [Derek Eder](http://derekeder.com) - primary contributor
* [Chris Keller](http://www.chrislkeller.com/) - [recenter map on resize](https://github.com/derekeder/FusionTable-Map-Template/pull/11)
* [nb-ofs](https://github.com/nb-ofs) - [Windows 8 touch screen ability](https://github.com/derekeder/FusionTable-Map-Template/pull/14), [Google Maps Visual Refresh](https://github.com/derekeder/FusionTable-Map-Template/pull/18), [Noscript message](https://github.com/derekeder/FusionTable-Map-Template/pull/19)

## Copyright

Copyright (c) 2013 Derek Eder. Released under the MIT License.

See [LICENSE](https://github.com/derekeder/FusionTable-Map-Template/blob/master/LICENSE) for details 

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/40715476bc0accb73f0b24388fe08cbc "githalytics.com")](http://githalytics.com/derekeder/FusionTable-Map-Template)
