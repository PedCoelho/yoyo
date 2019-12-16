var element;
var wrapperList = [];
var scrolled;
var last;

function updateScroll() {
    
    if (!scrolled) {
        wrapperList = $('.wrapper');
        last = wrapperList[wrapperList.length-1];
        
        $('html, body').animate({
            scrollTop: ($(last).offset().top)
        }, 800);
    }
}

function scrollSwitch(){
    if(!scrolled){
        scrolled = true;
    }else{scrolled = false;}
}


document.addEventListener("DOMContentLoaded", function(event) {scrolled = false;});

$(window).on('scroll', function () {
    scrolled = true;
});

