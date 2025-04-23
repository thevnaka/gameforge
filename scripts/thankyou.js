document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".form");
    const thankMsg = document.getElementById("thankContainer");
    const title = document.getElementById("title");
    const table = document.getElementById("sumTable");
    const btn = document.getElementById("shopping");

    formCon = document.getElementById("main_payment_con");


        form.addEventListener("submit", function(event) {
            event.preventDefault();

            if (form.checkValidity()) {
                thankMsg.classList.remove("msgHidden");
                title.style.display = "none";
                formCon.style.display = "none";
                table.style.display = "none";
                thankMsg.classList.add("msgShown");

                localStorage.removeItem("cart");

            } else {
                form.reportValidity();
            }
        });


        btn.addEventListener("click",function(){
            window.location.href = "./hardware.html";
        })
    
});

