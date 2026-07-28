const Observer = {

    observer: null,

    start() {

        this.observer = new MutationObserver(() => {

            if (Storage.get("unlockCopy")) {

                UnlockCopy.apply();

            }

            if (Storage.get("darkMode")) {

                DarkMode.apply();

            }

        });

        this.observer.observe(document.documentElement, {

            childList: true,

            subtree: true

        });

    }

};