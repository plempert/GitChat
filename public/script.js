var socket = io.connect('http://git-chat.azurewebsites.net/');

$(document).ready(function() {
        var audioElement = document.createElement('audio');
        audioElement.setAttribute('src', 'aim.mp3');
    });

function addMessage(msg, pseudo) {
    $("#chatEntries").append('<div class="message"><p>' + pseudo + ' : ' + msg + '</p></div>');
}

function sentMessage() {

    $('#submit').click(function() {
            audioElement.play();
        });

    if ($('#messageInput').val() != "") 
    {
        socket.emit('message', JSON.stringify({message:$('#messageInput').val(),name:$("#pseudoInput").val()}));
        addMessage($('#messageInput').val(), "Me", new Date().toISOString(), true);
        $('#messageInput').val('');
    }
}

function setPseudo() {
    if ($("#pseudoInput").val() != "")
    {
        socket.emit('setPseudo', $("#pseudoInput").val());
        $('#chatControls').show();
        $('#pseudoInput').hide();
        $('#pseudoSet').hide();
    }
}

socket.on('message', function(data) {

    addMessage(data['message'], data['name']);
});

$(function() {
    $("#chatControls").hide();
    $("#pseudoSet").click(function() {setPseudo()});
    $("#submit").click(function() {sentMessage();});
});

