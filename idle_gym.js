<<<<<<< Updated upstream
function openNav() {
    document.getElementById("mySidenav").style.width = "10%";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
=======

let str = 0

function gain_str(increase_by, id){
    str += increase_by
    document.getElementById(id).innerHTML = str
>>>>>>> Stashed changes
}