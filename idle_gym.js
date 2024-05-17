let str = 0;
let str_gain = 0;
let multiplier = 1

function openNav() {
    document.getElementById("mySidenav").style.width = "10%";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function gain_str(increase_by, id) {
    str += increase_by + str_gain
    document.getElementById(id).innerHTML = "Strenght: " + str;
    update_window(id, "Strenght :", str);
}

function upgrade_str(increase_by, cost,id) {
    if (str >= cost) {
        multiplier += 0.5
        cost *= multiplier
        str -= cost;
        str_gain += increase_by;
        document.getElementById("strenght").innerHTML = "Strenght: " + str;
        update_window(id, "Cost: ", cost * multiplier);

    } else {
        alert("You need: " + cost + " more strength points");
    }
}

function update_window(id, name, variable) {
    document.getElementById(id).innerHTML = name + variable;
}

function check_upgrades(){
    if (str >= cost){
        document.getElementById("upgrade1_").innerHTML.style = "display: block";

}}


setInterval(update_window, 500);
setInterval(check_upgrades, 500);
