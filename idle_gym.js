
///Variables///

let str = parseInt(localStorage.getItem("str")) || 1;
let str_gain = parseInt(localStorage.getItem("str_gain")) ||1;
let auto_push_up_multiplier = parseInt(localStorage.getItem("auto_push_up_multiplier")) || 1;
let enemy_hp = parseInt(localStorage.getItem("enemy_hp")) || 100;
let player_hp = parseInt(localStorage.getItem("player_hp")) || 100;
let enemy_str = parseInt(localStorage.getItem("enemy_str")) || 2;
let enemy_level = parseInt(localStorage.getItem("enemy_level")) || 1;
let auto_str = parseInt(localStorage.getItem("auto_str")) || 0;
let auto_pushup_purchases = parseInt(localStorage.getItem("auto_pushup_purchases")) || 1;
let Push_up_interval;
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
/// Strength and Upgrades section.


function gain_str(increase_by) {
    str += increase_by + str_gain;
    document.getElementById('Strength').innerHTML 
    = "Strength: " + formatNumber(str);
    localStorage.setItem("str",str);
}


function upgrade_str(increase_by, cost, multiplier, multiplier_increase_by, upgradeName) {
   
    const upgrades = {
        Progressive_Overload: {
            button_id: "progressive_overload",
            cost_id: "progressive_overload_cost",
            cost: 10,
            multiplier: parseInt(localStorage.getItem("Progressive_Overload_multiplier")) || 1,
        },
    
    };

    const upgradeData = upgrades[upgradeName];
    const requiredCost = Math.round(cost ** upgradeData.multiplier);
    str -= requiredCost;
    str_gain += (increase_by ** upgradeData.multiplier) * multiplier;
    auto_str += str_gain;
    upgradeData.multiplier += multiplier_increase_by;

    document.getElementById("Strength").innerHTML = "Strength: " + formatNumber(str);
    document.getElementById("strength_gain").innerHTML = "Strength Gain: " + formatNumber(str_gain);

    localStorage.setItem("str", str);
    localStorage.setItem("str_gain", str_gain);
    localStorage.setItem(upgradeName + "_multiplier", upgradeData.multiplier);
    
    
}



/////////////////////////////////////////////////////////////////////////////////////
/// Automatic gain of Strength.



function purchase_auto(increase_by, multiplier_increase_by, upgradeName) {
    const upgrades = {
        Auto_Pushup: {
            button_id: "auto_pushup",
            cost_id: "auto_pushup_cost",
            cost: 500,
            time: parseInt(localStorage.getItem("Auto_Pushup_time")) || 2000,
            multiplier: parseInt(localStorage.getItem("Auto_Pushup_multiplier")) || 1,
            auto_pushup_purchases: parseInt(localStorage.getItem("auto_pushup_purchases")) || 0,
        }
    };

    const upgradeData = upgrades[upgradeName];
    const time = upgradeData.time;
    const baseCost = upgradeData.cost;
    const requiredCost = Math.round(baseCost * Math.pow(2, upgradeData.auto_pushup_purchases));

    if (str >= requiredCost) {
        str -= requiredCost;
        upgradeData.auto_pushup_purchases += 1;
        upgradeData.multiplier += multiplier_increase_by;

        // Calculate auto_str based on updated multiplier
        auto_str += (increase_by ** upgradeData.multiplier)
        * Math.pow(2, upgradeData.auto_pushup_purchases);
        if (upgradeData.time <= 0) {
            upgradeData.time == 100;
        }
        else {
            upgradeData.time -= 100;
        }
        document.getElementById("Strength").innerHTML = "Strength: " + formatNumber(str);
        document.getElementById("auto_str").innerHTML = "Auto Strength Gain: " + formatNumber(auto_str);

        localStorage.setItem("str", str);
        localStorage.setItem("str_gain", str_gain);
        localStorage.setItem(upgradeName + "_multiplier", upgradeData.multiplier);
        localStorage.setItem("auto_pushup_purchases", upgradeData.auto_pushup_purchases);
        localStorage.setItem("Auto_Pushup_time", upgradeData.time);
        localStorage.setItem("auto_str", auto_str);
        console.log(auto_str, time)
        // Clear existing interval and set a new one
        clearInterval(Push_up_interval);
        Push_up_interval = setInterval(() => auto_gain_str(auto_str), time);
        localStorage.setItem("Push_up_interval", Push_up_interval);
    } else {
        console.log(requiredCost);
    }
}





function auto_gain_str(increase_by) {
    str += increase_by;
    document.getElementById('Strength').innerHTML 
    = "Strength: " + formatNumber(str);
    console.log(increase_by)
    localStorage.setItem("str",str);
}


































/////////////////////////////////////////////////////////////////////////////
/// Check for requirements.


function checkUpgrades() {
    const upgrades = {
        Progressive_Overload: {
            button_id: "progressive_overload",
            cost_id: "progressive_overload_cost",
            cost: 10,
            multiplier: parseInt(localStorage.getItem("Progressive_Overload_multiplier")) || 1,
        },
        Auto_Pushup: {
            button_id: "auto_pushup",
            cost_id: "auto_pushup_cost",
            cost: 500,
            multiplier: parseInt(localStorage.getItem("Auto_Pushup_multiplier")) || 1,
            auto_pushup_purchases: parseInt(localStorage.getItem("auto_pushup_purchases")) || 0,
        }
    };

    for (const upgrade in upgrades) {
        const upgradeData = upgrades[upgrade];
        let requiredCost;
        if (upgrade === "Auto_Pushup") {
            requiredCost = Math.round(upgradeData.cost * Math.pow(2, upgradeData.auto_pushup_purchases));
        } else {
            requiredCost = Math.round(upgradeData.cost ** upgradeData.multiplier);
        }
        const button = document.getElementById(upgradeData.button_id);
        const costElement = document.getElementById(upgradeData.cost_id);

        if (str >= requiredCost) {
            button.disabled = false;
            costElement.innerHTML = "Cost: " + formatNumber(requiredCost);
        } else {
            button.disabled = true;
            costElement.innerHTML = "Cost: " + formatNumber(requiredCost);
        }
    }
}





/////////////////////////////////////////////////////////////////////////////////////
/// Utilities.

function reset() {
    localStorage.clear();
    auto_pushup_purchases = 0;
    localStorage.setItem("auto_pushup_purchases", auto_pushup_purchases);
    clearInterval(Push_up_interval);
    localStorage.removeItem("Push_up_interval");
}



function restoreAutoGain() {
    const auto_str = parseInt(localStorage.getItem("auto_str")) || 0;
    if (auto_str > 0) {
        const intervalTime = parseInt(localStorage.getItem("Auto_Pushup_time")) || 2000;
        clearInterval(Push_up_interval);
        Push_up_interval = setInterval(() => auto_gain_str(auto_str), intervalTime);
    }
}




function formatNumber(num) {
    const suffixes = ["", " K", " Million", " Billion", " Trillion", " Quadrillion"
        , " Quintillion", " Sextillion", " Septillion", " Octillion", " Nonillion"
    ];
    const suffixIndex = Math.floor(Math.log10(Math.abs(num)) / 3);
    const formattedNum = parseFloat((num / Math.pow(1000, suffixIndex)).toFixed(2));
    return (isNaN(formattedNum) || formattedNum === 0) ? "0" : formattedNum + (suffixes[suffixIndex] || "");
}

function update_window_str() {
    str = parseInt(localStorage.getItem("str")) || 1;
    str_gain = parseInt(localStorage.getItem("str_gain")) || 1;
    auto_str = parseInt(localStorage.getItem("auto_str")) || 0;

    document.getElementById('Strength').innerHTML = "Strength: " + formatNumber(str);
    document.getElementById('strength_gain').innerHTML = "Current Strength Gain: " + formatNumber(str_gain);
    document.getElementById('auto_str').innerHTML = "Current Auto Strength Gain: " + formatNumber(auto_str);
}




function update_enemy_window_str() {
    document.getElementById("player_str").innerText = "Player Strength: " + formatNumber(str);
    document.getElementById("enemy_HP").innerText = "Enemy HP: " + formatNumber(enemy_hp);
    document.getElementById("player_HP").innerText = "Player HP: " + formatNumber(player_hp);
    document.getElementById("enemy_level").innerText = "Enemy Level: " + formatNumber(enemy_level);
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
window.onload = function(){
    restoreAutoGain();
};
// setInterval(update_enemy_window_str, 100);
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
        multi = 1;
        localStorage.setItem("multi",multi);
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
    multi = parseInt(localStorage.getItem("muti"));
}

function buyHP() {
    let HP_number = parseInt(prompt("How many HP do you wanna buy:"));
    if (isNaN(HP_number) || HP_number <= 0 || !Number.isInteger(HP_number) || HP_number > str) {
        alert("This is not a valid number!!!");
        return;
    }
    if (str >= HP_number) {
        str -= HP_number;
        player_hp += HP_number;
        localStorage.setItem("str", str);
        localStorage.setItem("player_hp", player_hp);
    } else {
        document.getElementById("buyHP").style.display = "block";
    }

    str = parseInt(localStorage.getItem("str"));
    player_hp = parseInt(localStorage.getItem("player_hp"));
}

function fightboss(){
    finalboss.src = 'finalboss.png';
    document.getElementById("enemy_HP").innerText = "Enemy HP: ???";
}