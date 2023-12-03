import * as THREE from "three";

import Debug from "./Utils/Debug.js";
import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Camera from "./Camera.js";
import Renderer from "./Renderer.js";
import Sounds from "./Sounds.js";
import World from "./World/World.js";
import Resources from "./Utils/Resources.js";
import Materials from "./World/Materials.js";
import Animations from "./World/Animations.js";
import sources from "./sources.js";
import PostProcessing from "./PostProcessing.js";
import RayCaster from "./RayCaster.js";
import Performance from "./Performance.js";
import PreLoader from "./PreLoader.js";
import Controller from "./Controller.js";

let instance = null;

export default class Experience {
  constructor(_canvas) {
    // Singleton
    if (instance) {
      return instance;
    }
    instance = this;

    // Global access
    window.experience = this;

    // Options
    this.canvas = _canvas;

    //config
    this.config = {};
    this.config.touch = false;
    window.addEventListener(
      "touchstart",
      () => {
        this.config.touch = true;
      },
      { once: true }
    );

    // Setup
    this.debug = new Debug();
    this.scene = new THREE.Scene();
    // Lights

    // Helping sphere for casting position
    const sphere = new THREE.SphereGeometry(0.1, 16, 8);

    // main light
    const light = new THREE.DirectionalLight(0xdfe3ff, 0.3);
    light.castShadow = true;
    this.scene.add(light);

    //* Point lights

    //? House lamp lights

    // in front of the house
    const house_point = new THREE.PointLight(0xffb012, 2);
    house_point.distance = 4;
    house_point.castShadow = true;
    house_point.position.set(-1.2, -1, -2.6);
    this.scene.add(house_point);

    // house window lights
    const house_window_point = new THREE.PointLight(0xffb012, 5);
    house_window_point.distance = 3.5;
    house_window_point.quaternion.setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      Math.PI / 2
    );
    house_window_point.castShadow = true;

    house_window_point.position.set(2.5, -1.75, 0.5);
    this.scene.add(house_window_point);

    // ? Tree lights

    // Christmas tree light
    const tree_point = new THREE.PointLight(0xdfe3ff, 2);
    tree_point.distance = 2.5;
    tree_point.castShadow = true;
    tree_point.position.set(-3.42, -1.25, -4.8);
    this.scene.add(tree_point);

    this.sizes = new Sizes();

    this.config.vertical = this.sizes.width / this.sizes.height <= 1;

    this.time = new Time();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.sounds = new Sounds();
    this.resources = new Resources(sources);
    this.performance = new Performance();
    this.preLoader = new PreLoader();
    this.world = new World();
    this.materials = new Materials();
    this.animations = new Animations();
    this.postProcessing = new PostProcessing();
    this.controller = new Controller();
    this.rayCaster = new RayCaster();

    // Resize event
    this.sizes.on("resize", () => {
      this.resize();
    });

    // Time tick event
    this.time.on("tick", () => {
      this.update();
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
    this.postProcessing.resize();
  }

  update() {
    this.camera.update();
    this.world.update();
    this.postProcessing.update();
    this.animations.update();
    this.performance.update();
  }
}
