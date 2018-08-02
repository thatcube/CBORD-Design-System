$(document).ready(function() {
    $(".menu-toggle").click(function() {
        $(".menu, .menu-toggle, .sidebar, .header, body").toggleClass("open");
    });
    $('.menu a').click(function closeNav() {
        $(".menu, .menu-toggle, .sidebar, .header, body").toggleClass("open");
    });

    var clipboardButton = $('.color .button');
    clipboardButton.on("click", function() {
        $this = $(this);
        $this.text('HEX Copied!');
        setTimeout(backToCopyHex, 2000);
        function backToCopyHex() {
            $this.text('Copy HEX');
        }
    })

});

// function buttonTextCopied() {
//     var clipboardButton = $('.color .button');
//     clipboardButton.text('HEX Copied!');
//     setTimeout(backToCopyHex, 5000);
//     function backToCopyHex() {
//         clipboardButton.text('Copy HEX');
//     }
// }


// var $body = $('body');
// $body.on('click', function(event) {
//   var clickedOutside = $(event.target).closest('.menu-toggle').length == 0;
//   if (clickedOutside && $body.hasClass('open')) {
//     $(".menu, .menu-toggle, .sidebar, .header, body").toggleClass("open");
//   }
// })

clipboard = new ClipboardJS('.copy');

// clipboard.on('success', function(e) {
//     buttonTextCopied();
// });

// Cache selectors
var lastId,
    topMenu = $(".menu"),
    topMenuHeight = topMenu.outerHeight()-500,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

// Bind click handler to menu items for scroll animation
menuItems.click(function(e){
  var href = $(this).attr("href"),
    //position where the page scrolls to for each link
      offsetTop = href === "#" ? 0 : $(href).offset().top-75;
  $('html, body').stop().animate({ 
      scrollTop: offsetTop
  }, 300);
  e.preventDefault();
});

// Bind to scroll
$(window).scroll(function(){
   // Get container scroll position
   var fromTop = $(this).scrollTop()+topMenuHeight;
   
   // Get id of current scroll item
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });
   // Get the id of the current element
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";
   
   if (lastId !== id) {
       lastId = id;
       // Set/remove active class
       menuItems
         .parent().removeClass("active")
         .end().filter("[href='#"+id+"']").parent().addClass("active");
   }                   
});



// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('header').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('header').removeClass('nav-down').addClass('nav-up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('header').removeClass('nav-up').addClass('nav-down');
        }
    }
    
    lastScrollTop = st;
}