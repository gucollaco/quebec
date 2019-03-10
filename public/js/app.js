// App logic.
window.myApp = {};

document.addEventListener('init', function(event) {
  var page = event.target;

  function fetchData(data, url, success_func) {
    $.ajax({
      type: "POST",
      url: url,
      data: data,
      success: success_func 
    });
  }

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

      let url = '/api/imovel'
      $.ajax({
        type: "GET",
        url: url,
        data: {},
        success: function(data) {
          datas = data.data.result
          if(data.success) {
            datas.forEach(function(data) {
              myApp.services.imovel.create(data);
            });
            console.log('load ok')
          } else {
            console.log('load problem')
          }
        }
      });
    }
  }

  if(page.id === 'completedTasksPage'){
    var datas
    let url = '/api/imovel'
    $.ajax({
      type: "GET",
      url: url,
      data: null,
      success: function(data) {
        if(data.success) {
          datas = data.data.result
          datas.forEach(function(data) {
            myApp.services.avaliacoes.create(data);
          });
        } else {
          ons.notification.alert('Problema ao cadastrar.')
        }
      }
    });

    // var datas = [
    //   {
    //     datahora: '10/03/2019 02:30',
    //     endereco: 'Av. Paulista, 1578 - Bela Vista, São Paulo - SP, 01310-200',
    //     nota: 5.0,
    //     foto: 'https://www.ligadoemviagem.com.br/wp-content/uploads/2018/09/masp-museu-artes-sao-paulo-19.jpg',
    //     status: 'Pendente'
    //   },
    //   {
    //     datahora: '10/03/2019 02:30',
    //     endereco: 'Av. Torre, 1578 - Eifell, Paris - FR, 01310-200',
    //     nota: 4.0,
    //     foto: 'https://cdn.getyourguide.com/img/tour_img-1290852-145.jpg',
    //     status: 'Aprovada'
    //   },
    //   {
    //     datahora: '10/03/2019 02:30',
    //     endereco: 'Av. Paulista, 1578 - Bela Vista, São Paulo - SP, 01310-200',
    //     nota: 1.0,
    //     foto: 'https://www.ligadoemviagem.com.br/wp-content/uploads/2018/09/masp-museu-artes-sao-paulo-19.jpg',
    //     status: 'Reprovada'
    //   },
    // ]
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
            descricao: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            nota: '5'
          },
          {
            nome: 'Critério #2',
            descricao: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
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

  if(page.id === 'imovelAnalise'){
    var data = {
      criterios: [
        {
          nome: 'Criterio #1',
          influencia: 3,
          descricao: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
        {
          nome: 'Criterio #2',
          influencia: 2,
          descricao: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
        {
          nome: 'Criterio #3',
          influencia: -3,
          descricao: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
        {
          nome: 'Criterio #4',
          influencia: 1,
          descricao: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
        {
          nome: 'Criterio #5',
          influencia: -1,
          descricao: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
      ]
    }

    let positivos = data.criterios.filter(c => c.influencia > 0)
    let negativos = data.criterios.filter(c => c.influencia < 0)

    if(positivos.length == 0) $('#imovelAnalise .positivo').css('display', 'none')
    if(negativos.length == 0) $('#imovelAnalise .negativo').css('display', 'none')


    for(let d of negativos){
      myApp.services.score.createAnalise(d, '#analise-negativo-list');
    }
    for(let d of positivos){
      myApp.services.score.createAnalise(d, '#analise-positivo-list');
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
            window.location.href = ''
          } else {
            ons.notification.alert('Problema ao cadastrar.')
            window.location.href = ''
          }
        }
      });
    })
  }
  if(page.id === 'cadastrosPage'){
    let data = [
      {
        nome: 'Usuário #1',
        email: 'usuario.1@host.com',
        datahora: "10/03/2019 05:56"
      },
      {
        nome: 'Usuário #2',
        email: 'usuario.2@host.com',
        datahora: "10/03/2019 05:56"
      },
      {
        nome: 'Usuário #3',
        email: 'usuario.3@host.com',
        datahora: "08/03/2019 05:56",
        tag: 'Atrasado'
      },
      {
        nome: 'Usuário #4',
        email: 'usuario.4@host.com',
        datahora: "10/02/2019 05:56",
        tag: 'Urgente'
      },
    ]

    data.forEach(function(d) {
      myApp.services.cadastro.create(d)
    })
  }
  
  if(page.id === 'pendenciasPage'){
    let data = [
      {
        proprietario: 'Proprietário #1',
        endereco: 'Avenida Paulista, 1582 - Jardim, São Paulo - SP',
        colaborador: 'Colaborador #1',
        datahora: "10/03/2019 05:56"
      },
      {
        proprietario: 'Proprietário #2',
        endereco: 'Avenida Paulista, 1582 - Jardim, São Paulo - SP',
        colaborador: 'Colaborador #2',
        datahora: "10/03/2019 05:56"
      },
      {
        proprietario: 'Proprietário #3',
        endereco: 'Avenida Paulista, 1582 - Jardim, São Paulo - SP',
        colaborador: 'Colaborador #3',
        datahora: "10/03/2019 05:56",
        tag: 'Atrasado'
      },
      {
        proprietario: 'Proprietário #3',
        endereco: 'Avenida Paulista, 1582 - Jardim, São Paulo - SP',
        colaborador: 'Colaborador #3',
        datahora: "10/03/2019 05:56",
        tag: 'Urgente'
      },
    ]

    data.forEach(function(d) {
      myApp.services.avaliacoes.createPendencia(d)
    })
  }


});