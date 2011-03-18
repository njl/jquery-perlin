(function( $ ){
$.fn.perlin = function(options) {
	options = $.extend({}, $.fn.perlin.defaults, options);

	function useFallback(){
		return this.each(function(){
			$(this).css("background-image", 
				"url("+options.fallback+"), " + 
					$(this).css("background-image"));});
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
			forces.push(grad[0]*(xf-xq)+
					grad[1]*(yf-yq));
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
		var f = options.tileable?f_tileable:f_;
		for(var y = 0; y < width; ++y){
			var row = y*width*4;
			for(var x = 0; x < height; ++x){
				var index = row+x*4;
				data[index] = data[index+1] = data[index+2] = 0;
				data[index+3] = ~~((f(x,y)+1/2)*maxOpacity);
			}
		}
		cntx.putImageData(img, 0, 0);
	}

	var canvas = document.createElement("canvas");
	if(!canvas.getContext){return useFallback();}
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
		return useFallback();
	}
	return this.each(function(){
		$(this).css("background-image", "url("+uri+"), " + 
				$(this).css("background-image"));
	});
};

$.fn.perlin.defaults = {
	'gridSpacing' : 8,
	'tileSize' : 100,
	'fallback' : '',
	'opacity' : .1,
	'tileable': true,
};

})( jQuery );
