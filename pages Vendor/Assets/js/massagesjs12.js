var URL = window.URL || window.webkitURL

window.swapImage = function (elm) {
  var index = elm.dataset.index
  // URL.createObjectURL is faster then using the filereader with base64
  var url = URL.createObjectURL(elm.files[0])
  document.querySelector('img[data-index="'+index+'"]').src = url
}





// Buttons variables
let unread_btn = document.getElementById("unread_btn")
let inbox_btn = document.getElementById("inbox_btn")

//  Titles variables

let inbox_title = document.getElementById("inbox")
let unread_title = document.getElementById("unread")
let VenderMassages = document.getElementById("VenderMassages")
let PrivateMassages = document.getElementById("PrivateMassages")
let AdminMassages = document.getElementById("AdminMassages")

// buttons active variables

let readed_msg = document.querySelectorAll(".readed_msg")
let unreaded_msg = document.querySelectorAll(".unreaded_msg")
let vender_msg = document.getElementById("vender_msg")
let private_msg = document.getElementById("private_msg")
let admin_msg = document.getElementById("admin_msg")

// div variables

let read_div = document.getElementById("read_div")
let unread_div = document.getElementById("unread_div")
let ven_div = document.getElementById("ven_div")
let peri_msg = document.getElementById("peri_msg")
let admin_div = document.getElementById("admin_div")


inbox_btn.onclick = function(){
    let a = 0
    if (a === 0){
        peri_msg.classList = "div_none"
        admin_div.classList = "div_none"
        unread_div.classList = "div_none"
        read_div.classList = "div_active"
        inbox_btn.classList = "inbox_btn"
        unread_btn.classList = "unread_btn"
        inbox_title.classList.add("title_act")
        inbox_title.classList.remove("title_none")
        unread_title.classList.remove("title_act")
        AdminMassages.classList.remove("title_act")
        PrivateMassages.classList.remove("title_act")
        VenderMassages.classList.remove("title_act")
        private_msg.classList.remove("msg_list_active")
        vender_msg.classList.remove("msg_list_active")
        ven_div.classList = "div_none"
        x = 1
    }
}


unread_btn.onclick = function(){
    let x = 0
    if (x === 0){   
        peri_msg.classList = "div_none"
        admin_div.classList = "div_none"
        unread_div.classList = "div_active"
        read_div.classList = "div_none"
        inbox_btn.classList = "unread_btn"
        unread_btn.classList = "inbox_btn"
        inbox_title.classList.add("title_none")
        inbox_title.classList.remove("title_act")
        unread_title.classList.add("title_act")
        VenderMassages.classList.remove("title_act")
        PrivateMassages.classList.remove("title_act")
        AdminMassages.classList.remove("title_act")
        private_msg.classList.remove("msg_list_active")
        vender_msg.classList.remove("msg_list_active")
        ven_div.classList = "div_none"
        admin_msg.classList.remove("msg_list_active")
    }
}


vender_msg.onclick = function(){
    let i = 0
    if (i === 0){
        ven_div.classList = "div_active"
        peri_msg.classList = "div_none"
        admin_div.classList = "div_none"
        unread_div.classList = "div_none"
        read_div.classList = "div_none"
        inbox_btn.classList = "unread_btn"
        unread_btn.classList = "unread_btn"
        inbox_title.classList.add("title_none")
        VenderMassages.classList.add("title_act")
        inbox_title.classList.remove("title_act")
        unread_title.classList.remove("title_act")
        AdminMassages.classList.remove("title_act")
        PrivateMassages.classList.remove("title_act")
        private_msg.classList.remove("msg_list_active")
        vender_msg.classList.add("msg_list_active")
        admin_msg.classList.remove("msg_list_active")
    }
}

private_msg.onclick = function(){
    let s = 0
    if (s === 0){
        ven_div.classList = "div_none"
        admin_div.classList = "div_none"
        peri_msg.classList = "div_active"
        unread_div.classList = "div_none"
        read_div.classList = "div_none"
        inbox_btn.classList = "unread_btn"
        unread_btn.classList = "unread_btn"
        inbox_title.classList.add("title_none")
        VenderMassages.classList.remove("title_act")
        inbox_title.classList.remove("title_act")
        unread_title.classList.remove("title_act")
        PrivateMassages.classList.add("title_act")
        AdminMassages.classList.remove("title_act")
        vender_msg.classList.remove("msg_list_active")
        private_msg.classList.add("msg_list_active")
        admin_msg.classList.remove("msg_list_active")
    }
}

admin_msg.onclick = function(){
    let d = 0
    if (d === 0){
        ven_div.classList = "div_none"
        peri_msg.classList = "div_none"
        admin_div.classList = "div_active"
        unread_div.classList = "div_none"
        read_div.classList = "div_none"
        inbox_btn.classList = "unread_btn"
        unread_btn.classList = "unread_btn"
        inbox_title.classList.add("title_none")
        VenderMassages.classList.remove("title_act")
        inbox_title.classList.remove("title_act")
        unread_title.classList.remove("title_act")
        PrivateMassages.classList.remove("title_act")
        AdminMassages.classList.add("title_act")
        vender_msg.classList.remove("msg_list_active")
        private_msg.classList.remove("msg_list_active")
        admin_msg.classList.add("msg_list_active")
    }
}

