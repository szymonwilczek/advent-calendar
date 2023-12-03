import "./style.css";

import Experience from "./Experience/Experience.js";

const experience = new Experience(document.querySelector("canvas.webgl"));

//get image svg from html
const image = document.querySelector("img");
const image2 = document.querySelector("img2");
const modal = document.getElementById("keysModal");
const span = document.getElementsByClassName("close")[0];
var touchDevice = "ontouchstart" in window;

if (touchDevice === false) {
  if (image) {
    image.style.visibility = "visible";
    image.setAttribute("draggable", false);
    //set atrivute to image to not be selectable
    image.setAttribute("unselectable", "on");

    image.addEventListener("click", () => {
      modal.classList.add("show");
      //add animation when modal is open
      modal.classList.add("modal-open");
      span.onclick = function () {
        modal.classList.remove("show");
      };

      window.onclick = function (event) {
        if (event.target == modal) {
          modal.classList.remove("show");
        }
      };

      //display div
      const div = document.querySelector("div");
      div.style.display = "block";
    });
  }
}
