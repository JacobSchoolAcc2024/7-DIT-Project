
///Variables///

let str = parseInt(localStorage.getItem("str")) || 1;
let str_gain = parseInt(localStorage.getItem("str_gain")) ||1;
let multiplier_str = parseInt(localStorage.getItem("mutiplier_str")) ||  1;
let auto_pushup_multiplier = parseInt(localStorage.getItem("auto_push_up_multiplier")) || 1;
let enemy_hp = parseInt(localStorage.getItem("enemy_hp")) || 100;
let player_hp = parseInt(localStorage.getItem("player_hp")) || 100;
let enemy_str = parseInt(localStorage.getItem("enemy_str")) || 2;
let enemy_level = parseInt(localStorage.getItem("enemy_level")) || 1;
let auto_str = parseInt(localStorage.getItem("auto_str")) || 0;


/// Html Related JS ///

function openNav() {
    document.getElementById("mySidenav").style.width = "10rem";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}


function showUpgradesSection() {
    // Hide all sections
    document.querySelector(".exercises").style.display = "none";
    document.querySelector("#push_up").style.display = "none";
    document.querySelector(".status").style.display = "none";

    // Show the upgrades section
}

function showMainContent() {
    // Show all sections
    document.querySelector(".exercises").style.display = "block";
    document.querySelector("#push_up").style.display = "block";
    document.querySelector(".status").style.display = "block";
}



/////////////////////////////////////////////////////////////////////////////////////
/// Strenght and Upgrades section.


function gain_str(increase_by, str_id) {
    str += increase_by + str_gain;
    document.getElementById(str_id).innerHTML 
    = "Strenght: " + formatNumber(str);
    localStorage.setItem("str",str);
}


function upgrade_str(increase_by, cost) {
    upgradeCost = Math.round(cost ** multiplier_str);
    str -= upgradeCost;

    str_gain += (increase_by ** multiplier_str)*multiplier_str;
    document.getElementById("strenght").innerHTML = "Strenght: " + str;
    document.getElementById("strenght_gain").innerHTML = "Strenght Gain: " + str_gain;
    multiplier_str += 1;    
    localStorage.setItem("mutiplier_str",multiplier_str);
    localStorage.setItem("str_gain",str_gain);
    multiplier_str = parseInt(localStorage.getItem("mutiplier_str")) || 1;
    str_gain = parseInt(localStorage.getItem("str_gain"));
}


/////////////////////////////////////////////////////////////////////////////////////
/// Automatic gain of strenght.


function purchaseAuto(increase_by, time, cost) {
    requiredCost = Math.round(cost ** auto_push_up_multiplier);
    auto_push_up_multiplier = parseInt(localStorage.getItem("auto_push_up_mutiplier")) || 1;
    str = parseInt(localStorage.getItem("str")) || 1;
    str -= requiredCost;
    auto_push_up_multiplier += 1;
    setInterval(auto_str_gain(increase_by), time);
    localStorage.setItem("str", str);
    localStorage.setItem("auto_push_up_mutiplier", auto_push_up_multiplier);
}

function auto_str_gain(increase_by){
    return function(){
        str = parseInt(localStorage.getItem("str")) || 1;
        auto_push_up_multiplier = parseInt(localStorage.getItem("auto_push_up_mutiplier")) || 1;
        auto_str = (increase_by * auto_push_up_multiplier) * str_gain;
        str += auto_str;
        localStorage.setItem("str",str);
        localStorage.setItem("auto_str",auto_str);
    }
}




















/////////////////////////////////////////////////////////////////////////////
/// Check for requirements.


function checkUpgrades() {
    const upgrades = {
        Progressive_Overload: {
            cost_id: "progressive_overload_cost",
            id: "progressive_overload",
            cost: 10
        },
        // upgrade2: {
        //     cost_id: "cost2",
        //     id: "upgrade2_",
        //     cost: 1000
        // },
    };

    for (const upgrade in upgrades) {
        check_upgrades(upgrades[upgrade].id, upgrades[upgrade].cost, upgrades[upgrade].cost_id);
    }
}


function check_upgrades(id, cost, cost_id) {
    const requiredCost = Math.round(cost ** multiplier_str);
    if (str >= requiredCost) {
        document.getElementById(id).style.display = "block";
        document.getElementById(cost_id).innerHTML = "Cost :" + formatNumber(requiredCost);
    } else {
        document.getElementById(id).style.display = "none";
        // console.log("Cost for next progressive overload upgrade: " 
        // + formatNumber(requiredCost));
    }
}

function auto_price_pushup() {
    const auto_prices = {
        auto_price1: {
            cost_id: "auto_cost_pushup",
            id: "auto_pushup",
            cost: 500
        },
        auto_price2: {
            cost_id: "auto_cost_archer_pushup",
            id: "auto_archer_pushup",
            cost: 1000
        }
    };

    for (const price in auto_prices) {
        check_auto_price(auto_prices[price].id, auto_prices[price].cost, auto_prices[price].cost_id);
    }
}



function check_auto_price(id, cost, cost_id) {
    const requiredCost = Math.round(cost ** auto_push_up_multiplier);
    const element = document.getElementById(id);
    if (str >= requiredCost) {
        element.style.display = "block";
        document.getElementById(cost_id).innerHTML = "Cost: " + formatNumber(requiredCost);
    } else {
        element.style.display = "none";
    }
}









/////////////////////////////////////////////////////////////////////////////////////
/// Utilities.

function reset(){
    str = 0;
    str_gain = 1;
    multiplier_str = 1;
    auto_str = 0;
    localStorage.setItem("multiplier_str",multiplier_str);
    localStorage.setItem("str", str);
    localStorage.setItem("str_gain",str_gain);
    localStorage.setItem("player_hp", player_hp);
    localStorage.setItem("auto_str", auto_str);
}



function formatNumber(num) {
    const suffixes = ["", " K", " Million", " Billion", " Trillion", " Quadrillion"
        , " Quintillion", " Sextillion", " Septillion", " Octillion", " Nonillion"
    ];
    const suffixIndex = Math.floor(Math.log10(Math.abs(num)) / 3);
    const formattedNum = parseFloat((num / Math.pow(1000, suffixIndex)).toFixed(2));
    return formattedNum + (suffixes[suffixIndex] || "");
}

function update_window_str() {
    str = parseInt(localStorage.getItem("str")) || 1;
    str_gain = parseInt(localStorage.getItem("str_gain")) || 1;
    auto_str = parseInt(localStorage.getItem("auto_str")) || 0;
    document.getElementById('strenght').innerHTML = "Strenght: " + formatNumber(str);
    document.getElementById('strenght_gain').innerHTML = "Current Strenght Gain: " + formatNumber(str_gain);
    document.getElementById('auto_str').innerHTML = "Current Auto Strenght Gain: " + formatNumber(auto_str);

}

function update_enemy_window_str() {
    document.getElementById("player_str").innerText = "Player Strength: " + str;
    document.getElementById("enemy_HP").innerText = "Enemy HP: " + enemy_hp;
    document.getElementById("player_HP").innerText = "Player HP: " + player_hp;
    document.getElementById("enemy_level").innerText = "Enemy Level: " + enemy_level;
}


function toggleStatus(className) {
    const element = document.getElementsByClassName(className)[0];
    if (element.style.display === "none") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}


















    
setInterval(checkUpgrades, 100);
setInterval(update_window_str, 100);
setInterval(auto_price_pushup, 100);
setInterval(update_enemy_window_str, 100);
/////////////////////////////////////////////////////////////////////////////////////
/// Fighting

function fightEnemy() {

    if (player_hp > 0){
        // Update player and enemy HP based on combat
        player_hp -= enemy_str;
        enemy_hp -= str;
    }

    // Check if the player or enemy has been defeated
    if (player_hp <= 0) {
        document.getElementById("fight").style.display = "block";
        player_hp = 100;
        str = 0;
        str_gain = 1;
        multiplier_str = 1;
        localStorage.setItem("multiplier_str",multiplier_str);
        localStorage.setItem("str", str);
        localStorage.setItem("str_gain",str_gain);
        localStorage.setItem("player_hp", player_hp);
    } 
    if (enemy_hp <= 0) {
        enemy_hp=100;
        enemy_level++;
        player_hp +=str_gain;
        enemy_hp +=10;
        enemy_str += 2;
        localStorage.setItem("enemy_hp", enemy_hp);
        localStorage.setItem("enemy_str", enemy_str);
        
    }

    localStorage.setItem("enemy_level", enemy_level);
    localStorage.setItem("player_hp", player_hp);
    localStorage.setItem("enemy_hp", enemy_hp);
    localStorage.setItem("enemy_str", enemy_str);

    // Update localStorage with new values
    str_gain = parseInt(localStorage.getItem("str_gain"));
    enemy_hp = parseInt(localStorage.getItem("enemy_hp"));
    player_hp = parseInt(localStorage.getItem("player_hp"));
    enemy_str = parseInt(localStorage.getItem("enemy_str"));
    enemy_level = parseInt(localStorage.getItem("enemy_level"));
    multiplier_str = parseInt(localStorage.getItem("mutiplier_str"));
}

function buyHP() {
    if (str >= 1) {
        str -= 1;
        player_hp += 1;
        // Update localStorage
        localStorage.setItem("str", str);
        localStorage.setItem("player_hp", player_hp);
    } else {
        document.getElementById("buyHP").style.display = "block";
    }
    str = parseInt(localStorage.getItem("str"));
    player_hp = parseInt(localStorage.getItem("player_hp"));
}

