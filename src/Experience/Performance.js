import Experience from "./Experience.js";
import Stats from "stats.js";

export default class Performance {
  constructor() {
    this.experience = new Experience();
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;

    // Debug
    if (this.debug.active) {
      this.stats = new Stats();
      this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
      document.body.appendChild(this.stats.dom);
    }

    // Setup
    this.filterStrength = 5;
    this.frameTime = 0;
    this.lastLoop = new Date();
    this.intervalSet = null;

    this.windowOpen = true;
    this.setWindowVisibility();
  }

  setWindowVisibility() {
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.windowOpen = false;
      } else {
        this.windowOpen = true;
      }
    });
  }

  performanceCheck() {
    // Perform checks every 10 seconds
    if (this.intervalSet === null) {
      setInterval(() => {
        this.performanceCheck();
      }, 10000);
      this.intervalSet = true;
    }

    // Check Performance
    this.frameRate = 1000 / this.frameTime;

    if (this.frameRate <= 20 && this.windowOpen === true) {
      this.removeReflections();
    } else if (this.frameRate <= 30 && this.windowOpen === true) {
      this.removeReflections();
    }
  }

  removeReflections() {
    console.log(this.experience.world.reflections.groundMirror);
    this.experience.scene.remove(
      this.experience.world.reflections.groundMirror
    );
    this.experience.world.reflections.groundMirror.material.dispose();
  }

  update() {
    this.thisFrameTime = (this.thisLoop = new Date()) - this.lastLoop;
    this.frameTime +=
      (this.thisFrameTime - this.frameTime) / this.filterStrength;
    this.lastLoop = this.thisLoop;

    if (this.debug.active) {
      this.stats.begin();
      this.stats.end();
    }
  }
}
