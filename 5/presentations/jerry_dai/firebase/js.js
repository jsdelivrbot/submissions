//create the connection to Firebase
var myDataRef = new Firebase('https://boiling-heat-3848.firebaseio.com/');

//enter messages by pressing the enter key
$('#messageInput').keypress(function (e) {
    if (e.keyCode == 13) {
        var name = $('#nameInput').val();
        var text = $('#messageInput').val();
        myDataRef.push({name: name, text: text});
        $('#messageInput').val('');
    }
});

//click button to clear all messages
$('#clear').click(function (e) {
    myDataRef.remove();
});

//log that a new message was written
myDataRef.on('child_added', function(snapshot) {
    var message = snapshot.val();
    displayChatMessage(message.name, message.text);
    console.log(message.name + " said: " + message.text);
});

//log that messages were deleted
myDataRef.on('child_removed', function(snapshot) {
    console.log("All messages deleted");
    removeChatMessage();
});

//update html to show all messages	     
function displayChatMessage(name, text) {
    $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
};

//update html to delete messages
function removeChatMessage() {
    $('#messagesDiv').empty();
}
