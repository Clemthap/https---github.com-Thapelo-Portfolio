$(document).ready(function () {
    // Mobile menu toggle
    $(".nav-Menu").click(function(e) {
        e.preventDefault();
        $(".nav-Bar").addClass("show-menu");
    });

    $(".nav-close").click(function(e) {
        e.preventDefault();
        $(".nav-Bar").removeClass("show-menu");
    });
    
    // Close menu 
    $(".nav-Link, .nav-contact").click(function() {
        $(".nav-Bar").removeClass("show-menu");
    });
    $(document).click(function(e) {
        if (!$(e.target).closest('.nav-Bar, .nav-Menu').length && $(".nav-Bar").hasClass("show-menu")) {
            $(".nav-Bar").removeClass("show-menu");
        }
    });
    
    $(".btnDownload").click(function() {
        e.preventDefault();
    })

    $("a[href^='#']").click(function (e) {
        e.preventDefault();
        
        let target = $(this.hash);
        
        if (target.length) {
            $("html, body").animate({
                scrollTop: target.offset().top - 20
            }, 700);
        }
    });

    /*ACTIVE NAV LINK*/

    $(window).scroll(function () {
        let scrollPos = $(document).scrollTop();
        
        $(".nav-Link").each(function () {
            let currentLink = $(this);
            let section = $(currentLink.attr("href"));
            
            if (section.length && 
                section.position().top <= scrollPos + 100 &&
                section.position().top + section.height() > scrollPos + 100
            ) {
                $(".nav-Link").removeClass("active-link");
                currentLink.addClass("active-link");
            }
        });
    });


    $(".intro").hide().fadeIn(1500);
    $(".social-image").hide().fadeIn(2500);


    $(".social-icon i").hover(
        function () {
            $(this).stop().animate({
                fontSize: "2.4rem"
            }, 200);
        },
        function () {
            $(this).stop().animate({
                fontSize: "2rem"
            }, 200);
        }
    );

    function checkReveal() {
        $(".reveal").each(function () {
            let elementTop = $(this).offset().top;
            let windowBottom = $(window).scrollTop() + $(window).height();
            
            if (windowBottom > elementTop + 50) {
                $(this).addClass("revealed");
            }
        });
    }
    // Initial check
    checkReveal();
    
    // Check on scroll
    $(window).scroll(function() {
        checkReveal();
    });

    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $("#backToTop").fadeIn();
        } else {
            $("#backToTop").fadeOut();
        }
    });
    
    $("#backToTop").click(function() {
        $("html, body").animate({
            scrollTop: 0
        }, 800);
    });
    
    $("#contactForm").submit(function(e) {
        e.preventDefault();
        
        const name = $("#name").val();
        const surname = $("#surname").val();
        const phone = $("#phone").val();
        const message = $("#message").val();
        const contactMethod = $("input[name='contactMethod']:checked").val();
        
        alert(
            "Thank you " + name + " " + surname + "!\n\n" +
            "Your message has been received.\n" +
            "I will contact you contact you via " + (contactMethod || "email") + "\nIf not your phone number provided.\n\n" +
            "Phone: " + phone + "\n" +
            "Message: " + message
        );
        this.reset();
    });
});

//HEADER animation

const strings = [
    "Full Stack Intern",
    "Computer Science Student", 
    "Aspiring Software Developer"
];

let stringIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentText = strings[stringIndex];
    
    if (!isDeleting && charIndex < currentText.length) {
        // Typing
        $("#typing-text").text(currentText.substring(0, charIndex + 1));
        charIndex++;
        setTimeout(typeWriter, 100);
    } 
    else if (isDeleting && charIndex > 0) {
        // Deleting
        $("#typing-text").text(currentText.substring(0, charIndex - 1));
        charIndex--;
        setTimeout(typeWriter, 50);
    }
    else if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeWriter, 2000);
    }
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        stringIndex = (stringIndex + 1) % strings.length;
        setTimeout(typeWriter, 100);
    }
}

// Start typing animation when page loads
$(document).ready(function() {
    $("#typing-text").empty();
    setTimeout(typeWriter, 500);
});
