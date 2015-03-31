MyApp = new Backbone.Marionette.Application();
 
MyApp.addRegions({
  mainRegion: "#content"
});

Task = Backbone.Model.extend({});

Tasks = Backbone.Collection.extend({
      model: Task,

      initialize: function() {

          var self = this;
        MyApp.on("task:done", function(task) {
            var tasks = self.models;
            tasks = _.map(tasks, function(x) { return x.attributes.name; });
            tasks = _.filter(tasks, function(x) { return x != task.attributes.name} );
            tasks = tasks.join("--");
            docCookies.setItem("tasks", tasks);
        } );
      }
});

TaskView = Backbone.Marionette.ItemView.extend({
    template: "#task-template",
    tagName: 'tr',
    className: "task",

    events: {
        "click a.done": "done"
    },

    done : function() {
        MyApp.trigger("task:done", this.model);
        this.model.destroy();
    }
});

TasksView = Backbone.Marionette.CompositeView.extend({
    tagName: "table",
    className: "pure-table",
    id: "tasks",
    template: "#tasks-template",
    itemView: TaskView,
    childView: MyApp.TaskView,
    childViewContainer: "tbody",

    appendHtml: function(collectionView, itemView){
        collectionView.$("tbody").append(itemView.el);
    }
});

MyApp.addInitializer(function(options){
    var tasksView = new TasksView({
        collection: options.tasks
    });
    MyApp.mainRegion.show(tasksView);
});

$(document).ready(function(){
    if (docCookies.hasItem("tasks")) {
        var old_tasks = docCookies.getItem("tasks");
        var tasks_arr = []
        if (old_tasks != null) {
        
            old_tasks = old_tasks.split("--");
            for (var i = 0; i < old_tasks.length; i++) {
                tasks_arr.push(new Task( {name: old_tasks[i]}));
            }
        }
        var tasks = new Tasks(tasks_arr);
    }

    else {
        var tasks = new Tasks([
            new Task({ name: 'Clean room' }),
            new Task({ name: 'Brush teeth' }),
            new Task({ name: 'Code to-do list' })
        ]);
    }
    MyApp.start({tasks: tasks});
});

/*\
|*|
|*|  :: cookies.js ::
|*|
|*|  A complete cookies reader/writer framework with full unicode support.
|*|
|*|  Revision #1 - September 4, 2014
|*|
|*|  https://developer.mozilla.org/en-US/docs/Web/API/document.cookie
|*|  https://developer.mozilla.org/User:fusionchess
|*|
|*|  This framework is released under the GNU Public License, version 3 or later.
|*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
|*|
|*|  Syntaxes:
|*|
|*|  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
|*|  * docCookies.getItem(name)
|*|  * docCookies.removeItem(name[, path[, domain]])
|*|  * docCookies.hasItem(name)
|*|  * docCookies.keys()
|*|
\*/

var docCookies = {
  getItem: function (sKey) {
    if (!sKey) { return null; }
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  },
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
  },
  removeItem: function (sKey, sPath, sDomain) {
    if (!this.hasItem(sKey)) { return false; }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
    return true;
  },
  hasItem: function (sKey) {
    if (!sKey) { return false; }
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  },
  keys: function () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    return aKeys;
  }
};
