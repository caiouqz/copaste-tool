UIStyle.inject();

FloatingButton.create();

Panel.create();

window.UnlockToolkit = {

    version: "1.0.0",

    started: false,

    start() {

        if (this.started) return;

        this.started = true;

        console.log(
            "%cUnlock Toolkit v" + this.version,
            "color:#4CAF50;font-weight:bold;"
        );

        Storage.load();

        UnlockCopy.enabled = Storage.get("unlockCopy");

        DarkMode.enabled = Storage.get("darkMode");

        UnlockCopy.apply();

        DarkMode.apply();

        Observer.start();

        FloatingButton.create();

        Panel.create();

        Notify.success("Unlock Toolkit iniciado.");

    }

};