# Readme

This project (https://github.com/tomgeer/jRating) is a fork of alpixel's jRating (https://github.com/alpixel/jRating).  It is a scaled-back, more flexible, front-end-only version of of the original project.  Two major changes were made:

	1)  Control of what happens after a user enters a rating is returned to the page via the clickCallback option.  This option takes a javascript function that will receive the rating value after the user interacts with the plugin.  This replaces the ajax call to a PHP page in the original version, giving the page more control over UX.
	2)  The plugin is configurable to a fractional rating level (half stars, quarter stars, etc) via the fractionalRatings option.


Information about the orignial project:

Full documentation on [MyJqueryPlugins](http://www.myjqueryplugins.com/jRating)

Demonstration on [jRating demonstration page](http://www.myjqueryplugins.com/jRating/demo)