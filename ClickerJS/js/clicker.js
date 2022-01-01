
var click_amount; // HOW MUCH PER CLICK
var gold_amount; // TEXT-GOLD ELEMENT INNER VALUE
var gold_saved; // GOLD LOCALSTORED
var bonus_amount = 0; // BONUS LOCALSTORED

// LEVELING DATA
var lvl;    // player level
var exp_needed;
var current_exp;
var exp_progress;

var level_bonus = parseInt(lvl); // how many wins per level

// SHOPPING
var hunt1_quantity;

window.onload = function(){
    console.log("Sessão:");
    if(sessionStorage.getItem("bank") > 0){
        gold_amount = sessionStorage.getItem("bank");
        gold_saved = sessionStorage.getItem("bank");
    }else{
        gold_amount = 0;
        gold_saved = 0;
        sessionStorage.setItem("bank", 0);
    }
    // GOLD OPTIONS ON LOAD
    gold_amount = document.getElementById("text-gold");
    console.log("gold "+ parseInt(sessionStorage.getItem("bank")));
    // CLICKER OPTION ON LOAD
    click_amount = lvl + parseInt(bonus_amount);
    gold_amount.innerText = gold_saved;
    // XP
    if(sessionStorage.getItem("exp")==null || sessionStorage.getItem("nivel") == NaN){
        lvl = 1;
        current_exp = 0;
        document.getElementById("xp-progress").style.width = "0%";
        document.getElementById("xp-progress-text").innerText = "0%";
        sessionStorage.setItem("nivel", 1);
        sessionStorage.setItem("exp", 0);
    }else{
        current_exp = sessionStorage.getItem("exp");
        lvl = parseInt(sessionStorage.getItem("nivel"));
        exp_needed = lvl*200;
        var progresso_exp_load = parseFloat((current_exp/exp_needed) * 100).toPrecision(4);
        document.getElementById("xp-progress").style.width = ""+progresso_exp_load+"%";
        document.getElementById("xp-progress-text").innerText = ""+progresso_exp_load+"%";
        console.log("CURRENT LEVEL: "+parseInt(lvl));
    }
    console.log("EXP NEEDED: "+exp_needed);
    console.log("EXP: "+current_exp);

    // SHOPPING
    if(sessionStorage.getItem("hunt1")!=null){
        hunt1_quantity = sessionStorage.getItem("hunt1");
        console.log("Hunting 1:"+hunt1_quantity);
    }else{
        hunt1_quantity = 0;
        console.log("Hunting 1 não adquirida");
    }


}
/*
function add_exp(){
    exp_needed = parseInt(lvl/2 * 200 * 3.1415);
    var calculo = parseInt(current_exp) + 30;
    sessionStorage.setItem("exp", calculo);
    console.log(current_exp = sessionStorage.getItem("exp"));

    exp_progress = parseFloat((current_exp/exp_needed) * 100).toPrecision(4);
    document.getElementById("xp-progress").style.width = ""+exp_progress+"%";
    document.getElementById("xp-progress-text").innerText = ""+exp_progress+"%";
    console.log("exp progress: "+exp_progress+"%");
    if(current_exp >= exp_needed){
        lvl++;
        current_exp = 0;
        console.log("level novo "+lvl);
        document.getElementById("xp-progress").style.width = "0%";
        document.getElementById("xp-progress-text").innerText = "0%";
    }
    
    sessionStorage.setItem("nivel", lvl);
    console.log("nivel: "+sessionStorage.getItem("nivel"));
    sessionStorage.setItem("exp", current_exp);
    
}
*/
function click_adder(){
    gold_amount.innerText = parseInt(gold_saved) + lvl*lvl + 1;
    sessionStorage.setItem("bank", gold_amount.innerText);
    gold_saved = sessionStorage.getItem("bank");
    console.log("valor : "+sessionStorage.getItem("bank"));
}

var intervalOne = window.setInterval(function(){
    change_gold();
}, 1000);

function change_gold(){
    var last_update = gold_amount.innerText;
    if(last_update > 0){
        var updated_gold = parseInt(last_update)+parseInt(lvl)*parseInt(lvl);
        sessionStorage.setItem("bank", parseInt(updated_gold));
        gold_amount.innerText = parseInt(sessionStorage.getItem("bank"));
    }
}
// LEVELING SYSTEM 
function update_exp(){
    sessionStorage.setItem("exp", current_exp);
    lvl = sessionStorage.getItem("nivel");
    console.log("Nível: "+parseInt(lvl));
    exp_needed = lvl*200;
    exp_progress = parseFloat((current_exp/exp_needed) * 100).toPrecision(4);
    document.getElementById("xp-progress").style.width = ""+exp_progress+"%";
    document.getElementById("xp-progress-text").innerText = ""+exp_progress+"%";

    if(exp_needed-current_exp <= 0){
        parseInt(lvl++);
        sessionStorage.setItem("nivel", lvl);
        current_exp = 0;
        console.log("level novo "+lvl);
        document.getElementById("xp-progress").style.width = "0%";
        document.getElementById("xp-progress-text").innerText = "0%";
        sessionStorage.setItem("nivel", lvl);
    }
    sessionStorage.setItem("exp", current_exp);
}


var huntingIntevarl = window.setInterval(function(){
    check_shop();
},2000);

function check_shop(){
    hunt1_quantity = sessionStorage.getItem("hunt1");
    //hunt1_quantity = parseInt(1);
    if(hunt1_quantity>0){
        current_exp = parseInt(current_exp) + parseFloat(1)*parseInt(hunt1_quantity);
        update_exp();
        document.getElementById("box1").innerText = ""+sessionStorage.getItem("hunt1");+"";
    }else{
        console.log("Sem equipas de hunting adquiridas");
    }
}

function sell(){
    var last_update = gold_amount.innerText;
    var last_update_hunt = sessionStorage.getItem("hunt1");
    if(last_update>=500){
        last_update=last_update-500;
        sessionStorage.setItem("bank", last_update);
        console.log("vendido");
        gold_amount.innerText = parseInt(sessionStorage.getItem("bank"));
        last_update_hunt=last_update_hunt+parseInt(1);
        sessionStorage.setItem("hunt1", last_update_hunt);
        console.log(last_update_hunt);
    }
    console.log("pobre");
}

// ALERTS
function call_clear(){
    sessionStorage.clear();
    document.getElementById("alertas").style.display = "flex";
    var message = "Pogresso foi apagado com sucesso!";
    document.getElementById("alert_box").innerHTML = message+"<br><div class='button_box'><button onclick='window.location.reload();'>ok</button></div>";
    sessionStorage.clear();
    lvl = parseInt(1);
    current_exp = 0;
    gold_saved = 0;
    gold_amount = 0;
}

function call_save(){
    sessionStorage.setItem("bank", gold_saved);
    document.getElementById("alertas").style.display = "flex";
    var message = "Pogresso foi salvo com sucesso!";
    document.getElementById("alert_box").innerHTML = message+"<br><div class='button_box'><button onclick='call_close_alerts()'>ok</button></div>";
}

function call_close_alerts(){
    document.getElementById("alertas").style.display = "none";
}