# Zebes Trivia

A scrolling Super Metroid trivia screen for stream breaks. Chat gets 30 seconds to answer each question and eight seconds to read the explanation. The overlay deals all 410 questions before reshuffling and remembers the rotation between breaks.

**[Get your OBS link](https://intelligent-decisions-interactive.github.io/zebes-trivia/setup.html)** · [Preview the trivia without scoring](https://intelligent-decisions-interactive.github.io/zebes-trivia/stream.html)

## Stream with Twitch chat

1. Open the link generator, enter your Twitch channel and copy the resulting URL.
2. In your BRB scene, add an OBS **Browser** source. Paste the URL and set its size to **1920 × 1080**.
3. When the scene is on air, viewers type **A**, **B**, **C** or **D** in Twitch chat. The first letter each viewer submits during the question counts. Each correct answer earns one point. The top five appear beside the question and scores update on reveal. Equal scores share a rank.

The direct URL takes the form `https://intelligent-decisions-interactive.github.io/zebes-trivia/stream.html?channel=YOUR_TWITCH_LOGIN`. One Browser Source runs the scored game. Reuse that source if you want it in another scene. The overlay joins public Twitch chat through a read-only WebSocket and retries dropped connections. The status beside the leaderboard shows whether it is connected.

## Broadcast font

Zebes Relay is the overlay’s original typeface. Its regular and bold webfonts ship with the site and offline download. Existing OBS links use it automatically.

To use a channel font, open **Customize font** in the link generator, enter a direct HTTPS font file URL and generate the OBS link. The font host must allow cross-origin requests. The overlay uses Zebes Relay if the custom font is unavailable.

The editable letterforms are in `tools/build_font.py`. To regenerate the two WOFF2 files, install `fonttools`, `shapely` and `brotli`, then run `python tools/build_font.py`.

## Answer history

In OBS, right-click the Browser Source, choose **Interact**, press **V** and choose **Open scorebook**. Search for a viewer to see their standing and latest 50 guesses, or export every recorded answer as CSV. Press **V** again after closing the scorebook to return to the broadcast layout.

The scorebook stores only accepted letter answers, the viewer’s Twitch identity, the question, its correct answer and the time. Scores are per channel, origin and OBS browser profile. Clearing browser data removes local scores. A viewer opening the URL on another device starts a separate local game. Viewers participate in the streamer’s game by watching the broadcast and answering in its Twitch chat.

## Contribute a question

Append a card to `questions.js` and open a pull request. Include four distinct choices, the zero-based correct answer index, a short explanation and a source link. Prefer runner notes, recordings or original research for race history. Keep existing array positions stable because the saved rotation and answer histories use them as IDs.

## Run your own copy

Serve the project folder with any static web server, for example `python -m http.server 8000`, and open `http://localhost:8000/setup.html`. A fork can enable GitHub Pages from **main / (root)**. The generator uses the current host so forked sites produce their own URLs. The offline ZIP includes the trivia and local assets. Twitch scoring requires an internet connection.

Run `python tools/package_overlay.py` to rebuild the offline ZIP after changing the site.

## License

The original code, trivia text and Zebes Relay typeface use the [MIT License](LICENSE). Third-party fonts have their own SIL Open Font Licenses in `assets/`. Super Metroid and its characters belong to Nintendo. This is an independent fan project.
