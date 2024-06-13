
///Variables///

let str = parseInt(localStorage.getItem("str")) || 0;
let str_gain = parseInt(localStorage.getItem("str_gain")) ||1;
let auto_push_up_multiplier = parseInt(localStorage.getItem("auto_push_up_multiplier")) || 1;
let enemy_hp = parseInt(localStorage.getItem("enemy_hp")) || 100;
let player_hp = parseInt(localStorage.getItem("player_hp")) || str/3;
let enemy_str = parseInt(localStorage.getItem("enemy_str")) || 2;
let enemy_level = parseInt(localStorage.getItem("enemy_level")) || 1;
let auto_str = parseInt(localStorage.getItem("auto_str")) || 0;
let auto_pushup_purchases = parseInt(localStorage.getItem("auto_pushup_purchases")) || 1;
let click_str_gain = parseInt(localStorage.getItem("click_str_gain")) || str_gain;
let combo = parseFloat(localStorage.getItem("combo")) || 0;
let comboTime = parseInt(localStorage.getItem("comboTimeout")) || 10000;
let comboTimeout = null
let Push_up_interval;
let clicked = parseInt(localStorage.getItem("clicked")) || 0;
let gold = parseInt(localStorage.getItem("gold")) || 0;
let boss_str = parseInt(localStorage.getItem("boss_str")) || 2000000;
let boss_level = parseInt(localStorage.getItem("boss_level")) || 100000;
let boss_hp = parseInt(localStorage.getItem("enemy_hp")) || 1000000;
/// Html Related JS ///

function openNav() {
    document.getElementById("mySidenav").style.width = "10rem";
    document.getElementById("main_Page").style.marginLeft = "11.5rem";
    document.getElementById("main_Page").style.transition = "0.9s";
    
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main_Page").style.marginLeft = "1.5rem";
}




/////////////////////////////////////////////////////////////////////////////////////
/// Strength and Upgrades section.



function gain_str(increase_by, multiplier) {
    clicked += 1;
    if (combo >= 10) {
        click_str_gain = (increase_by + str_gain) * (multiplier + combo) * (10 * (combo % 10));
        str += click_str_gain
    } else{
        click_str_gain = (increase_by + str_gain) * (multiplier + combo) 
        str += click_str_gain
        combo += 0.01;
    }

    // Clear the previous timeout if it exists
    // This is important as it prevents running
    // multiple timers that overlap with each other
    // and makes sure that it does not build up, thus
    // causing the game to slow down.
    if (comboTimeout) {
        clearTimeout(comboTimeout);
    }

    // Set a new timeout
    // This sets a new timer and basically after the previous
    // timer is clear from the code above, it starts and counts down
    // from combo time unless user clicks it again and resets timer.
    comboTimeout = setTimeout(() => {
        combo = 0;
        document.getElementById('combo').innerHTML = "Combo: 0";
        alert("Your combo has reset!");
    }, comboTime);

    localStorage.setItem("combo", combo);
    localStorage.setItem("str", str);
    localStorage.setItem("click_str_gain", click_str_gain);
    localStorage.setItem("clicked", clicked);
    checkUpgrades();
    update_window_str();
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


    localStorage.setItem("str", str);
    localStorage.setItem("str_gain", str_gain);
    localStorage.setItem("auto_str", auto_str);
    localStorage.setItem(upgradeName + "_multiplier", upgradeData.multiplier);
    localStorage.setItem(upgradeName + "_Bought", upgradeData.Progressive_Overload_Bought);
    checkUpgrades();
    update_window_str();
    
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
        update_window_str();
    } else {
        console.log(requiredCost);
    }
}





function auto_gain_str(increase_by) {
    str += increase_by;
    player_hp += increase_by/3;
    localStorage.setItem("str",str);
    localStorage.setItem("player_hp",player_hp);
    checkUpgrades();
    update_window_str()
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
        ,Boss: {
            button_id: "fightboss",
            Container_id: "boss_container",
            cost: 0,
            Bought: parseInt(localStorage.getItem("boss_Bought")) || 0,
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
    update_window_str();
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
                button.style.background = "crimson";
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
                button.style.background = "crimson";
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
                button.style.background = "crimson";
                button.style.color = "white";
                button.disabled = true;
            }
        }
        }
    check_exercise_upgrade();

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
        document.getElementById("push_up").style.display = "none";
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
    str = parseInt(localStorage.getItem("str")) || 0;
    str_gain = parseInt(localStorage.getItem("str_gain")) || 1;
    auto_str = parseInt(localStorage.getItem("auto_str")) || 0;

    document.getElementById('Strength').innerHTML = "Strength: " + formatNumber(str);
    document.getElementById('strength_gain').innerHTML = "Current Strength Gain: " + formatNumber(str_gain);
    document.getElementById('click_strength').innerHTML = "Click Str Gain: " + formatNumber(click_str_gain);
    document.getElementById('auto_str').innerHTML = "Current Auto Strength Gain: " + formatNumber(auto_str);
    if (clicked <= 0){
        document.getElementById('push_up').innerHTML = "Click me!";
    }
    else {
        document.getElementById('push_up').innerHTML = "Push up";
    }
    if (combo <= 1){
        document.getElementById('combo').innerHTML = "Combo: " + combo.toFixed(2);
    }
    else {
        document.getElementById('combo').innerHTML = "Combo: " + formatNumber(combo);
    }
}





function update_enemy_window_str() {
    document.getElementById("player_str").innerText = "Player Strength: " + formatNumber(str);
    document.getElementById("enemy_HP").innerText = "Enemy HP: " + formatNumber(enemy_hp);
    document.getElementById("player_HP").innerText = "Player HP: " + formatNumber(player_hp);
    document.getElementById("enemy_level").innerText = "Enemy Level: " + formatNumber(enemy_level);
    document.getElementById("enemy_str").innerText = "Enemy Strength: " + formatNumber(enemy_str);
    document.getElementById("gold_num").innerText = "Gold: " + formatNumber(gold);

}

function update_boss_window_str() {
    document.getElementById("player_str_2").innerText = "Player Strength: " + formatNumber(str);
    document.getElementById("BOSS_HP").innerText = "BOSS HP: " + formatNumber(boss_hp);
    document.getElementById("player_HP_2").innerText = "Player HP: " + formatNumber(player_hp);
    document.getElementById("BOSS_level").innerText = "BOSS Level: " + formatNumber(boss_level);
    document.getElementById("BOSS_str").innerText = "BOSS Strength: " + formatNumber(boss_str);
    document.getElementById("gold_num_2").innerText = "Gold: " + formatNumber(gold);

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



















setInterval(update_enemy_window_str,1);
setInterval(checkUpgrades, 100);
setInterval(update_window_str, 100);
setInterval(update_enemy_window_str, 100);
setInterval(update_boss_window_str,100);

window.onload = function () {
    restoreAutoGain();
    check_exercise_upgrade();
    checkUpgrades();
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
        player_hp = 0;
        str = 0;
        localStorage.setItem("str", str);
        localStorage.setItem("enemy_hp", enemy_hp);
        localStorage.clear();
        auto_pushup_purchases = 0;
        localStorage.setItem("auto_pushup_purchases", auto_pushup_purchases);
        clearInterval(Push_up_interval);
        localStorage.removeItem("Push_up_interval");
    } 
    if (enemy_hp <= 0) {
        enemy_level++;
        enemy_hp = 100 * enemy_level;
        enemy_str = enemy_level* 2;
        gold+=1;
        localStorage.setItem("gold", gold);
        localStorage.setItem("enemy_hp", enemy_hp);
        localStorage.setItem("enemy_str", enemy_str);
        localStorage.setItem("player_hp", player_hp);
        
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
}

function buyHP() {
    let HP_number = parseInt(prompt("How many HP do you wanna buy:"));
    if (isNaN(HP_number) || HP_number <= 0 || !Number.isInteger(HP_number) || HP_number >= str) {
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
    if (player_hp > 0){
        // Update player and boss HP based on combat
        player_hp -= boss_str;
        boss_hp -= str;
        }
        
        // Check if the player or boss has been defeated
        if (player_hp <= 0) {
        document.getElementById("fight").style.display = "block";
        player_hp = 0;
        str = 0;
        localStorage.setItem("str", str);
        localStorage.setItem("boss_hp", boss_hp);
        localStorage.clear();
        auto_pushup_purchases = 0;
        localStorage.setItem("auto_pushup_purchases", auto_pushup_purchases);
        clearInterval(Push_up_interval);
        localStorage.removeItem("Push_up_interval");
        } 
        if (boss_hp <= 0) {
        boss_level+=100;
        boss_hp = 10000000 * boss_level;
        boss_str += boss_level * boss_level;
        gold+=100000;
        localStorage.setItem("gold", gold);
        localStorage.setItem("boss_hp", boss_hp);
        localStorage.setItem("boss_str", boss_str);
        localStorage.setItem("player_hp", player_hp);
        }
        
        localStorage.setItem("boss_level", boss_level);
        localStorage.setItem("player_hp", player_hp);
        localStorage.setItem("boss_hp", boss_hp);
        localStorage.setItem("boss_str", boss_str);
        
        // Update localStorage with new values
        str_gain = parseInt(localStorage.getItem("str_gain"));
        boss_hp = parseInt(localStorage.getItem("boss_hp"));
        player_hp = parseInt(localStorage.getItem("player_hp"));
        boss_str = parseInt(localStorage.getItem("boss_str"));
        boss_level = parseInt(localStorage.getItem("boss_level"));
        
}