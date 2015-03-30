// Globals
var debug = false;
var App = new Marionette.Application();

var hasNonWhitespace = function(s) {
    return s.match(/[^\s]+/g) != null;
}

App.addRegions({
    todoListRegion: '#todoList'
});

var TodoItem = Backbone.Model.extend({
    // Share _id attribute with MongoDB
    idAttribute: '_id',
    defaults: {
        description: '',
        done: false,
        urgency: 0
    }
});

var TodoList = Backbone.Collection.extend({
    model: TodoItem,
    url: 'sync',
    comparator: function(item) {
        // Sort by descending urgency
        return -item.get('urgency');
    },
    initialize: function() {
        // Fetch data from server; sends a GET request to server
        this.fetch();
        // Re-sort collection when a child's urgency changes
        this.on("change:urgency", this.sort, this);
        var that = this;
        // Fetch up-to-date data from server every 10 seconds
        setInterval(function() {
            that.fetch();
        }, 10000);
    }
});

App.TodoItemView = Marionette.ItemView.extend({
    template: "#todoItem-template",
    tagName : "tr",
    events: {
        "blur #description": function(e) {
            if (!hasNonWhitespace($(e.target).text())) {
                var deleteURL = '/sync/' + this.model.get('_id');
                // Remove this item from the Collection; does NOT send a DELETE
                // request. Backbone, why are you so inconsistent?
                this.model.collection.remove(this.model);
                // Explicitly send a DELETE request to server
                $.ajax({
                    url: deleteURL,
                    type: 'DELETE'
                });
            }
            else {
                this.model.set('description', e.target.innerHTML);
            }
        },
        "blur #urgency": function(e) {
            var newUrgency = parseInt(e.target.innerHTML);
            if (!isNaN(newUrgency)) {
                this.model.set('urgency', newUrgency);
                // If the input contained invalid characters, reset the value
                // to only the valid parsed integer
                e.target.innerHTML = newUrgency;
            }
        },
        "click #checkbox": function(e) {
            var isDone = e.target.checked;
            this.model.set('done', isDone);
        }
    },
    modelEvents: {
        // Re-render when the model is changed
        "change": function() {
            this.render();
            // Synchronize changes with server; Sends a PUT request to server
            this.model.save();
        }
    }
});

App.TodoListView = Marionette.CompositeView.extend({
    template: '#todoList-template',
    childView: App.TodoItemView,
    childViewContainer: 'tbody',
    events: {
        'click #add': function() {
            var newItem = $('#input').val();
            if (hasNonWhitespace(newItem)) {
                // Adds a new model to the collection; sends a POST request to
                // server
                var newTodoItem = this.collection.create({description: newItem},
                    {
                        // Wait for server, so we get back the ID associated
                        // with this new item for use with RESTful calls
                        wait: true
                    }
                );
            }
            else {
                alert("You can't do *nothing*! Go ahead, try something!")
            }
            // Reset the input box value
            $('#input').val('');
        }
    }
});

App.on("start",function() {
    var list = new TodoList();
    var todoListView = new App.TodoListView({collection:list});
    App.todoListRegion.show(todoListView);
});

// Main
App.start();
