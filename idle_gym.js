let str = 0;
let str_gain = 0;
let multiplier = 1;

function openNav() {
    document.getElementById("mySidenav").style.width = "10%";
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
function gain_str(increase_by, id) {
    str += increase_by + str_gain;
    document.getElementById(id).innerHTML = "Strenght: " + str;
}

function upgrade_str(increase_by, cost) {
    upgradeCost = Math.round(cost ** multiplier);
    str -= upgradeCost;
    str_gain += increase_by;
    document.getElementById("strenght").innerHTML = "Strenght: " + str;
    multiplier += 1;    
    alert("Strenght gain is increased by " + str_gain)
}




function checkUpgrades() {
    const upgrades = {
        upgrade1: {
            cost_id: "cost1",
            id: "upgrade1_",
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
    const requiredCost = Math.round(cost ** multiplier);
    if (str >= requiredCost) {
        document.getElementById(id).style.display = "block";
        document.getElementById(cost_id).innerHTML = "Cost :" + formatNumber(requiredCost);
    } else {
        document.getElementById(id).style.display = "none";
        console.log(formatNumber(requiredCost));
    }
}

function formatNumber(num) {
    const suffixes = ["", " K", " Million", " Billion", " Trillion"];
    const suffixIndex = Math.floor(Math.log10(Math.abs(num)) / 3);
    const formattedNum = parseFloat((num / Math.pow(1000, suffixIndex)).toFixed(2));
    return formattedNum + (suffixes[suffixIndex] || "");
}

function update_window(){
    document.getElementById("strenght").innerHTML = "Strenght: " + formatNumber(str);
}


setInterval(checkUpgrades, 100);
setInterval(update_window, 100);
