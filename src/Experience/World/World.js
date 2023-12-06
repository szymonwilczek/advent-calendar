import Experience from "../Experience.js";
import ChristmasScenery from "./ChristmasScenery.js";
import Reflections from "./Reflections.js";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.controller = this.experience.controller;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Wait for resources
    this.resources.on("ready", () => {
      //wait for 2 seconds
      this.scenery = new ChristmasScenery();
      this.reflections = new Reflections();
    });
  }

  update() {
    if (this.hologram) {
      this.hologram.update();
    }
  }
}
