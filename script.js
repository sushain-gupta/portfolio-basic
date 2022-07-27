/*------------------------------------
     Function for resposive nav-bar
 -------------------------------------*/

const mobile_nav = document.querySelector('.mobile-navbar-btn');

const nav_link = document.querySelectorAll('.navbar-link');
var div_array = [...nav_link];
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



/*-------------------------------------------------------------------
        FORM AND EMAIL FUNCTIONALITY WITH ERROR DETECTION(IF ANY)
 --------------------------------------------------------------------*/

        /*--------------------------
                FORM FUNCTION
        ---------------------------*/

const submit_btn = document.getElementById('submit')
submit_btn.addEventListener('click', validateForm)
function validateForm() {
  var nameVal = document.getElementById("name").value;
  var emailVal = document.getElementById("email").value;
  var messageVal = document.getElementById("message").value;
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  // Display if the name field is kept empty else hide

  if(nameVal == "") {
  document.getElementById("nameError").style.visibility = "visible";
  } 
  if(nameVal){
    document.getElementById("nameError").style.visibility = "hidden";
    var nameVal = true;
  }

  // Display if the email field is kept empty else hide

  if(emailVal.match(mailformat)) {
    document.getElementById("emailError").style.visibility = "hidden";
    var emailVal = true;
  }else {
    document.getElementById("emailError").style.visibility = "visible";
  };


  // Display if the message field is kept empty else hide

  if(messageVal == "") {
    document.getElementById("messageError").style.visibility = "visible";
  }else {
    document.getElementById("messageError").style.visibility = "hidden";
    var messageVal = true;
  };


        /*--------------------------
                MAIL FUNCTION
        ---------------------------*/

  // Mail & snackbar functionality is executed if and only if all the fields are filled bye the user.
  if(nameVal && emailVal && messageVal == true) {
    var x = document.getElementById("snackbar");
    x.className = "show";
  
    // parameters to be passed from form.
    var templateParams = {
      from_name : document.getElementById("name").value,
      email_id : document.getElementById("email").value,
      message : document.getElementById("message").value,
    }

    emailjs.init("fZdjcOta13YiSVWUv");

    emailjs.send('service_pyxsrhx', 'template_160qlew', templateParams).then(function(response) {
      x.innerHTML = "Your message was sent successfully!"
      x.style.backgroundColor = "green"
      // Reset form if message was sent successfully.
      document.getElementById("myform").reset();
    },
  
    // Error function 
    function(error) {
      // If any error occurs at backend while the internet status is on, error will be thrown likewise, else internet error will be thrown.
      internet_status = window.navigator.onLine ? 'on' : 'off'
      if(internet_status == "on") {
        x.innerHTML = `Error! ${error.text}. Please try after sometime.`;
        x.style.backgroundColor = "red"
      } else {
        x.innerHTML = "Error! Please check your internet connection and try again."
      };
    });
  
    // show error for 4.8 seconds.
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 4000);
  }
}


/*-------------------------------------------
        SLIDER FUNCTION FOR PROJECT SECTION
---------------------------------------------*/


const slider = document.querySelector('.project-container');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 3; //scroll-fast
  slider.scrollLeft = scrollLeft - walk;
  console.log(walk);
});

let images = [
  './assets/portfolio.png',
  './assets/comming-soon.jpg',
  './assets/comming-soon.jpg',
  './assets/comming-soon.jpg',
  './assets/comming-soon.jpg',
];

const slides = document.querySelectorAll(".slides")

slides.forEach((slide, index) => {
let img = new Image();
img.onload = (a) => {
  slide.style.backgroundImage = `url(${images[index]})`;
  slide.classList.add('has-image');
}
img.src = images[index];
});



// Adding on click function to source code and view project button in project section. 

document.getElementById("portfolio-link-btn").onclick = function () {
  location.href = "https://sushaingupta.netlify.app";
}
document.getElementById("portfolio-code-btn").onclick = function () {
  location.href = "https://github.com/SushainGupta/Portfolio";
};
