
var money = 0;


function addOne() {
  money++;


  var moneyAnimation = document.createElement("p");
  moneyAnimation.innerHTML = "+1";
  document.getElementById("moneyAnimation").appendChild(moneyAnimation);
  moneyAnimation.classList.add("moneyAnimation"); // Add the class that animates
}