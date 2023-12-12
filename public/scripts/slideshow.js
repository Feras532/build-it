let slideIndex = 0;
showSlides();

function showSlides() {
  let slides = document.getElementsByClassName("slides");
  let dots = document.getElementsByClassName("dot");

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";

  setTimeout(showSlides, 5000);
}

document
  .querySelector(".fancy-button")
  .addEventListener("click", function (event) {
    event.preventDefault();
    document
      .getElementById("features-intro")
      .scrollIntoView({ behavior: "smooth" });
  });
