//navigace na klik a krizek z ham
const tlacitko = document.querySelector("#ham");
const rozbal = document.querySelector("#menu");
const odkazy = rozbal.querySelectorAll("a");

tlacitko.addEventListener("click", () => {
  rozbal.classList.toggle("hidden");

  document.querySelector("#cara1").classList.toggle("caraA");
  document.querySelector("#cara2").classList.toggle("caraB");
  document.querySelector("#cara3").classList.toggle("caraC");
});

// Zavření menu po kliknutí na jakýkoli odkaz
odkazy.forEach((link) => {
  link.addEventListener("click", () => {
    rozbal.classList.add("hidden");

    document.querySelector("#cara1").classList.remove("caraA");
    document.querySelector("#cara2").classList.remove("caraB");
    document.querySelector("#cara3").classList.remove("caraC");
  });
});

//logo do horní lišty
function onScrollLogoS() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const logoS = document.querySelector(".logoS");

  if (scrollTop > 50) {
    logoS?.classList.add("visible");
  } else {
    logoS?.classList.remove("visible");
  }
}

window.addEventListener("scroll", onScrollLogoS);
window.addEventListener("resize", onScrollLogoS);
onScrollLogoS();

//postupne zobrazovani .offers pri scrollu
const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("show");
      }, index * 150);
    }
  });
}, observerOptions);

const offers = document.querySelectorAll(".offers");
offers.forEach((offer) => {
  observer.observe(offer);
});

//postupne zobrazovani tucneho textu po nacteni
window.addEventListener("load", () => {
  setTimeout(() => {
    const strongElements = document.querySelectorAll("strong");
    strongElements.forEach((strong, index) => {
      setTimeout(() => {
        strong.classList.add("bold-visible");
      }, index * 200);
    });
  }, 500);
});
