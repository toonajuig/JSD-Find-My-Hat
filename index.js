const prompt = require("prompt-sync")({ sigint: true });

// สร้างสัญลักษณ์ 4 ตัวของเกม
const hat = "🎩";
const hole = "🕳️";
const fieldCharacter = "🌫️";
const pathCharacter = "😘";

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
    // ตอนเริ่มเกม ผู้เล่นอยู่แถวที่ 0 คอลัมน์ที่ 0
    this.playerRow = 0;
    this.playerCol = 0;
  }

  // เอาแผนที่ของเกมนี้มาวนดูทีละแถว แล้วพิมพ์ออกมา
  print() {
    for (const row of this.field) {
      console.log(row.join(""));
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

    this.playerRow = row;
    this.playerCol = col;
    this.field[row][col] = pathCharacter;

    return "continue";
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
const game = new Field(myField);

game.print();

console.log(game.move("D"));
game.print();

console.log(game.move("S"));
game.print();
