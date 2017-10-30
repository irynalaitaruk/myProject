var app = angular.module("app",["ngRoute","ngDialog"]);

app.controller("myCtrl",function($scope){ });
                        
//directive of login
app.directive('loginBlock', function () {
    return {
        replace: true,
        templateUrl: 'template/login.html',
        controller: function($scope,$http,ngDialog){ 
            $scope.changePasswordStatus = false;
//Logout
            $scope.logOut = function () {
                $scope.newUser = true;
                $scope.enterLogin = false;
                localStorage.userName = "default";
                $scope.profileStatus = false;
            };
//Loading avtoriz user
            if (localStorage.userName == undefined) {
                localStorage.userName = "default";
            } else {
                if (localStorage.userName != "default") {
                    $scope.userIn = "Wellcome " + localStorage.userName + "!!!";
                    $scope.newUser = false;
                   
                    $scope.enterLogin = true;
                    $scope.user = "";
                    let loginObj = {
                        login: localStorage.userName
                    };
                    $http.post('http://localhost:8000/user-prof', loginObj)
                        .then(function successCallback(response) {
                    
                           if(response.data != "User profile is undefined"){
                                    $scope.userProfile = response.data;
                                    $scope.nameUserProfile = $scope.userProfile[0].name;
                                    $scope.snameUserProfile = $scope.userProfile[0].sname;
                                    $scope.dateUserProfile = $scope.userProfile[0].date;
                                    $scope.aboutUserProfile = $scope.userProfile[0].about;
                                    $scope.profileStatus = true;
                                }
                                else{
                                    console.log(response.data)
                                }

                        }, function errorCallback(response) {
                            console.log("Error!!!" + response.err);
                        });


                } else {
                    $scope.newUser = true;
                    $scope.enterLogin = false;
                }
            };
//Avtorization
            $scope.check = function () {
                let loginObj = {
                    login: $scope.login,
                    password: $scope.password
                };
                $http.post('http://localhost:8000/login-auth', loginObj)
                    .then(function successCallback(response) {
                        if (response.data == "welcome") {
                            $scope.userIn = "Wellcome " + $scope.login + "!!!";
                            $scope.newUser = false;
                            $scope.enterLogin = true;
                            $scope.user = "";
                            localStorage.userName = $scope.login;

                            let loginObj = {
                                login: localStorage.userName
                            };
                            $http.post('http://localhost:8000/user-prof', loginObj)
                                .then(function successCallback(response) {
                                
                                if(response.data != "User profile is undefined"){
                                    $scope.userProfile = response.data;
                                    $scope.nameUserProfile = $scope.userProfile[0].name;
                                    $scope.snameUserProfile = $scope.userProfile[0].sname;
                                    $scope.dateUserProfile = $scope.userProfile[0].date;
                                    $scope.aboutUserProfile = $scope.userProfile[0].about;
                                    $scope.profileStatus = true;
                                }
                                else{
                                    console.log(response.data)
                                }

                                }, function errorCallback(response) {
                                    console.log("Error!!!" + response.err);
                                });
                        } else {
                            $scope.user = response.data;
                        };
                    }, function errorCallback(response) {
                        console.log("Error!!!" + response.err);
                    });
            };
//Registration
            $scope.registr = function () {
                let loginObj = {
                    login: $scope.login,
                    password: $scope.password
                };
                $http.post('http://localhost:8000/login-reg', loginObj)
                    .then(function successCallback(response) {
                        $scope.user = response.data;
                        $http.get('http://localhost:8000/users')
                            .then(function successCallback(response) {
                                $scope.arrUsers = response.data;
                            }, function errorCallback(response) {
                                console.log("Error!!!" + response.err);
                            });
                    }, function errorCallback(response) {
                        console.log("Error!!!" + response.err);
                    });
            };
            
//Change password
    $scope.changePassword = function (index,login,password) {
        ngDialog.open({
            template: '/template/changePass.html',
            scope: $scope,
            controller: function($scope){
                     $scope.indexChangeItem = index;
                      $scope.editLog = login; 
                      $scope.editPass = password 
                
                
     $scope.editpass = function () {
        let itemObj = {
            login: $scope.editLog,
            password: $scope.editPass,
            id: $scope.indexChangeItem
        };
        $http.post('http://localhost:8000/pass-change', itemObj)
            .then(function successCallback(response) {
            ngDialog.closeAll();
            }, function errorCallback(response) {
                console.log("Error!!!" + response.err);
            });
         };
      }
  })
        .closePromise.then(function(res){
            $http.get('http://localhost:8000/users')
            .then(function successCallback(response) {
                $scope.users = response.data;
           }, function errorCallback(response) {
             console.log("Error!!!" + response.err);
            }); 
        });

    }
            
                        
//                
        }   
    }
});


//directive of profile
app.directive('profileBlock', function () {
    return {
        replace: true,
        templateUrl: 'template/profile.html',
        controller: function ($scope) {}
    }
});
    
//directive of slider
app.directive("slideBlock",function(){
	return{
		replace: true,
		templateUrl:"template/slider.html",
		controller: function($scope){
        $(document).ready(function () {
  
	var imgCount = $('.imgs').length;
	var imgWidth = $('.imgs').width();
	var imgHeight = $('.imgs').height();
	var sliderWidth = imgCount * imgWidth;
    var btnId = 0;
    var slideNow = 1;
    var translateWidth = 0;
	
	$('#box').css({ width: imgWidth, height: imgHeight });
	
	$('#slider').css({ width: sliderWidth, marginLeft: -imgWidth });
	
    $('.imgs:last-child').prependTo('#slider');

    function moveRight() {
        $('#slider').animate({
            left: + imgWidth
        }, 1000, function () {
            $('.imgs:last-child').prependTo('#slider');
            $('#slider').css('left', '');
        });
    };

    function moveLeft() {
        $('#slider').animate({
            left: - imgWidth
        }, 1000, function () {
            $('.imgs:first-child').appendTo('#slider');
            $('#slider').css('left', '');
        });
    };

    
     var x = setInterval(function () {
        moveLeft();
    }, 3000);
    
    $('#box').hover(function(){
        clearInterval(x);
    },function(){
        x = setInterval(function(){
            moveLeft();
        },3000);
    }) 
    
    
    $('a.previous').click(function () {
        moveLeft();
    });

    $('a.next').click(function () {
        moveRight();
    });
    
    //buttons
      $('.btn').click(function () {
        btnId = $(this).index();

        if (btnId + 1 != slideNow) {
            translateWidth = -$('#box').width() * (btnId);
            $('#slider').css({
                'transform': 'translate(' + translateWidth + 'px, 0)'
            });
            slideNow = btnId + 1;
        }
        
    });
//text
 $('.img1').mouseover(function(){
     $('#txt1').css({display:'block',transform:'rotate(-15deg)'}).animate({fontSize: '54px'});
 });
     $('.img1').mouseout(function(){
     $('#txt1').css('display','none')
 });
    
 $('.img2').mouseover(function(){
     $('#txt2').css({display:'block',transform:'rotate(-15deg)'}).animate({fontSize: '54px'});
 });
     $('.img2').mouseout(function(){
     $('#txt2').css('display','none')
 });
    
     $('.img3').mouseover(function(){
     $('#txt3').css({display:'block',transform:'rotate(-15deg)'}).animate({fontSize: '54px'});
 });
     $('.img3').mouseout(function(){
     $('#txt3').css('display','none')
 });
    
     $('.img4').mouseover(function(){
     $('#txt4').css({display:'block',transform:'rotate(-15deg)'}).animate({fontSize: '54px'});
 });
     $('.img4').mouseout(function(){
     $('#txt4').css('display','none')
 });
    
     $('.img5').mouseover(function(){
     $('#txt5').css({display:'block',transform:'rotate(-15deg)'}).animate({fontSize: '54px'});
 });
     $('.img5').mouseout(function(){
     $('#txt5').css('display','none')
 });
    
     $('.img6').mouseover(function(){
     $('#txt6').css({display:'block',transform:'rotate(-15deg)'}).animate({fontSize: '54px'});
 });
     $('.img6').mouseout(function(){
     $('#txt6').css('display','none')
 });
    
     $('.img7').mouseover(function(){
     $('#txt7').css({display:'block',transform:'rotate(-15deg)'}).animate({fontSize: '54px'});
 });
     $('.img7').mouseout(function(){
     $('#txt7').css('display','none')
 });
   
});               
        
     }
	}
})

//directive of menu
app.directive("menuBlock",function(){
    return{
        replace: true,
        templateUrl: "template/menu.html",
        controller: function($scope){
            $scope.arr = [{
    title: "Italy",
    text:"Italy, a European country with a long Mediterranean coastline, has left a powerful mark on Western culture and cuisine. Its capital, Rome, is home to the Vatican as well as landmark art and ancient ruins. Other major cities include Florence, with Renaissance masterpieces such as Michelangelo’s 'David' and Brunelleschi's Duomo; Venice, the city of canals; and Milan, Italy’s fashion capital."
},{
    title: "Hungary",
    text:"Hungary is a landlocked country in Central Europe. Its capital, Budapest, is bisected by the Danube River. Its cityscape is studded with architectural landmarks from Buda’s medieval Castle Hill and grand neoclassical buildings along Pest’s Andrássy Avenue to the 19th-century Chain Bridge. Turkish and Roman influence on Hungarian culture includes the popularity of mineral spas, including at thermal Lake Hévíz."
             },{ 
    title: "Greece",
    text:"Greece is a country in southeastern Europe with thousands of islands throughout the Aegean and Ionian seas. Influential in ancient times, it's often called the cradle of Western civilization. Athens, its capital, retains landmarks including the 5th-century B.C. Acropolis citadel with the Parthenon temple. Greece is also known for its beaches, from the black sands of Santorini to the party resorts of Mykonos"
             },{
    title: "Bulgaria",
    text:"Bulgaria is a Balkan nation with diverse terrain encompassing Black Sea coastline, a mountainous interior and rivers, including the Danube. A cultural melting pot with Greek, Slavic, Ottoman, and Persian influences, it has a rich heritage of traditional dance, music, costumes, and crafts. At the foot of domed Vitosha mountain is its capital city, Sofia, dating to the 5th century B.C."  
    },{
    title: "Egypt",
    text:"Egypt, a country linking northeast Africa with the Middle East, dates to the time of the pharaohs. Millennia-old monuments sit along the fertile Nile River Valley, including Giza's colossal Pyramids and Great Sphinx as well as Luxor's hieroglyph-lined Karnak Temple and Valley of the Kings tombs. The capital, Cairo, is home to Ottoman landmarks like Muhammad Ali Mosque and the Egyptian Museum, a trove of antiquities."
    },{
    title: "Croatia",
    text:"Croatia is an Eastern European country with a long coastline on the Adriatic Sea. Encompassing more than a thousand islands, it's also crossed by the Dinaric Alps. Its inland capital, Zagreb, is distinguished by its medieval Gornji Grad (Upper Town) and diverse museums. The major coastal city Dubrovnik has massive 16th-century walls encircling an Old Town with Gothic and Renaissance buildings"
    },{
    title: "Montenegro",
    text:"Montenegro is a Balkan country with rugged mountains, medieval villages and a narrow strip of beaches along its Adriatic coastline. The Bay of Kotor, resembling a fjord, is dotted with coastal churches and fortified towns such as Kotor and Herceg Novi. Durmitor National Park, home to bears and wolves, encompasses limestone peaks, glacial lakes and 1,300m-deep Tara River Canyon."
    }];
                
                $scope.home = true;
                $scope.blog = true;
                $scope.contact = true;
                $scope.slider = true;
                $scope.inputFilter = false;
                $scope.adres = true;
                $scope.loginRow = false;
                $scope.loginRow = false;
                $scope.shopblock = false;
            
        $scope.blogStatus = function(){
            $scope.blog = false;
            $scope.slider = false;
            $scope.inputFilter = true;
            $scope.adres = true;
            $scope.loginRow = false;
            $scope.shopblock = false;
           }
        
         $scope.homeStatus = function(){
            $scope.blog = true;
            $scope.slider = true; 
            $scope.contact = true;
            $scope.inputFilter = false;
            $scope.adres = true;
            $scope.loginRow = false;
            $scope.shopblock = false;
           }
          $scope.contactStatus = function(){
            $scope.blog = true;
            $scope.slider = false; 
            $scope.contact = true;
            $scope.inputFilter = false;
            $scope.adres = false;
            $scope.loginRow = false;
            $scope.shopblock = false;
           }
          $scope.loginStatus = function(){
            $scope.loginRow = true;
            $scope.blog = true;
            $scope.slider = false; 
            $scope.contact = true;
            $scope.inputFilter = false;
            $scope.adres = true;
            $scope.shopblock = false;
          }
          $scope.shopStatus = function(){
                $scope.shopblock = true;
                $scope.blog = true;
                $scope.contact = true;
                $scope.slider = false;
                $scope.inputFilter = false;
                $scope.adres = true;
                $scope.loginRow = false;
                $scope.loginRow = false;
          }
        
        }
    }
})

//directive of contacts
app.directive("contactBlock",function(){
    return{
    replace: true,
    templateUrl: "template/contacts.html",
    controller: function($scope){}
    }
})


//directive of shop
app.directive("shopBlock",function(){
    return{
    replace: true,
    templateUrl: "template/shop.html",
    controller: function($scope,$http,ngDialog){
            $scope.items = [];
            $scope.hats = [];
            $scope.mainItems = true;
            $scope.hatItems = true;
    
//get list of items
$http.get('http://localhost:8000/items') 
.then(function successCallback(response){
    $scope.items = response.data;
    },function errorCallback(response) {
        console.log("Error!!!" + response.err);
            }); 

//get list of hats
$http.get('http://localhost:8000/hats') 
.then(function successCallback(response){
    $scope.hats = response.data;
    },function errorCallback(response) {
        console.log("Error!!!" + response.err);
            });
//
 $scope.brandInform = false;
        //get bag brand
        $scope.checkBrand = function () {
                let brandObj = {
                    name: $scope.name
                };
               
                     $http.post('http://localhost:8000/brand-inf', brandObj)
                    .then(function successCallback(response) {
                         $scope.brandProfile = response.data;
                         $scope.brandName = $scope.brandProfile[0].name;
                         $scope.brandPrice = $scope.brandProfile[0].price;
                         $scope.brandImage = $scope.brandProfile[0].image;
                         $scope.brandInform = true;
                         $scope.brandHatInform = false;
                         $scope.mainItems = false;
                         $scope.hatItems = false;
                    }, function errorCallback(response) {
                        console.log("Error!!!" + response.err);
                    });
            }
        //get hat brand
                $scope.checkhatBrand = function () {
                let brandhatObj = {
                    name: $scope.name
                };
               
                     $http.post('http://localhost:8000/brandhat-inf', brandhatObj)
                    .then(function successCallback(response) {
                         $scope.brandHatProfile = response.data;
                         $scope.brandHatName = $scope.brandHatProfile[0].name;
                         $scope.brandHatPrice = $scope.brandHatProfile[0].price;
                         $scope.brandHatImage = $scope.brandHatProfile[0].image;
                         $scope.brandHatInform = true;
                         $scope.brandInform = false;
                         $scope.hatItems = false;
                          $scope.mainItems = false;
                    }, function errorCallback(response) {
                        console.log("Error!!!" + response.err);
                    });
            }
        
//ngDialog
    $scope.buy = function (name, price) {
        ngDialog.open({
            template: '/template/newItem.html',
            scope: $scope,
            controller: function($scope){
                
            ngDialog.closeAll();
      }
  })
        .closePromise.then(function(res){
            $http.get('http://localhost:8000/items')
            .then(function successCallback(response) {
                $scope.items = response.data;
           }, function errorCallback(response) {
             console.log("Error!!!" + response.err);
            }); 
        });

    }
        
   //
    $scope.brand = false;
    $scope.mainItems = true;
    $scope.hatItems = true;
$scope.brands = function(){
    $scope.brand = true;
}
$scope.bags = function(){
    $scope.mainItems = true;
    $scope.hatItems = false;
    $scope.brandInform = false;
    $scope.brandHatInform = false;
}
$scope.hat = function(){
    $scope.mainItems = false;
    $scope.hatItems = true;
    $scope.brandInform = false;
    $scope.brandHatInform = false;
}

        
        //
        
      }
    }
})

//directive of helpButton
app.directive("helpBlock",function(){
    return{
    replace: true,
    templateUrl: "template/help.html",
    controller: function($scope){
        $scope.chatric = false;
        $scope.hideDiv = false;
        $scope.helpBtn = true;
        
        $scope.helpButton = function(){
            $scope.chatric = true;
            $scope.hideDiv = true;
            $scope.helpBtn = false;
      };
        $scope.hideChat = function(){
            $scope.chatric = false;
            $scope.hideDiv = false;
            $scope.helpBtn = true;
        }
     }
    }
})
 
//directive of chat
var modelDate = new Date();
var model = "Anonim";
app.directive('chatBlock', function () {
    return {
        replace: true,
        templateUrl:'template/chat.html' ,
        controller: function ($scope) {
        $scope.dt = false;
            
            $scope.arrText = [];
            $scope.name = model;
            $scope.date = modelDate;
            
          $scope.sendName = function(){
             $scope.name = $scope.enterName;
             $scope.enterName = "";
          };
            
          $scope.sendText = function(a){
            $scope.arrText.push(a); 
            $scope.enterText = "";
            $scope.dt = true;
            }
            
        }
    }
    })