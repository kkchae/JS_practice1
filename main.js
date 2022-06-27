"use strict";

const shirtBtn = document.querySelector("nav.navbar .navbar_menu button.shirtBtn");
const socksBtn = document.querySelector("nav.navbar .navbar_menu button.socksBtn");
const mittenBtn = document.querySelector("nav.navbar .navbar_menu button.mittenBtn");
const blueBtn = document.querySelector("nav.navbar .navbar_menu button.blueBtn");
const yellowBtn = document.querySelector("nav.navbar .navbar_menu button.yellowBtn");
const pinkBtn = document.querySelector("nav.navbar .navbar_menu button.pinkBtn");

shirtBtn.addEventListener("click", () => {
  console.log("shirt button clicked");
});

socksBtn.addEventListener("click", () => {
  console.log("socks button clicked");
});

mittenBtn.addEventListener("click", () => {
  console.log("mitten button clicked");
});

blueBtn.addEventListener("click", () => {
  console.log("blue button clicked");
});

yellowBtn.addEventListener("click", () => {
  console.log("yellow button clicked");
});

pinkBtn.addEventListener("click", () => {
  console.log("pink button clicked");
});

class ClothItem {
  constructor(type, color) {
    this._type = type;
    this._color = color;
  }

  get type() {
    return this._type;
  }

  get color() {
    return this._color;
  }

  getString() {
    return `${this._type}, ${this._color}`;
  }
}

const clothType = ["shirt", "socks", "mitten"];
const clothColor = ["blue", "yellow", "pink"];

const clothItemList = [];

for (let itClothtype of clothType) {
  for (let itClothColor of clothColor) {
    //console.log(`${itClothtype}, ${itClothColor}`);
    clothItemList.push(new ClothItem(itClothtype, itClothColor));
  }
}

for (let i = 0; i < clothItemList.length; i++) {
  console.log(`[${i}] ${clothItemList[i].getString()}`);
}
