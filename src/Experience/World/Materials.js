import * as THREE from "three";
import Experience from "../Experience.js";

export default class Materials {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.preLoader = this.experience.preLoader;
    this.config = this.experience.config;

    this.mapColors();

    // Wait for textures
    this.resources.on("ready", () => {
      this.mapTextures();
    });

    this.preLoader.on("start", () => {
      this.config.touch = this.experience.config.touch;
    });
  }

  mapColors() {
    this.landscapeMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#DCDFF3"),
      fog: true,
      blending: 1,
      transparent: false,

      metalness: 0.0,
      roughness: 1,
      side: THREE.DoubleSide,
    });
    this.presentsNumberMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#ff0101"),
    });

    this.woodMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#8F480C"),
      fog: true,
      blending: 1,
      transparent: false,
      metalness: 0.0,
      roughness: 0.69,
      side: THREE.DoubleSide,
    });

    this.leavesMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#2E773B"),
      fog: true,
      blending: 1,
      transparent: false,
      metalness: 0.0,
      roughness: 1,
      side: THREE.DoubleSide,
    });

    this.snowMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#DCDFF3"),
      fog: true,
      blending: 1,
      transparent: false,
      metalness: 0.0,
      roughness: 1,
      side: THREE.DoubleSide,
    });

    this.woodHouseMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#91632B"),
      fog: true,
      blending: 1,
      transparent: false,
      metalness: 0.0,
      roughness: 0.7,
      side: THREE.DoubleSide,
    });

    this.metalHouseMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#7F6938"),
      fog: true,
      blending: 1,
      transparent: false,
      metalness: 0.773,
      roughness: 0.056,
      side: THREE.DoubleSide,
      flatShading: false,
    });

    // glowing lights
    this.lampki_zieloneMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#00FF00"),
    });

    this.lampki_czerwoneMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#FF0000"),
    });

    this.lampki_zolteMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#FFFF00"),
    });

    this.lampki_niebieskieMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#0000FF"),
    });
  }

  mapTextures() {
    // map baked textures

    this.presentsOneMaterial = new THREE.MeshBasicMaterial({
      map: this.resources.items.presentsOneTexture,
    });
    this.presentsTwoMaterial = new THREE.MeshBasicMaterial({
      map: this.resources.items.presentsTwoTexture,
    });
    this.presentsThreeMaterial = new THREE.MeshBasicMaterial({
      map: this.resources.items.presentsThreeTexture,
    });

    this.resources.trigger("texturesMapped");
  }
}
