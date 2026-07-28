const UnlockCopy = {

    enabled: true,

    events: [
        "copy",
        "cut",
        "paste",
        "contextmenu",
        "selectstart"
    ],

    apply() {

        if (!this.enabled) return;

        document.querySelectorAll("*").forEach(el => {

            [
                "oncopy",
                "oncut",
                "onpaste",
                "oncontextmenu",
                "onselectstart",
                "ondragstart"
            ].forEach(attr => {

                try {

                    el[attr] = null;
                    el.removeAttribute(attr);

                } catch {}

            });

            try {

                el.style.setProperty("user-select", "text", "important");
                el.style.setProperty("-webkit-user-select", "text", "important");
                el.style.setProperty("-moz-user-select", "text", "important");
                el.style.setProperty("-ms-user-select", "text", "important");

            } catch {}

        });

    },

    enable() {

        this.enabled = true;

        Storage.set("unlockCopy", true);

        this.apply();

        Notify.success("Copiar liberado.");

    },

    disable() {

        this.enabled = false;

        Storage.set("unlockCopy", false);

        Notify.info("Copiar desativado.");

    },

    toggle() {

        this.enabled
            ? this.disable()
            : this.enable();

    }

};