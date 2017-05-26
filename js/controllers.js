var globalfunction = {};
var counter = 0;
angular.module('phonecatControllers', ['templateservicemod', "calenderService", 'navigationservice', 'ui.bootstrap', 'ngAnimate', 'ngSanitize', 'angular-flexslider', 'ui-rangeSlider', 'infinite-scroll', 'angular.filter'])
    // .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    //     cfpLoadingBarProvider.includeSpinner = false;
    // }])

.controller('HomeCtrl', function($scope, $state, $uibModal, TemplateService, NavigationService, $timeout, $rootScope) {

        //Used to name the .html file
        $scope.template = TemplateService.changecontent("home");
        $scope.menutitle = NavigationService.makeactive("The Stylease - High-end Fashion on Lease!");
        TemplateService.canonical = "home";
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        console.log("navigation", $scope.navigation);
        TemplateService.removeLoaderOn(2);
        console.log($scope.navigation);
        $scope.footerColor = "home-footer";
        $scope.subcategory = [];

        $scope.hiw = function() {
            modal5 = $uibModal.open({
                animation: true,
                templateUrl: "views/modal/hiw.html",
                windowClass: "modal-dialog2",
                scope: $scope
            });
        };
        $scope.verified = function() {
            modal6 = $uibModal.open({
                animation: true,
                templateUrl: "views/modal/verified.html",
                scope: $scope
            });
        };

        NavigationService.getSlider(function(data) {
            if (data) {
                $scope.mySlides = data.data;
                // console.log("aaa", $scope.mySlides);
            }
            TemplateService.removeLoader();
        });



        var temp = [];
        NavigationService.getSubcategory(function(data) {
            console.log("getSubcategory", data);
            _.each(data.data, function(key) {
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

        }, function(err) {

        });

        // $scope.OutsideIndia = function () {
        //     if ($.jStorage.get("location") === "OutsideIndia") {} else {

        //         NavigationService.localCountry(function (data) {
        //             // console.log("data", data);
        //             if (data.geoplugin_countryName !== "India") {
        //                 $scope.hello = $uibModal.open({
        //                     animation: true,
        //                     templateUrl: "views/modal/hello.html",
        //                     scope: $scope
        //                 });
        //             }
        //         });
        //     }
        // };

        // $scope.OutsideIndia();
        // $scope.saveOutsideIndia = function () {
        //     $.jStorage.set("location", "OutsideIndia");
        //     console.log("set", $.jStorage.get("location"));
        //     $scope.closeHello();
        // };
        $scope.formData = {};
        $scope.formComplete = false;
        $scope.submitForm = function(formData) {
            NavigationService.saveCountry(formData, function(data) {
                console.log("data", data);
                if (data.value === true) {
                    $scope.formComplete = true;
                    $timeout(function() {
                        $scope.formComplete = false;
                        $scope.formData = {};
                        $scope.saveOutsideIndia();
                    }, 2000);

                }
            })
        }

        $scope.closeHello = function() {
            console.log("aaaaaaaaa");
            $scope.hello.close();
            console.log("$scope.hello", $scope.hello);
        };

        NavigationService.getTestimonial(function(data) {
            if (data) {
                $scope.testimonials = data.data
            }
            TemplateService.removeLoader();
        });
    })
    .controller('AboutUsCtrl', function($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file

        $scope.template = TemplateService.changecontent("about-us");
        $scope.menutitle = NavigationService.makeactive("The Stylease |  Rent With Ease, Rent With Stylease");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.oneAtATime = true;
        TemplateService.canonical = "about-us";
        TemplateService.description = "Designer dresses on rent, jewellery on rent for cocktails, mehendi, sangeet or weddings; we have it all. ";
        TemplateService.keywords = "rent designer dresses, designer dresses on rent, rent jewellery, jewellery on rent in Mumbai";
    })
    .controller('DesignersCtrl', function($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file

        $scope.IsVisible = false;
        $scope.ShowHide = function() {
            //If DIV is visible it will be hidden and vice versa.
            $scope.IsVisible = $scope.IsVisible ? false : true;
        }
        $scope.template = TemplateService.changecontent("designers");
        $scope.menutitle = NavigationService.makeactive("Designers");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.oneAtATime = true;
        $scope.filterDesign = {};
        $scope.checkIt = {};
        $scope.filterDesign.designerTypeArr = [];
        NavigationService.getAllDesignerType(function(data) {
            console.log("designerType", data.data);
            $scope.designerType = data.data;
            TemplateService.removeLoader();
        }, function(err) {});
        $scope.pushAllDesignerType = function(flag, id) {
            if (flag) {
                _.each($scope.designerType, function(key) {
                    $scope.pushDesignerType(flag, key._id, key.name);
                });

            } else {
                _.each($scope.designerType, function(key) {
                    $scope.pushDesignerType(flag, key._id, key.name);
                });
            }
            console.log("$scope.filterDesign.designerTypeArr", $scope.filterDesign.designerTypeArr)

        };
        $scope.pushDesignerType = function(flag, id, type) {
            $scope.checkIt[type] = flag;
            if (flag) {
                $scope.filterDesign.designerTypeArr.push(id);
                $scope.filterDesign.searchText = $scope.filterData.searchText;
                $scope.filterMe(null, $scope.filterDesign);

            } else {
                $scope.filterDesign.designerTypeArr.splice(_.findIndex($scope.filterDesign.designerTypeArr, function(key) {
                    return key == id;
                }), 1);
                $scope.filterDesign.searchText = $scope.filterData.searchText;
                $scope.filterMe(null, $scope.filterDesign);
                document.getElementById('all').checked = false;
            }
            console.log("$scope.filterDesign.designerTypeArr", $scope.filterDesign.designerTypeArr)

        };

        $scope.AtoZ = [
            ["A", "B", "C"],
            ["d", "e", "f"],
            ["g", "h", "i"],
            ["j", "k", "l"],
            ["m", "n", "o"],
            ["p", "q", "r"],
            ["s", "t", "u"],
            ["v", "w", "x"],
            ["y", "z"],
        ];
        $scope.lim = 10000;

        // $scope.loadmoredesigner = function (val) {
        //     if (!_.isEmpty(val)) {
        //         $scope.lim = 10000;
        //         $scope.viewLess =true;
        //     } else {
        //         $scope.lim = 3;
        //     }
        // }

        $scope.filterData = {};
        $scope.filterData.searchText = $scope.AtoZ[0];
        $scope.filterData.designerTypeArr = [];
        NavigationService.getByDesignerTypeAlpha($scope.filterData, function(data) {

            console.log("by default", data);
            if (data.value) {
                $scope.filteredData = data.data;
                if ($scope.filteredData.firstObj) {
                    console.log("len", Math.ceil($scope.filteredData.firstObj.length / 2));

                    $scope.filteredData.firstObj = _.chunk($scope.filteredData.firstObj, Math.ceil($scope.filteredData.firstObj.length / 2))
                }
                if ($scope.filteredData.secondObj) {
                    $scope.filteredData.secondObj = _.chunk($scope.filteredData.secondObj, Math.ceil($scope.filteredData.secondObj.length / 2))
                }
                if ($scope.filteredData.thirdObj) {
                    $scope.filteredData.thirdObj = _.chunk($scope.filteredData.thirdObj, Math.ceil($scope.filteredData.thirdObj.length / 2))
                }
            }
        }, function(err) {

        });

        $scope.filterMe = function(filter, filterDesign) {
            if (!_.isEmpty($scope.filterDesign.designerTypeArr)) {
                $scope.filterData.designerTypeArr = $scope.filterDesign.designerTypeArr;
            } else {
                $scope.filterData.designerTypeArr = [];
            }
            if (filter != null) {
                $scope.filterData.searchText = $scope.AtoZ[filter];
            } else {
                $scope.filterData.searchText = $scope.filterData.searchText
            }

            console.log("filter", $scope.filterData);
            NavigationService.getByDesignerTypeAlpha($scope.filterData, function(data) {
                console.log("wen called", data);
                if (data.value) {
                    $scope.filteredData = data.data;
                    if ($scope.filteredData.firstObj) {
                        console.log("len", Math.ceil($scope.filteredData.firstObj.length / 2));

                        $scope.filteredData.firstObj = _.chunk($scope.filteredData.firstObj, Math.ceil($scope.filteredData.firstObj.length / 2))
                    }
                    if ($scope.filteredData.secondObj) {
                        $scope.filteredData.secondObj = _.chunk($scope.filteredData.secondObj, Math.ceil($scope.filteredData.secondObj.length / 2))
                    }
                    if ($scope.filteredData.thirdObj) {
                        $scope.filteredData.thirdObj = _.chunk($scope.filteredData.thirdObj, Math.ceil($scope.filteredData.thirdObj.length / 2))
                    }
                }
            }, function(err) {

            });
        }


        // TemplateService.canonical = "about-us";
        // TemplateService.description = "Designer dresses on rent, jewellery on rent for cocktails, mehendi, sangeet or wedding; we have it all. ";
        // TemplateService.keywords = "rent designer dresses, designer dresses on rent, rent jewellery, jewellery on rent in Mumbai, designer bags for rent  ";
    })
    .controller('ProfileCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
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

        $scope.logout = function() {
            globalfunction.logout();

        }
        $scope.setActive = function(menuItem) {
            $scope.activeMenu = menuItem;
        }
        $scope.setActive('my profile');

        $scope.set = {};
        $scope.getProfile = function() {
            NavigationService.getProfile(function(data) {
                if (data.value) {
                    $scope.userdata = data.data;
                    var fullName = [];
                    var fullName = data.data.name.split(' ');
                    if (fullName.length == 2) {
                        console.log('in iffffffff', fullName.length);
                        $scope.userdata.firstname = fullName[0],
                            $scope.userdata.lastname = fullName[1];
                    } else {
                        console.log('in elseeeeeeee', fullName.length);
                        $scope.userdata.firstname = fullName[0],
                            $scope.userdata.lastname = fullName[2];
                    }

                    console.log('fullName111111111', fullName);

                    console.log('firstName', $scope.userdata.firstname);
                    console.log('lastName', $scope.userdata.lastname);
                    console.log('userdata1111111111', $scope.userdata);
                }
                TemplateService.removeLoader();
            }, function(err) {
                console.log(err);
            });
        };
        $scope.getProfile();


        $scope.saveProfile = function() {
            $scope.set.Profile = false;
            console.log($scope.userdata);
            NavigationService.userProfileSave($scope.userdata, function(data) {
                $scope.setProfile = false;
            });
        };
        $scope.logoutClick = function() {
            console.log("logout as");
            NavigationService.logout(function(data) {
                if (data.value) {
                    console.log("logout");
                    // NavigationService.saveUser(null);

                    // $scope.isLoggedIn = false;
                    $state.go("home");
                }
            }, function(err) {

            });
        };

        $scope.goToReset = function() {
            $scope.getProfile();
        }

    })
    .controller('OrdersCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
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

        $scope.getMyOrders = function(filter) {
            console.log("in get products");
            if ($scope.letIn) {
                $scope.letIn = false;
                NavigationService.getOrders(filter, function(data) {
                    console.log("dddddd", data);
                    if (data.value) {
                        if (data.data.data.length === 0) {
                            $scope.texts.msg = "Orders Not Found";
                        }
                        _.each(data.data.data, function(n) {
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
                }, function(err) {

                });
            }
        };
        $scope.getMyOrders($scope.filter);
        $scope.loadMore = function() {
            if ($scope.letLoad) {
                $scope.getMyOrders($scope.filter);
            }
        };

        $scope.logoutClick = function() {
            NavigationService.logout(function(data) {
                if (data.value) {
                    $state.go("home");
                }
            }, function(err) {

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
        $scope.logout = function() {
            globalfunction.logout();

        }
        $scope.setActive = function(menuItem) {
            $scope.activeMenu = menuItem;
        }
        $scope.setActive('my orders');

    })
    .controller('TermsConditionCtrl', function($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file

        $scope.template = TemplateService.changecontent("terms-condition");
        $scope.menutitle = NavigationService.makeactive("Terms Condition");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.oneAtATime = true;
        TemplateService.canonical = "terms-condition";

    })
    .controller('CancelationPolicyCtrl', function($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file

        $scope.template = TemplateService.changecontent("cancellation-policy");
        $scope.menutitle = NavigationService.makeactive("Cancellation Policy");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.oneAtATime = true;
        TemplateService.canonical = "cancellation-policy";


    })
    .controller('ReturnPolicyCtrl', function($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file

        $scope.template = TemplateService.changecontent("return-policy");
        $scope.menutitle = NavigationService.makeactive("Return Policy");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.oneAtATime = true;
        TemplateService.canonical = "return-policy";

    })
    .controller('PrivacyPolicyCtrl', function($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file

        $scope.template = TemplateService.changecontent("privacy-policy");
        $scope.menutitle = NavigationService.makeactive("Privacy Policy");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.oneAtATime = true;
        TemplateService.canonical = "privacy-policy";

    })
    .controller('ContactCtrl', function($scope, $state, TemplateService, NavigationService, $timeout, $uibModal) {
        //Used to name the .html file

        $scope.template = TemplateService.changecontent("contact");
        $scope.menutitle = NavigationService.makeactive("The Stylease | Find Designer Dresses and Jewellery on Rent");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.oneAtATime = true;
        $scope.formData = {};
        TemplateService.canonical = "contact";
        TemplateService.description = "Looking for trendy designer dresses on rent? Want some jewellery on rent? Visit thestylease.com for help!";
        TemplateService.keywords = " Contact us, stylease contact us";
        $scope.submitForm = function() {
            // console.log("contact", $scope.formData);
            NavigationService.saveContact($scope.formData, function(data) {
                //console.log("res data ", data);
                if (data.value) {
                    $scope.formData = '';
                    closeModal = $uibModal.open({
                        animation: true,
                        templateUrl: 'views/modal/thanks.html',
                    });
                    $timeout(function() {
                        closeModal.close();
                    }, 2000);
                } else {
                    console.log("Error while submiting form");
                }
            })
        };
    })
    .controller('OrderdetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams) {
        //Used to name the .html file

        $scope.template = TemplateService.changecontent("orderdetail");
        $scope.menutitle = NavigationService.makeactive("Orderdetail");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.removeLoaderOn(1);
        NavigationService.getOrderDetail($stateParams.id, function(data) {
            console.log("data", data);
            $scope.orderdetail = data.data;
            $scope.cartproduct = data.data.cartproduct;
        })
        TemplateService.removeLoader();
    })
    .controller('WishlistCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $uibModal) {
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


        $scope.logout = function() {
            globalfunction.logout();

        }
        $scope.setActive = function(menuItem) {
            $scope.activeMenu = menuItem;
            // $scope.colour = "color: black";
        }
        $scope.setActive('my wishlist');

        function getWishlist() {
            NavigationService.getWishlistUser(function(data) {
                if (data.value == false) {
                    $scope.wishlist = "";
                } else {
                    $scope.wishlist = data.data.data;
                }
                TemplateService.removeLoader();
            });
        }
        getWishlist();

        $scope.deleteWishlist = function(id) {
            NavigationService.deleteWishlist(id, function(data) {
                $scope.response = data;
                if ($scope.response.value === true) {
                    // removemod.close();
                    // getWishlist();
                }
            });
        };
        $scope.remove = function() {
            NavigationService.deleteWishlist($scope.variables.removeitem, function(data) {
                $scope.response = data;
                if ($scope.response.value === true) {
                    removemod.close();
                    getWishlist();
                }
            });
        };
        $scope.openRemoveModal = function(productid) {
            $scope.variables.removeitem = productid;
            console.log($scope.variables);
            removemod = $uibModal.open({
                animation: true,
                templateUrl: "views/modal/removeitem.html",
                scope: $scope
            });
        };
        $scope.logoutClick = function() {
            NavigationService.logout(function(data) {
                if (data.value) {
                    $state.go("home");
                }
            }, function(err) {

            });
        };


    })
    .controller('AddressCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
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
        $scope.getUserAddress = function() {
            NavigationService.getProfile(function(data) {
                if (data.value) {
                    console.log("getProfile", data.data);
                    $scope.userdata = data.data;
                    var fullName = [];
                    var fullName = data.data.name.split(' ');
                    if (fullName.length == 2) {
                        console.log('in iffffffff', fullName.length);
                        $scope.userdata.firstname = fullName[0],
                            $scope.userdata.lastname = fullName[1];
                    } else {
                        console.log('in elseeeeeeee', fullName.length);
                        $scope.userdata.firstname = fullName[0],
                            $scope.userdata.lastname = fullName[2];
                    }

                    console.log('fullName111111111', fullName);

                    console.log('firstName', $scope.userdata.firstname);
                    console.log('lastName', $scope.userdata.lastname);
                    console.log('userdata1111111111', $scope.userdata);
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
                    // $scope.userdata.shippingAddress.shippingAddressCity = "Mumbai";
                    // $scope.userdata.shippingAddress.shippingAddressState = "Maharashtra";
                    $scope.userdata.shippingAddress.shippingAddressCountry = "India";
                    // $scope.userdata.billingAddress.billingAddressCity = "Mumbai";
                    // $scope.userdata.billingAddress.billingAddressState = "Maharashtra";
                    $scope.userdata.billingAddress.billingAddressCountry = "India";
                } else {
                    if ($.jStorage.get("userData")) {
                        $scope.userdata = $.jStorage.get("userData");
                    } else {
                        $scope.userdata.shippingAddress = {};
                        // $scope.userdata.shippingAddress.shippingAddressCity = "Mumbai";
                        // $scope.userdata.shippingAddress.shippingAddressState = "Maharashtra";
                        $scope.userdata.shippingAddress.shippingAddressCountry = "India";
                        $scope.userdata.billingAddress = {};
                        // $scope.userdata.billingAddress.billingAddressCity = "Mumbai";
                        // $scope.userdata.billingAddress.billingAddressState = "Maharashtra";
                        $scope.userdata.billingAddress.billingAddressCountry = "India";
                    }
                }
                TemplateService.removeLoader();
            }, function(err) {});
        };
        $scope.getUserAddress();
        $scope.sameShipping = function() {
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
        $scope.shippingCheck = function(check) {
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
        $scope.saveUserAddress = function(addressdata, formcheckout) {
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
                    NavigationService.userProfileSave($scope.userdata, function(data) {
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
    .controller('SaveaddressCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, $state) {
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
        $scope.setActive = function(menuItem) {
            $scope.activeMenu = menuItem;
        }
        $scope.setActive('saved addresses ');
        $scope.logout = function() {
            globalfunction.logout();

        }
        $scope.remove = function() {
            _.pull($scope.modelDelete.collection, $scope.modelDelete.obj);
            $scope.saveProfile();
            removemod.close();
        };
        $scope.showDelete = function(data, val) {
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

        $scope.getProfile = function() {
            NavigationService.getProfile(function(data) {
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
            }, function(err) {});
        };
        $scope.showEdit = function(data) {
            data.edit = true;
        };
        $scope.changeDefault = function(data, val) {
            var collection;
            if (val) {
                collection = $scope.userdata.shippingAddress;
            } else {
                collection = $scope.userdata.billingAddress;
            }
            if (data.isDefault) {
                _.each(collection, function(n) {
                    if (data !== n) {
                        n.isDefault = false;
                    }
                });
            }
            $scope.saveProfile();
        };
        if (true) {

        }

        $scope.addAddress = function(val) {
            console.log("val", val);
            var collection;
            if (val) {
                collection = $scope.userdata.shippingAddress;
                collection.push({
                    edit: true,
                    // shippingAddressCity: "Mumbai",
                    // shippingAddressState: "Maharashtra",
                    shippingAddressCity: "",
                    shippingAddressState: "",
                    shippingAddressCountry: "India"
                });
            } else {
              console.log("im en else");

                collection = $scope.userdata.billingAddress;
                collection.push({
                    edit: true,
                    // billingAddressCity: "Mumbai",
                    // billingAddressState: "Maharashtra",
                    billingAddressCity: "",
                    billingAddressState: "",
                    billingAddressCountry: "India"
                });

                  console.log("collection",collection);
            }

        };
        $scope.getProfile();
        $scope.data = {};
        $scope.saveProfile = function(data) {
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
            _.each($scope.userdata.billingAddress, function(n) {
                n.edit = false;
            });
            _.each($scope.userdata.shippingAddress, function(n) {
                n.edit = false;
            });
            NavigationService.userProfileSave($scope.userdata, function(data) {
                console.log("data", data);
                $scope.getProfile();

            });
        };

        $scope.logoutClick = function() {
            NavigationService.logout(function(data) {
                if (data.value) {
                    $state.go("home");
                }
            }, function(err) {

            });
        };

    })
    .controller('BankdetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
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
        $scope.setActive = function(menuItem) {
            $scope.activeMenu = menuItem;
        }
        $scope.setActive('bank a/c details');
        $scope.logout = function() {
            globalfunction.logout();

        }


        $scope.getProfile = function() {
            NavigationService.getProfile(function(data) {
                if (data.value) {
                    $scope.userdata = data.data;
                }
                TemplateService.removeLoader();
            }, function(err) {
                console.log(err);
            });
        };
        $scope.getProfile();

        $scope.goToReset = function() {
            $scope.getProfile();
        }

        $scope.saveProfile = function() {
            $scope.set.Profile = false;
            console.log($scope.userdata);
            NavigationService.userProfileSave($scope.userdata, function(data) {
                $scope.setProfile = false;
            });
        };

        $scope.logoutClick = function() {
            NavigationService.logout(function(data) {
                if (data.value) {
                    $state.go("home");
                }
            }, function(err) {

            });
        };

    })
    .controller('CheckoutSigninCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file

        $scope.template = TemplateService.changecontent("checkout-signin");
        $scope.menutitle = NavigationService.makeactive("CheckoutSignin");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.goToAddress = function() {
            $state.go('address');
        }


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

        $scope.signUp = function() {

            globalfunction.emailSignup();
        }
    })
    .controller('CheckoutLoginCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, $state) {
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
        $scope.loginmsg = {};
        $scope.login = {};
        $scope.userLogin = function() {
            $scope.loginmsg.msg = "";
            NavigationService.login($scope.login, function(data) {
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
            }, function() {

            });
        };
    })
    .controller('CheckoutOrderCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("checkout-orderdetail");
        $scope.menutitle = NavigationService.makeactive("Checkoutorder");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.removeLoaderOn(2);
        $scope.getProfile = function() {
            NavigationService.getProfile(function(data) {
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
            }, function(err) {});
        };


        $scope.getProfile();
        $scope.getCart = function() {
            NavigationService.getcart(function(data) {
                if (data.value) {
                    $scope.totalrentalamount = 0;
                    $scope.totalsecuritydeposit = 0;
                    $scope.cartDetails = data.data.cartcount;
                    $scope.cartProduct = data.data.cartproduct;
                    console.log("cartDetails", $scope.cartDetails);
                    _.each($scope.cartProduct, function(n) {
                        if (n.duration == 4) {
                            $scope.totalrentalamount = $scope.totalrentalamount + parseInt(n.product.fourdayrentalamount);
                            $scope.totalsecuritydeposit = $scope.totalsecuritydeposit + parseInt(n.product.fourdaysecuritydeposit);
                        } else {
                            $scope.totalrentalamount = $scope.totalrentalamount + parseInt(n.product.eightdayrentalamount);
                            $scope.totalsecuritydeposit = $scope.totalsecuritydeposit + parseInt(n.product.eightdaysecuritydeposit);
                        }

                    });
                    $scope.discountamount = 0;
                    $scope.subtotal = $scope.totalrentalamount;
                    $scope.servicetax = parseFloat($scope.totalrentalamount) * 0.15;
                    $scope.grandtotal = parseFloat($scope.totalrentalamount) + parseFloat($scope.servicetax) + parseFloat($scope.totalsecuritydeposit);
                } else {
                    $scope.cartProduct = [];
                    $scope.cartDetails = 0;
                }
                TemplateService.removeLoader();
            }, function(err) {
                console.log(err);
            });
        };
        $scope.getCart();


        $scope.checkCoupon = function(coupondata) {
            console.log("in coupon", coupondata);
            var constraints = {};
            constraints.name = coupondata;
            constraints.amt = $scope.totalrentalamount;
            if (constraints.name) {
                NavigationService.checkCoupon(constraints, function(data) {
                    if (data.value) {
                        $scope.errmsg = false;
                        $scope.coupon = data.data.coupon;
                        $scope.discount = data.data.discount;
                        $scope.discountamount = data.data.discountamount;
                        $scope.subtotal = $scope.totalrentalamount - data.data.discountamount;
                        $scope.servicetax = parseFloat($scope.subtotal) * 0.15;
                        $scope.grandtotal = parseFloat($scope.subtotal) + parseFloat($scope.servicetax) + parseFloat($scope.totalsecuritydeposit);
                        console.log("aaaa", $scope.subtotal, $scope.discountamount);
                    } else {
                        $scope.errmsg = true;
                        $scope.coupon = "";
                        $scope.discount = 0;
                        $scope.discountamount = 0;
                        console.log($scope.discountamount);
                        $scope.subtotal = $scope.totalrentalamount;
                        $scope.servicetax = parseFloat($scope.totalrentalamount) * 0.15;
                        $scope.grandtotal = parseFloat($scope.totalrentalamount) + parseFloat($scope.servicetax) + parseFloat($scope.totalsecuritydeposit);
                    }
                });
            }
        };


        $scope.placeOrder = function() {
            // console.log("placeorder", $scope.cartProduct, $scope.userdata);

            var placeorderuser = $scope.userdata;
            _.each($scope.userdata.shippingAddress, function(data, property) {
                placeorderuser[property] = data;
            });
            _.each($scope.userdata.billingAddress, function(data, property) {
                placeorderuser[property] = data;
            });
            placeorderuser.rentalamount = $scope.totalrentalamount;
            placeorderuser.coupon = $scope.coupon;
            placeorderuser.discount = $scope.discount;
            placeorderuser.discountamount = $scope.discountamount;
            placeorderuser.subtotal = $scope.subtotal;
            placeorderuser.servicetax = $scope.servicetax;
            placeorderuser.total = $scope.grandtotal;
            placeorderuser.refundabledeposit = $scope.totalsecuritydeposit;
            placeorder = placeorderuser;
            placeorder.cartproduct = $scope.cartProduct;
            NavigationService.getProfile(function(data) {
                    if (data.value) {
                        delete placeorder.wishlist;
                        delete placeorder.billingAddress;
                        delete placeorder.shippingAddress;
                        delete placeorder.userid;
                        delete placeorder._id;

                        NavigationService.placeOrder(placeorder, function(data) {
                            if (data) {
                                $.jStorage.set("cartDate", "");
                                console.log("data", data.data.orderid);
                                $scope.orderid = data.data.orderid;
                                $scope.formdata = data.data;
                                window.location.href = (adminURL + "payu/payU?_id=" + data.data._id);
                            } else {
                                $state.go("sorry");
                            }
                        });
                    } else {
                        NavigationService.placeOrder(placeorder, function(data) {
                            if (data) {
                                $.jStorage.set("cartDate", "");
                                console.log("data", data.data.orderid);
                                $scope.orderid = data.data.orderid;
                                $scope.formdata = data.data;
                                window.location.href = (adminURL + "payu/payU?_id=" + data.data._id);
                            } else {
                                $state.go("sorry");
                            }
                        });
                    }

                },
                function(err) {
                    console.log(err);
                });


        };
    })
    .controller('paymentCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $http) {
        //Used to name the .html file
        console.log(window.location.origin + "/payment.php");
        NavigationService.getOrderDetail($stateParams.id, function(data, status) {
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
    .controller('ChangepasswordCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, $state) {
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
        $scope.setActive = function(menuItem) {
            $scope.activeMenu = menuItem;
        }
        $scope.setActive('change password');
        $scope.logout = function() {
            globalfunction.logout();

        }


        $scope.changePassword = function(form) {
            NavigationService.changePassword(form, function(data) {
                console.log("data", data);
                if (data.value === true) {
                    $scope.passChanged = true;
                    $uibModal.open({
                        animation: true,
                        templateUrl: 'views/modal/passwordchange.html',
                    });
                    $scope.invalidPass = false;
                    $timeout(function() {
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

        $scope.logoutClick = function() {
            NavigationService.logout(function(data) {
                if (data.value) {
                    $state.go("home");
                }
            }, function(err) {

            });
        };

    })
    .controller('CartCtrl', function($scope, CalenderService, TemplateService, NavigationService, $timeout, $uibModal, $state) {
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
        $scope.cartdate = {};
        $scope.cartProduct = [];
        $scope.isLoggedIn = false;
        $scope.date = function() {
            $uibModal.open({
                animation: true,
                templateUrl: "views/modal/changedate.html",
                controller: "CartCtrl"
            });
        };
        $scope.remove = function() {
            console.log("Yes I do");
            NavigationService.removeFromCart($scope.variables.removeitem, function(data) {
                $scope.response = data;
                if ($scope.response.value === true) {
                    removemod.close();
                    $scope.getCart();
                    globalfunction.getCartCount();
                }
            });
        };
        $scope.isEqualDate = false;
        $scope.gotocheckout = function() {
            $scope.isEqualDate = false;
            $scope.isDateIssue = false;
            //new code fot cartdates
            $scope.newcartpro = $scope.cartProduct[0];
            _.each($scope.cartProduct, function(newpro) {
                if (newpro.timeFrom.setHours(0, 0, 0, 0) !== $scope.newcartpro.timeFrom.setHours(0, 0, 0, 0) || newpro.duration !== $scope.newcartpro.duration || newpro.pickupTime !== $scope.newcartpro.pickupTime || newpro.deliveryTime !== $scope.newcartpro.deliveryTime) {
                    $scope.isEqualDate = true;
                }
                if (newpro.timeFrom.getTime() < new Date()) {
                    console.log("date range issue");
                    $scope.isDateIssue = true;
                }
            });
            console.log(" $scope.isEqualDate", $scope.isEqualDate);
            if ($scope.isEqualDate) {
                cartdate = $uibModal.open({
                    animation: true,
                    templateUrl: "views/modal/changedate.html",
                    // templateUrl: "views/modal/creat-cart.html",
                    scope: $scope
                });
            } else if ($scope.isDateIssue) {
                cartdate = $uibModal.open({
                    animation: true,
                    templateUrl: "views/modal/datecart.html",
                    // templateUrl: "views/modal/creat-cart.html",
                    scope: $scope
                });
            } else {
                NavigationService.checkoutCheck(function(data) {
                    if (data.value) {
                        removemod = $uibModal.open({
                            animation: true,
                            templateUrl: "views/modal/creat-cart.html",
                            scope: $scope
                        });
                    } else {
                        if ($scope.totalrentalamount >= 500) {
                            if ($.jStorage.get("userLoggedIn")) {
                                $state.go('address');
                            } else {
                                $state.go(
                                    'checkoutsignin');
                            }
                        } else {
                            removemod = $uibModal.open({
                                animation: true,
                                templateUrl: "views/modal/minimumorder.html",
                                scope: $scope
                            });
                        }
                    }
                });

                // if ($scope.totalrentalamount >= 8000) {
                //     if ($.jStorage.get("userLoggedIn")) {
                //         $state.go('address');
                //     } else {
                //         $state.go(
                //             'checkoutsignin');
                //     }
                // } else {
                //     removemod = $uibModal.open({
                //         animation: true,
                //         templateUrl: "views/modal/minimumorder.html",
                //         scope: $scope
                //     });
                // }//
            }

        };

        $scope.changeCartDate = function(data) {
            $scope.editProduct = data;

            if ($scope.cartProduct.length == 1) {
                $scope.editCart(data);
            } else {
                $scope.openDateModal = function(data) {
                    cartdate = $uibModal.open({
                        animation: true,
                        templateUrl: "views/modal/changedate.html",
                        scope: $scope.$new()
                    });
                };
                $scope.openDateModal(data);

            }
        };

        $scope.editCartProduct = function(id) {
            $scope.variables.editCart = _.map($scope.variables.editCart, function(key) {
                return false;
            });
            $scope.variables.editCart[id] = true;
            NavigationService.getOneProduct(id, function(response) {
                if (response.value) {
                    $scope.product = response.data;
                    $scope.sizes = response.data.size
                    $scope.editable = _.find($scope.cartProduct, function(key) {
                        return key.product._id == id;
                    });
                    CalenderService.duration = $scope.editable.duration;
                    // $scope.getCalenderDays();
                }
            }, function(err) {
                console.log(err);
            });
        };
        $scope.closeEdit = function(id) {
            $scope.variables.editCart = _.map($scope.variables.editCart, function(key) {
                return false;
            });
            $scope.getCart();

        };


        $scope.changeallDate = function(data) {
            console.log("data", data, $scope.cartProduct);
            if (data == undefined) {
                var newdata = _.find($scope.cartProduct, function(o) {
                    return o.available = true;
                });

                $scope.editCart(newdata);

            } else {
                $scope.editCart(data);
            }
        };

        $scope.editCart = function(data) {
            $scope.editcartpro = {};
            $scope.editcartpro.product = data.product._id;
            var d = new Date(data.timeFrom);
            $scope.editcartpro.timeFrom = d;
            $scope.editcartpro.duration = data.duration;
            $scope.editcartpro.size = data.size;
            $scope.editcartpro.deliveryTime = data.deliveryTime;
            $scope.editcartpro.pickupTime = data.pickupTime;
            // var timeTod = new Date();
            // var addedSelDate = moment(date.date).add(Cal.duration + Cal.addDuration, "d");
            $scope.editcartpro.timeTo = moment(new Date(d)).add(($scope.editcartpro.duration - 1), "d");
            // $scope.editcartpro.timeTo = new Date(timeTod.setDate(d.getDate() + ($scope.editcartpro.duration - 1)));
            $scope.editcartpro.by = data.by;

            NavigationService.editAllCart($scope.editcartpro, function(data) {
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
            }, function(err) {
                console.log(err);
            });
        };



        $scope.openRemoveModal = function(productid) {
            $scope.variables.removeitem = productid;
            removemod = $uibModal.open({
                animation: true,
                templateUrl: "views/modal/removeitem.html",
                windowClass: "modal-dialog",
                scope: $scope
            });
        };
        $scope.getCart = function() {
            NavigationService.getcart(function(data) {
                if (data.value) {
                    $scope.totalrentalamount = 0;
                    $scope.totalsecuritydeposit = 0;
                    $scope.cartDetails = data.data.cartcount;
                    $scope.cartProduct = data.data.cartproduct;
                    _.each($scope.cartProduct, function(n) {
                        console.log(n);
                        n.timeFrom = moment(n.timeFrom).toDate();
                        CalenderService.selectedDate = n.timeFrom;

                    });

                    NavigationService.getProductTimes(function(data) {
                        if (data.value === true) {
                            console.log(data.data);
                            CalenderService.blockedDates = data.data;
                        }
                    }, function() {

                    });
                    NavigationService.checkoutCheck(function(data) {
                        if (data.value) {
                            _.each($scope.cartProduct, function(key) {
                                if (_.includes(data.data, key.product._id)) {
                                    key.available = false;
                                } else {
                                    key.available = true;
                                }
                            });
                        } else {
                            console.log("in else");
                        }
                    });
                    console.log("$scope.cartProduct", $scope.cartProduct);
                    // CalenderService.duration = $scope.cartProduct[0].duration;
                    _.each($scope.cartProduct, function(n) {
                        if (n.duration == 4) {
                            $scope.totalrentalamount = $scope.totalrentalamount + parseInt(n.product.fourdayrentalamount);
                            $scope.totalsecuritydeposit = $scope.totalsecuritydeposit + parseInt(n.product.fourdaysecuritydeposit);
                            CalenderService.duration = 4;

                        } else {
                            $scope.totalrentalamount = $scope.totalrentalamount + parseInt(n.product.eightdayrentalamount);
                            $scope.totalsecuritydeposit = $scope.totalsecuritydeposit + parseInt(n.product.eightdaysecuritydeposit);
                            CalenderService.duration = 8;

                        }
                        console.log("CalenderService.duration", CalenderService.duration);
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
            }, function(err) {
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

        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };
        $scope.open2 = function() {
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
        // $scope.beTheChange = function (dtdata) {
        //     CalenderService.selectedDate = dtdata;
        //     $scope.popup1 = {
        //         opened: false
        //     };
        //     $scope.popup2 = {
        //         opened: false
        //     };
        // };
        $scope.getDuration = function(data) {
            if (data === 4) {
                $scope.product.duration = 4;
                CalenderService.duration = 4;
            } else {
                $scope.product.duration = 8;
                CalenderService.duration = 8;

            }

        }

        $scope.beTheChange = function(dtdata) {
            CalenderService.selectedDate = dtdata;
        };
    })
    .controller('ProductCtrl', function($scope, $filter, TemplateService, NavigationService, $timeout, $uibModal, $state) {
        //Used to name the .html file
        $scope.letIn = true;
        $scope.template = TemplateService.changecontent("product");
        $scope.menutitle = NavigationService.makeactive("The Stylease | Get Designer Dresses on Rent");
        TemplateService.canonical = "product/" + $state.params.name;
        TemplateService.description = "Trendiest styles, top notch designs and the coolest collection of designer lehengas on rent are available on thestylease.com ";
        TemplateService.keywords = "rent designer dresses, designer dresses on rent, rent jewellery, jewellery on rent in Mumbai";
        if ($state.params.name === "Mehendi") {
            $scope.menutitle = NavigationService.makeactive("The Stylease | Rent Designer Dresses for Mehendi");
            TemplateService.description = " Looking for a gorgeous designer dress on rent or maybe some pretty jewellery on rent? Get both on the Stylease!";
            TemplateService.keywords = "rent designer dresses for mehendi,  rent designer dresses, designer dresses on rent";


        }
        if ($state.params.name === "Sangeet") {
            $scope.menutitle = NavigationService.makeactive("The Stylease | Find Jewellery on Rent for Sangeet");
            TemplateService.description = "Sangeet coming up? Want trendy jewellery and designer dresses on rent? Log on to thestylease.com for new styles";
            TemplateService.keywords = " jewellery on rent for sangeet ,  rent designer dresses, designer dresses on rent";


        }
        if ($state.params.name === "Reception") {
            $scope.menutitle = NavigationService.makeactive("The Stylease | Reception Ready with Lehengas on Rent");
            TemplateService.description = "Look your prettiest on your reception with designer lehengas on rent. Choose from designers and rent with ease!";
            TemplateService.keywords = " rent designer dresses, designer dresses on rent, reception  ready with lehengas on Rent";


        }
        if ($state.params.name === "Engagement") {
            $scope.menutitle = NavigationService.makeactive("The Stylease | Rent designer dresses for Engagement");
            TemplateService.description = "Rent designer dresses, find jewellery on rent and look trendy on your engagement! Select outfits from a range of labels!";
            TemplateService.keywords = "rent designer dresses for Engagement, rent designer dresses, designer dresses on rent";


        }
        if ($state.params.name === "Cocktail") {
            $scope.menutitle = NavigationService.makeactive("The Stylease | Rental Jewellery for Cocktail ");
            TemplateService.description = "Choose from a selection of rental jewellery, rental designer dresses and more for cocktail parties on the Stylease!";
            TemplateService.keywords = "rent jewellery, rental jewellery, jewellery on rent in mumbai, rental jewellery in mumbai, rent jewellery in Mumbai";


        }
        if ($state.params.name === "Occasions") {
            $scope.menutitle = NavigationService.makeactive("The Stylease | Designer Dresses on Rent for All Occasion");
            TemplateService.description = "Trendiest styles, top notch designs and the coolest collection of designer lehengas on rent are available on the stylease!";
            TemplateService.keywords = "designer dresses On rent, rent designer dresses";


        }
        if ($state.params.name === "Rings") {
            $scope.menutitle = NavigationService.makeactive("The Stylease | Rent the Trendiest and Prettiest Rings");
            TemplateService.description = "Jazz up any outfit with our amazing collection of rings. Rent rings with ease on Stylease today!";
            TemplateService.keywords = "trendiest & prettiest rings,  rings on rent, diamond ring on rent, diamond ring on rent in Mumbai";


        }
        if ($state.params.name === "Bracelets") {
            $scope.menutitle = NavigationService.makeactive("The Stylease | Rent the Most Beautiful Bracelets only on Stylease");
            TemplateService.description = "Add that extra touch to your outfit with our beautiful bracelets. Log onto Stylease and rent bracelets now. Your style is in your hands!";
            TemplateService.keywords = " beautiful bracelets, bracelets on rent, bracelets on rent for women, rent bracelets";


        }
        if ($state.params.name === "Headwear") {
            $scope.menutitle = NavigationService.makeactive("The Stylease |  Rent Trendy and Stylish Headwear Only on Stylease");
            TemplateService.description = " Stay ahead of the fashion game and rent the latest & trendiest headwear only on Stylease.";
            TemplateService.keywords = " Designer headwear on Rent, stylish headwear on rent, stylish headwear on rent in Mumbai";


        }
        if ($state.params.name === "Necklaces") {
            $scope.menutitle = NavigationService.makeactive("The Stylease | Rent everything from delicate pendants to party necklaces only on Stylease!");
            TemplateService.description = "Let your outfit really pop by wearing our designer necklaces. From delicate to statement pieces, you can rent it all on Stylease";
            TemplateService.keywords = " party necklaces, party necklaces on Rent, party necklaces on rent in Mumbai";


        }
        if ($state.params.name === "Handbags") {
            $scope.menutitle = NavigationService.makeactive("The Stylease | Rent the chicest and trendiest designer handbags only on Stylease!");
            TemplateService.description = "Complete our outfit with our designer range of handbags. Rent the trendiest handbags from clutches to totes only on Stylease";
            TemplateService.keywords = " designer handbags, designer handbags on Rent, designer handbags rent, designer handbags ";


        }
        if ($state.params.name === "Anklets") {
            $scope.menutitle = NavigationService.makeactive("The Stylease | Rent the Most Fashionable Anklets");
            TemplateService.description = "Add a little sparkle to your outfit with our collection of anklets. Rent the most fashionable anklets from our vast range only on Stylease";
            TemplateService.keywords = "fashionable anklets, fashionable anklets rent , fashionable anklets on rent , fashionable anklets on rent in Mumbai";


        }
        if ($state.params.name === "Earrings") {
            $scope.menutitle = NavigationService.makeactive("The Stylease | Rent beautiful earrings that go with any occasion only on Stylease!");
            TemplateService.description = "Add that extra touch with our incomparable collection of earrings. Want studs? Or looking for statement earrings? You can rent it all on Stylease ";
            TemplateService.keywords = "earrings on rent, earrings on rent in Mumbai, designer earrings on rent in Mumbai";


        }
        if ($state.params.name === "Indo-Western") {
            $scope.menutitle = NavigationService.makeactive("The Stylease | Rent Designer Indo-Western Wear");
            TemplateService.description = "Get the best of both worlds with our collection of Indo-Western wear. Rent trendy designer Indo-Western only on Stylease and make a style statement";
            TemplateService.keywords = "Indo-Western dresses on rent , Indo-Western dresses  rent, Indo-Western dresses on rent in Mumbai";


        }
        if ($state.params.name === "Anarkali") {
            $scope.menutitle = NavigationService.makeactive("The Stylease | Rent the most stunning designer Anarkali’s only on Stylease!");
            TemplateService.description = "Have a formal Indian function? Want to look your best? Rent gorgeous designer Anarkali’s only on Stylease.";
            TemplateService.keywords = "Anarkali on rent, designer Anarkali on rent, designer Anarkali on rent in Mumbai";


        }
        if ($state.params.name === "Gown") {
            $scope.menutitle = NavigationService.makeactive("The Stylease |  Rent Elegant and Chic Designer Gowns");
            TemplateService.description = "Make heads turn when you wear designer gowns from our collection. Choose between our elegant gowns and rent it with ease on Stylease.";
            TemplateService.keywords = " designer gowns, designer gowns on rent in Mumbai, designer gowns rent.";


        }
        // $scope.menutitle = NavigationService.makeactive("Stylease | Get Designer Dresses on Rent ");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        console.log("state", $state.params.name);


        TemplateService.removeLoaderOn(6);
        $scope.filter = {};
        $scope.filter.pagenumber = 1;
        $scope.checkIt = {};

        $scope.texts = {};
        $scope.texts.msg = "";
        $scope.filter.subcategory = [];
        $scope.filter.color = [];
        $scope.filter.designerId = [];
        $scope.filter.size = [];
        $scope.filter.pricefrom = 0;
        $scope.filter.priceto = 100000;
        $scope.filter.sort = '';
        $scope.letLoad = false;
        $scope.shopping = [];
        $scope.variables = {};
        $scope.oneAtATime = true;
        $scope.getSubcategory = function() {
            NavigationService.getSubcategory(function(data) {
                $scope.subcategory = data.data;
                console.log('scope.subcategory', $scope.subcategory)
                if ($state.params.name || $state.params.id) {
                    if ($state.params.name === "Occasions" || $state.params.name === "Dresses" || $state.params.name === "Accessories" || $state.params.name === "Collections" || $state.params.id) {
                        $scope.checkall($state.params.name, true);
                        if ($state.params.id) {
                            $scope.filter.designerId.push($state.params.id);
                        }

                        // checkall(cat,checkIt[cat])
                        _.each($scope.subcategory, function(key) {
                            console.log("keyyyyyy", key);
                            $scope.checkIt[key.name] = false;

                        });

                    } else {
                      $scope.filter.designerId=[];
                      console.log("im in else");
                        $scope.filter.subcategory.push(_.find($scope.subcategory, function(key) {
                          console.log("key",key);
                            return key.name == $state.params.name;
                        })._id);
                          console.log("im in else",$scope.filter.subcategory);
                    }
                    _.each($scope.subcategory, function(key) {

                        // if (key.category.name.indexOf($state.params.name) != -1) {
                        //     console.log("keyyyyyy", key.category.name);
                        //     $scope.checkIt[key.name] = true;
                        // } else {
                        //     $scope.checkIt[key.name] = false;
                        // }
                        $scope.checkIt[key.name] = false;

                    });
                    $scope.checkIt[$state.params.name] = true;
                    $scope.filter.pagenumber = 1;
                }
                $scope.getMyProducts($scope.filter);
                console.log("getMyProducts");
                TemplateService.removeLoader();
            }, function(err) {

            });
        };
        $scope.productSort = "";
        $scope.getProductSort = function() {
            NavigationService.getProductSort(function(data) {
                $scope.productSort = data.data;
                TemplateService.removeLoader();
            }, function(err) {});
        };
        $scope.getProductSort();

        $scope.showFilterlist = false;
        $scope.variables.showSortlist = false;
        $scope.seeFilter = function() {
            $scope.showFilterlist = !$scope.showFilterlist;
            // $scope.showFilterlist = true;
            $scope.variables.showSortlist = false;
        };
        $scope.seeSort = function() {
            $scope.variables.showSortlist = !$scope.variables.showSortlist;
            $scope.showFilterlist = false;

        };
        $scope.hideLoginContainer = function() {
            $scope.showFilterlist = false;
            $scope.variables.showSortlist = false;
        };
        $scope.getSubcategory();
        $scope.size = function() {
            NavigationService.getSize(function(data) {
                if (data) {
                    $scope.sizes = data.data;
                }
                TemplateService.removeLoader();
            });
        };
        $scope.size();

        $scope.checkall = function(cat, allFlag) {
            console.log("check all", cat, allFlag, $scope.subcategory);
            var abc = _.filter($scope.subcategory, function(key) {
                console.log("key cat name", key.category.name, cat);
                return key.category.name == cat;
            });
            console.log("abc", $scope.checkIt, $scope.subcategory);
            _.each(abc, function(key) {
                // body...
                if (allFlag === true) {
                    console.log("emptyyyy");
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
                var data = _.find($scope.subcategory, function(key) {
                    return key.name == $state.params.name;
                });
                $scope.pushSubCategory(true, data._id, data.name);
            }

        };

        $scope.pushSubCategory = function(flag, id, subcat) {
            $scope.checkIt[subcat] = flag;
            console.log("flag", flag, id, subcat);
            if ($state.params.id) {
                $scope.filter.designerId = [];
            }
            var data = _.find($scope.subcategory, function(key) {
                return key.name == subcat;
            });
            if (flag) {
                $scope.filter.subcategory.push(id);
                var notAll = false;
                _.each($scope.subcategory, function(key) {
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
                $scope.filter.subcategory.splice(_.findIndex($scope.filter.subcategory, function(key) {
                    return key == id;
                }), 1);
                $scope.checkIt[data.category.name] = false;
                //$scope.checkall();
            }
        };
        $scope.pushSize = function(id) {
            // console.log(flag,id);
            $scope.filter.size = [];
            if (_.findIndex($scope.filter.size, function(key) {
                    return key == id;
                }) !== -1) {
                $scope.filter.size.splice(_.findIndex($scope.filter.size, function(key) {
                    return key == id;
                }), 1);
            } else {
                $scope.filter.size.push(id);
            }
            console.log($scope.filter.size);
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


        function getWishlist() {
            NavigationService.getWishlistUser(function(data) {
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
        $scope.isInWishlist = function(id) {
            var indexF = _.findIndex($scope.wishlist, function(key) {
                return key.product._id == id;
            });
            if (indexF !== -1) {
                return true;
            } else {
                return false;
            }
        };

        $scope.addTowishlist = function(product) {
            NavigationService.getProfile(function(data) {
                    if (data.value) {
                        var indexF = _.findIndex($scope.wishlist, function(key) {
                            console.log("key", key.product._id, 'id', product);
                            return key.product._id == product;
                        });
                        if (indexF !== -1) {
                            $scope.remove = function() {
                                NavigationService.deleteWishlistByProduct(product, function(data) {
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
                            NavigationService.saveWishlist(product, function(data) {
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
                function(err) {
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

        $scope.getMyProducts = function(filter) {
            console.log("in get products");
            console.log("filter", filter);
            if ($scope.letIn) {
                $scope.letIn = false;
                NavigationService.getProduct(filter, function(data) {
                    if (data.value) {
                        console.log('testt');
                        console.log(data.data);
                        $scope.filterDataLength = data.data.totalItems;

                        if (data.data.data.length === 0) {
                            $scope.texts.msg = "Product Not Found";
                        }
                        _.each(data.data.data, function(n) {
                            n.images = _.sortBy(n.images, [function(o) {
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
                }, function(err) {

                });
            }
        };
        $scope.getColor = function() {
            NavigationService.getColor(function(data) {
                console.log("colors", data.data);
                $scope.color = data.data;
                TemplateService.removeLoader();
            }, function(err) {});
        };
        $scope.getColor();
        // $scope.getDE

        $scope.pushDesigner = function(flag, id) {
            if (flag) {
                // $scope.designerId=[];
                // $scope.designerId.push(id)
                $scope.filter.designerId.push(id);
                // NavigationService.getProductByDesigner($scope.designerId,function(data){
                //   console.log("$scope.designerId",$scope.designerId);
                //           console.log("getProductByDesigner",data);
                //           $scope.productDesigner=data.data.data;
                //           console.log("$scope.productDesigner",$scope.productDesigner);
                //           _.each($scope.productDesigner,function(n){
                //                   $scope.shopping.push(n);
                //                   console.log("$scope.shopping",$scope.shopping);
                //           })
                //         })
            } else {
                $scope.filter.designerId.splice(_.findIndex($scope.filter.designerId, function(key) {
                    return key == id;
                }), 1);
            }
        };


        NavigationService.getAllDesigner(function(data) {
            console.log("getProductByDesigner", data);
            $scope.getAllDesigner = data.data;
            console.log("$scope.getAllDesigner", $scope.getAllDesigner);
        })


        $scope.applyFilter = function(sortName) {
            $scope.filter.pagenumber = 1;
            $scope.filter.sort = sortName;
            $scope.shopping = [];
            $scope.getMyProducts($scope.filter);
            $scope.showFilterlist = false;
        };
        $scope.resetFilter = function() {
            $scope.filter.designerId = [];
            $scope.filter.subcategory = [];
            $scope.filter.color = [];
            $scope.filter.size = '';
            $scope.filter.pricefrom = 0;
            $scope.filter.priceto = 100000;
            $scope.filter.pagenumber = 1;
            $scope.filter.sort = '';
            $scope.shopping = [];
            $scope.checkIt = _.map($scope.checkIt, function(key) {
                return false;
            });

            if ($state.params.name) {
                if (_.find($scope.subcategory, function(key) {
                        console.log(key.name);
                        return key.name == $state.params.name;

                    })) {
                    $scope.filter.subcategory.push(_.find($scope.subcategory, function(key) {
                        console.log(key.name);
                        return key.name == $state.params.name;

                    })._id);
                }

                $scope.checkIt[$state.params.name] = true;
            }
            $scope.letLoad = false;
            $scope.getMyProducts($scope.filter);

        };
        $scope.applySort = function(sort) {
            $scope.variables.showSortlist = false;
            $scope.applyFilter(sort);
            $scope.loadMore();
        };
        $scope.loadMore = function() {
            if ($scope.letLoad) {
                $scope.getMyProducts($scope.filter);
            }
        };


    })
    .controller('ProductdetailCtrl', function($scope, CalenderService, TemplateService, NavigationService, $timeout, $uibModal, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("productdetail");
        $scope.menutitle = NavigationService.makeactive("Productdetail");
        // TemplateService.title = $scope.menuTitleFor;
        $scope.navigation = NavigationService.getnav();
        TemplateService.canonical = "pd/product/" + $state.params.id;
        TemplateService.removeLoaderOn(1);
        $scope.oneAtATime = true;
        $scope.product = {};
        $scope.mainImage = "";
        $scope.timestamps = [];
        // $scope.calendertimestamps = [];
        $scope.cartpro = {};
        $scope.menuTitleFor="";
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
        console.log("$state.params.subcatname", $state.params.subcatname);
        console.log($state.params.id, "$state.params.id");
        $scope.saveWishList = function() {
            NavigationService.saveWishlist($state.params.id, function(data) {
                console.log("$state.params.id", $state.params.id);
            });
            // NavigationService.getSession
        };
        //  $scope.saveWishList();

        $scope.signUp = function() {
            globalfunction.emailSignup();
        }

        $scope.Login = function() {
            globalfunction.logIn();
        }

        NavigationService.getCart(function(data) {
            console.log("aaaaaaaa");
            if (data.value == true) {

                $scope.cartProductdate = data.data.cartproduct[0];
                if ($.jStorage.get("cartDate")) {
                    $scope.cartDate = $.jStorage.get("cartDate", $scope.cartpro);
                } else {
                    $scope.cartDate = $.jStorage.set("cartDate", $scope.cartProductdate);
                }
                console.log(" $scope.cartProductdate", $scope.cartProductdate);
            }
        }, function(err) {
            console.log(err);
        });





        NavigationService.getProductDetail($state.params.id, function(data) {
            // console.log(data);
            $scope.product = data.data.product;
            $scope.psizes = data.data.product.size;
            TemplateService.canonical = "pd/" + _.kebabCase($scope.product.name) + "/" + $state.params.id;
            TemplateService.title = "The Stylease | " + $scope.product.name; 
            if ($scope.psizes && $scope.psizes.length > 0) {
                $scope.selectSize($scope.psizes[0].name);
            }
            $scope.producttime = data.data.producttime;
            CalenderService.blockedDates = $scope.producttime;
            $scope.product.images = _.sortBy(data.data.product.images, [function(o) {
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
        }, function(err) {

        });

        // $scope.menuTitleFor
        $scope.selectImage = function(img) {
            $scope.mainImage = img;
        };
        $scope.selectSize = function(size) {
            $scope.cartpro.size = size;
            _.each($scope.select.sizeactive, function(key, n) {
                $scope.select.sizeactive[n] = false;
            });
            $scope.select.sizeactive[size] = true;
            $scope.select.sizedetail = _.find($scope.product.size, function(key) {
                // body...
                return key.name == size;
            });
        };


        $scope.getRentalAmount = function(val) {
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
        $scope.pleaseLogin = false;
        $scope.addToCart = function() {
            $scope.ifLogin = $.jStorage.get("userLoggedIn");
            if ($scope.ifLogin) {
                console.log('yes login');

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
                    NavigationService.addToCart($scope.cartpro, function(data) {
                        console.log("response cart", data);
                        $scope.response = data;
                        if ($scope.response.value === true) {
                            //remove product from wishlist
                            NavigationService.deleteWishlistByProduct($scope.cartpro.product, function(data) {
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
                    }, function(err) {
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
            } else {
                $scope.pleaseLogin = true;
                console.log('No not login')
                $uibModal.open({
                    animation: true,
                    templateUrl: "views/modal/add-cart.html",
                    controller: "ProductdetailCtrl",
                    scope: $scope
                });
            }
        };
        $scope.productFull = function() {
            $uibModal.open({
                animation: true,
                templateUrl: "views/modal/product-full.html",
                scope: $scope
            })
        };

        function getWishlist() {
            NavigationService.getWishlistUser(function(data) {
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
        $scope.isInWishlist = function(id) {
            var indexF = _.findIndex($scope.wishlist, function(key) {
                return key.product._id == id;
            })
            if (indexF !== -1) {
                return true;
            } else {
                return false;
            }
        }

        $scope.addTowishlistProduct = function(product) {
            console.log("in function");
            NavigationService.getProfile(function(data) {
                    console.log(data.value);
                    if (data.value) {
                        NavigationService.saveWishlist(product, function(data) {
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
                function(err) {
                    console.log(err);
                });
        };


        $scope.addTowishlist = function(product) {
            NavigationService.getProfile(function(data) {
                    if (data.value) {
                        var indexF = _.findIndex($scope.wishlist, function(key) {
                            console.log("key", key.product._id, 'id', product);
                            return key.product._id == product;
                        });
                        if (indexF !== -1) {
                            $scope.remove = function() {
                                NavigationService.deleteWishlistByProduct(product, function(data) {
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
                            NavigationService.saveWishlist(product, function(data) {
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
                function(err) {
                    console.log(err);
                });
        };


        if ($.jStorage.get("cartDate")) {
            console.log("innn cartdate", $.jStorage.get("cartDate"), $scope.cartpro);
            // $scope.setCalender();
        }
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date(tomorrow);
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        //calendar
        $scope.dateOptions = {
            customClass: CalenderService.getDayClass,
            dateDisabled: CalenderService.disableDate,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: afterTomorrow,
            startingDay: 1,
            showWeeks: false
        };

        // Disable weekend selection

        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };
        $scope.open2 = function() {
            $scope.popup2.opened = true;
        };
        $scope.popup1 = {
            opened: false
        };
        $scope.popup2 = {
            opened: false
        };
        //change color


        $scope.cartpro.timeFrom = afterTomorrow;
        // $scope.today = new Date();
        // var afterTomorrow = new Date(tomorrow);

        // var afterTomorrow2 = new Date(tomorrow);
        // afterTomorrow2.setDate(tomorrow.getDate() + 2);
        // var afterTomorrow3 = new Date(tomorrow);
        // afterTomorrow3.setDate(tomorrow.getDate() + 3);

        // $scope.getDuration();
        $scope.beTheChange = function(dtdata) {
            CalenderService.selectedDate = dtdata;
        };
    })
    .controller('CelebrityChoiceCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, $rootScope) {
        //Used to name the .html file

        $scope.template = TemplateService.changecontent("celebrity-choice");
        $scope.menutitle = NavigationService.makeactive("CelebrityChoice");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.removeLoaderOn(2);
        $scope.oneAtATime = true;


// $state.go('state1',{new_param: "Going places!"});
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

        $scope.celebrityFilter = {};
        $rootScope.showOnHome = false;
        $scope.celebrityFilter.pagenumber = 1;
        $scope.celebrityFilter.pagesize = 2;
        $scope.celebrityData = [];
        $scope.pages = [1]
        // var lastpage = 1;
        var lastpage = ''


        $scope.getYourCelebrity = function() {
            NavigationService.getCelebrity($scope.celebrityFilter, function(data) {
                if (data.value == true) {
                  console.log("data",data);
                    $rootScope.showOnHome = true;
                    lastpage = data.data.totalpages;
                    // $scope.lastpage = data.data.totalpages;
                    _.each(data.data.data, function(n) {
                        $scope.celebrityData.push(n);
                    });
                } else {
                    $scope.celebrityData = "";
                }
                TemplateService.removeLoader();
            })
        }
        $scope.getYourCelebrity();
        $scope.loadMore = function() {
            console.log('///////');
            if (lastpage > $scope.celebrityFilter.pagenumber) {
                // console.log('lastpageeee: ', lastpage)
                    ++$scope.celebrityFilter.pagenumber;
                $scope.pages.push($scope.celebrityFilter.pagenumber);
                //         console.log('pages:', $scope.pages);
                console.log('pages:', $scope.pages);
                $scope.getYourCelebrity();
            }
        };

        function getWishlist() {
            NavigationService.getWishlistUser(function(data) {
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
        $scope.isInWishlist = function(id) {
            console.log("id", id);
            var indexF = _.findIndex($scope.wishlist, function(key) {
                return key.product._id == id;
            })
            if (indexF !== -1) {
                return true;
            } else {
                return false;
            }
        }
        $scope.variables = {};
        $scope.addTowishlist = function(product) {
            NavigationService.getProfile(function(data) {
                    if (data.value) {
                        var indexF = _.findIndex($scope.wishlist, function(key) {
                            console.log("key", key.product._id, 'id', product);
                            return key.product._id == product;
                        });
                        if (indexF !== -1) {
                            $scope.remove = function() {
                                NavigationService.deleteWishlistByProduct(product, function(data) {
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
                            NavigationService.saveWishlist(product, function(data) {
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
                function(err) {
                    console.log(err);
                });
        };

    })
    .controller('ThankyouCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams) {
        //Used to name the .html file

        $scope.template = TemplateService.changecontent("thankyou");
        $scope.menutitle = NavigationService.makeactive("Thankyou");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.oneAtATime = true;
        $scope.footerColor = "home-footer";
        $scope.cartCheckout = $.jStorage.get("cartCheckout");
        NavigationService.emptyCart(function(response) {
            if (response) {
                NavigationService.getOrderById($stateParams.orderid, function(data) {
                    $scope.orderDetails = data.data;
                    console.log("aaaaaaa", $scope.orderDetails);
                });
            }
        });

    })
    .controller('SorryCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams) {
        //Used to name the .html file

        $scope.template = TemplateService.changecontent("sorry");
        $scope.menutitle = NavigationService.makeactive("Sorry");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.oneAtATime = true;
        $scope.footerColor = "home-footer";
        NavigationService.getOrderById($stateParams.orderid, function(data) {
            $scope.orderDetails = data.data;
            console.log("aaaaaaa", $scope.orderDetails);
        })
    })

//header loading twice sorted by this
.controller('titleCtrl', function($scope, TemplateService, $uibModal, NavigationService, $interval, $timeout, $state) {
    $scope.template = TemplateService;
    // $scope.template = {};
    // $scope.template.title = TemplateService.giveTitle();
})

.controller('headerctrl', function($scope, TemplateService, $uibModal, NavigationService, $interval, $timeout, $state, $rootScope) {
    $scope.template = TemplateService;
    //TemplateService.removeLoaderOn(1);
    $scope.celebrityFilter = {};
    $rootScope.showOnHome = false;
    $scope.celebrityFilter.pagenumber = 1;
    $scope.celebrityFilter.pagesize = 2;
    $scope.celebrityData = [];
    $scope.pages = [1]
    var lastpage = 1;

    $scope.getYourCelebrity = function() {
        NavigationService.getCelebrity($scope.celebrityFilter, function(data) {
            if (data.value == true) {

                $scope.lastpage = data.data.totalpages;
                console.log("data.data.data", data.data.data);
                var showCelebrity = _.result(_.find(data.data.data, function(obj) {
                  console.log("obj",obj);
                    return obj.status === true;
                }), 'status');
                console.log("showCelebrity", showCelebrity);
                if (showCelebrity) {
                    $rootScope.showOnHome = true;
                } else {
                    $rootScope.showOnHome = false;
                }

                _.each(data.data.data, function(n) {
                    $scope.celebrityData.push(n);
                });
            } else {
                $scope.celebrityData = "";
            }
            TemplateService.removeLoader();
        })
    }
    $scope.getYourCelebrity();
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
    // $scope.cart = function () {
    //     $scope.loginmsg.msg = "";
    //     $uibModal.open({
    //         animation: true,
    //         templateUrl: "views/modal/hello.html",
    //         scope: $scope
    //     });
    // };
    $scope.tabActive = function() {
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

    globalfunction.signUp = function() {
        $scope.signUp();
    }
    globalfunction.emailSignup = function() {
        $scope.IsHidden = false;
        $scope.signup = {};
        $scope.emailSignup();
    }
    globalfunction.logIn = function() {
        $scope.logIn();
    }
    globalfunction.forgot = function() {
        $scope.forgot();
    }
    globalfunction.logout = function() {
        $scope.logout();
    }
    $scope.logout = function() {
        console.log("logout as");
        NavigationService.logout(function(data) {
            if (data.value) {
                console.log("logout");
                // NavigationService.saveUser(null);

                // $scope.isLoggedIn = false;
                $state.go("home");
            }
        }, function(err) {

        });
    };
    // console.log($state.current.name);
    // $scope.OutsideIndia = function () {
    //     if ($.jStorage.get("location") === "OutsideIndia") {} else {

    //         NavigationService.localCountry(function (data) {
    //             if (data.geoplugin_countryName !== "India") {
    //                 $scope.hello = $uibModal.open({
    //                     animation: true,
    //                     templateUrl: "views/modal/hello.html",
    //                     scope: $scope
    //                 });
    //             }
    //         });

    //     }
    // };

    // $scope.OutsideIndia();
    // $scope.saveOutsideIndia = function () {
    //     $.jStorage.set("location", "OutsideIndia");
    //     console.log("set", $.jStorage.get("location"));
    //     $scope.closeHello();
    // };
    // $scope.formData = {};
    // $scope.formComplete = false;
    // $scope.submitForm = function (formData) {
    //     NavigationService.saveCountry(formData, function (data) {
    //         console.log("data", data);
    //         if (data.value === true) {
    //             $scope.formComplete = true;
    //             $timeout(function () {
    //                 $scope.formComplete = false;
    //                 $scope.formData = {};
    //                 $scope.saveOutsideIndia();
    //             }, 2000);

    //         }
    //     })
    // }

    // $scope.closeHello = function () {
    //     console.log("aaaaaaaaa");
    //     $scope.hello.close();
    //     console.log("$scope.hello", $scope.hello);
    // };

    $scope.signUp = function() {
        $scope.loginmsg.msg = "";
        $scope.closeAllModals();
        modal1 = $uibModal.open({
            animation: true,
            templateUrl: "views/modal/signup.html",
            scope: $scope
        });
        console.log(modal1);
    };
    $scope.logIn = function() {
        $scope.loginmsg.msg = "";
        $scope.closeAllModals();
        modal3 = $uibModal.open({
            animation: true,
            templateUrl: "views/modal/login.html",
            scope: $scope
        });
    };

    $scope.emailSignup = function() {
        $scope.signup = {};
        $scope.IsHidden = false;
        $scope.loginmsg.msg = "";
        $scope.closeAllModals();
        modal2 = $uibModal.open({
            animation: true,
            templateUrl: "views/modal/email-signup.html",
            scope: $scope
        });
    };
    $scope.forgot = function() {
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
    };
    $scope.checkSession = function() {
        if ($.jStorage.get("userLoggedIn")) {
            $scope.isLoggedIn = true;
        } else {
            NavigationService.getProfile(function(response) {
                if (response.value) {
                    $scope.username = response.data.firstname;
                    $scope.isLoggedIn = true;
                    $.jStorage.set("userLoggedIn", true);
                } else {
                    $scope.isLoggedIn = false;
                }
                // TemplateService.removeLoader();
            }, function(err) {
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
    globalfunction.getCartCount = function() {
        NavigationService.getCart(function(data) {
            if (data.value == true) {
                $scope.cartcount = data.data.cartcount;
                $scope.cartProduct = data.data.cartproduct;
            } else {
                $scope.cartcount = 0;
            }
        }, function(err) {
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
    };

    // INTEGRATION CODE
    $scope.loginmsg = {};
    $scope.login = {};

    $scope.signup = {};
    // SIGNUP

    $scope.emailRegex = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
    $scope.validEmail = false;
    $scope.IsHidden = false;
    $scope.signUpNormal = function(emailSignupForm, signup) {
        if (emailSignupForm.$invalid) {
            $scope.validEmail = true;
        } else {
            console.log("im in else");
            $scope.loginmsg.msg = "";
            if ($scope.signup.password === $scope.signup.confirmpswd) {

                $scope.closeme = function() {
                    removemod.close();
                    $state.reload();
                };
                NavigationService.signUP($scope.signup, function(data) {
                    if (data.value) {
                        $scope.IsHidden = true;
                        $scope.otpdata = $scope.signup;
                        // $scope.closeAllModals();
                        // $scope.isLoggedIn = true;
                        // removemod = $uibModal.open({
                        //     animation: true,
                        //     templateUrl: "views/modal/verified.html",
                        //     scope: $scope
                        // });
                        // $state.reload();
                        // NavigationService.saveUser(data.data);
                    } else {
                        $scope.loginmsg.msg = data.data;
                        // $scope.loginmsg.msg = data.data;
                        $scope.loginmsg.class = "text-danger";
                    }
                }, function(err) {
                    console.log(err);
                })
            } else {
                $scope.loginmsg.msg = "Password And Confirm Password Should be same";
                $scope.loginmsg.class = "text-danger";
            }
        }

    }
    var count = 0;
    $scope.resendOTP = function() {
        var mobileno = $scope.otpdata.mobile;
        $scope.isDisabled = false;

        NavigationService.resendOTP(mobileno, function(data) {
            if (data.value == true) {
                console.log("done", data);
                count++;
                if (count == 3) {
                    $scope.isDisabled = true;
                    $scope.loginmsg.msg = "please try Later";
                }
                $scope.loginmsg.msg = data.data.message;
                $scope.loginmsg.class = "text-danger";
            } else {
                console.log(data.data.message);
                $scope.loginmsg.msg = data.data.message;
                $scope.loginmsg.class = "text-danger";
            }
        }, function(err) {
            console.log(err);
        });
    }
    $scope.checkOtp = function(data) {
            var senddata = {};
            senddata.otp = data.otp1;
            senddata.mobile = $scope.otpdata.mobile;
            console.log("chkotp", data)
            NavigationService.checkOtp(senddata, function(data) {
                if (data.value == true) {
                    console.log("done", data);
                    $scope.closeAllModals();
                    $scope.isLoggedIn = true;
                    // $state.reload();
                    if ($state.current.name === 'checkoutsignin') {
                        $state.go('address');
                    } else {
                        $scope.closeAllModals();
                        $scope.isLoggedIn = true;
                        removemod = $uibModal.open({
                            animation: true,
                            templateUrl: "views/modal/verified.html",
                            scope: $scope
                        });
                    }
                } else {
                    console.log(data.data.message);
                    $scope.loginmsg.msg = data.data.message;
                    $scope.loginmsg.class = "text-danger";
                }
            }, function(err) {
                console.log(err);
            });
        },
        $scope.goToFunction = function() {
            if ($state.current.name === 'checkoutsignin') {
                $state.go('address');
            } else {
                $.jStorage.set("userLoggedIn", true);
                $state.go('profile');
            }
        }
        // NORMAL LOGIN
    $scope.notFound = false;
    $scope.userLogin = function() {
        $scope.loginmsg.msg = "";

        NavigationService.login($scope.login, function(data) {
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
        }, function() {

        });
    };

    $scope.forgotPassword = function(mail) {
        NavigationService.forgotPassword(mail, function(data) {
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
    var checktwitter = function(data, status) {
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

    var callAtIntervaltwitter = function() {
        NavigationService.getProfile(checktwitter, function(err) {
            console.log(err);
        });
    };
    var authenticatesuccess = function(data, status) {
        $ionicLoading.hide();
        if (data.value) {
            $scope.closeAllModals();
            // $scope.isLoggedIn = true;
            // NavigationService.saveUser(data.data);
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
