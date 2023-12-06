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

    // Helping sphere for casting position
    const sphere = new THREE.SphereGeometry(0.1, 16, 8);

    // Main Light (for shadows)
    const light = new THREE.DirectionalLight(0xdfe3ff, 0.3);
    light.castShadow = true;
    this.scene.add(light);

    // Light in front of the house
    const house_point = new THREE.PointLight(0xffb012, 10);
    house_point.distance = 4;
    house_point.castShadow = true;
    house_point.position.set(-1.2, -1, -2.6);
    this.scene.add(house_point);

    // Light from house window
    const house_window_point = new THREE.PointLight(0xffb012, 5);
    house_window_point.distance = 3.5;
    house_window_point.quaternion.setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      Math.PI / 2
    );
    house_window_point.castShadow = true;

    house_window_point.position.set(2.5, -1.75, 0.5);
    this.scene.add(house_window_point);

    // Christmas tree light
    const tree_point = new THREE.PointLight(0xdfe3ff, 2);
    tree_point.distance = 2.5;
    tree_point.castShadow = true;
    tree_point.position.set(-3.42, -1.25, -4.8);
    this.scene.add(tree_point);

    // Wolf light
    const wolf_point = new THREE.PointLight(0xdfe3ff, 1);
    wolf_point.distance = 3;
    wolf_point.castShadow = false;
    wolf_point.position.set(1.4, -1.5, -4);
    this.scene.add(wolf_point);

    // Stars
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.05,
    });

    const starsVertices = [];
    const starsCount = 1000;

    const minDistanceFromCenter = 100;

    for (let i = 0; i < starsCount; i++) {
      let x, y, z;
      let isValidPosition = false;

      while (!isValidPosition) {
        x = (Math.random() - 0.5) * 200;
        y = (Math.random() - 0.5) * 200;
        z = (Math.random() - 0.5) * 200;

        const distanceFromCenter = Math.sqrt(x ** 2 + y ** 2 + z ** 2);

        if (distanceFromCenter > minDistanceFromCenter) {
          isValidPosition = true;
        }
      }

      starsVertices.push(x, y, z);
    }

    starsGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starsVertices, 3)
    );

    this.stars = new THREE.Points(starsGeometry, starsMaterial);
    this.scene.add(this.stars);

    // Moon
    const moonGeometry = new THREE.SphereGeometry(3, 32, 32);
    const moonMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    this.moon = new THREE.Mesh(moonGeometry, moonMaterial);
    this.moon.position.set(-10, 70, 100);
    this.scene.add(this.moon);

    // Light that illuminates the scene from all directions (moon light)
    this.ambientLight = new THREE.AmbientLight(0xffffff, 25); // Set intensity as needed
    this.ambientLight.castShadow = true;
    this.scene.add(this.ambientLight);

    // Sky
    this.gradientColors = [0x0a0a10, 0x14141f, 0x000000];
    this.transitionSpeed = 0.001;
    this.currentBackgroundColor = new THREE.Color(this.gradientColors[0]);
    this.scene.background = this.currentBackgroundColor;

    // Resize event
    this.sizes.on("resize", () => {
      this.resize();
    });

    // Time tick event
    this.time.on("tick", () => {
      this.update();
      this.render();
    });

    window.addEventListener("mousemove", (event) => {
      this.onMouseMove(event);
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
    this.postProcessing.resize();
  }

  onMouseMove(event) {
    this.controller.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.controller.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  update() {
    // Update stars and moon position based on user movement (mouse position)
    const mouseX = (this.controller.mouse.x - 0.5) * 10;
    const mouseY = (this.controller.mouse.y - 0.5) * 2;

    this.stars.position.x += (mouseX - this.stars.position.x) * 0.02;
    this.stars.position.y += (-mouseY - this.stars.position.y) * 0.005;
    this.moon.position.x += (mouseX - this.moon.position.x) * 0.02;

    this.camera.update();
    this.world.update();
    this.postProcessing.update();
    this.animations.update();
    this.performance.update();
  }

  render() {
    const time = this.time.elapsed;
    const gradientIndex = Math.floor(time / 1000) % this.gradientColors.length;
    const nextColor = new THREE.Color(this.gradientColors[gradientIndex]);

    this.currentBackgroundColor.lerp(nextColor, this.transitionSpeed);
    this.scene.background = this.currentBackgroundColor;
    this.ambientLight.color.copy(this.currentBackgroundColor);
  }
}
