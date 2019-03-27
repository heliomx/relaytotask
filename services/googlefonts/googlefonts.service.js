(function() {
  angular
        .module('services')
        .service('googlefontsService', ['$http', '$q', googlefontsService]);

  function googlefontsService($http, $q)
  {
    // AIzaSyDRq9tewDp9ndNKgCswXsYlqnThdBLaOqY
    this.data = null;
    this.loadedFonts = [];

    this.list = function()
    {
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