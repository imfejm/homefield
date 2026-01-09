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

//logobox mizení při scrollu
function onScrollLogobox() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const logobox = document.querySelector(".logobox");

  // Postupné mizení mezi 50-500px scrollu
  //const fadeStart = 50;
  //const fadeEnd = 300;

  // if (scrollTop <= fadeStart) {
  //    logobox.style.opacity = '1';
  //  } else if (scrollTop >= fadeEnd) {
  //    logobox.style.opacity = '0';
  //  } else {
  //   const opacity = 1 - (scrollTop - fadeStart) / (fadeEnd - fadeStart);
  //   logobox.style.opacity = opacity.toString();
  // }
  //}
}

window.addEventListener("scroll", onScrollLogobox);
onScrollLogobox();

//animace pri scrollu - MUSÍ BÝT AŽ PO NAČTENÍ DOM
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.7 }
  );

  document.querySelectorAll(".logobox, .eko, .styl, .shops").forEach((el) => {
    observer.observe(el);
  });
});

// Posunutí při kliknutí
document.querySelector(".logobox").addEventListener("click", function () {
  this.classList.toggle("slided");
});

document.querySelector(".eko").addEventListener("click", function () {
  this.classList.toggle("slided");
});

document.querySelector(".styl").addEventListener("click", function () {
  this.classList.toggle("slided");
});

// Vrácení zpět na front při scrollu
let scrollTimeout;
window.addEventListener("scroll", function () {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(function () {
    document.querySelector(".logobox")?.classList.remove("slided");
    document.querySelector(".eko")?.classList.remove("slided");
    document.querySelector(".styl")?.classList.remove("slided");
  }, 100);
});

//kontaktni formular

document.addEventListener("DOMContentLoaded", function () {
  if (typeof emailjs === "undefined") {
    console.error("EmailJS knihovna není načtena.");
    return;
  }

  // Inicializace EmailJS
  emailjs.init("H50U77t2-paG6bflo");

  const form = document.getElementById("contact-form");

  if (!form) {
    console.error("Formulář #contact-form nebyl nalezen.");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Honeypot ochrana — pokud je vyplněný, nic neodesílat
    const honeypot = form.querySelector('input[name="honeypot"]');
    if (honeypot && honeypot.value.trim() !== "") {
      console.warn("Honeypot vyplněn — odeslání zablokováno.");
      return;
    }

    emailjs
      .sendForm("forpsi_smtp", "template_uar23bq", form)
      .then(function () {
        alert("Zpráva byla úspěšně odeslána.");
        form.reset();
      })
      .catch(function (error) {
        alert("Při odesílání došlo k chybě.");
        console.error("EmailJS error:", error);
      });
  });
});

