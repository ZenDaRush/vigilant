function getExternalApps(processes) {
    const systemKeywords = [
        "systemd",
        "dbus",
        "pipewire",
        "wireplumber",
        "sd-pam",
        "gnome-keyring",
        "daemon",
        "pulse",
        "rtkit",
        "gvfs",
        "at-spi",
        "dconf",
        "polkit",
        "svchost",
        "runtimebroker",
        "explorer.exe",
        "lsass",
        "services.exe",
        "wininit",
        "smss",
        "csrss",
        "conhost",
        "dllhost",
        "taskhostw",
        "shellexperiencehost",
        "searchindexer",
        "spoolsv",
        "nifm",
    ];

    return processes.filter((proc) => {
        const cmd = proc.cmd.toLowerCase();
        const name = proc.name ? proc.name.toLowerCase() : "";

        const isElectronChild =
            cmd.includes("--type=") || cmd.includes("electron");
        const isHighMemory = proc.memory > 50;

        const isUserFacing = proc.isUserApp || proc.isGuiApp;

        const isNoise = systemKeywords.some(
            (kw) => cmd.includes(kw) || name.includes(kw)
        );

        const isSystemPath =
            cmd.includes("/usr/lib/") ||
            cmd.includes("c:\\windows\\system32") ||
            cmd.includes("c:\\windows\\syswow64");

        if (isNoise && !isHighMemory) return false;
        if (isSystemPath && !isHighMemory) return false;

        return (isUserFacing || isHighMemory) && !isNoise;
    });
}

export { getExternalApps };
