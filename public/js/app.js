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
          endereco: 'Av. Paulista, 1578 - Bela Vista, São Paulo - SP, 01310-200',
          nota: 5.0,
          foto: 'https://www.ligadoemviagem.com.br/wp-content/uploads/2018/09/masp-museu-artes-sao-paulo-19.jpg'
        },
      ]
      datas.concat(datas).concat(datas).concat(datas).forEach(function(data) {
        myApp.services.imovel.create(data);
      });
    }
  }

  if(page.id === 'completedTasksPage'){
    var datas = [
      {
        datahora: '10/03/2019 02:30',
        endereco: 'Av. Paulista, 1578 - Bela Vista, São Paulo - SP, 01310-200',
        nota: 5.0,
        foto: 'https://www.ligadoemviagem.com.br/wp-content/uploads/2018/09/masp-museu-artes-sao-paulo-19.jpg',
        status: 'Pendente'
      },
      {
        datahora: '10/03/2019 02:30',
        endereco: 'Av. Torre, 1578 - Eifell, Paris - FR, 01310-200',
        nota: 4.0,
        foto: 'https://cdn.getyourguide.com/img/tour_img-1290852-145.jpg',
        status: 'Aprovada'
      },
      {
        datahora: '10/03/2019 02:30',
        endereco: 'Av. Paulista, 1578 - Bela Vista, São Paulo - SP, 01310-200',
        nota: 1.0,
        foto: 'https://www.ligadoemviagem.com.br/wp-content/uploads/2018/09/masp-museu-artes-sao-paulo-19.jpg',
        status: 'Reprovada'
      },
    ]
    datas.forEach(function(data) {
      myApp.services.avaliacoes.create(data);
    });
  }

  if(page.id === 'imovelPage'){
    var datas = {
        endereco: 'Av. Paulista, 1578 - Bela Vista, São Paulo - SP, 01310-200',
        nota: 5.0,
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        fotos: [
          'https://www.ligadoemviagem.com.br/wp-content/uploads/2018/09/masp-museu-artes-sao-paulo-19.jpg', 
          'https://cdn.getyourguide.com/img/tour_img-1290852-145.jpg'
        ],
        avaliacao: {
          status: 'Reprovada',
          nota: 3.2,
          criterios: [
            {
              nome: 'Critério #1',
              nota: '5'
            },
            {
              nome: 'Critério #2',
              nota: 'Danificada, Pintura Ruim'
            },
          ]
        }
    }

    datas.fotos.forEach(function(data) {
      myApp.services.imovel.createImage(data, '#imovelPage .carousel');
    });
    initMap($('#imovelPage .map').get(0))
    myApp.services.imovel.createPanel(datas, '#imovelPage .panel');
    if(datas.avaliacao){
      datas.avaliacao.criterios.forEach(function(data) {
        myApp.services.imovel.createAvaliacao(data);
      });
      myApp.services.imovel.createAvaliacaoNotaFinal(datas.avaliacao);
    }
  }

  if(page.id === 'newTaskPage'){
    if (document.querySelector('#map')){
      initMap()
    }
  }

  if(page.id === 'scorePage'){
    var data = [
      {
        nome: 'Criterio #1',
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
      },
      {
        nome: 'Criterio #2',
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
      },
      {
        nome: 'Criterio #3',
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
      },
    ]

    data.forEach(function(d) {
      myApp.services.score.createAvaliacao(d, '#scorePage .carousel')
    })
  }

});