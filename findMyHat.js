const prompt = require("prompt-sync")({ sigint: true });

// สร้างสัญลักษณ์ 4 ตัวของเกม
const hat = "🎩";
const hole = "🕳️";
const fieldCharacter = "🌫️";
const pathCharacter = "😘";

//สร้างพื้นฐานแมพก่อน
const myField = [
  ["😘", "🌫️", "🕳️"],
  ["🌫️", "🕳️", "🌫️"],
  ["🌫️", "🎩", "🌫️"],
];

//เปลี่ยนโค้ดนี้ให้เข้าไปอยู่ใน class Field
class Field {
  //เวลาสร้าง object ใหม่ เราส่งแมพเข้าไป
  constructor(field) {
    //เก็บแมพนี้ไว้ใน object นี้
    this.field = field;
    // ตอนเริ่มเกม ผู้เล่นอยู่แถวที่ 0 คอลัมน์ที่ 0
    this.playerRow = 0;
    this.playerCol = 0;
  }
  //เอาแผนที่ของเกมนี้มาวนดูทีละแถวแปลงแต่ละแถวให้เป็นข้อความแล้วพิมพ์ออกมา
  print() {
    for (const row of this.field) {
      console.log(row.join(""));
    }
  }
  // ตอนนี้สร้างแมพจัดวางposition ของPlayerไว้ที่ 0 0 แล้ว
  //เริ่มสร้าง Method การเดิน
  getNextPosition(direction) {
    if (direction === "W") {
      return {
        row: this.playerRow - 1, //เดินขึ้นให้ row - 1
        col: this.playerCol,
      };
    }

    if (direction === "S") {
      return {
        row: this.playerRow + 1, //  เดินลงให้  row + 1
        col: this.playerCol,
      };
    }

    if (direction === "A") {
      return {
        row: this.playerRow,
        col: this.playerCol - 1, //เดินซ้ายให้ col -1
      };
    }

    if (direction === "D") {
      return {
        row: this.playerRow,
        col: this.playerCol + 1, // เดินขวาให้ col +1
      };
    }
  }
}

const game = new Field(myField);
game.print();

console.log(game.getNextPosition("D"));
console.log(game.getNextPosition("S"));
