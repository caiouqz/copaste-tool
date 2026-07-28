const UIStyle = {

    inject() {

        if (document.getElementById("unlock-toolkit-style"))
            return;

        const style = document.createElement("style");

        style.id = "unlock-toolkit-style";

        style.textContent = `

#unlock-toolkit-button{

    position:fixed;
    bottom:20px;
    right:20px;

    width:55px;
    height:55px;

    border-radius:50%;

    border:none;

    background:#1976d2;

    color:white;

    font-size:26px;

    cursor:pointer;

    z-index:2147483647;

    box-shadow:0 6px 18px rgba(0,0,0,.25);

}

#unlock-toolkit-panel{

    position:fixed;

    top:120px;
    left:20px;
    width:260px;

    background:white;

    color:#222;

    border-radius:12px;

    box-shadow:0 8px 30px rgba(0,0,0,.25);

    font-family:Arial;

    display:none;

    overflow:hidden;

    z-index:2147483647;

}

#unlock-toolkit-panel header{

    cursor:move;

    user-select:none;

}

#unlock-toolkit-panel header{

    background:#1976d2;

    color:white;

    padding:12px;

    font-weight:bold;

}

#unlock-toolkit-panel .content{

    padding:15px;

}

#unlock-toolkit-panel label{

    display:flex;

    justify-content:space-between;

    margin-bottom:12px;

    cursor:pointer;

}

`;

        document.head.appendChild(style);

    }

};