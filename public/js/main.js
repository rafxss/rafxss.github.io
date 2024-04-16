$(document).ready(function () {

  // MENU BUTTON
  $("header .button-menu").on("click", function(){  
    $("header").toggleClass("open");
    $("header .button-menu").toggleClass("open");
    $("header .menu").toggleClass("open");
    $("body").toggleClass("overflow");
  });

  $("header .menu .container .menuContainer .sections a.inner").click(function(e) {
    e.preventDefault();
    href = $(this).attr('href');
    $(".experience .tableContainer .card").hasClass("open") ? "" : $(".experience .tableContainer .card[card-number=1] .card-head").trigger("click"); 
    setTimeout(() => { 
      $("header").removeClass("open");
      $("header .button-menu").removeClass("open");
      $("header .menu").removeClass("open");
      $("body").removeClass("overflow");
      window.location = href;
    }, 200);
});

  // EXPERIENCIA
  setTimeout(heightCards, 800);

  $(".experience .tableContainer .card .card-head").on("click", function(){
    const card = $(this).parent().parent()
    const attr = card.attr('card-number')
    $(".experience .tableContainer .card").each(function(){
      const attr_each = $(this).attr('card-number')
      if(($(this).hasClass("open")) && (attr != attr_each)){
        const container = $(this).find(".card-container")
        const heightRow = $(this).find(".card-head").height()
        let newHeight = heightRow+33;

        $(this).removeClass("open")
        container.css("height", `${newHeight}px`)
      }
    });
    const container = card.find(".card-container")
    const body = card.find(".card-content")
    const heightRow = card.find(".card-head").height()
    let newHeight = heightRow+33;
    card.toggleClass("open")
      
    if(card.hasClass("open")){
      const infoHeight = Number(body.height())
      newHeight += infoHeight
      newHeight += 55
    }

    container.css("height", `${newHeight}px`)
    
  });

  $(window).on('resize', function(){
    heightCards();
  });

  // PROJECTS

  $(".projects .projects-container .card .overlay").on("click", function(){  
    $(this).addClass("open");
    $(this).mouseleave(function(){
      $(this).removeClass("open");
    });
  });

  $(".projects .projects-container .card .overlay .title-overlay .cross").on("click", function(e){ 
    $(this).addClass("open");
    $(this).parent().parent().removeClass("open");
    e.stopPropagation();
  });

  $("#name").text("");
  $("#name").removeClass("init");

  setTimeout(function() {
    typeWriter();
  }, 2000);

  // AÑO FOOTER
  $("#year").text((new Date).getFullYear());

  // PÁGINA CARGA
  loadingOn();
  setTimeout(loadingOff, 1000);    

  // SCROLL
  let countScrollExperience = 0
  let countScrollSkills = 0

  $(window).scroll((function() {
    let scroll = $(this).scrollTop();
    let header = $("header");
    if (window.innerWidth < 700) {
      ((scroll >= $(".experience .tableContainer .card[card-number=1]").offset().top - 620) && countScrollExperience == 0 && !$(".experience .tableContainer .card").hasClass("open") ) ? (($(".experience .tableContainer .card[card-number=1] .card-head").trigger("click")),countScrollExperience++): "";
      ((scroll >= $('.skills .skills-container .skills-images').offset().top - 650) && countScrollSkills == 0) ? (displaySkills(),countScrollSkills++): "";
      (scroll >= $('.triggerHeader').offset().top - 73 ) ? header.addClass("white") : header.removeClass("white");
      
      ((scroll >= $('.projects .projects-container .card.project1').offset().top - 290) && (scroll < $('.projects .projects-container .card.project2').offset().top - 360)) ? $('.projects .projects-container .card.project1').addClass("hover") : $('.projects .projects-container .card.project1').removeClass("hover");
      ((scroll >= $('.projects .projects-container .card.project2').offset().top - 360) && (scroll < $('.projects .projects-container .card.project3').offset().top - 290)) ? $('.projects .projects-container .card.project2').addClass("hover") : $('.projects .projects-container .card.project2').removeClass("hover");
      ((scroll >= $('.projects .projects-container .card.project3').offset().top - 290) && (scroll < $('.projects .projects-container .card.project4').offset().top - 360)) ? $('.projects .projects-container .card.project3').addClass("hover") : $('.projects .projects-container .card.project3').removeClass("hover");
      ((scroll >= $('.projects .projects-container .card.project4').offset().top - 360) && (scroll < $('.projects .projects-container .card.project5').offset().top - 290)) ? $('.projects .projects-container .card.project4').addClass("hover") : $('.projects .projects-container .card.project4').removeClass("hover");
      ((scroll >= $('.projects .projects-container .card.project5').offset().top - 290) && (scroll < $('.projects .projects-container .card.project6').offset().top - 360)) ? $('.projects .projects-container .card.project5').addClass("hover") : $('.projects .projects-container .card.project5').removeClass("hover");
      (scroll >= $('.projects .projects-container .card.project6').offset().top - 360) ? $('.projects .projects-container .card.project6').addClass("hover") : $('.projects .projects-container .card.project6').removeClass("hover");
    } else {
      ((scroll >= $(".experience .tableContainer .card[card-number=1]").offset().top - 620) && countScrollExperience == 0 && !$(".experience .tableContainer .card").hasClass("open") ) ? (($(".experience .tableContainer .card[card-number=1] .card-head").trigger("click")),countScrollExperience++): "";
      ((scroll >= $('.skills .skills-container .skills-images').offset().top - 620) && countScrollSkills == 0) ? (displaySkills(),countScrollSkills++): "";
      (scroll >= $('.triggerHeader').offset().top - 73 ) ? header.addClass("white") : header.removeClass("white");
      $(".projects .projects-container .card").each(function(){
        $(this).removeClass("hover");
      });
    };
  }));

  $('a.internal').on('click', function(e) {
    e.preventDefault();
    var href = $(this).attr('href');
    var queryString = window.location.search;
    window.location.href = href + queryString;
  });

}); //DOCUMENT READY

function loadingOn(){
  $(".loading-page").show();
  $("body").addClass("overflow");
}
function loadingOff(){
  $(".loading-page").fadeOut();
  $("body").removeClass("overflow");
}

function displaySkills() {
  var timer = 0;
  var timerHover = 220
  var timerUnhover = 440
  $(".skills .skills-images .skill").each(function(){
    setTimeout(() => { 
      $(this).addClass("display");
    }, timer);
    timer += 80;
    setTimeout(() => { 
      $(this).addClass("hover");
    }, timerHover);
    timerHover += 80
    setTimeout(() => { 
      $(this).removeClass("hover");
    }, timerUnhover);
    timerUnhover += 80
  });
};

var nameIndex = 0; // Índice del nombre actual
var charIndex = 0; // Índice del carácter actual
var speed = 90; // La velocidad/duración del efecto en milisegundos
var pauseBetweenNames = 200; // Tiempo de pausa entre nombres en milisegundos
var eraseSpeed = 40; // Velocidad de borrado de caracteres

function typeWriter() {
  let name = document.getElementById("name");
  if (name.hasAttribute("es")) {
    var names = ['Soy Rafael', 'Soy Rafi', 'Soy Rafa.']; // Array de nombres
  } else {
    var names = ['I\'m Rafael', 'I\'m Rafi', 'I\'m Rafa.']; // Array de nombres
  }
  if (nameIndex < names.length) {
    if (charIndex < names[nameIndex].length) {
      name.innerHTML += names[nameIndex].charAt(charIndex);
      charIndex++;
      setTimeout(typeWriter, speed);
    } else {
      nameIndex++;
      charIndex = 0;

      if (nameIndex < names.length) {
        setTimeout(function() {
          eraseText(name); // Llama a la función para borrar el contenido
          setTimeout(function() {
            typeWriter(); // Comienza a escribir el siguiente nombre
          }, eraseSpeed * names[nameIndex - 1].length + pauseBetweenNames); // Ajusta el tiempo de espera
        }, 1500);
      }
    }
  }
}

function eraseText(element) {
  let text = element.innerHTML;
  let length = text.length;
  let interval = setInterval(function() {
    if (element.innerHTML.length > 0) {
      element.innerHTML = element.innerHTML.slice(0, -1);
    } else {
      clearInterval(interval);
    }
  }, eraseSpeed);
}

function heightCards() {
  $(".experience .tableContainer .card").each(function(){
    const container = $(this).find(".card-container")
    const body = $(this).find(".card-content")

    const heightRow = $(this).find(".card-head").height()
    let newHeight = heightRow+33;

    if($(this).hasClass("open")){
      const infoHeight = Number(body.height())
      newHeight += infoHeight
      newHeight += 55
    }

    container.css("height", newHeight)
  });
}