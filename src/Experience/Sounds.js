import Experience from "./Experience.js";
import { Howl, Howler } from "howler";
import fireplace from "../../static/sounds/fireplace.mp3";
import deck_the_halls from "../../static/sounds/deck_the_halls.mp3";
import entrance from "../../static/sounds/entrance.mp3";
import bells_click from "../../static/sounds/bells_click.mp3";

export default class Sounds {
  constructor() {
    this.experience = new Experience();

    this.fireplace = new Howl({
      src: [fireplace],
      loop: true,
      volume: 0.2,
    });

    this.deck_the_halls = new Howl({
      src: [deck_the_halls],
      volume: 0.2,
    });

    this.entrance = new Howl({
      src: [entrance],
      volume: 0.2,
    });

    this.bells_click = new Howl({
      src: [bells_click],
      volume: 0.2,
    });

    this.setMute();
  }

  setMute() {
    // Set up
    this.muted = typeof this.debug !== "undefined";
    Howler.mute(this.muted);

    // M Key
    window.addEventListener("keydown", (_event) => {
      if (_event.key === "m") {
        this.muted = !this.muted;
        Howler.mute(this.muted);
      }
    });

    // Tab focus / blur
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        Howler.mute(true);
      } else {
        Howler.mute(this.muted);
      }
    });

    // Debug
    if (this.debug) {
      this.debugFolder
        .add(this, "muted")
        .listen()
        .onChange(() => {
          Howler.mute(this.muted);
        });
    }
  }

  playFireplace() {
    this.fireplace.play();
  }

  playDeckTheHalls() {
    this.deck_the_halls.play();
  }

  playEntrance() {
    this.entrance.play();
  }

  playBellsClick() {
    this.bells_click.play();
  }
}
