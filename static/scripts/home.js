var a = document.getElementsByClassName("box2")[0];
var b = document.getElementsByClassName("box3")[0];
var path = window.location.pathname;
document.addEventListener("DOMContentLoaded", temp());
            
function temp(){
    console.log(path);
    if(path == "/userHomeState"){
    console.log("Function running");
    b.classList.add('active');
    }else{
        a.classList.add('active');
    }
}


