/*------------------------------------
     Function for resposive nav-bar
 -------------------------------------*/

const mobile_nav = document.querySelector('.mobile-navbar-btn');

const nav_link = document.querySelectorAll('.navbar-link'); // returns NodeList
var div_array = [...nav_link]; // converts NodeList to Array
div_array.forEach(navbar_link => {
    navbar_link.addEventListener('click', () => {
        toggleNav()
    });
});

const nav_header = document.querySelector('#header');

function toggleNav() {
    nav_header.classList.toggle("active")
}

mobile_nav.addEventListener('click', () => {
    toggleNav()
});



/*--------------------------------------------------------------------
    Function for Hilighting navlinks on scroll to particular section
----------------------------------------------------------------------*/


  // Get all sections that have an ID defined
const sections = document.querySelectorAll(".container");
// Add an event listener listening for scroll
window.addEventListener("scroll", navHighlighter);

function navHighlighter() {
    // Get current scroll position
    let scrollY = window.pageYOffset;
  
    // Now we loop through sections to get height, top and ID values for each

    sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 180;
    const sectionId = current.getAttribute("id");
    
    /*
    - If our current scroll position enters the space where current section on screen is, add .active class to corresponding navigation link, else remove it
    - To know which link needs an active class, we use sectionId variable we are getting while looping through sections as an selector
    */
    if (
      scrollY > sectionTop &&
      scrollY <= sectionTop + sectionHeight
    ){
      document.querySelector(".navbar a[name*=" + sectionId + "]").classList.add("active");
    } else {
      document.querySelector(".navbar a[name*=" + sectionId + "]").classList.remove("active");
    }
  });
}



/*------------------------------------
        ON SCROLL FUNCTION
 -------------------------------------*/

const nav_elements = document.getElementsByClassName('navbar-link')
const links_array = [...nav_elements]

const linkeach = links_array.forEach(link => {
  const link_name = link.getAttribute("name");
  const element = document.getElementsByName(link_name)


  function scrolldiv() {
    var section = document.getElementById(link_name);
    section.scrollIntoView();
  }

  element[0].addEventListener('click', scrolldiv)
});


/*------------------------------------
        LOADER FUNCTION
 -------------------------------------*/

(function(){    
  var myDiv = document.getElementById("loader");
  var html = document.querySelector("html");
  var section = document.getElementsByClassName("container"),

  // Displaying Loader page for 1 second
  show = function(){
    myDiv.style.display = "block";
    setTimeout(hide, 1000); // 1 seconds
  },

  hide = function(){
    myDiv.style.display = "none";
  };

  // Enabling scroll after 1 second
  scroll_func = function(){
    setTimeout(scroll_enb, 1000); // 1 seconds
  },

  scroll_enb = function(){
    html.style.overflowY = "scroll";
  };

  // Displaying all sections after the loader page is loaded
  display_func = function(){
    setTimeout(display_enb, 1000); // 1 seconds
  },

  display_enb = function(){
    for(var i=0; i<5; i++){
      section[i].style.display = "flex";
    }
  }

  scroll_func();
  display_func();
  show();
})();



/*------------------------------------
        EMAIL FUNCTION AND 
 -------------------------------------*/

function SendMail () {

  var x = document.getElementById("snackbar");
  x.className = "show";

  var templateParams = {
    from_name : document.getElementById("name").value,
    email_id : document.getElementById("email").value,
    message : document.getElementById("message").value,
  }

  emailjs.send('service_3mn5qzc', 'template_0jyed5d', templateParams).then(function(response) {
    console.log('SUCCESS!', response.status, response.text);
    x.innerHTML = "Your message was sent successfully!"
    x.style.backgroundColor = "green"
  }, 
  function(error) {
    x.innerHTML = "Error! Your message was not sent. please check your internet connection and try again."
    x.style.backgroundColor = "red"
  });

  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 4800); 
}

const submit_btn = document.getElementById('submit')
submit_btn.addEventListener('click', SendMail);
