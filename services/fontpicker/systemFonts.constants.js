(function() {
  angular
    .module('app.uiServices')
    .constant('systemFonts', 
      [
        {
            name: 'Sans serif',
            family: 'sans-serif',
            selected: false
        },
        {
            name: 'Serif',
            family: 'serif',
            selected: false
        },
        {
            name: 'Fantasy',
            family: 'fantasy',
            selected: false
        },
        {
            name: 'Cursive',
            family: 'cursive',
            selected: false
        },
        {
            name: 'Monospace',
            family: 'monospace',
            selected: false
        }
      ]
    );
  })();