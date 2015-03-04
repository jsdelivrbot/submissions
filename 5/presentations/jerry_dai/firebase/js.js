var myDataRef = new Firebase('https://boiling-heat-3848.firebaseio.com/');
$('#messageInput').keypress(function (e) {
    if (e.keyCode == 13) {
        var name = $('#nameInput').val();
        var text = $('#messageInput').val();
        myDataRef.push({name: name, text: text});
        $('#messageInput').val('');
    }
});

$('#clear').click(function (e) {
    myDataRef.remove();
});

myDataRef.on('child_added', function(snapshot) {
    var message = snapshot.val();
    displayChatMessage(message.name, message.text);
    console.log(message.name + " said: " + message.text);
});

myDataRef.on('child_removed', function(snapshot) {
    console.log("All messages deleted");
    removeChatMessage();
});

	     
function displayChatMessage(name, text) {
    $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
};

function removeChatMessage() {
    $('#messagesDiv').empty();
}
