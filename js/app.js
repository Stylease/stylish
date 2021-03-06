// JavaScript Document
var firstapp = angular.module('firstapp', [
    'ui.router',
    'phonecatControllers',
    'templateservicemod',
    'navigationservice',
    'calenderService'
]);

firstapp.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    // for http request with session
    $httpProvider.defaults.withCredentials = true;
    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "views/template.html",
            controller: 'HomeCtrl'
        })
        .state('faqs', {
            url: "/faqs",
            templateUrl: "views/template.html",
            controller: 'FaqsCtrl'
        })
        .state('blog', {
            url: "/blog",
            template: "",
            controller: 'BlogRedirectCtrl'
        })
        .state('about-us', {
            url: "/about-us",
            templateUrl: "views/template.html",
            controller: 'AboutUsCtrl'
        })
        .state('profile', {
            url: "/profile",
            templateUrl: "views/template.html",
            controller: 'ProfileCtrl'
        })
        .state('privacy-policy', {
            url: "/privacy-policy",
            templateUrl: "views/template.html",
            controller: 'PrivacyPolicyCtrl'
        })
        .state('orders', {
            url: "/orders",
            templateUrl: "views/template.html",
            controller: 'OrdersCtrl'
        })
        .state('contact', {
            url: "/contact",
            templateUrl: "views/template.html",
            controller: 'ContactCtrl'
        })
        .state('orderdetail', {
            url: "/orderdetail/:id",
            templateUrl: "views/template.html",
            controller: 'OrderdetailCtrl'
        })
        .state('wishlist', {
            url: "/wishlist",
            templateUrl: "views/template.html",
            controller: 'WishlistCtrl'
        })
        .state('payment', {
            url: "/payment/:id",
            templateUrl: "views/template.html",
            controller: 'paymentCtrl'
        })
        .state('address', {
            url: "/address",
            templateUrl: "views/template.html",
            controller: 'AddressCtrl'
        })
        .state('saveaddress', {
            url: "/saveaddress",
            templateUrl: "views/template.html",
            controller: 'SaveaddressCtrl'
        })
        .state('bankdetail', {
            url: "/bankdetail",
            templateUrl: "views/template.html",
            controller: 'BankdetailCtrl'
        })
        .state('changepassword', {
            url: "/changepassword",
            templateUrl: "views/template.html",
            controller: 'ChangepasswordCtrl'
        })
        .state('cart', {
            url: "/cart",
            templateUrl: "views/template.html",
            controller: 'CartCtrl'
        })
        .state('terms-condition', {
            url: "/terms-condition",
            templateUrl: "views/template.html",
            controller: 'TermsConditionCtrl'
        })
        .state('return-policy', {
            url: "/return-policy",
            templateUrl: "views/template.html",
            controller: 'ReturnPolicyCtrl'
        })
        .state('cancellation-policy', {
            url: "/cancellation-policy",
            templateUrl: "views/template.html",
            controller: 'CancelationPolicyCtrl'
        })
        .state('product', {
            url: "/product/:name/:id",
            templateUrl: "views/template.html",
            controller: 'ProductCtrl'
        })
        // .state('product', {
        //     url: "/:categoryname/:subcategoryname/:id",
        //     templateUrl: "views/template.html",
        //     controller: 'CateogoryUrlCtrl'
        // })

    .state('productdetail', {
            url: "/pd/:subcatname/:id",
            templateUrl: "views/template.html",
            controller: 'ProductdetailCtrl'
        })
        // .state('productdetail', {
        //         url: "/productdetail/:id",
        //         templateUrl: "views/template.html",
        //         controller: 'ProductdetailCtrl'
        //     })
        .state('celebritychoice', {
            url: "/celebrities-choice",
            templateUrl: "views/template.html",
            controller: 'CelebrityChoiceCtrl'
        })
        .state('thankyou', {
            url: "/thankyou/:orderid",
            templateUrl: "views/template.html",
            controller: 'ThankyouCtrl'
        })
        .state('sorry', {
            url: "/sorry/:orderid",
            templateUrl: "views/template.html",
            controller: 'SorryCtrl'
        })
        .state('checkoutorder', {
            url: "/checkout-orderdetail",
            templateUrl: "views/template.html",
            controller: 'CheckoutOrderCtrl'
        })
        .state('checkoutlogin', {
            url: "/checkout-login",
            templateUrl: "views/template.html",
            controller: 'CheckoutLoginCtrl'
        })
        .state('checkoutsignin', {
            url: "/checkout-signin",
            templateUrl: "views/template.html",
            controller: 'CheckoutSigninCtrl'
        })
        .state('designers', {
            url: "/designers",
            templateUrl: "views/template.html",
            controller: 'DesignersCtrl'
        });
    //    .state('contactus', {
    //     url: "/contactus",
    //     templateUrl: "views/template.html",
    //     controller: 'ContactUsCtrl'
    // });
    $urlRouterProvider.otherwise("/");
    // $locationProvider.html5Mode(isproduction);
    $locationProvider.html5Mode(true);

});


// firstapp.directive('img', function($compile, $parse) {
//     return {
//         restrict: 'E',
//         replace: false,
//         link: function($scope, element, attrs) {
//             var $element = $(element);
//             if (!attrs.noloading) {
//                 $element.after("<img src='img/loading.gif' class='loading' />");
//                 var $loading = $element.next(".loading");
//                 $element.load(function() {
//                     $loading.remove();
//                     $(this).addClass("doneLoading");
//                 });
//             } else {
//                 $($element).addClass("doneLoading");
//             }
//         }
//     };
// });


firstapp.directive('img', function ($compile, $parse) {
    return {
        restrict: 'E',
        replace: false,
        link: function ($scope, element, attrs) {
            var $element = $(element);
            if (!attrs.noloading) {
                $element.after("<img src='img/loading.gif' class='loading' />");
                var $loading = $element.next(".loading");
                $element.load(function () {
                    $loading.remove();
                    $(this).addClass("doneLoading");
                });
            } else {
                $($element).addClass("doneLoading");
            }
        }
    };
});

firstapp.filter('currency', function () {
    return function (x) {
        if (x !== undefined) {
            // value = value.toString();
            //     var lastThree = value.substring(value.length - 3);
            // var otherNumbers = value.substring(0, value.length - 3);

            // if (otherNumbers !== '')
            //     lastThree = ',' + lastThree;
            // var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
            // // return "₹ " + res;

            // return res;

            x = x.toString();
            var afterPoint = '';
            if (x.indexOf('.') > 0)
                afterPoint = x.substring(x.indexOf('.'), x.length);
            x = Math.floor(x);
            x = x.toString();
            var lastThree = x.substring(x.length - 3);
            var otherNumbers = x.substring(0, x.length - 3);
            if (otherNumbers != '')
                lastThree = ',' + lastThree;
            var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
            return res;
        }
    };
});

firstapp.filter('serverimage', function () {
    return function (image) {
        if (image && image !== null) {

            return adminURL + "upload/readFile?file=" + image;
        } else {
            return undefined;
        }
    };
});
firstapp.directive('fancyboxBox', function ($document) {
    return {
        restrict: 'EA',
        replace: false,
        link: function (scope, element, attr) {
            var $element = $(element);
            var target;
            if (attr.rel) {
                target = $("[rel='" + attr.rel + "']");
            } else {
                target = element;
            }

            target.fancybox({
                width: 600,
                height: 400,
                openEffect: 'fade',
                closeEffect: 'fade',
                closeBtn: true,

                helpers: {
                    media: {}
                }
            });
        }
    };
});

firstapp.directive('onlynumber', function () {
    return event.charCode >= 48 && event.charCode <= 57;
});

// firstapp.config(function ($translateProvider) {
//   $translateProvider.translations('en', LanguageEnglish);
//   $translateProvider.translations('hi', LanguageHindi);
//   $translateProvider.preferredLanguage('en');
// });
firstapp.directive('aplhaOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                var transformedInput = text.replace(/[^a-zA-Z]/g, '');
                if (transformedInput !== text) {
                    ngModelCtrl.$setViewValue(transformedInput);
                    ngModelCtrl.$render();
                }
                return transformedInput;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});
firstapp.filter('shorten', function () {
    return function (value, limit) {
        if (value)
            if (value.length < limit) {
                return value;
            } else {
                return value.slice(0, limit - 2) + "..";

            }

    }
});
firstapp.directive('onlyDigits', function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attr, ctrl) {
            var digits;

            function inputValue(val) {
                if (val) {
                    if (attr.type == "tel") {
                        digits = val.replace(/[^0-9\+\\]/g, '');
                    } else {
                        digits = val.replace(/[^0-9\-\\]/g, '');
                    }


                    if (digits !== val) {
                        ctrl.$setViewValue(digits);
                        ctrl.$render();
                    }
                    return parseInt(digits, 10);
                }
                return undefined;
            }
            ctrl.$parsers.push(inputValue);
        }
    };
});
firstapp.directive('hideLogin', function ($document) {
    return {
        restrict: 'A',
        link: function (scope, elem, attr, ctrl) {
            elem.bind('click', function (e) {
                e.stopPropagation();
            });
            $document.bind('click', function () {
                scope.$apply(attr.hideLogin);
            })
        }
    }
});