// var adminURL = "http://104.199.151.75/";
if (isproduction) {
    adminURL = "http://www.wohlig.co.in/demo/index.php";
} else {
    adminURL = "http://192.168.1.122:1337/";
}

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
                // subnav: [{
                //     name: "Lehengas",
                //     classis: "active",
                //     link: "product"
                // }, {
                //     name: "Sarees",
                //     classis: "active",
                //     link: "product"
                // }, {
                //     name: "Jumpsuit",
                //     classis: "active",
                //     link: "product"
                // }, {
                //     name: "Anakalis",
                //     classis: "active",
                //     link: "product"
                // }, {
                //     name: "Gown",
                //     classis: "active",
                //     link: "product"
                // }]
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
            anchor: "contactus"
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
                link: "#/termsconditions"
            }, {
                name: "Privacy Policy",
                classis: "active",
                link: "#/privacypolicy"
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
                console.log(data.data);
                if (data) {

                    _.each(data.data, function(key) {

                        if (key.category.name == 'Occasion') {
                            console.log("oc");
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
                    navigation[1].subnav = subnavGen;
                    navigation[2].subnav = subnavGen1;
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
                'pagesize': 5
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
        getSubcategory: function(callback, errCallback) {
            return $http({
                url: adminURL + "subcategory/getAllCat",
                method: "POST"
            }).success(callback).error(errCallback);
        },

    };
});
