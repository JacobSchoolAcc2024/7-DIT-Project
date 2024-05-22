
///Variables///

let str = 1;
let str_gain = 1;
let multiplier = 1;
let auto_pushup_multiplier = 1


/// Html Related JS ///

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


function gain_str(increase_by, str_id) {
    str += increase_by + str_gain;
    document.getElementById(str_id).innerHTML 
    = "Strenght: " + formatNumber(str);
}


function upgrade_str(increase_by, cost) {
    upgradeCost = Math.round(cost ** multiplier);
    str -= upgradeCost;
    str_gain += (increase_by ** multiplier)*multiplier;
    document.getElementById("strenght").innerHTML = "Strenght: " + str;
    document.getElementById("strenght_gain").innerHTML = "Strenght Gain: " + str_gain;
    multiplier += 1;    
}


/////////////////////////////////////////////////////////////////////////////////////
/// Automatic gain of strenght.


function purchaseAuto(increase_by, id, time, cost) {
    requiredCost = Math.round(cost ** auto_pushup_multiplier);
    str -= requiredCost;
    auto_pushup_multiplier += 1;
    setInterval(auto_str_gain(increase_by, id), time);
    console.log("This is the time: " + time)
    time -= 500;


}

function auto_str_gain(increase_by, id){
    return function(){
        str += (increase_by * auto_pushup_multiplier) * str_gain;
        console.log((increase_by * auto_pushup_multiplier) * str_gain)
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
    const requiredCost = Math.round(cost ** multiplier);
    if (str >= requiredCost) {
        document.getElementById(id).style.display = "block";
        document.getElementById(cost_id).innerHTML = "Cost :" + formatNumber(requiredCost);
    } else {
        document.getElementById(id).style.display = "none";
        console.log("Cost for next progressive overload upgrade: " 
        + formatNumber(requiredCost));
    }
}

function auto_price_pushup(){
    
    const auto_prices = {
        auto_price1: {
            cost_id: "auto_cost_pushup",
            id: "auto_pushup",
            cost: 500,
        },
        // auto_price2: {
        //     cost_id: "auto_price2",
        //     id: "auto_price2_",
        //     cost: 1000
        // },
    };

    for (const price in auto_prices) {
        check_auto_price(auto_prices[price].id, auto_prices[price].cost, 
            auto_prices[price].cost_id);
    }

}

function check_auto_price(id, cost, cost_id){
    const requiredCost = Math.round(cost ** auto_pushup_multiplier);
    if (str >= requiredCost) {
        document.getElementById(id).style.display = "block";
        document.getElementById(cost_id).innerHTML = "Cost :" + formatNumber(requiredCost);
    } else {
        document.getElementById(id).style.display = "none";
        console.log("This is the price for auto_pushup: " + formatNumber(requiredCost))
}

}




/////////////////////////////////////////////////////////////////////////////////////
/// Utilities.


function formatNumber(num) {
    const suffixes = ["", " K", " Million", " Billion", " Trillion", " Quadrillion"
        , " Quintillion", " Sextillion", " Septillion", " Octillion", " Nonillion"
    ];
    const suffixIndex = Math.floor(Math.log10(Math.abs(num)) / 3);
    const formattedNum = parseFloat((num / Math.pow(1000, suffixIndex)).toFixed(2));
    return formattedNum + (suffixes[suffixIndex] || "");
}

function update_window_str() {
    document.getElementById('strenght').innerHTML = "Strenght: " + formatNumber(str);
}

setInterval(checkUpgrades, 100);
setInterval(update_window_str, 100);
setInterval(auto_price_pushup, 100);
