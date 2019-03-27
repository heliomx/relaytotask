// Modules
angular.module('components', []);
angular.module('ui-services', []);
angular.module('services', []);

// Main Module
angular.module('fontpickerApp', [
  'ngMaterial', 
  'ngMessages', 
  'services',
  'ui-services',
  'components'
]);