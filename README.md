# Zebes Trivia

A scrolling Super Metroid trivia screen for stream breaks. Chat gets 30 seconds to answer each question and eight seconds to read the explanation. The overlay deals all 410 questions before reshuffling and remembers the rotation between breaks.

**[Get your OBS link](https://intelligent-decisions-interactive.github.io/zebes-trivia/setup.html)** · [Preview the trivia without scoring](https://intelligent-decisions-interactive.github.io/zebes-trivia/stream.html)

## Stream with Twitch chat

1. Open the link generator, enter your Twitch channel and copy the resulting URL.
2. In your BRB scene, add an OBS **Browser** source. Paste the URL and set its size to **1920 × 1080**.
3. When the scene is on air, viewers type **A**, **B**, **C** or **D** in Twitch chat. The first letter each viewer submits during the question counts. Each correct answer earns one point. The top five appear beside the question and scores update on reveal. Equal scores share a rank.

The direct URL takes the form `https://intelligent-decisions-interactive.github.io/zebes-trivia/stream.html?channel=YOUR_TWITCH_LOGIN`. One Browser Source runs the scored game. Reuse that source if you want it in another scene. The overlay joins public Twitch chat through a read-only WebSocket and retries dropped connections. The status beside the leaderboard shows whether it is connected.

## Broadcast themes

Choose **Zebes Terminal** for the original green overlay, or pick a runner-inspired preset in [stream setup](https://intelligent-decisions-interactive.github.io/zebes-trivia/setup.html). The presets draw on public broadcasts:

| Preset | Broadcast reference | Appearance |
| --- | --- | --- |
| Violet Signal | [ShinyZeni](https://www.youtube.com/watch?v=uvDNz8Uonhk) | Near-black panels, hot-magenta outer rails, and rounded violet, cobalt and cyan inner frames |
| Split Clock | [Oatsngoats](https://www.youtube.com/watch?v=OjghbQnhzDE) | Squared charcoal panels, subtle dividers and teal split accents |
| Plum Orbit | [zoasty](https://www.youtube.com/watch?v=qUVh6kkXl0w) | Plum and lavender bands with lime timing and first-place highlights |

> Zebes Trivia is an independent fan project. We credit streamers for their runs and for the broadcasts that inspired our themes. Those credits imply no affiliation, sponsorship, or endorsement.

Select **Customize this preset** to change six colors, frame style, banner image and header tint strength. The preview updates as you edit. Every preset starts with the full-width Samus banner at 60% tint. Custom images use public HTTPS URLs; the built-in art loads behind them.

**Get OBS link** includes your theme, channel and optional font in the Browser Source URL. Use **Bookmark or share this setup** to reopen the editor with the same choices on another device. **Share theme without a channel** opens the same design with the channel field empty for another streamer. To change the look of an existing stream, replace its Browser Source URL with the new one. The same channel and browser profile keep their scores and question rotation.

To preview a preset without chat, open `stream.html?theme=signal`, `stream.html?theme=splits` or `stream.html?theme=orbit`. Existing links use Zebes Terminal.

## Broadcast typefaces

Each theme includes an original regular and bold webfont, bundled for both hosted and offline overlays.

| Theme | Typeface | Lettering |
| --- | --- | --- |
| Zebes Terminal | Zebes Relay | Angular terminal lettering |
| Violet Signal | Neon Trace | Forward-slanted neon lettering |
| Split Clock | Split Counter | Compact, upright timing figures |
| Plum Orbit | Orbit Arc | Rounded letters with open counters |

Theme selection sets the typeface automatically, including for existing OBS URLs. Custom palettes follow their frame style. In **Customize font**, choose a different bundled face to pair it with any palette. The editor carries that choice in OBS and share links, for example `stream.html?theme=signal&face=orbit`.

A direct HTTPS channel font URL takes priority over the bundled face. The font host must allow cross-origin requests. If loading fails on the overlay, the selected bundled face appears.

The font sources are in `tools/build_font.py`, `tools/neon_trace.py`, `tools/split_counter.py` and `tools/orbit_arc.py`. To regenerate all eight WOFF2 files, install `fonttools`, `shapely` and `brotli`, then run `python tools/build_font.py`.

## Answer history

In OBS, right-click the Browser Source, choose **Interact**, press **V** and choose **Open scorebook**. Search for a viewer to see their standing and latest 50 guesses, or export every recorded answer as CSV. Press **V** again after closing the scorebook to return to the broadcast layout.

The scorebook stores only accepted letter answers, the viewer’s Twitch identity, the question, its correct answer and the time. Scores are per channel, origin and OBS browser profile. Clearing browser data removes local scores. A viewer opening the URL on another device starts a separate local game. Viewers participate in the streamer’s game by watching the broadcast and answering in its Twitch chat.

## Contribute a question

Append a card to `questions.js` and open a pull request. Include four distinct choices, the zero-based correct answer index, a short explanation and a source link. Prefer runner notes, recordings or original research for race history. Keep existing array positions stable because the saved rotation and answer histories use them as IDs.

## Run your own copy

Serve the project folder with any static web server, for example `python -m http.server 8000`, and open `http://localhost:8000/setup.html`. A fork can enable GitHub Pages from **main / (root)**. The generator uses the current host so forked sites produce their own URLs. The offline ZIP includes the trivia and local assets. Twitch scoring requires an internet connection.

Run `python tools/package_overlay.py` to rebuild the offline ZIP after changing the site.

## License

The original code, trivia text and four broadcast typefaces use the [MIT License](LICENSE). Third-party fonts have their own SIL Open Font Licenses in `assets/`. Super Metroid and its characters belong to Nintendo.
