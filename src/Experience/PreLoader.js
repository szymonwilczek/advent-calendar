import Experience from "./Experience.js";
import EventEmitter from "./Utils/EventEmitter.js";

export default class PreLoader extends EventEmitter {
  constructor() {
    super();

    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sounds = this.experience.sounds;
    this.resources = this.experience.resources;
    this.sizes = this.experience.sizes;
    this.overlay = document.querySelector(".overlay");
    this.cooking = document.querySelector("#cooking");
    this.startButton = document.querySelector(".start");

    // Progress
    this.resources.on("itemLoaded", () => {
      this.progressRatio = (this.resources.loaded + 1) / this.resources.toLoad;

      document.getElementById("progressPercentage").innerHTML = Math.trunc(
        this.progressRatio * 100
      );
    });

    //Loaded
    this.resources.on("ready", () => {
      window.setTimeout(() => {
        this.cooking.classList.add("fade");
      }, 1500);

      window.setTimeout(() => {
        this.readyScreen();
      }, 2500);
    });
  }

  readyScreen() {
    this.cooking.remove();
    //add new html element to overlay under the start button
    this.overlay.innerHTML = `
        <lottie-player
      src="https://lottie.host/aeed77e0-b6e3-4b4f-8268-24717bd3ea88/5EvCIkACor.json"
      background="transparent"
      speed="0.7"
      style="
      width: 5rem; 
      height: 5rem;
      position: absolute;
      top: calc((100vh + 55px)/2);
      right: calc((100vw - 290px)/2);
      transform: translate(-50%, -50%);
    "
      loop
      autoplay
    ></lottie-player>
    `;

    this.startButton.style.display = "inline";
    this.startButton.classList.add("fadeIn");
    this.startButton.addEventListener(
      "click",
      async () => {
        // Remove overlay and button
        this.overlay.classList.add("fade");
        this.startButton.classList.add("fadeOut");

        window.setTimeout(() => {
          this.startButton.remove();
          this.overlay.remove();
        }, 2000);

        // Trigger start events
        this.controller = this.experience.controller;
        this.performance = this.experience.performance;

        // Move Camera
        this.controller.camControls.toDefault();

        // Play Sounds
        this.sounds.playBellsClick();

        this.sounds.playFireplace();

        // Required for instagram brower compatibility
        this.sizes.resize();

        // Wait before performance Check
        await this.sleep(500);
        this.performance.performanceCheck();

        // Emit Event
        this.trigger("start");
      },
      { once: true }
    );
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
