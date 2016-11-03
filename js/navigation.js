var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function($http) {
    var navigation = [{
            name: "Home",
            classis: "active",
            disabled: true,
            anchor: "home"
        }, {
            name: "Dresses",
            classis: "active",
            disabled: false,
            anchor: "dresses",
            subnav: []
        }, {
            name: "Occasion",
            classis: "active",
            disabled: false,
            anchor: "occasion",
            subnav: [{
                name: "All",
                classis: "active",
                link: ""
            }]
        }, {
            name: "Accessories",
            classis: "active",
            disabled: false,
            anchor: "accessories",
            subnav: [{
                name: "All",
                classis: "active",
                link: ""
            }]
        }
        // , {
        //     name: "Celebrities Choice",
        //     classis: "active",
        //     disabled: true,
        //     anchor: "celebritychoice"
        // }
        // , {
        //     name: "Media",
        //     classis: "active",
        //     disabled: true,
        //     anchor: "Media"
        // }
        , {
            name: "About",
            classis: "active",
            disabled: true,
            anchor: "about-us",
            subnav: []

        }, {
            name: "Contact Us",
            classis: "active",
            disabled: true,
            anchor: "contact"
        }, {
            name: "Help",
            classis: "active",
            disabled: false,
            anchor: "help",
            subnav: [{
                name: "Cancellation Policy",
                classis: "active",
                link: "cancellation-policy"
            }, {
                name: "Return Policy",
                classis: "active",
                link: "return-policy"
            }, {
                name: "Terms & Conditions",
                classis: "active",
                link: "terms-condition"
            }, {
                name: "Privacy Policy",
                classis: "active",
                link: "privacy-policy"
            }]
        }

    ];

    return {
        getnav: function() {
            var subnavGen = [{
                name: "All",
                classis: "active",
                // link: "product({name:'All'})"
                link: "product({name:'Occasion'})"
            }];
            var subnavGen1 = [{
                name: "All",
                classis: "active",
                link: "product({name:'Dresses'})"
                    // link: "product({name:'All'})"

            }];
            var subnavGen2 = [{
                name: "All",
                classis: "active",
                link: "product({name:'Accessories'})"
                    // link: "product({name:'All'})"

            }];
            $http({
                url: adminURL + 'subcategory/getAllCat',
                method: "POST"
            }).success(function(data) {
                if (data) {

                    _.each(data.data, function(key) {
                        if (key.category.name == 'Occasion') {
                            // console.log("oc");
                            subnavGen.push({
                                name: key.name,
                                classis: "active",
                                link: "product({name:'" + key.name + "'})"
                            });
                        } else if (key.category.name == 'Dresses') {
                            subnavGen1.push({
                                name: key.name,
                                classis: "active",
                                link: "product({name:'" + key.name + "'})"
                            });
                        } else {
                            subnavGen2.push({
                                name: key.name,
                                classis: "active",
                                link: "product({name:'" + key.name + "'})"
                            });
                        }

                    });
                    navigation[1].subnav = subnavGen1;
                    navigation[2].subnav = subnavGen;
                    navigation[3].subnav = subnavGen2;
                }
            });
            return navigation;
        },
        makeactive: function(menuname) {
            for (var i = 0; i < navigation.length; i++) {
                if (navigation[i].name == menuname) {
                    navigation[i].classis = "active";
                } else {
                    navigation[i].classis = "";
                }
            }
            return menuname;
        },
        getProduct: function(request, callback, errCallback) {
            var filter = {
                'subcategory': request.subcategory,
                'pricefrom': request.pricefrom,
                'priceto': request.priceto,
                'size': request.size,
                'pagenumber': request.pagenumber,
                'pagesize': 5,
                'color': request.color,
                'sort': request.sort
            };
            return $http({
                url: adminURL + "product/getProductByCat",
                method: "POST",
                data: filter
            }).success(callback).error(errCallback);
        },
        getOrders: function(request, callback, errCallback) {
            var filter = {
                'pagenumber': request.pagenumber,
                'pagesize': 5
            };
            return $http({
                url: adminURL + "order/getLimitedByUser",
                method: "POST",
                data: filter
            }).success(callback).error(errCallback);
        },
        getProductDetail: function(productid, callback, errCallback) {
            var data = {
                '_id': productid
            };
            return $http({
                url: adminURL + "product/getProductById",
                method: "POST",
                data: data
            }).success(callback).error(errCallback);
        },
        addToCart: function(cartpro, callback, errCallback) {
            var data = cartpro;
            return $http({
                url: adminURL + "cart/save",
                method: "POST",
                data: data
            }).success(callback).error(errCallback);
        },
        editAllCart: function(cartpro, callback, errCallback) {
            console.log("cartproducts", cartpro);
            var data = cartpro;
            return $http({
                url: adminURL + "cart/updateCartDate",
                method: "POST",
                data: data
            }).success(callback).error(errCallback);
        },
        getSubcategory: function(callback, errCallback) {
            return $http({
                url: adminURL + "subcategory/getAllCat",
                method: "POST"
            }).success(callback).error(errCallback);
        },
        forgotPassword: function(data, callback) {
            var data = {
                'email': data
            };
            return $http({
                url: adminURL + "user/forgotPassword",
                method: "POST",
                data: data
            }).success(callback);
        },
        getProductSort: function(callback, errCallback) {
            return $http({
                url: adminURL + "productsort/getall",
                method: "POST"
            }).success(callback).error(errCallback);
        },
        getSlider: function(callback) {
            return $http({
                url: adminURL + "slider/getAll",
                method: "POST"
            }).success(callback);
        },
        getTestimonial: function(callback) {
            return $http({
                url: adminURL + "testimonial/getAll",
                method: "POST"
            }).success(callback);
        },
        getColor: function(callback, errCallback) {
            return $http({
                url: adminURL + "color/getAll",
                method: "POST"
            }).success(callback).error(errCallback);
        },
        checkOtp: function(data, callback, errCallback) {
            return $http({
                url: adminURL + "user/checkOtp",
                method: "POST",
                data: data
            }).success(callback).error(errCallback);
        },
        resendOTP: function(data, callback, errCallback) {
            return $http({
                url: adminURL + "user/resendotp",
                method: "POST",
                data: {
                    mobile: data
                }
            }).success(callback).error(errCallback);
        },
        signUP: function(data, callback, errCallback) {
            console.log(data);
            return $http({
                url: adminURL + "user/register",
                method: "POST",
                data: data
            }).success(callback).error(errCallback);
        },
        getProfile: function(callback, errCallback) {
            return $http({
                url: adminURL + "user/profile",
                method: "POST"
            }).success(callback).error(errCallback);
        },
        getCart: function(callback, errCallback) {
            return $http({
                url: adminURL + "cart/getCart",
                method: "POST"
            }).success(callback).error(errCallback);
        },
        getProductTimes: function(callback, errCallback) {
            return $http({
                url: adminURL + "producttime/getAll",
                method: "POST"
            }).success(callback).error(errCallback);
        },
        emptyCart: function(callback) {
            return $http({
                url: adminURL + "cart/emptyCart",
                method: "POST"
            }).success(callback);
        },
        getOneProduct: function(request, callback, errCallback) {
            return $http({
                url: adminURL + "product/getOneProduct",
                method: "POST",
                data: {
                    _id: request
                }
            }).success(callback).error(errCallback);
        },
        // getSession: function(callback, errCallback) {
        //     return $http({
        //         url: adminURL + "user/getProfile",
        //         method: "POST"
        //     }).success(callback).error(errCallback);
        // },
        login: function(data, callback, errCallback) {
            console.log(data);
            return $http({
                url: adminURL + "user/login",
                method: "POST",
                data: data
            }).success(callback).error(errCallback);
        },
        logout: function(callback, errCallback) {
            // $.jStorage.flush();
            $.jStorage.set("userData");
            $.jStorage.set("cartDate");
            $.jStorage.set("user");
            $.jStorage.set("userLoggedIn", false);
            return $http({
                url: adminURL + "user/logout",
                method: "POST",
            }).success(callback).error(errCallback);
        },
        saveUser: function(data) {
            $.jStorage.set("user", data);
        },
        getStoredUser: function() {
            return $.jStorage.get("user");
        },
        saveWishlist: function(id, callback) {
            var data = {
                product: id
            };
            return $http({
                url: adminURL + "wishlist/save",
                method: "POST",
                data: data
            }).success(callback);
        },
        saveContact: function(request, callback) {
            console.log(request);
            return $http({
                url: adminURL + "contact/save",
                method: "POST",
                data: request
            }).success(callback);
        },
        saveCountry: function(formData, callback) {

            return $http({
                url: adminURL + "country/save",
                method: "POST",
                data: formData
            }).success(callback);
        },
        getOrderDetail: function(id, callback) {
            // var data = {
            //     product: id
            // };
            return $http({
                url: adminURL + "order/getOne",
                method: "POST",
                data: {
                    _id: id
                }
            }).success(callback);
        },
        toPaymentGateway: function(data, callback) {
            console.log(data);
            return $http({
                url: window.location.origin + "/payu/payment.php",
                method: "POST",
                data: data
            }).success(callback);
        },
        getOrderById: function(id, callback) {
            // var data = {
            //     product: id
            // };
            return $http({
                url: adminURL + "order/getOrderById",
                method: "POST",
                data: {
                    orderid: id
                }
            }).success(callback);
        },
        getcart: function(callback) {
            return $http({
                url: adminURL + "cart/getcart",
                method: "POST"
            }).success(callback);
        },
        checkoutCheck: function(callback) {
            return $http({
                url: adminURL + "cart/checkoutCheck",
                method: "POST"
            }).success(callback);
        },
        getSize: function(callback) {
            return $http({
                url: adminURL + "size/getAll",
                method: "POST"
            }).success(callback);
        },

        removeFromCart: function(id, callback) {
            var data = {
                product: id
            };
            return $http({
                url: adminURL + "cart/removeCart",
                method: "POST",
                data: data
            }).success(callback);
        },
        userProfileSave: function(data, callback) {
            $http.post(adminURL + "user/save", data).success(callback);
        },
        goToPayment: function(data, callback) {
            $http.get(adminURL + "payu/payU?_id=" + data).success(callback);
        },
        placeOrder: function(data, callback) {
            $http.post(adminURL + "order/save", data).success(callback);
        },
        checkCoupon: function(data, callback) {
            $http.post(adminURL + "coupon/checkCoupon", data).success(callback);
        },
        getWishlistUser: function(callback) {
            $http.post(adminURL + "wishlist/getWishlistUser", {}).success(callback);
        },
        deleteWishlist: function(id, callback) {
            $http.post(adminURL + "wishlist/delete", {
                _id: id
            }).success(callback);
        },
        deleteWishlistByProduct: function(product, callback) {
            $http.post(adminURL + "wishlist/deleteByUser", {
                product: product
            }).success(callback);
        },
        changePassword: function(data, callback) {
            $http.post(adminURL + "user/changePassword", data).success(callback);
        },
        getCelebrity: function(request, callback) {

            $http({
                url: adminURL + 'celebritychoice/getLimited',
                method: 'POST',
                withCredentials: true,
                data: request
            }).success(callback);
        },

        localCountry: function(callback) {
            $.getJSON("http://www.geoplugin.net/json.gp?jsoncallback=?", callback);
        },

    };
});
