var socket = io.connect('http://git-chat.azurewebsites.net/');

var username = "";

function addMessage(msg, pseudo) {
    $("#chatEntries").append('<div class="message"><p>' + pseudo + ' : ' + msg + '</p></div>');
}

function sentMessage() {
    if ($('#messageInput').val() != "") 
    {
        socket.emit('message', JSON.stringify({message:$('#messageInput').val(),name:username}));
        addMessage($('#messageInput').val(), "Me", new Date().toISOString(), true);
        $('#messageInput').val('');
    }
}

function setPseudo() {
    if ($("#pseudoInput").val() != "")
    {
        username = $("#pseudoInput").val();
        socket.emit('setPseudo', $("#pseudoInput").val());
        $('#chatControls').show();
        $('#pseudoInput').hide();
        $('#pseudoSet').hide();
    }
}

socket.on('message', function(data) {
    addMessage(data['message'], data['pseudo']);
});

$(function() {
    $("#chatControls").hide();
    $("#pseudoSet").click(function() {setPseudo()});
    $("#submit").click(function() {sentMessage();});
});

