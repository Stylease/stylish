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
      anchor: "home"
    },
     {
      name: "Occasion",
      classis: "active",
      anchor: "occasion",
      subnav: [
        {
        name: "Wedding",
        classis: "active",
        link: "#/wedding"
      },
      {
        name: "Sangeet",
        classis: "active",
        link: "#/Sangeet"
      },
      {
        name: "Mehendi",
        classis: "active",
        link: "#/mehendi"
      },
      {
        name: "Cocktail",
        classis: "active",
        link: "#/cocktail"
      },
      {
        name: "Reception",
        classis: "active",
        link: "#/reception"
      },
      {
        name: "Engagement",
        classis: "active",
        link: "#/engagement"
      }
    ]
    }, {
      name: "Accessories",
      classis: "active",
      anchor: "accessories",
      subnav: [
        {
        name: "Bags",
        classis: "active",
        link: "#/bags"
      },
        {
        name: "Jewellery",
        classis: "active",
        link: "#/jewellery"
      },
    ]
    }, {
      name: "Celebrities Choice",
      classis: "active",
      anchor: "celebritieschoice"
    }, {
      name: "Media",
      classis: "active",
      anchor: "Media"
    }, {
      name: "Contact Us",
      classis: "active",
      anchor: "contactus"
    }, {
      name: "Help",
      classis: "active",
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
        name: "Terms &amp; Conditions",
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
