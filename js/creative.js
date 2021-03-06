(function($) {
	"use strict"; // Start of use strict

	if (typeof(jQuery)=='undefined' || !jQuery.fn) {if(window.console&&window.console.log)window.console.log('jQuery is not included! Skipping template init!');return;}
	var getJson = function(url, callback){$.ajax({type:"GET",url:url,dataType:"json",cache:true,async:true,success:callback});}
	var getHtml = function(url, callback){$.ajax({type:"GET",url:url,dataType:"html",cache:true,async:true,success:callback});}
	var config = window.creative||{}, version = config.version||'1.0';

	/*// Initialise the Metatags section
	getHtml("/seo/meta.min.html?v="+version, function(data) {
		var $el = $('<div/>').html(data), html = $el.html();
		$(document).ready(function() {
			$("head").append(html);
		});
	});*/

	/*// Initialise the Json+Ld
	var jsonLds = ["seo/identity.ld.json?v="+version,"seo/website.ld.json?v="+version,"seo/place.ld.json?v="+version];
	for(var i in jsonLds){
		getJson(jsonLds[i], function(data){
			$("<script/>", {"type":"application/ld+json","html":JSON.stringify(data)}).appendTo("head");
		});
	}*/

	// Initialise the MainNav section
	var $mainNav = $(".navbar.navbar-default"); // $("#mainNav")
	if ($mainNav.length > 0) {
		getHtml("/sections/mainNav.min.html?v="+version, function(data) {
			var $el = $('<div/>').html(data), html = $el.find("#mainNav").html();
			$mainNav.html(html);
			// 
			// Highlight the top nav as scrolling occurs
			if (jQuery.fn.scrollspy) {
				$('body').scrollspy({
					target: '.navbar-fixed-top',
					offset: 51
				});
			}
			// Closes the Responsive Menu on Menu Item Click
			$('.navbar-collapse ul li a').click(function() {
				$('.navbar-toggle:visible').click();
			});
			// Offset for Main Navigation
			if (jQuery.fn.affix) {
				$('#mainNav').affix({
					offset: {
						top: 100
					}
				});
			}
		});
	}

	// Initialise the About section
	var $about = $("#about");
	if ($about.length > 0) {
		getHtml("/sections/about.html?v="+version, function(data) {
			var $el = $('<div/>').html(data), html = $el.find("#about").html();
			//$about.html(html);
		});
	}

	// Initialise the Services section
	var $services = $("#services");
	if ($services.length > 0) {
		getHtml("/sections/services.html?v="+version, function(data) {
			var $el = $('<div/>').html(data), html = $el.find("#services").html();
			//$services.html(html);
		});
	}

	// Initialise the Download section
	var $download = $("#download");
	if ($download.length > 0) {
		getHtml("/sections/download.html?v="+version, function(data) {
			var $el = $('<div/>').html(data), html = $el.find("#download").html();
			//$download.html(html);
		});
	}

	// Initialise the Testimonials section
	var $recommendations = $("#recommendations");
	if ($recommendations.length > 0) {
		getHtml("/sections/testimonials.html?v="+version, function(data) {
			var $el = $('<div/>').html(data), html = $el.find("#recommendations").html();
			//$recommendations.html(html);
			// 
			// Initialise the Testimonials carousel
			if (jQuery.fn.owlCarousel) {
				$recommendations.find(".testimonials-carousel, .mockup-carousel").owlCarousel({
					items: 1,
					//singleItem: true,
					autoWidth: false,
					autoHeight: false,
					responsive: true,
					loop: true,
					addClassActive: true,
					slideSpeed: 300,
					paginationSpeed: 400,
					autoPlay: true,
					stopOnHover: true,
					pagination: false,
					navigation: true,
					lazyLoad: true,
					navigationText: [
						"<i class='fa fa-angle-left'></i>",
						"<i class='fa fa-angle-right'></i>"
					],
					transitionStyle: "backSlide"
				});
			}
		});
	}

	function initContactForm($el) {
		var closeBtnHtml = "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>";
		$el.find("input,textarea").jqBootstrapValidation({
			/*feedbackIcons: {
				valid: 'glyphicon glyphicon-ok',
				invalid: 'glyphicon glyphicon-remove',
				validating: 'glyphicon glyphicon-refresh'
			},*/
			preventSubmit: true,
			submitError: function($form, event, errors) {
				// additional error messages or events
			},
			submitSuccess: function($form, event) {
				// Prevent spam click and default submit behaviour
				$el.find("#btnSubmit").attr("disabled", true);
				event.preventDefault();
				// 
				// get values from FORM
				var name = $el.find("input#name").val();
				var email = $el.find("input#email").val();
				var phone = $el.find("input#phone").val();
				var message = $el.find("textarea#message").val();
				var firstName = name; // For Success/Failure Message
				// Check for white space in name for Success/Fail message
				if (firstName.indexOf(' ') >= 0) {
					firstName = name.split(' ').slice(0, -1).join(' ');
				}
				$.ajax({
					url: "/mail/contact_me.php",
					type: "POST",
					data: {
						name: name,
						phone: phone,
						email: email,
						message: message
					},
					cache: false,
					success: function() {
						// Enable button & show success message
						$el.find("#btnSubmit").attr("disabled", false);
						$el.find('#success').html("<div class='alert alert-success'>"+closeBtnHtml+"<strong>Tu mensaje ha sido enviado.</strong></div>");
						// 
						// clear all fields
						$el.trigger("reset");
					},
					error: function() {
						// Fail message
						$el.find('#success').html("<div class='alert alert-danger'>"+closeBtnHtml+"<strong>Lo sentimos "+ firstName +", parece que el servidor de correo no está respondiendo. Por favor, inténte de nuevo más tarde!</div>");
						// 
						// clear all fields
						$el.trigger("reset");
					},
				});
			},
			filter: function() {
				return $(this).is(":visible");
			},
		});

		$el.find("a[data-toggle=\"tab\"]").click(function(e) {
			e.preventDefault();
			$(this).tab("show");
		});

		// When clicking on Full hide fail/success boxes
		$el.find('#name').focus(function() {
			$el.find('#success').html('');
		});
	}

	// Initialise the Contact Form section
	var $contactForm = $("#contactForm");
	if ($contactForm.length > 0) {
		initContactForm($contactForm);
	}

	// Initialise the Contacts section
	var $contacts = $("#contacts");
	if ($contacts.length > 0) {
		getHtml("/sections/contacts.html?v="+version, function(data) {
			var $el = $('<div/>').html(data), html = $el.find("#contacts").html();
			//$contacts.html(html);
		});
	}

	// Initialise the Footer section
	var $footer = $("#footer");
	if ($footer.length > 0) {
		getHtml("/sections/footer.min.html?v="+version, function(data) {
			var $el = $('<div/>').html(data), html = $el.find("#footer").html();
			$footer.html(html);
		});
	}

	// On Window Load
	$(window).load(function() {
		// jQuery for page scrolling feature - requires jQuery Easing plugin
		$(document).on('click', 'a.page-scroll', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: ($($anchor.attr('href')).offset().top - 50)
			}, 1250, 'easeInOutExpo');
			event.preventDefault();
		});

		// Initialize and Configure Scroll Reveal Animation
		if (typeof(ScrollReveal)!='undefined') {
			window.sr = ScrollReveal();
			sr.reveal('.sr-icons', { duration: 600, scale: 0.3, distance: '0px' }, 200);
			sr.reveal('.sr-button', { duration: 1000, delay: 200 });
			sr.reveal('.sr-contact', { duration: 600, scale: 0.3, distance: '0px' }, 300);
		}

		// Initialize and Configure Magnific Popup Lightbox Plugin
		if (jQuery.fn.magnificPopup) {
			$('.popup-gallery').magnificPopup({
				delegate: 'a',
				type: 'image',
				tLoading: 'Loading image #%curr%...',
				mainClass: 'mfp-img-mobile',
				gallery: {
					enabled: true,
					navigateByImgClick: true,
					preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
				},
				image: {
					tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
				}
			});
		}
	});

})(jQuery); // End of use strict
