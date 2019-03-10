// App logic.
window.myApp = {};

var IMOVEL, SPLITTER;

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
    $('#titleNome').text(SPLITTER.usuario.user.nome)
    if (document.querySelector('#menuPage')
      && document.querySelector('#pendingTasksPage')
      && !document.querySelector('#pendingTasksPage ons-list-item')
    ) {
      var url = '/api/imovel?pontuacao=true'
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

      url = '/api/imovel?proximidade=true'
      $.ajax({
        type: "GET",
        url: url,
        data: {},
        success: function(data) {
          datas = data.data.result
          if(data.success) {
            datas.forEach(function(data) {
              myApp.services.imovel.create(data, '#notification-list');
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
          // datas = data.data.result
          // datas.forEach(function(data) {
          //   myApp.services.avaliacoes.create(data);
          // });
        } else {
          // ons.notification.alert('Problema ao cadastrar.')
        }
      }
    });
  }
  if(page.id === 'splitterPage'){ 
    SPLITTER = event.target.data
  }

  if(page.id === 'tabbarPage'){    
    let _tabs = SPLITTER.tabs
    let perfil = SPLITTER.usuario.user.perfil

    let tabs_por_perfil = {
      'COLABORADOR': ['pending_tasks', 'completed_tasks'],
      'PROPRIETARIO': ['pending_tasks'],
      'IMOBILIARIA': ['pending_tasks', 'cadastros_pendentes', 'avaliacoes_pendentes']
    }

    let __tabs = perfil.map(p => tabs_por_perfil[p]).reduce((acc, cur) => acc.concat(cur || []), [])
    _tabs = (_tabs || []).concat(__tabs)

    if(_tabs){
      let tabs = $('#tabbarPage ons-tabbar ons-tab').toArray()

      let to_hide = []
      let result = false
      let i = 0
      for(let tab of tabs){
        result = _tabs.filter(t => tab.page.includes(t)).length > 0
        
        if(!result){
          $(tab).hide()
        }else if(i > 0){
          // $('#tabbarPage ons-tabbar').get(0).setActiveTab(2)
          // i = -1000
        }
        i++

      }

    }
  }

  if(page.id === 'imovelPage'){
    IMOVEL = event.target.data.imovel

    let _tabs = event.target.data.tabs

    if(_tabs){
      let tabs = $('#imovelPage ons-tabbar ons-tab').toArray()

      let result = false
      for(let tab of tabs){
        result = _tabs.filter(t => tab.page.includes(t)).length > 0
        
        if(!result){
          $(tab).hide()
        }
      }
    }
  }

  if(page.id === 'imovelData'){

    var url = '/api/imovel/'+IMOVEL.id_imovel;
    $.ajax({
      type: "GET",
      url: url,
      data: null,
      success: function(data) {
        if(data.success) {
          datas = data.data.result[0]

          datas.links.forEach(function(data) {
            myApp.services.imovel.createImage(data, '#imovelPage .carousel');
          });

          initMap($('#imovelPage .map').get(0))
          myApp.services.imovel.createPanel(datas, '#imovelPage .panel');
        } else {
          // ons.notification.alert('Problema ao cadastrar.')
        }
      }
    });
    // datas.fotos.forEach(function(data) {
    //   myApp.services.imovel.createImage(data, '#imovelPage .carousel');
    // });
    // initMap($('#imovelPage .map').get(0))
    // myApp.services.imovel.createPanel(datas, '#imovelPage .panel');
  }

  if(page.id === 'imovelAvaliacao'){
    var url = '/api/avaliacao/'+IMOVEL.id_imovel+'/imovel/';

    $.ajax({
      type: "GET",
      url: url,
      data: null,
      success: function(data) {
        var datas = data.data[0]
        // var datas = {
        //   avaliacao: {
        //     status: 'Reprovada',
        //     nota: 3.2,
        //     criterios: [
        //       {
        //         nome: 'Critério #1',
        //         descricao: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        //         nota: '5'
        //       },
        //       {
        //         nome: 'Critério #2',
        //         descricao: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        //         nota: 'Danificada, Pintura Ruim'
        //       },
        //     ]
        //   }
        // }
        if(datas.length > 0){
          myApp.services.imovel.createAvaliacaoNotaFinal(datas);
          datas.criterios.forEach(function(data) {
            myApp.services.imovel.createAvaliacao(data);
          });
        }
        // if(data.success) {
        //   datas = data.data.result[0]

        //   datas.links.forEach(function(data) {
        //     myApp.services.imovel.createImage(data, '#imovelPage .carousel');
        //   });

        //   initMap($('#imovelPage .map').get(0))
        //   myApp.services.imovel.createPanel(datas, '#imovelPage .panel');
        // } else {
        //   // ons.notification.alert('Problema ao cadastrar.')
        // }
      }
    });
    // var datas = {
    //   avaliacao: {
    //     status: 'Reprovada',
    //     nota: 3.2,
    //     criterios: [
    //       {
    //         nome: 'Critério #1',
    //         descricao: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    //         nota: '5'
    //       },
    //       {
    //         nome: 'Critério #2',
    //         descricao: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    //         nota: 'Danificada, Pintura Ruim'
    //       },
    //     ]
    //   }
    // }
    // if(datas.avaliacao){
    //   myApp.services.imovel.createAvaliacaoNotaFinal(datas.avaliacao);
    //   datas.avaliacao.criterios.forEach(function(data) {
    //     myApp.services.imovel.createAvaliacao(data);
    //   });
    // }
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
      // return document.querySelector('#myNavigator').resetToPage('html/splitter.html', {
      //   data: {
      //       title: 'Quebec'
      //   }
      // })

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
                  usuario: data.data,
                  title: 'Quebec'
              }
            })
            // ons.notification.alert(token)
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
      document.querySelector('#myNavigator').resetToPage('html/cadastrar.html', {
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
  if(page.id === 'cadastrosPage'){
    let url = '/api/usuario/pendente'

    $.ajax({
      type: "GET",
      url: url,
      data: data,
      success: function(data) {
        if(data.success) {
          datas = data.data.result

          datas.forEach(function(d) {
            myApp.services.cadastro.create(d)
          })
        } else {
          ons.notification.alert('Problema encontrado.')
        }
      }
    });
    // let data = [
    //   {
    //     nome: 'Usuário #1',
    //     email: 'usuario.1@host.com',
    //     datahora: "10/03/2019 05:56"
    //   },
    //   {
    //     nome: 'Usuário #2',
    //     email: 'usuario.2@host.com',
    //     datahora: "10/03/2019 05:56"
    //   },
    //   {
    //     nome: 'Usuário #3',
    //     email: 'usuario.3@host.com',
    //     datahora: "08/03/2019 05:56",
    //     tag: 'Atrasado'
    //   },
    //   {
    //     nome: 'Usuário #4',
    //     email: 'usuario.4@host.com',
    //     datahora: "10/02/2019 05:56",
    //     tag: 'Urgente'
    //   },
    // ]

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