import Experience from "../Experience.js";
import gsap from "gsap";

export default class Animations {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.materials = this.experience.materials;
    this.time = this.experience.time;
    this.loaded = 0;

    //Set up tick function
    this.update = function update() {};

    // Wait for resources
    this.resources.on("ready", async () => {
      // Setup
      this.scenery = this.experience.world.scenery;
      this.controller = this.experience.controller;
      this.materials = this.experience.materials;
    });
  }

  slideTransition(material, newTexture, duration) {
    material.uniforms.texture2.value = newTexture;
    gsap.to(material.uniforms.progress, {
      value: 1,
      duration: duration,
      ease: "none",
      onComplete: () => {
        material.uniforms.texture1.value = newTexture;
        material.uniforms.progress.value = 0;
        this.changeSideScreen();
      },
    });
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
