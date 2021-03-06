"use strict";

function download(content, fileName, contentType) {
  var a = document.createElement("a");
  var file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

class ClothItem {
  constructor(id, clothType, clothColor, genderType) {
    this._id = id;
    this._clothType = clothType;
    this._clothColor = clothColor;
    this._genderType = genderType;
  }

  get id() {
    return this._id;
  }

  get clothType() {
    return this._clothType;
  }

  get clothColor() {
    return this._clothColor;
  }

  get clothTypeIcon() {
    switch (this._clothType) {
      case "shirt":
        return iconShirt;
      case "socks":
        return iconSocks;
      case "mitten":
        return iconMitten;
      default:
        return null;
    }
  }

  get genderType() {
    return this._genderType;
  }

  get genderTypeIcon() {
    switch (this._genderType) {
      case "male":
        return iconMale;
      case "female":
        return iconFemale;
      default:
        return null;
    }
  }
}

const itemList = document.querySelector(".item_list ul");

const selectClothType = document.querySelectorAll(".wrap .header .header_menu .select_cloth_type button");
selectClothType.forEach((button, index) => {
  //console.log(button, index);
  button.addEventListener("click", () => {
    const selectedItems = clothItemList.filter((item) => item.clothType == button.getAttribute("value"));
    updateItemList(selectedItems);
  });
});

const selectColor = document.querySelectorAll(".wrap .header .header_menu .select_color button");
selectColor.forEach((button, index) => {
  //console.log(button, index);
  button.addEventListener("click", () => {
    const selectedItems = clothItemList.filter((item) => item.clothColor == button.getAttribute("value"));
    updateItemList(selectedItems);
  });
});

const selectGender = document.querySelectorAll(".wrap .header .header_menu .select_gender button");
selectGender.forEach((button, index) => {
  //console.log(button, index);
  button.addEventListener("click", () => {
    const selectedItems = clothItemList.filter((item) => item.genderType == button.getAttribute("value"));
    updateItemList(selectedItems);
  });
});

const clothType = ["shirt", "socks", "mitten"];
const clothColor = ["blue", "yellow", "pink"];
const genderType = ["male", "female"];

const iconShirt = "fa-solid fa-shirt";
const iconSocks = "fa-solid fa-socks";
const iconMitten = "fa-solid fa-mitten";
const iconMale = "fa-solid fa-person";
const iconFemale = "fa-solid fa-person-dress";
const clothTypeIcon = [iconShirt, iconSocks, iconMitten];
const genderTypeIcon = [iconMale, iconFemale];

function restoreItemList() {
  //console.log(`itemList.childElementCount: ${itemList.childElementCount}`);
  const itemListCount = itemList.childElementCount;
  for (let i = 0; i < itemListCount; i++) {
    const item = itemList.querySelector("li");
    item.remove();
    //itemList.removeChild(item);
  }
}

function updateItemList(selectedItems) {
  // ?????? ????????? ????????? ?????????
  restoreItemList();

  // ????????? ???????????? ???????????? ??????
  for (let i = 0; i < selectedItems.length; i++) {
    const li = document.createElement("li");
    const clothTypeIcon = document.createElement("i");
    const genderTypeIcon = document.createElement("i");
    const itemText = document.createElement("div");

    li.setAttribute("class", "item"); // ok
    li.setAttribute("id", selectedItems[i].id); // ok

    clothTypeIcon.setAttribute("class", selectedItems[i].clothTypeIcon);
    li.appendChild(clothTypeIcon);

    genderTypeIcon.setAttribute("class", selectedItems[i].genderTypeIcon);
    li.appendChild(genderTypeIcon);

    itemText.setAttribute("class", "text"); // ok
    itemText.textContent = `${selectedItems[i].clothType}, ${selectedItems[i].genderType}, ${selectedItems[i].clothColor}`;
    li.appendChild(itemText);

    itemList.appendChild(li);
  }
}

//const optSelect = document.querySelector(".wrap .footer select");
const optSelect = document.getElementById("select_option");

function optionChanged(selected) {
  const val = optSelect.options[optSelect.selectedIndex].value;
  console.log(val);
}

const clothItemList = [];

/* let idIndex = 0;
for (const itClothType of clothType) {
  for (const itClothColor of clothColor) {
    for (const itGenderType of genderType) {
      //console.log(`[${idIndex}] ${itClothType}, ${itClothColor}, ${itGenderType}`);
      clothItemList.push(new ClothItem(idIndex++, itClothType, itClothColor, itGenderType));
    }
  }
} */
//const clothItemJson = JSON.stringify(clothItemList);
//console.log(clothItemJson);
//download(clothItemJson, "data.json", "text/plain");

const request = new XMLHttpRequest();
request.open("GET", "./data.json", false);
request.send(null);

const objList = JSON.parse(request.responseText);
for (const itObj of objList) {
  //console.log(it);
  const newItem = new ClothItem(itObj._id, itObj._clothType, itObj._clothColor, itObj._genderType);
  clothItemList.push(newItem);
  //console.log(newItem);
}

updateItemList(clothItemList);

const body = document.body;
const menu = body.querySelector(".bottom_menu");
const menuItems = body.querySelectorAll(".menu__item");
const menuBorder = body.querySelector(".menu__border");
let activeItem = body.querySelector(".active");

const bgColorsBody = ["#ffb457", "#ff96bd", "#9999fb", "#ffe797", "#cffff1"];

function clickItem(item, index) {
  menu.style.removeProperty("--timeOut");

  if (activeItem == item) return;

  if (activeItem) {
    activeItem.classList.remove("active");
  }

  item.classList.add("active");
  body.style.backgroundColor = bgColorsBody[index];
  activeItem = item;
  offsetMenuBorder(activeItem, menuBorder);
}

function offsetMenuBorder(element, menuBorder) {
  const offsetActiveItem = element.getBoundingClientRect();

  console.log(`offsetActiveItem.left: ${offsetActiveItem.left}`);
  console.log(`menu.offsetLeft: ${menu.offsetLeft}`);
  console.log(`menuBorder.offsetWidth: ${menuBorder.offsetWidth}`);
  console.log(`offsetActiveItem.width: ${offsetActiveItem.width}`);

  const left = Math.floor(offsetActiveItem.left - menu.offsetLeft - (menuBorder.offsetWidth - offsetActiveItem.width) / 2) + "px";
  console.log(`left: ${left}`);
  menuBorder.style.transform = `translate3d(${left}, 0 , 0)`;
}

offsetMenuBorder(activeItem, menuBorder);

console.log(menuItems);

menuItems.forEach((item, index) => {
  //console.log(`item: ${item.getAttribute("style")}, index: ${index}`);
  item.addEventListener("click", () => clickItem(item, index));
});

window.addEventListener("resize", () => {
  offsetMenuBorder(activeItem, menuBorder);
  menu.style.setProperty("--timeOut", "none");
});
