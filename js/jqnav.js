$(document).ready(function(){
	open();
	
$('.catalog_conlist li').each(function(index, element) {
	$(this).attr("id",'bk'+(index+1));
})


$(".gbzlist li span").click(
	 function(){
		 var self = $(this);
		 if(!(self.parent()).hasClass("hover")){ 
			 $('.gbzlist li').find('.nbox').stop().slideUp(500); 
			 $(".gbzlist li").removeClass("hover");
			 self.parent().addClass('hover');
			 self.closest('.gbzlist li').find('.nbox').stop().slideDown(500);
			 }
		 else{
	     self = $(this); 
		 self.parent().removeClass('hover');
		 self.closest('.gbzlist li').find('.nbox').stop().slideUp(500); 
	  }
	 });

});

function open(){

var slideHeight = 66; // px
	$('.opentxt').each(function(index, element) {
        var defHeight = $(this).height();
		if(defHeight >= slideHeight){
		$(this).css('height' , slideHeight + 'px');
		$(this).next('.read-more').append('<a href="javascript:void(0);" class="moreword">[展开]</a>');
		$(this).attr("oldheight",defHeight)
		
		}
    });
	$('.read-more a').click(function(){
			var self=$(this);
			var defHeight= self.parent().prev('.opentxt').attr("oldheight")*1;
			var curHeight = self.parent().prev('.opentxt').height();
			if(curHeight == slideHeight){
				self.parent().prev('.opentxt').animate({ height: defHeight}, "normal");
				self.html('[收起]');
				
			}else{
				self.parent().prev('.opentxt').animate({ height: slideHeight}, "normal");
				self.html('[展开]');
			}
			return false;
		});		

	
}




