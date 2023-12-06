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

  checkDate(presentNumber) {
    let currentDate = new Date();
    let currentDay = currentDate.getDate();
    let currentMonth = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1

    // Assuming the calendar events are for December
    if (currentMonth === 12) {
      // Check if the current date has passed or is today
      if (currentDay < presentNumber) {
        console.log("Current day is before the specified present number");
        // If the current day is before the specified present number, disallow clicking
        return false;
      } else {
        // Otherwise, allow clicking
        console.log("Current day is after the specified present number");
        return true;
      }
    } else {
      console.log("Current month is not December");
      // If it's not December, or the events have finished, disallow clicking
      return false;
    }
  }

  setPresentControls() {
    this.presentControls = {};
    this.presentControls.presentOne = async () => {
      const presentNumber = 1;
      if (
        this.logic.buttonsLocked === false &&
        this.logic.mode === "menu" &&
        this.checkDate(presentNumber)
      ) {
        this.sounds.playBellsClick();

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

    this.presentControls.presentTwo = async () => {
      if (this.logic.buttonsLocked === false && this.logic.mode === "menu") {
        this.sounds.playBellsClick();

        let image = document.getElementById("frogModalImg");
        image.src = "https://i.imgur.com/0W9qz7B.png";
        let title = document.getElementById("modalHeader");
        title.innerHTML = "2 grudnia";
        let opis = document.getElementById("contentHeader");
        opis.innerHTML = "Kolejny film";
        let text = document.getElementById("myModalContent");
        text.innerHTML =
          "Drugi dzień grudnia, drugi dzień kalendarza adwentowego. Czas na drugą czekoladkę!";

        document.getElementById("openModalBtnTobiasz").click();
        await this.sleep(250);
      }
    };

    this.presentControls.presentThree = async () => {
      if (this.logic.buttonsLocked === false && this.logic.mode === "menu") {
        this.sounds.playBellsClick();

        let image = document.getElementById("frogModalImg");
        image.src = "https://i.imgur.com/0W9qz7B.png";
        let title = document.getElementById("modalHeader");
        title.innerHTML = "3 grudnia";
        let opis = document.getElementById("contentHeader");
        opis.innerHTML = "Kolejny film";
        let text = document.getElementById("myModalContent");
        text.innerHTML =
          "Trzeci dzień grudnia, trzeci dzień kalendarza adwentowego. Czas na trzecią czekoladkę!";

        document.getElementById("openModalBtnTobiasz").click();
        await this.sleep(250);
      }
    };

    this.presentControls.presentFour = async () => {
      if (this.logic.buttonsLocked === false && this.logic.mode === "menu") {
        this.sounds.playBellsClick();

        let image = document.getElementById("frogModalImg");
        image.src = "https://i.imgur.com/0W9qz7B.png";
        let title = document.getElementById("modalHeader");
        title.innerHTML = "4 grudnia";
        let opis = document.getElementById("contentHeader");
        opis.innerHTML = "Kolejny film";
        let text = document.getElementById("myModalContent");
        text.innerHTML =
          "Czwarty dzień grudnia, czwarty dzień kalendarza adwentowego. Czas na czwartą czekoladkę!";

        document.getElementById("openModalBtnTobiasz").click();
        await this.sleep(250);
      }
    };

    this.presentControls.presentFive = async () => {
      if (this.logic.buttonsLocked === false && this.logic.mode === "menu") {
        this.sounds.playBellsClick();

        let image = document.getElementById("frogModalImg");
        image.src = "https://i.imgur.com/0W9qz7B.png";
        let title = document.getElementById("modalHeader");
        title.innerHTML = "5 grudnia";
        let opis = document.getElementById("contentHeader");
        opis.innerHTML = "Kolejny film";
        let text = document.getElementById("myModalContent");
        text.innerHTML =
          "Piąty dzień grudnia, piąty dzień kalendarza adwentowego. Czas na piątą czekoladkę!";

        document.getElementById("openModalBtnTobiasz").click();
        await this.sleep(250);
      }
    };

    this.presentControls.presentSix = async () => {
      const presentNumber = 6;
      if (
        this.logic.buttonsLocked === false &&
        this.logic.mode === "menu" &&
        this.checkDate(presentNumber)
      ) {
        this.sounds.playBellsClick();

        let image = document.getElementById("frogModalImg");
        image.src = "https://i.imgur.com/0W9qz7B.png";
        let title = document.getElementById("modalHeader");
        title.innerHTML = "6 grudnia";
        let opis = document.getElementById("contentHeader");
        opis.innerHTML = "Kolejny film";
        let text = document.getElementById("myModalContent");
        text.innerHTML =
          "Szósty dzień grudnia, szósty dzień kalendarza adwentowego. Czas na szóstą czekoladkę!";

        document.getElementById("openModalBtnTobiasz").click();
        await this.sleep(250);
      }
    };

    this.presentControls.presentSeven = async () => {
      const presentNumber = 7;
      if (
        this.logic.buttonsLocked === false &&
        this.logic.mode === "menu" &&
        this.checkDate(presentNumber)
      ) {
        this.sounds.playBellsClick();

        let image = document.getElementById("frogModalImg");
        image.src = "https://i.imgur.com/0W9qz7B.png";
        let title = document.getElementById("modalHeader");
        title.innerHTML = "7 grudnia";
        let opis = document.getElementById("contentHeader");
        opis.innerHTML = "Kolejny film";
        let text = document.getElementById("myModalContent");
        text.innerHTML =
          "Siódmy dzień grudnia, siódmy dzień kalendarza adwentowego. Czas na siódmą czekoladkę!";

        document.getElementById("openModalBtnTobiasz").click();
        await this.sleep(250);
      }
    };

    this.presentControls.presentEight = async () => {
      if (this.logic.buttonsLocked === false && this.logic.mode === "menu") {
        this.sounds.playBellsClick();

        let image = document.getElementById("frogModalImg");
        image.src = "https://i.imgur.com/0W9qz7B.png";
        let title = document.getElementById("modalHeader");
        title.innerHTML = "7 grudnia";
        let opis = document.getElementById("contentHeader");
        opis.innerHTML = "Kolejny film";
        let text = document.getElementById("myModalContent");
        text.innerHTML =
          "Siódmy dzień grudnia, siódmy dzień kalendarza adwentowego. Czas na siódmą czekoladkę!";

        document.getElementById("openModalBtnTobiasz").click();
        await this.sleep(250);
      }
    };

    this.presentControls.presentNine = async () => {
      if (this.logic.buttonsLocked === false && this.logic.mode === "menu") {
        this.sounds.playBellsClick();

        let image = document.getElementById("frogModalImg");
        image.src = "https://i.imgur.com/0W9qz7B.png";
        let title = document.getElementById("modalHeader");
        title.innerHTML = "7 grudnia";
        let opis = document.getElementById("contentHeader");
        opis.innerHTML = "Kolejny film";
        let text = document.getElementById("myModalContent");
        text.innerHTML =
          "Siódmy dzień grudnia, siódmy dzień kalendarza adwentowego. Czas na siódmą czekoladkę!";

        document.getElementById("openModalBtnTobiasz").click();
        await this.sleep(250);
      }
    };

    this.presentControls.presentTen = async () => {
      if (this.logic.buttonsLocked === false && this.logic.mode === "menu") {
        this.sounds.playBellsClick();

        let image = document.getElementById("frogModalImg");
        image.src = "https://i.imgur.com/0W9qz7B.png";
        let title = document.getElementById("modalHeader");
        title.innerHTML = "7 grudnia";
        let opis = document.getElementById("contentHeader");
        opis.innerHTML = "Kolejny film";
        let text = document.getElementById("myModalContent");
        text.innerHTML =
          "Siódmy dzień grudnia, siódmy dzień kalendarza adwentowego. Czas na siódmą czekoladkę!";

        document.getElementById("openModalBtnTobiasz").click();
        await this.sleep(250);
      }
    };

    this.presentControls.presentEleven = async () => {
      if (this.logic.buttonsLocked === false && this.logic.mode === "menu") {
        this.sounds.playBellsClick();

        let image = document.getElementById("frogModalImg");
        image.src = "https://i.imgur.com/0W9qz7B.png";
        let title = document.getElementById("modalHeader");
        title.innerHTML = "7 grudnia";
        let opis = document.getElementById("contentHeader");
        opis.innerHTML = "Kolejny film";
        let text = document.getElementById("myModalContent");
        text.innerHTML =
          "Siódmy dzień grudnia, siódmy dzień kalendarza adwentowego. Czas na siódmą czekoladkę!";

        document.getElementById("openModalBtnTobiasz").click();
        await this.sleep(250);
      }
    };

    this.presentControls.presentTwelve = async () => {
      if (this.logic.buttonsLocked === false && this.logic.mode === "menu") {
        this.sounds.playBellsClick();

        let image = document.getElementById("frogModalImg");
        image.src = "https://i.imgur.com/0W9qz7B.png";
        let title = document.getElementById("modalHeader");
        title.innerHTML = "7 grudnia";
        let opis = document.getElementById("contentHeader");
        opis.innerHTML = "Kolejny film";
        let text = document.getElementById("myModalContent");
        text.innerHTML =
          "Siódmy dzień grudnia, siódmy dzień kalendarza adwentowego. Czas na siódmą czekoladkę!";

        document.getElementById("openModalBtnTobiasz").click();
        await this.sleep(250);
      }
    };

    this.presentControls.presentThirteen = async () => {
      if (this.logic.buttonsLocked === false && this.logic.mode === "menu") {
        this.sounds.playBellsClick();

        let image = document.getElementById("frogModalImg");
        image.src = "https://i.imgur.com/0W9qz7B.png";
        let title = document.getElementById("modalHeader");
        title.innerHTML = "7 grudnia";
        let opis = document.getElementById("contentHeader");
        opis.innerHTML = "Kolejny film";
        let text = document.getElementById("myModalContent");
        text.innerHTML =
          "Siódmy dzień grudnia, siódmy dzień kalendarza adwentowego. Czas na siódmą czekoladkę!";

        document.getElementById("openModalBtnTobiasz").click();
        await this.sleep(250);
      }
    };

    this.presentControls.presentFourteen = async () => {
      if (this.logic.buttonsLocked === false && this.logic.mode === "menu") {
        this.sounds.playBellsClick();

        let image = document.getElementById("frogModalImg");
        image.src = "https://i.imgur.com/0W9qz7B.png";
        let title = document.getElementById("modalHeader");
        title.innerHTML = "7 grudnia";
        let opis = document.getElementById("contentHeader");
        opis.innerHTML = "Kolejny film";
        let text = document.getElementById("myModalContent");
        text.innerHTML =
          "Siódmy dzień grudnia, siódmy dzień kalendarza adwentowego. Czas na siódmą czekoladkę!";

        document.getElementById("openModalBtnTobiasz").click();
        await this.sleep(250);
      }
    };

    this.presentControls.presentFifteen = async () => {
      if (this.logic.buttonsLocked === false && this.logic.mode === "menu") {
        this.sounds.playBellsClick();

        let image = document.getElementById("frogModalImg");
        image.src = "https://i.imgur.com/0W9qz7B.png";
        let title = document.getElementById("modalHeader");
        title.innerHTML = "7 grudnia";
        let opis = document.getElementById("contentHeader");
        opis.innerHTML = "Kolejny film";
        let text = document.getElementById("myModalContent");
        text.innerHTML =
          "Siódmy dzień grudnia, siódmy dzień kalendarza adwentowego. Czas na siódmą czekoladkę!";

        document.getElementById("openModalBtnTobiasz").click();
        await this.sleep(250);
      }
    };

    this.presentControls.presentSixteen = async () => {
      if (this.logic.buttonsLocked === false && this.logic.mode === "menu") {
        this.sounds.playBellsClick();

        let image = document.getElementById("frogModalImg");
        image.src = "https://i.imgur.com/0W9qz7B.png";
        let title = document.getElementById("modalHeader");
        title.innerHTML = "7 grudnia";
        let opis = document.getElementById("contentHeader");
        opis.innerHTML = "Kolejny film";
        let text = document.getElementById("myModalContent");
        text.innerHTML =
          "Siódmy dzień grudnia, siódmy dzień kalendarza adwentowego. Czas na siódmą czekoladkę!";

        document.getElementById("openModalBtnTobiasz").click();
        await this.sleep(250);
      }
    };

    this.presentControls.presentSeventeen = async () => {
      if (this.logic.buttonsLocked === false && this.logic.mode === "menu") {
        this.sounds.playBellsClick();

        let image = document.getElementById("frogModalImg");
        image.src = "https://i.imgur.com/0W9qz7B.png";
        let title = document.getElementById("modalHeader");
        title.innerHTML = "7 grudnia";
        let opis = document.getElementById("contentHeader");
        opis.innerHTML = "Kolejny film";
        let text = document.getElementById("myModalContent");
        text.innerHTML =
          "Siódmy dzień grudnia, siódmy dzień kalendarza adwentowego. Czas na siódmą czekoladkę!";

        document.getElementById("openModalBtnTobiasz").click();
        await this.sleep(250);
      }
    };

    this.presentControls.presentEighteen = async () => {
      if (this.logic.buttonsLocked === false && this.logic.mode === "menu") {
        this.sounds.playBellsClick();

        let image = document.getElementById("frogModalImg");
        image.src = "https://i.imgur.com/0W9qz7B.png";
        let title = document.getElementById("modalHeader");
        title.innerHTML = "7 grudnia";
        let opis = document.getElementById("contentHeader");
        opis.innerHTML = "Kolejny film";
        let text = document.getElementById("myModalContent");
        text.innerHTML =
          "Siódmy dzień grudnia, siódmy dzień kalendarza adwentowego. Czas na siódmą czekoladkę!";

        document.getElementById("openModalBtnTobiasz").click();
        await this.sleep(250);
      }
    };

    this.presentControls.presentNineteen = async () => {
      if (this.logic.buttonsLocked === false && this.logic.mode === "menu") {
        this.sounds.playBellsClick();

        let image = document.getElementById("frogModalImg");
        image.src = "https://i.imgur.com/0W9qz7B.png";
        let title = document.getElementById("modalHeader");
        title.innerHTML = "7 grudnia";
        let opis = document.getElementById("contentHeader");
        opis.innerHTML = "Kolejny film";
        let text = document.getElementById("myModalContent");
        text.innerHTML =
          "Siódmy dzień grudnia, siódmy dzień kalendarza adwentowego. Czas na siódmą czekoladkę!";

        document.getElementById("openModalBtnTobiasz").click();
        await this.sleep(250);
      }
    };

    this.presentControls.presentTwenty = async () => {
      if (this.logic.buttonsLocked === false && this.logic.mode === "menu") {
        this.sounds.playBellsClick();

        let image = document.getElementById("frogModalImg");
        image.src = "https://i.imgur.com/0W9qz7B.png";
        let title = document.getElementById("modalHeader");
        title.innerHTML = "7 grudnia";
        let opis = document.getElementById("contentHeader");
        opis.innerHTML = "Kolejny film";
        let text = document.getElementById("myModalContent");
        text.innerHTML =
          "Siódmy dzień grudnia, siódmy dzień kalendarza adwentowego. Czas na siódmą czekoladkę!";

        document.getElementById("openModalBtnTobiasz").click();
        await this.sleep(250);
      }
    };

    this.presentControls.presentTwentyOne = async () => {
      if (this.logic.buttonsLocked === false && this.logic.mode === "menu") {
        this.sounds.playBellsClick();

        let image = document.getElementById("frogModalImg");
        image.src = "https://i.imgur.com/0W9qz7B.png";
        let title = document.getElementById("modalHeader");
        title.innerHTML = "7 grudnia";
        let opis = document.getElementById("contentHeader");
        opis.innerHTML = "Kolejny film";
        let text = document.getElementById("myModalContent");
        text.innerHTML =
          "Siódmy dzień grudnia, siódmy dzień kalendarza adwentowego. Czas na siódmą czekoladkę!";

        document.getElementById("openModalBtnTobiasz").click();
        await this.sleep(250);
      }
    };

    this.presentControls.presentTwentyTwo = async () => {
      if (this.logic.buttonsLocked === false && this.logic.mode === "menu") {
        this.sounds.playBellsClick();

        let image = document.getElementById("frogModalImg");
        image.src = "https://i.imgur.com/0W9qz7B.png";
        let title = document.getElementById("modalHeader");
        title.innerHTML = "7 grudnia";
        let opis = document.getElementById("contentHeader");
        opis.innerHTML = "Kolejny film";
        let text = document.getElementById("myModalContent");
        text.innerHTML =
          "Siódmy dzień grudnia, siódmy dzień kalendarza adwentowego. Czas na siódmą czekoladkę!";

        document.getElementById("openModalBtnTobiasz").click();
        await this.sleep(250);
      }
    };

    this.presentControls.presentTwentyThree = async () => {
      if (this.logic.buttonsLocked === false && this.logic.mode === "menu") {
        this.sounds.playBellsClick();

        let image = document.getElementById("frogModalImg");
        image.src = "https://i.imgur.com/0W9qz7B.png";
        let title = document.getElementById("modalHeader");
        title.innerHTML = "7 grudnia";
        let opis = document.getElementById("contentHeader");
        opis.innerHTML = "Kolejny film";
        let text = document.getElementById("myModalContent");
        text.innerHTML =
          "Siódmy dzień grudnia, siódmy dzień kalendarza adwentowego. Czas na siódmą czekoladkę!";

        document.getElementById("openModalBtnTobiasz").click();
        await this.sleep(250);
      }
    };

    this.presentControls.presentTwentyFour = async () => {
      if (this.logic.buttonsLocked === false && this.logic.mode === "menu") {
        this.sounds.playBellsClick();

        let image = document.getElementById("frogModalImg");
        image.src = "https://i.imgur.com/0W9qz7B.png";
        let title = document.getElementById("modalHeader");
        title.innerHTML = "7 grudnia";
        let opis = document.getElementById("contentHeader");
        opis.innerHTML = "Kolejny film";
        let text = document.getElementById("myModalContent");
        text.innerHTML =
          "Siódmy dzień grudnia, siódmy dzień kalendarza adwentowego. Czas na siódmą czekoladkę!";

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
