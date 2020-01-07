function getStars(parent) {
    starArray = [];

    stars = $(parent).children('.star-box').children('.star');

    for (let i = 0; i < stars.length; i++) {
        starArray.push(stars[i])
    };

    bigStar = $(parent).children('.star-box').children('.big-star')[0];
    starArray.push(bigStar);

    return (anime.timeline({
        duration:700,
        // delay: anime.stagger(100),
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutQuad',
    }).add({
        targets: starArray[0],
        scale: [0.8 ,1.0],
        translateX: [0],
        
        rotate: [0],
        loop: true,
        direction: 'alternate',
    }).add({
        targets: starArray[1],
        scale: [0.8 ,1.0],
        translateX: ['-10%', '-10%'],
        rotate: [-10,-10],
        autoplay: false,
        loop: true,
        direction: 'alternate',
    },'-=500').add({
        targets: starArray[2],
        scale: [0.8 ,1.0],
        translateX: ['-30%', '-30%'],
        rotate: [-20,-20],
        autoplay: false,
        loop: true,
        direction: 'alternate',
    },'-=500'))
}

var shake = function(){
anime({
    targets: '.character',
    loop:2,
    duration:180,
    direction: 'alternate',
    easing: 'easeInOutBack',
    translateY: [0, -25],
    scale:[1,1.05],
    complete: shake
});
}

shake() 

