import * as THREE from "three";
import Experience from "./Experience.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.config = this.experience.config;

    this.setInstance();
    this.setControls();
    this.setCamAngles();
    this.setTransitions();

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("camera");

      this.positionDebugFolder = this.debugFolder.addFolder("cameraPosition");
      this.positionDebugFolder
          .add(this.instance.position, "x")
          .min(-20)
          .max(20)
          .step(0.1);
      this.positionDebugFolder
          .add(this.instance.position, "y")
          .min(-20)
          .max(20)
          .step(0.1);
      this.positionDebugFolder
          .add(this.instance.position, "z")
          .min(-20)
          .max(20)
          .step(0.1);

      this.targetDebugFolder = this.debugFolder.addFolder("cameraTarget");
      this.targetDebugFolder
          .add(this.controls.target, "x")
          .min(-20)
          .max(20)
          .step(0.1);
      this.targetDebugFolder
          .add(this.controls.target, "y")
          .min(-20)
          .max(20)
          .step(0.1);
      this.targetDebugFolder
          .add(this.controls.target, "z")
          .min(-20)
          .max(20)
          .step(0.1);

      this.debugFolder.add(this.controls, "enablePan");

      this.cam = false;
      this.cameraToggle = { unlockCamera: false };
      this.debugFolder.add(this.cameraToggle, "unlockCamera").onChange(() => {
        this.cam ? this.camAngle.default() : this.camAngle.unlocked();
      });
    }
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
        75,
        this.sizes.width / this.sizes.height,
        0.4,
        125
    );
    this.instance.position.x = 10;
    this.instance.position.y = -1;
    this.instance.position.z = -6.2;
    this.scene.add(this.instance);
  }

  setControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
    this.controls.enablePan = false;
    this.controls.rotateSpeed = 1.2;
    this.controls.zoomSpeed = 0.8;
    this.controls.target.z = -1;
    this.controls.enableRotate = false;
    this.controls.enableZoom = false;
  }

  setCamAngles() {
    this.camAngle = {};

    this.camAngle.unlocked = () => {
      this.controls.maxDistance = 30;
      this.controls.minDistance = 0;
      this.controls.minAzimuthAngle = 0;
      this.controls.maxAzimuthAngle = Math.PI * 1.999;
      this.controls.minPolarAngle = 0;
      this.controls.maxPolarAngle = Math.PI;
      this.cam = true;
    };

    this.camAngle.default = () => {
      this.controls.minDistance = 7;
      this.controls.maxDistance = 16;
      this.controls.minAzimuthAngle = 0;
      this.controls.maxAzimuthAngle = Math.PI * 1.9999;
      this.controls.minPolarAngle = Math.PI * 0.2;
      this.controls.maxPolarAngle = Math.PI * 0.55;
      this.cam = false;
    };
  }

  setTransitions() {
    this.transitions = {};

    this.transitions.default = async (duration) => {
      this.controls.enableRotate = false;
      this.controls.enableZoom = false;

      gsap.to(this.instance.position, {
        duration: duration,
        ease: "power1.inOut",
        x: 3,
        y: -1,
        z: -8.5,
      });

      gsap.to(this.controls.target, {
        duration: duration,
        ease: "power1.inOut",
        x: 0,
        y: 0,
        z: 0,
      });

      await this.sleep(1500);
      this.controls.enableRotate = true;
      this.controls.enableZoom = true;
    };
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}