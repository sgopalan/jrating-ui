/************************************************************************
*************************************************************************
@Name :       	jRating - jQuery Plugin
@Revison :    	2.3
@Date : 		07/09/2012
@Author:     	 ALPIXEL - (www.myjqueryplugins.com - www.alpixel.fr) 
@License :		 Open Source - MIT License : http://www.opensource.org/licenses/mit-license.php
 
**************************************************************************
*************************************************************************/
(function($) {
	$.fn.jRating = function(op) {
		var currentRating = 0;
		var defaults = {
			/** String vars **/
			starImageUrl : '',
			starWidth : 23,
			starHeight : 20,

			/** Boolean vars **/
			stepInterval: 0.5,
			isDisabled:false,
			showRateInfo: true,

			/** Integer vars **/
			length:5, // number of star to display
			decimalLength : 0, // number of decimals.. Max 3, but you can complete the function 'getNote'
			rateMax : 20, // maximal rate - integer from 0 to 9999 (or more)
			rateInfosX : -45, // relative position in X axis of the info box when mouseover
			rateInfosY : 5, // relative position in Y axis of the info box when mouseover

			/** Functions **/
			clickCallback : null
		}; 

		if(this.length>0)
		return this.each(function() {
			var opts = $.extend(defaults, op),    
			newWidth = 0,
			bgPath = opts.starImageUrl;

			if($(this).hasClass('jDisabled') || opts.isDisabled)
				var jDisabled = true;
			else
				var jDisabled = false;

			$(this).height(opts.starHeight);

			var average = parseFloat($(this).attr('id').split('_')[0]),
			idBox = parseInt($(this).attr('id').split('_')[1]), // get the id of the box
			widthRatingContainer = opts.starWidth*opts.length, // Width of the Container
			widthColor = average/opts.rateMax*widthRatingContainer, // Width of the color Container

			quotient = 
			$('<div>', 
			{
				'class' : 'jRatingColor',
				css:{
					width:widthColor
				}
			}).appendTo($(this)),

			average = 
			$('<div>', 
			{
				'class' : 'jRatingAverage',
				css:{
					width:0,
					top:- opts.starHeight
				}
			}).appendTo($(this)),

			 jstar =
			$('<div>', 
			{
				'class' : 'jStar',
				css:{
					width:widthRatingContainer,
					height:opts.starHeight,
					top:- (opts.starHeight*2),
					background: 'url('+bgPath+') repeat-x'
				}
			}).appendTo($(this));

			$(this).css({width: widthRatingContainer,overflow:'hidden',zIndex:1,position:'relative'});

			if(!jDisabled)
			$(this).unbind().bind({
				mouseenter : function(e){
					var realOffsetLeft = findRealLeft(this);
					var relativeX = e.pageX - realOffsetLeft;
					if (opts.showRateInfo)
					var tooltip = 
					$('<p>',{
						'class' : 'jRatingInfos',
						html : getNote(relativeX)+' <span class="maxRate">/ '+opts.rateMax+'</span>',
						css : {
							top: (e.pageY + opts.rateInfosY),
							left: (e.pageX + opts.rateInfosX)
						}
					}).appendTo('body').show();
				},
				mouseover : function(e){
					$(this).css('cursor','pointer');	
				},
				mouseout : function(){
					$(this).css('cursor','default');
					average.width(currentRating * opts.starWidth);
				},
				mousemove : function(e){
					var realOffsetLeft = findRealLeft(this);
					var relativeX = e.pageX - realOffsetLeft;
					starInterval = opts.starWidth * opts.stepInterval;
					newWidth = Math.floor(relativeX/starInterval)*starInterval + starInterval;
					average.width(newWidth);					
					if (opts.showRateInfo)
					$("p.jRatingInfos")
					.css({
						left: (e.pageX + opts.rateInfosX)
					})
					.html(getNote(newWidth) +' <span class="maxRate">/ '+opts.rateMax+'</span>');
				},
				mouseleave : function(){
					$("p.jRatingInfos").remove();
				},
				click : function(e) {
					var realOffsetLeft = findRealLeft(this);
					var relativeX = e.pageX - realOffsetLeft;
					starInterval = opts.starWidth * opts.stepInterval;
					newWidth = Math.floor(relativeX/starInterval)*starInterval + starInterval;
					average.width(newWidth);					
					currentRating = newWidth / opts.starWidth;
					if (opts.clickCallback) {
						opts.clickCallback(currentRating);
					}
				}
			});

			function getNote(relativeX) {
				var noteBrut = parseFloat((relativeX*100/widthRatingContainer)*opts.rateMax/100);
				switch(opts.decimalLength) {
					case 1 :
						var note = Math.round(noteBrut*10)/10;
						break;
					case 2 :
						var note = Math.round(noteBrut*100)/100;
						break;
					case 3 :
						var note = Math.round(noteBrut*1000)/1000;
						break;
					default :
						var note = Math.round(noteBrut*1)/1;
				}
				return note;
			};

			function findRealLeft(obj) {
			  if( !obj ) return 0;
			  return obj.offsetLeft + findRealLeft( obj.offsetParent );
			};
		});

	}
})(jQuery);