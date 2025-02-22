let themeManager = null;
let settingsManager = null;

MicroModal.init();

$(document).on("ready", () => {

    /**
     * Banned Pages
     */
    {
        // Porn-redirect screen
        // noinspection HttpUrlsUsage
        if (window.location.href.includes("banredir.html") || window.location.href === "http://omegle.com/static/ban.html") {
            window.location.href = "https://omegle.com/static/ban.html";
        }

        // Static HTML ban screen
        if (window.location.href.includes("ban.html")) {
            $("html")
                .load(chrome.runtime.getURL("/html/banned.html"))
                .css("background-color", "#17191a");
        }
    }

    /**
     * Not the main page
     */
    {
        if (window.location.pathname !== "/") {
            $("html")
                .css("visibility", "visible");
            return;
        }
    }

    /**
     * General Start-Up
     */
    {

        ConfigManager.initialize();
        settingsManager = new SettingsManager();
        TopicSyncManager.initialize();
        ChatRegistry.initialize();
        PasteMenu.initialize();
        ChatManager.initialize();
        FilterManager.initialize();
        ConfirmManager.initialize();
        GreetingManager.initialize();
        ReconnectManager.initialize();
        AutoSkipManager.initialize();
        VideoFilterManager.initialize();
        IPGrabberManager.initialize();
        UnmoderatedChatManager.initialize();
        VideoBlockerManager.initialize();
        VideoScreenshotManager.initialize();
        MuteMicrophoneManager.initialize();
        IPBlockingManager.initialize();

    }

    /**
     * Load Theme Data
     */
    {

        let themeQuery = {}
        themeQuery[config.semiLightModeOption.getName()] = config.semiLightModeOption.getDefault();

        chrome.storage.sync.get(themeQuery, (result) => {
            themeManager = new ThemeManager(config[result[config.semiLightModeOption.getName()]].getValue());
            themeManager.loadCurrentTheme();
            document.getElementsByTagName("html")[0].style.visibility = "visible";
        });
    }

});

