angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngAnimate', 'ngSanitize', 'angular-flexslider', 'ui-rangeSlider'])

.controller('HomeCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file

    console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("home");
    $scope.menutitle = NavigationService.makeactive("Home");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.footerColor = "home-footer";

    $scope.mySlides = [
      'img/home-slider.jpg',
      'img/home-slider.jpg',
      'img/home-slider.jpg'
    ];
    $scope.client = [{
      detail: "I can now wear a new outfit for every occasion, thanks to their super quick service, and access to a huge selection of outfits by some of my favourite designers!",
      name: "Riya shah"
    }, {
      detail: "I can now wear a new outfit for every occasion, thanks to their super quick service, and access to a huge selection of outfits by some of my favourite designers!",
      name: "Riya shah"
    }];
  })
  .controller('ProfileCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("profile");
    $scope.menutitle = NavigationService.makeactive("Profile");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

  })
  .controller('OrdersCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("orders");
    $scope.menutitle = NavigationService.makeactive("Orders");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.oneAtATime = true;

  })
  .controller('OrderdetailCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("orderdetail");
    $scope.menutitle = NavigationService.makeactive("Orderdetail");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

  })
  .controller('WishlistCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("wishlist");
    $scope.menutitle = NavigationService.makeactive("Wishlist");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.wishlist = [{
      img: "img/product1.png",
      name: "The Nawishtah Jacket and Gown",
      price: "4500"
    }, {
      img: "img/product2.png",
      name: "The Mashq Suit",
      price: "4500"
    }, {
      img: "img/product3.png",
      name: "Raw Silk Gold Choli",
      price: "4500"
    }, {
      img: "img/product1.png",
      name: "The Nawishtah Jacket and Gown",
      price: "4500"
    }, {
      img: "img/product2.png",
      name: "The Mashq Suit",
      price: "4500"
    }, {
      img: "img/product3.png",
      name: "Raw Silk Gold Choli",
      price: "4500"
    }, {
      img: "img/product1.png",
      name: "The Nawishtah Jacket and Gown",
      price: "4500"
    }, {
      img: "img/product2.png",
      name: "The Mashq Suit",
      price: "4500"
    }, {
      img: "img/product3.png",
      name: "Raw Silk Gold Choli",
      price: "4500"
    }];

  })
  .controller('AddressCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("address");
    $scope.menutitle = NavigationService.makeactive("Address");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

  })
  .controller('SaveaddressCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("saveaddress");
    $scope.menutitle = NavigationService.makeactive("Saveaddress");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

  })
  .controller('BankdetailCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("bankdetail");
    $scope.menutitle = NavigationService.makeactive("Bankdetail");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

  })
  .controller('CheckoutSigninCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("checkout-signin");
    $scope.menutitle = NavigationService.makeactive("CheckoutSignin");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

  })
  .controller('CheckoutLoginCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("checkout-login");
    $scope.menutitle = NavigationService.makeactive("CheckoutLogin");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.forgot = function() {
      $uibModal.open({
        animation: true,
        templateUrl: "views/modal/forgotpassword.html",
        controller: "CheckoutLoginCtrl"
      });
    };

  })
  .controller('CheckoutOrderCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("checkout-orderdetail");
    $scope.menutitle = NavigationService.makeactive("Checkoutorder");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

  })
  .controller('ChangepasswordCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("changepassword");
    $scope.menutitle = NavigationService.makeactive("Changepassword");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.changePassowrd = function() {
      $uibModal.open({
        animation: true,
        templateUrl: "views/modal/passwordchange.html",
        controller: "ChangepasswordCtrl"
      });
    };

  })
  .controller('CartCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("cart");
    $scope.menutitle = NavigationService.makeactive("Cart");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.cart = [{
      img: "img/product1.png",
      name: "The Nawishtah Jacket and Gown",
      desginername: "anita dongre",
      rental: "6700",
      size: "M",
      price: "9,999",
      date: "04 May 2016",
      duration: "07"
    }, {
      img: "img/product2.png",
      name: "The Nawishtah Jacket and Gown",
      desginername: "anita dongre",
      rental: "6700",
      size: "M",
      price: "9,999",
      date: "04 May 2016",
      duration: "07"
    }];

    $scope.date = function() {
      $uibModal.open({
        animation: true,
        templateUrl: "views/modal/changedate.html",
        controller: "CartCtrl"
      })
    };
    $scope.remove = function() {
      $uibModal.open({
        animation: true,
        templateUrl: "views/modal/removeitem.html",
        controller: "CartCtrl"
      })
    };

  })
  .controller('ProductCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("product");
    $scope.menutitle = NavigationService.makeactive("Product");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.addTowishlist = function(product) {
      if (product.heart == "fa-heart") {
        product.heart = "fa-heart-o";
      } else {
        product.heart = "fa-heart";
      }
      $uibModal.open({
        animation: true,
        templateUrl: 'views/modal/added-wishlist.html',
      });
    };

    $scope.oneAtATime = true;

    $scope.demo2 = {
      range: {
        min: 0,
        max: 10050
      },
      minPrice: 1000,
      maxPrice: 4000
    };

    $scope.shopping = [{
      img: "img/product1.png",
      name: "The Nawishtah Jacket and Gown",
      price: "4500",
      heart: "fa-heart-o"
    }, {
      img: "img/product2.png",
      name: "The Mashq Suit",
      price: "4500",
      heart: "fa-heart-o"
    }, {
      img: "img/product3.png",
      name: "Raw Silk Gold Choli",
      price: "4500",
      heart: "fa-heart-o"
    }, {
      img: "img/product1.png",
      name: "The Nawishtah Jacket and Gown",
      price: "4500",
      heart: "fa-heart-o"
    }, {
      img: "img/product2.png",
      name: "The Mashq Suit",
      price: "4500",
      heart: "fa-heart-o"
    }, {
      img: "img/product3.png",
      name: "Raw Silk Gold Choli",
      price: "4500",
      heart: "fa-heart-o"
    }];
  })
  .controller('ProductdetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("productdetail");
    $scope.menutitle = NavigationService.makeactive("Productdetail");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.oneAtATime = true;
    $scope.product = [
      'img/product-detail.png',
      'img/product-detail.png',
      'img/product-detail.png',
      'img/product-detail.png',
      'img/product-detail.png',
      'img/product-detail.png',
      'img/product-detail.png',
      'img/product-detail.png'
    ];
    $scope.relatedProduct = [
      'img/suggest1.png',
      'img/suggest2.png',
      'img/suggest1.png',
      'img/suggest2.png',
      'img/suggest1.png',
      'img/suggest2.png',
      'img/suggest2.png',
      'img/suggest1.png',
      'img/suggest2.png',
      'img/suggest1.png',
      'img/suggest2.png',
    ];
    $scope.suggested = [{
      img: "img/suggest1.png",
      name: "Bridal polki jewellery",
      designer: "Anita Dongre's ",
      price: "4,500"
    }, {
      img: "img/suggest2.png",
      name: "Bridal polki jewellery",
      designer: "Anita Dongre's ",
      price: "4,500"
    }, {
      img: "img/suggest2.png",
      name: "Bridal polki jewellery",
      designer: "Anita Dongre's ",
      price: "4,500"
    }, {
      img: "img/suggest1.png",
      name: "Bridal polki jewellery",
      designer: "Anita Dongre's ",
      price: "4,500"
    }, {
      img: "img/suggest1.png",
      name: "Bridal polki jewellery",
      designer: "Anita Dongre's ",
      price: "4,500"
    }, {
      img: "img/suggest1.png",
      name: "Bridal polki jewellery",
      designer: "Anita Dongre's ",
      price: "4,500"
    }];
    $scope.shop = function() {
      $uibModal.open({
        animation: true,
        templateUrl: "views/modal/shop.html",
        scope: $scope
      })
    };
    $scope.productFull = function() {
      $uibModal.open({
        animation: true,
        templateUrl: "views/modal/product-full.html",
        scope: $scope
      })
    };
    $scope.addTowishlist = function() {
      $uibModal.open({
        animation: true,
        templateUrl: 'views/modal/added-wishlist.html',
      });
    };
  })
  .controller('CelebrityChoiceCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("celebrity-choice");
    $scope.menutitle = NavigationService.makeactive("CelebrityChoice");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.oneAtATime = true;
  })
  .controller('ThankyouCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("thankyou");
    $scope.menutitle = NavigationService.makeactive("Thankyou");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.oneAtATime = true;
    TemplateService.footer = "";
  })
  .controller('SorryCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("sorry");
    $scope.menutitle = NavigationService.makeactive("Sorry");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.oneAtATime = true;
    TemplateService.footer = "";
  })

.controller('headerctrl', function($scope, TemplateService, $uibModal) {
  $scope.template = TemplateService;
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    $(window).scrollTop(0);
  });
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();

    if (scroll >= 70) {
        $(".logo-view").addClass("small-logo");
    } else {
        $(".logo-view").removeClass("small-logo");
    }
});
  var modal1 = "";
  var modal2 = "";
  var modal3 = "";
  var modal4 = "";
  $scope.cart = function() {
    $uibModal.open({
      animation: true,
      templateUrl: "views/modal/hello.html",
      scope: $scope
    });
  };
  $scope.signUp = function() {
    modal1 = $uibModal.open({
      animation: true,
      templateUrl: "views/modal/signup.html",
      scope: $scope
    });
    console.log(modal1);
  };
  $scope.logIn = function() {
    modal3 = $uibModal.open({
      animation: true,
      templateUrl: "views/modal/login.html",
      scope: $scope
    });
  };
  $scope.emailSignup = function() {
    modal2 = $uibModal.open({
      animation: true,
      templateUrl: "views/modal/email-signup.html",
      scope: $scope
    });
  };
  $scope.forgot = function() {
    modal4 = $uibModal.open({
      animation: true,
      templateUrl: "views/modal/forgotpassword.html",
      scope: $scope
    });
  };
  $scope.oneAtATime = true;

  $scope.showCross = "";
  $scope.showMe = "menu-out";
  $scope.showMenu = function() {
    if ($scope.showMe == "menu-in") {
      $scope.showMe = "menu-out";
      $scope.showCross = "";
    } else {
      $scope.showMe = "menu-in";
      $scope.showCross = "cross-ham";
    }
  }

  $scope.closeAllModals = function() {
    if (modal1) {
      modal1.close();
    }
    if (modal2) {
      modal2.close();
    }
    if (modal3) {
      modal3.close();
    }
    if (modal4) {
      modal4.close();
    }
  }

})

.controller('languageCtrl', function($scope, TemplateService, $translate, $rootScope) {

  $scope.changeLanguage = function() {
    console.log("Language CLicked");

    if (!$.jStorage.get("language")) {
      $translate.use("hi");
      $.jStorage.set("language", "hi");
    } else {
      if ($.jStorage.get("language") == "en") {
        $translate.use("hi");
        $.jStorage.set("language", "hi");
      } else {
        $translate.use("en");
        $.jStorage.set("language", "en");
      }
    }
    //  $rootScope.$apply();
  };


})

;
