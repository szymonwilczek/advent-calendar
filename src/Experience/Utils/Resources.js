import * as THREE from "three";
import Experience from "../Experience.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
import EventEmitter from "./EventEmitter.js";

export default class Resources extends EventEmitter {
  constructor(sources) {
    super();

    this.experience = new Experience();
    this.sources = sources;
    this.renderer = this.experience.renderer.instance;

    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders = {};
    this.loaders.dracoLoader = new DRACOLoader();
    this.loaders.dracoLoader.setDecoderPath(
      "https://www.gstatic.com/draco/versioned/decoders/1.5.5/"
    );
    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);
    this.loaders.textureLoader = new THREE.TextureLoader();
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();

    this.loaders.KTX2TextureLoader = new KTX2Loader();
    this.loaders.KTX2TextureLoader.setTranscoderPath("./basis/");
    this.loaders.KTX2TextureLoader.detectSupport(this.renderer);
  }

  startLoading() {
    // Load each source
    for (const source of this.sources) {
      // console.log(source);
      if (source.type === "gltfModel") {
        this.loaders.gltfLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "texture") {
        this.loaders.textureLoader.load(source.path, (file) => {
          file.flipY = false;
          file.encoding = THREE.sRGBEncoding;
          this.sourceLoaded(source, file);
        });
      }
    }
  }

  sourceLoaded(source, file) {
    this.trigger("itemLoaded");

    this.items[source.name] = file;
    this.loaded++;

    if (this.loaded === this.toLoad) {
      this.trigger("ready");
    }
  }
}
