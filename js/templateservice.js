var templateservicemod = angular.module('templateservicemod', []);
templateservicemod.service('TemplateService', function() {
  this.title = "Home";
  this.meta = "Google";
  this.metadesc = "Home";

  var d = new Date();
  this.year = d.getFullYear();

  this.init = function() {
    this.headermenu = "views/headermenu.html";
    this.header = "views/header.html";
    this.menu = "views/menu.html";
    this.slider = "views/slider.html";
    this.content = "views/content/content.html";
    this.footermenu = "views/footermenu.html";
    this.footer = "views/footer.html";
    this.account = "views/account.html";

        this.removeLoaderTemp = 0;
        this.removeLoaderNum = 0;
  };


    this.removeLoader = function() {
        this.removeLoaderTemp++;
        if (this.removeLoaderTemp >= this.removeLoaderNum) {
            this.isLoader = false;
        }
    };
    this.getLoader = function() {
        this.isLoader = true;
    };
    this.removeLoaderOn = function(num) {
        this.isLoader = true;
        this.removeLoaderNum = num;
    };

  this.changecontent = function(page) {
    this.init();
    var data = this;
    data.content = "views/content/" + page + ".html";
    return data;
  };

  this.init();

});
