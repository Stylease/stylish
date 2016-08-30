angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngAnimate', 'ngSanitize', 'angular-flexslider', 'ui-rangeSlider', 'infinite-scroll', 'angular.filter'])

.controller('HomeCtrl', function($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file

        console.log("Testing Consoles");

        $scope.template = TemplateService.changecontent("home");
        $scope.menutitle = NavigationService.makeactive("Home");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.footerColor = "home-footer";
        $scope.subcategory = [];

        $scope.mySlides = [
            'img/home-slider.jpg',
            'img/home-slider.jpg',
            'img/home-slider.jpg'
        ];
        var temp = [];
        NavigationService.getSubcategory(function(data) {
            console.log(data);
            _.each(data.data, function(key) {
                // body...
                if (key.imagetype == 'big') {
                    if (temp.length !== 0) {
                        temp = _.chunk(temp, 2);
                        $scope.subcategory.push(temp);
                        temp = [];
                    }
                    $scope.subcategory.push(key);
                } else if (key.imagetype == 'small') {
                    temp.push(key);
                }
            });

            if (temp.length !== 0) {
                temp = _.chunk(temp, 2);
                $scope.subcategory.push(temp);
                temp = [];
            }
            console.log($scope.subcategory);

        }, function(err) {

        });

        $scope.client = [{
            detail: "I can now wear a new outfit for every occasion, thanks to their super quick service, and access to a huge selection of outfits by some of my favourite designers!",
            name: "Riya shah"
        }, {
            detail: "I can now wear a new outfit for every occasion, thanks to their super quick service, and access to a huge selection of outfits by some of my favourite designers!",
            name: "Riya shah"
        }];
    })
    .controller('ProfileCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file

        $scope.template = TemplateService.changecontent("profile");
        $scope.menutitle = NavigationService.makeactive("Profile");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();


        $scope.logoutClick = function(){
          console.log("logout clicked");
          NavigationService.logout(function(data){
            if (data.value) {
              $scope.isLoggedIn = false;
              $state.go("home");
            }
          },function(err){

          })
        }

    })
    .controller('OrdersCtrl', function($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file

        $scope.template = TemplateService.changecontent("orders");
        $scope.menutitle = NavigationService.makeactive("Orders");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.oneAtATime = true;

    })
    .controller('TermsConditionCtrl', function($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file

        $scope.template = TemplateService.changecontent("terms-condition");
        $scope.menutitle = NavigationService.makeactive("Terms Condition");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.oneAtATime = true;

    })
    .controller('CancelationPolicyCtrl', function($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file

        $scope.template = TemplateService.changecontent("cancelation-policy");
        $scope.menutitle = NavigationService.makeactive("Cancelation Policy");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.oneAtATime = true;

    })
    .controller('PrivacyPolicyCtrl', function($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file

        $scope.template = TemplateService.changecontent("privacy-policy");
        $scope.menutitle = NavigationService.makeactive("Privacy Policy");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.oneAtATime = true;

    })
    .controller('ContactCtrl', function($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file

        $scope.template = TemplateService.changecontent("contact");
        $scope.menutitle = NavigationService.makeactive("Contact");
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
            });
        };
        $scope.remove = function() {
            $uibModal.open({
                animation: true,
                templateUrl: "views/modal/removeitem.html",
                controller: "CartCtrl"
            });
        };

    })
    .controller('ProductCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, $state) {
        //Used to name the .html file
        $scope.letIn = true;
        $scope.template = TemplateService.changecontent("product");
        $scope.menutitle = NavigationService.makeactive("Product");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.filter = {};
        $scope.filter.pagenumber = 1;
        $scope.checkIt = {};
        $scope.texts = {};
        $scope.texts.msg = "";
        $scope.filter.subcategory = [];
        $scope.filter.color = [];
        $scope.filter.size = '';
        $scope.filter.pricefrom = 0;
        $scope.filter.priceto = 100000;
        $scope.letLoad = false;
        $scope.shopping = [];
        $scope.getSubcategory = function() {
            NavigationService.getSubcategory(function(data) {
                $scope.subcategory = data.data;
                if ($state.params.name) {
                    $scope.filter.subcategory.push(_.find($scope.subcategory, function(key) {
                        return key.name == $state.params.name;
                    })._id);
                    $scope.checkIt[$state.params.name] = true;
                    $scope.filter.pagenumber = 1;
                    $scope.getMyProducts($scope.filter);
                }
            }, function(err) {

            });
        };
        $scope.getSubcategory();
        $scope.pushSubCategory = function(flag, id) {
            if (flag) {
                $scope.filter.subcategory.push(id);
            } else {
                $scope.filter.subcategory.splice(_.findIndex($scope.filter.subcategory, function(key) {
                    return key == id;
                }), 1);
            }
        };
        $scope.pushColor = function(flag, id) {
            if (flag) {
                $scope.filter.color.push(id);
            } else {
                $scope.filter.color.splice(_.findIndex($scope.filter.color, function(key) {
                    return key == id;
                }), 1);
            }
        };
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
                max: 100000
            }
        };

        // GET ALL PRODUCT BY CATEGORY NAME
        console.log($state.params);
        $scope.pages = [];
        var lastpage = 1;

        $scope.getMyProducts = function(filter) {
            console.log("in get products");
            if ($scope.letIn) {
                $scope.letIn = false;
                NavigationService.getProduct(filter, function(data) {
                    if (data.value) {
                        if (data.data.data.length === 0) {
                            $scope.texts.msg = "Product Not Found";
                        }
                        _.each(data.data.data, function(n) {
                            $scope.shopping.push(n);
                        });
                        lastpage = data.data.totalpages;
                      if(data.data.data.length !== 0){
                        $scope.$broadcast('scroll.infiniteScrollComplete');

                          ++$scope.filter.pagenumber;
                      }
                      $scope.letIn = true;
                      $scope.letLoad = true;
                      if(lastpage < $scope.filter.pagenumber){
                        $scope.letLoad = false;
                      }
                    }
                }, function(err) {

                });
            }
        };
        $scope.getColor = function() {
            NavigationService.getColor(function(data) {
                console.log("colors",data.data);
                $scope.color = data.data;
            }, function(err) {});
        };
        $scope.getColor();
        $scope.applyFilter = function() {
            // $.jStorage.set("filter",)
            $scope.filter.pagenumber = 1;
            $scope.shopping = [];
            $scope.getMyProducts($scope.filter);

        };
        $scope.resetFilter = function () {
          $scope.filter.subcategory = [];
          $scope.filter.color =  [];
          $scope.filter.size = '';
          $scope.filter.pricefrom = 0;
          $scope.filter.priceto = 100000;
          $scope.filter.pagenumber = 1;
          $scope.shopping = [];
          $scope.checkIt = _.map($scope.checkIt,function (key) {
            return false;
          });
          if ($state.params.name) {
              $scope.filter.subcategory.push(_.find($scope.subcategory, function(key) {
                  return key.name == $state.params.name;
              })._id);
              $scope.checkIt[$state.params.name] = true;
          }
          $scope.letLoad = false;
          $scope.getMyProducts($scope.filter);

        };
        $scope.loadMore = function() {
            if($scope.letLoad){
              $scope.getMyProducts($scope.filter);
            }
        };


    })
    .controller('ProductdetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("productdetail");
        $scope.menutitle = NavigationService.makeactive("Productdetail");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.oneAtATime = true;
        $scope.product = {};
        $scope.mainImage = "";

        //PRODUCT DETAIL ON SELECTED PRODUCT
        NavigationService.getProductDetail($state.params.id, function(data) {
            console.log(data);
            $scope.product = data.data.product;
            $scope.mainImage = data.data.product.images[0].image;
        }, function(err) {

        });

        $scope.selectImage = function(img) {
            $scope.mainImage = img;
        };
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
    .controller('CelebrityChoiceCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal) {
        //Used to name the .html file

        $scope.template = TemplateService.changecontent("celebrity-choice");
        $scope.menutitle = NavigationService.makeactive("CelebrityChoice");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.oneAtATime = true;


        $scope.addCelebrity = function(celebrity) {
            if (celebrity.heart == "fa-heart") {
                celebrity.heart = "fa-heart-o";
            } else {
                celebrity.heart = "fa-heart";
            }
            $uibModal.open({
                animation: true,
                templateUrl: "views/modal/added-wishlist.html",
                scope: $scope
            })
        };

        $scope.celebrityChoice = [{
            shopName: "Choker Kundan",
            celebrityName: "Sonam Kapoor",
            img: "img/celebrities.jpg",
            secImg: "img/celebrity-choice.jpg",
            designerName: "Anita Dongre",
            price: "4,500",
            heart: "fa-heart-o"
        }, {
            shopName: "Choker Kundan",
            celebrityName: "Sonam Kapoor",
            img: "img/celebrities.jpg",
            secImg: "img/celebrity-choice.jpg",
            designerName: "Anita Dongre",
            price: "4,500",
            heart: "fa-heart-o"
        }, {
            shopName: "Choker Kundan",
            celebrityName: "Sonam Kapoor",
            img: "img/celebrities.jpg",
            secImg: "img/celebrity-choice.jpg",
            designerName: "Anita Dongre",
            price: "4,500",
            heart: "fa-heart-o"
        }, {
            shopName: "Choker Kundan",
            celebrityName: "Sonam Kapoor",
            img: "img/celebrities.jpg",
            secImg: "img/celebrity-choice.jpg",
            designerName: "Anita Dongre",
            price: "4,500",
            heart: "fa-heart-o"
        }, {
            shopName: "Choker Kundan",
            celebrityName: "Sonam Kapoor",
            img: "img/celebrities.jpg",
            secImg: "img/celebrity-choice.jpg",
            designerName: "Anita Dongre",
            price: "4,500",
            heart: "fa-heart-o"
        }];
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

.controller('headerctrl', function($scope, TemplateService, $uibModal, NavigationService, $interval, $timeout, $state) {
    $scope.template = TemplateService;
    $scope.template.backClass = "";
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
      $scope.loginmsg.msg = "";
        $uibModal.open({
            animation: true,
            templateUrl: "views/modal/hello.html",
            scope: $scope
        });
    };
    $scope.signUp = function() {
      $scope.loginmsg.msg = "";
      $scope.closeAllModals()
        modal1 = $uibModal.open({
            animation: true,
            templateUrl: "views/modal/signup.html",
            scope: $scope
        });
        console.log(modal1);
    };
    $scope.logIn = function() {
      $scope.loginmsg.msg = "";
      $scope.closeAllModals()
        modal3 = $uibModal.open({
            animation: true,
            templateUrl: "views/modal/login.html",
            scope: $scope
        });
    };
    $scope.emailSignup = function() {
      $scope.loginmsg.msg = "";
      $scope.closeAllModals()
        modal2 = $uibModal.open({
            animation: true,
            templateUrl: "views/modal/email-signup.html",
            scope: $scope
        });
    };
    $scope.forgot = function() {
      $scope.loginmsg.msg = "";
      $scope.closeAllModals()
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
            $scope.template.backClass = "";
        } else {
            $scope.showMe = "menu-in";
            $scope.showCross = "cross-ham";
            $scope.template.backClass = "backdrop";
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

    // INTEGRATION CODE
    $scope.loginmsg = {};
    $scope.login = {};
    if (NavigationService.getStoredUser() == null) {
      $scope.isLoggedIn = false;

    }else {
      $scope.isLoggedIn = true;

    }
    $scope.signup = {};
    // SIGNUP
    $scope.signUpNormal = function(){
      $scope.loginmsg.msg = "";
      if ($scope.signup.password === $scope.signup.confirmpswd) {

      NavigationService.signUP($scope.signup, function(data){
        if (data.value) {
          $scope.closeAllModals();
          $scope.isLoggedIn = true;
          NavigationService.saveUser(data.data);
        }else {
          $scope.loginmsg.msg = data.error;
          $scope.loginmsg.class = "text-danger";
        }
      }, function(err){
        console.log(err);
      })
    }else {
      $scope.loginmsg.msg = "Password And Confirm Password Should be same";
      $scope.loginmsg.class = "text-danger";
    }
    }
    // NORMAL LOGIN
    $scope.userLogin = function(){
      $scope.loginmsg.msg = "";

      NavigationService.login($scope.login, function(data){
        if(data.value) {
          console.log("in if");
          $scope.closeAllModals();
          $scope.isLoggedIn = true;
          NavigationService.saveUser(data.data);
        }else {
          $scope.loginmsg.msg = "Try again Later";
          $scope.loginmsg.class = "text-danger";
        }
      },function(){

      })
    }
    //GOOGLE LOGIN
    var checktwitter = function(data, status) {
    var repdata = {};
    if (data.value) {
      $interval.cancel(stopinterval);
      ref.close();
      $scope.closeAllModals();
      $scope.isLoggedIn = true;
      NavigationService.saveUser(data.data);
    } else {

    }
  };

  var callAtIntervaltwitter = function() {
    NavigationService.getProfile(checktwitter, function(err) {
      console.log(err);
    });
  };
  var authenticatesuccess = function(data, status) {
    $ionicLoading.hide();
    if (data.value) {
      $scope.closeAllModals();
      $scope.isLoggedIn = true;
      NavigationService.saveUser(data.data);
    }
  };
  $scope.facebookLogin = function() {

      ref = window.open(adminURL + 'user/loginFacebook', '_blank', 'location=no');
    stopinterval = $interval(callAtIntervaltwitter, 2000);
    ref.addEventListener('exit', function(event) {
      NavigationService.getProfile(authenticatesuccess, function(err) {
        console.log(err);
      });
      $interval.cancel(stopinterval);
    });
  };

$scope.googleLogin = function() {
console.log("googlelogin");
    ref = window.open(adminURL + 'user/loginGoogle', '_blank', 'location=no');
  stopinterval = $interval(callAtIntervaltwitter, 2000);
  ref.addEventListener('exit', function(event) {
    NavigationService.getProfile(authenticatesuccess, function(err) {
      console.log(err);
    });
    $interval.cancel(stopinterval);
  });
};


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
