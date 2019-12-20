var clock = $('.clock').FlipClock(60, {
    countdown: true,
    clockFace: 'MinuteCounter',
    autoStart: false,
    callbacks: {
        stop: function () {
            victory();
        }
    }
});