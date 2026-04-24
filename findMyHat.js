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
  }

  print() {
    for (const row of this.field) {
      console.log(row.join(""));
    }
  }
}

const game = new Field(myField);
game.print();
