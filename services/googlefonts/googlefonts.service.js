// Service for Google Fonts API and resources

(function() {
  angular
        .module('services')
        .service('googlefontsService', ['$http', '$q', googlefontsService]);

  
  function googlefontsService($http, $q)
  {
    
    this.data = null;
    this.loadedFonts = [];

    this.list = function()
    {
      // Cache Font list
      var promise = $q( function(resolve, reject) {
        if(this.data)
        {
          resolve(this.data);
        } else {
          $http.get('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyDRq9tewDp9ndNKgCswXsYlqnThdBLaOqY')
            .then( function(r) {
              this.data = r.data;
              resolve(this.data);
            });
        }
      });
      
      return promise;
    }

    // Load a font
    this.load = function(font){
      if (this.loadedFonts.indexOf(font) == -1)
      {
        this.loadedFonts.push(font);
        WebFont.load({
          google: {
            families: [font.family]
          }
        });
      }
    }
    
  }
}());