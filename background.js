chrome.webNavigation.onBeforeNavigate.addListener((details) => {
    const url = new URL(details.url);

    if (!url.hostname.includes("roblox.com")) return;
    if (url.protocol === "roblox:") return;

    let placeId = null;
    let linkCode = null;
    let gameInstanceId = null;

    // game page
    const match = url.pathname.match(/\/games\/(\d+)/);
    if (match) placeId = match[1];

    // alternate format
    if (url.searchParams.get("placeId")) {
        placeId = url.searchParams.get("placeId");
    }

    linkCode = url.searchParams.get("privateServerLinkCode");
    gameInstanceId = url.searchParams.get("gameInstanceId");

    if (!placeId) return;

    let robloxUrl = `roblox://placeId=${placeId}`;

    if (linkCode) {
        robloxUrl += `&linkCode=${linkCode}`;
    } else if (gameInstanceId) {
        robloxUrl += `&gameInstanceId=${gameInstanceId}`;
    }

    chrome.tabs.update(details.tabId, { url: robloxUrl });
});