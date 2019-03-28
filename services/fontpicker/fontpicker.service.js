// Service for Font picker modal. This module is implemented as a service so it can be easily used
// everywhere in the application

(function()
{
    angular
        .module('app.uiServices')
        .service('fontpickerService', ['$mdDialog', fontpickerService]);
    
    function fontpickerService($mdDialog) 
    {
        this.show = function(ev) 
        {
            return $mdDialog.show(
                {
                    controller: DialogController, // ./dialog.controller.js
                    templateUrl: './services/fontpicker/fontpicker.template.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:true
                }
            );
        }
    }
}());
