console.log("Hello!");

//variables in global scope
let imgOne = "./images/img1.png";
let imgTwo = "./images/img2.png";
// let imgThree = "./images/img3.png";
// let imgFour = "./images/img4.png";
// let imgSecret = "./images/secret.png";

const secretValue = document.getElementById("probability-value");

let popup = document.getElementById("center_popup");

let secretProbability;

// Array of fungi cohort - update this as appropriate!
const fungiImages = [
  "./images/img1.png",
  "./images/img2.png",
  "./images/img3.png",
  "./images/img4.png",
  "./images/secret.png",
];

const unboxedImages = [];
let hasCollectedAll = false;

//set up random fungi selector - do it with the image
let unboxFungiButton = document.querySelector("#present");
unboxFungiButton.addEventListener("click", function () {
  setTimeout(() => {
    showPopup();
    console.log("Delayed for 1 second.");
  }, "1000");
});

// let unboxFungiButton = document.querySelector("#unbox-button");
// unboxFungiButton.addEventListener("click", function () {
//   showPopup();
// });

//handle the probability of pulling the secret - ai overview helped w/ this code

// Select the slider element
const slider = document.getElementById("mySlider");
// Select the elements to display the values
const finalValueDisplay = document.getElementById("finalValue");
const liveValueDisplay = document.getElementById("liveValue");

// Event listener for the 'change' event (fires when sliding stops)
slider.addEventListener("change", function () {
  secretProbability = this.value; // Get the final value
  finalValueDisplay.textContent = secretProbability; // Update the final value display
  console.log("Final value selected:", secretProbability);
});

// Optional: Event listener for the 'input' event (fires continuously while sliding)
// slider.addEventListener("input", function () {
//   const value = this.value; // Get the current value
//   liveValueDisplay.textContent = value; // Update the live value display
// });

// Event listener for the 'change' event (fires when sliding stops)
// slider.addEventListener("change", function () {
//   const value = this.value; // Get the final value
//   finalValueDisplay.textContent = value; // Update the final value display
//   console.log("Final value selected:", value);
// });

const showPopup = () => {
  popup.style.visibility = "visible";

  let overlay = document.getElementById("overlay");
  overlay.style.visibility = "visible";

  //pop off old image
  const oldImage = popup.querySelector("img");
  if (oldImage) oldImage.remove();

  //choose random image using chance library
  // probability = 0.01612903225; - can work on making this a slider that the users can control to highlight the way that this mechanism works and how hard it really is to get the secrets
  // secretProbability = 1;
  let randomFungi = chance.weighted(fungiImages, [
    1,
    1,
    1,
    1,
    secretProbability,
  ]);
  console.log("this is random fungi:" + randomFungi);

  //figure out how to get this info on the server or how to do this on the server
  const unboxedImage = document.querySelector(`img[src='${randomFungi}']`);
  unboxedImage.classList.add("unboxed");

  unboxedImages.push(randomFungi);

  //display results in popup window
  let fungiImagePick = document.createElement("img");
  fungiImagePick.src = randomFungi;
  fungiImagePick.width = 200;
  fungiImagePick.height = 200;
  popup.appendChild(fungiImagePick);

  //not doing anything currently, figure out if this is even necessary
  // let resultDisplayOne = document.getElementById("popup_text");
};

let continueButton = document.getElementById("continue_button");
continueButton.addEventListener("click", function () {
  popup.style.visibility = "hidden";
  overlay.style.visibility = "hidden";

  //see if all the characters have been unboxed. when they have, display a "yay, you've caught them all message"
  hasCollectedAll =
    fungiImages.filter((x) => unboxedImages.includes(x)).length ==
    fungiImages.length;

  if (hasCollectedAll == true) {
    alert("congrats you've caught them all!!");
    location.reload();
  }
  console.log(hasCollectedAll);
});
