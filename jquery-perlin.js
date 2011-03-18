(function( $ ){
$.fn.perlin = function(options) {
	options = $.extend({}, $.fn.perlin.defaults, options);
	var self = this,
		canvas = document.createElement("canvas");
	if(!canvas.getContext){return finish();}

	if(typeof options.color == 'string'){
		options.color = options.color.replace(' ','');
	    	var digits = 
			/(.*?)rgb\((\d+),(\d+),(\d+)\)/.exec(options.color);
		options.color = [parseInt(digits[2]), parseInt(digits[3]),
					parseInt(digits[4])];
	}

	function finish(uri){
		if(!uri){uri = options.fallback;}
		return self.each(function(){
			$(self).css("background-image", 
				"url("+uri+"), " + 
					$(self).css("background-image"));});
	}

	function ease(x){
		return 3*Math.pow(x,2)-2*Math.pow(x,3)
	}

	function f_(x, y){
		var xf = (x/options.gridSpacing),
		yf = (y/options.gridSpacing),
		xb = ~~xf,yb = ~~yf,
		forces = [];
		for(var i = 0; i < 4; ++i){
			var xq = xb+i%2, yq = yb+~~(i/2),
			grad = gradients[(yq+permutations[xq])&0xFF];
			forces[i] = grad[0]*(xf-xq) + grad[1]*(yf-yq);
		}
		var sx = xf - ~~xf, sy = yf - ~~yf,
		    xe = ease(sx), ye = ease(sy),
		    a = forces[0]+xe*(forces[1]-forces[0]),
		    b = forces[2]+xe*(forces[3]-forces[2]);
		return a+ye*(b-a);
	}

	function f_tileable(x, y){
		var n = options.tileSize;
		return (f_(x+n,y+n)*(n-x)*(n-y)+
			f_(x,y+n)*x*(n-y)+
			f_(x,y)*x*y+
			f_(x+n,y)*(n-x)*y)/(n*n);
	}

	function doPerlin(canvas){
		var cntx = canvas.getContext("2d"),
		width = canvas.width,
		height = canvas.height,
		maxOpacity = 255 * options.opacity,
		img = cntx.createImageData(width, height),
		data = img.data;
		var f = options.tileable?f_tileable:f_,
		    r = options.color[0], g = options.color[1],
		    b = options.color[2];
		for(var y = 0; y < width; ++y){
			var row = y*width*4;
			for(var x = 0; x < height; ++x){
				var index = row+x*4;
				data[index] = r;
				data[index+1] = g;
				data[index+2] = b;
				data[index+3] = ~~((f(x,y)+1/2)*maxOpacity);
			}
		}
		cntx.putImageData(img, 0, 0);
	}

	canvas.height = canvas.width = options.tileSize;

	var gradients = [], permutations = [];
	
	for(var i = 0; i < 256; ++i){
		var angle = 2 * Math.PI * Math.random();
		gradients[i] = [Math.cos(angle), Math.sin(angle)];
		permutations[i] = ~~(Math.random()*255);
	}	

	doPerlin(canvas);

	var uri = canvas.toDataURL('image/png');
	if (uri.indexOf('data:image/png') != 0 || 
	    $.browser.msie && 
	    $.browser.version.substr(0,1) < 9 && 
	    uri.length > 32000) {
		uri = null; 
	}

	return finish(uri);
};

$.fn.perlin.defaults = {
	'gridSpacing' : 15,
	'tileSize' : 200,
	'fallback' : '',
	'opacity' : .1,
	'tileable': true,
	'color': [0,0,0]
};

})( jQuery );
