var adminURL = "";
if (isproduction) {
  adminURL = "http://www.wohlig.co.in/demo/index.php";
} else {
  adminURL = "http://localhost/demo/index.php";
}

var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function() {
  var navigation = [
    {
      name: "Home",
      classis: "active",
      disabled:true,
      anchor: "home"
    },
    {
      name: "Dresses",
      classis: "active",
      disabled:false,
      anchor: "dresses",
      subnav: [
      {
        name: "Lehengas",
        classis: "active",
        link: "product"
      },
      {
        name: "Sarees",
        classis: "active",
        link: "product"
      },
      {
        name: "Jumpsuit",
        classis: "active",
        link: "product"
      },
      {
        name: "Anakalis",
        classis: "active",
        link: "product"
      },
      {
        name: "Gown",
        classis: "active",
        link: "product"
      }
      ]
    },
     {
      name: "Occasion",
      classis: "active",
      disabled:false,
      anchor: "occasion",
      subnav: [
        {
        name: "Wedding",
        classis: "active",
        link: "product"
      },
      {
        name: "Sangeet",
        classis: "active",
        link: "product"
      },
      {
        name: "Mehendi",
        classis: "active",
        link: "product"
      },
      {
        name: "Cocktail",
        classis: "active",
        link: "product"
      },
      {
        name: "Reception",
        classis: "active",
        link: "product"
      },
      {
        name: "Engagement",
        classis: "active",
        link: "product"
      }
    ]
    }, {
      name: "Accessories",
      classis: "active",
      disabled:false,
      anchor: "accessories",
      subnav: [
        {
        name: "Bags",
        classis: "active",
        link: "product"
      },
        {
        name: "Jewellery",
        classis: "active",
        link: "product"
      },
    ]
    }, {
      name: "Celebrities Choice",
      classis: "active",
      disabled:true,
      anchor: "celebritychoice"
    }, {
      name: "Media",
      classis: "active",
      disabled:true,
      anchor: "Media"
    }, {
      name: "Contact Us",
      classis: "active",
      disabled:true,
      anchor: "contactus"
    }, {
      name: "Help",
      classis: "active",
      disabled:false,
      anchor: "help",
      subnav: [
        {
        name: "FAQ's",
        classis: "active",
        link: "#/faq"
      },
        {
        name: "How it works",
        classis: "active",
        link: "#/how-it-works"
      },
        {
        name: "Terms & Conditions",
        classis: "active",
        link: "#/termsconditions"
      },
        {
        name: "Privacy Policy",
        classis: "active",
        link: "#/privacypolicy"
      }
    ]
    }

  ];

  return {
    getnav: function() {
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

  };
});
