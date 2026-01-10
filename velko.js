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
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !entry.target.classList.contains("show")) {
      const delay = parseInt(entry.target.dataset.offerIndex) * 150;
      setTimeout(() => {
        entry.target.classList.add("show");
      }, delay);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Inicializace s krátkou prodlevou
setTimeout(() => {
  const offers = document.querySelectorAll(".offers");
  offers.forEach((offer, index) => {
    offer.dataset.offerIndex = index;
    observer.observe(offer);
  });
}, 100);

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
      .sendForm("forpsi_smtp", "template_zsbdrgu", form)
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

// Pop-up pro maloobchod odkazy
document.addEventListener("DOMContentLoaded", function () {
  const popup = document.getElementById("eshop-popup");
  const closeBtn = document.querySelector(".popup-close");
  const maloobchodLinks = document.querySelectorAll(".maloobchod, a[href='index.html#maloobchod']");

  if (popup) {
    // Otevření pop-upu po kliknutí na odkazy "maloobchod"
    maloobchodLinks.forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        popup.classList.remove("hidden");
      });
    });

    // Zavření pop-upu po kliknutí na křížek
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        popup.classList.add("hidden");
      });
    }

    // Zavření pop-upu po kliknutí mimo obsah
    popup.addEventListener("click", function (e) {
      if (e.target === popup) {
        popup.classList.add("hidden");
      }
    });
  }
});
