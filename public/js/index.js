/**
 * Created by bhavyaagg on 01/04/18.
 */
const socket = io();

function play(id) {
  socket.emit('play', id);
}

$(document).ready(function () {
  socket.on('play', (data) => {
    $(`#a${data}`)[0].play();
  })
})