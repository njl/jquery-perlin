jQuery Perlin Noise Plugin
==========================

####Written by [Ned Jackson Lovely](http://www.njl.us).

This plugin will insert a semi-transparent piece of Perlin noise into the
background-image of an element. [Perlin noise][perlinfaq] is a technique 
developed by [Ken Perlin][kenperlin]. The technique creates noise that is 
random but still has some structure, making it good for adding textures that
give a "real world" feel. Please take a look at the [demo][demo] to get 
an idea of how this works.
[perlinfaq]: http://webstaff.itn.liu.se/~stegu/TNM022-2005/perlinnoiselinks/perlin-noise-math-faq.html 
[kenperlin]: http://cs.nyu.edu/~perlin/ 
[demo]: http://www.njl.us/blog/jquery-perlin/

This plugin was directly inspired by the work [Daniel Rapp][danielrapp] did 
with his [Noisy][noisy] jQuery Plugin. Noisy creates noise that is more like
television static. It can create some very nice, subtle effects with much 
less computational effort than this plugin. Daniel wrote some really beautiful
code, and I had more than a few insights reading it. In particular, I stole
his knowledge of and correction for some subtle browser misfeatures wholesale.
Thank you Daniel.
[danielrapp]: http://rappdaniel.com/
[noisy]: https://github.com/DanielRapp/Noisy

Usage
-----

Include jQuery, then this script.
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js"></script>
	<script type="text/javascript" src="noisy.js"></script>

Then you can call `perlin()` on an element or elements. You can also pass
arguments to `perlin()`.
	$("body").perlin({tileable: true})

Options
-------

####tileSize
The size of the tile to create. Larger tiles take longer to render. 

The default value is `200`.

####gridSpacing
The noise swirls around points on a grid. The larger your grid size
is, the more visible the effect. The smaller the grid size, the more subtle.
A very small grid with a very low opacity can create a nice grain effect, 
similar to sheet of paper. A large grid can create nice swirling features.

The default value is `15`.

####opacity
Standard alpha value, from 0 to 1.0. The noises opacity will range from 0 to
this value.

The default value is `.1`.

####tileable
Quadruples the processing time, but creates a tile which can repeat
in the x and y directions. Not necessary for very small gridSpacings, 
but larger grids with more visible textures benefit greatly. 

The default value is `true`.

####color
By default, the noise is black, which provides a texture that looks
like a nice rough surface. If you want to make the noise a different color,
you can set color to either a string of the form "rgb(255,255,0)", or 
preferably an array of the three rgb values, like `[255,0,128]`. 

The default value is `[0,0,0]`.

####fallback
The URL of a fallback image to display if any of the necessary features is
not supported.

The default value is `''`.

License
-------

MIT (see license.md)

Contact
-------

[Ned Jackson Lovely](http://www.njl.us), [njl@njl.us](mailto:njl@njl.us), [@nedjl](http://twitter.com/nedjl)
