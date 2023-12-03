import * as THREE from "three";
import { GridHelper, Group } from "three";
import Experience from "./Experience.js";

export default class RayCaster {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera;
    this.sizes = this.experience.sizes;
    this.performance = this.experience.performance;
    this.preLoader = this.experience.preLoader;
    this.controller = this.experience.controller;
    this.config = this.experience.config;
    this.sounds = this.experience.sounds;

    // Wait for resources
    this.preLoader.on("start", () => {
      // Setup
      this.config.touch = this.experience.config.touch;
      this.scenery = this.experience.world.scenery;
      this.hologram = this.experience.world.hologram;
      this.raycaster = new THREE.Raycaster();
      this.cursorDown = new THREE.Vector2();
      this.cursor = new THREE.Vector2();

      // Wolf Hitboxes

      this.wolfHitBox = new THREE.Mesh(
        new THREE.BoxGeometry(0.6, 0.85, 0.4),
        this.hitBoxMaterial
      );
      this.wolfHitBox.position.set(1.4, -2.35, -3);

      this.wolfHitBox.visible = false;
      this.scene.add(this.wolfHitBox);

      // Presents Hitboxes

      this.presentHitboxes = new Group();

      this.giftOneHitBox = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        this.hitBoxMaterial
      );
      this.giftOneHitBox.position.set(-4.5, -2.35, -5.4);

      this.giftTwoHitBox = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        this.hitBoxMaterial
      );
      this.giftTwoHitBox.position.set(-6, -2.35, 2);

      this.giftThreeHitBox = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        this.hitBoxMaterial
      );
      this.giftThreeHitBox.position.set(-1.8, -2.35, 5);

      this.giftFourHitBox = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        this.hitBoxMaterial
      );
      this.giftFourHitBox.position.set(1.8, -2.35, 4.8);

      this.giftFiveHitBox = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        this.hitBoxMaterial
      );
      this.giftFiveHitBox.position.set(4.777, -2.35, -2.9);

      this.giftSixHitBox = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        this.hitBoxMaterial
      );
      this.giftSixHitBox.position.set(1.7, 1.1, -0.7);

      this.giftSevenHitBox = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        this.hitBoxMaterial
      );

      this.giftSevenHitBox.position.set(-1.5, 1.1, -1.2);

      this.giftEightHitBox = new THREE.Mesh(
        new THREE.BoxGeometry(2, 2, 2),
        this.hitBoxMaterial
      );

      this.giftEightHitBox.position.set(-12, -2.35, 5);

      this.giftNineHitBox = new THREE.Mesh(
        new THREE.BoxGeometry(2, 2, 2),
        this.hitBoxMaterial
      );

      this.giftNineHitBox.position.set(-12.8, 0, 25);

      this.giftTenHitBox = new THREE.Mesh(
        new THREE.BoxGeometry(2, 2, 2),
        this.hitBoxMaterial
      );

      this.giftTenHitBox.position.set(1.25, 1.25, 22);

      this.giftElevenHitBox = new THREE.Mesh(
        new THREE.BoxGeometry(2, 2, 2),
        this.hitBoxMaterial
      );

      this.giftElevenHitBox.position.set(8.25, 1.25, 18);

      this.giftTwelveHitBox = new THREE.Mesh(
        new THREE.BoxGeometry(2, 2, 2),
        this.hitBoxMaterial
      );

      this.giftTwelveHitBox.position.set(4.25, -1, 17.5);

      this.giftThirteenHitBox = new THREE.Mesh(
        new THREE.BoxGeometry(2, 2, 2),
        this.hitBoxMaterial
      );

      this.giftThirteenHitBox.position.set(-4.3, -1, 19);

      this.giftFourteenHitBox = new THREE.Mesh(
        new THREE.BoxGeometry(2, 2, 2),
        this.hitBoxMaterial
      );

      this.giftFourteenHitBox.position.set(11.5, -1, 13);

      this.giftFifteenHitBox = new THREE.Mesh(
        new THREE.BoxGeometry(2, 2, 2),
        this.hitBoxMaterial
      );

      this.giftFifteenHitBox.position.set(-11, -2.35, 13);

      this.giftSixteenHitBox = new THREE.Mesh(
        new THREE.BoxGeometry(2, 2, 2),
        this.hitBoxMaterial
      );

      this.giftSixteenHitBox.position.set(-15, -0.2, 0.7);

      this.giftSeventeenHitBox = new THREE.Mesh(
        new THREE.BoxGeometry(2, 2, 2),
        this.hitBoxMaterial
      );

      this.giftSeventeenHitBox.position.set(15, -1, 5);

      this.giftEighteenHitBox = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 1.5, 1.5),
        this.hitBoxMaterial
      );

      this.giftEighteenHitBox.position.set(8, -2.35, 0);

      this.giftNineteenHitBox = new THREE.Mesh(
        new THREE.BoxGeometry(2, 1.5, 2),
        this.hitBoxMaterial
      );
      this.giftNineteenHitBox.position.set(6, -2.35, 7.5);

      this.giftTwentyHitBox = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 1.5, 1.5),
        this.hitBoxMaterial
      );
      this.giftTwentyHitBox.position.set(-8, -1.7, -6.55);

      this.giftTwentyOneHitBox = new THREE.Mesh(
        new THREE.BoxGeometry(2, 2, 2),
        this.hitBoxMaterial
      );

      this.giftTwentyOneHitBox.position.set(10, -2.35, 5);

      this.giftTwentyTwoHitBox = new THREE.Mesh(
        new THREE.BoxGeometry(2, 2, 2),
        this.hitBoxMaterial
      );

      this.giftTwentyTwoHitBox.position.set(-6, -2.35, 7.5);

      this.giftTwentyThreeHitBox = new THREE.Mesh(
        new THREE.BoxGeometry(1.75, 1.75, 1.75),
        this.hitBoxMaterial
      );

      this.giftTwentyThreeHitBox.position.set(0.1, 1.65, 2.65);

      this.giftTwentyFourHitBox = new THREE.Mesh(
        new THREE.BoxGeometry(1.25, 1.25, 1.25),
        this.hitBoxMaterial
      );

      this.giftTwentyFourHitBox.position.set(-1.25, -2.35, -3.4);

      this.presentHitboxes.add(
        this.giftOneHitBox,
        this.giftTwoHitBox,
        this.giftThreeHitBox,
        this.giftFourHitBox,
        this.giftFiveHitBox,
        this.giftSixHitBox,
        this.giftSevenHitBox,
        this.giftEightHitBox,
        this.giftNineHitBox,
        this.giftTenHitBox,
        this.giftElevenHitBox,
        this.giftTwelveHitBox,
        this.giftThirteenHitBox,
        this.giftFourteenHitBox,
        this.giftFifteenHitBox,
        this.giftSixteenHitBox,
        this.giftSeventeenHitBox,
        this.giftEighteenHitBox,
        this.giftNineteenHitBox,
        this.giftTwentyHitBox,
        this.giftTwentyOneHitBox,
        this.giftTwentyTwoHitBox,
        this.giftTwentyThreeHitBox,
        this.giftTwentyFourHitBox
      );

      this.presentHitboxes.visible = false;
      this.scene.add(this.presentHitboxes);

      // Christmas Tree Hitboxes

      this.treeHitbox = new THREE.Mesh(
        new THREE.BoxGeometry(1, 2.75, 1),
        this.hitBoxMaterial
      );
      this.treeHitbox.position.set(-3.5, -2.35, -4.85);

      this.treeHitbox.visible = false;
      this.scene.add(this.treeHitbox);

      // Debug
      if (this.debug.active) {
        this.hitBoxVisibility = { visible: true };
        this.debugFolder = this.debug.ui.addFolder("touchHitBoxes");
        this.debugFolder.add(this.hitBoxVisibility, "visible").onChange(() => {
          this.wolfHitBox.visible = this.hitBoxVisibility.visible;
        });
      }

      // Objects to test

      this.objectsToTest = [
        //animals
        this.wolfHitBox,
        //presents
        this.giftOneHitBox,
        this.giftTwoHitBox,
        this.giftThreeHitBox,
        this.giftFourHitBox,
        this.giftFiveHitBox,
        this.giftSixHitBox,
        this.giftSevenHitBox,
        this.giftEightHitBox,
        this.giftNineHitBox,
        this.giftTenHitBox,
        this.giftElevenHitBox,
        this.giftTwelveHitBox,
        this.giftThirteenHitBox,
        this.giftFourteenHitBox,
        this.giftFifteenHitBox,
        this.giftSixteenHitBox,
        this.giftSeventeenHitBox,
        this.giftEighteenHitBox,
        this.giftNineteenHitBox,
        this.giftTwentyHitBox,
        this.giftTwentyOneHitBox,
        this.giftTwentyTwoHitBox,
        this.giftTwentyThreeHitBox,
        this.giftTwentyFourHitBox,
        //tree
        this.treeHitbox,
      ];

      this.touchedPoints = [];

      window.addEventListener("pointerdown", (event) => {
        this.touchedPoints.push(event.pointerId);

        this.cursorXMin = Math.abs(
          ((event.clientX / this.sizes.width) * 2 - 1) * 0.9
        );
        this.cursorXMax = Math.abs(
          ((event.clientX / this.sizes.width) * 2 - 1) * 1.1
        );

        this.cursorYMin = Math.abs(
          ((event.clientY / this.sizes.height) * 2 - 1) * 0.9
        );
        this.cursorYMax = Math.abs(
          ((event.clientY / this.sizes.height) * 2 - 1) * 1.1
        );
      });

      // Click listener
      window.addEventListener("pointerup", (event) => {
        this.cursor.x = (event.clientX / this.sizes.width) * 2 - 1;
        this.cursor.y = -(event.clientY / this.sizes.height) * 2 + 1;

        this.absX = Math.abs(this.cursor.x);
        this.absY = Math.abs(this.cursor.y);

        if (
          this.touchedPoints.length === 1 &&
          this.absX > this.cursorXMin &&
          this.absX < this.cursorXMax &&
          this.absY > this.cursorYMin &&
          this.absY < this.cursorYMax
        ) {
          this.click(this.cursor);

          this.touchedPoints = [];
        } else {
          this.touchedPoints = [];
        }
      });
    });
  }

  click(cursor) {
    this.raycaster.setFromCamera(cursor, this.camera.instance);

    //Object click listener
    this.intersectsObjects = this.raycaster.intersectObjects(
      this.objectsToTest
    );

    if (this.intersectsObjects.length) {
      this.selectedModel = this.intersectsObjects[0].object;
      const modalTobiasz = document.getElementById("myModalTobiasz");

      switch (this.selectedModel) {
        case this.wolfHitBox:
          if (modalTobiasz.classList.contains("show")) return;
          this.controller.animalControls.wolf();
          break;
        case this.treeHitbox:
          if (modalTobiasz.classList.contains("show")) return;
          this.controller.treeControls.xMasTree();
          break;
      }
    }
  }
}
