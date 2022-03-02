var URL = window.URL || window.webkitURL

window.swapImage = function (elm) {
  var index = elm.dataset.index
  // URL.createObjectURL is faster then using the filereader with base64
  var url = URL.createObjectURL(elm.files[0])
  document.querySelector('img[data-index="'+index+'"]').src = url
}


let sidebar_show = document.getElementById("sidebar_show")
let side_bar = document.getElementById("side_bar")
let hide_btn = document.getElementById("hide_btn")
sidebar_show.onclick = function(){
    let x = 0
    if(x === 0){
        side_bar.classList.add("msg_side_bar_show")

    }
}
hide_btn.onclick = function(){
    let i = 0
    if (i === 0) {
        side_bar.classList.remove("msg_side_bar_show")
        
    }
}

