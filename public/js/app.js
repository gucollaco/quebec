// App logic.
window.myApp = {};

document.addEventListener('init', function(event) {
  var page = event.target;

  // Each page calls its own initialization controller.
  if (myApp.controllers.hasOwnProperty(page.id)) {
    myApp.controllers[page.id](page);
  }

  // Fill the lists with initial data when the pages we need are ready.
  // This only happens once at the beginning of the app.
  if (page.id === 'menuPage' || page.id === 'pendingTasksPage') {
    if (document.querySelector('#menuPage')
      && document.querySelector('#pendingTasksPage')
      && !document.querySelector('#pendingTasksPage ons-list-item')
    ) {
      var datas = [
        {
          title: 'Download OnsenUI',
          category: 'Programming',
          description: 'Some description.',
          highlight: false,
          urgent: false
        },
      ]
      datas.forEach(function(data) {
        // myApp.services.tasks.createImage(data);
      });
    }
  }
});