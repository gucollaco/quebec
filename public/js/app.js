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
          endereço: 'Av. Paulista, 1578 - Bela Vista, São Paulo - SP, 01310-200',
          nota: 5.0,
          foto: 'https://www.ligadoemviagem.com.br/wp-content/uploads/2018/09/masp-museu-artes-sao-paulo-19.jpg'
        },
      ]
      datas.forEach(function(data) {
        // myApp.services.imovel.create(data);
      });
    }
  }

  if(page.id === 'pendingTasksPage'){
    if (document.querySelector('#map')){
      initMap()
    }
  }

  if(page.id === 'newTaskPages'){
    $('.selectpicker').selectpicker();
  }

});