var app = angular.module("app",["ngRoute"]);

/*test test test */
    
app.controller("myCtrl",function($scope){ });
                        
//directive of login
app.directive('loginBlock', function () {
    return {
        replace: true,
        templateUrl: 'template/login.html',
        controller: function($scope,$http){ 
//avtorization
                $scope.check = function () {
                let loginObj = {
                    login: $scope.login,
                    password: $scope.password
                };
                $http.post('http://localhost:8000/login', loginObj)
                    .then(function successCallback(response) {
//                     console.log("Welcome " + $scope.login);
                    if ($scope.login == "admin") {  
                        $scope.loginRow = false;
                        $scope.loginWelcome = true;
                        $scope.wrongLogPass = false;
                        $scope.reg = false;
                }
                    else{
//                        console.log("Wrong login or password!!!")
                        $scope.wrongLogPass = true;
                        $scope.loginRow = false;
                        $scope.loginWelcome = false;
                        $scope.reg = false;
                    }
                    
                    }, function errorCallback(response) {
                        console.log("Error!!!" + response.err);
                    });
           
            
        
                    $http.post('http://localhost:8000/user-prof', loginObj)
                    .then(function successCallback(response) {
                        $scope.userProfile = response.data;
                         $scope.nameUser = $scope.userProfile[0].name;
                         $scope.surnameUser = $scope.userProfile[0].sname;
                         $scope.dateUser = $scope.userProfile[0].date;
                         $scope.aboutUser = $scope.userProfile[0].about;
                    
                    }, function errorCallback(response) {
                        console.log("Error!!!" + response.err);
                    });
      };
                   
            
            
            $scope.error = function(){
                $scope.wrongLogPass = false;
            }
                        
//registration
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
                console.log("Registered!!!");
                    $scope.reg = true;
                }, function errorCallback(response) {
                        console.log("Error!!!" + response.err);
                            });
                    }, function errorCallback(response) {
                        console.log("Error!!!" + response.err);
                    });
            };                     
//exit
    $scope.exit = function(){
        $scope.login = "";
        $scope.password = "";
        $scope.reg = false
    }

           
            
//                
        }   
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
          
          $scope.welcome = function(){
              $scope.loginWelcome = false;
          }
        }
    }
})

//directive of contacts
app.directive("contactBlock",function(){
    return{
    replace: true,
    templateUrl: "template/contacts.html"
//    controller: function($scope){}
    }
})


//directive of shop
app.directive("shopBlock",function(){
    return{
    replace: true,
    templateUrl: "template/shop.html",
    controller: function($scope,$http){
            $scope.items = [];
    
//get list of items
$http.get('http://localhost:8000/items') 
.then(function successCallback(response){
    $scope.items = response.data;
    },function errorCallback(response) {
        console.log("Error!!!" + response.err);
            }); 


        //get brand
        $scope.checkBrand = function () {
                let brandObj = {
                    name: $scope.name
                };
               
                     $http.post('http://localhost:8000/brand-inf', brandObj)
                    .then(function successCallback(response) {
                         $scope.brandProfile = response.data;
                         $scope.brandName = $scope.brandProfile[0].name;
                         $scope.brandInform = true;                    
                    }, function errorCallback(response) {
                        console.log("Error!!!" + response.err);
                    });
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
//        $scope.loginRow = false;
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
//        $scope.loginRow = false;
        $scope.dt = false;
            
            $scope.arrText = [];
//            $scope.arrName = [{
//                name: "Anonim"
//            }];
            $scope.name = model;
            $scope.date = modelDate;
            
          $scope.sendName = function(){
             $scope.name = $scope.enterName;
             $scope.enterName = "";
          };
            
          $scope.sendText = function(a){
            $scope.arrText.push(a); 
//            $scope.arrName.push(b); 
              
            $scope.enterText = "";
            $scope.dt = true;
            }
            
        }
    }
    })