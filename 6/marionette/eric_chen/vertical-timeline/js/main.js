jQuery(document).ready(function($){
	var $timeline_block = $('.cd-timeline-block');
	//on scolling, show/animate timeline blocks when enter the viewport
	$(window).on('scroll', function(){
            show();
	});
        show();
});

var show = function() {
	var $timeline_block = $('.cd-timeline-block');
        $timeline_block.each(function(){
                if( $(this).offset().top <= $(window).scrollTop()+$(window).height()*0.75 && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) {
                        $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
                }
        });
}
