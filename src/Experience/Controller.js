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
        // If the current day is before the specified present number, disallow clicking
        this.showLockedModal();
        return false;
      } else {
        // Otherwise, allow clicking
        return true;
      }
    } else {
      // If it's not December, or the events have finished, disallow clicking
      return false;
    }
  }

  showLockedModal() {
    this.sounds.playBellsClick();
    let image = document.getElementById("frogModalImg");
    image.src = "https://i.imgur.com/Imq6h7S.png";
    let title = document.getElementById("modalHeader");
    title.innerHTML = "Zablokowane";
    let opis = document.getElementById("contentHeader");
    opis.innerHTML = "To zadanie jest jeszcze zablokowane";
    let text = document.getElementById("myModalContent");
    text.innerHTML =
      "Ta część tego kalendarza będzie dopiero dostępna. Sprawdź datę!";

    document.getElementById("openModalBtnTobiasz").click();
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
      const presentNumber = 2;
      if (
        this.logic.buttonsLocked === false &&
        this.logic.mode === "menu" &&
        this.checkDate(presentNumber)
      ) {
        this.sounds.playBellsClick();

        let image = document.getElementById("frogModalImg");
        image.src = "https://i.imgur.com/R5QZtS9.png";
        let title = document.getElementById("modalHeader");
        title.innerHTML = "2 grudnia";
        let opis = document.getElementById("contentHeader");
        opis.innerHTML = "Spacerek w zasniezonym lesie";
        let text = document.getElementById("myModalContent");
        text.innerHTML = "Chciałabyś się wybrać na spacer?";

        document.getElementById("openModalBtnTobiasz").click();
        await this.sleep(250);
      }
    };

    this.presentControls.presentThree = async () => {
      const presentNumber = 3;
      if (
        this.logic.buttonsLocked === false &&
        this.logic.mode === "menu" &&
        this.checkDate(presentNumber)
      ) {
        this.sounds.playBellsClick();

        let image = document.getElementById("frogModalImg");
        image.src = "https://i.imgur.com/r9M4Evk.png";
        let title = document.getElementById("modalHeader");
        title.innerHTML = "3 grudnia";
        let opis = document.getElementById("contentHeader");
        opis.innerHTML = "Wspolne pieczenie piernikow";
        let text = document.getElementById("myModalContent");
        text.innerHTML = "Już czuję ten zapach, a może potem je udekorujemy?";

        document.getElementById("openModalBtnTobiasz").click();
        await this.sleep(250);
      }
    };

    this.presentControls.presentFour = async () => {
      const presentNumber = 4;
      if (
        this.logic.buttonsLocked === false &&
        this.logic.mode === "menu" &&
        this.checkDate(presentNumber)
      ) {
        this.sounds.playBellsClick();

        let image = document.getElementById("frogModalImg");
        image.src = "https://i.imgur.com/rEpcKpe.png";
        let title = document.getElementById("modalHeader");
        title.innerHTML = "4 grudnia";
        let opis = document.getElementById("contentHeader");
        opis.innerHTML = "Wspolna gra swiateczna";
        let text = document.getElementById("myModalContent");
        text.innerHTML =
          "Trochę rywalizacji nie zaszkodzi nawet w święta, prawda?";

        document.getElementById("openModalBtnTobiasz").click();
        await this.sleep(250);
      }
    };

    this.presentControls.presentFive = async () => {
      const presentNumber = 5;
      if (
        this.logic.buttonsLocked === false &&
        this.logic.mode === "menu" &&
        this.checkDate(presentNumber)
      ) {
        this.sounds.playBellsClick();

        let image = document.getElementById("frogModalImg");
        image.src = "https://i.imgur.com/TyqE2PX.png";
        let title = document.getElementById("modalHeader");
        title.innerHTML = "5 grudnia";
        let opis = document.getElementById("contentHeader");
        opis.innerHTML = "Masaz";
        let text = document.getElementById("myModalContent");
        text.innerHTML =
          "Masz ostatnio dużo na głowie, przydałby Ci się odstresowujący masaż.";

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
        image.src = "https://i.imgur.com/lcOxm52.png";
        let title = document.getElementById("modalHeader");
        title.innerHTML = "6 grudnia";
        let opis = document.getElementById("contentHeader");
        opis.innerHTML = "Romantyczna randka";
        let text = document.getElementById("myModalContent");
        text.innerHTML =
          "Już sporo minęło od naszej ostatniej randki, to chyba czas na kolejną.";

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
        image.src = "https://i.imgur.com/Tkxyekx.png";
        let title = document.getElementById("modalHeader");
        title.innerHTML = "7 grudnia";
        let opis = document.getElementById("contentHeader");
        opis.innerHTML = "Swiateczne kino";
        let text = document.getElementById("myModalContent");
        text.innerHTML =
          "Czas na jakąś świąteczną premierę filmową. Coś znajdziemy.";

        document.getElementById("openModalBtnTobiasz").click();
        await this.sleep(250);
      }
    };

    this.presentControls.presentEight = async () => {
      const presentNumber = 8;
      if (
        this.logic.buttonsLocked === false &&
        this.logic.mode === "menu" &&
        this.checkDate(presentNumber)
      ) {
        this.sounds.playBellsClick();

        let image = document.getElementById("frogModalImg");
        image.src = "https://i.imgur.com/zZayRyi.png";
        let title = document.getElementById("modalHeader");
        title.innerHTML = "8 grudnia";
        let opis = document.getElementById("contentHeader");
        opis.innerHTML = "Noc filmowa";
        let text = document.getElementById("myModalContent");
        text.innerHTML =
          "Może i kino było poprzednio, ale nic nie pobije klimatu nocnego maratonu filmowego.";

        document.getElementById("openModalBtnTobiasz").click();
        await this.sleep(250);
      }
    };

    this.presentControls.presentNine = async () => {
      const presentNumber = 9;
      if (
        this.logic.buttonsLocked === false &&
        this.logic.mode === "menu" &&
        this.checkDate(presentNumber)
      ) {
        this.sounds.playBellsClick();

        let image = document.getElementById("frogModalImg");
        image.src = "https://i.imgur.com/gZfr4EY.png";
        let title = document.getElementById("modalHeader");
        title.innerHTML = "9 grudnia";
        let opis = document.getElementById("contentHeader");
        opis.innerHTML = "Pieczenie cynamonek";
        let text = document.getElementById("myModalContent");
        text.innerHTML =
          "Już tak długo o tym mówimy, ten pomysł musi w końcu dojść do skutku.";

        document.getElementById("openModalBtnTobiasz").click();
        await this.sleep(250);
      }
    };

    this.presentControls.presentTen = async () => {
      const presentNumber = 10;
      if (
        this.logic.buttonsLocked === false &&
        this.logic.mode === "menu" &&
        this.checkDate(presentNumber)
      ) {
        this.sounds.playBellsClick();

        let image = document.getElementById("frogModalImg");
        image.src = "https://i.imgur.com/nMJHgX2.png";
        let title = document.getElementById("modalHeader");
        title.innerHTML = "10 grudnia";
        let opis = document.getElementById("contentHeader");
        opis.innerHTML = "Skarpety swiateczne";
        let text = document.getElementById("myModalContent");
        text.innerHTML =
          "No nie powiesz mi, że nie chciałabyś mieć takich fajnych, słodkich skarpetek.";

        document.getElementById("openModalBtnTobiasz").click();
        await this.sleep(250);
      }
    };

    this.presentControls.presentEleven = async () => {
      const presentNumber = 11;
      if (
        this.logic.buttonsLocked === false &&
        this.logic.mode === "menu" &&
        this.checkDate(presentNumber)
      ) {
        this.sounds.playBellsClick();

        let image = document.getElementById("frogModalImg");
        image.src = "https://i.imgur.com/QACkCQx.png";
        let title = document.getElementById("modalHeader");
        title.innerHTML = "11 grudnia";
        let opis = document.getElementById("contentHeader");
        opis.innerHTML = "Degustacja wina";
        let text = document.getElementById("myModalContent");
        text.innerHTML =
          "Zajarałaś mnie winem, to może wspólnie sobie je wypijemy?";

        document.getElementById("openModalBtnTobiasz").click();
        await this.sleep(250);
      }
    };

    this.presentControls.presentTwelve = async () => {
      const presentNumber = 12;
      if (
        this.logic.buttonsLocked === false &&
        this.logic.mode === "menu" &&
        this.checkDate(presentNumber)
      ) {
        this.sounds.playBellsClick();

        // Poprawić tą fotkę żeby była zaokrąglona
        let image = document.getElementById("frogModalImg");
        image.src = "https://i.imgur.com/KGKlXCn.png";
        let title = document.getElementById("modalHeader");
        title.innerHTML = "12 grudnia";
        let opis = document.getElementById("contentHeader");
        opis.innerHTML = "Ekspres polarny";
        let text = document.getElementById("myModalContent");
        text.innerHTML =
          "Wiem, że kochasz ten film. Nadszedł czas żeby go w końcu świątecznie zobaczyć.";

        document.getElementById("openModalBtnTobiasz").click();
        await this.sleep(250);
      }
    };

    this.presentControls.presentThirteen = async () => {
      const presentNumber = 13;
      if (
        this.logic.buttonsLocked === false &&
        this.logic.mode === "menu" &&
        this.checkDate(presentNumber)
      ) {
        this.sounds.playBellsClick();

        let image = document.getElementById("frogModalImg");
        image.src = "https://i.imgur.com/E92iOSN.png";
        let title = document.getElementById("modalHeader");
        title.innerHTML = "13 grudnia";
        let opis = document.getElementById("contentHeader");
        opis.innerHTML = "Wybor swiatecznego filmu";
        let text = document.getElementById("myModalContent");
        text.innerHTML =
          "Znacz o wiele więcej filmów świątecznych niż ja. Wybierz najlepszy.";

        document.getElementById("openModalBtnTobiasz").click();
        await this.sleep(250);
      }
    };

    this.presentControls.presentFourteen = async () => {
      const presentNumber = 14;
      if (
        this.logic.buttonsLocked === false &&
        this.logic.mode === "menu" &&
        this.checkDate(presentNumber)
      ) {
        this.sounds.playBellsClick();

        let image = document.getElementById("frogModalImg");
        image.src = "https://i.imgur.com/UFS1lBg.png";
        let title = document.getElementById("modalHeader");
        title.innerHTML = "14 grudnia";
        let opis = document.getElementById("contentHeader");
        opis.innerHTML = "Bitwa na sniezki";
        let text = document.getElementById("myModalContent");
        text.innerHTML =
          "Już czuję to przyszykowane masełko dla Ciebie. Załóż kaptur.";

        document.getElementById("openModalBtnTobiasz").click();
        await this.sleep(250);
      }
    };

    this.presentControls.presentFifteen = async () => {
      const presentNumber = 15;
      if (
        this.logic.buttonsLocked === false &&
        this.logic.mode === "menu" &&
        this.checkDate(presentNumber)
      ) {
        this.sounds.playBellsClick();

        let image = document.getElementById("frogModalImg");
        image.src = "https://i.imgur.com/jtQQowT.png";
        let title = document.getElementById("modalHeader");
        title.innerHTML = "15 grudnia";
        let opis = document.getElementById("contentHeader");
        opis.innerHTML = "List milosny z rzeczami ktore w Tobie kocham";
        let text = document.getElementById("myModalContent");
        text.innerHTML =
          "Mówię Ci je wszystkie praktycznie codziennie, ale może chciałabyś dostać zlepek w jednym liście?";

        document.getElementById("openModalBtnTobiasz").click();
        await this.sleep(250);
      }
    };

    this.presentControls.presentSixteen = async () => {
      const presentNumber = 16;
      if (
        this.logic.buttonsLocked === false &&
        this.logic.mode === "menu" &&
        this.checkDate(presentNumber)
      ) {
        this.sounds.playBellsClick();

        let image = document.getElementById("frogModalImg");
        image.src = "https://i.imgur.com/vC35vl9.png";
        let title = document.getElementById("modalHeader");
        title.innerHTML = "16 grudnia";
        let opis = document.getElementById("contentHeader");
        opis.innerHTML = "Nawet romantyczniejsza randka";
        let text = document.getElementById("myModalContent");
        text.innerHTML = "27 piętro w Katowicach chyba na nas czeka...";

        document.getElementById("openModalBtnTobiasz").click();
        await this.sleep(250);
      }
    };

    this.presentControls.presentSeventeen = async () => {
      const presentNumber = 17;
      if (
        this.logic.buttonsLocked === false &&
        this.logic.mode === "menu" &&
        this.checkDate(presentNumber)
      ) {
        this.sounds.playBellsClick();

        let image = document.getElementById("frogModalImg");
        image.src = "https://i.imgur.com/KxcD1w9.png";
        let title = document.getElementById("modalHeader");
        title.innerHTML = "17 grudnia";
        let opis = document.getElementById("contentHeader");
        opis.innerHTML = "Pieczenie ze starego przepisu";
        let text = document.getElementById("myModalContent");
        text.innerHTML =
          "Przeniesiemy się razem w czasie żeby zobaczyć jak piekły nasze babcie hehe";

        document.getElementById("openModalBtnTobiasz").click();
        await this.sleep(250);
      }
    };

    this.presentControls.presentEighteen = async () => {
      const presentNumber = 18;
      if (
        this.logic.buttonsLocked === false &&
        this.logic.mode === "menu" &&
        this.checkDate(presentNumber)
      ) {
        this.sounds.playBellsClick();

        let image = document.getElementById("frogModalImg");
        image.src = "https://i.imgur.com/9ok6eOP.png";
        let title = document.getElementById("modalHeader");
        title.innerHTML = "18 grudnia";
        let opis = document.getElementById("contentHeader");
        opis.innerHTML = "Zbudowanie balwana";
        let text = document.getElementById("myModalContent");
        text.innerHTML =
          "Pewnie sobie teraz pod nosem powiedziałaś, że ty już jednego masz i nie potrzebujesz budować nowego. Well, zbuduj bałwana ze swoim bałwanem.";

        document.getElementById("openModalBtnTobiasz").click();
        await this.sleep(250);
      }
    };

    this.presentControls.presentNineteen = async () => {
      const presentNumber = 19;
      if (
        this.logic.buttonsLocked === false &&
        this.logic.mode === "menu" &&
        this.checkDate(presentNumber)
      ) {
        this.sounds.playBellsClick();

        let image = document.getElementById("frogModalImg");
        image.src = "https://i.imgur.com/rEpcKpe.png";
        let title = document.getElementById("modalHeader");
        title.innerHTML = "19 grudnia";
        let opis = document.getElementById("contentHeader");
        opis.innerHTML = "Karciana gra swiateczna";
        let text = document.getElementById("myModalContent");
        text.innerHTML =
          "Rywalizacji nigdy nie było końca, czas na kolejną gierkę.";

        document.getElementById("openModalBtnTobiasz").click();
        await this.sleep(250);
      }
    };

    this.presentControls.presentTwenty = async () => {
      const presentNumber = 20;
      if (
        this.logic.buttonsLocked === false &&
        this.logic.mode === "menu" &&
        this.checkDate(presentNumber)
      ) {
        this.sounds.playBellsClick();

        let image = document.getElementById("frogModalImg");
        image.src = "https://i.imgur.com/k4hlGP9.png";
        let title = document.getElementById("modalHeader");
        title.innerHTML = "20 grudnia";
        let opis = document.getElementById("contentHeader");
        opis.innerHTML = "Zimowa herbatka";
        let text = document.getElementById("myModalContent");
        text.innerHTML =
          "Zrobię Ci najlepszą zimową herbatkę jaką w życiu widziałaś.";

        document.getElementById("openModalBtnTobiasz").click();
        await this.sleep(250);
      }
    };

    this.presentControls.presentTwentyOne = async () => {
      const presentNumber = 21;
      if (
        this.logic.buttonsLocked === false &&
        this.logic.mode === "menu" &&
        this.checkDate(presentNumber)
      ) {
        this.sounds.playBellsClick();

        let image = document.getElementById("frogModalImg");
        image.src = "https://i.imgur.com/w8jfDfA.png";
        let title = document.getElementById("modalHeader");
        title.innerHTML = "21 grudnia";
        let opis = document.getElementById("contentHeader");
        opis.innerHTML = "Robienie kartek swiatecznych";
        let text = document.getElementById("myModalContent");
        text.innerHTML = "Porobimy sobie takie słodkie laurki dla nas.";

        document.getElementById("openModalBtnTobiasz").click();
        await this.sleep(250);
      }
    };

    this.presentControls.presentTwentyTwo = async () => {
      const presentNumber = 22;
      if (
        this.logic.buttonsLocked === false &&
        this.logic.mode === "menu" &&
        this.checkDate(presentNumber)
      ) {
        this.sounds.playBellsClick();

        let image = document.getElementById("frogModalImg");
        image.src = "https://i.imgur.com/fDIc0li.png";
        let title = document.getElementById("modalHeader");
        title.innerHTML = "22 grudnia";
        let opis = document.getElementById("contentHeader");
        opis.innerHTML = "Zakupy swiateczne";
        let text = document.getElementById("myModalContent");
        text.innerHTML =
          "Czemu by się razem nie wybrać na świąteczne zakupy? Kto za nas kupi pasujące piżamy...";

        document.getElementById("openModalBtnTobiasz").click();
        await this.sleep(250);
      }
    };

    this.presentControls.presentTwentyThree = async () => {
      const presentNumber = 23;
      if (
        this.logic.buttonsLocked === false &&
        this.logic.mode === "menu" &&
        this.checkDate(presentNumber)
      ) {
        this.sounds.playBellsClick();

        let image = document.getElementById("frogModalImg");
        image.src = "https://i.imgur.com/e7SMQqq.png";
        let title = document.getElementById("modalHeader");
        title.innerHTML = "23 grudnia";
        let opis = document.getElementById("contentHeader");
        opis.innerHTML = "Wspolne lyzwy";
        let text = document.getElementById("myModalContent");
        text.innerHTML =
          "Wiesz dobrze, że w życiu nie umiałem na nich jeździć, ale dla Ciebie się nauczę.";

        document.getElementById("openModalBtnTobiasz").click();
        await this.sleep(250);
      }
    };

    this.presentControls.presentTwentyFour = async () => {
      const presentNumber = 24;
      if (
        this.logic.buttonsLocked === false &&
        this.logic.mode === "menu" &&
        this.checkDate(presentNumber)
      ) {
        this.sounds.playBellsClick();

        let image = document.getElementById("frogModalImg");
        image.src = "https://i.imgur.com/p0bwtnB.png";
        let title = document.getElementById("modalHeader");
        title.innerHTML = "24 grudnia";
        let opis = document.getElementById("contentHeader");
        opis.innerHTML = "Spedzenie dnia z Mikolajem";
        let text = document.getElementById("myModalContent");
        text.innerHTML =
          "Mikołaj to oczywiście ja. Po prostu cały dzień będę chodził w brodzie i w czapce.";

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
