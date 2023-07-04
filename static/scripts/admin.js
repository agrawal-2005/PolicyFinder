var a = document.getElementsByClassName("box2")[0];
var b = document.getElementsByClassName("box3")[0];
var c = document.getElementsByClassName("box4")[0];
var path = window.location.pathname;
document.addEventListener("DOMContentLoaded", temp());
            
function temp(){
    // console.log(path);
    if(path == "/adminDel" || path == "/delete_policy"){
    // console.log("Function running");
        b.classList.add('active');
    }else if(path == "/admin" || path == "/adminlogin" || path == "/policy_add"){
        a.classList.add('active');
    }else{
        c.classList.add('active');
    }
}