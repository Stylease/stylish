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
            subnav: []
        }, {
            name: "Accessories",
            classis: "active",
            disabled: false,
            anchor: "accessories",
            subnav: [{
                name: "Bags",
                classis: "active",
                link: "product"
            }, {
                name: "Jewellery",
                classis: "active",
                link: "product"
            }, ]
        }, {
            name: "Celebrities Choice",
            classis: "active",
            disabled: true,
            anchor: "celebritychoice"
        }, {
            name: "Media",
            classis: "active",
            disabled: true,
            anchor: "Media"
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
                name: "FAQ's",
                classis: "active",
                link: "#/faq"
            }, {
                name: "How it works",
                classis: "active",
                link: "#/how-it-works"
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
            var subnavGen = [];
            var subnavGen1 = [];
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
                        } else {
                            subnavGen1.push({
                                name: key.name,
                                classis: "active",
                                link: "product({name:'" + key.name + "'})"
                            });
                        }

                    });
                    navigation[1].subnav = subnavGen1;
                    navigation[2].subnav = subnavGen;
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
                'color': request.color
            };
            return $http({
                url: adminURL + "product/getProductByCat",
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
        getSubcategory: function(callback, errCallback) {
            return $http({
                url: adminURL + "subcategory/getAllCat",
                method: "POST"
            }).success(callback).error(errCallback);
        },
        getColor: function(callback, errCallback) {
            return $http({
                url: adminURL + "color/getAll",
                method: "POST"
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
        getOneProduct: function(request, callback, errCallback) {
            return $http({
                url: adminURL + "product/getOne",
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
            $.jStorage.flush();
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
        getcart: function(callback) {
            return $http({
                url: adminURL + "cart/getcart",
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
        getWishlistUser: function(callback) {
            $http.post(adminURL + "wishlist/getWishlistUser", {}).success(callback);
        },
        deleteWishlist: function(id, callback) {
            $http.post(adminURL + "wishlist/delete", {
                _id: id
            }).success(callback);
        },
        changePassword: function(data, callback) {
            $http.post(adminURL + "user/changePassword", data).success(callback);
        },

    };
});
