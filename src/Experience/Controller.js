import Experience from "./Experience.js";

export default class Controller {
  constructor() {
    // Setup
    this.experience = new Experience();
    this.camera = this.experience.camera;
    this.resources = this.experience.resources;
    this.sounds = this.experience.sounds;
    this.preLoader = this.experience.preLoader;
    this.config = this.experience.config;
    this.animations = this.experience.animations;
    this.password = null;

    // Add the mouse object to capture mouse coordinates
    this.mouse = { x: 0, y: 0 };

    // Set up event listeners for mouse movement
    window.addEventListener("mousemove", (event) => {
      this.onMouseMove(event);
    });

    this.setLogic();
    this.setCamControls();
    this.setAnimalControls();
    this.setTreeControls();
    this.setPresentControls();

    this.resources.on("ready", () => {
      this.scenery = this.experience.world.scenery;
      this.materials = this.experience.materials;
    });
  }

  onMouseMove(event) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  setLogic() {
    this.logic = {};
    this.logic.buttonsLocked = false;
    this.logic.mode = "menu";

    this.logic.lockButtons = async (lockDuration) => {
      this.logic.buttonsLocked = true;
      await this.sleep(lockDuration);
      this.logic.buttonsLocked = false;
    };
  }

  // Animal controls
  setAnimalControls() {
    this.animalControls = {};
    this.animalControls.wolf = async () => {
      if (this.logic.buttonsLocked === false && this.logic.mode === "menu") {
        this.sounds.playBellsClick();
        await this.sleep(250);
        window.open("https://github.com/szymonwilczek", "_blank").focus();
      }
    };
  }

  checkPassword() {
    if (this.logic.buttonsLocked === false && this.logic.mode === "menu") {
      // Get the entered password from the input field
      const enteredPassword = document.getElementById("passwordInput").value;

      // Check if the entered password is correct
      if (enteredPassword && enteredPassword.toLowerCase() === "chuj") {
        this.updateModalContent(
          "Nowy Tytuł",
          "Nowy Opis",
          "Nowa treść po wprowadzeniu poprawnego hasła."
        );

        // Store the password
        this.password = enteredPassword;
      } else {
        console.log("Incorrect password");
        // Handle incorrect password (optional)
      }
    }
  }

  setPresentControls() {
    this.presentControls = {};
    this.presentControls.presentOne = async () => {
      if (this.logic.buttonsLocked === false && this.logic.mode === "menu") {
        this.sounds.playBellsClick();

        this.checkPassword();

        let image = document.getElementById("frogModalImg");
        image.src = "https://i.imgur.com/CpazN4z.png";
        let title = document.getElementById("modalHeader");
        title.innerHTML = "1 grudnia";
        let opis = document.getElementById("contentHeader");
        opis.innerHTML = "Przytulanie & film & goraca czekolada";
        let text = document.getElementById("myModalContent");
        text.innerHTML =
          "Pierwszy dzień grudnia, pierwszy dzień kalendarza adwentowego. Czas na pierwszą czekoladkę!";

        document.getElementById("openModalBtnTobiasz").click();
        await this.sleep(250);
      }
    };
  }

  setTreeControls() {
    this.treeControls = {};
    this.treeControls.xMasTree = async () => {
      if (this.logic.buttonsLocked === false && this.logic.mode === "menu") {
        // play deck the halls, if it's not already playing
        if (!this.sounds.deck_the_halls.playing()) {
          this.sounds.playDeckTheHalls();
        } else {
          this.sounds.deck_the_halls.stop();
        }
      }
    };
  }

  // camera transitions and angles

  setCamControls() {
    this.camControls = {};
    this.camControls.toDefault = async () => {
      this.sounds.playEntrance();

      this.logic.lockButtons(1500);
      this.camera.camAngle.unlocked();
      this.camera.transitions.default(1.5);
      await this.sleep(1500);
      this.camera.camAngle.default();
    };
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
