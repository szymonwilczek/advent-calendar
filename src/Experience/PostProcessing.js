import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass.js";
import vertexShader from "../shaders/bloomShaders/vertex.glsl";
import fragmentShader from "../shaders/bloomShaders/fragment.glsl";
import Experience from "./Experience.js";

let bloomLayer = null;
let darkMaterial = null;
let materials = null;

export default class PostProcessing {
  constructor() {
    this.experience = new Experience();
    this.canvas = this.experience.canvas;
    this.renderer = this.experience.renderer;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;

    this.update = function update() {};

    // Wait for resources
    this.resources.on("ready", () => {
      this.scenery = this.experience.world.scenery;
      this.setBloomConfig();
      this.setBloomObjects();
      this.setRenderTarget();
      this.setPasses();
      this.setUpBloom();
    });
  }

  setBloomConfig() {
    this.BLOOM_SCENE = 1;
    bloomLayer = new THREE.Layers();
    bloomLayer.set(this.BLOOM_SCENE);

    this.bloomParams = {};
    this.bloomParams.bloomStrength = 1.3;
    this.bloomParams.bloomThreshold = 0;
    this.bloomParams.bloomRadius = 1;

    darkMaterial = new THREE.MeshBasicMaterial({ color: "black" });
    materials = {};
  }

  setBloomObjects() {
    this.scenery.lampki_czerwone.layers.enable(this.BLOOM_SCENE);
    this.scenery.lampki_zielone.layers.enable(this.BLOOM_SCENE);
    // this.scenery.lampHouse.layers.enable(this.BLOOM_SCENE);
    this.scenery.lampki_niebieskie.layers.enable(this.BLOOM_SCENE);
    this.scenery.lampki_zolte.layers.enable(this.BLOOM_SCENE);
  }

  turnOffBloom() {
    this.scenery.lampki_czerwone.layers.disable(this.BLOOM_SCENE);
    this.scenery.lampki_zielone.layers.disable(this.BLOOM_SCENE);
    this.scenery.lampHouse.layers.disable(this.BLOOM_SCENE);
    this.scenery.lampki_niebieskie.layers.disable(this.BLOOM_SCENE);
    this.scenery.lampki_zolte.layers.disable(this.BLOOM_SCENE);
  }

  setRenderTarget() {
    this.renderTarget = new THREE.WebGLRenderTarget(800, 600, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      encoding: THREE.sRGBEncoding,
    });
  }

  setPasses() {
    this.renderPass = new RenderPass(this.scene, this.camera.instance);

    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(this.sizes.width, this.sizes.height),
      1.5,
      0.4,
      0.85
    );
    this.bloomPass.threshold = this.bloomParams.bloomThreshold;
    this.bloomPass.strength = this.bloomParams.bloomStrength;
    this.bloomPass.radius = this.bloomParams.bloomRadius;

    this.bloomComposer = new EffectComposer(this.renderer.instance);
    this.bloomComposer.renderToScreen = false;
    this.bloomComposer.addPass(this.renderPass);
    this.bloomComposer.addPass(this.bloomPass);

    this.finalPass = new ShaderPass(
      new THREE.ShaderMaterial({
        uniforms: {
          baseTexture: { value: null },
          bloomTexture: { value: this.bloomComposer.renderTarget2.texture },
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        defines: {},
        precision: "lowp",
      }),
      "baseTexture"
    );

    this.finalPass.needsSwap = true;
    this.finalComposer = new EffectComposer(
      this.renderer.instance,
      this.renderTarget
    );

    this.finalComposer.setSize(this.sizes.width, this.sizes.height);
    this.finalComposer.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));

    this.finalComposer.addPass(this.renderPass);
    this.finalComposer.addPass(this.finalPass);

    this.smaaPass = new SMAAPass();
    this.finalComposer.addPass(this.smaaPass);

    this.enableUpdate();
  }

  setUpBloom() {
    this.renderBloom = function renderBloom() {
      this.scene.traverse(this.darkenNonBloomed);
      this.bloomComposer.render();
      this.scene.traverse(this.restoreMaterial);
    };
  }

  darkenNonBloomed(obj) {
    if (obj.isMesh && bloomLayer.test(obj.layers) === false) {
      materials[obj.uuid] = obj.material;
      obj.material = darkMaterial;
    }
  }

  restoreMaterial(obj) {
    if (materials[obj.uuid]) {
      obj.material = materials[obj.uuid];
      delete materials[obj.uuid];
    }
  }

  enableUpdate() {
    this.update = function update() {
      {
        this.renderBloom();
      }
      {
        this.finalComposer.render();
      }
    };
  }

  resize() {
    if (this.bloomComposer) {
      this.bloomComposer.setSize(this.sizes.width, this.sizes.height);
    }
    if (this.bloomComposer) {
      this.bloomComposer.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
    }
    if (this.finalComposer) {
      this.finalComposer.setSize(this.sizes.width, this.sizes.height);
    }
    if (this.finalComposer) {
      this.finalComposer.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
    }
  }
}
