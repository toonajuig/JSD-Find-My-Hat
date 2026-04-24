const prompt = require("prompt-sync")({ sigint: true });

// สร้างสัญลักษณ์ 4 ตัวของเกม
const hat = "🎩";
const hole = "🕳️";
const fieldCharacter = "🟩";
const pathCharacter = "🙂";

// สร้างพื้นฐานแมพก่อน
const myField = [
  [pathCharacter, fieldCharacter, hole],
  [fieldCharacter, hole, fieldCharacter],
  [fieldCharacter, hat, fieldCharacter],
];

// เปลี่ยนโค้ดนี้ให้เข้าไปอยู่ใน class Field
class Field {
  // เวลาสร้าง object ใหม่ เราส่งแมพเข้าไป
  constructor(field) {
    // เก็บแมพนี้ไว้ใน object นี้
    this.field = field;
    this.rows = field.length;
    this.columns = field[0].length;
    this.playerRow = 0;
    this.playerCol = 0;

    for (let i = 0; i < this.rows; i += 1) {
      for (let j = 0; j < this.columns; j += 1) {
        if (field[i][j] === pathCharacter) {
          this.playerRow = i;
          this.playerCol = j;
        }
      }
    }
  }

  // เอาแผนที่ของเกมนี้มาวนดูทีละแถว แล้วพิมพ์ออกมา
  print() {
    for (const row of this.field) {
      console.log(row.join(" "));
    }
  }

  // คำนวณตำแหน่งถัดไปจากทิศทางที่เดิน
  getNextPosition(direction) {
    if (direction === "W") {
      return {
        row: this.playerRow - 1, // เดินขึ้นให้ row - 1
        col: this.playerCol,
      };
    }

    if (direction === "S") {
      return {
        row: this.playerRow + 1, // เดินลงให้ row + 1
        col: this.playerCol,
      };
    }

    if (direction === "A") {
      return {
        row: this.playerRow,
        col: this.playerCol - 1, // เดินซ้ายให้ col - 1
      };
    }

    if (direction === "D") {
      return {
        row: this.playerRow,
        col: this.playerCol + 1, // เดินขวาให้ col + 1
      };
    }
  }

  // ทำตัวเช็คตำแหน่งว่าอยู่นอกแมพไหม
  isOutOfBounds(row, col) {
    return (
      row < 0 ||
      row >= this.field.length ||
      col < 0 ||
      col >= this.field[0].length
    );
  }

  // สร้าง move จริง ใช้ getNextPosition กับ isOutOfBounds
  move(direction) {
    const nextPosition = this.getNextPosition(direction);
    const row = nextPosition.row;
    const col = nextPosition.col;

    // ถ้าช่องถัดไปอยู่นอกแมพ ให้หยุดตรงนี้
    if (this.isOutOfBounds(row, col)) {
      return "out";
    }

    //สร้างเงื่อนไขการเดินเพิ่ม
    const nextCell = this.field[row][col];

    if (nextCell === hole) {
      this.playerRow = row;
      this.playerCol = col;
      return "hole";
    }

    if (nextCell === hat) {
      this.playerRow = row;
      this.playerCol = col;
      return "hat";
    }

    this.playerRow = row;
    this.playerCol = col;
    this.field[row][col] = pathCharacter;

    return "continue";
  }

  play() {
    while (true) {
      console.clear();
      this.print();

      const answer = prompt("Move with W A S D: ");
      const direction = answer.toUpperCase();

      if (
        direction !== "W" &&
        direction !== "A" &&
        direction !== "S" &&
        direction !== "D"
      ) {
        console.log("Please type only W, A, S, or D.");
        continue;
      }

      const result = this.move(direction);

      if (result === "out") {
        console.clear();
        this.print();
        console.log("You went outside the field. Game over!");
        break;
      }

      if (result === "hole") {
        console.clear();
        this.print();
        console.log("You fell into a hole. Game over!");
        break;
      }

      if (result === "hat") {
        console.clear();
        this.print();
        console.log("You found the hat. You win!");
        break;
      }
    }

    //สร้าง static method ทำให้เกม “สร้างแมพเอง” ได้ทุกครั้งที่รัน
  }
  static generateField(height, width, holePercentage = 0.2) {
    const field = []; //สร้าง array เปล่ามารอไว้ก่อน ดี๋ยวจะค่อย ๆ เติมแถวเข้าไป

    //วนสร้างทีละแถวในแต่ละแถว วนสร้างทีละช่องทุกช่องเริ่มต้นเป็นพื้นธรรมดา fieldCharacter
    for (let row = 0; row < height; row += 1) {
      const currentRow = [];

      for (let col = 0; col < width; col += 1) {
        currentRow.push(fieldCharacter);
      }

      field.push(currentRow);
    }

    //คือกำหนดจุดเริ่มต้นให้มุมซ้ายบน
    field[0][0] = pathCharacter;

    //สุ่มหมวก
    let hatRow = 0;
    let hatCol = 0;
    // ใช้ while ไม่อยากให้หมวกไปเกิดที่ [0][0]
    while (hatRow === 0 && hatCol === 0) {
      hatRow = Math.floor(Math.random() * height);
      hatCol = Math.floor(Math.random() * width);
    }

    field[hatRow][hatCol] = hat;

    //สุ่มหลุม
    const holeCount = Math.floor(height * width * holePercentage);
    let placedHoles = 0;

    while (placedHoles < holeCount) {
      const holeRow = Math.floor(Math.random() * height);
      const holeCol = Math.floor(Math.random() * width);

      //วางหลุมได้เฉพาะช่องที่ยังเป็นพื้นธรรมดา
      if (field[holeRow][holeCol] === fieldCharacter) {
        field[holeRow][holeCol] = hole;
        placedHoles += 1;
      }
    }

    return field;
  }
}

// log ดู position
// const game = new Field(myField);
// console.log(game.getNextPosition("D"));
// console.log(game.getNextPosition("S"));

// log ทดสอบการเดินออกนอกแมพ
// console.log(game.isOutOfBounds(0, 0)); // false อยู่ในแมพ
// console.log(game.isOutOfBounds(-1, 0)); // true หลุดบน
// console.log(game.isOutOfBounds(0, 3)); // true หลุดขวา
// console.log(game.isOutOfBounds(2, 1)); // false ยังอยู่ในแมพ

// log ทดสอบการเดินจริง
// const game = new Field(myField);

// game.print();

// console.log(game.move("D"));
// game.print();

// console.log(game.move("S"));
// game.print();

//ลองรันเกมจริง
// const game = new Field(myField);
// game.play();

//เกม เกมจะสุ่มแมพทุกครั้ง
const randomField = Field.generateField(6, 8, 0.2);
const game = new Field(randomField);
game.play();
