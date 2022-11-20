let Select = document.getElementById("Select");
let list = document.getElementById("list");
let SelectText  = document.getElementById("SelectText");
let options = document.getElementsByClassName("Options");
let inputfield = document.getElementById("inputfield");

Select.onclick = function(){
    list.classList.toggle("open");
}

for(Option of Option){
    Option.onclick = function(){
        SelectText.innerHTML = this.innerHTML;
        inputfield.placeholder = "Search in" + SelectText.innerHTML;
     }
    
}