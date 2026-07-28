const Panel = {

    visible: false,

    create() {

        if (document.getElementById("unlock-toolkit-panel"))
            return;

        const panel = document.createElement("div");

        panel.id = "unlock-toolkit-panel";

        panel.innerHTML = `
            <header>
                🛠 Unlock Toolkit
            </header>

            <div class="content">

                <label>
                    Unlock Copy
                    <input id="unlock-copy-switch" type="checkbox">
                </label>

                <label>
                    Dark Mode
                    <input id="dark-switch" type="checkbox">
                </label>

            </div>
        `;

        document.body.appendChild(panel);

        this.restorePosition(panel);
        this.enableDrag(panel);

        document.getElementById("unlock-copy-switch").checked =
            Storage.get("unlockCopy");

        document.getElementById("dark-switch").checked =
            Storage.get("darkMode");

        document.getElementById("unlock-copy-switch").addEventListener("change", () => {
            UnlockCopy.toggle();
        });

        document.getElementById("dark-switch").addEventListener("change", () => {
            DarkMode.toggle();
        });

    },

    toggle() {

        this.visible = !this.visible;

        document.getElementById("unlock-toolkit-panel").style.display =
            this.visible ? "block" : "none";

    },

    restorePosition(panel) {

        const x = Storage.get("panelX");
        const y = Storage.get("panelY");

        if (x !== null)
            panel.style.left = x + "px";

        if (y !== null)
            panel.style.top = y + "px";

    },

    enableDrag(panel) {

        const header = panel.querySelector("header");

        let dragging = false;

        let offsetX = 0;
        let offsetY = 0;

        header.addEventListener("mousedown", (e) => {

            dragging = true;

            offsetX = e.clientX - panel.offsetLeft;
            offsetY = e.clientY - panel.offsetTop;

            e.preventDefault();

        });

        document.addEventListener("mousemove", (e) => {

            if (!dragging)
                return;

            panel.style.left = (e.clientX - offsetX) + "px";
            panel.style.top = (e.clientY - offsetY) + "px";

        });

        document.addEventListener("mouseup", () => {

            if (!dragging)
                return;

            dragging = false;

            Storage.set("panelX", panel.offsetLeft);
            Storage.set("panelY", panel.offsetTop);

        });

    }

};