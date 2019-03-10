/***********************************************************************************
 * App Services. This contains the logic of the application organised in modules/objects. *
 ***********************************************************************************/

myApp.services = {

  /////////////////
  // Task Service //
  /////////////////
  tasks: {

    // Creates a new task and attaches it to the pending task list.
    create: function(data) {
      // Task item template.
      var taskItem = ons.createElement(
        '<ons-list-item tappable category="none">' +
          '<label class="left">' +
            '<ons-checkbox></ons-checkbox>' +
          '</label>' +
          '<div class="center">' +
            data.title +
          '</div>' +
          '<div class="right">' +
            '<ons-icon style="color: grey; padding-left: 4px" icon="ion-ios-trash-outline, material:md-delete"></ons-icon>' +
          '</div>' +
        '</ons-list-item>'
      );
      

      // Store data within the element.
      taskItem.data = data;

      // Add 'completion' functionality when the checkbox changes.
      taskItem.data.onCheckboxChange = function(event) {
        myApp.services.animators.swipe(taskItem, function() {
          var listId = (taskItem.parentElement.id === 'pending-list' && event.target.checked) ? '#completed-list' : '#pending-list';
          document.querySelector(listId).appendChild(taskItem);
        });
      };

      taskItem.addEventListener('change', taskItem.data.onCheckboxChange);

      // Add button functionality to remove a task.
      taskItem.querySelector('.right').onclick = function() {
        myApp.services.tasks.remove(taskItem);
      };

      // Add functionality to push 'details_task.html' page with the current element as a parameter.
      taskItem.querySelector('.center').onclick = function() {
        document.querySelector('#myNavigator')
          .pushPage('html/details_task.html',
            {
              animation: 'lift',
              data: {
                element: taskItem
              }
            }
          );
      };

      // Add the highlight if necessary.
      if (taskItem.data.highlight) {
        taskItem.classList.add('highlight');
      }

      // Insert urgent tasks at the top and non urgent tasks at the bottom.
      var pendingList = document.querySelector('#pending-list');
      pendingList.insertBefore(taskItem, taskItem.data.urgent ? pendingList.firstChild : null);
    },

    // Creates a new task and attaches it to the pending task list.
    createImage: function(data) {
      // Task item template.
      var taskItem = ons.createElement(
        `<ons-page>
          <ons-toolbar>
            <div class="center">Carousel</div>
          </ons-toolbar>
          <ons-carousel swipeable overscrollable auto-scroll fullscreen var="carousel">
            <ons-carousel-item style="background-color: gray;">
              <div class="item-label">GRAY</div>
            </ons-carousel-item>
            <ons-carousel-item style="background-color: #085078;">
              <div class="item-label">BLUE</div>
            </ons-carousel-item>
            <ons-carousel-item style="background-color: #373B44;">
              <div class="item-label">DARK</div>
            </ons-carousel-item>
            <ons-carousel-item style="background-color: #D38312;">
              <div class="item-label">ORANGE</div>
            </ons-carousel-item>
            <ons-carousel-cover>
              <div class="cover-label">Swipe left or right</div>
            </ons-carousel-cover>
          </ons-carousel>
        </ons-page>`
      );
    },

    // Modifies the inner data and current view of an existing task.
    update: function(taskItem, data) {
      if (data.title !== taskItem.data.title) {
        // Update title view.
        taskItem.querySelector('.center').innerHTML = data.title;
      }

      if (data.category !== taskItem.data.category) {
        // Modify the item before updating categories.
        taskItem.setAttribute('category', myApp.services.categories.parseId(data.category));
        // Check if it's necessary to create new categories.
        myApp.services.categories.updateAdd(data.category);
        // Check if it's necessary to remove empty categories.
        myApp.services.categories.updateRemove(taskItem.data.category);

      }

      // Add or remove the highlight.
      taskItem.classList[data.highlight ? 'add' : 'remove']('highlight');

      // Store the new data within the element.
      taskItem.data = data;
    },

    // Deletes a task item and its listeners.
    remove: function(taskItem) {
      taskItem.removeEventListener('change', taskItem.data.onCheckboxChange);

      myApp.services.animators.remove(taskItem, function() {
        // Remove the item before updating the categories.
        taskItem.remove();
        // Check if the category has no items and remove it in that case.
        myApp.services.categories.updateRemove(taskItem.data.category);
      });
    }
  },

  imovel: {
    // Creates a new task and attaches it to the pending task list.
    create: function(data, at="#pending-list") {
      let address = data.endereco.split('-')
      let grade = parseFloat(data.nota).toFixed(1).split('.')

      // Task item template.
      var taskItem = ons.createElement(
        `<ons-card class="imovel-card">
          <img src="${data.foto}" alt="${data.endereco}">
          <div class="title">
            <div class="address">${address[0]}<span class="low">${address[1]}</span></div>
            <div class="grade">${grade[0]}<span class="decimal">.${grade[1]}</span></div>            
          </div>
        </ons-card>`
      );
      

      // Store data within the element.
      taskItem.data = data;

      // Insert urgent tasks at the top and non urgent tasks at the bottom.
      var pendingList = document.querySelector(at);
      pendingList.insertBefore(taskItem, taskItem.data.urgent ? pendingList.firstChild : null);
    },

    createImage: function(data, at){
      let imageItem = ons.createElement(
        `<ons-carousel-item>
            <img src="${data}" />
        </ons-carousel-item>`
      )

      imageItem.data = data

      var pendingList = document.querySelector(at);
      pendingList.insertBefore(imageItem, null);
    },

    createPanel: function(data, at){
      let address = data.endereco.split('-')
      let grade = parseFloat(data.nota).toFixed(1)

      let panelItem = ons.createElement(
        `<div>
        <div class="title">
          <div class="address">
            ${address[0]}
            <span class="low">
              <ons-icon icon="fa-map-marker-alt"></ons-icon>
              ${address[1]}
            </span>
          </div>

          <div class="grade">
            <div>
              ${grade}
            </div>
          </div>
        </div>

        <div class="desc">
          ${data.descricao}
        </div>

        </div>`)

        panelItem.data = data
  
        var pendingList = document.querySelector(at);
        pendingList.insertBefore(panelItem, null);
    },

    createAvaliacao: function(data, at="#avaliacao-list"){

      let panelItem = ons.createElement(
        `<div class="avaliacao">
        
        <div class="nome">
          ${data.nome}
        </div>
        <div class="desc">
          ${data.descricao}
        </div>

        <div class="nota">
          <span>Avaliação:</span>
          ${data.nota}
        </div>

        </div>`)

        panelItem.data = data
  
        var pendingList = document.querySelector(at);
        pendingList.insertBefore(panelItem, null);
    },

    createAvaliacaoNotaFinal: function(data, at="#avaliacao-list"){

      let panelItem = ons.createElement(
        `<ons-list-title>

        <span class="nota-final">
          <span>NOTA FINAL</span>${data.nota}
        </span>
        <span class="status ${data.status.toLowerCase()[0]}">${data.status}</span>

        </ons-list-title>`)

        panelItem.data = data
  
        var pendingList = document.querySelector(at);
        pendingList.insertBefore(panelItem, null);
    }
  },

  score: {
    createAvaliacao: function(data, at){
      let scoreItem = ons.createElement(
        `<ons-carousel-item style="background-color: transparent;">
          <ons-card class="criterio-data">
              <div class="title">
                  ${data.nome}
              </div>
              <div class="content">
                  ${data.descricao}
              </div>
          </ons-card>
          
          <ons-card class="criterio-nota">
              <select class="submit-avaliacao form-control">
                  <option value="">Nenhuma</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
              </select>
          </ons-card>
        </ons-carousel-item>`
      )

      // Store data within the element.
      scoreItem.data = data;

      // Insert urgent tasks at the top and non urgent tasks at the bottom.
      var pendingList = document.querySelector(at);
      pendingList.insertBefore(scoreItem, null);
    },

    createAnalise: function(data, at="#analise-list"){
      let influencias = {
        '3': 'angle-double-up',
        "2": 'angle-up',
        "1": 'caret-up',
        "-1": 'caret-down',
        '-2': 'angle-down',
        '-3': 'angle-double-down',
      }

      let scoreItem = ons.createElement(
        `<div class="inf inf-${data.influencia}">

        <div class="influence">
          <ons-icon icon="fa-${influencias[String(data.influencia)]}"></ons-icon>
        </div>

        <div class="nome">
          ${data.nome}
        </div>

        </div>`
      )

      // Store data within the element.
      scoreItem.data = data;

      scoreItem.onclick = function(){
        ons.notification.alert(this.data.descricao)
      }

      // Insert urgent tasks at the top and non urgent tasks at the bottom.
      var pendingList = document.querySelector(at);
      pendingList.insertBefore(scoreItem, null);
    }
  },

  avaliacoes: {
    
    // Creates a new task and attaches it to the pending task list.
    create: function(data, at="#completed-list") {
      let address = data.endereco.split('-')
      let grade = parseFloat(data.nota).toFixed(1).split('.')

      // Task item template.
      var taskItem = ons.createElement(
        `<ons-card class="imovel-card">
          <div class="status ${data.status[0].toLowerCase()}">${data.status}</div>
          <div class="title">
            <div class="address">${address[0]}<span class="low">${address[1]}</span></div>
            <div class="grade">${grade[0]}<span class="decimal">.${grade[1]}</span></div>            
          </div>
          <div class="hora">
            ${data.datahora}
          </div>
        </ons-card>`
      );
      

      // Store data within the element.
      taskItem.data = data;

      // Insert urgent tasks at the top and non urgent tasks at the bottom.
      var pendingList = document.querySelector(at);
      pendingList.insertBefore(taskItem, null);
    },
  },

  //////////////////////
  // Animation Service //
  /////////////////////
  animators: {

    // Swipe animation for task completion.
    swipe: function(listItem, callback) {
      var animation = (listItem.parentElement.id === 'pending-list') ? 'animation-swipe-right' : 'animation-swipe-left';
      listItem.classList.add('hide-children');
      listItem.classList.add(animation);

      setTimeout(function() {
        listItem.classList.remove(animation);
        listItem.classList.remove('hide-children');
        callback();
      }, 950);
    },

    // Remove animation for task deletion.
    remove: function(listItem, callback) {
      listItem.classList.add('animation-remove');
      listItem.classList.add('hide-children');

      setTimeout(function() {
        callback();
      }, 750);
    }
  }
};