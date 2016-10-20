var globalfunction = {};
angular.module('phonecatControllers', ['templateservicemod', "calenderService", 'navigationservice', 'ui.bootstrap', 'ngAnimate', 'ngSanitize', 'angular-flexslider', 'ui-rangeSlider', 'infinite-scroll', 'angular.filter'])
    // .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    //     cfpLoadingBarProvider.includeSpinner = false;
    // }])

.controller('HomeCtrl', function ($scope, $uibModal, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("home");
        $scope.menutitle = NavigationService.makeactive("Home");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.removeLoaderOn(2);
        console.log($scope.navigation);
        $scope.footerColor = "home-footer";
        $scope.subcategory = [];

        $scope.hiw = function () {
            modal5 = $uibModal.open({
                animation: true,
                templateUrl: "views/modal/hiw.html",
                windowClass: "modal-dialog2",
                scope: $scope
            });
        };
        $scope.verified = function () {
            modal6 = $uibModal.open({
                animation: true,
                templateUrl: "views/modal/verified.html",
                scope: $scope
            });
        };

        NavigationService.getSlider(function (data) {
            if (data) {
                $scope.mySlides = data.data;
                // console.log("aaa", $scope.mySlides);
            }
            TemplateService.removeLoader();
        });

        var temp = [];
        NavigationService.getSubcategory(function (data) {
            console.log(data);
            _.each(data.data, function (key) {
                // body...
                // console.log("aaaaaa", key);
                if (key.imagetype == 'Big') {
                    // console.log("aaaa", key);
                    if (temp.length !== 0) {
                        temp = _.chunk(temp, 2);
                        $scope.subcategory.push(temp);
                        temp = [];
                    }
                    $scope.subcategory.push(key);
                } else if (key.imagetype == 'Small') {
                    temp.push(key);
                }

            });

            if (temp.length !== 0) {
                temp = _.chunk(temp, 2);
                $scope.subcategory.push(temp);
                temp = [];
            }
            console.log($scope.subcategory);

        }, function (err) {

        });

        NavigationService.getTestimonial(function (data) {
            if (data) {
                $scope.testimonials = data.data
            }
            TemplateService.removeLoader();
        });
    })
    .controller('AboutUsCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file

        $scope.template = TemplateService.changecontent("about-us");
        $scope.menutitle = NavigationService.makeactive("About Us");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.oneAtATime = true;

    })
    .controller('ProfileCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("profile");
        $scope.menutitle = NavigationService.makeactive("Profile");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.removeLoaderOn(1);

        $scope.download = [{
            name: "my profile",
            state: "profile()"

        }, {
            name: "my orders",
            state: "orders()"

        }, {
            name: "my wishlist",
            state: "wishlist()"

        }, {
            name: "saved addresses ",
            state: "saveaddress()"

        }, {
            name: "bank a/c details",
            state: "bankdetail()"

        }, {
            name: "change password",
            state: "changepassword()"

        }, {
            name: "logout",
            state: "log"

        }];

        $scope.logout = function () {
            globalfunction.logout();

        }
        $scope.setActive = function (menuItem) {
            $scope.activeMenu = menuItem;
        }
        $scope.setActive('my profile');

        $scope.set = {};
        $scope.getProfile = function () {
            NavigationService.getProfile(function (data) {
                if (data.value) {
                    $scope.userdata = data.data;
                }
                TemplateService.removeLoader();
            }, function (err) {
                console.log(err);
            });
        };
        $scope.getProfile();


        $scope.saveProfile = function () {
            $scope.set.Profile = false;
            console.log($scope.userdata);
            NavigationService.userProfileSave($scope.userdata, function (data) {
                $scope.setProfile = false;
            });
        };
        $scope.logoutClick = function () {
            console.log("logout as");
            NavigationService.logout(function (data) {
                if (data.value) {
                    console.log("logout");
                    // NavigationService.saveUser(null);

                    // $scope.isLoggedIn = false;
                    $state.go("home");
                }
            }, function (err) {

            });
        };

        $scope.goToReset = function () {
            $scope.getProfile();
        }

    })
    .controller('OrdersCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("orders");
        $scope.menutitle = NavigationService.makeactive("Orders");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.removeLoaderOn(1);
        $scope.oneAtATime = true;
        $scope.letIn = true;
        $scope.orders = [];
        $scope.filter = {};
        $scope.filter.pagenumber = 1;
        $scope.letLoad = false;

        $scope.getMyOrders = function (filter) {
            console.log("in get products");
            if ($scope.letIn) {
                $scope.letIn = false;
                NavigationService.getOrders(filter, function (data) {
                    console.log("dddddd", data);
                    if (data.value) {
                        if (data.data.data.length === 0) {
                            $scope.texts.msg = "Orders Not Found";
                        }
                        _.each(data.data.data, function (n) {
                            $scope.orders.push(n);
                        });
                        lastpage = data.data.totalpages;
                        if (data.data.data.length !== 0) {
                            $scope.$broadcast('scroll.infiniteScrollComplete');

                            ++$scope.filter.pagenumber;
                        }
                        $scope.letIn = true;
                        $scope.letLoad = true;
                        if (lastpage < $scope.filter.pagenumber) {
                            $scope.letLoad = false;
                        }
                    }
                    TemplateService.removeLoader();
                }, function (err) {

                });
            }
        };
        $scope.getMyOrders($scope.filter);
        $scope.loadMore = function () {
            if ($scope.letLoad) {
                $scope.getMyOrders($scope.filter);
            }
        };

        $scope.logoutClick = function () {
            NavigationService.logout(function (data) {
                if (data.value) {
                    $state.go("home");
                }
            }, function (err) {

            });
        };

        $scope.download = [{
            name: "my profile",
            state: "profile()"

        }, {
            name: "my orders",
            state: "orders()"

        }, {
            name: "my wishlist",
            state: "wishlist()"

        }, {
            name: "saved addresses ",
            state: "saveaddress()"

        }, {
            name: "bank a/c details",
            state: "bankdetail()"

        }, {
            name: "change password",
            state: "changepassword()"

        }, {
            name: "logout",
            state: "log"

        }];
        $scope.logout = function () {
            globalfunction.logout();

        }
        $scope.setActive = function (menuItem) {
            $scope.activeMenu = menuItem;
        }
        $scope.setActive('my orders');

    })
    .controller('TermsConditionCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file

        $scope.template = TemplateService.changecontent("terms-condition");
        $scope.menutitle = NavigationService.makeactive("Terms Condition");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.oneAtATime = true;

    })
    .controller('CancelationPolicyCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file

        $scope.template = TemplateService.changecontent("cancellation-policy");
        $scope.menutitle = NavigationService.makeactive("Cancellation Policy");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.oneAtATime = true;

    })
    .controller('ReturnPolicyCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file

        $scope.template = TemplateService.changecontent("return-policy");
        $scope.menutitle = NavigationService.makeactive("Return Policy");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.oneAtATime = true;

    })
    .controller('PrivacyPolicyCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file

        $scope.template = TemplateService.changecontent("privacy-policy");
        $scope.menutitle = NavigationService.makeactive("Privacy Policy");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.oneAtATime = true;

    })
    .controller('ContactCtrl', function ($scope, $state, TemplateService, NavigationService, $timeout, $uibModal) {
        //Used to name the .html file

        $scope.template = TemplateService.changecontent("contact");
        $scope.menutitle = NavigationService.makeactive("Contact");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.oneAtATime = true;
        $scope.formData = {};

        $scope.submitForm = function () {
            //console.log("contact", $scope.formData);
            NavigationService.saveContact($scope.formData, function (data) {
                //console.log("res data ", data);
                if (data.value) {
                    $scope.formData = '';
                    closeModal = $uibModal.open({
                        animation: true,
                        templateUrl: 'views/modal/thanks.html',
                    });
                    $timeout(function () {
                        closeModal.close();
                    }, 2000);
                } else {
                    console.log("Error while submiting form");
                }
            })
        };
    })
    .controller('OrderdetailCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams) {
        //Used to name the .html file

        $scope.template = TemplateService.changecontent("orderdetail");
        $scope.menutitle = NavigationService.makeactive("Orderdetail");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.removeLoaderOn(1);
        NavigationService.getOrderDetail($stateParams.id, function (data) {
            console.log("data", data);
            $scope.orderdetail = data.data;
            $scope.cartproduct = data.data.cartproduct;
        })
        TemplateService.removeLoader();
    })
    .controller('WishlistCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, $uibModal) {
        //Used to name the .html file

        $scope.template = TemplateService.changecontent("wishlist");
        $scope.menutitle = NavigationService.makeactive("Wishlist");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.removeLoaderOn(1);
        $scope.variables = {};
        $scope.download = [{
            name: "my profile",
            state: "profile()",
            id: 1

        }, {
            name: "my orders",
            state: "orders()",
            id: 2

        }, {
            name: "my wishlist",
            state: "wishlist()",
            id: 3

        }, {
            name: "saved addresses ",
            state: "saveaddress()",
            id: 4

        }, {
            name: "bank a/c details",
            state: "bankdetail()",
            id: 4

        }, {
            name: "change password",
            state: "changepassword()",
            id: 5

        }, {
            name: "logout",
            state: "log",
            id: 6

        }];


        $(".visible-xs").flexslider({
            startAt: '4'
        });


        $scope.logout = function () {
            globalfunction.logout();

        }
        $scope.setActive = function (menuItem) {
            $scope.activeMenu = menuItem;
            // $scope.colour = "color: black";
        }
        $scope.setActive('my wishlist');

        function getWishlist() {
            NavigationService.getWishlistUser(function (data) {
                if (data.value == false) {
                    $scope.wishlist = "";
                } else {
                    $scope.wishlist = data.data.data;
                }
                TemplateService.removeLoader();
            });
        }
        getWishlist();

        $scope.deleteWishlist = function (id) {
            NavigationService.deleteWishlist(id, function (data) {
                $scope.response = data;
                if ($scope.response.value === true) {
                    // removemod.close();
                    // getWishlist();
                }
            });
        };
        $scope.remove = function () {
            NavigationService.deleteWishlist($scope.variables.removeitem, function (data) {
                $scope.response = data;
                if ($scope.response.value === true) {
                    removemod.close();
                    getWishlist();
                }
            });
        };
        $scope.openRemoveModal = function (productid) {
            $scope.variables.removeitem = productid;
            console.log($scope.variables);
            removemod = $uibModal.open({
                animation: true,
                templateUrl: "views/modal/removeitem.html",
                scope: $scope
            });
        };
        $scope.logoutClick = function () {
            NavigationService.logout(function (data) {
                if (data.value) {
                    $state.go("home");
                }
            }, function (err) {

            });
        };


    })
    .controller('AddressCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file

        $scope.template = TemplateService.changecontent("address");
        $scope.menutitle = NavigationService.makeactive("Address");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.removeLoaderOn(1);
        $scope.flags = {};
        $scope.flags.sameshipping = false;
        $scope.userdata = {};
        $scope.emailRegex = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
        if ($.jStorage.get("userLoggedIn")) {
            $scope.isLoggedIn = true;
        }
        $scope.getUserAddress = function () {
            NavigationService.getProfile(function (data) {
                if (data.value) {
                    $scope.userdata = data.data;
                    $scope.userdata.billingcopy = data.data.billingAddress;
                    $scope.userdata.shippingcopy = data.data.shippingAddress;
                    $scope.billingAddress = _.cloneDeep(_.find($scope.userdata.billingAddress, {
                        isDefault: true
                    }));
                    $scope.shippingAddress = _.cloneDeep(_.find($scope.userdata.shippingAddress, {
                        isDefault: true
                    }));
                    if ($scope.billingAddress) {
                        $scope.userdata.billingAddress = $scope.billingAddress;
                    } else {
                        if ($scope.userdata.billingAddress.length > 0) {
                            $scope.userdata.billingAddress = _.cloneDeep($scope.userdata.billingAddress[0]);
                        } else {
                            $scope.userdata.billingAddress = {};
                        }
                    }
                    $scope.userdata.billingaddcopy = _.cloneDeep($scope.userdata.billingAddress);
                    if ($scope.shippingAddress) {
                        $scope.userdata.shippingAddress = $scope.shippingAddress;
                    } else {
                        if ($scope.userdata.shippingAddress.length > 0) {
                            $scope.userdata.shippingAddress = _.cloneDeep($scope.userdata.shippingAddress[0]);
                        } else {
                            $scope.userdata.shippingAddress = {};
                        }
                    }
                    $scope.userdata.shippingaddcopy = _.cloneDeep($scope.userdata.shippingAddress);
                    $scope.userdata.shippingAddress.shippingAddressCity = "Mumbai";
                    $scope.userdata.shippingAddress.shippingAddressState = "Maharashtra";
                    $scope.userdata.shippingAddress.shippingAddressCountry = "India";
                    $scope.userdata.billingAddress.billingAddressCity = "Mumbai";
                    $scope.userdata.billingAddress.billingAddressState = "Maharashtra";
                    $scope.userdata.billingAddress.billingAddressCountry = "India";
                } else {
                    if ($.jStorage.get("userData")) {
                        $scope.userdata = $.jStorage.get("userData");
                    } else {
                        $scope.userdata.shippingAddress = {};
                        $scope.userdata.shippingAddress.shippingAddressCity = "Mumbai";
                        $scope.userdata.shippingAddress.shippingAddressState = "Maharashtra";
                        $scope.userdata.shippingAddress.shippingAddressCountry = "India";
                        $scope.userdata.billingAddress = {};
                        $scope.userdata.billingAddress.billingAddressCity = "Mumbai";
                        $scope.userdata.billingAddress.billingAddressState = "Maharashtra";
                        $scope.userdata.billingAddress.billingAddressCountry = "India";
                    }
                }
                TemplateService.removeLoader();
            }, function (err) {});
        };
        $scope.getUserAddress();
        $scope.sameShipping = function () {
            if ($scope.flags.sameshipping) {
                $scope.userdata.shippingAddress = {};
                $scope.userdata.shippingAddress.shippingAddressFlat = $scope.userdata.billingAddress.billingAddressFlat;
                $scope.userdata.shippingAddress.shippingAddressStreet = $scope.userdata.billingAddress.billingAddressStreet;
                $scope.userdata.shippingAddress.shippingAddressLandmark = $scope.userdata.billingAddress.billingAddressLandmark;
                $scope.userdata.shippingAddress.shippingAddressPin = $scope.userdata.billingAddress.billingAddressPin;
                $scope.userdata.shippingAddress.shippingAddressCity = $scope.userdata.billingAddress.billingAddressCity;
                $scope.userdata.shippingAddress.shippingAddressState = $scope.userdata.billingAddress.billingAddressState;
                $scope.userdata.shippingAddress.shippingAddressCountry = $scope.userdata.billingAddress.billingAddressCountry;
            }
        };
        $scope.shippingCheck = function (check) {
            if (check) {
                $scope.shipAtSame = true;
                $scope.sameShipping($scope.userdata.shippingAddress);
            } else {
                $scope.shipAtSame = false;
                $scope.userdata.shippingAddress.shippingAddressFlat = "";
                $scope.userdata.shippingAddress.shippingAddressStreet = "";
                $scope.userdata.shippingAddress.shippingAddressLandmark = "";
                $scope.userdata.shippingAddress.shippingAddressPin = "";
                // $scope.userdata.shippingAddress.shippingAddressCity = "";
                // $scope.userdata.shippingAddress.shippingAddressState = "";
                // $scope.userdata.shippingAddress.shippingAddressCountry = "";
            }
        };

        $scope.invalid = false;
        $scope.saveUserAddress = function (addressdata, formcheckout) {
            if (formcheckout.$invalid) {
                $scope.invalid = true;
            } else {
                if ($.jStorage.get("userLoggedIn")) {
                    console.log('aaaa', $scope.userdata.billingaddcopy, addressdata.billingAddress);
                    if (_.isEqual($scope.userdata.billingaddcopy, addressdata.billingAddress)) {
                        console.log("equal");
                        $scope.userdata.billingAddress = $scope.userdata.billingcopy;
                    } else {
                        console.log("not e");
                        $scope.userdata.billingcopy.push(addressdata.billingAddress);
                        $scope.userdata.billingAddress = $scope.userdata.billingcopy;
                    }
                    if (_.isEqual($scope.userdata.shippingaddcopy, addressdata.shippingAddress)) {
                        $scope.userdata.shippingAddress = $scope.userdata.shippingcopy;
                    } else {
                        $scope.userdata.shippingcopy.push(addressdata.shippingAddress);
                        $scope.userdata.shippingAddress = $scope.userdata.shippingcopy;
                    }
                    NavigationService.userProfileSave($scope.userdata, function (data) {
                        console.log("done");
                        if (data.value) {
                            $state.go("checkoutorder");
                        }
                    });

                } else {
                    $.jStorage.set("userData", addressdata)
                    $state.go("checkoutorder");
                }
            }

        };



    })
    .controller('SaveaddressCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal, $state) {
        //Used to name the .html file

        $scope.template = TemplateService.changecontent("saveaddress");
        $scope.menutitle = NavigationService.makeactive("Saveaddress");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.removeLoaderOn(1);
        $scope.modelDelete = {};

        $scope.download = [{
            name: "my profile",
            state: "profile()"

        }, {
            name: "my orders",
            state: "orders()"

        }, {
            name: "my wishlist",
            state: "wishlist()"

        }, {
            name: "saved addresses ",
            state: "saveaddress()"

        }, {
            name: "bank a/c details",
            state: "bankdetail()"

        }, {
            name: "change password",
            state: "changepassword()"

        }, {
            name: "logout",
            state: "log"

        }];
        $scope.setActive = function (menuItem) {
            $scope.activeMenu = menuItem;
        }
        $scope.setActive('saved addresses ');
        $scope.logout = function () {
            globalfunction.logout();

        }
        $scope.remove = function () {
            _.pull($scope.modelDelete.collection, $scope.modelDelete.obj);
            $scope.saveProfile();
            removemod.close();
        };
        $scope.showDelete = function (data, val) {
            var collection;
            var name;
            if (val) {
                collection = $scope.userdata.shippingAddress;
                name = data.shippingTitle;
            } else {
                collection = $scope.userdata.billingAddress;
                name = data.billingTitle;
            }
            $scope.modelDelete = {
                collection: collection,
                obj: data,
                name: name
            };
            removemod = $uibModal.open({
                animation: true,
                templateUrl: "views/modal/removeitem.html",
                scope: $scope
            });
        };
        // $scope.shippingCheck = function(check) {
        //     if (check) {
        //         $scope.shipAtSame = true;
        //         $scope.sameShipping($scope.userdata.billingAddress);
        //     } else {
        //         $scope.shipAtSame = false;
        //         userdata.billingAddress.billingAddressFlat = "";
        //         userdata.billingAddress.billingAddressStreet = "";
        //         userdata.billingAddress.billingAddressLandmark = "";
        //         userdata.billingAddress.billingAddressPin = "";
        //         userdata.billingAddress.billingAddressCity = "";
        //         userdata.billingAddress.billingAddressState = "";
        //         userdata.billingAddress.billingAddressCountry = "";
        //     }
        // };

        $scope.getProfile = function () {
            NavigationService.getProfile(function (data) {
                if (data.value) {
                    $scope.userdata = data.data;
                    console.log("aaaaa", $scope.userdata.billingAddress);
                    if (!$scope.userdata.billingAddress) {
                        $scope.userdata.billingAddress = [];
                    }
                    if (!$scope.userdata.shippingAddress) {
                        $scope.userdata.shippingAddress = [];
                    }
                }
                TemplateService.removeLoader();
            }, function (err) {});
        };
        $scope.showEdit = function (data) {
            data.edit = true;
        };
        $scope.changeDefault = function (data, val) {
            var collection;
            if (val) {
                collection = $scope.userdata.shippingAddress;
            } else {
                collection = $scope.userdata.billingAddress;
            }
            if (data.isDefault) {
                _.each(collection, function (n) {
                    if (data !== n) {
                        n.isDefault = false;
                    }
                });
            }
            $scope.saveProfile();
        };
        if (true) {

        }

        $scope.addAddress = function (val) {
            console.log("val", val);
            var collection;
            if (val) {
                collection = $scope.userdata.shippingAddress;
                collection.push({
                    edit: true,
                    shippingAddressCity: "Mumbai",
                    shippingAddressState: "Maharashtra",
                    shippingAddressCountry: "India"
                });
            } else {
                collection = $scope.userdata.billingAddress;
                collection.push({
                    edit: true,
                    billingAddressCity: "Mumbai",
                    billingAddressState: "Maharashtra",
                    billingAddressCountry: "India"
                });
            }

        };
        $scope.getProfile();
        $scope.data = {};
        $scope.saveProfile = function (data) {
            console.log("data", data);
            if (Object.keys($scope.data).length != 0 && data.isShipping) {
                console.log("data", data);
                data.shippingTitle = data.billingTitle;
                data.shippingAddressFlat = data.billingAddressFlat;
                data.shippingAddressStreet = data.billingAddressStreet;
                data.shippingAddressLandmark = data.billingAddressLandmark;
                data.shippingAddressPin = data.billingAddressPin;
                data.shippingAddressCity = data.billingAddressCity;
                data.shippingAddressState = data.billingAddressState;
                data.shippingAddressCountry = data.billingAddressCountry;
                $scope.userdata.shippingAddress.push(data);
            }
            _.each($scope.userdata.billingAddress, function (n) {
                n.edit = false;
            });
            _.each($scope.userdata.shippingAddress, function (n) {
                n.edit = false;
            });
            NavigationService.userProfileSave($scope.userdata, function (data) {
                console.log("data", data);
                $scope.getProfile();

            });
        };

        $scope.logoutClick = function () {
            NavigationService.logout(function (data) {
                if (data.value) {
                    $state.go("home");
                }
            }, function (err) {

            });
        };

    })
    .controller('BankdetailCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file

        $scope.template = TemplateService.changecontent("bankdetail");
        $scope.menutitle = NavigationService.makeactive("Bankdetail");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.removeLoader(1);
        $scope.set = {};

        $scope.download = [{
            name: "my profile",
            state: "profile()"

        }, {
            name: "my orders",
            state: "orders()"

        }, {
            name: "my wishlist",
            state: "wishlist()"

        }, {
            name: "saved addresses ",
            state: "saveaddress()"

        }, {
            name: "bank a/c details",
            state: "bankdetail()"

        }, {
            name: "change password",
            state: "changepassword()"

        }, {
            name: "logout",
            state: "log"

        }];
        $scope.setActive = function (menuItem) {
            $scope.activeMenu = menuItem;
        }
        $scope.setActive('bank a/c details');
        $scope.logout = function () {
            globalfunction.logout();

        }


        $scope.getProfile = function () {
            NavigationService.getProfile(function (data) {
                if (data.value) {
                    $scope.userdata = data.data;
                }
                TemplateService.removeLoader();
            }, function (err) {
                console.log(err);
            });
        };
        $scope.getProfile();

        $scope.goToReset = function () {
            $scope.getProfile();
        }

        $scope.saveProfile = function () {
            $scope.set.Profile = false;
            console.log($scope.userdata);
            NavigationService.userProfileSave($scope.userdata, function (data) {
                $scope.setProfile = false;
            });
        };

        $scope.logoutClick = function () {
            NavigationService.logout(function (data) {
                if (data.value) {
                    $state.go("home");
                }
            }, function (err) {

            });
        };

    })
    .controller('CheckoutSigninCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file

        $scope.template = TemplateService.changecontent("checkout-signin");
        $scope.menutitle = NavigationService.makeactive("CheckoutSignin");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.goToAddress = function () {
            $state.go('address');
        }


        $scope.facebookLogin = function () {
            ProductC
            ref = window.open(adminURL + 'user/loginFacebook', '_blank', 'location=no');
            stopinterval = $interval(callAtIntervaltwitter, 2000);
            ref.addEventListener('exit', function (event) {
                NavigationService.getProfile(authenticatesuccess, function (err) {
                    console.log(err);
                });
                $interval.cancel(stopinterval);
            });
        };
        $scope.googleLogin = function () {
            console.log("googlelogin");
            ref = window.open(adminURL + 'user/loginGoogle', '_blank', 'location=no');
            stopinterval = $interval(callAtIntervaltwitter, 2000);
            ref.addEventListener('exit', function (event) {
                NavigationService.getProfile(authenticatesuccess, function (err) {
                    console.log(err);
                });
                $interval.cancel(stopinterval);
            });
        };

        $scope.signUp = function () {
            globalfunction.emailSignup();
        }
    })
    .controller('CheckoutLoginCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("checkout-login");
        $scope.menutitle = NavigationService.makeactive("CheckoutLogin");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.forgot = function () {
            $uibModal.open({
                animation: true,
                templateUrl: "views/modal/forgotpassword.html",
                controller: "CheckoutLoginCtrl"
            });
        };
        $scope.loginmsg = {};
        $scope.login = {};
        $scope.userLogin = function () {
            $scope.loginmsg.msg = "";
            NavigationService.login($scope.login, function (data) {
                console.log(data);
                if (data.value == true) {
                    // $scope.closeAllModals();
                    $scope.isLoggedIn = true;
                    // console.log($scope.isLoggedIn, 'dsfdsfa');
                    NavigationService.saveUser(data.data);
                    $state.go('address');
                } else {
                    $scope.loginmsg.msg = "Try again Later";
                    $scope.loginmsg.class = "text-danger";
                }
            }, function () {

            });
        };
    })
    .controller('CheckoutOrderCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("checkout-orderdetail");
        $scope.menutitle = NavigationService.makeactive("Checkoutorder");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.removeLoaderOn(2);
        $scope.getProfile = function () {
            NavigationService.getProfile(function (data) {
                if (data.value) {
                    $scope.userdata = data.data;
                    $scope.billingAddress = _.find($scope.userdata.billingAddress, {
                        isDefault: true
                    });
                    $scope.shippingAddress = _.find($scope.userdata.shippingAddress, {
                        isDefault: true
                    });
                    if ($scope.billingAddress) {
                        $scope.userdata.billingAddress = $scope.billingAddress;
                    } else {
                        if ($scope.userdata.billingAddress.length > 0) {
                            $scope.userdata.billingAddress = $scope.userdata.billingAddress[0];
                        } else {
                            $scope.userdata.billingAddress = $scope.userdata.billingAddress;
                        }
                    }
                    if ($scope.shippingAddress) {
                        $scope.userdata.shippingAddress = $scope.shippingAddress;
                    } else {
                        if ($scope.userdata.shippingAddress.length > 0) {
                            $scope.userdata.shippingAddress = $scope.userdata.shippingAddress[0];
                        } else {
                            $scope.userdata.shippingAddress = $scope.userdata.shippingAddress;
                        }
                    }
                } else {
                    console.log("inn off");
                    $scope.userdata = $.jStorage.get("userData");
                }
                TemplateService.removeLoader();
            }, function (err) {});
        };
        $scope.getProfile();
        $scope.getCart = function () {
            NavigationService.getcart(function (data) {
                if (data.value) {
                    $scope.totalrentalamount = 0;
                    $scope.totalsecuritydeposit = 0;
                    $scope.cartDetails = data.data.cartcount;
                    $scope.cartProduct = data.data.cartproduct;
                    console.log("cartDetails", $scope.cartDetails);
                    _.each($scope.cartProduct, function (n) {
                        if (n.duration == 4) {
                            $scope.totalrentalamount = $scope.totalrentalamount + parseInt(n.product.fourdayrentalamount);
                            $scope.totalsecuritydeposit = $scope.totalsecuritydeposit + parseInt(n.product.fourdaysecuritydeposit);
                        } else {
                            $scope.totalrentalamount = $scope.totalrentalamount + parseInt(n.product.eightdayrentalamount);
                            $scope.totalsecuritydeposit = $scope.totalsecuritydeposit + parseInt(n.product.eightdaysecuritydeposit);
                        }

                    });
                    $scope.servicetax = parseFloat($scope.totalrentalamount) * 0.15;
                    $scope.grandtotal = parseFloat($scope.totalrentalamount) + parseFloat($scope.servicetax) + parseFloat($scope.totalsecuritydeposit);
                } else {
                    $scope.cartProduct = [];
                    $scope.cartDetails = 0;
                }
                TemplateService.removeLoader();
            }, function (err) {
                console.log(err);
            });
        };
        $scope.getCart();

        $scope.placeOrder = function () {
            // console.log("placeorder", $scope.cartProduct, $scope.userdata);
            var placeorderuser = $scope.userdata;
            _.each($scope.userdata.shippingAddress, function (data, property) {
                placeorderuser[property] = data;
            });
            _.each($scope.userdata.billingAddress, function (data, property) {
                placeorderuser[property] = data;
            });
            placeorderuser.servicetax = $scope.servicetax;
            placeorderuser.total = $scope.grandtotal;
            placeorderuser.refundabledeposit = $scope.totalsecuritydeposit;
            placeorderuser.subtotal = $scope.totalrentalamount;
            placeorder = placeorderuser;
            placeorder.cartproduct = $scope.cartProduct;
            NavigationService.getProfile(function (data) {
                    if (data.value) {
                        delete placeorder.wishlist;
                        delete placeorder.billingAddress;
                        delete placeorder.shippingAddress;
                        delete placeorder.userid;
                        delete placeorder._id;

                        NavigationService.placeOrder(placeorder, function (data) {
                            if (data) {
                                $.jStorage.set("cartDate", "");
                                console.log("data", data.data.orderid);
                                $scope.orderid = data.data.orderid;
                                $scope.formdata = data.data;
                                window.location.href = (adminURL + "payu/payU?_id=" + data.data._id);
                                // NavigationService.goToPayment(data.data._id, function (data) {
                                //     console.log("payment ja done");
                                // });
                                // NavigationService.emptyCart(function (response) {
                                //     if (response) {
                                //         $state.go('thankyou', {
                                //             orderid: $scope.orderid
                                //         });
                                //     } else {
                                //         $state.go("sorry");
                                //     }
                                // });
                            } else {
                                $state.go("sorry");
                            }
                        });
                    } else {
                        NavigationService.placeOrder(placeorder, function (data) {
                            if (data) {
                                $.jStorage.set("cartDate", "");
                                console.log("data", data.data.orderid);
                                $scope.orderid = data.data.orderid;
                                // console.log("IN FORM DATA");
                                // $scope.formdata = data.data;
                                // console.log($scope.formdata);
                                // $state.go('payment', {
                                //     'id': data.data._id
                                // });
                                // NavigationService.emptyCart(function (response) {
                                //     if (response) {
                                //         $state.go('thankyou', {
                                //             orderid: $scope.orderid
                                //         });
                                //     } else {
                                //         $state.go("sorry");
                                //     }
                                // });
                            } else {
                                $state.go("sorry");
                            }
                        });
                    }

                },
                function (err) {
                    console.log(err);
                });


        };
    })
    .controller('paymentCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $http) {
        //Used to name the .html file
        console.log(window.location.origin + "/payment.php");
        NavigationService.getOrderDetail($stateParams.id, function (data, status) {
            console.log(data);
            $scope.toPaymentGateway = data.data;
            $scope.toPaymentGateway.productinfo = "Stylease Product";
            // $scope.payvalue = {};
            // $scope.payvalue.email = $scope.toPaymentGateway.email;
            // $scope.payvalue.txnid = $scope.toPaymentGateway.orderid;
            // $scope.payvalue.key = '3gqoHz';
            // $scope.payvalue.amount = $scope.toPaymentGateway.total;
            // $scope.payvalue.firstname = $scope.toPaymentGateway.firstname;
            // $scope.payvalue.phone = $scope.toPaymentGateway.mobile;
            // $scope.payvalue.productinfo = $scope.toPaymentGateway.productinfo;
            // $scope.payvalue.surl = 'http://google.com';
            // $scope.payvalue.furl = 'https://in.yahoo.com/';


            // console.log($scope.payvalue);
            // NavigationService.toPaymentGateway($scope.payvalue, function (data) {
            //     console.log(data);
            // });
            // var request = $http({
            //     method: "post",
            //     url: window.location.origin + "/payment.php",
            //     data: {
            //         email: $scope.toPaymentGateway.email,
            //         txnid: $scope.toPaymentGateway.orderid,
            //         key: '3gqoHz',
            //         amount: $scope.toPaymentGateway.total,
            //         firstname: $scope.toPaymentGateway.firstname,
            //         phone: $scope.toPaymentGateway.mobile,
            //         productinfo: $scope.toPaymentGateway.productinfo,
            //         surl: 'http://google.com',
            //         furl: 'https://in.yahoo.com/'
            //     },
            //     headers: {
            //         'Content-Type': 'application/x-www-form-urlencoded'
            //     }
            // });
            // $("form[name='payuForm']").submit();
        });
        $scope.template = TemplateService.changecontent("payment");
        $scope.menutitle = NavigationService.makeactive("payment");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.oneAtATime = true;

    })
    .controller('ChangepasswordCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal, $state) {
        //Used to name the .html file


        $scope.template = TemplateService.changecontent("changepassword");
        $scope.menutitle = NavigationService.makeactive("Changepassword");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.form = {};
        $scope.passChanged = false;
        $scope.invalidPass = false;

        $scope.download = [{
            name: "my profile",
            state: "profile()"

        }, {
            name: "my orders",
            state: "orders()"

        }, {
            name: "my wishlist",
            state: "wishlist()"

        }, {
            name: "saved addresses ",
            state: "saveaddress()"

        }, {
            name: "bank a/c details",
            state: "bankdetail()"

        }, {
            name: "change password",
            state: "changepassword()"

        }, {
            name: "logout",
            state: "log"

        }];
        $scope.setActive = function (menuItem) {
            $scope.activeMenu = menuItem;
        }
        $scope.setActive('change password');
        $scope.logout = function () {
            globalfunction.logout();

        }


        $scope.changePassword = function (form) {
            NavigationService.changePassword(form, function (data) {
                console.log("data", data);
                if (data.value === true) {
                    $scope.passChanged = true;
                    $uibModal.open({
                        animation: true,
                        templateUrl: 'views/modal/passwordchange.html',
                    });
                    $scope.invalidPass = false;
                    $timeout(function () {
                        $scope.passChanged = false;
                        $scope.invalidPass = false;
                        $scope.form = {};
                    }, 2000);
                } else if (data.value === false) {
                    console.log("data", data);
                    $scope.invalidPass = true;
                }
            });

        };

        $scope.logoutClick = function () {
            NavigationService.logout(function (data) {
                if (data.value) {
                    $state.go("home");
                }
            }, function (err) {

            });
        };

    })
    .controller('CartCtrl', function ($scope, CalenderService, TemplateService, NavigationService, $timeout, $uibModal, $state) {
        //Used to name the .html file

        $scope.template = TemplateService.changecontent("cart");
        $scope.menutitle = NavigationService.makeactive("Cart");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.removeLoaderOn(1);
        TemplateService.removeLoader();
        $scope.variables = {};
        $scope.totalrentalamount = 0;
        $scope.totalsecuritydeposit = 0;
        $scope.variables.editCart = [];
        $scope.cartProduct = [];
        $scope.isLoggedIn = false;
        $scope.date = function () {
            $uibModal.open({
                animation: true,
                templateUrl: "views/modal/changedate.html",
                controller: "CartCtrl"
            });
        };
        $scope.remove = function () {
            console.log("Yes I do");
            NavigationService.removeFromCart($scope.variables.removeitem, function (data) {
                $scope.response = data;
                if ($scope.response.value === true) {
                    removemod.close();
                    $scope.getCart();
                    globalfunction.getCartCount();
                }
            });
        };
        $scope.gotocheckout = function () {
            if ($scope.totalrentalamount >= 8000) {
                if ($.jStorage.get("userLoggedIn")) {
                    $state.go('address');
                } else {
                    $state.go('checkoutsignin');
                }
            } else {
                removemod = $uibModal.open({
                    animation: true,
                    templateUrl: "views/modal/minimumorder.html",
                    scope: $scope
                });
            }


            // if ($.jStorage.get("userLoggedIn")) {
            //     $state.go('address');
            // } else {
            //     $state.go('checkoutsignin');
            // }


            // NavigationService.getcart(function(data) {
            //     if (data.value) {
            //         $scope.cartDetails = data.data.cartcount;
            //
            //     }
            // }, function(err) {
            //     console.log(err);
            // });

        };
        $scope.editCartProduct = function (id) {
            $scope.variables.editCart = _.map($scope.variables.editCart, function (key) {
                return false;
            });
            $scope.variables.editCart[id] = true;
            NavigationService.getOneProduct(id, function (response) {
                if (response.value) {
                    $scope.product = response.data;
                    $scope.sizes = response.data.size
                    $scope.editable = _.find($scope.cartProduct, function (key) {
                        return key.product._id == id;
                    });
                    CalenderService.duration = $scope.editable.duration;
                    // $scope.getCalenderDays();
                }
            }, function (err) {
                console.log(err);
            });
        };
        $scope.closeEdit = function (id) {
            $scope.variables.editCart = _.map($scope.variables.editCart, function (key) {
                return false;
            });
            $scope.getCart();

        };

        $scope.editCart = function (data) {
            $scope.editcartpro = {};
            $scope.editcartpro.product = data.product._id;
            var d = new Date(data.timeFrom);
            $scope.editcartpro.timeFrom = d;
            $scope.editcartpro.duration = data.duration;
            $scope.editcartpro.size = data.size;
            $scope.editcartpro.deliveryTime = data.deliveryTime;
            $scope.editcartpro.pickupTime = data.pickupTime;
            var timeTo = new Date();
            $scope.editcartpro.timeTo = new Date(timeTo.setDate(d.getDate() + ($scope.editcartpro.duration - 1)));
            $scope.editcartpro.by = data.by;

            NavigationService.editAllCart($scope.editcartpro, function (data) {
                console.log("$scope.editcartpro", $scope.editcartpro);
                $scope.response = data;
                if ($scope.response.value == true) {
                    if ($scope.cartProduct.length != 1) {
                        cartdate.close();
                    }
                    $scope.cartDate = $.jStorage.set("cartDate", $scope.editcartpro);
                    console.log("$scope.cartDate", $scope.cartDate);
                    $scope.getCart();
                    $scope.closeEdit($scope.editcartpro.product);
                }
            }, function (err) {
                console.log(err);
            });
        };

        $scope.changeCartDate = function (data) {
            $scope.editProduct = data;

            if ($scope.cartProduct.length == 1) {
                $scope.editCart(data);
            } else {
                $scope.openDateModal = function (data) {
                    cartdate = $uibModal.open({
                        animation: true,
                        templateUrl: "views/modal/changedate.html",
                        scope: $scope
                    });
                };
                $scope.openDateModal(data);
            }
        };

        $scope.openRemoveModal = function (productid) {
            $scope.variables.removeitem = productid;
            removemod = $uibModal.open({
                animation: true,
                templateUrl: "views/modal/removeitem.html",
                windowClass: "modal-dialog",
                scope: $scope
            });
        };
        $scope.getCart = function () {
            NavigationService.getcart(function (data) {
                if (data.value) {
                    $scope.totalrentalamount = 0;
                    $scope.totalsecuritydeposit = 0;
                    $scope.cartDetails = data.data.cartcount;
                    $scope.cartProduct = data.data.cartproduct;
                    _.each($scope.cartProduct, function (n) {
                        console.log(n);
                        n.timeFrom = moment(n.timeFrom).toDate();
                        CalenderService.selectedDate = n.timeFrom;

                    });

                    NavigationService.getProductTimes(function (data) {
                        if (data.value === true) {
                            console.log(data.data);
                            CalenderService.blockedDates = data.data;
                        }
                    }, function () {

                    });

                    CalenderService.duration = $scope.cartProduct[0].duration;
                    _.each($scope.cartProduct, function (n) {
                        if (n.duration == 4) {
                            $scope.totalrentalamount = $scope.totalrentalamount + parseInt(n.product.fourdayrentalamount);
                            $scope.totalsecuritydeposit = $scope.totalsecuritydeposit + parseInt(n.product.fourdaysecuritydeposit);

                        } else {
                            $scope.totalrentalamount = $scope.totalrentalamount + parseInt(n.product.eightdayrentalamount);
                            $scope.totalsecuritydeposit = $scope.totalsecuritydeposit + parseInt(n.product.eightdaysecuritydeposit);

                        }

                    });

                } else {
                    $scope.cartProduct = [];
                    $scope.cartDetails = 0;
                }
                TemplateService.removeLoader();
                console.log("get cart", $scope.cartProduct.length);
                if ($scope.cartProduct.length === 0) {
                    $.jStorage.set("cartDate", "");
                }
            }, function (err) {
                console.log(err);
            });
        };
        $scope.getCart();


        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        //calendar
        $scope.dateOptions = {
            customClass: CalenderService.getDayClass,
            dateDisabled: CalenderService.disableDate,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: tomorrow,
            startingDay: 1,
            showWeeks: false
        };

        // Disable weekend selection

        $scope.open1 = function () {
            $scope.popup1.opened = true;
        };
        $scope.open2 = function () {
            $scope.popup2.opened = true;
        };
        $scope.popup1 = {
            opened: false
        };
        $scope.popup2 = {
            opened: false
        };

        //change color
        // $scope.cartpro.timeFrom = tomorrow;
        $scope.today = new Date();
        var afterTomorrow = new Date(tomorrow);
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow2 = new Date(tomorrow);
        afterTomorrow2.setDate(tomorrow.getDate() + 2);
        var afterTomorrow3 = new Date(tomorrow);
        afterTomorrow3.setDate(tomorrow.getDate() + 3);

        // $scope.getDuration();
        $scope.beTheChange = function (dtdata) {
            CalenderService.selectedDate = dtdata;
            $scope.popup1 = {
                opened: false
            };
            $scope.popup2 = {
                opened: false
            };
        };

    })
    .controller('ProductCtrl', function ($scope, $filter, TemplateService, NavigationService, $timeout, $uibModal, $state) {
        //Used to name the .html file
        $scope.letIn = true;
        $scope.template = TemplateService.changecontent("product");
        $scope.menutitle = NavigationService.makeactive("Product");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.removeLoaderOn(6);
        $scope.filter = {};
        $scope.filter.pagenumber = 1;
        $scope.checkIt = {};
        $scope.texts = {};
        $scope.texts.msg = "";
        $scope.filter.subcategory = [];
        $scope.filter.color = [];
        $scope.filter.size = [];
        $scope.filter.pricefrom = 0;
        $scope.filter.priceto = 100000;
        $scope.filter.sort = '';
        $scope.letLoad = false;
        $scope.shopping = [];
        $scope.variables = {};
        $scope.oneAtATime = true;
        $scope.getSubcategory = function () {
            NavigationService.getSubcategory(function (data) {
                $scope.subcategory = data.data;
                if ($state.params.name) {
                    $scope.filter.subcategory.push(_.find($scope.subcategory, function (key) {
                        return key.name == $state.params.name;
                    })._id);
                    _.each($scope.subcategory, function (key) {
                        $scope.checkIt[key.name] = false;
                    });
                    $scope.checkIt[$state.params.name] = true;
                    $scope.filter.pagenumber = 1;
                }
                $scope.getMyProducts($scope.filter);
                TemplateService.removeLoader();
            }, function (err) {

            });
        };
        $scope.productSort = "";
        $scope.getProductSort = function () {
            NavigationService.getProductSort(function (data) {
                $scope.productSort = data.data;
                TemplateService.removeLoader();
            }, function (err) {});
        };
        $scope.getProductSort();

        $scope.showFilterlist = false;
        $scope.variables.showSortlist = false;
        $scope.seeFilter = function () {
            $scope.showFilterlist = !$scope.showFilterlist;
            // $scope.showFilterlist = true;
            $scope.variables.showSortlist = false;
        };
        $scope.seeSort = function () {
            $scope.variables.showSortlist = !$scope.variables.showSortlist;
            $scope.showFilterlist = false;

        };
        $scope.hideLoginContainer = function () {
            $scope.showFilterlist = false;
            $scope.variables.showSortlist = false;
        };
        $scope.getSubcategory();
        $scope.size = function () {
            NavigationService.getSize(function (data) {
                if (data) {
                    $scope.sizes = data.data;
                }
                TemplateService.removeLoader();
            });
        };
        $scope.size();

        $scope.checkall = function (cat, allFlag) {
            var abc = _.filter($scope.subcategory, function (key) {
                return key.category.name == cat;
            });

            _.each(abc, function (key) {
                // body...
                if (allFlag === true) {
                    if ($scope.checkIt[key.name]) {
                        //$scope.pushSubCategory(false, key._id, key.name);
                    } else {
                        $scope.pushSubCategory(true, key._id, key.name);
                    }
                } else {
                    $scope.pushSubCategory(false, key._id, key.name);
                }
            });

            if (allFlag === false) {
                var data = _.find($scope.subcategory, function (key) {
                    return key.name == $state.params.name;
                });
                $scope.pushSubCategory(true, data._id, data.name);
            }

        };
        $scope.pushSubCategory = function (flag, id, subcat) {
            $scope.checkIt[subcat] = flag;
            console.log("flag", flag, id, subcat);
            var data = _.find($scope.subcategory, function (key) {
                return key.name == subcat;
            });
            if (flag) {
                $scope.filter.subcategory.push(id);
                var notAll = false;
                _.each($scope.subcategory, function (key) {
                    if (data.category.name === key.category.name && $scope.checkIt[key.name] === false) {
                        //$scope.checkIt[key.] = flag;
                        notAll = true;
                    }
                });
                if (notAll) {
                    $scope.checkIt[data.category.name] = false;
                } else {
                    $scope.checkIt[data.category.name] = true;
                }
            } else {
                $scope.filter.subcategory.splice(_.findIndex($scope.filter.subcategory, function (key) {
                    return key == id;
                }), 1);
                $scope.checkIt[data.category.name] = false;
                //$scope.checkall();
            }
        };
        $scope.pushSize = function (id) {
            // console.log(flag,id);
            $scope.filter.size = [];
            if (_.findIndex($scope.filter.size, function (key) {
                    return key == id;
                }) !== -1) {
                $scope.filter.size.splice(_.findIndex($scope.filter.size, function (key) {
                    return key == id;
                }), 1);
            } else {
                $scope.filter.size.push(id);
            }
            console.log($scope.filter.size);
        };
        $scope.pushColor = function (flag, id) {
            if (flag) {
                $scope.filter.color.push(id);
            } else {
                $scope.filter.color.splice(_.findIndex($scope.filter.color, function (key) {
                    return key == id;
                }), 1);
            }
        };

        function getWishlist() {
            NavigationService.getWishlistUser(function (data) {
                if (data.value === true) {
                    $scope.wishlist = data.data.data;
                    console.log("wishlist", $scope.wishlist);
                } else {
                    $scope.wishlist = "";
                }
                TemplateService.removeLoader();
            });
        }
        getWishlist();
        $scope.isInWishlist = function (id) {
            var indexF = _.findIndex($scope.wishlist, function (key) {
                return key.product._id == id;
            });
            if (indexF !== -1) {
                return true;
            } else {
                return false;
            }
        };

        $scope.addTowishlist = function (product) {
            NavigationService.getProfile(function (data) {
                    if (data.value) {
                        var indexF = _.findIndex($scope.wishlist, function (key) {
                            console.log("key", key.product._id, 'id', product);
                            return key.product._id == product;
                        });
                        if (indexF !== -1) {
                            $scope.remove = function () {
                                NavigationService.deleteWishlistByProduct(product, function (data) {
                                    $scope.response = data;
                                    if ($scope.response.value === true) {
                                        // removemod.close();
                                        console.log("in re");
                                        getWishlist();
                                    }
                                });
                            };
                            $scope.remove();
                            // $scope.openRemoveModal = function(product) {
                            //     $scope.variables.removeitem = product;
                            //     console.log($scope.variables);
                            //     removemod = $uibModal.open({
                            //         animation: true,
                            //         templateUrl: "views/modal/removeitem.html",
                            //         scope: $scope
                            //     });
                            // };
                            // $scope.openRemoveModal(product);
                        } else {
                            NavigationService.saveWishlist(product, function (data) {
                                $uibModal.open({
                                    animation: true,
                                    templateUrl: 'views/modal/added-wishlist.html',
                                });
                                getWishlist();
                            });
                        }
                    } else {
                        globalfunction.signUp();
                    }
                },
                function (err) {
                    console.log(err);
                });
        };

        $scope.oneAtATime = true;

        $scope.demo2 = {
            range: {
                min: 1,
                max: 100000
            }
        };

        // GET ALL PRODUCT BY CATEGORY NAME
        console.log($state.params);

        $scope.sendtoproduct = $state.params;
        $scope.pages = [];
        var lastpage = 1;

        $scope.getMyProducts = function (filter) {
            console.log("in get products");
            if ($scope.letIn) {
                $scope.letIn = false;
                NavigationService.getProduct(filter, function (data) {
                    if (data.value) {
                        if (data.data.data.length === 0) {
                            $scope.texts.msg = "Product Not Found";
                        }
                        _.each(data.data.data, function (n) {
                            n.images = _.sortBy(n.images, [function (o) {
                                return o.order;
                            }]);
                            $scope.shopping.push(n);
                        });
                        lastpage = data.data.totalpages;
                        if (data.data.data.length !== 0) {
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                            ++$scope.filter.pagenumber;
                        }
                        $scope.letIn = true;
                        $scope.letLoad = true;
                        if (lastpage < $scope.filter.pagenumber) {
                            $scope.letLoad = false;
                        }
                    }
                    TemplateService.removeLoader();
                }, function (err) {

                });
            }
        };
        $scope.getColor = function () {
            NavigationService.getColor(function (data) {
                console.log("colors", data.data);
                $scope.color = data.data;
                TemplateService.removeLoader();
            }, function (err) {});
        };
        $scope.getColor();
        $scope.applyFilter = function (sortName) {
            $scope.filter.pagenumber = 1;
            $scope.filter.sort = sortName;
            $scope.shopping = [];
            $scope.getMyProducts($scope.filter);
            $scope.showFilterlist = false;
        };
        $scope.resetFilter = function () {
            $scope.filter.subcategory = [];
            $scope.filter.color = [];
            $scope.filter.size = '';
            $scope.filter.pricefrom = 0;
            $scope.filter.priceto = 100000;
            $scope.filter.pagenumber = 1;
            $scope.filter.sort = '';
            $scope.shopping = [];
            $scope.checkIt = _.map($scope.checkIt, function (key) {
                return false;
            });
            if ($state.params.name) {
                $scope.filter.subcategory.push(_.find($scope.subcategory, function (key) {
                    return key.name == $state.params.name;
                })._id);
                $scope.checkIt[$state.params.name] = true;
            }
            $scope.letLoad = false;
            $scope.getMyProducts($scope.filter);

        };
        $scope.applySort = function (sort) {
            $scope.variables.showSortlist = false;
            $scope.applyFilter(sort);
            $scope.loadMore();
        };
        $scope.loadMore = function () {
            if ($scope.letLoad) {
                $scope.getMyProducts($scope.filter);
            }
        };

    })
    .controller('ProductdetailCtrl', function ($scope, CalenderService, TemplateService, NavigationService, $timeout, $uibModal, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("productdetail");
        $scope.menutitle = NavigationService.makeactive("Productdetail");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.removeLoaderOn(1);
        $scope.oneAtATime = true;
        $scope.product = {};
        $scope.mainImage = "";
        $scope.timestamps = [];
        // $scope.calendertimestamps = [];
        $scope.cartpro = {};
        $scope.cartpro.product = $state.params.id;
        $scope.cartpro.size = '';
        $scope.cartpro.by = '';
        $scope.cartpro.duration = '';
        $scope.cartpro.timeFrom = '';
        $scope.cartpro.timeTo = '';
        $scope.cartpro.deliveryTime = '';
        $scope.cartpro.pickupTime = '';
        $scope.select = {};
        $scope.select.sizeactive = {};
        $scope.variables = {};
        $scope.checkLogin = $.jStorage.get("user");
        //PRODUCT DETAIL ON SELECTED PRODUCT
        $scope.sendtoproductreturn = $state.params.subcatname;
        $scope.saveWishList = function () {
            NavigationService.saveWishlist($state.params.id, function (data) {
                console.log("$state.params.id", $state.params.id);
            });
            // NavigationService.getSession
        };
        //  $scope.saveWishList();
        NavigationService.getProductDetail($state.params.id, function (data) {
            // console.log(data);
            $scope.product = data.data.product;
            $scope.psizes = data.data.product.size;
            if ($scope.psizes && $scope.psizes.length > 0) {
                $scope.selectSize($scope.psizes[0].name);
            }
            $scope.producttime = data.data.producttime;
            CalenderService.blockedDates = $scope.producttime;
            $scope.product.images = _.sortBy(data.data.product.images, [function (o) {
                return o.order;
            }]);
            // _.each($scope.producttime, function (key) {
            //     var tmpdate = new Date(key.timeFrom);
            //     // tmpdate.setHours(0,0,0,0);
            //     var tmpto = new Date(key.timeTo);
            //     var diffDays = tmpto.getDate() - tmpdate.getDate();
            //     start = 0;
            //     do {
            //         $scope.timestamps.push(new Date(tmpdate));
            //         tmpdate.setDate(tmpdate.getDate() + 1);
            //         start++;
            //     } while (start <= (diffDays + 4));
            // });
            $scope.mainImage = $scope.product.images[0].image;
            $scope.getRentalAmount(4);
            TemplateService.removeLoader();
        }, function (err) {

        });
        $scope.selectImage = function (img) {
            $scope.mainImage = img;
        };
        $scope.selectSize = function (size) {
            $scope.cartpro.size = size;
            _.each($scope.select.sizeactive, function (key, n) {
                $scope.select.sizeactive[n] = false;
            });
            $scope.select.sizeactive[size] = true;
            $scope.select.sizedetail = _.find($scope.product.size, function (key) {
                // body...
                return key.name == size;
            });
        };


        $scope.getRentalAmount = function (val) {
            console.log("rental amt", val);
            if (val == 8) {
                $scope.product.rentalamount = $scope.product.eightdayrentalamount;
                $scope.product.securitydeposit = $scope.product.eightdaysecuritydeposit;
                $scope.cartpro.duration = 8;
                CalenderService.duration = 8;
                $scope.dateduration = 8;
            } else {
                $scope.product.rentalamount = $scope.product.fourdayrentalamount;
                $scope.product.securitydeposit = $scope.product.fourdaysecuritydeposit;
                $scope.cartpro.duration = 4;
                $scope.dateduration = 4;
                CalenderService.duration = 4;
            }
            // $scope.beTheChange(tomorrow);
        }

        $scope.addToCart = function () {
            var d = new Date($scope.cartpro.timeFrom);
            $scope.cartpro.timeFrom = d;
            var timeto = new Date(d);
            $scope.cartpro.timeTo = new Date(timeto.setDate(d.getDate() + ($scope.cartpro.duration - 1)));
            if ($scope.product.designer == null) {
                $scope.cartpro.by = "";
            } else {
                $scope.cartpro.by = $scope.product.designer.name;
            }
            if ($.jStorage.get("cartDate")) {
                $scope.cartDate = $.jStorage.get("cartDate", $scope.cartpro);
            } else {
                $scope.cartDate = $.jStorage.set("cartDate", $scope.cartpro);
            }
            //check current cart date
            if (new Date($scope.cartpro.timeFrom).setHours(0, 0, 0, 0) === new Date($scope.cartDate.timeFrom).setHours(0, 0, 0, 0) && $scope.cartDate.duration == $scope.cartpro.duration && $scope.cartDate.pickupTime == $scope.cartpro.pickupTime && $scope.cartDate.deliveryTime == $scope.cartpro.deliveryTime) {
                NavigationService.addToCart($scope.cartpro, function (data) {
                    console.log("response cart", data);
                    $scope.response = data;
                    if ($scope.response.value === true) {
                        //remove product from wishlist
                        NavigationService.deleteWishlistByProduct($scope.cartpro.product, function (data) {
                            $scope.response = data;
                            if ($scope.response.value === true) {
                                console.log("removed");
                            }
                        });

                        $uibModal.open({
                            animation: true,
                            templateUrl: "views/modal/shop.html",
                            scope: $scope
                        });
                    } else {}
                    //TemplateService.removeLoader();
                }, function (err) {
                    console.log(err);
                });
            } else {
                console.log("please select valid date");
                $uibModal.open({
                    animation: true,
                    templateUrl: "views/modal/cartdate.html",
                    controller: "ProductdetailCtrl",
                    scope: $scope
                });
            }
        };
        $scope.productFull = function () {
            $uibModal.open({
                animation: true,
                templateUrl: "views/modal/product-full.html",
                scope: $scope
            })
        };

        function getWishlist() {
            NavigationService.getWishlistUser(function (data) {
                if (data.value == true) {
                    $scope.wishlist = data.data.data;
                    console.log("wishlist", $scope.wishlist);
                } else {
                    $scope.wishlist = "";
                }
                // TemplateService.removeLoader();
            });
        }
        getWishlist();
        $scope.isInWishlist = function (id) {
            var indexF = _.findIndex($scope.wishlist, function (key) {
                return key.product._id == id;
            })
            if (indexF !== -1) {
                return true;
            } else {
                return false;
            }
        }

        $scope.addTowishlistProduct = function (product) {
            console.log("in function");
            NavigationService.getProfile(function (data) {
                    console.log(data.value);
                    if (data.value) {
                        NavigationService.saveWishlist(product, function (data) {
                            console.log("data", data.message);
                            if (data.value) {
                                $uibModal.open({
                                    animation: true,
                                    templateUrl: 'views/modal/added-wishlist.html',
                                    controller: 'ProductdetailCtrl'

                                });
                                // getWishlist();
                            } else {
                                $uibModal.open({
                                    animation: true,
                                    templateUrl: 'views/modal/already-Wishlist.html',
                                    controller: 'ProductdetailCtrl'

                                });
                            }

                        });

                    } else {
                        globalfunction.signUp();
                    }
                },
                function (err) {
                    console.log(err);
                });
        };


        $scope.addTowishlist = function (product) {
            NavigationService.getProfile(function (data) {
                    if (data.value) {
                        var indexF = _.findIndex($scope.wishlist, function (key) {
                            console.log("key", key.product._id, 'id', product);
                            return key.product._id == product;
                        });
                        if (indexF !== -1) {
                            $scope.remove = function () {
                                NavigationService.deleteWishlistByProduct(product, function (data) {
                                    $scope.response = data;
                                    if ($scope.response.value === true) {
                                        // removemod.close();
                                        getWishlist();
                                    }
                                });
                            };
                            $scope.remove();
                            // $scope.openRemoveModal = function(product) {
                            //     $scope.variables.removeitem = product;
                            //     console.log($scope.variables);
                            //     removemod = $uibModal.open({
                            //         animation: true,
                            //         templateUrl: "views/modal/removeitem.html",
                            //         scope: $scope
                            //     });
                            // };
                            // $scope.openRemoveModal(product);
                        } else {
                            NavigationService.saveWishlist(product, function (data) {
                                $uibModal.open({
                                    animation: true,
                                    templateUrl: 'views/modal/added-wishlist.html',
                                });
                                getWishlist();
                            });
                        }
                    } else {
                        globalfunction.signUp();
                    }
                },
                function (err) {
                    console.log(err);
                });
        };


        if ($.jStorage.get("cartDate")) {
            console.log("innn cartdate", $.jStorage.get("cartDate"), $scope.cartpro);
            // $scope.setCalender();
        }
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        //calendar
        $scope.dateOptions = {
            customClass: CalenderService.getDayClass,
            dateDisabled: CalenderService.disableDate,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: tomorrow,
            startingDay: 1,
            showWeeks: false
        };

        // Disable weekend selection

        $scope.open1 = function () {
            $scope.popup1.opened = true;
        };
        $scope.open2 = function () {
            $scope.popup2.opened = true;
        };
        $scope.popup1 = {
            opened: false
        };
        $scope.popup2 = {
            opened: false
        };

        //change color
        $scope.cartpro.timeFrom = tomorrow;
        $scope.today = new Date();
        var afterTomorrow = new Date(tomorrow);
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow2 = new Date(tomorrow);
        afterTomorrow2.setDate(tomorrow.getDate() + 2);
        var afterTomorrow3 = new Date(tomorrow);
        afterTomorrow3.setDate(tomorrow.getDate() + 3);

        // $scope.getDuration();
        $scope.beTheChange = function (dtdata) {
            CalenderService.selectedDate = dtdata;
        };
    })
    .controller('CelebrityChoiceCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal) {
        //Used to name the .html file

        $scope.template = TemplateService.changecontent("celebrity-choice");
        $scope.menutitle = NavigationService.makeactive("CelebrityChoice");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.removeLoaderOn(2);
        $scope.oneAtATime = true;

        $scope.addCelebrity = function (celebrity) {
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

        $scope.celebrityFilter = {};
        $scope.celebrityFilter.pagenumber = 1;
        $scope.celebrityFilter.pagesize = 2;
        $scope.celebrityData = [];
        $scope.pages = [1]
        var lastpage = 1;
        $scope.getYourCelebrity = function () {
            NavigationService.getCelebrity($scope.celebrityFilter, function (data) {
                console.log("aaa", data);
                // $scope.celebrityData = data.data.data;
                // console.log($scope.celebrityData);
                if (data.value == true) {
                    $scope.lastpage = data.data.totalpages;
                    _.each(data.data.data, function (n) {
                        $scope.celebrityData.push(n);
                    });
                } else {
                    $scope.celebrityData = "";
                }
                TemplateService.removeLoader();
            })
        }
        $scope.getYourCelebrity();
        $scope.loadMore = function () {
            console.log('///////');
            if (lastpage > $scope.celebrityFilter.pagenumber) {
                console.log('lastpageeee: ', lastpage)
                    ++$scope.celebrityFilter.pagenumber;
                $scope.pages.push($scope.celebrityFilter.pagenumber);
                //         console.log('pages:', $scope.pages);
                console.log('pages:', $scope.pages);
                $scope.getYourCelebrity();
            }
        };

        function getWishlist() {
            NavigationService.getWishlistUser(function (data) {
                if (data.value == true) {
                    $scope.wishlist = data.data.data;
                    console.log("wishlist", $scope.wishlist);
                } else {
                    $scope.wishlist = "";
                }
                TemplateService.removeLoader();
            });
        }
        getWishlist();
        $scope.isInWishlist = function (id) {
            console.log("id", id);
            var indexF = _.findIndex($scope.wishlist, function (key) {
                return key.product._id == id;
            })
            if (indexF !== -1) {
                return true;
            } else {
                return false;
            }
        }
        $scope.variables = {};
        $scope.addTowishlist = function (product) {
            NavigationService.getProfile(function (data) {
                    if (data.value) {
                        var indexF = _.findIndex($scope.wishlist, function (key) {
                            console.log("key", key.product._id, 'id', product);
                            return key.product._id == product;
                        });
                        if (indexF !== -1) {
                            $scope.remove = function () {
                                NavigationService.deleteWishlistByProduct(product, function (data) {
                                    $scope.response = data;
                                    if ($scope.response.value === true) {
                                        // removemod.close();
                                        console.log("in re");
                                        getWishlist();
                                    }
                                });
                            };
                            $scope.remove();
                            // $scope.openRemoveModal = function(product) {
                            //     $scope.variables.removeitem = product;
                            //     console.log($scope.variables);
                            //     removemod = $uibModal.open({
                            //         animation: true,
                            //         templateUrl: "views/modal/removeitem.html",
                            //         scope: $scope
                            //     });
                            // };
                            // $scope.openRemoveModal(product);
                        } else {
                            NavigationService.saveWishlist(product, function (data) {
                                $uibModal.open({
                                    animation: true,
                                    templateUrl: 'views/modal/added-wishlist.html',
                                });
                                getWishlist();
                            });
                        }
                    } else {
                        globalfunction.signUp();
                    }
                },
                function (err) {
                    console.log(err);
                });
        };

    })
    .controller('ThankyouCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams) {
        //Used to name the .html file

        $scope.template = TemplateService.changecontent("thankyou");
        $scope.menutitle = NavigationService.makeactive("Thankyou");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.oneAtATime = true;
        $scope.footerColor = "home-footer";
        $scope.cartCheckout = $.jStorage.get("cartCheckout");
        NavigationService.emptyCart(function (response) {
            if (response) {
                NavigationService.getOrderById($stateParams.orderid, function (data) {
                    $scope.orderDetails = data.data;
                    console.log("aaaaaaa", $scope.orderDetails);
                });
            }
        });

    })
    .controller('SorryCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams) {
        //Used to name the .html file

        $scope.template = TemplateService.changecontent("sorry");
        $scope.menutitle = NavigationService.makeactive("Sorry");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.oneAtATime = true;
        $scope.footerColor = "home-footer";
        NavigationService.getOrderById($stateParams.orderid, function (data) {
            $scope.orderDetails = data.data;
            console.log("aaaaaaa", $scope.orderDetails);
        })
    })

.controller('headerctrl', function ($scope, TemplateService, $uibModal, NavigationService, $interval, $timeout, $state) {
    $scope.template = TemplateService;
    //TemplateService.removeLoaderOn(1);
    $scope.template.backClass = "";
    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $(window).scrollTop(0);
    });
    $(window).scroll(function () {
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
    $scope.cart = function () {
        $scope.loginmsg.msg = "";
        $uibModal.open({
            animation: true,
            templateUrl: "views/modal/hello.html",
            scope: $scope
        });
    };
    $scope.tabActive = function () {
        if ($state.current.name === 'profile') {
            $scope.tabActive1 = true;
        } else if ($state.current.name === 'orders') {
            $scope.tabActive2 = true;
        } else if ($state.current.name === 'wishlist') {
            $scope.tabActive3 = true;
        } else if ($state.current.name === 'saveaddress') {
            $scope.tabActive4 = true;
        } else if ($state.current.name === 'bankdetail') {
            $scope.tabActive5 = true;
        } else if ($state.current.name === 'changepassword') {
            $scope.tabActive6 = true;
        }
    }
    $scope.tabActive();

    globalfunction.signUp = function () {
        $scope.signUp();
    }
    globalfunction.emailSignup = function () {
        $scope.emailSignup();
    }
    globalfunction.logIn = function () {
        $scope.logIn();
    }
    globalfunction.forgot = function () {
        $scope.forgot();
    }
    globalfunction.logout = function () {
        $scope.logout();
    }
    $scope.logout = function () {
        console.log("logout as");
        NavigationService.logout(function (data) {
            if (data.value) {
                console.log("logout");
                // NavigationService.saveUser(null);

                // $scope.isLoggedIn = false;
                $state.go("home");
            }
        }, function (err) {

        });
    };

    $scope.signUp = function () {
        $scope.loginmsg.msg = "";
        $scope.closeAllModals();
        modal1 = $uibModal.open({
            animation: true,
            templateUrl: "views/modal/signup.html",
            scope: $scope
        });
        console.log(modal1);
    };
    $scope.logIn = function () {
        $scope.loginmsg.msg = "";
        $scope.closeAllModals();
        modal3 = $uibModal.open({
            animation: true,
            templateUrl: "views/modal/login.html",
            scope: $scope
        });
    };

    $scope.emailSignup = function () {
        $scope.loginmsg.msg = "";
        $scope.closeAllModals();
        modal2 = $uibModal.open({
            animation: true,
            templateUrl: "views/modal/email-signup.html",
            scope: $scope
        });
    };
    $scope.forgot = function () {
        $scope.loginmsg.msg = "";
        $scope.closeAllModals();
        modal4 = $uibModal.open({
            animation: true,
            templateUrl: "views/modal/forgotpassword.html",
            scope: $scope
        });
    };
    $scope.oneAtATime = true;
    $scope.showCross = "";
    $scope.showMe = "menu-out";
    $scope.showMenu = function () {
        if ($scope.showMe == "menu-in") {
            $scope.showMe = "menu-out";
            $scope.showCross = "";
            $scope.template.backClass = "";
        } else {
            $scope.showMe = "menu-in";
            $scope.showCross = "cross-ham";
            $scope.template.backClass = "backdrop";
        }
    };
    $scope.checkSession = function () {
        if ($.jStorage.get("userLoggedIn")) {
            $scope.isLoggedIn = true;
        } else {
            NavigationService.getProfile(function (response) {
                if (response.value) {
                    $scope.username = response.data.firstname;
                    $scope.isLoggedIn = true;
                    $.jStorage.set("userLoggedIn", true);
                } else {
                    $scope.isLoggedIn = false;
                }
                // TemplateService.removeLoader();
            }, function (err) {
                console.log(err);
            });
        }
    };
    $scope.checkSession();

    if ($.jStorage.get("userLoggedIn")) {
        console.log("logged in");
    } else {
        if ($state.current.name == "profile" || $state.current.name == "orders" || $state.current.name == "wishlist" || $state.current.name == "saveaddress" || $state.current.name == "bankdetail" || $state.current.name == "changepassword") {
            $state.go("home");
        }
    }
    globalfunction.getCartCount = function () {
        NavigationService.getCart(function (data) {
            if (data.value == true) {
                $scope.cartcount = data.data.cartcount;
            } else {
                $scope.cartcount = 0;
            }
        }, function (err) {
            console.log(err);
        });
        // console.log("cartcount", $scope.cartcount);
        // if($state.current.name == "address"){
        //     $state.go("home");
        // }
    };
    // if($scope.cartcount == undefined && $state.current.name === "checkoutorder" ){
    //     $state.go("home");
    // }

    globalfunction.getCartCount();
    $scope.closeAllModals = function () {
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
    };

    // INTEGRATION CODE
    $scope.loginmsg = {};
    $scope.login = {};

    $scope.signup = {};
    // SIGNUP

    $scope.emailRegex = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
    $scope.validEmail = false;
    $scope.signUpNormal = function (emailSignupForm, signup) {
        if (emailSignupForm.$invalid) {
            $scope.validEmail = true;
        } else {
            console.log("im in else");
            $scope.loginmsg.msg = "";
            if ($scope.signup.password === $scope.signup.confirmpswd) {

                $scope.closeme = function () {
                    removemod.close();
                    $state.reload();
                };
                NavigationService.signUP($scope.signup, function (data) {
                    if (data.value) {
                        $scope.closeAllModals();
                        // $scope.isLoggedIn = true;
                        removemod = $uibModal.open({
                            animation: true,
                            templateUrl: "views/modal/verified.html",
                            scope: $scope
                        });
                        // $state.reload();
                        // NavigationService.saveUser(data.data);
                    } else {
                        $scope.loginmsg.msg = data.data;
                        $scope.loginmsg.class = "text-danger";
                    }
                }, function (err) {
                    console.log(err);
                })
            } else {
                $scope.loginmsg.msg = "Password And Confirm Password Should be same";
                $scope.loginmsg.class = "text-danger";
            }
        }

    }
    $scope.goToFunction = function () {
            if ($state.current.name === 'checkoutsignin') {
                $state.go('address');
            } else {
                $.jStorage.set("userLoggedIn", true);
                $state.go('profile');
            }
        }
        // NORMAL LOGIN
    $scope.notFound = false;
    $scope.userLogin = function () {
        $scope.loginmsg.msg = "";

        NavigationService.login($scope.login, function (data) {
            if (data.value) {
                console.log("in if");
                $scope.closeAllModals();
                $scope.isLoggedIn = true;
                NavigationService.saveUser(data.data);
                $state.reload();
            } else {
                console.log(data.data.message);
                $scope.loginmsg.msg = data.data.message;
                $scope.loginmsg.class = "text-danger";
            }
        }, function () {

        });
    };

    $scope.forgotPassword = function (mail) {
        NavigationService.forgotPassword(mail, function (data) {
            // console.log("asdas", mail);
            $scope.err = {};
            if (data.value == true) {
                modal4.close();
                $state.go('home');
                // console.log("done");
            } else {
                $scope.err.msg = data.error.comment;
                $scope.err.class = "text-danger";
            }
        });
    };
    //GOOGLE LOGIN
    var checktwitter = function (data, status) {
        var repdata = {};
        if (data.value) {
            $interval.cancel(stopinterval);
            ref.close();
            $scope.closeAllModals();
            // $scope.isLoggedIn = true;
            $state.reload();
            // NavigationService.saveUser(data.data);
        } else {

        }
    };

    var callAtIntervaltwitter = function () {
        NavigationService.getProfile(checktwitter, function (err) {
            console.log(err);
        });
    };
    var authenticatesuccess = function (data, status) {
        $ionicLoading.hide();
        if (data.value) {
            $scope.closeAllModals();
            // $scope.isLoggedIn = true;
            // NavigationService.saveUser(data.data);
        }
    };
    $scope.facebookLogin = function () {

        ref = window.open(adminURL + 'user/loginFacebook', '_blank', 'location=no');
        stopinterval = $interval(callAtIntervaltwitter, 2000);
        ref.addEventListener('exit', function (event) {
            NavigationService.getProfile(authenticatesuccess, function (err) {
                console.log(err);
            });
            $interval.cancel(stopinterval);
        });
    };

    $scope.googleLogin = function () {
        console.log("googlelogin");
        ref = window.open(adminURL + 'user/loginGoogle', '_blank', 'location=no');
        stopinterval = $interval(callAtIntervaltwitter, 2000);
        ref.addEventListener('exit', function (event) {
            NavigationService.getProfile(authenticatesuccess, function (err) {
                console.log(err);
            });
            $interval.cancel(stopinterval);
        });
    };


})

.controller('languageCtrl', function ($scope, TemplateService, $translate, $rootScope) {

    $scope.changeLanguage = function () {
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
