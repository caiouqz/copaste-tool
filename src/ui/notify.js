const Notify={

    show(message,color="#2e7d32"){

        document.getElementById("unlock-notify")?.remove();

        const div=document.createElement("div");

        div.id="unlock-notify";

        div.innerHTML=message;

        div.style.cssText=`

position:fixed;

top:20px;

right:20px;

background:${color};

color:white;

padding:12px 20px;

border-radius:8px;

font-family:Arial;

z-index:2147483647;

box-shadow:0 5px 18px rgba(0,0,0,.25);

`;

        document.body.appendChild(div);

        setTimeout(()=>{

            div.remove();

        },2200);

    },

    success(msg){

        this.show("✅ "+msg);

    },

    info(msg){

        this.show("ℹ "+msg,"#1976d2");

    },

    error(msg){

        this.show("❌ "+msg,"#c62828");

    }

};