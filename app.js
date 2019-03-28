// Modules
angular.module('app.components', []);
angular.module('app.uiServices', []);
angular.module('app.services', []);
angular.module('app.filters', []);

// Main Module
angular.module('app', [
  'ngMaterial', 
  'ngMessages', 
  'app.services',
  'app.uiServices',
  'app.components'
]);