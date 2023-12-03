    //HOMEPAGE SLIDESHOW JS//
    let slideIndex = 0;
    showSlides();
    
    function showSlides() {
      let slides = document.getElementsByClassName("slides");
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
      }
      slideIndex++;
      if (slideIndex === slides.length) {slideIndex = 0}    
      slides[slideIndex].style.display = "block";  
      setTimeout(showSlides, 8000); // Change image every 2 seconds
    }