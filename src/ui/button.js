const FloatingButton = {

    create() {

        if(document.getElementById("unlock-toolkit-button"))
            return;

        const btn = document.createElement("button");

        btn.id="unlock-toolkit-button";

        btn.innerHTML="🛠";

        btn.onclick=()=>{

            Panel.toggle();

        };

        document.body.appendChild(btn);

    }

};