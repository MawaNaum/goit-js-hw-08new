// Выполняй это задание в файлах 02-video.html и 02-video.js. Разбей его на несколько подзадач:

// Ознакомься с документацией библиотеки Vimeo плеера.

// Добавь библиотеку как зависимость проекта через npm.
// $ npm install @vimeo/player

// Инициализируй плеер в файле скрипта как это описано в секции pre-existing player, но учти что у тебя плеер добавлен как npm пакет, а не через CDN.

import Player from "@vimeo/player";

// Добавь в проект библиотеку lodash.throttle и сделай так, чтобы время воспроизведения обновлялось в хранилище не чаще чем раз в секунду.
import throttle from "lodash.throttle";

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

// Сохраняй время воспроизведения в локальное хранилище. Пусть ключом для хранилища будет строка "videoplayer-current-time".
const lastCurrentTime = localStorage.getItem('videoplayer-current-time');

// При перезагрузке страницы воспользуйся методом setCurrentTime() для того чтобы возобновить воспроизведение с сохраненной позиции.
// player.setCurrentTime(30.456).then(function(seconds) {
//     // seconds = the actual time that the player seeked to
// }).catch(function(error) {
//     switch (error.name) {
//         case 'RangeError':
//             // the time was less than 0 or greater than the video’s duration
//             break;

//         default:
//             // some other error occurred
//             break;
//     }
// });

player.setCurrentTime(lastCurrentTime).then(function (seconds) {

}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            break;
        default:
            break;
    }
});

// Разбери документацию метода on() и начни отслеживать событие timeupdate - обновление времени воспроизведения.

// const onPlay = function(data) {
//     // data is an object containing properties specific to that event
// };

// player.on('play', onPlay);

// timeupdate
// {
//     duration: 61.857
//     percent: 0.049
//     seconds: 3.034
// }

player.on(
    'timeupdate',
    throttle(function ({ seconds }) {
        localStorage.setItem('videoplayer-current-time', seconds);
    }, 1000)
);