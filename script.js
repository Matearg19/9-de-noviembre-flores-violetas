// PERSONALIZÁ AQUÍ las siete sorpresas. type puede ser "message", "photo" o "video".
const surprises = [
  { title: "Una cosita que quiero que sepas", text: "Te quiero. 💜", type: "message" },
  { title: "No te olvides", text: "Sos una persona increíble.", type: "message" },
  { title: "Un recordatorio", text: "Sos hermosa, por dentro y por fuera.", type: "message" },
  { title: "Para tus días", text: "Ojalá nunca te falten motivos para sonreír. Sé feliz.", type: "message" },
  { title: "Un detalle", text: "Amo tu sonrisa.", type: "message" },
  { title: "Algo que me encanta", text: "Amo tus rizos.", type: "message" },
  { title: "Y una última", text: "Siempre pensá en positivo. Te merecés cosas bonitas.", type: "message" }
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
  document.querySelector(`[data-flower="${index}"]`).classList.add("seen");
  document.getElementById("count").textContent = found.size;
  document.getElementById("fill").style.width = `${found.size / surprises.length * 100}%`;
  document.getElementById("hint").textContent = found.size === surprises.length
    ? "Descubriste todas las flores. Hay algo más esperándote… ♡"
    : "Una sorpresa más descubierta ♡";

  modalTitle.textContent = item.title;
  modalBody.textContent = item.text || "";
  media.replaceChildren();

  // Para fotos: poné type: "photo", src: "fotos/foto1.jpg"
  // Para videos: poné type: "video", src: "videos/video1.mp4"
  if (item.type === "photo" && item.src) {
    const img = document.createElement("img");
    img.src = item.src; img.alt = "Una foto especial";
    media.appendChild(img);
  } else if (item.type === "video" && item.src) {
    const video = document.createElement("video");
    video.src = item.src; video.controls = true; video.playsInline = true;
    media.appendChild(video);
  }

  overlay.classList.remove("hidden");
  document.getElementById("close").focus();
  if (found.size === surprises.length) {
    document.getElementById("letter").classList.remove("hidden");
  }
}

document.querySelectorAll(".flower").forEach(button => {
  button.addEventListener("click", () => openSurprise(Number(button.dataset.flower)));
});
function closeModal() { overlay.classList.add("hidden"); media.replaceChildren(); }
document.getElementById("close").addEventListener("click", closeModal);
overlay.addEventListener("click", event => { if (event.target === overlay) closeModal(); });
document.addEventListener("keydown", event => { if (event.key === "Escape") closeModal(); });

document.getElementById("readButton").addEventListener("click", () => {
  document.getElementById("letter").classList.add("hidden");
  document.getElementById("final").classList.remove("hidden");
  document.getElementById("final").scrollIntoView({ behavior: "smooth", block: "center" });
});
