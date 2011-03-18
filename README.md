jQuery Perlin Noise Plugin
==========================

Writen by [Ned Jackson Lovely](http://www.njl.us).
--------------------------------------------------

This plugin will insert a semi-transparent piece of Perlin noise into the
background-image of an element. [Perlin noise](http://webstaff.itn.liu.se/~stegu/TNM022-2005/perlinnoiselinks/perlin-noise-math-faq.html) is a technique
developed by [Ken Perlin](http://cs.nyu.edu/~perlin/) to create a random noise
that has a feeling of texture, making it good for "roughing up" something to
give it a bit more of a real feel. Please take a look at the 
[demo](http://www.njl.us/projects/jquery-perlin/) to get an idea of how this 
works.

This plugin was directly inspired by the work 
[Daniel Rapp](http://rappdaniel.com/) did with 
[Noisy](https://github.com/DanielRapp/Noisy).
The main 
difference between our plugins is that Noisy creates a truly random 
fuzz, while this plugin creates a gradient "fuzz", with subtle features.
His Javascript is beautiful, and I learned a lot from reading it.

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

- tileSize
:	The size of the tile to create. Larger tiles take longer to render.
- gridSpacing
:	The noise swirls around points on a grid. The larger your grid size
is, the more visible the effect. The smaller the grid size, the more subtle.
- opacity
:	Standard alpha value, from 0 to 1.0, which gives the maximum opacity
the noise can be.
- tileable
:	Quadruples the processing time, but creates a tile which can repeat
in the x and y directions. Probably not necessary for smaller gridSpacings, 
but a good idea for larger tiles with more visible texture.

License
-------

MIT (see license.md)

Contact
-------

[Ned Jackson Lovely](http://www.njl.us), [njl@njl.us](mailto:njl@njl.us), [@nedjl](http://twitter.com/nedjl)
