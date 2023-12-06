import * as THREE from "three";
import Experience from "../Experience.js";

export default class ChristmasScenery {
  constructor() {
    this.experience = new Experience();
    this.animations = this.experience.animations;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.debug = this.experience.debug;
    this.materials = this.experience.materials;

    // Resource
    this.resource = this.resources.items.christmasSceneryModel;

    this.parseModel();
    this.setMaterials();
  }

  parseModel() {
    this.model = this.resource.scene;

    // Objects

    this.presents = this.model.children.find(
      (child) => child.name === "prezenty"
    );

    this.landscape = this.model.children.find(
      (child) => child.name === "landscape"
    );

    this.roof = this.model.children.find((child) => child.name === "snow_roof");

    this.trees = this.model.children.find((child) => child.name === "trees");

    this.wood = this.trees.children[0];
    this.leaves = this.trees.children[1];
    this.snow = this.trees.children[2];

    this.house = this.model.children.find((child) => child.name === "House");
    this.door = this.model.children.find((child) => child.name === "Door");
    this.woodDoor = this.door.children[0];
    this.metalDoor = this.door.children[1];
    this.woodHouse = this.house.children[0];
    this.metalHouse = this.house.children[1];
    this.woodHouse2 = this.house.children[3];

    this.lampki_zielone = this.model.children.find(
      (child) => child.name === "lampki_zielone"
    );
    this.lampki_czerwone = this.model.children.find(
      (child) => child.name === "lampki_czerwone"
    );
    this.lampki_zolte = this.model.children.find(
      (child) => child.name === "lampki_zolte"
    );
    this.lampki_niebieskie = this.model.children.find(
      (child) => child.name === "lampki_niebieskie"
    );

    this.floor = this.model.children.find((child) => child.name === "floor");

    this.moon = this.model.children.find((child) => child.name === "Moon");
    console.log(this.moon);
  }

  setMaterials() {
    // Set Materials
    this.resources.on("texturesMapped", () => {
      // Objects
      this.landscape.material = this.materials.landscapeMaterial;

      this.floor.material = this.materials.snowMaterial;
      //Prezenty
      for (let i = 0; i < this.presents.children.length; i++) {
        this.presents.children[i].material =
          this.materials.presentsNumberMaterial;
      }

      this.presents.children[1].material = this.materials.presentsOneMaterial;
      this.presents.children[3].material = this.materials.presentsOneMaterial;
      this.presents.children[8].material = this.materials.presentsTwoMaterial;
      this.presents.children[10].material =
        this.materials.presentsThreeMaterial;
    });

    this.wood.material = this.materials.woodMaterial;
    this.leaves.material = this.materials.leavesMaterial;
    this.snow.material = this.materials.snowMaterial;
    this.woodHouse.material = this.materials.woodHouseMaterial;
    this.metalHouse.material = this.materials.metalHouseMaterial;
    this.woodHouse2.material = this.materials.woodHouseMaterial;
    this.roof.material = this.materials.snowMaterial;
    this.woodDoor.material = this.materials.woodHouseMaterial;
    this.metalDoor.material = this.materials.metalHouseMaterial;
    this.lampki_zielone.material = this.materials.lampki_zieloneMaterial;
    this.lampki_czerwone.material = this.materials.lampki_czerwoneMaterial;
    this.lampki_zolte.material = this.materials.lampki_zolteMaterial;
    this.lampki_niebieskie.material = this.materials.lampki_niebieskieMaterial;
    this.model.position.y = -3;
    this.scene.add(this.model);
  }
}
