/*
 * Copaste Tool
 * Build automático
 * Não edite este arquivo manualmente.
 */



// =============================
// utils/dom.js
// =============================

const DOM = {

    create(tag, props = {}) {

        const el = document.createElement(tag);

        Object.assign(el, props);

        return el;

    },

    remove(id) {

        document.getElementById(id)?.remove();

    },

    exists(id) {

        return !!document.getElementById(id);

    },

    append(parent, child) {

        parent.appendChild(child);

    },

    qs(selector, root = document) {

        return root.querySelector(selector);

    },

    qsa(selector, root = document) {

        return [...root.querySelectorAll(selector)];

    }

};


// =============================
// utils/css.js
// =============================

const CSS = {

    inject(id, css) {

        if (document.getElementById(id))
            return;

        const style = document.createElement("style");

        style.id = id;

        style.textContent = css;

        document.head.appendChild(style);

    },

    remove(id) {

        document.getElementById(id)?.remove();

    },

    exists(id) {

        return !!document.getElementById(id);

    }

};


// =============================
// core/storage.js
// =============================

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


// =============================
// core/observer.js
// =============================

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


// =============================
// ui/style.js
// =============================

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


// =============================
// ui/notify.js
// =============================

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


// =============================
// ui/button.js
// =============================

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


// =============================
// ui/panel.js
// =============================

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


// =============================
// features/unlockCopy.js
// =============================

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


// =============================
// features/darkMode.js
// =============================

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


// =============================
// core/app.js
// =============================

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


// =============================
// caioopj.js
// =============================

(function () {
    'use strict';

    console.log('[UnlockCopy] Carregado');

    function unlockElement(el) {
        if (!(el instanceof HTMLElement)) return;

        // Remove handlers inline
        [
            'oncopy',
            'oncut',
            'onpaste',
            'oncontextmenu',
            'onselectstart',
            'ondragstart'
        ].forEach(attr => {
            try {
                el[attr] = null;
                el.removeAttribute(attr);
            } catch {}
        });

        // Remove bloqueios CSS
        try {
            el.style.setProperty('user-select', 'text', 'important');
            el.style.setProperty('-webkit-user-select', 'text', 'important');
            el.style.setProperty('-moz-user-select', 'text', 'important');
            el.style.setProperty('-ms-user-select', 'text', 'important');
            el.style.setProperty('-webkit-touch-callout', 'default', 'important');
        } catch {}
    }

    function unlockAll() {
        unlockElement(document.documentElement);
        unlockElement(document.body);

        document.querySelectorAll('*').forEach(unlockElement);
    }

    // Apenas remove preventDefault() para eventos relacionados à cópia.
    ['copy', 'cut', 'paste', 'contextmenu', 'selectstart'].forEach(type => {
        document.addEventListener(type, event => {
            event.stopImmediatePropagation();
        }, true);
    });

    // Reaplica quando novos elementos aparecem.
    const observer = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType !== 1) return;

                unlockElement(node);

                if (node.querySelectorAll) {
                    node.querySelectorAll('*').forEach(unlockElement);
                }
            });
        }
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    unlockAll();

    // Alguns sites recriam o DOM; reaplica ocasionalmente.
    setInterval(unlockAll, 3000);

    console.log('[UnlockCopy] Proteções removidas.');
})();
