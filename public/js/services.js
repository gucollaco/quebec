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
    },
  
    ////////////////////////
    // Initial Data Service //
    ////////////////////////
    fixtures: [
      {
        title: 'Download OnsenUI',
        category: 'Programming',
        description: 'Some description.',
        highlight: false,
        urgent: false
      },
      {
        title: 'Install Monaca CLI',
        category: 'Programming',
        description: 'Some description.',
        highlight: false,
        urgent: false
      },
      {
        title: 'Star Onsen UI repo on Github',
        category: 'Super important',
        description: 'Some description.',
        highlight: false,
        urgent: false
      },
      {
        title: 'Register in the community forum',
        category: 'Super important',
        description: 'Some description.',
        highlight: false,
        urgent: false
      },
      {
        title: 'Send donations to Fran and Andreas',
        category: 'Super important',
        description: 'Some description.',
        highlight: false,
        urgent: false
      },
      {
        title: 'Profit',
        category: '',
        description: 'Some description.',
        highlight: false,
        urgent: false
      },
      {
        title: 'Visit Japan',
        category: 'Travels',
        description: 'Some description.',
        highlight: false,
        urgent: false
      },
      {
        title: 'Enjoy an Onsen with Onsen UI team',
        category: 'Personal',
        description: 'Some description.',
        highlight: false,
        urgent: false
      }
    ]
  };