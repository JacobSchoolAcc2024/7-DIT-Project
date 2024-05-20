let str = 0;
let str_gain = 0;
let multiplier = 1;

function openNav() {
    document.getElementById("mySidenav").style.width = "10%";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function gain_str(increase_by, id) {
    str += increase_by + str_gain;
    document.getElementById(id).innerHTML = "Strenght: " + str;
}

function upgrade_str(increase_by, cost) {
    upgradeCost = cost * multiplier;
    str -= upgradeCost;
    str_gain += increase_by;
    document.getElementById("strenght").innerHTML = "Strenght: " + str;
    multiplier += 1.5;    
}




function checkUpgrades() {
    const upgrades = {
        upgrade1: {
            cost_id: "cost1",
            id: "upgrade1_",
            cost: 20
        },
        upgrade2: {
            cost_id: "cost2",
            id: "upgrade2_",
            cost: 1000
        },
    };

    for (const upgrade in upgrades) {
        check_upgrades(upgrades[upgrade].id, upgrades[upgrade].cost, upgrades[upgrade].cost_id);
    }
}


function check_upgrades(id, cost, cost_id) {
    const requiredCost = cost * multiplier;
    if (str >= requiredCost) {
        document.getElementById(id).style.display = "block";
        document.getElementById(cost_id).innerHTML = "Cost :" + requiredCost;
    } else {
        document.getElementById(id).style.display = "none";
    }
}

setInterval(checkUpgrades, 100);
