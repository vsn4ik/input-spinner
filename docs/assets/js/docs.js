'use strict';

var exec = function() {
  fetch('https://api.github.com/repos/vsn4ik/input-spinner')
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      // NOTE: XSS check
      if (typeof response.stargazers_count !== 'number') {
        return;
      }

      document.querySelector('.js-stargazers-count').style.setProperty('--stargazers', response.stargazers_count);
    });

    $('#customize-spinner').spinner('changed', function(event, newVal, oldVal) {
      $('#old-val').text(oldVal);
      $('#new-val').text(newVal);
    });

    $('[data-trigger="spinner"]').spinner('changing', function(event, newVal, oldVal) {
      $(event.currentTarget).closest('.well').find('small').text('Old = ' + oldVal + ', New = ' + newVal);
    });

    $('#step-spinner').spinner({
      step: function(dir) {
        if ((this.oldValue === 1 && dir === 'down') || (this.oldValue === -1 && dir === 'up')) {
            return 2;
        }
        return 1;
      }
    });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', exec);
} else {
  exec();
}