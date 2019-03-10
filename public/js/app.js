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

  if(page.id === 'imovelData'){
    var datas = {
        endereco: 'Av. Paulista, 1578 - Bela Vista, São Paulo - SP, 01310-200',
        nota: 5.0,
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        fotos: [
          'https://www.ligadoemviagem.com.br/wp-content/uploads/2018/09/masp-museu-artes-sao-paulo-19.jpg', 
          'https://cdn.getyourguide.com/img/tour_img-1290852-145.jpg'
        ],
    }

    datas.fotos.forEach(function(data) {
      myApp.services.imovel.createImage(data, '#imovelPage .carousel');
    });
    initMap($('#imovelPage .map').get(0))
    myApp.services.imovel.createPanel(datas, '#imovelPage .panel');
  }

  if(page.id === 'imovelAvaliacao'){
    var datas = {
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
    if(datas.avaliacao){
      myApp.services.imovel.createAvaliacaoNotaFinal(datas.avaliacao);
      datas.avaliacao.criterios.forEach(function(data) {
        myApp.services.imovel.createAvaliacao(data);
      });
    }
  }

  if(page.id === 'newTaskPage'){
    if (document.querySelector('#map')){
      initMap()
    }
  }

  if(page.id === 'loginPage'){
    $(document).on('click', '#entrar', function(){
      var usuario = document.getElementById('username').value;
      var senha = document.getElementById('password').value;
      
      let data = {
        credenciais: {
          usuario,
          senha,
        },
      }

      let url = '/api/usuario/login'
      $.ajax({
        type: "POST",
        url: url,
        data: data,
        success: function(data) {
          if(data.success) {
            let token = data.data.token
            document.querySelector('#myNavigator').resetToPage('html/splitter.html', {
              data: {
                  imovel: this.data,
                  title: 'Quebec'
              }
            })
            ons.notification.alert(token)
          } else {
            ons.notification.alert('Problema ao cadastrar.')
          }
        }
      });
    
      // if (username === 'bob' && password === 'secret') {
      //   ons.notification.alert('Congratulations!');
      // } else {
      //   ons.notification.alert('Incorrect username or password.');
      // }
    });

    $(document).on('click', '#cadastrar', function(){
      document.querySelector('#myNavigator').pushPage('html/cadastrar.html', {
          data: {
              imovel: this.data,
              title: 'Cadastro'
          }
      })
    });
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
  if(page.id === 'cadastrarPage'){
    $(document).on('click', '#confirmarCadastro', function(){
      let url = '/api/usuario/'

      let nome = $('#nome').val()
      let username = $('#email').val()
      let password = $('#passwordUsuario').val()
      let endereco = $('#endereco').val()
      let numero = $('#numero').val()
      
      let data = {
        nome: nome,
        perfil: 'COLABORADOR',
        pendente: true,
        credenciais: {
          usuario: username,
          senha: password,
        },
        locais: endereco + ' ' + numero
      }

      $.ajax({
        type: "POST",
        url: url,
        data: data,
        success: function(data) {
          if(data.success) {
            ons.notification.alert('Obrigado por se cadastrar. Entraremos em contato em breve, com o retorno sobre sua solicitação.')
          } else {
            ons.notification.alert('Problema ao cadastrar.')
          }
        }
      });
    })
  }

});