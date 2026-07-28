const Storage = {

    KEY: "unlock-toolkit",

    settings: {

        unlockCopy: true,

        darkMode: false,

        panelX: null,

        panelY: null

    },

    load() {

        const saved = localStorage.getItem(this.KEY);

        if (!saved) return;

        try {

            this.settings = {
                ...this.settings,
                ...JSON.parse(saved)
            };

        } catch (e) {

            console.error(e);

        }

    },

    save() {

        localStorage.setItem(
            this.KEY,
            JSON.stringify(this.settings)
        );

    },

    get(key) {

        return this.settings[key];

    },

    set(key, value) {

        this.settings[key] = value;

        this.save();

    },

    getAll() {

        return this.settings;

    },

    setMany(data) {

        this.settings = {
            ...this.settings,
            ...data
        };

        this.save();

    }

};