
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
let click_str_gain = parseInt(localStorage.getItem("click_str_gain")) || 1;
let combo = parseInt(localStorage.getItem("combo")) || 0;
let comboTimeout;
let Push_up_interval;
/// Html Related JS ///

function openNav() {
    document.getElementById("mySidenav").style.width = "8rem";
    document.getElementById("main_Page").style.marginLeft = "9.5rem";
    document.getElementById("main_Page").style.transition = "0.9s";
    
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main_Page").style.marginLeft = "1.5rem";
}




/////////////////////////////////////////////////////////////////////////////////////
/// Strength and Upgrades section.



function gain_str(increase_by, multiplier) {
    str += (increase_by + str_gain) * (multiplier + combo);
    click_str_gain = (increase_by + str_gain) * (multiplier + combo)
    combo += 0.01;
    document.getElementById('click_strength').innerHTML = "Click Str Gain: " + formatNumber(click_str_gain);
    document.getElementById('combo').innerHTML = "Combo: " + formatNumber(combo);
    document.getElementById('Strength').innerHTML = "Strength: " + formatNumber(str);

    if (str == 10) {
        setTimeout(() => {
            alert("You have enough strength to buy an upgrade!\nYou can view upgrades by clicking the upgrade button below push up.");
        }, 2000);
    }

    clearTimeout(comboTimeout);
    comboTimeout = setTimeout(() => {
        combo = 0;
        document.getElementById('combo').innerHTML = "Combo: 0";
    }, 5000); 
    
    checkUpgrades();
    localStorage.setItem("str", str);
    localStorage.setItem("combo", combo);
}



function upgrade_str(increase_by, cost, multiplier, multiplier_increase_by, upgradeName) {
   
    const upgrades = {
        Progressive_Overload: {
            button_id: "progressive_overload",
            cost_id: "progressive_overload_cost",
            cost: 10,
            multiplier: parseInt(localStorage.getItem("Progressive_Overload_multiplier")) || 1,
            Progressive_Overload_Bought: parseInt(localStorage.getItem("Progressive_Overload_Bought")) || 0,
        },
    
    };
    const upgradeData = upgrades[upgradeName];
    if (upgradeName == 'Progressive_Overload') {
        const requiredCost = Math.round(cost ** upgradeData.multiplier);
        upgradeData.Progressive_Overload_Bought += 1;
        str -= requiredCost;
        str_gain += (increase_by ** upgradeData.multiplier) * Math.pow(2, multiplier);
        auto_str += str_gain / 10;
        upgradeData.multiplier += multiplier_increase_by + 1;
    }

    document.getElementById("Strength").innerHTML = "Strength: " + formatNumber(str);
    document.getElementById("strength_gain").innerHTML = "Current Strength Gain: " + formatNumber(str_gain);

    localStorage.setItem("str", str);
    localStorage.setItem("str_gain", str_gain);
    localStorage.setItem("auto_str", auto_str);
    localStorage.setItem(upgradeName + "_multiplier", upgradeData.multiplier);
    localStorage.setItem(upgradeName + "_Bought", upgradeData.Progressive_Overload_Bought);
    checkUpgrades();
    
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
        * Math.pow(2, upgradeData.auto_pushup_purchases) * (str_gain/4);
        str_gain += (increase_by ** upgradeData.multiplier);
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
        checkUpgrades();
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
    checkUpgrades();
}



///Purchase New Exercise////

function purchase_exercise(exerciseName){
    const Exercises ={
        Pull_up: {
            button_id: "pull_up",
            Container_id: "pull_up_container",
            cost: 5000,
            Bought: parseInt(localStorage.getItem("pull_up_Bought")) || 0,
        }
    }
    const exerciseData = Exercises[exerciseName];
    const requiredCost = exerciseData.cost;
    const container = document.getElementById(exerciseData.Container_id);
    const button = document.getElementById(exerciseData.button_id);
    str -= requiredCost;
    button.style.display = "block";
    container.style.display = "none";
    exerciseData.Bought += 1;
    localStorage.setItem(exerciseName + "_Bought", exerciseData.Bought);
    localStorage.setItem("str", str);
    checkUpgrades();
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
            Bought: parseInt(localStorage.getItem("Progressive_Overload_Bought")) || 0,
        },
        Auto_Pushup: {
            button_id: "auto_pushup",
            cost_id: "auto_pushup_cost",
            cost: 500,
            multiplier: parseInt(localStorage.getItem("Auto_Pushup_multiplier")) || 1,
            auto_pushup_purchases: parseInt(localStorage.getItem("auto_pushup_purchases")) || 0,
        },
        Pull_up: {
            Container_id: "pull_up_container",
            button_id: "purchase_pull_up",
            cost_id: "pull_up_requirements",
            Requirement: {
                cost: 5000,
                "1" : localStorage.getItem("Progressive_Overload_Bought") || 0,
            },
            multiplier: parseInt(localStorage.getItem("Pull_up_multiplier")) || 1,
            Bought: parseInt(localStorage.getItem("Pull_up_Bought")) || 0,
        }
        
    };
    

    for (const upgrade in upgrades) {
        const upgradeData = upgrades[upgrade];
        if (upgrade === "Progressive_Overload") {
            const button = document.getElementById(upgradeData.button_id);
            const costElement = document.getElementById(upgradeData.cost_id);
            bought = upgradeData.Bought;
            requiredCost = Math.round(upgradeData.cost ** upgradeData.multiplier);
            if (str >= requiredCost) {
                button.disabled = false;
                button.style.background = "green";
                button.style.color = "white";
                costElement.innerHTML = "Cost: " + formatNumber(requiredCost) + " ||" + " ("
                + bought + ")";
            } else {
                button.disabled = true;
                button.style.background = "red";
                button.style.color = "white";
                costElement.innerHTML = "Cost: " + formatNumber(requiredCost) + " ||" + " ("
                + bought + ")";
            }
        }
        else if (upgrade === "Auto_Pushup") {
            const button = document.getElementById(upgradeData.button_id);
            const costElement = document.getElementById(upgradeData.cost_id);
            bought = upgradeData.auto_pushup_purchases;
            
            if (bought >= 10){
                requiredCost = Math.round(upgradeData.cost * Math.pow(2, upgradeData.auto_pushup_purchases))
                * (auto_pushup_purchases * auto_pushup_purchases);}
            else {requiredCost = Math.round(upgradeData.cost * Math.pow(2, upgradeData.auto_pushup_purchases));}
            
            if (str >= requiredCost) {
                button.disabled = false;
                button.style.background = "green";
                button.style.color = "white";

                costElement.innerHTML = "Cost: " + formatNumber(requiredCost) + " ||" + " ("
                + bought + ")";
            } else {
                button.disabled = true;
                button.style.background = "red";
                button.style.color = "white";
                costElement.innerHTML = "Cost: " + formatNumber(requiredCost) + " ||" + " ("
                + bought + ")";
            }
        }
        else if (upgrade === "Pull_up") {
            const button = document.getElementById(upgradeData.button_id);
            requiredCost = Math.round(upgradeData.Requirement.cost ** upgradeData.multiplier);
            Progressive_Overload_Bought = upgradeData.Requirement["1"];
            Pull_up_Bought = upgradeData.Bought;
            cotainer = document.getElementById(upgradeData.Container_id);
            if (Progressive_Overload_Bought >= 3 && str >= requiredCost) {
                button.style.background = "green";
                button.style.color = "white";
                button.disabled = false;
            }
            else {
                button.style.background = "red";
                button.style.color = "white";
                button.disabled = true;
            }
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

function check_exercise_upgrade(){
    const pull_up_Bought = parseInt(localStorage.getItem("Pull_up_Bought")) || 0;
    if (pull_up_Bought === 1){
        document.getElementById("pull_up_container").style.display = "none";
        document.getElementById("pull_up").style.display = "block";
    }
    else {
        document.getElementById("pull_up_container").style.display = "block";
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



function toggle(className, button_id) {
    const element = document.getElementsByClassName(className)[0];
    const button = document.getElementById(button_id)
        if (button_id == 'status_button'){
        if (element.style.display === "none") {
            element.style.display = "block";
            button.innerHTML = "Hide Status"
        } else {
            element.style.display = "none";
            button.innerHTML = "Show Status"
    
        }
    }
}

function toggleUpgrades() {
    var x = document.getElementById("upgrades");
    var y = document.getElementById("closeUpgrades")
    if (x.style.display == "block") { // `=` to `==` or `===`
      x.style.display = "none";
      y.innerHTML = "Upgrades"
    } else {
      x.style.display = "block";
      y.innerHTML = "Close"
    }
  }




















setInterval(checkUpgrades, 100);
setInterval(update_window_str, 100);
setInterval(update_enemy_window_str, 100);

window.onload = function () {
    setTimeout(() => {
        alert("Welcome to Idle Gym\nClick the push up button to begin" + 
        "\nBecome the strongest in the world and ascend to become a god!");
    }, 2000);
    restoreAutoGain();
    check_exercise_upgrade();
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