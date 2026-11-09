
// PERSONALIZÁ AQUÍ las siete sorpresas.
// Las dos primeras flores muestran fotografías.

const surprises = [
  {
    title: "Un recuerdo especial 💜",
    text: "Hay momentos que siempre merece la pena guardar.",
    type: "photo",
    src: "foto1.jpg"
  },
  {
    title: "Una pequeña sorpresa ♡",
    text: "Por favor, nunca te canses de mí.",
    type: "photo",
    src: "foto2.jpg"
  },
  {
    title: "Un recordatorio",
    text: "Sos una persona increíble.",
    type: "message"
  },
  {
    title: "No te olvides",
    text: "Sos hermosa, por dentro y por fuera.",
    type: "message"
  },
  {
    title: "Para tus días",
    text: "Ojalá nunca te falten motivos para sonreír. Sé feliz.",
    type: "message"
  },
  {
    title: "Un detalle",
    text: "Amo tu sonrisa.",
    type: "message"
  },
  {
    title: "Algo que me encanta",
    text: "Amo tus rizos. 💜",
    type: "message"
  }
];

const found = new Set();

const overlay = document.getElementById("overlay");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const media = document.getElementById("media");

function openSurprise(index) {
  const item = surprises[index];
  if (!item) return;

  found.add(index);

  document.querySelector(`[data-flower="${index}"]`)
    .classList.add("seen");

  document.getElementById("count").textContent = found.size;

  document.getElementById("fill").style.width =
    `${found.size / surprises.length * 100}%`;

  document.getElementById("hint").textContent =
    found.size === surprises.length
      ? "Descubriste todas las flores. Hay algo más esperándote… ♡"
      : "Una sorpresa más descubierta ♡";

  modalTitle.textContent = item.title;
  modalBody.textContent = item.text || "";

  media.replaceChildren();

  // MOSTRAR FOTOGRAFÍAS
  if (item.type === "photo" && item.src) {
    const img = document.createElement("img");

    img.src = item.src;
    img.alt = "Una fotografía especial";
    img.style.width = "100%";
    img.style.maxWidth = "100%";
    img.style.height = "auto";
    img.style.maxHeight = "55vh";
    img.style.objectFit = "contain";
    img.style.borderRadius = "12px";
    img.style.marginTop = "12px";

    media.appendChild(img);
  }

  // MOSTRAR VIDEOS
  else if (item.type === "video" && item.src) {
    const video = document.createElement("video");

    video.src = item.src;
    video.controls = true;
    video.playsInline = true;
    video.style.width = "100%";
    video.style.borderRadius = "12px";

    media.appendChild(video);
  }

  overlay.classList.remove("hidden");

  document.getElementById("close").focus();

  // DESBLOQUEAR LA CARTA FINAL
  if (found.size === surprises.length) {
    document.getElementById("letter").classList.remove("hidden");
  }
}

// DETECTAR CUANDO TOCAN LAS FLORES
document.querySelectorAll(".flower").forEach(button => {
  button.addEventListener("click", () => {
    openSurprise(Number(button.dataset.flower));
  });
});

// CERRAR SORPRESA
function closeModal() {
  overlay.classList.add("hidden");
  media.replaceChildren();
}

document.getElementById("close")
  .addEventListener("click", closeModal);

overlay.addEventListener("click", event => {
  if (event.target === overlay) closeModal();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeModal();
});

// CARTA FINAL
document.getElementById("readButton")
  .addEventListener("click", () => {

    document.getElementById("letter").classList.add("hidden");

    document.getElementById("final").classList.remove("hidden");

    document.getElementById("final").scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  });
