const DarkMode = {

    enabled: false,

    styleId: "__unlock_dark",

    apply() {

        if (!this.enabled) return;

        if (document.getElementById(this.styleId))
            return;

        const style = document.createElement("style");

        style.id = this.styleId;

        style.textContent = `

html{

    filter:invert(1) hue-rotate(180deg)!important;
    background:#111!important;

}

img,
video,
canvas,
svg,
iframe{

    filter:invert(1) hue-rotate(180deg)!important;

}

        `;

        document.head.appendChild(style);

    },

    remove() {

        document.getElementById(this.styleId)?.remove();

    },

    enable() {

        this.enabled = true;

        Storage.set("darkMode", true);

        this.apply();

        Notify.success("Modo escuro ativado.");

    },

    disable() {

        this.enabled = false;

        Storage.set("darkMode", false);

        this.remove();

        Notify.info("Modo escuro desativado.");

    },

    toggle() {

        this.enabled
            ? this.disable()
            : this.enable();

    }

};