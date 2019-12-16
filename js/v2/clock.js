var clock = $('.clock').FlipClock(180, {
    countdown: true,
    clockFace: 'MinuteCounter',
    autoStart: false,
    callbacks: {
        stop: function () {
            victory();
        }
    }
});