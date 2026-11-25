// Array indices are saved question IDs. Append cards to preserve existing rotation history.
const deck = [
  {
    category: "Boss mechanics", level: "Medium", title: "The last shot",
    question: "Phantoon opens his eye. Why might a runner hold their Super Missile until it can finish the fight?",
    choices: ["An early Super makes the eye shrink", "A Super makes the next volley heal him", "A surviving Phantoon starts a long rage attack", "Supers only deal damage on the last cycle"], answer: 2,
    explanation: "A Super hits hard, but a surviving Phantoon retaliates with a long flame attack. A lethal shot avoids the wait.",
    source: "https://wiki.supermetroid.run/Phantoon"
  },
  {
    category: "Speedrun tech", level: "Medium", title: "Under the shutters",
    question: "A runner reaches early Super Missiles before fighting Spore Spawn. What does a mockball carry under the shutters?",
    choices: ["A stored shinespark", "Running speed in Morph Ball", "Invincibility from a hit", "The height of a spin jump"], answer: 1,
    explanation: "Morphing on landing preserves horizontal speed. Samus rolls under the gates before they close, even without Speed Booster.",
    source: "https://wiki.supermetroid.run/Mockball"
  },
  {
    category: "Runners & races", level: "Hard", title: "A late-run gamble",
    question: "In his 2013 100% notes, why did zoast avoid a potentially faster ceiling clip for Spring Ball?",
    choices: ["It required an extra Energy Tank", "One miss cost more than a success saved", "It left him without Grapple for Draygon", "A successful clip lowered item completion"], answer: 1,
    explanation: "The clip came after Phantoon and Draygon. A miss could waste both the small time gain and a run with good boss patterns.",
    source: "https://speeddemosarchive.com/SuperMetroid.html"
  },
  {
    category: "World & lore", level: "Easy", title: "A distress call",
    question: "Where does Samus first encounter Ridley in Super Metroid?",
    choices: ["Tourian", "Ceres Station", "Crateria", "Wrecked Ship"], answer: 1,
    explanation: "Ridley has the hatchling at Ceres. Their later encounter takes place deep in Lower Norfair on Zebes.",
    source: "https://www.nintendo.co.jp/clvs/manuals/common/pdf/CLV-P-SAAHE.pdf"
  },
  {
    category: "Routes & rules", level: "Medium", title: "Mapo",
    question: "A runner finishes with every item but leaves a normal corridor unexplored. Which category goal have they missed?",
    choices: ["Any%", "100% Items", "100% Map Completion", "Reverse Boss Order"], answer: 2,
    explanation: "Map Completion tracks explored map squares. A corridor with no pickup can still be a required detour.",
    source: "https://wiki.supermetroid.run/100%25_Map_Completion"
  },
  {
    category: "Items & abilities", level: "Easy", title: "Frozen footholds",
    question: "Which beam can turn an enemy into a temporary platform?",
    choices: ["Wave Beam", "Ice Beam", "Plasma Beam", "Charge Beam"], answer: 1,
    explanation: "An enemy frozen by Ice can support Samus. That turns a moving hazard into a foothold until it thaws.",
    source: "https://www.nintendo.co.jp/clvs/manuals/common/pdf/CLV-P-SAAHE.pdf"
  },
  {
    category: "Routes & rules", level: "Hard", title: "One trip through Norfair",
    question: "In Any%, why route Phantoon and Ridley before Kraid and Draygon?",
    choices: ["It skips the return trip to Norfair", "It puts Plasma Beam before Ridley", "It opens Tourian after three bosses", "It puts Speed Booster before Phantoon"], answer: 0,
    explanation: "PRKD clears Norfair in one visit. The tradeoff is fighting through Lower Norfair before picking up Space Jump or Plasma Beam.",
    source: "https://wiki.supermetroid.run/Any%25_PRKD"
  },
  {
    category: "World & lore", level: "Easy", title: "Beneath the waves",
    question: "Which region of Zebes is a maze of underwater passages?",
    choices: ["Norfair", "Maridia", "Crateria", "Tourian"], answer: 1,
    explanation: "Maridia is the flooded region. The Gravity Suit makes moving through its submerged passages much easier.",
    source: "https://www.nintendo.co.jp/clvs/manuals/common/pdf/CLV-P-SAAHE.pdf"
  },
  {
    category: "Runners & races", level: "Medium", title: "The fourth screen",
    question: "At AGDQ 2014, Krauser, Garrison and Ivan shared the Super Metroid race screen with which fourth runner?",
    choices: ["zoast", "Oatsngoats", "ShinyZeni", "Behemoth87"], answer: 0,
    explanation: "The January 2014 race put zoast, Krauser, Garrison and Ivan on screen together.",
    source: "https://tracker.gamesdonequick.com/tracker/run/499"
  },
  {
    category: "Boss mechanics", level: "Hard", title: "Keeping Crocomire moving",
    question: "Crocomire starts backing up after a hit, then stops as Samus falls behind. How can the runner get the remaining steps?",
    choices: ["Roll against the rear wall", "Wait for the next volley", "Move forward to keep him on screen", "Change to a weaker beam"], answer: 2,
    explanation: "Crocomire pauses his remaining backward steps when he scrolls too far out of view. Catching up lets him finish the knockback.",
    source: "https://wiki.supermetroid.run/Crocomire"
  },
  {
    category: "Items & abilities", level: "Easy", title: "Heat protection",
    question: "Which suit upgrade lets Samus withstand Norfair’s superheated rooms before finding the Gravity Suit?",
    choices: ["Power Suit", "Varia Suit", "Fusion Suit", "Zero Suit"], answer: 1,
    explanation: "Varia protects Samus in superheated rooms. The suit is the reward beyond Kraid’s chamber.",
    source: "https://www.nintendo.co.jp/clvs/manuals/common/pdf/CLV-P-SAAHE.pdf"
  },
  {
    category: "Routes & rules", level: "Medium", title: "At the gunship",
    question: "At the end of a standard Any% run, which frame marks the real-time finish?",
    choices: ["Zebes first flashes white", "The escape timer disappears", "Samus first faces forward on her ship", "The ship first leaves the screen"], answer: 2,
    explanation: "The timing cue is Samus turning to face the viewer on the gunship. The departure and explosion play afterward.",
    source: "https://wiki.supermetroid.run/Timing"
  },
  {
    category: "Creatures", level: "Medium", title: "Watch the ceiling",
    question: "Which creature hangs from ceilings and dives when Samus approaches?",
    choices: ["Skree", "Geemer", "Ripper", "Waver"], answer: 0,
    explanation: "Skree waits overhead, then drops on approaching prey. Geemers cling to surfaces and crawl along them.",
    source: "https://www.nintendo.co.jp/clvs/manuals/common/pdf/CLV-P-SAAHE.pdf"
  },
  {
    category: "Creatures", level: "Hard", title: "Waiting for Shaktool",
    question: "In the tunnel to Spring Ball, why would a runner time a Grapple hit on Shaktool’s moving arm?",
    choices: ["To start the return trip sooner", "To make the digging wheel land farther ahead", "To remove the next wall of sand outright", "To reverse the wheel’s rotation"], answer: 1,
    explanation: "The hit briefly stuns Shaktool, but the arm can carry the wheel farther forward on that digging stroke.",
    source: "https://wiki.supermetroid.run/Shaktool"
  },
  {
    category: "Runners & races", level: "Hard", title: "Timing a route on paper",
    question: "In his 2013 100% notes, whom did zoast credit with comparing routes using a spreadsheet of tool-assisted segments?",
    choices: ["DbX", "Dessyreqt", "Kottpower", "Garrison"], answer: 1,
    explanation: "Dessyreqt timed individual route segments. The spreadsheet let runners compare complete paths without having to play every variation end to end.",
    source: "https://speeddemosarchive.com/SuperMetroid.html"
  },
  {
    category: "Routes & rules", level: "Hard", title: "Fourteen pickups",
    question: "The 14% Ice route spends three precious pickups on Energy Tanks. Which attack are they budgeted to survive?",
    choices: ["Ridley’s tail", "Mother Brain’s rainbow beam", "Draygon’s grab", "Phantoon’s flame ring"], answer: 1,
    explanation: "The route pairs three Energy Tanks with Varia Suit to survive Mother Brain’s scripted beam before the hatchling intervenes.",
    source: "https://wiki.supermetroid.run/Low%25_Ice"
  },
  {
    category: "Game systems", level: "Medium", title: "Locked hatches",
    question: "A runner has four regular Missiles and no Supers at a fresh red door. How many regular Missiles are needed in total?",
    choices: ["Five", "Three", "One", "Ten"], answer: 0,
    explanation: "A fresh red door takes five regular Missiles. A single Super Missile can open the same door.",
    source: "https://www.nintendo.co.jp/clvs/manuals/common/pdf/CLV-P-SAAHE.pdf"
  },
  {
    category: "Creatures", level: "Easy", title: "The stolen hatchling",
    question: "Who carries off the last Metroid at the start of the game?",
    choices: ["Ridley", "Kraid", "Draygon", "Phantoon"], answer: 0,
    explanation: "Samus leaves the larva with scientists. Ridley’s raid sends her back to Zebes in pursuit.",
    source: "https://www.nintendo.co.jp/clvs/manuals/common/pdf/CLV-P-SAAHE.pdf"
  },
  {
    category: "Runners & races", level: "Hard", title: "Bosses in reverse",
    question: "Who ran Super Metroid in Reverse Boss Order as the last game of AGDQ 2019?",
    choices: ["Garrison", "Straevaras", "ShinyZeni", "Ivan"], answer: 2,
    explanation: "ShinyZeni’s RBO run closed the game lineup. GDQ’s tracker lists a finish of 1:06:02.",
    source: "https://tracker.gamesdonequick.com/tracker/run/3431"
  },
  {
    category: "Routes & rules", level: "Medium", title: "The first statue",
    question: "Ridley falls first in Reverse Boss Order. Which two statue bosses must fall next?",
    choices: ["Phantoon, then Kraid", "Kraid, then Draygon", "Phantoon, then Draygon", "Draygon, then Phantoon"], answer: 3,
    explanation: "RBO reverses the usual Kraid–Phantoon–Draygon–Ridley sequence. Ridley and Draygon both come before the Wrecked Ship regains power.",
    source: "https://wiki.supermetroid.run/Reverse_Boss_Order"
  },
  {
    category: "World & lore", level: "Medium", title: "Pirate headquarters",
    question: "Which region houses Mother Brain’s control center?",
    choices: ["Tourian", "Brinstar", "Wrecked Ship", "Maridia"], answer: 0,
    explanation: "The Space Pirates rebuilt Tourian after Samus destroyed the original base. Mother Brain controls the new complex.",
    source: "https://www.nintendo.co.jp/clvs/manuals/common/pdf/CLV-P-SAAHE.pdf"
  },
  {
    category: "Boss mechanics", level: "Medium", title: "Through the broken glass",
    question: "Mother Brain’s tank has a hole in it. Why aim missiles through the hole while some glass is still intact?",
    choices: ["It disables the nearest turret", "A brain hit also damages the tank", "The next Super splits into two shots", "It freezes the Rinka spawn timer"], answer: 1,
    explanation: "A shot through the opening counts against both Mother Brain and the glass. A hit on intact glass advances only the tank damage.",
    source: "https://wiki.supermetroid.run/Mother_Brain"
  },
  {
    category: "Speedrun tech", level: "Hard", title: "A shorter runway",
    question: "How can a short charge turn Samus blue in a corridor too short for a normal run-up?",
    choices: ["Timed dash taps advance the boost counter", "Crouching adds a stage to the charge", "Holding aim down shortens the charge timer", "A spin jump stores an extra boost stage"], answer: 0,
    explanation: "Dash only has to be held on particular running frames. Timed taps advance the counter while Samus covers less ground.",
    source: "https://wiki.supermetroid.run/Short_Charge"
  },
  {
    category: "Items & abilities", level: "Medium", title: "A second spring",
    question: "Samus jumps from a flat floor while staying in Morph Ball. No bomb went off. Which upgrade explains the jump?",
    choices: ["Hi-Jump Boots", "Spring Ball", "Space Jump", "Grappling Beam"], answer: 1,
    explanation: "Spring Ball adds a jump while Samus stays rolled up. A bomb jump uses the delayed blast to lift her instead.",
    source: "https://www.nintendo.co.jp/clvs/manuals/common/pdf/CLV-P-SAAHE.pdf"
  },
  {
    category: "Routes & rules", level: "Hard", title: "After Ridley",
    question: "On a PRKD run, why is Mini-Kraid a welcome sight just after Lower Norfair?",
    choices: ["It refills the Reserve Tank first", "It guarantees two Power Bombs", "It can replenish Super Missiles", "It resets the area's enemy drops"], answer: 2,
    explanation: "Ridley can leave the runner low on Supers. Visiting Kraid’s lair afterward puts a good Super Missile refill on the route.",
    source: "https://wiki.supermetroid.run/Any%25_PRKD"
  },
  {
    category: "Runners & races", level: "Hard", title: "Playing the long game",
    question: "Why did Christopher Hill take three rounds on Draygon in his 2011 PAL 100% run when two were possible?",
    choices: ["To leave with a full Reserve Tank", "To clear a faster path to Spring Ball", "To preserve Super Missiles for Ridley", "To get a better pattern from Botwoon"], answer: 2,
    explanation: "Hill’s three-round fight spent zero Supers. The two-round kill gained about a second locally, but those Supers saved more time against Ridley.",
    source: "https://speeddemosarchive.com/SuperMetroid.html"
  },
  {
    category: "Boss mechanics", level: "Hard", title: "Supplies mid-fight",
    question: "A runner needs ammo during Draygon. Why shoot individual mucus particles instead of clearing the spray with a Power Bomb?",
    choices: ["The particles can drop supplies", "Draygon drops Supers on retreat", "Each beam hit refunds a Missile", "The shot reactivates a wall turret"], answer: 0,
    explanation: "Shooting the particles can produce pickups. A Power Bomb clears the spray without leaving those drops.",
    source: "https://wiki.supermetroid.run/Draygon"
  },
  {
    category: "World & lore", level: "Easy", title: "First landing",
    question: "Where on Zebes does Samus land her gunship?",
    choices: ["Tourian", "Crateria", "Norfair", "Maridia"], answer: 1,
    explanation: "The gunship rests on Zebes’s surface in Crateria. The path into Brinstar takes Samus underground.",
    source: "https://www.nintendo.co.jp/clvs/manuals/common/pdf/CLV-P-SAAHE.pdf"
  },
  {
    category: "Routes & rules", level: "Hard", title: "The last bingo square",
    question: "A bingo race ends with “enter this room.” Under the community timing guide, when should the runner stop?",
    choices: ["When the door cap opens", "When the old room starts scrolling", "When the minimap first changes", "When control returns in the target room"], answer: 3,
    explanation: "A room-entry goal includes the transition. For a final item-pickup goal, the guide uses contact with the item instead.",
    source: "https://wiki.supermetroid.run/Timing"
  },
  {
    category: "Game systems", level: "Medium", title: "Missile reserves",
    question: "A Missile Tank and a missile refill both supply ammo. How much permanent capacity does the tank add?",
    choices: ["Two", "Ten", "One", "Five"], answer: 3,
    explanation: "A regular Missile Tank adds five to carrying capacity. A missile station refills that capacity.",
    source: "https://www.nintendo.co.jp/clvs/manuals/common/pdf/CLV-P-SAAHE.pdf"
  },
  {
    category: "Game systems", level: "Medium", title: "Behind the visor",
    question: "How many save files fit on one Super Metroid cartridge?",
    choices: ["One", "Two", "Four", "Three"], answer: 3,
    explanation: "The Samus Data screen has slots A, B and C. The copy and clear options act on those three files.",
    source: "https://www.nintendo.co.jp/clvs/manuals/common/pdf/CLV-P-SAAHE.pdf"
  },
  {
    category: "World & lore", level: "Medium", title: "A darkened ship",
    question: "Samus reaches the Gravity Suit room before defeating Phantoon. What is at the suit’s pickup spot?",
    choices: ["Nothing yet", "A sealed suit capsule", "A Chozo holding a Reserve Tank", "A suit that needs a Power Bomb"], answer: 0,
    explanation: "Reaching the room is only half the problem. The Gravity Suit pickup appears when Phantoon’s defeat restores the ship’s power.",
    source: "https://wiki.supermetroid.run/Gravity_Suit"
  },
  {
    category: "Speedrun tech", level: "Medium", title: "Crossing the moat",
    question: "A Phantoon-first runner reaches the moat without Grapple or Speed Booster. Which pair of techniques offers two crossings?",
    choices: ["Short charge or shinespark", "Continuous wall jump or horizontal bomb jump", "Space Jump or grapple swing", "Speedball or gravity jump"], answer: 1,
    explanation: "A continuous wall jump uses the wall at the moat. A horizontal bomb jump can carry Morph Ball across the same gap.",
    source: "https://wiki.supermetroid.run/The_Moat"
  },
  {
    category: "Items & abilities", level: "Easy", title: "A tighter squeeze",
    question: "Which upgrade lets Samus roll through narrow tunnels?",
    choices: ["Spring Ball", "Screw Attack", "Morph Ball", "Space Jump"], answer: 2,
    explanation: "Morph Ball changes Samus’s shape to fit low passages. Bombs and Spring Ball add moves once she is rolled up.",
    source: "https://www.nintendo.co.jp/clvs/manuals/common/pdf/CLV-P-SAAHE.pdf"
  },
  {
    category: "Runners & races", level: "Medium", title: "Two worlds, one race",
    question: "At SGDQ 2019, Andy and Ivan played a co-op randomizer linking Zebes to which other game?",
    choices: ["Link’s Awakening", "A Link to the Past", "The Minish Cap", "Zelda II"], answer: 1,
    explanation: "The crossover paired Super Metroid with A Link to the Past. Andy and Ivan played the two-game randomizer together.",
    source: "https://tracker.gamesdonequick.com/tracker/run/3859"
  },
  {
    category: "Game systems", level: "Hard", title: "Controller memory",
    question: "On the default SNES controls, which button makes Samus dash?",
    choices: ["Y", "A", "B", "X"], answer: 2,
    explanation: "B is dash in the original SNES layout. X fires, A jumps and Y cancels the selected special item.",
    source: "https://www.nintendo.co.jp/clvs/manuals/common/pdf/CLV-P-SAAHE.pdf"
  },
  {
    category: "Items & abilities", level: "Hard", title: "Four purple shots",
    question: "Charge Beam is on and Power Bombs are selected. Which single additional beam gives Samus the four-shot X-Factor?",
    choices: ["Plasma", "Spazer", "Wave", "Ice"], answer: 2,
    explanation: "With Wave as the only extra beam, a full charge spends a Power Bomb to launch four projectiles. Each can hit separately.",
    source: "https://wiki.supermetroid.run/Charge_Beam_Combos"
  },
  {
    category: "Game systems", level: "Hard", title: "Beam loadout",
    question: "Samus wants to add Plasma to an Ice, Wave and Spazer loadout. Which beam has to come off?",
    choices: ["Wave", "Ice", "Charge", "Spazer"], answer: 3,
    explanation: "Spazer and Plasma occupy incompatible beam settings. Ice and Wave can each be combined with either.",
    source: "https://www.nintendo.co.jp/clvs/manuals/common/pdf/CLV-P-SAAHE.pdf"
  },
  {
    category: "Speedrun tech", level: "Medium", title: "The Red Tower climb",
    question: "Why does a runner learning KPDR sometimes collect Ice Beam before climbing Red Tower?",
    choices: ["Frozen Rippers become footholds", "Ice opens the green gate overhead", "Ice stops the tower’s rising lava", "Frozen doors hold a shinespark"], answer: 0,
    explanation: "Early Ice turns the flying Rippers into platforms. Delaying Ice makes the runner climb past them with a more demanding jump.",
    source: "https://wiki.supermetroid.run/Red_Tower"
  },
  {
    category: "Runners & races", level: "Medium", title: "Summer rematch",
    question: "Eddie and Oatsngoats both appeared in the AGDQ 2025 map race. Which category did they race at SGDQ that summer?",
    choices: ["Low% Speed", "100% Items", "Nintendo Power%", "Low% Ice"], answer: 3,
    explanation: "The summer event paired Eddie and Oatsngoats for Low% Ice, a different challenge from January’s four-way map race.",
    source: "https://tracker.gamesdonequick.com/tracker/run/7038"
  },
  {
    category: "Items & abilities", level: "Easy", title: "Suit upgrades",
    question: "Varia can keep Samus alive in Norfair. Which suit restores her normal movement in Maridia’s water?",
    choices: ["Power Suit", "Varia Suit", "Gravity Suit", "Varia with Hi-Jump Boots"], answer: 2,
    explanation: "Gravity restores Samus’s normal movement in water. Varia protects her from heat but leaves her sluggish underwater.",
    source: "https://www.nintendo.co.jp/clvs/manuals/common/pdf/CLV-P-SAAHE.pdf"
  },
  {
    category: "Routes & rules", level: "Hard", title: "By the book",
    question: "In Nintendo Power%, a runner gets the right items and bosses but takes Hi-Jump Boots after Kraid. Why does that break the route?",
    choices: ["Kraid must be the final statue boss", "The boots are banned from the category", "Every item must come before every boss", "The 1994 guide puts the boots before Kraid"], answer: 3,
    explanation: "The category follows the Player’s Guide pickup and boss sequence. Matching the final inventory alone leaves out that ordering requirement.",
    source: "https://wiki.supermetroid.run/Nintendo_Power%25"
  },
  {
    category: "Runners & races", level: "Hard", title: "The 2008 archive",
    question: "Hotarubi’s May 2008 single-segment run shows 0:44 on the in-game clock. What was its item percentage?",
    choices: ["100%", "49%", "25%", "14%"], answer: 3,
    explanation: "Speed Demos Archive lists the run in its 14% category. The 44 minutes are on the game clock.",
    source: "https://speeddemosarchive.com/SuperMetroid.html"
  },
  {
    category: "Routes & rules", level: "Hard", title: "Stopping the clock",
    question: "Spore Spawn is dead in Spore Spawn RTA. What still has to happen before time stops?",
    choices: ["The Super Missile pickup message must clear", "Samus must leave the boss room", "The last health drop must vanish", "Samus must fire her first Super"], answer: 0,
    explanation: "This short category times the reward as well as the fight. The finish is the first frame the Super Missile text box has fully disappeared.",
    source: "https://wiki.supermetroid.run/Spore_Spawn_RTA"
  },
  {
    category: "Items & abilities", level: "Hard", title: "Crystal Flash arithmetic",
    question: "Samus has 50 energy, empty reserves and enough of both missile types. With no drops, how many Power Bombs must she start with to Crystal Flash?",
    choices: ["10", "11", "12", "9"], answer: 1,
    explanation: "One Power Bomb starts the explosion. Ten more must remain when the flash activates, along with ten Missiles and ten Supers.",
    source: "https://wiki.supermetroid.run/Crystal_Flash"
  },
  {
    category: "Creatures", level: "Medium", title: "Underfoot",
    question: "Which spiked crawler clings to floors, walls, and ceilings in Crateria?",
    choices: ["Ripper", "Skree", "Geemer", "Waver"], answer: 2,
    explanation: "Geemers follow the contours of surfaces. Their spines make them easy to spot on the walls near the landing site.",
    source: "https://www.nintendo.co.jp/clvs/manuals/common/pdf/CLV-P-SAAHE.pdf"
  },
  {
    category: "Items & abilities", level: "Medium", title: "Across the gap",
    question: "Which upgrade lets Samus swing from special blocks?",
    choices: ["Grappling Beam", "Wave Beam", "Screw Attack", "Speed Booster"], answer: 0,
    explanation: "Grappling Beam attaches to special blocks overhead. Samus can swing across a gap and release on the far side.",
    source: "https://www.nintendo.co.jp/clvs/manuals/common/pdf/CLV-P-SAAHE.pdf"
  },
  {
    category: "Items & abilities", level: "Medium", title: "Beam spread",
    question: "A beam-only shot covers a wider vertical band with three parallel lines. Which upgrade is doing that?",
    choices: ["Plasma Beam", "Charge Beam", "Spazer", "Wave Beam"], answer: 2,
    explanation: "Spazer spreads one shot across three parallel beams, giving Samus more vertical coverage.",
    source: "https://www.nintendo.co.jp/clvs/manuals/common/pdf/CLV-P-SAAHE.pdf"
  },
  {
    category: "Speedrun tech", level: "Hard", title: "A costly arm pump",
    question: "Arm pumping gains pixels on flat ground. Why can the same input lose time on a steep downhill slope?",
    choices: ["It locks the aim angle at the bottom", "It cancels the equipped Speed Booster", "It can push Samus airborne and reset momentum", "It forces a standing shot at the next door"], answer: 2,
    explanation: "Changing cannon position nudges Samus forward. On some slopes that nudge takes her off the ground, costing speed when she lands.",
    source: "https://wiki.supermetroid.run/Arm_Pumping"
  },
  {
    category: "World & lore", level: "Medium", title: "An ancient gift",
    question: "The statues that cradle many of Samus’s upgrades represent which people?",
    choices: ["Luminoth", "Space Pirates", "Galactic Federation", "Chozo"], answer: 3,
    explanation: "The birdlike statues depict the Chozo. Shooting the orb in a statue’s hands can uncover an upgrade.",
    source: "https://www.nintendo.co.jp/clvs/manuals/common/pdf/CLV-P-SAAHE.pdf"
  },
  {
    category: "Boss mechanics", level: "Hard", title: "One last grab",
    question: "Ridley has taken lethal damage in Lower Norfair. Why would a runner deliberately move into his claws?",
    choices: ["To refill health before the escape", "To recover a spent Super Missile", "To preserve a Speed Booster charge", "To trigger his death animation"], answer: 3,
    explanation: "At zero health, Ridley tries to grab Samus. Letting him catch her starts the explosion and saves waiting for another pass.",
    source: "https://wiki.supermetroid.run/Ridley"
  },
  {
    category: "Runners & races", level: "Medium", title: "Four ways through Zebes",
    question: "At AGDQ 2025, imyt, Eddie, Oatsngoats and Andy raced which version of Super Metroid?",
    choices: ["Map Randomizer", "Vanilla 100%", "Reverse Boss Order", "Low% Ice"], answer: 0,
    explanation: "The four-player race used Map Randomizer. Finding a route through the shuffled world was part of the race.",
    source: "https://tracker.gamesdonequick.com/tracker/run/6704"
  },
  {
    category: "Routes & rules", level: "Medium", title: "Two clocks",
    question: "Two otherwise identical runs differ only in time spent on the pause menu. Which clock records the delay?",
    choices: ["Both clocks", "Real time only", "In-game time only", "Neither clock"], answer: 1,
    explanation: "The in-game timer stops in the equipment menu. The real-time clock keeps counting while the runner changes beams.",
    source: "https://wiki.supermetroid.run/Timing"
  },
  {
    category: "Game systems", level: "Medium", title: "Charting Zebes",
    question: "After a map download, how can you tell which map squares Samus has actually explored?",
    choices: ["They turn green", "They turn blue", "They turn pink", "They turn yellow"], answer: 2,
    explanation: "Pink marks squares Samus has explored. A map computer adds information about unvisited areas in blue.",
    source: "https://www.nintendo.co.jp/clvs/manuals/common/pdf/CLV-P-SAAHE.pdf"
  },
  {
    category: "Boss mechanics", level: "Hard", title: "A boss that comes back",
    question: "Botwoon bursts. Samus leaves while the pillar is still collapsing, then comes straight back. What has reset?",
    choices: ["Only the pillar", "Only the water level", "Only the tail segments", "Both Botwoon and the pillar"], answer: 3,
    explanation: "The game records Botwoon’s defeat when the pillar finishes crumbling. Leaving sooner can reset the encounter.",
    source: "https://wiki.supermetroid.run/Botwoon"
  },
  {
    category: "Items & abilities", level: "Medium", title: "Hidden passages",
    question: "Which item can scan nearby walls for breakable blocks?",
    choices: ["X-Ray Scope", "Grappling Beam", "Reserve Tank", "Speed Booster"], answer: 0,
    explanation: "The X-Ray Scope reveals hidden passages and destructible blocks in its beam, so the player can examine a suspicious wall.",
    source: "https://www.nintendo.co.jp/clvs/manuals/common/pdf/CLV-P-SAAHE.pdf"
  },
  {
    category: "Runners & races", level: "Hard", title: "Sniq’s tool-assisted route",
    question: "Sniq’s 37:39.10 Any% TAS used an ammo trick at Draygon. Which four-boss order did Sniq choose for it?",
    choices: ["Kraid, Phantoon, Draygon, Ridley", "Phantoon, Ridley, Kraid, Draygon", "Phantoon, Draygon, Ridley, Kraid", "Ridley, Draygon, Phantoon, Kraid"], answer: 2,
    explanation: "Sniq routed Draygon second to use the fight’s ammo underflow. That gave the tool-assisted run huge Missile and Super Missile reserves.",
    source: "https://tasvideos.org/5403S"
  },
  {
    category: "Speedrun tech", level: "Medium", title: "Rolling blue",
    question: "A runner calls a roll through bomb blocks a speedball. What distinguishes it from an ordinary mockball?",
    choices: ["Spring Ball is active", "A Power Bomb is ticking", "A shinespark ended on a slope", "Samus is blue from Speed Booster"], answer: 3,
    explanation: "A speedball carries the active blue boost into Morph Ball. That lets the roll break blocks that would usually take a bomb.",
    source: "https://wiki.supermetroid.run/Mockball"
  },
  {
    category: "World & lore", level: "Easy", title: "Into the jungle",
    question: "Which region is known for its thick jungle growth?",
    choices: ["Crateria", "Tourian", "Maridia", "Brinstar"], answer: 3,
    explanation: "Brinstar contains the jungle’s dense plant growth. The flooded caverns belong to Maridia.",
    source: "https://www.nintendo.co.jp/clvs/manuals/common/pdf/CLV-P-SAAHE.pdf"
  },
  {
    category: "World & lore", level: "Medium", title: "Emergency supplies",
    question: "Samus needs both a save and a full refill. Which of these stops can do both?",
    choices: ["A map computer", "A Chozo statue", "A missile station", "Her gunship"], answer: 3,
    explanation: "The gunship can save the file and refill Samus’s supplies. Map computers only add area data.",
    source: "https://www.nintendo.co.jp/clvs/manuals/common/pdf/CLV-P-SAAHE.pdf"
  },
  {
    category: "Boss mechanics", level: "Medium", title: "The egg volley",
    question: "Bomb Torizo hops backward. What can Samus keep below five to make him choose eggs over his laser?",
    choices: ["Her remaining energy", "Her beam hits so far", "Her distance in tiles", "Her current Missile count"], answer: 3,
    explanation: "The statue checks Samus's Missile supply when choosing its attack. Eggs give her a chance to earn ammo.",
    source: "https://wiki.supermetroid.run/Bomb_Torizo"
  },
  {
    category: "Boss mechanics", level: "Hard", title: "Saving a refill",
    question: "Why enter Bomb Torizo's chamber at full energy if Samus plans to shoot his eggs?",
    choices: ["Full energy stops his backward jump", "The eggs can supply Missiles instead of energy", "His first laser bounces off a full tank", "His chest opens on the first hit"], answer: 1,
    explanation: "Full health takes energy refills out of the egg drops, making it easier to keep firing Missiles.",
    source: "https://wiki.supermetroid.run/Bomb_Torizo"
  },
  {
    category: "Boss mechanics", level: "Hard", title: "The statue's last hundred",
    question: "Bomb Torizo has exactly 100 HP. What does a single regular Missile save compared with two weaker finishing hits?",
    choices: ["The delay before the gray door closes", "An extra volley after he dies", "The head-explosion pause", "A second fight on the way out"], answer: 2,
    explanation: "A Missile removes the last 100 HP at once. Leaving him alive below that mark triggers a separate head-break animation.",
    source: "https://wiki.supermetroid.run/Bomb_Torizo"
  },
  {
    category: "Boss mechanics", level: "Easy", title: "Eye contact",
    question: "Kraid has his jaws shut. Where should Samus shoot to make him expose his vulnerable mouth?",
    choices: ["His eye", "His belly spikes", "The tip of his claw", "The back of his neck"], answer: 0,
    explanation: "Hitting the eye makes Kraid open up. Samus can then send damaging shots into his mouth.",
    source: "https://wiki.supermetroid.run/Kraid"
  },
  {
    category: "Boss mechanics", level: "Hard", title: "A clear firing lane",
    question: "Why start a Kraid quick kill with a charged shot when his claw is low?",
    choices: ["It doubles the damage of the next Super", "It stops his belly platforms", "It holds the claw in place", "It destroys the claw for the whole fight"], answer: 2,
    explanation: "A charge to the eye fixes the claw where it is. A low claw leaves a clear line to the mouth.",
    source: "https://wiki.supermetroid.run/Kraid"
  },
  {
    category: "Boss mechanics", level: "Medium", title: "Before the rise",
    question: "What phase does a successful Kraid quick kill prevent viewers from seeing?",
    choices: ["Kraid diving below the spikes", "A second Kraid entering the room", "The ceiling lowering onto Samus", "Kraid rising to his full height"], answer: 3,
    explanation: "The opening barrage finishes him while he is still partly underground.",
    source: "https://wiki.supermetroid.run/Kraid"
  },
  {
    category: "Boss mechanics", level: "Hard", title: "Catch the opening",
    question: "In the Super Missile version of Kraid's quick kill, when should the first Super hit his mouth?",
    choices: ["After it starts closing again", "As it opens, before its widest pose", "Just before the eye appears", "Only after his first belly spike fires"], answer: 1,
    explanation: "A hit during the second opening pose can hold the jaw there long enough for the rest of the volley.",
    source: "https://wiki.supermetroid.run/Kraid"
  },
  {
    category: "Boss mechanics", level: "Easy", title: "Return to sender",
    question: "Golden Torizo has both hands free when Samus fires a Super Missile at him. What can he do?",
    choices: ["Eat it to restore health", "Catch it and throw it back", "Split it into three floor waves", "Stick it to the ceiling"], answer: 1,
    explanation: "This Torizo can turn Samus's own Super into a projectile aimed back at her.",
    source: "https://wiki.supermetroid.run/Golden_Torizo"
  },
  {
    category: "Boss mechanics", level: "Hard", title: "An opening at floor level",
    question: "Golden Torizo usually turns away from ordinary Missiles. Which attack gives them a window to land?",
    choices: ["His floor explosions", "His forward leap", "His backward leap", "His walking approach"], answer: 0,
    explanation: "The floor attack holds the statue in place, preventing the turn that normally spoils a Missile shot.",
    source: "https://wiki.supermetroid.run/Golden_Torizo"
  },
  {
    category: "Boss mechanics", level: "Medium", title: "Birds from the core",
    question: "Late in the Golden Torizo fight, birds start coming out in place of eggs. What changed?",
    choices: ["Damage exposed his core", "Samus equipped Space Jump", "His last egg struck the ceiling", "Samus emptied her Super Missiles"], answer: 0,
    explanation: "The change marks low health. Once the core opens, the statue can send birds flying forward.",
    source: "https://wiki.supermetroid.run/Golden_Torizo"
  },
  {
    category: "Boss mechanics", level: "Easy", title: "A quiet patch of ceiling",
    question: "What happens to the falling spores while Spore Spawn holds its core open?",
    choices: ["Every existing spore turns into energy", "Spores reverse toward the ceiling", "New spores stop appearing", "The spores home in on Samus"], answer: 2,
    explanation: "The ceiling stops sending fresh spores during the opening, though Samus still has to deal with any already in the air.",
    source: "https://wiki.supermetroid.run/Spore_Spawn"
  },
  {
    category: "Boss mechanics", level: "Medium", title: "A plant in a hurry",
    question: "Spore Spawn starts swinging faster even though Samus has stayed in one corner. What explains it?",
    choices: ["Its last spore hit the floor", "The room has a fixed speed-up timer", "Its speed matches Samus's fire rate", "Its health passed a damage threshold"], answer: 3,
    explanation: "The plant speeds up as it loses health. The quicker swing is a sign of progress in the fight.",
    source: "https://wiki.supermetroid.run/Spore_Spawn"
  },
  {
    category: "Boss mechanics", level: "Medium", title: "A charge worth saving",
    question: "Which attack gets a damage bonus against Spore Spawn's exposed core?",
    choices: ["A regular Missile fired while crouching", "A charged beam shot", "A Morph Ball Bomb", "A Super that hits its stem first"], answer: 1,
    explanation: "Charged shots inflict double their usual damage on this miniboss.",
    source: "https://wiki.supermetroid.run/Spore_Spawn"
  },
  {
    category: "Boss mechanics", level: "Hard", title: "Catching the second opening",
    question: "What makes the start of Spore Spawn's second opening especially valuable in a missile fight?",
    choices: ["The shell accepts Power Bomb damage for the first time", "Early hits can land without making the core close immediately", "Each falling spore counts as a core hit", "The plant is locked open until Samus moves"], answer: 1,
    explanation: "The runner can fit shots into the opening motion and still fire a volley when the core is fully exposed.",
    source: "https://wiki.supermetroid.run/Spore_Spawn"
  },
  {
    category: "Boss mechanics", level: "Easy", title: "A fight for ground",
    question: "What actually defeats Crocomire at the far end of his arena?",
    choices: ["Breaking both claws", "Falling into the acid", "Touching the ceiling", "Absorbing a set number of fireballs"], answer: 1,
    explanation: "Shots through his mouth drive him back. The fight ends when the floor gives way beneath him.",
    source: "https://wiki.supermetroid.run/Crocomire"
  },
  {
    category: "Boss mechanics", level: "Medium", title: "The wrong explosion",
    question: "Samus lays a Power Bomb beside Crocomire. Which way does he move when it hits?",
    choices: ["Four steps toward the acid", "Straight up to the ceiling", "Four steps toward Samus", "Around Samus to switch sides"], answer: 2,
    explanation: "The blast provokes an uninterrupted forward rush, costing ground in a fight where position matters.",
    source: "https://wiki.supermetroid.run/Crocomire"
  },
  {
    category: "Boss mechanics", level: "Medium", title: "Read the claw",
    question: "Crocomire stretches his claw forward three times. Which attack is he preparing?",
    choices: ["A leap into the acid", "A sweep with his tail", "A spread of fireballs from his mouth", "A shock wave across the floor"], answer: 2,
    explanation: "The claw motions telegraph a three-direction fireball volley. The open mouth also gives Samus a target.",
    source: "https://wiki.supermetroid.run/Crocomire"
  },
  {
    category: "Boss mechanics", level: "Medium", title: "First hole",
    question: "A runner aims before Botwoon appears. Which hole does his head always emerge from first?",
    choices: ["Upper right", "Upper left", "Lower left", "Lower right"], answer: 1,
    explanation: "The first exit is fixed even though Botwoon can follow different paths afterward.",
    source: "https://wiki.supermetroid.run/Botwoon"
  },
  {
    category: "Boss mechanics", level: "Hard", title: "The last acid volley",
    question: "After a spitting phase ends with Botwoon below half health, which attack drops out of his rotation?",
    choices: ["The snaking pass", "The fan of acid pellets", "Contact with his head", "Contact with his tail"], answer: 1,
    explanation: "Botwoon loses his spitting attack after that health check, though the moving body remains dangerous.",
    source: "https://wiki.supermetroid.run/Botwoon"
  },
  {
    category: "Boss mechanics", level: "Hard", title: "Stay against the wall",
    question: "How does hugging Botwoon's left wall help a low-energy Samus?",
    choices: ["His swimming body never reaches that strip", "His acid turns into energy there", "His head stays in the lower hole", "The wall cancels contact damage from all enemies"], answer: 0,
    explanation: "His paths leave the wall clear. Acid pellets can still reach it while he retains his spit attack.",
    source: "https://wiki.supermetroid.run/Botwoon"
  },
  {
    category: "Boss mechanics", level: "Hard", title: "A low tail",
    question: "Why can two Botwoon kills leave different amounts of loot even with the same ammo and health?",
    choices: ["Only Super Missiles trigger full loot", "The tail exploded too early near the floor", "The first head hit was uncharged", "Left-hole kills suppress Power Bomb drops"], answer: 1,
    explanation: "A tail that detonates too soon relative to the body reduces the number of drops that appear.",
    source: "https://wiki.supermetroid.run/Botwoon"
  },
  {
    category: "Boss mechanics", level: "Medium", title: "An invisible lap",
    question: "Samus misses Phantoon's exposed eye entirely. How can she track his next lap?",
    choices: ["Follow the reflection in the floor", "Look for a moving door light", "Listen for the turrets on each wall", "Watch where the falling flames appear"], answer: 3,
    explanation: "Phantoon can turn invisible and keep flying his figure eight. The flames continue falling along his path.",
    source: "https://wiki.supermetroid.run/Phantoon"
  },
  {
    category: "Boss mechanics", level: "Hard", title: "Seven frames carried over",
    question: "Why can Phantoon become vulnerable a little late after a charged Plasma hit in the previous round?",
    choices: ["Plasma shortens the whole round timer", "His faster flight outruns the eye sprite", "The game delays all shots after a pause", "Some hit invulnerability carries into the next opening"], answer: 3,
    explanation: "He vanished before the hit's invulnerability ended. The leftover frames resume when the eye next opens.",
    source: "https://wiki.supermetroid.run/Phantoon"
  },
  {
    category: "Boss mechanics", level: "Medium", title: "Inside the spiral",
    question: "Why is touching Phantoon's eye just as it opens especially dangerous?",
    choices: ["Eye contact empties Samus's reserves", "Several newly spawned flames can hit together", "His eye disables suit protection", "The floor loses its collision"], answer: 1,
    explanation: "Eight flames form around the eye before spiraling outward. Samus can be inside several at once.",
    source: "https://wiki.supermetroid.run/Phantoon"
  },
  {
    category: "Boss mechanics", level: "Hard", title: "Too many fast patterns",
    question: "Why can a string of fast eye openings leave a Phantoon-first runner short on Missiles?",
    choices: ["Fewer falling flames were available to farm", "Fast openings consume Missiles twice as fast", "Quick rounds disable all drops", "Fast Phantoon has extra health"], answer: 0,
    explanation: "An early opening shortens the time spent shooting the flames for supplies between rounds.",
    source: "https://wiki.supermetroid.run/Phantoon"
  },
  {
    category: "Boss mechanics", level: "Easy", title: "Live wire",
    question: "Draygon has grabbed Samus beside a broken wall turret. Where can the Grappling Beam deal serious damage to Draygon?",
    choices: ["The center of Draygon's tail", "The top of the exit door", "The turret's exposed electrical contact", "A mucus glob over her head"], answer: 2,
    explanation: "The current travels through the grapple connection while Draygon holds Samus. Samus loses energy in the process.",
    source: "https://wiki.supermetroid.run/Draygon"
  },
  {
    category: "Boss mechanics", level: "Medium", title: "Under the swoop",
    question: "Samus wants to sit out one of Draygon's swooping passes. Which position keeps her below it?",
    choices: ["Crouch on a broken turret", "Hang from the ceiling", "Stand against either door", "Stay in Morph Ball on the floor"], answer: 3,
    explanation: "A stationary Morph Ball is low enough for the sweeping body to pass overhead.",
    source: "https://wiki.supermetroid.run/Draygon"
  },
  {
    category: "Boss mechanics", level: "Hard", title: "Choose the next cycle",
    question: "Which sequence of Draygon's attack cycles is impossible?",
    choices: ["Swoop, then another swoop", "Mucus spray, then a swoop", "Mucus spray, then mucus spray", "Swoop, then a mucus spray"], answer: 2,
    explanation: "Draygon always fits a swoop between mucus sprays. After a swoop, she can either spray or swoop again.",
    source: "https://wiki.supermetroid.run/Draygon"
  },
  {
    category: "Boss mechanics", level: "Hard", title: "Aiming the turrets",
    question: "An intact turret starts charging in Draygon's room. When does it choose where to aim?",
    choices: ["When the charge begins", "When the bolt first touches water", "Halfway across the room", "When Draygon finishes her swoop"], answer: 0,
    explanation: "The turret samples Samus's position at the start of the charge. Moving afterward changes where Samus meets the shot.",
    source: "https://wiki.supermetroid.run/Draygon"
  },
  {
    category: "Boss mechanics", level: "Medium", title: "The armored tail",
    question: "A wide Spazer charge keeps striking Ridley's tail during his pogo attack. Why try a short hop before firing?",
    choices: ["Ridley turns his tail toward standing shots", "Jumping doubles beam damage", "Airborne shots make his tail retract", "The tail blocks the shot without taking damage"], answer: 3,
    explanation: "Changing the height of the shot can put it into his body instead of spending it on the invulnerable tail.",
    source: "https://wiki.supermetroid.run/Ridley"
  },
  {
    category: "Boss mechanics", level: "Easy", title: "Losing at Ceres",
    question: "At Ceres, why do runners intentionally stand where Ridley's tail can hit Samus?",
    choices: ["Each hit slows the escape timer", "Tail hits secretly damage Ridley as well", "Low energy makes him break off the encounter", "They need to empty a Reserve Tank"], answer: 2,
    explanation: "Ridley flies off once Samus falls below 30 energy. Taking quick hits starts the escape sooner.",
    source: "https://wiki.supermetroid.run/Ridley"
  },
  {
    category: "Boss mechanics", level: "Hard", title: "A flash before liftoff",
    question: "With very little gear, why time a Power Bomb to Ridley's eye appearing at the start of the Lower Norfair fight?",
    choices: ["It prevents him from ever using his tail", "The blast can hit him twice before he flies away", "It makes him drop five Supers", "It skips the final grab"], answer: 1,
    explanation: "A well-timed explosion can connect twice while Ridley is still close, making one Power Bomb worth two hits.",
    source: "https://wiki.supermetroid.run/Ridley"
  },
  {
    category: "Boss mechanics", level: "Medium", title: "Tail rhythm",
    question: "While Ridley repeatedly bounces on his tail, when does he spit fireballs?",
    choices: ["Only after touching the acid", "On every other pogo", "On every landing Samus jumps over", "Only during the first bounce"], answer: 1,
    explanation: "The alternating volleys give Samus a rhythm to watch while Ridley keeps pogoing.",
    source: "https://wiki.supermetroid.run/Ridley"
  },
  {
    category: "Boss mechanics", level: "Medium", title: "Preserving the gap",
    question: "Why freeze a Rinka before destroying it during Mother Brain's first phase?",
    choices: ["It leaves a large energy refill", "Its death damages the tank", "Its replacement cannot fire", "Its replacement takes longer to appear"], answer: 3,
    explanation: "Freezing before the kill delays the respawn, keeping the space around the tank clearer.",
    source: "https://wiki.supermetroid.run/Mother_Brain"
  },
  {
    category: "Boss mechanics", level: "Hard", title: "A missed missile",
    question: "A turret shot hits Samus near Mother Brain's tank. Why might her next Missile vanish even after the shot is gone?",
    choices: ["The lingering impact cloud can consume it", "The turret briefly takes her ammunition", "Her arm cannon locks during a crouch", "The tank briefly reverses projectiles"], answer: 0,
    explanation: "The small cloud left in the air after impact still interacts with Samus's projectiles.",
    source: "https://wiki.supermetroid.run/Mother_Brain"
  },
  {
    category: "Boss mechanics", level: "Medium", title: "The red beam",
    question: "Mother Brain's second form begins firing explosive red beams. What does that tell the runner?",
    choices: ["Samus has fewer than four tanks", "All the turrets are gone", "Her health has fallen below one quarter", "The fight has lasted two minutes"], answer: 2,
    explanation: "The red beam enters her attack options only below 4,500 of the phase's 18,000 HP.",
    source: "https://wiki.supermetroid.run/Mother_Brain"
  },
  {
    category: "Boss mechanics", level: "Hard", title: "A quiet moment after zero",
    question: "Mother Brain's second form has taken lethal damage. What can delay the start of her rainbow beam sequence?",
    choices: ["A cooldown from her preceding attack", "A remaining Rinka in the previous hall", "A beam left equipped in the pause menu", "The number of missiles Samus still carries"], answer: 0,
    explanation: "Mother Brain needs both zero health and an available attack slot. A recent attack can leave her waiting.",
    source: "https://wiki.supermetroid.run/Mother_Brain"
  },
  {
    category: "Boss mechanics", level: "Hard", title: "Rings that chain",
    question: "Why is a volley of Mother Brain's rings more dangerous than the hit from the first ring suggests?",
    choices: ["Each ring deactivates a different suit upgrade", "Later rings can hit through the usual hit invulnerability", "The first ring drains all reserve energy", "Every missed ring comes back twice"], answer: 1,
    explanation: "The rings ignore the protection normally granted after a hit. Several from the same volley can connect.",
    source: "https://wiki.supermetroid.run/Mother_Brain"
  },
  {
    category: "Creatures", level: "Easy", title: "Botany with a bite",
    question: "The walking cactus in Brinstar pauses to attack. What comes out of it?",
    choices: ["Acid bubbles", "A swarm of spores", "Needles", "A rolling boulder"], answer: 2,
    explanation: "The Cacatac uses its spines as projectiles, so stepping away from its body still leaves Samus in range.",
    source: "https://www.nintendo.co.jp/clvs/manuals/common/pdf/CLV-P-SAAHE.pdf"
  },
  {
    category: "Creatures", level: "Easy", title: "An imperfect copy",
    question: "Which Maridia creature was the Space Pirates' early attempt to clone a Metroid?",
    choices: ["Mochtroid", "Skultera", "Owtch", "Zoa"], answer: 0,
    explanation: "Mochtroids resemble the creatures the Pirates were trying to reproduce, but Samus can defeat them much more easily.",
    source: "https://www.nintendo.co.jp/clvs/manuals/common/pdf/CLV-P-SAAHE.pdf"
  },
  {
    category: "Creatures", level: "Medium", title: "Disappearing act",
    question: "How does an Owtch use Maridia's sandy floor when threatened?",
    choices: ["It hardens it into a shell", "It fires sand through its spines", "It burrows into it", "It builds a raised nest"], answer: 2,
    explanation: "The spiny Owtch can retreat beneath the sand.",
    source: "https://www.nintendo.co.jp/clvs/manuals/common/pdf/CLV-P-SAAHE.pdf"
  },
  {
    category: "Creatures", level: "Medium", title: "Wings down",
    question: "A Kihunter loses its wings during a fight. Which new hazard should Samus expect?",
    choices: ["A homing ring", "A curtain of spores", "Acid spit", "An electrified tail"], answer: 2,
    explanation: "The grounded insect can still attack at range with acid.",
    source: "https://www.nintendo.co.jp/clvs/manuals/common/pdf/CLV-P-SAAHE.pdf"
  },
  {
    category: "Creatures", level: "Easy", title: "Room service",
    question: "What were the Wrecked Ship's malfunctioning work robots originally built to do?",
    choices: ["Raise Metroid larvae", "Pilot the escape pods", "Maintain the ship's interior", "Guard the Gravity Suit"], answer: 2,
    explanation: "They were the ship's maintenance machines before the wreck.",
    source: "https://www.nintendo.co.jp/clvs/manuals/common/pdf/CLV-P-SAAHE.pdf"
  },
  {
    category: "Creatures", level: "Medium", title: "Walking magma",
    question: "Which Norfair creature changes shape and throws molten material at Samus?",
    choices: ["Geruta", "Multiviola", "Magdollite", "Squeept"], answer: 2,
    explanation: "The Magdollite can take on a molten form and hurl lava.",
    source: "https://www.nintendo.co.jp/clvs/manuals/common/pdf/CLV-P-SAAHE.pdf"
  },
  {
    category: "Creatures", level: "Medium", title: "A ghost's signal",
    question: "According to the SNES manual, whose brainwaves does Phantoon tap into?",
    choices: ["Ridley's", "Draygon's", "Mother Brain's", "The Metroid hatchling's"], answer: 2,
    explanation: "The booklet links the ghost's power to Mother Brain, even though Samus encounters it aboard the wreck.",
    source: "https://www.nintendo.co.jp/clvs/manuals/common/pdf/CLV-P-SAAHE.pdf"
  },
  {
    category: "Creatures", level: "Easy", title: "Lights out",
    question: "The platforms in a dark room become harder to see each time Samus kills a certain enemy. Which one?",
    choices: ["Geemer", "Fireflea", "Metaree", "Reo"], answer: 1,
    explanation: "Living Firefleas light the room. Clearing them sacrifices visibility along with the threat.",
    source: "https://wiki.supermetroid.run/Fireflea"
  },
  {
    category: "Creatures", level: "Medium", title: "An unwelcome passenger",
    question: "A Beetom clings to Samus and drains her energy. Which action can shake it loose?",
    choices: ["Holding a charge without moving", "Repeatedly changing controller inputs", "Staying morphed until it refills", "Standing under a door cap"], answer: 1,
    explanation: "The Beetom counts input changes while latched on and releases Samus when that counter reaches 64.",
    source: "https://wiki.supermetroid.run/Beetom"
  },
  {
    category: "Creatures", level: "Hard", title: "When the spark misses",
    question: "An Oum blocks Samus after a missed shinespark in Halfie Climb. Which movement can slip her past it?",
    choices: ["Hold Grapple on its shell while backing up", "Push into it and jump twice while aiming down", "Bounce a Bomb off its raised tentacle", "Fire Ice and roll through as it thaws"], answer: 1,
    explanation: "Facing down during the jumps changes how Samus meets the Oum's collision. Two jumps against it can carry her through.",
    source: "https://wiki.supermetroid.run/Halfie_Climb_Room"
  },
  {
    category: "Creatures", level: "Medium", title: "Leave the nest standing",
    question: "When Samus shoots a Kago in Lower Mushrooms, what comes out for her to farm?",
    choices: ["Pools of acid", "Clusters of blue fire", "Small flying bugs", "Baby Sidehoppers"], answer: 2,
    explanation: "Shots provoke the Kago to release bugs. Samus can shoot the swarm for drops while leaving its source intact.",
    source: "https://wiki.supermetroid.run/Kago"
  },
  {
    category: "Creatures", level: "Hard", title: "Two ends of the machine",
    question: "A player wants to destroy Shaktool after it finishes digging. How does the game track damage to its wheels?",
    choices: ["One shared health total for every link", "Separate health for the grounded and airborne parts", "Only the wheel closest to Samus takes damage", "Each wheel gets new health when it lands"], answer: 1,
    explanation: "The two enemy parts keep separate health totals. Depleting either one destroys Shaktool.",
    source: "https://wiki.supermetroid.run/Shaktool"
  },
  {
    category: "Creatures", level: "Hard", title: "When the tunnel stays open",
    question: "Which event makes the cleared sand persist on a later visit to Shaktool's room?",
    choices: ["Shaktool touches the last sand block", "Samus crosses to the right side of the sand", "Samus collects the Spring Ball", "A Power Bomb detonates beside Shaktool"], answer: 1,
    explanation: "The saved room state depends on Samus's position. Shaktool's digging progress alone does not set the flag.",
    source: "https://wiki.supermetroid.run/Shaktool_Room"
  },
  {
    category: "Creatures", level: "Easy", title: "The eye in the door",
    question: "Samus has no Supers left. How many ordinary Missiles must hit a Gadora's open eye to remove it?",
    choices: ["Three", "Two", "Four", "Five"], answer: 0,
    explanation: "A Gadora closes its eye briefly after each regular Missile, so the three hits take separate openings.",
    source: "https://wiki.supermetroid.run/Gadora"
  },
  {
    category: "Creatures", level: "Medium", title: "Matching colors",
    question: "The orbs spat by an eye door can change color between visits. What determines their palette?",
    choices: ["Samus's current beam", "Samus's current health", "The nearest boss's health", "The last door cap she shot"], answer: 0,
    explanation: "The Gadora's three projectiles borrow the color palette of Samus's beam.",
    source: "https://wiki.supermetroid.run/Gadora"
  },
  {
    category: "Creatures", level: "Hard", title: "The harmless edge",
    question: "Why can Samus touch the spike tiles of Phantoon's eye door before his fight without taking spike damage?",
    choices: ["Spike damage is disabled on the unpowered ship", "The Gadora is already dead", "All spikes above water deal zero damage", "The Wrecked Ship grants a temporary suit"], answer: 0,
    explanation: "The power state changes how those tiles behave. The spikes on other eye doors can hurt Samus.",
    source: "https://wiki.supermetroid.run/Gadora"
  },
  {
    category: "Creatures", level: "Medium", title: "A moving escape",
    question: "A Metroid has latched onto Samus. Why roll across a regular Bomb as it goes off?",
    choices: ["To make the ordinary Bomb deal lethal damage", "To move the Metroid to another room", "To make the next Missile freeze it", "To open enough space to unmorph and freeze it"], answer: 3,
    explanation: "A Bomb shakes the Metroid off. Rolling during the blast leaves more distance before it can attach again.",
    source: "https://wiki.supermetroid.run/Metroid"
  },
  {
    category: "Creatures", level: "Medium", title: "A lean Tourian refill",
    question: "Why can handling Tourian Metroids with Power Bombs leave Samus short on supplies for Mother Brain?",
    choices: ["The blast removes a Missile Tank", "It makes the next room's Metroids invulnerable", "It converts health drops into small energy", "Each kill yields far fewer drops"], answer: 3,
    explanation: "A Power Bomb kill gives one drop opportunity. A frozen Metroid killed with missile ammo can produce six.",
    source: "https://wiki.supermetroid.run/Metroid"
  },
  {
    category: "Creatures", level: "Medium", title: "Draw the duel",
    question: "The fighting pirates in Lower Norfair keep deflecting shots. Where should Samus stand to bait one into becoming vulnerable?",
    choices: ["Inside the entrance door", "On the far side of the next pirate", "Beneath the lowest ceiling spike", "On the three square blocks it patrols around"], answer: 3,
    explanation: "Each pirate responds to Samus entering its own central stretch of floor. Its attack gives her a chance to hit back.",
    source: "https://wiki.supermetroid.run/Metal_Pirates_Room"
  },
  {
    category: "Creatures", level: "Hard", title: "Repeatable hops",
    question: "Why can identical room entries produce the same Dessgeega jumps in Wasteland?",
    choices: ["The transition resets their random sequence to a fixed start", "The jumps copy Samus's previous three inputs", "Their pattern is based on the item percentage", "The camera freezes all randomness underwater"], answer: 0,
    explanation: "Bringing the hoppers on screen at the same times can reproduce their movement after the room resets its random state.",
    source: "https://wiki.supermetroid.run/Wasteland"
  },
  {
    category: "Creatures", level: "Medium", title: "After the drop",
    question: "A Kzan has just reached the bottom of its fall in Wasteland. When can Samus press against its side to get past safely?",
    choices: ["As it starts rising again", "Only during the next downward plunge", "Only after freezing it", "Only after firing a Super at its top"], answer: 0,
    explanation: "The rising spike platform is safe to press against from the side. That lets Samus drop through as soon as there is room.",
    source: "https://wiki.supermetroid.run/Wasteland"
  },
  {
    category: "Creatures", level: "Hard", title: "Off-camera patrol",
    question: "In the Wrecked Ship Attic, which pair behaves differently when Samus takes them off screen?",
    choices: ["Atomics keep moving while Kihunters stop", "Both turn toward the exit door", "Both reset to their starting tiles", "Kihunters keep moving while Atomics stop"], answer: 3,
    explanation: "Panning the room changes where the Atomics are relative to the patrolling Kihunters. A runner can use that to line up a shot.",
    source: "https://wiki.supermetroid.run/Attic"
  },
  {
    category: "Creatures", level: "Medium", title: "Robot flush",
    question: "The Bowling Alley's work robots block Samus's route. What are two well-placed downward shots meant to do?",
    choices: ["Freeze them into a bridge", "Turn them toward the Reserve Tank", "Push them into pits", "Break their ring launchers"], answer: 2,
    explanation: "The robots can be moved by shots. From above, Samus can push them clear of the route below.",
    source: "https://wiki.supermetroid.run/Bowling_Alley"
  },
  {
    category: "Creatures", level: "Medium", title: "A ride from Mama",
    question: "Without Speed Booster, how can Samus coax Maridia's mother turtle into carrying her upward?",
    choices: ["Freeze all the babies in place", "Stand on the mother and fire straight up", "Hit a baby turtle, then board the mother's back", "Grapple the mother's head from below"], answer: 2,
    explanation: "The angry mother spins when one of her young is struck. Boarding her back during that response gives Samus a lift.",
    source: "https://wiki.supermetroid.run/Mama_Turtle_Room"
  },
  {
    category: "Creatures", level: "Hard", title: "Stirring the wall pirates",
    question: "On the way down the Plasma Room, what can a Power Bomb do to the wall pirates still off camera?",
    choices: ["Move them all to the left wall", "Turn them into standing pirates", "Force them to drop a Super immediately", "Make them move before Samus can see them"], answer: 3,
    explanation: "The blast hits the wall pirates and activates their movement. This can put the right-hand pirate in a better position for the return trip.",
    source: "https://wiki.supermetroid.run/Plasma_Room"
  },
  {
    category: "Creatures", level: "Medium", title: "A shy snail",
    question: "In the Aqueduct, a Yard is crawling in the wrong direction for Samus's setup. What does facing it make it do?",
    choices: ["Pull into its shell", "Leap toward the camera", "Launch its shell upward", "Burrow below the room"], answer: 0,
    explanation: "Once its behavior is active, the snail hides when watched. A runner can use Samus's facing direction to control its movement.",
    source: "https://wiki.supermetroid.run/Aqueduct"
  },
  {
    category: "Creatures", level: "Easy", title: "First prey",
    question: "Which creature does the giant Metroid drain in front of Samus in Tourian?",
    choices: ["A Kihunter", "A Sidehopper", "A Skultera", "A Ripper"], answer: 1,
    explanation: "The Metroid leaves the hopper drained before turning its attention to Samus.",
    source: "https://wiki.supermetroid.run/Big_Boy_Room"
  },
  {
    category: "Creatures", level: "Hard", title: "One left alive",
    question: "In Tourian's last Metroid room, a runner gets poor drops and leaves one Metroid alive. What will leaving and re-entering do?",
    choices: ["Double the survivor's drops", "Restore the first three rooms too", "Bring back the room's whole group", "Reroll the drops already on screen"], answer: 2,
    explanation: "The room remembers a full clear. Leaving one alive lets the runner fight the group again for another chance at supplies.",
    source: "https://wiki.supermetroid.run/Metroid_Room_4"
  },
  {
    category: "Creatures", level: "Medium", title: "A living hook",
    question: "With no grapple block above her, which enemy can Samus latch onto and swing from?",
    choices: ["Skultera", "Fireflea", "Beetom", "Powamp"], answer: 3,
    explanation: "A Powamp can serve as a living grapple point. Many other aquatic targets simply take damage or ignore the beam.",
    source: "https://wiki.supermetroid.run/Grapple_Beam"
  },
  {
    category: "Creatures", level: "Hard", title: "Unfreezing the ghost",
    question: "Samus freezes a Covern, then touches it with the Grappling Beam. What happens?",
    choices: ["The ghost thaws", "The ghost becomes a grapple point", "The beam drains its health slowly", "The ghost breaks into energy drops"], answer: 0,
    explanation: "Covern resists Grapple damage, but the contact removes its frozen state. Skultera shares this interaction.",
    source: "https://wiki.supermetroid.run/Grapple_Beam"
  },
  {
    category: "Creatures", level: "Medium", title: "A clear bounce",
    question: "Leaving Sponge Bath, Samus fires at a Bull before bouncing through the water. What does that shot accomplish?",
    choices: ["It powers the elevator in the next room", "It lowers the water for one jump", "It turns the Bull into a grapple block", "It moves the Bull out of her path"], answer: 3,
    explanation: "A shot can displace the enemy. That opens the line through the water without requiring a kill.",
    source: "https://wiki.supermetroid.run/Sponge_Bath"
  },
  {
    category: "Creatures", level: "Hard", title: "Thinning the room",
    question: "A runner enters the Fast Pillars setup with Plasma charged and shoots the pirates before a Power Bomb goes off. What are they saving?",
    choices: ["A charge shot for the next room", "Power Bomb capacity", "Distance on the following shinespark", "Lag frames during the blast"], answer: 3,
    explanation: "Removing pirates before the explosion reduces the slowdown that occurs while the game is processing the blast.",
    source: "https://wiki.supermetroid.run/Fast_Pillars_Setup_Room"
  },
  {
    category: "Creatures", level: "Medium", title: "A lock with legs",
    question: "Which enemies control the upper door in Pink Brinstar's Power Bomb Room?",
    choices: ["Two Sidehoppers", "Two Kihunters", "Three Metarees", "Three Zeelas"], answer: 0,
    explanation: "Defeating both Sidehoppers unlocks the upper door back toward Big Pink.",
    source: "https://wiki.supermetroid.run/Pink_Brinstar_Power_Bomb_Room"
  },
  {
    category: "Creatures", level: "Hard", title: "Too early for the boost",
    question: "Samus reaches the ceiling Energy Tank in Blue Brinstar on her first trip down. Why is the usual Reo damage boost unavailable?",
    choices: ["The enemy population has not appeared yet", "The Reo only swoops at Varia Suit", "The boost requires an active Reserve Tank", "The ceiling blocks stun the Reo"], answer: 0,
    explanation: "The relevant enemies appear after Crateria awakens. The runner cannot count on the Reo during the initial descent.",
    source: "https://wiki.supermetroid.run/Blue_Brinstar_Energy_Tank_Room"
  },
  {
    category: "Creatures", level: "Medium", title: "King on the hill",
    question: "A runner is low on Supers in Bubble Mountain. What makes the Cacatac on the climb worth shooting?",
    choices: ["Its spines turn into ammo when frozen", "It can refill an entire Super pack at once", "It strongly favors a Super Missile drop", "It opens a Missile recharge station"], answer: 2,
    explanation: "When Samus needs Supers, the Cacatac’s drop table heavily favors a Super Missile over energy.",
    source: "https://wiki.supermetroid.run/Cacatac"
  },
  {
    category: "Creatures", level: "Medium", title: "Borrowed launchpad",
    question: "In the farm beyond Crocomire, how can Samus use the flying Gamets to reach the high ledge?",
    choices: ["Ride one until it docks by the ledge", "Lure them upward, freeze one, then jump from it", "Make a Gamet fire at the ceiling", "Wait for one to open the upper door"], answer: 1,
    explanation: "The frozen enemy supplies a starting platform where there is normally open air.",
    source: "https://wiki.supermetroid.run/Post_Crocomire_Farming_Room"
  },
  {
    category: "Creatures", level: "Easy", title: "An empty farm",
    question: "Samus is low on ammo and keeps destroying the circular Rinkas in Tourian. Why does her ammo count stay put?",
    choices: ["Rinkas never drop supplies", "Rinkas only drop ammo before Kraid", "A Rinka drops ammo only if it hits first", "Rinka drops appear in the previous room"], answer: 0,
    explanation: "Killing the rings can clear space, but their drop table contains no refills.",
    source: "https://wiki.supermetroid.run/Rinka"
  },
  {
    category: "Creatures", level: "Medium", title: "Emergency rations",
    question: "With reserves empty, Samus falls to 29 energy. What does the game start favoring when an enemy generates a drop?",
    choices: ["Health refills", "Super Missiles", "Power Bombs", "Whatever ammo was selected last"], answer: 0,
    explanation: "Crossing below 30 total energy triggers the emergency health-drop behavior. The game keeps steering drops toward energy during recovery.",
    source: "https://wiki.supermetroid.run/Enemies"
  },
  {
    category: "Creatures", level: "Hard", title: "Farming at full capacity",
    question: "Samus fills her energy and every ammo type except Power Bombs. How does that affect a Metroid's chance to drop a Power Bomb?",
    choices: ["The Power Bomb chance stays the same", "Every drop becomes a Power Bomb", "The chance doubles once health is full", "The first drop always becomes a Power Bomb"], answer: 0,
    explanation: "Capping common resources removes unwanted refills, but it does not transfer their probabilities to Power Bombs.",
    source: "https://wiki.supermetroid.run/Enemies"
  },
  {
    category: "Creatures", level: "Hard", title: "A blast in the magma",
    question: "Besides clearing a Magdollite, what can a Power Bomb do for someone farming its drops?",
    choices: ["Make it produce up to three drops", "Force the drops to be Supers", "Prevent its drops from despawning", "Change ordinary missiles into Power Bombs"], answer: 0,
    explanation: "A Magdollite normally produces at most one drop. Killing it with a Power Bomb can produce three.",
    source: "https://wiki.supermetroid.run/Enemies"
  },
  {
    category: "Creatures", level: "Hard", title: "A pirate for a platform",
    question: "A lightly equipped runner weakens the top pirate in the Worst Room before climbing. What is the intended payoff?",
    choices: ["Make it fire through the bomb blocks", "Force a larger health drop", "Make it open a hidden door above", "Freeze it midair and stand on it"], answer: 3,
    explanation: "Carefully metered damage sets up the freeze. The airborne pirate gives Samus a foothold for the climb.",
    source: "https://wiki.supermetroid.run/The_Worst_Room_In_The_Game"
  },
  {
    category: "Creatures", level: "Medium", title: "After the dive",
    question: "Samus is returning from Speed Booster Hall. The Skrees have already dived past her. What can still give her a damage boost toward the door?",
    choices: ["Their shadows on the floor", "The door's blue center", "The particles they release on impact", "The holes they leave in the ceiling"], answer: 2,
    explanation: "The falling creatures leave damaging particles behind, giving Samus another way to take a timed hit.",
    source: "https://wiki.supermetroid.run/Bat_Cave"
  },
  {
    category: "Creatures", level: "Hard", title: "A Kihunter in the gap",
    question: "A red Kihunter sits in a one-tile opening in Three Musketeers' Room. Why take a hit from the previous Kihunter?",
    choices: ["To make the blocker lose its wings too", "To pass the blocker during hit invulnerability", "To turn the next jump into a stored spark", "To make the hole expand for one frame"], answer: 1,
    explanation: "The earlier collision provides the brief protection Samus needs to pass through the second enemy's body.",
    source: "https://wiki.supermetroid.run/Three_Musketeers%27_Room"
  },
  {
    category: "Creatures", level: "Medium", title: "A statue made of dust",
    question: "The motionless Torizo in Tourian blocks the route. How can a runner clear it without the lag of blasting it with a full beam?",
    choices: ["Plant a Power Bomb behind it", "Run into it", "Wait for a Metroid to return", "Use the X-Ray Scope on its core"], answer: 1,
    explanation: "The drained statue crumbles on contact. Samus can save her shot for the door beyond.",
    source: "https://wiki.supermetroid.run/Dust_Torizo_Room"
  },
  {
    category: "Creatures", level: "Hard", title: "Through the assembly line",
    question: "Samus has hit invulnerability and wants to pass through a Wrecked Ship work robot. Which relative motion makes the clip possible?",
    choices: ["Samus and the robot move apart", "Both remain motionless", "Both follow the same path at the same speed", "Samus and the robot move toward each other"], answer: 3,
    explanation: "The Assembly Line clip needs an active invulnerability window and the two bodies moving into one another.",
    source: "https://wiki.supermetroid.run/Assembly_Line"
  },
  {
    category: "Creatures", level: "Hard", title: "A strange platform",
    question: "Why can Samus occasionally pass through one of the moving Kamers in Double Chamber?",
    choices: ["Its surface vanishes when Wave is equipped", "The platform only exists during a spin jump", "Its collision switches off in heated rooms", "The game treats the platform as an enemy"], answer: 3,
    explanation: "Kamers use enemy collision. Contact during a turnaround can put Samus inside one instead of landing her on top.",
    source: "https://wiki.supermetroid.run/Double_Chamber"
  },
  {
    category: "Creatures", level: "Medium", title: "Missing the roundup",
    question: "A runner overshoots the top floating platform in Tourian's second Metroid room. Why might their two-enemy grouping fail?",
    choices: ["The platform permanently locks the bottom door", "The upper Metroid freezes without a shot", "Touching the floor destroys one Metroid's drops", "The upper Metroid stays off screen and fails to follow"], answer: 3,
    explanation: "The runner normally brings the upper Metroid along on the descent. Moving too far past it can leave it behind.",
    source: "https://wiki.supermetroid.run/Metroid_Room_2"
  },
  {
    category: "Creatures", level: "Hard", title: "Fish against the wall",
    question: "Before Draygon is dead, which Maridia creatures can help push Samus into the transition behind Butterfly Room's locked door?",
    choices: ["Mochtroids", "Evirs", "Owtches", "Zoas"], answer: 3,
    explanation: "Repeated contact and well-placed freezes can force Samus deeper into the wall until she reaches the transition.",
    source: "https://wiki.supermetroid.run/Butterfly_Room"
  },
  {
    category: "Creatures", level: "Medium", title: "Spinning into armor",
    question: "The red Kihunters of Lower Norfair shrug off ordinary Missiles. Which attack actually gets a damage multiplier against them?",
    choices: ["A regular Bomb", "An uncharged Wave shot", "Screw Attack", "A Power Bomb blast"], answer: 2,
    explanation: "Screw Attack deals double its usual damage to a red Kihunter. Several common weapons do no damage at all.",
    source: "https://wiki.supermetroid.run/Kihunter_(red)"
  },
  {
    category: "Creatures", level: "Hard", title: "A gray Geemer's weakness",
    question: "A gray Geemer resists Missiles and Super Missiles. Which unlikely tool can still kill it on contact?",
    choices: ["Grappling Beam", "X-Ray Scope", "An uncharged Power Beam shot", "A plain Wave Beam shot"], answer: 0,
    explanation: "This variant has unusually strong armor, but its defenses still leave it vulnerable to Grapple.",
    source: "https://github.com/vg-json-data/sm-json-data/blob/1b30c7f1b4b541c5dc429255e0ff642df13a4cd5/enemies/main.json#L147-L160"
  },
  {
    category: "Creatures", level: "Hard", title: "A pirate's posture",
    question: "A charged beam has no Plasma equipped. How do Maridia's pink standing pirates compare with the pink wall pirates against that shot?",
    choices: ["Both resist the shot until they turn gold", "The wall pirates resist it, while the standing ones can take damage", "The standing pirates resist it, while the wall pirates can take damage", "Both take damage only from behind"], answer: 2,
    explanation: "The two pink varieties have different defenses. The standing pirates require Plasma in the beam combination.",
    source: "https://github.com/vg-json-data/sm-json-data/blob/1b30c7f1b4b541c5dc429255e0ff642df13a4cd5/enemies/main.json#L1377-L1416"
  },
  {
    category: "Creatures", level: "Medium", title: "The boulder at the exit",
    question: "Samus carries a charged beam through Lower Norfair's Fireflea Room. How can she destroy the last boulder without firing the shot?",
    choices: ["Crouch beneath it until it cracks", "Release Grapple into the floor", "Hold an upward aim while walking", "Spin into it with the charge held"], answer: 3,
    explanation: "A charged spin gives Samus a pseudo-Screw Attack. It can clear the flames on the way and break the final boulder.",
    source: "https://wiki.supermetroid.run/Lower_Norfair_Fireflea_Room"
  },
  {
    category: "Speedrun tech", level: "Easy", title: "Kicking off",
    question: "Samus is spinning against a wall. Which input order produces a wall jump?",
    choices: ["Press jump, then toward the wall", "Press away, then jump", "Release jump, then aim up", "Press down, then jump"], answer: 1,
    explanation: "Turning away puts Samus in the wall-jump window. A jump during that window kicks her clear.",
    source: "https://wiki.supermetroid.run/Walljump"
  },
  {
    category: "Speedrun tech", level: "Medium", title: "Elevator launch",
    question: "On a descending elevator, how can a runner buffer a spin jump for the instant movement becomes available?",
    choices: ["Hold angle up and release dash", "Hold both aim buttons and tap down", "Hold forward, then release jump", "Hold jump, then press opposite her facing direction"], answer: 3,
    explanation: "Buffering the turn and jump lets Samus leave the elevator in a spin at the first opportunity.",
    source: "https://wiki.supermetroid.run/Spinjump"
  },
  {
    category: "Speedrun tech", level: "Medium", title: "Back into the boost",
    question: "Why turn Samus around just before taking a hit meant to launch her farther along a corridor?",
    choices: ["The turn changes the damage amount", "Facing away extends the invincibility timer", "The damage boost sends her backward", "A forward hit prevents her from spinning"], answer: 2,
    explanation: "A damage boost propels Samus opposite her facing direction. Turning before impact lines the boost up with her route.",
    source: "https://wiki.supermetroid.run/Damage_boosting"
  },
  {
    category: "Speedrun tech", level: "Medium", title: "Beyond terminal velocity",
    question: "Why can a moonfall save several seconds in a tall shaft but do little on a short drop?",
    choices: ["It doubles walking speed after landing", "It cancels every door transition in the shaft", "It breaks all the platforms underneath", "It removes the usual cap on falling speed"], answer: 3,
    explanation: "Samus keeps accelerating past her normal fall speed. A longer uninterrupted drop gives that extra acceleration time to matter.",
    source: "https://wiki.supermetroid.run/Moonwalk"
  },
  {
    category: "Speedrun tech", level: "Hard", title: "Steering a bomb jump",
    question: "During an upward bomb jump, when does Samus normally regain movement control after a bomb catches her?",
    choices: ["At the top of the upward push", "As soon as the blast first appears", "When the next bomb is placed", "After she touches the ground"], answer: 0,
    explanation: "The explosion briefly locks movement. Control returns when the upward speed from that boost runs out.",
    source: "https://wiki.supermetroid.run/Bomb_Jump"
  },
  {
    category: "Speedrun tech", level: "Medium", title: "The stuck turnaround",
    question: "A runner unmorphs and presses the opposite direction, but Samus stays crouched. What input change prevents crouch lock?",
    choices: ["Keep jump held throughout the turn", "Finish turning before starting to unmorph", "Release Morph Ball in the equipment menu", "Press both aim buttons while turning"], answer: 1,
    explanation: "Reversing direction during the unmorph can trap the movement input. Turn before unmorphing or wait until the animation finishes.",
    source: "https://wiki.supermetroid.run/Crouch_Lock"
  },
  {
    category: "Speedrun tech", level: "Hard", title: "Carrying speed underwater",
    question: "Without Gravity Suit, what is a runner preserving by entering liquid in a Morph Ball bounce called a waterball?",
    choices: ["A charge from the last Power Bomb", "Airborne control from Space Jump", "Speed built up before entering the liquid", "Knockback from the last enemy hit"], answer: 2,
    explanation: "The bounce carries speed from dry ground into the liquid. It can get Samus through the first part of a submerged room much faster.",
    source: "https://wiki.supermetroid.run/Morphball_bounce"
  },
  {
    category: "Speedrun tech", level: "Medium", title: "The camera costs time",
    question: "Why enter some side doors at a carefully chosen height even when Samus can reach them from below?",
    choices: ["To leave less camera centering for the transition", "To shorten how long the door cap stays blue", "To keep enemy drops in the previous room", "To stop the in-game timer before the fade"], answer: 0,
    explanation: "The transition first centers the door along that screen edge. Better alignment can save real time before the room scroll begins.",
    source: "https://wiki.supermetroid.run/Aligning_Doors"
  },
  {
    category: "Speedrun tech", level: "Easy", title: "A precise stop",
    question: "Samus is running toward a pixel setup. After releasing the direction pad, what can stop her on the spot?",
    choices: ["Hold dash and release fire", "Tap jump without a direction", "Press an aim-angle button", "Hold the direction she was running"], answer: 2,
    explanation: "An angle input with no horizontal direction stops her movement immediately. It makes precise setups easier than letting her coast.",
    source: "https://wiki.supermetroid.run/Stop_on_a_Dime"
  },
  {
    category: "Speedrun tech", level: "Hard", title: "A finicky elevator pad",
    question: "Why can tapping Down fail on alternating frames when only the edge of Samus’s foot overlaps an elevator pad?",
    choices: ["The pad only works on a flashing frame", "Her ammo count changes the input window", "Elevators ignore the first input after a jump", "Collision checks alternate between two tiles"], answer: 3,
    explanation: "When Samus straddles two tiles, the game alternates which tile it checks. Standing fully on the pad makes activation reliable.",
    source: "https://wiki.supermetroid.run/Elevator_Grab"
  },
  {
    category: "Speedrun tech", level: "Medium", title: "Through the hit",
    question: "A runner deliberately morphs into an enemy and takes damage without being knocked back. What is that technique called?",
    choices: ["Downbacking", "Kagoing", "Ledgegrabbing", "Short charging"], answer: 1,
    explanation: "A morph or another uninterruptible animation can carry Samus through contact without starting the usual knockback animation.",
    source: "https://wiki.supermetroid.run/Kagoing"
  },
  {
    category: "Speedrun tech", level: "Medium", title: "Falling through a block",
    question: "Samus is falling toward a crumble block. What does beginning a turnaround as she touches it preserve?",
    choices: ["Beam charge after a shot", "The crumble block until she returns", "Downward speed", "Invincibility from her last hit"], answer: 2,
    explanation: "A turnaround at contact lets Samus continue falling as the block disappears. Landing on it normally interrupts the descent.",
    source: "https://wiki.supermetroid.run/Quick_Drop"
  },
  {
    category: "Speedrun tech", level: "Hard", title: "An extra step",
    question: "How does a corner jump let Samus take off just beyond a ledge?",
    choices: ["Aim straight down after she has fallen a tile", "Turn around before she enters her falling state", "Roll off and drop a bomb at the edge", "Fire a charged shot into the platform"], answer: 1,
    explanation: "Running off and turning at the edge briefly preserves a chance to jump. The technique is also called a Flatley Jump.",
    source: "https://wiki.supermetroid.run/Corner_Jump"
  },
  {
    category: "Speedrun tech", level: "Medium", title: "An early landing",
    question: "A runner breaks spin just above a platform without firing at anything. How can this save time?",
    choices: ["Samus’s taller pose reaches the platform sooner", "Her horizontal speed doubles for one frame", "It resets the platform’s collision timer", "It changes the platform into a slope"], answer: 0,
    explanation: "Aiming or firing extends Samus’s hitbox below the spin pose. She can start the next movement as soon as her feet touch.",
    source: "https://wiki.supermetroid.run/Hitbox_Manipulation"
  },
  {
    category: "Speedrun tech", level: "Medium", title: "Threading a shaft",
    question: "Why use a downback while falling through a narrow gap?",
    choices: ["To fall faster than a moonfall", "To turn a normal fall into a wall jump", "To roll through without Morph Ball", "To drift forward with the short aiming-down hitbox"], answer: 3,
    explanation: "Down plus the backward direction lets Samus drift while keeping the compact pose. Clearing the ledge preserves her fall.",
    source: "https://wiki.supermetroid.run/Hitbox_Manipulation"
  },
  {
    category: "Speedrun tech", level: "Hard", title: "Eight pixels short",
    question: "A neutral crouch jump just clears a ledge. Why would holding an aim-angle button before takeoff spoil it?",
    choices: ["It forces the shorter Morph Ball jump", "It automatically stores a shinespark", "It delays her next wall jump by one second", "It removes the crouch jump’s height advantage"], answer: 3,
    explanation: "A neutral cannon gives the crouch jump its extra eight pixels. The runner can angle the cannon after takeoff.",
    source: "https://wiki.supermetroid.run/Hitbox_Manipulation"
  },
  {
    category: "Speedrun tech", level: "Hard", title: "Collecting on the turn",
    question: "Samus spins past an item and turns away just before touching it. Why can she still collect it?",
    choices: ["Item pickups always slide toward Samus", "A turn gives the beam a one-frame vacuum", "Her wall-jump check can touch the item behind her", "The item checks the position of her last shot"], answer: 2,
    explanation: "A spin turnaround checks tiles behind Samus. A nearby pickup can register during that check, which also sets up the trip back.",
    source: "https://wiki.supermetroid.run/Hitbox_Manipulation"
  },
  {
    category: "Speedrun tech", level: "Hard", title: "Silencing the bomb hop",
    question: "Samus has laid a bomb and unmorphed beside its blast. Why would a runner fire at empty space as it goes off?",
    choices: ["The firing animation can suppress the bomb jump", "The shot detonates the next bomb in reserve", "A beam reflection cancels blast damage", "Firing transfers the bomb to the other side"], answer: 0,
    explanation: "A shot briefly commits Samus to an animation. Timing that animation with the blast can keep it from lifting her out of position.",
    source: "https://wiki.supermetroid.run/Exploiting_Sprite_Animations"
  },
  {
    category: "Speedrun tech", level: "Medium", title: "Alcatraz escape",
    question: "Samus wall-jumps up the Parlor bottleneck after Bomb Torizo. Which form gets her through the opening at the top?",
    choices: ["A standing jump", "Morph Ball", "A crouch with angled aim", "A forward-facing moonwalk"], answer: 1,
    explanation: "The shortcut ends in a passage too short to stand in. A wall jump into an airborne morph gets Samus through the gap.",
    source: "https://wiki.supermetroid.run/Parlor_and_Alcatraz"
  },
  {
    category: "Speedrun tech", level: "Medium", title: "Ocean Fly",
    question: "A runner launches an Ocean Fly at the moat. Which landmark is the intended end of that single shinespark?",
    choices: ["The top of Red Tower", "The green door at Wrecked Ship Entrance", "The Chozo statue in Bowling Alley", "The elevator to Maridia"], answer: 1,
    explanation: "The spark spans both the moat and the ocean. It trades a sizable amount of energy for the long uninterrupted crossing.",
    source: "https://wiki.supermetroid.run/West_Ocean"
  },
  {
    category: "Speedrun tech", level: "Hard", title: "Clearing the pipe",
    question: "In the Colosseum, what makes a Full Halfie carry Samus farther than a regular Halfie?",
    choices: ["Turning off Gravity Suit over the pipe", "Hitting the pipe with a Super first", "Landing on the pipe to refresh the charge", "Launching above the P-shaped pipe"], answer: 3,
    explanation: "The lower spark runs into the pipe. Carrying the stored charge through the door and jumping before launch clears it.",
    source: "https://wiki.supermetroid.run/Colosseum"
  },
  {
    category: "Speedrun tech", level: "Medium", title: "A spark from lava",
    question: "A runner stores a shinespark before dropping into the Lava Dive pool. What destination does the lava spark help reach?",
    choices: ["The return chute to Maridia", "The Grapple Beam statue", "The entrance to Lower Norfair", "The chamber above Crocomire"], answer: 2,
    explanation: "The spark carries Samus up from the pool to the route into Lower Norfair.",
    source: "https://wiki.supermetroid.run/Lava_Dive_Room"
  },
  {
    category: "Speedrun tech", level: "Hard", title: "Skipping the row",
    question: "A runner slips past the first Zebetite intact. Why does this save more ammo than the cost of that one barrier?",
    choices: ["The later Zebetites do not spawn", "The turrets refill her missile supply", "Mother Brain’s glass loses a damage stage", "Every Rinka turns into a Super drop"], answer: 0,
    explanation: "The next barriers depend on an earlier one being destroyed. Passing a live barrier breaks that sequence.",
    source: "https://wiki.supermetroid.run/Mother_Brain_Room"
  },
  {
    category: "Speedrun tech", level: "Medium", title: "Taking the drain",
    question: "A runner who plans to let the giant Metroid grab Samus deliberately loses health first. Why?",
    choices: ["A low-energy alarm stops the grab", "The hatchling can only grab a crouching Samus", "Low health opens the next door sooner", "Less energy remains for the hatchling to drain"], answer: 3,
    explanation: "If the runner accepts the grab, arriving with less energy shortens the drain. The nearby Sidehopper can supply the damage.",
    source: "https://wiki.supermetroid.run/Big_Boy_Room"
  },
  {
    category: "Routes & rules", level: "Medium", title: "Inside the lines",
    question: "Which shortcut is legal in traditional Super Metroid Any% under the community rules?",
    choices: ["An in-bounds Zebetite skip", "Leaving the map to enter Tourian", "Using the Golden Torizo code", "Triggering Space/Time Beam"], answer: 0,
    explanation: "Traditional Any% permits certain in-bounds clips. The run still defeats the four statue bosses and finishes the escape.",
    source: "https://wiki.supermetroid.run/Any%25"
  },
  {
    category: "Routes & rules", level: "Medium", title: "Start on the cursor",
    question: "At the start of a full run on a prepared file, which visual cue starts real-time timing?",
    choices: ["Samus reaches the bottom of the Ceres elevator", "The Missile cursor disappears after Start Game", "The first Zebes map screen fades away", "Ridley lifts off with the hatchling"], answer: 1,
    explanation: "The community times from the disappearing Start Game cursor. Movement starts later, on Ceres.",
    source: "https://wiki.supermetroid.run/Timing"
  },
  {
    category: "Routes & rules", level: "Medium", title: "Getting a clean file",
    question: "How does a runner prepare the 0:00 file used to skip the introduction for a full run?",
    choices: ["Save at the first Brinstar station and reset", "Finish the Ceres escape and save at the ship", "Reset when Samus becomes controllable on Ceres", "Start a second file while the credits roll"], answer: 2,
    explanation: "Letting the introduction play once and resetting on the Ceres elevator leaves a file ready to start the timed attempt.",
    source: "https://wiki.supermetroid.run/Timing"
  },
  {
    category: "Routes & rules", level: "Easy", title: "All means all",
    question: "A runner clears all four statue bosses and Mother Brain but skips Spore Spawn. Which category goal does that miss?",
    choices: ["Any% All Bosses", "Traditional Any%", "Any% KPDR", "Any% PRKD"], answer: 0,
    explanation: "All Bosses adds the minibosses to the required fights. Their order is flexible, but Spore Spawn belongs on the list.",
    source: "https://wiki.supermetroid.run/Any%25_All_Bosses"
  },
  {
    category: "Routes & rules", level: "Medium", title: "Detour on the escape",
    question: "Which full-completion category explicitly requires Samus to rescue the animals on the escape?",
    choices: ["100% Items", "Traditional Any%", "True Completion", "14% Speed"], answer: 2,
    explanation: "True Completion combines item, map and boss goals with other completion flags. Saving the animals is one of its requirements.",
    source: "https://wiki.supermetroid.run/True_Completion"
  },
  {
    category: "Routes & rules", level: "Hard", title: "A strange Tourian split",
    question: "Why does a True Completion runner spend ammo destroying Zebetites even with a reliable Zeb skip?",
    choices: ["Each Zebetite hides a map square", "The animals require the corridor to be cleared", "The barriers count as missile expansions", "The category requires every Zebetite destroyed"], answer: 3,
    explanation: "True Completion tracks several objectives beyond items and rooms. Destroying every Zebetite is one, so skipping past a live barrier misses it.",
    source: "https://wiki.supermetroid.run/True_Completion"
  },
  {
    category: "Routes & rules", level: "Medium", title: "An unusual finish line",
    question: "A runner opens twenty regular Missile Tanks and finishes a partial category without escaping Zebes. Which goal were they chasing?",
    choices: ["100% Items", "100 Missiles", "100% Map Completion", "Any% All Bosses"], answer: 1,
    explanation: "Twenty packs grant 100 regular missiles of capacity. The category ends at its ammo goal and does not require a major boss.",
    source: "https://wiki.supermetroid.run/100_Missiles"
  },
  {
    category: "Routes & rules", level: "Hard", title: "The original Power Bomb sprint",
    question: "In the historical PBany% route, which pickup ends the run after Kraid, Hi-Jump, Speed and Wave?",
    choices: ["Power Bombs in the Wrecked Ship", "Power Bombs beyond Crocomire", "Power Bombs by the lower Red Brinstar elevator", "Power Bombs by the Lower Norfair save"], answer: 2,
    explanation: "This partial run followed the older Any% path through Norfair before heading for the Red Brinstar pack.",
    source: "https://wiki.supermetroid.run/Pbany%25"
  },
  {
    category: "Routes & rules", level: "Medium", title: "Starting closer to Crocomire",
    question: "Where does the documented Crocomire RTA file begin, before the runner races to his room?",
    choices: ["Ceres Station elevator", "Landing Site on Zebes", "Norfair elevator", "Save station outside Crocomire"], answer: 1,
    explanation: "Crocomire RTA uses a Landing Site start. Timing begins as the map screens clear, cutting Ceres out of this short goal.",
    source: "https://wiki.supermetroid.run/Crocomire_RTA"
  },
  {
    category: "Routes & rules", level: "Hard", title: "When dash is legal",
    question: "Which use of the dash button is permitted in Dashless Any%?",
    choices: ["Using X-Ray while standing still", "Holding it to accelerate on dry ground", "Tapping it to short-charge on a runway", "Using it to reach blue speed in a hallway"], answer: 0,
    explanation: "The restriction concerns building dash speed. Using that same button for a stationary X-Ray scan does not advance the dash counter.",
    source: "https://wiki.supermetroid.run/Dashless_Any%25"
  },
  {
    category: "Routes & rules", level: "Easy", title: "Starting fully equipped",
    question: "How does the community’s New Game Plus patch change the opening on Ceres?",
    choices: ["All four statue bosses start defeated", "Every route begins on a saved escape file", "The game opens in Lower Norfair", "Samus starts with the full item loadout"], answer: 3,
    explanation: "The patch supplies equipment at the start. Runners can tackle the Any% objective with a fully equipped Samus.",
    source: "https://wiki.supermetroid.run/New_Game_Plus"
  },
  {
    category: "Routes & rules", level: "Hard", title: "A choice before Ceres",
    question: "In total’s New Game Plus patch, which endgame weapon can a runner switch off before starting the file?",
    choices: ["Plasma Beam", "Hyper Beam", "Screw Attack", "Power Bombs"], answer: 1,
    explanation: "Special Setting Mode lets the runner choose whether Hyper Beam comes with the opening loadout.",
    source: "https://wiki.supermetroid.run/New_Game_Plus"
  },
  {
    category: "Routes & rules", level: "Medium", title: "The code’s missing upgrade",
    question: "A GT Classic runner has just activated the Golden Torizo code. Which major ability still needs a pickup?",
    choices: ["Space Jump", "Plasma Beam", "Screw Attack", "Spring Ball"], answer: 2,
    explanation: "The code grants an extensive equipment set but leaves out Screw Attack. Its pickup is conveniently close to Golden Torizo.",
    source: "https://wiki.supermetroid.run/GT_Classic"
  },
  {
    category: "Routes & rules", level: "Hard", title: "Saving tanks for later",
    question: "Why leave Energy Tanks uncollected before using the code in Max% GT Code?",
    choices: ["The code replaces the current tank totals", "The code damages every full tank", "Energy Tanks block the Golden Torizo fight", "The code only counts fully explored rooms"], answer: 0,
    explanation: "A tank already collected cannot be picked up again. Saving it until after the code lets it increase the final total.",
    source: "https://wiki.supermetroid.run/Max%25_GT_Code"
  },
  {
    category: "Routes & rules", level: "Hard", title: "A percentage on the credits",
    question: "How does the finish requirement of 100% GT allow a different route from ordinary 100% Items?",
    choices: ["It requires every map square in Norfair", "It checks the displayed final percentage", "It counts only ammo acquired after GT", "It requires 100 Super Missiles held at once"], answer: 1,
    explanation: "The GT category aims for a credits screen reading 100%. Code-granted items and other allowed methods can contribute toward that target.",
    source: "https://wiki.supermetroid.run/100%25_GT"
  },
  {
    category: "Routes & rules", level: "Medium", title: "A safety trip to Maridia",
    question: "Why might a newer Reverse Boss Order runner visit Maridia before fighting Ridley?",
    choices: ["To get Space Jump as an early safety", "To collect extra energy and Super Missile capacity", "To defeat Draygon while Gravity is available", "To recharge Varia Suit at a station"], answer: 1,
    explanation: "The Mama Turtle tank and Crab Supers are accessible detours. They make the long suitless trip into Lower Norfair more forgiving.",
    source: "https://wiki.supermetroid.run/RBO"
  },
  {
    category: "Routes & rules", level: "Hard", title: "Skipping the golden detour",
    question: "A Reverse Boss Order runner skips both Golden Torizo and Screw Attack. What becomes riskier later?",
    choices: ["Opening the blue gates in Brinstar", "Triggering the statues after Kraid", "Keeping the gunship on the Landing Site", "Escaping Lower Norfair through its enemies"], answer: 3,
    explanation: "The detour costs time, but Screw Attack helps on the way out. Skipping it also passes up opportunities to stock up on ammo.",
    source: "https://wiki.supermetroid.run/RBO"
  },
  {
    category: "Routes & rules", level: "Hard", title: "A one-visit Kraid’s Lair",
    question: "Why collect Power Bombs before the first Kraid’s Lair visit in one 100% route variation?",
    choices: ["To make Kraid drop two Energy Tanks", "To make Varia Suit count twice", "To take the area’s missile pack on that visit", "To open Tourian before leaving the lair"], answer: 2,
    explanation: "Early Power Bombs let the runner collect a pack that would otherwise require a return trip to Kraid’s Lair.",
    source: "https://wiki.supermetroid.run/100%25"
  },
  {
    category: "Routes & rules", level: "Hard", title: "The cost of late Crocomire",
    question: "Compared with early Crocomire in 100%, which resources can be missing on the Wrecked Ship visit if Crocomire waits?",
    choices: ["An Energy Tank and a Power Bomb expansion", "Two Reserve Tanks and Ice Beam", "A Super Missile pack and Space Jump", "Hi-Jump Boots and three missile packs"], answer: 0,
    explanation: "Postponing that area leaves these pickups for later. Managing health and Power Bombs around Wrecked Ship gets tighter.",
    source: "https://wiki.supermetroid.run/100%25"
  },
  {
    category: "Routes & rules", level: "Hard", title: "A safer boss swap",
    question: "Why move Kraid ahead of Ridley in a Phantoon-first PKRD route?",
    choices: ["Phantoon’s flames become safe to touch", "Draygon drops extra Supers after Kraid", "Spore Spawn opens a shortcut to Ridley", "Varia reduces the energy cost of entering Lower Norfair"], answer: 3,
    explanation: "Kraid’s reward gives Samus Varia before the lava dive. The route can also add Kraid’s Energy Tank for extra margin.",
    source: "https://wiki.supermetroid.run/Any%25"
  },
  {
    category: "Routes & rules", level: "Hard", title: "The hybrid compromise",
    question: "Some Any% hybrid routes visit Wrecked Ship early but still make two Norfair trips. Which backtrack do they eliminate?",
    choices: ["The return climb up Red Tower for the ship trip", "The escape from Tourian to Crateria", "The climb out of Draygon’s arena", "The return from Kraid’s lair"], answer: 0,
    explanation: "Taking the Wrecked Ship early cuts the Red Tower backtrack. The ship itself takes longer without Speed Booster.",
    source: "https://wiki.supermetroid.run/Any%25"
  },
  {
    category: "Routes & rules", level: "Medium", title: "A different pipe breaker",
    question: "Before Botwoon, how does 14% Speed make progress without 14% Ice’s frozen Mochtroid setup?",
    choices: ["Break the pipes with Grapple Beam", "Use Speed Booster on the pipe blocks", "Clear the pipes with a Reserve Tank refill", "Pull a Puyo through the pipes with X-Ray"], answer: 1,
    explanation: "Speed Booster is the route’s key progression item for these pipes. It also supplies an option for getting past the Zebetites.",
    source: "https://wiki.supermetroid.run/14%25_Speed"
  },
  {
    category: "Routes & rules", level: "Hard", title: "Mother Brain comes first",
    question: "What unusual boss-order challenge calls for Mother Brain before Ridley, with minibosses also reversed?",
    choices: ["Reverse Boss and Mini-Boss Order", "Standard Reverse Boss Order", "GT Classic", "Any% All Bosses"], answer: 0,
    explanation: "RBMBO reverses a longer fight list than ordinary RBO. It permits out-of-bounds movement to reach Mother Brain at the start of that order.",
    source: "https://wiki.supermetroid.run/RBMBO"
  },
  {
    category: "Speedrun tech", level: "Hard", title: "Removing a suit in mid-jump",
    question: "A runner pauses just as a submerged jump starts, then removes Gravity Suit. What are they setting up?",
    choices: ["A bomb jump with no planted bomb", "A speedball on the water’s surface", "A gravity jump that rises unusually high", "A wall jump that requires no spin"], answer: 2,
    explanation: "Samus starts the jump under Gravity Suit physics. Removing the suit during the pause changes the rest of the underwater ascent.",
    source: "https://wiki.supermetroid.run/Gravity_Jump"
  },
  {
    category: "Speedrun tech", level: "Hard", title: "Another jump in midair",
    question: "A runner swings from Grapple, morphs, then unmorphs while still rising. What movement does that set up?",
    choices: ["A diagonal spark with no Speed Booster", "An automatic return to the grapple point", "A dive that breaks crumble blocks", "Another jump before touching ground"], answer: 3,
    explanation: "A grapple jump uses the upward motion left from the swing. The morph and unmorph set up another midair jump.",
    source: "https://wiki.supermetroid.run/Grapple_Jump"
  },
  {
    category: "Speedrun tech", level: "Hard", title: "Losing the lasting blue",
    question: "A runner has persistent blue suit and wants to carry it to another room. Which movement would spend or clear it?",
    choices: ["An ordinary forward walk", "Starting a forward dash", "Waiting on level ground", "Standing still to aim up"], answer: 1,
    explanation: "The glitched state survives ordinary stops. Activating dash while moving forward or using the available spark can clear it.",
    source: "https://wiki.supermetroid.run/Blue_Suit_Glitch"
  },
  {
    category: "Speedrun tech", level: "Hard", title: "A charge with no countdown",
    question: "A commentator calls a setup a spikesuit. What can Samus carry beyond the usual storage timer?",
    choices: ["Permanent spike invincibility", "A second suit of armor", "A ready-to-use shinespark", "A Grapple shot through solid walls"], answer: 2,
    explanation: "A spikesuit is a form of shinespark suit. It keeps a spark ready until Samus uses it or does something that cancels it.",
    source: "https://wiki.supermetroid.run/Yellow_Suit_Glitch"
  },
  {
    category: "Speedrun tech", level: "Medium", title: "Following the shot",
    question: "What makes a shot at a distant door a hero shot?",
    choices: ["It is the last Super Missile in the pack", "Its success depends on scrolling the screen with it", "The door opens on the second beam hit", "It has to bounce off a frozen enemy"], answer: 1,
    explanation: "The runner moves to keep the projectile in play. Without the camera scroll, the shot would fall short of its target.",
    source: "https://wiki.supermetroid.run/Hero_Shot"
  },
  {
    category: "Speedrun tech", level: "Hard", title: "A menu at zero energy",
    question: "How can opening the pause menu just before a fatal hit keep a low-energy run alive a little longer?",
    choices: ["Samus cannot die during the menu fades", "The menu refills one energy unit per visit", "The hit moves into her empty Reserve Tank", "Pausing cancels every active enemy shot"], answer: 0,
    explanation: "The fade briefly postpones death. That window can give the runner a chance to reach a pickup or trigger a refill.",
    source: "https://wiki.supermetroid.run/Pause_Abuse"
  },
  {
    category: "Speedrun tech", level: "Medium", title: "Wrong side of a gate",
    question: "A runner reaches the back of a green-switch gate and tries the standard gate glitch. Which ammo can activate that switch?",
    choices: ["A regular Missile", "A Power Bomb", "A charged Ice shot", "A Super Missile"], answer: 3,
    explanation: "The trick reaches the switch from the unintended side. Green switches still need Super Missile ammo.",
    source: "https://wiki.supermetroid.run/Gate_Glitch"
  },
  {
    category: "Speedrun tech", level: "Medium", title: "Giving up an angle",
    question: "A runner maps Dash to R on the original SNES controls. Why might that cost them an aiming option?",
    choices: ["The game disables aiming while Dash is assigned", "The SNES cannot read Dash and Jump together", "Both aim angles must share a single button", "The angle commands can only be assigned to L or R"], answer: 3,
    explanation: "Aiming up and down compete for the two shoulder buttons. Using one shoulder for another action can leave an angle unbound.",
    source: "https://wiki.supermetroid.run/Control_Schemes"
  },
  {
    category: "Speedrun tech", level: "Hard", title: "Continuing the jump",
    question: "On a successful continuous wall jump, which surface does Samus kick off?",
    choices: ["The ceiling directly above her takeoff point", "The near side before she reaches the top", "The far side of the platform she just cleared", "The floor of the gap before she lands"], answer: 2,
    explanation: "Samus skims over the platform and wall-jumps off its far side, continuing the jump with speed from the approach.",
    source: "https://wiki.supermetroid.run/Continuous_Wall_Jump"
  },
  {
    category: "Speedrun tech", level: "Easy", title: "Picking a direction",
    question: "On flat ground with a spark stored, which input aims a standing shinespark diagonally instead of straight up?",
    choices: ["Hold Angle Up as jump is pressed", "Hold Angle Down during the crash", "Release jump on the first blue echo", "Tap item select at takeoff"], answer: 0,
    explanation: "Angle Up selects the upward diagonal for a standing spark. The direction matters when a shaft opens into a high side passage.",
    source: "https://wiki.supermetroid.run/Shinespark"
  },
  {
    category: "Speedrun tech", level: "Hard", title: "A blocked aerial launch",
    question: "Samus has a stored spark and enough energy, but her midair spark refuses to launch. Which held button can block it?",
    choices: ["Dash", "Shot", "Item Select", "Item Cancel"], answer: 1,
    explanation: "Holding Shot prevents a midair shinespark from activating. Releasing it is important when the runner has also been firing at a door.",
    source: "https://wiki.supermetroid.run/Shinespark"
  },
  {
    category: "Speedrun tech", level: "Hard", title: "A wall as a measuring tool",
    question: "For a precise setup, why press Samus flush against a wall before moving a known distance?",
    choices: ["The wall sets the room’s random seed", "The wall fixes her horizontal subpixel position", "It gives every weapon the same travel speed", "It aligns the next door regardless of camera position"], answer: 1,
    explanation: "Two positions that look identical can differ by a fraction of a pixel. Pressing into a wall gives the setup a repeatable starting fraction.",
    source: "https://wiki.supermetroid.run/Normalized_Movement"
  },
  {
    category: "Speedrun tech", level: "Hard", title: "Threading the Platforms",
    question: "Why does the advanced moonfall in the Climb weave between the first few platforms?",
    choices: ["Each platform resets her downward speed", "Brushing the platforms cancels the landing sound", "It makes the elevator at the bottom rise sooner", "Samus can begin her fall farther left"], answer: 3,
    explanation: "Weaving clears the first floating platform with less moonwalking on the starting ledge. The time save starts before Samus falls.",
    source: "https://wiki.supermetroid.run/The_Climb"
  },
  {
    category: "Speedrun tech", level: "Medium", title: "Two Rows, One Shot",
    question: "On the climb back through Construction Zone, where can one beam shot clear a gap tall enough for a jump-morph?",
    choices: ["At the seam between the two rows of shot blocks", "At the bottom edge of the lower row", "At the vertical wall beyond both rows", "At the ceiling directly over the upper row"], answer: 0,
    explanation: "A shot centered on the seam breaks blocks in both rows at once. Samus can then jump and morph into the opening.",
    source: "https://wiki.supermetroid.run/Construction_Zone"
  },
  {
    category: "Speedrun tech", level: "Medium", title: "Five Missiles in Motion",
    question: "Heading right through Flyway toward Bomb Torizo, how can Samus open the red door without stopping in front of it?",
    choices: ["Fire once straight up and four times horizontally on landing", "Shoot the floor five times before entering Flyway", "Fire all five upward as she passes beneath the door", "Fire twice on the way up, then angle down for the last three"], answer: 3,
    explanation: "The first two missiles head straight at the door during the jump. Angling down on the descent keeps the remaining shots on target.",
    source: "https://wiki.supermetroid.run/Flyway"
  },
  {
    category: "Speedrun tech", level: "Hard", title: "Mission Impossible",
    question: "After grabbing Pink Brinstar's Power Bomb in the “Mission Impossible” strat, what is Samus racing?",
    choices: ["The crumble block reforming in the ceiling", "A shutter closing when the item fanfare ends", "A rising pool of acid below the pickup", "The Power Bomb blast reaching the return shaft"], answer: 0,
    explanation: "Samus drops through the block for the pickup, then spin-jumps back through the same hole. Once through, she can wall-jump up the shaft.",
    source: "https://wiki.supermetroid.run/Pink_Brinstar_Power_Bomb_Room"
  },
  {
    category: "Speedrun tech", level: "Medium", title: "Early Warehouse Entry",
    question: "Without Hi-Jump Boots, how can Samus reach the Warehouse ledge on the way to Kraid?",
    choices: ["Try a running jump straight up from the pit floor", "Jump across from the high platform and wall-jump off the ledge's edge", "Wall-jump from underneath the lower platform", "Bomb-jump off the crumbling floor below the shaft"], answer: 1,
    explanation: "Starting across the gap gives Samus enough horizontal room to reach the wall beside the ledge and kick up onto it.",
    source: "https://wiki.supermetroid.run/Warehouse_Entrance"
  },
  {
    category: "Speedrun tech", level: "Hard", title: "Ready to Fire Down",
    question: "Why make Samus enter Warehouse Zeela Room in a wall-jump check on the way to Kraid?",
    choices: ["To keep the red shutters open through the transition", "To make the first Zeela climb the far wall", "To shoot out the block below as soon as the room loads", "To charge a shinespark during the transition"], answer: 2,
    explanation: "The entry leaves Samus ready to fire downward and clear the first shot block. What she does with the Zeela below depends on her equipment.",
    source: "https://wiki.supermetroid.run/Warehouse_Zeela_Room"
  },
  {
    category: "Speedrun tech", level: "Medium", title: "Out of the Hole",
    question: "How can a runner set up Warehouse Kihunter Room before Samus even lands in it?",
    choices: ["Cross the entrance while airborne", "Enter with all beams disabled", "Cross the entrance in reverse with Moon Walk", "Fire a Super Missile through the door first"], answer: 0,
    explanation: "The airborne entry changes the Kihunters' movement. Their new pattern lets Samus jump out of the hole without getting knocked back down.",
    source: "https://wiki.supermetroid.run/Warehouse_Kihunter_Room"
  },
  {
    category: "Speedrun tech", level: "Hard", title: "The Cac Snipe",
    question: "In Bubble Mountain's Cac Snipe, why chase the charged diagonal shot as soon as Samus fires?",
    choices: ["To make the shot split a second time", "To trigger a second shot from the same charge", "To keep the shot on screen until it hits King Cac", "To make King Cac release its drop before impact"], answer: 2,
    explanation: "Following the beam keeps it alive long enough to reach King Cac. The drop waits above for Samus to collect after her wall-jump climb.",
    source: "https://wiki.supermetroid.run/Bubble_Mountain"
  },
  {
    category: "Speedrun tech", level: "Medium", title: "Jumping the Third Pillar",
    question: "In Cathedral, why hold the beam charge while jumping over the second pillar on the way right?",
    choices: ["To make the third pillar rise sooner", "To open the exit door with a bomb spread", "To spin through the Geruta above the third pillar", "To keep the lava from interrupting a wall jump"], answer: 2,
    explanation: "A full charge turns the next spin jump into a pseudo Screw Attack. It kills the Geruta in Samus's path without making her stop to shoot.",
    source: "https://wiki.supermetroid.run/Cathedral"
  },
  {
    category: "Speedrun tech", level: "Hard", title: "Shot Over the Hill",
    question: "Leaving Speed Booster Hall with Spazer equipped, when should Samus fire to open the distant door?",
    choices: ["Only after reaching the highest flat section", "When her cannon is level with the top of the third hill", "While crouching at the foot of the first hill", "After running into the door cap"], answer: 1,
    explanation: "Waiting until the top level puts a Metaree in the shot's path. Firing from the third hill sends the beam through before the enemy interferes.",
    source: "https://wiki.supermetroid.run/Speed_Booster_Hall"
  },
  {
    category: "Speedrun tech", level: "Medium", title: "Under the Stalactite",
    question: "Entering Amphitheatre in a spin jump, where should Samus start gaining height with Space Jump?",
    choices: ["Just beyond the lowest stalactite", "Immediately inside the door, before she moves forward", "Directly under the tip of the lowest stalactite", "Only after landing on the floor"], answer: 0,
    explanation: "A descending Space Jump carries Samus under the overhang. Once she clears it, she has room to climb to the high platform.",
    source: "https://wiki.supermetroid.run/Amphitheatre"
  },
  {
    category: "Speedrun tech", level: "Hard", title: "Half a Block Pair",
    question: "For the floor clip toward the Wrecked Ship attic, which part of a vertical pair of blocks does Samus break?",
    choices: ["Only the lower block", "Both blocks with one shot", "Neither block until after the jump", "Only the upper block"], answer: 3,
    explanation: "Jumping into the upper space and angling down embeds Samus's feet in the remaining block. Her next jump takes her through the floor overhead.",
    source: "https://wiki.supermetroid.run/Wrecked_Ship_Main_Shaft"
  },
  {
    category: "Speedrun tech", level: "Medium", title: "Islands as Crosshairs",
    question: "Where do runners line up Mt. Everest's usual diagonal shinespark to the upper-right door?",
    choices: ["Against the left side of the first island", "Directly under the right-hand door", "On the highest point of the fourth island", "Between the second and third floating islands"], answer: 3,
    explanation: "The charge comes from the floor. The gap between the second and third islands marks the launch position for the diagonal flight.",
    source: "https://wiki.supermetroid.run/Mt._Everest"
  },
  {
    category: "Speedrun tech", level: "Hard", title: "A Jump at the Threshold",
    question: "What does a last-frame jump into Fish Tank from Main Street let Samus reach directly?",
    choices: ["The aqueduct's underwater save station", "The top edge of the room in one jump", "The middle ledge for a shot toward the Mt. Everest door", "The hidden missile behind the entry door"], answer: 2,
    explanation: "Carrying that jump through the transition gives Samus the height for the middle ledge. A shot from there opens the door she will wall-jump toward.",
    source: "https://wiki.supermetroid.run/Fish_Tank"
  },
  {
    category: "Routes & rules", level: "Medium", title: "Paying in Missiles",
    question: "A PRKD runner wants to enter Green Brinstar with full health. How should they handle the green pirates in the shaft?",
    choices: ["Missile each pirate and pick up a missile drop from the second or later one", "Take a hit from every other pirate and keep running", "Let the pirates walk off the platforms before crossing", "Keep all five missiles and jump straight into the first pirate"], answer: 0,
    explanation: "One missile per pirate saves the health a runner would lose running through them. A timely ammo drop leaves enough missiles to work with in Green Brinstar.",
    source: "https://wiki.supermetroid.run/Green_Pirates_Shaft"
  },
  {
    category: "Routes & rules", level: "Medium", title: "Two Cuts per Pillar",
    question: "Coming back from Lower Norfair, why use regular bombs on Single Chamber's pillars when a Power Bomb works?",
    choices: ["The upper sections hide ammo needed two rooms later", "Bombing just the bottom two sections avoids substantial lag", "A Power Bomb would seal the exit until the pillars regrow", "Regular bombs prevent the pillars from returning on a revisit"], answer: 1,
    explanation: "A Power Bomb destroys more of the pillars and slows the game. With good movement, clearing only the passage Samus needs costs less time.",
    source: "https://wiki.supermetroid.run/Single_Chamber"
  },
  {
    category: "Routes & rules", level: "Medium", title: "Ice on the First Visit",
    question: "On the return to Norfair, what shortcut through Business Center does an Early Ice route allow?",
    choices: ["Take the elevator directly to Ridley's room", "Take the lower door straight into the Ice Beam return tunnel", "Skip the entire corridor by entering Ice Beam's statue", "Go straight from the elevator toward Frog Speedway"], answer: 3,
    explanation: "With Ice Beam already collected, Samus can head straight for Frog Speedway on this visit and build speed going into the save room.",
    source: "https://wiki.supermetroid.run/Business_Center"
  },
  {
    category: "Routes & rules", level: "Medium", title: "One Door Both Ways",
    question: "For the Mickey Mouse Room missile, why does a 100% runner use the top door going in and coming out?",
    choices: ["Crumble blocks make the approach and return depend on staying above them", "The bottom door checks whether Samus has the missile", "The top door is the only one that accepts Super Missiles", "A shutter closes forever once the missile is collected"], answer: 0,
    explanation: "The approach comes from above. Falling through the crumble blocks after collecting the missile would spoil the return through that same door.",
    source: "https://wiki.supermetroid.run/Mickey_Mouse_Room"
  },
  {
    category: "Routes & rules", level: "Medium", title: "Taking the Robot Bounce",
    question: "A runner skips the short-charge speedball in the Wrecked Ship Basement. What's a common alternative?",
    choices: ["Wait on the left edge until the workrobot opens a trapdoor", "Stand on the robot until it rides up to the ceiling", "Jump off the platform's right edge and bounceball on the workrobot", "Shoot the robot out of the way before attempting a mockball"], answer: 2,
    explanation: "The bounceball uses the robot as a landing point. The speedball line starts on the other side of the platform and jumps over it.",
    source: "https://wiki.supermetroid.run/Basement"
  },
  {
    category: "Routes & rules", level: "Hard", title: "Trapped in the Aqueduct",
    question: "On the blue-suit shortcut to Aqueduct's right sandpit, what mistake can trap Samus?",
    choices: ["Entering the sand with fewer than ten missiles", "Turning off Gravity Suit while standing on the save tile", "Breaking through the respawning blocks above while leaving the permanent blocks below intact", "Reaching the right wall before the temporary blue suit wears off"], answer: 2,
    explanation: "The upper blocks can reform behind Samus. If the lower set still seals the way forward, she is boxed in.",
    source: "https://wiki.supermetroid.run/Aqueduct"
  },
  {
    category: "Routes & rules", level: "Medium", title: "When the Acid Rises",
    question: "After Samus descends to the bottom of Tourian Escape Room 4, what starts the acid filling the room?",
    choices: ["Hitting the bottommost platform", "Firing her first Hyper Beam shot", "Letting the escape clock reach one minute", "Beginning to move to the right"], answer: 3,
    explanation: "Reaching the bottom sets up the chase. Movement to the right triggers the acid, so its timing follows the runner's movement.",
    source: "https://wiki.supermetroid.run/Tourian_Escape_Room_4"
  },
  {
    category: "Routes & rules", level: "Medium", title: "Building a Runway",
    question: "In the Crateria Super Room, how can four Boyons help a runner reach the Super Missile?",
    choices: ["Line them up to reflect missiles through the ceiling", "Freeze them and use their backs as a runway to charge a shinespark", "Use their hits to gain height without touching the floor", "Make them jump at once to lift the Super Missile platform"], answer: 1,
    explanation: "A single shot from a crouch can freeze all four in a suitable setup. Samus can then back up and run across them.",
    source: "https://wiki.supermetroid.run/Crateria_Super_Room"
  },
  {
    category: "Routes & rules", level: "Hard", title: "A Longer Run-Up",
    question: "Main Street's floor-level short charge for the missile is giving a runner trouble. Where is there room for an easier two-tap charge?",
    choices: ["In the shaft below the elevator to Green Brinstar", "On top of the broken glass tube", "On the platform by the Fish Tank door", "On the door cap in the sandpit"], answer: 2,
    explanation: "Moving up to the Fish Tank platform trades a little travel time for a friendlier charge. The optimal floor route needs a much tighter short charge.",
    source: "https://wiki.supermetroid.run/Main_Street"
  },
  {
    category: "Routes & rules", level: "Hard", title: "The Hypo Jump",
    question: "In the Worst Room in the Game, what is the Hypo Jump used to clear without Hi-Jump Boots?",
    choices: ["The pit of acid just outside Ridley's door", "The ledge with the bomb blocks", "The green gate on the route to Screw Attack", "The spikes at the entrance to Golden Torizo"], answer: 1,
    explanation: "A delayed wall jump gives Samus the reach to pass that ledge. Without the boots the setup demands exceptionally precise positioning and timing.",
    source: "https://wiki.supermetroid.run/The_Worst_Room_In_The_Game"
  },
  {
    category: "Runners & races", level: "Hard", title: "Leaving the hook behind",
    question: "In Saturn’s 2012 Reverse Boss Order TAS, which pickup lost its place once faster Maridia techniques were available?",
    choices: ["Morph Ball", "Grappling Beam", "Bombs", "Super Missiles"], answer: 1,
    explanation: "Saturn identified the Grapple detour as the biggest cut from the preceding RBO movie.",
    source: "https://tasvideos.org/3652S"
  },
  {
    category: "Runners & races", level: "Hard", title: "The second screening",
    question: "Why did Sniq offer a second video of the same 100% tool-assisted run?",
    choices: ["It replaced emulator inputs with live play", "It ended with the animals saved", "It used a different boss order", "PJBoy’s script corrected the graphics"], answer: 3,
    explanation: "PJBoy’s script repaired how the graphics looked in that encode. Both videos show the same run.",
    source: "https://tasvideos.org/6381S"
  },
  {
    category: "Runners & races", level: "Medium", title: "Extra controllers",
    question: "In JXQ’s all-items TAS, why were controllers two through five registering inputs in a single-player game?",
    choices: ["Four assistants controlled Samus’s aim", "The controllers moved the camera", "Each controller selected a beam", "JXQ animated the input display"], answer: 3,
    explanation: "JXQ wrote an Input Animator for the display. The extra controllers’ inputs could be removed from the movie.",
    source: "https://tasvideos.org/1483S"
  },
  {
    category: "Runners & races", level: "Hard", title: "Thirteen-item breakthrough",
    question: "Sniq’s 13% TAS saved a pickup over the earlier 14% Speed route. Which upgrade did the new route leave behind?",
    choices: ["Power Bombs", "Speed Booster", "Gravity Suit", "Morph Ball"], answer: 2,
    explanation: "Research with EternisedDragon made it possible to cross Maridia without Gravity while keeping the run in bounds.",
    source: "https://tasvideos.org/5291S"
  },
  {
    category: "Runners & races", level: "Hard", title: "A mapmaker’s credit",
    question: "Whom did nymx and EternisedDragon credit for map-completion concepts and routing in their second full-map TAS?",
    choices: ["Frenom", "SweetNumb", "Terimakasih", "PJBoy"], answer: 1,
    explanation: "SweetNumb contributed knowledge of the map category. The TAS authors separately credited others for movement and timing tools.",
    source: "https://tasvideos.org/5110S"
  },
  {
    category: "Runners & races", level: "Medium", title: "Which movie is faster?",
    question: "Cpadolf submitted an Any% TAS that took longer to watch than the published real-time run. Which result did it improve?",
    choices: ["The in-game clear time", "The time to collect Morph Ball alone", "The number of map squares filled", "The item collection percentage"], answer: 0,
    explanation: "Cpadolf accepted extra room transitions and pickups to bring the game clock down by about 87 seconds.",
    source: "https://tasvideos.org/1686S"
  },
  {
    category: "Runners & races", level: "Hard", title: "Four pickups over budget",
    question: "What was the starting point for hero_of_the_day’s 40:57 real-time Any% TAS route?",
    choices: ["A map route with four rooms removed", "A bossless route with four doors restored", "A 100% route with four tanks removed", "A 14% route with four extra pickups"], answer: 3,
    explanation: "Those four additions bought enough movement or firepower to justify their pickup time.",
    source: "https://tasvideos.org/1441S"
  },
  {
    category: "Runners & races", level: "Medium", title: "Tourian without Ice",
    question: "NameSpoofer chose Speed Booster over Ice Beam for a 14% TAS. What cleared the Metroids in Tourian?",
    choices: ["A charged Spazer shot", "Screw Attack", "Power Bombs", "The Grappling Beam"], answer: 2,
    explanation: "The Speed route reaches Tourian without a freezing beam. Power Bombs do the work there.",
    source: "https://tasvideos.org/2449S"
  },
  {
    category: "Runners & races", level: "Hard", title: "Farming for the next region",
    question: "In Taco, Kriole and hero_of_the_day’s RBO TAS, why gather Power Bomb drops near Ridley on the way back out?",
    choices: ["To disable the Golden Four statues", "To open a yellow door in Tourian", "To skip the Wrecked Ship power outage", "To pay for a Crystal Flash during Draygon"], answer: 3,
    explanation: "The authors needed ammo for Draygon and had a better chance to replenish Power Bombs in Norfair than in Maridia.",
    source: "https://tasvideos.org/3410S"
  },
  {
    category: "Runners & races", level: "Hard", title: "An extra pack pays off",
    question: "Taco and Kriole collected an extra Power Bomb pack in their 38:41 Any% TAS. What did they use against Ridley and Mother Brain?",
    choices: ["Power Bomb beam shields", "The Grapple electrocution", "Frozen enemy contact damage", "The Speed Booster echoes"], answer: 0,
    explanation: "Special beam attacks spend Power Bomb ammo. The route dropped Spazer and put that extra ammo to work in both fights.",
    source: "https://tasvideos.org/2429S"
  },
  {
    category: "Runners & races", level: "Hard", title: "Credit behind the skip",
    question: "Cpadolf and hero_of_the_day credited whom for the Tourian break-in and Mother Brain skip behind their six-item TAS?",
    choices: ["Kejardon", "JXQ", "Garrison", "ShinyZeni"], answer: 0,
    explanation: "Kejardon demonstrated the two shortcuts. The TAS team found a way into Tourian with still fewer prerequisites.",
    source: "https://tasvideos.org/2022S"
  },
  {
    category: "Runners & races", level: "Medium", title: "An unlikely Any% detour",
    question: "Which optional pickup did Sniq estimate saved about eleven seconds across the 35:58 Any% TAS?",
    choices: ["Spazer", "Spring Ball", "X-Ray Scope", "Grappling Beam"], answer: 2,
    explanation: "Multiple uses of X-Ray made the trip to collect the scope worthwhile, even in a movie optimized for real time.",
    source: "https://tasvideos.org/5833S"
  },
  {
    category: "Runners & races", level: "Hard", title: "A very well-stocked Samus",
    question: "Why did amaurea, Cpadolf and total hurry to Golden Torizo in their 14:52 game-end-glitch TAS?",
    choices: ["Its Energy Tank opened a new ending", "A code there granted much of Samus’s equipment", "That boss alone unlocked Mother Brain", "Its room had the shortest escape timer"], answer: 1,
    explanation: "The team routed around the GT Code’s instant equipment and ammo grant. That explains the unusually high collection display.",
    source: "https://tasvideos.org/4224S"
  },
  {
    category: "Runners & races", level: "Hard", title: "The missing beam loadout",
    question: "Why did Terimakasih leave the Murder Beam out of the 14% Ice TAS, despite long Ridley and Mother Brain fights?",
    choices: ["The glitch needed beams the route had skipped", "A save station had to be used first", "The PAL version had removed the beam", "The bosses were immune to all beams"], answer: 0,
    explanation: "The author answered that question directly in the submission notes. Collecting the required beams would change the category.",
    source: "https://tasvideos.org/455S"
  },
  {
    category: "Runners & races", level: "Medium", title: "The 2004 time dispute",
    question: "Why did Frenom’s 53-minute TAS initially look slower than a 51-minute run mentioned by a reviewer?",
    choices: ["The two figures came from different clocks", "The videos used different language settings", "Only the TAS saved the animals", "Only the live run skipped Ceres"], answer: 0,
    explanation: "Frenom’s July 2004 movie ran about 53 minutes in real time. Its end screen read 34 minutes.",
    source: "https://tasvideos.org/115S"
  },
  {
    category: "Runners & races", level: "Hard", title: "A shared opening",
    question: "For a tool-assisted Spore Spawn sprint, whose 100% movie did nymx use as the basis for the opening inputs?",
    choices: ["Cpadolf’s", "Hotarubi’s", "Krauser’s", "Zoast’s"], answer: 0,
    explanation: "The routes shared early ground. The script diverged around the skipped Energy Tank and used fresh inputs in Brinstar.",
    source: "https://tasvideos.org/4481S"
  },
  {
    category: "Runners & races", level: "Hard", title: "The slower stopwatch",
    question: "Cpadolf’s 100% TAS dropped the in-game display from 0:36 to 0:34. What else helped explain a slower real-time movie?",
    choices: ["The new movie ran on the PAL cartridge", "The new route saved before every boss", "The new emulator reproduced timing more accurately", "The new route stopped at every map station"], answer: 2,
    explanation: "Cpadolf cited the move to more accurate emulation alongside the decision to optimize the game clock.",
    source: "https://tasvideos.org/4030S"
  },
  {
    category: "Runners & races", level: "Hard", title: "Five fewer pauses",
    question: "In Sniq’s 6:50 zero-item TAS, where did changing Samus’s backward movement remove five pauses?",
    choices: ["In Ridley’s refill room", "At the Green Brinstar door skip", "At the Tourian statues", "In the Ceres elevator"], answer: 1,
    explanation: "The revised movement covered more distance per pause. That one door accounted for most of the improvement.",
    source: "https://tasvideos.org/5856S"
  },
  {
    category: "Runners & races", level: "Medium", title: "Circling the hatchling",
    question: "What did Stashio reverse in a 2022 demonstration of Baby Skip?",
    choices: ["The order of the four Tourian Metroid rooms", "The order of Ice and Power Bomb shots", "The direction Samus circled the hatchling", "The direction of the escape elevator"], answer: 2,
    explanation: "Stashio went clockwise. The video notes say later refinements made that direction faster than the earlier counterclockwise version.",
    source: "https://www.youtube.com/watch?v=ppB2PwOT7y0"
  },
  {
    category: "Runners & races", level: "Medium", title: "A lighter lava dive",
    question: "Cardweaver demonstrated a Lava Dive while missing two upgrades. Which pair stayed out of the inventory?",
    choices: ["Morph Ball and Bombs", "Hi-Jump Boots and Gravity Suit", "Speed Booster and Ice Beam", "Spring Ball and Grappling Beam"], answer: 1,
    explanation: "The demonstration crossed the lava without the extra jump height or the suit normally associated with the dive.",
    source: "https://www.youtube.com/watch?v=SY2x09oWRP0"
  },
  {
    category: "Runners & races", level: "Medium", title: "An empty tank row",
    question: "Which resource did BFrobber deliberately leave at zero pickups for a Lava Dive demonstration?",
    choices: ["Energy Tanks", "Power Bomb packs", "Super Missile packs", "Missile Tanks"], answer: 0,
    explanation: "The point of the demonstration was surviving the dive without expanding Samus’s base energy capacity.",
    source: "https://www.youtube.com/watch?v=7zRaT6j25jw"
  },
  {
    category: "Runners & races", level: "Hard", title: "An escape with no deadline",
    question: "In the “Escape-Escape” demonstration, which boss did the player leave alive until the planet’s countdown was running?",
    choices: ["Draygon", "Phantoon", "Kraid", "Ridley"], answer: 0,
    explanation: "Defeating Draygon during the escape removed the countdown. Samus could keep exploring with Hyper Beam.",
    source: "https://www.youtube.com/watch?v=vt0Ty4bS17A"
  },
  {
    category: "Runners & races", level: "Hard", title: "The pickup behind the gate",
    question: "Which upgrade did SUPERMETROIDFTP reach early in a slope-spark demonstration that passed a metal gate?",
    choices: ["Gravity Suit", "Plasma Beam", "Screw Attack", "Spring Ball"], answer: 1,
    explanation: "The recorded demonstration used extreme movement speed to get Samus to the far side of the gate guarding Plasma.",
    source: "https://www.youtube.com/watch?v=9JJ0eLwRWSI"
  },
  {
    category: "Runners & races", level: "Hard", title: "A hazard as a tool",
    question: "Which hazard did EternisedDragon use in the delayed spark demonstration that helped lead to the 13% TAS?",
    choices: ["Spikes", "Acid", "A closing shutter", "A Rinka"], answer: 0,
    explanation: "The demonstration used a spike hit to leave Samus with a stored shinespark. Sniq later explored related setups.",
    source: "https://www.youtube.com/watch?v=iXm-Z_H-cq0"
  },
  {
    category: "Runners & races", level: "Hard", title: "The new Gauntlet slot",
    question: "In zoast’s 1:16:39 all-items run, when did the route visit the Crateria Gauntlet?",
    choices: ["Before collecting Morph Ball", "Immediately before Tourian", "During the final escape", "After the Wrecked Ship"], answer: 3,
    explanation: "Zoast compared the route with Hotarubi’s and Behemoth’s older runs, which left the Gauntlet until late cleanup.",
    source: "https://www.youtube.com/watch?v=a8NU-aqfZgI"
  },
  {
    category: "Runners & races", level: "Hard", title: "Plasma on the clock",
    question: "Why did zoast say Plasma Beam was worth the trip on the route that displayed 0:26 in game?",
    choices: ["Plasma removes the Golden Four cutscene", "Plasma refills every Super Missile pack", "The game clock excludes door transitions", "Collecting Plasma cancels elevator rides"], answer: 2,
    explanation: "The detour crosses extra doors. With transition time excluded, the faster combat can pay for the trip on the game clock.",
    source: "https://www.youtube.com/watch?v=C1HRc-zpoKQ"
  },
  {
    category: "Runners & races", level: "Medium", title: "Practice before the chase",
    question: "What originally brought ShinyZeni back to serious Any% practice before the January 2025 run of 40:22?",
    choices: ["Preparing a blindfolded run", "Testing a new randomizer tournament seed", "Building consistency for the SGDQ 2024 race", "Switching the category to PAL"], answer: 2,
    explanation: "Zeni’s run notes trace the push back to April 2024. The effort started with race consistency and continued into personal-best attempts.",
    source: "https://www.youtube.com/watch?v=sGgzxe-MZWw"
  },
  {
    category: "Runners & races", level: "Hard", title: "A route from a rival",
    question: "Whom did Just_Defend credit for suggesting the route and working on Tourian for a 1:03:01 Low% Speed run?",
    choices: ["Saturn", "azder", "Overfiend", "Hotarubi"], answer: 2,
    explanation: "The recording credits Overfiend for the route and Tourian strategies. Just_Defend recalls barely surviving Mother Brain’s second phase.",
    source: "https://www.youtube.com/watch?v=q5wXVfgoIc4"
  },
  {
    category: "Runners & races", level: "Hard", title: "Why run on PAL?",
    question: "In total’s 2015 Low% Iceboots notes, which obstacle did the PAL version’s suitless water movement make passable?",
    choices: ["Crossing the Crateria moat", "Breaking the Golden Four seal", "Getting out after Draygon", "Opening the Maridia glass tube"], answer: 2,
    explanation: "The regional difference mattered on the way out of Draygon’s room with this particular equipment loadout.",
    source: "https://www.youtube.com/watch?v=jGq6bIKCBE0"
  },
  {
    category: "Runners & races", level: "Medium", title: "Beyond the cartridge",
    question: "Which platform did eHolden use for the 1:13:00 Low% X-Ice recording published in 2022?",
    choices: ["Virtual Boy", "Game Boy Advance", "Nintendo DS", "Nintendo Switch"], answer: 3,
    explanation: "The recording identifies the Switch release. X-Ice is one of several distinct 14% routes.",
    source: "https://www.youtube.com/watch?v=o4Fmmizxbz4"
  },
  {
    category: "Runners & races", level: "Medium", title: "One last detour",
    question: "Susreime’s 1:16:30 full-map run filled in Zebes and still made which choice during the escape?",
    choices: ["Refill at the Wrecked Ship", "Revisit Golden Torizo", "Pick up the Ridley tank", "Rescue the animals"], answer: 3,
    explanation: "Susreime explicitly notes the animal rescue in the recording, which finished with 49 minutes on the in-game clock.",
    source: "https://www.youtube.com/watch?v=zuJf0dfKRm0"
  },
  {
    category: "Runners & races", level: "Medium", title: "The Mockball Queen",
    question: "In June 2004 SDA proposed the nickname “Mockball Queen” for whose 0:55 all-items run?",
    choices: ["Red Scarlet", "Hotarubi", "Smokey", "Kottpower"], answer: 0,
    explanation: "Red Scarlet finished her run one day after Smokey’s 0:56. Both times referred to the in-game clock.",
    source: "https://speeddemosarchive.com/oldnews04q2.html"
  },
  {
    category: "Runners & races", level: "Hard", title: "Two endings on offer",
    question: "SDA offered both a 0:37 and a 0:36 ending for Smokey’s run. What did he change for the faster ending?",
    choices: ["Used Murder Beam on Mother Brain", "Took the Maridia tube early", "Added a tank before Ridley", "Skipped the first Kraid phase"], answer: 0,
    explanation: "The archive kept both versions. Changing the Mother Brain fight brought the displayed game time down a minute.",
    source: "https://speeddemosarchive.com/oldnews04q2.html"
  },
  {
    category: "Runners & races", level: "Hard", title: "The Friday crowd",
    question: "Which group did zoast credit with helping push real-time racing when describing the 2013 Any% run?",
    choices: ["The Metroid Prime Hunters ladder", "The SpeedRunsLive community", "The TASBot hardware team", "The Nintendo Power staff"], answer: 1,
    explanation: "Zoast recalled a Friday-night Any% race on SpeedRunsLive. An external clock made close finishes easier to compare.",
    source: "https://speeddemosarchive.com/SuperMetroid.html"
  },
  {
    category: "Runners & races", level: "Hard", title: "Teaching consistency",
    question: "Which runner did zoast thank for teaching the value of visual cues in the notes for the 2013 all-items run?",
    choices: ["DbX", "Reeve", "Dessyreqt", "Kottpower"], answer: 0,
    explanation: "DbX showed zoast how visible landmarks could make an input repeatable from one attempt to the next.",
    source: "https://speeddemosarchive.com/SuperMetroid.html"
  },
  {
    category: "Runners & races", level: "Medium", title: "Choosing a stopping point",
    question: "Why did Christopher Hill end one segment of his PAL 100% project at a Wrecked Ship save station?",
    choices: ["To reset the map percentage", "To avoid counting the ship as an item", "To isolate the Phantoon patterns", "To carry a shinespark into Tourian"], answer: 2,
    explanation: "The original segment continued toward Botwoon. A closer save let Hill work on favorable Phantoon patterns separately.",
    source: "https://speeddemosarchive.com/SuperMetroid.html"
  },
  {
    category: "Runners & races", level: "Hard", title: "A reliable refill",
    question: "Why did Christopher Hill stop at the Red Brinstar energy station in his segmented PAL 100% run?",
    choices: ["To save a Power Bomb for Botwoon", "To force an early Ridley grab", "To fund damage-heavy Wrecked Ship tricks", "To give the Spazer Beam extra damage"], answer: 2,
    explanation: "The station offered a predictable refill. Farming enemies earlier would have left more opportunities to lose that energy before the ship.",
    source: "https://speeddemosarchive.com/SuperMetroid.html"
  },
  {
    category: "Runners & races", level: "Medium", title: "Hard to call the lead",
    question: "Why did Dessyreqt say it was hard to judge Tranquilite’s deficit in the SGDQ 2011 100% race from their screens?",
    choices: ["They used different item totals", "They started in different areas", "They followed different routes", "They had different game speeds"], answer: 2,
    explanation: "Two runners collecting every pickup need not collect them in the same order. Their apparent positions could exaggerate the gap.",
    source: "https://www.youtube.com/watch?v=X6_douABSFg"
  },
  {
    category: "Runners & races", level: "Easy", title: "A crowded controller",
    question: "What did “2p1c” mean for Oatsngoats and sweetnumb at AGDQ 2016?",
    choices: ["Two consoles shared one save file", "Two players shared one cartridge in a relay", "Two players shared one controller", "Two runners each finished one category"], answer: 2,
    explanation: "Both players supplied inputs for the same Samus. They completed the co-op run in 52:01.",
    source: "https://www.youtube.com/watch?v=-UQaPy7H6WU"
  },
  {
    category: "Runners & races", level: "Medium", title: "The Impossible setback",
    question: "In Oatsngoats’s account of the AGDQ 2020 Impossible ROM hack run, which boss cost five deaths after a promising start?",
    choices: ["Botwoon", "Kraid", "Phantoon", "Ridley"], answer: 3,
    explanation: "Oats described losing track of shots during the Ridley attempts. A later backup strategy rescued the second Mother Brain attempt.",
    source: "https://www.youtube.com/watch?v=52bXJDoJeig"
  },
  {
    category: "Runners & races", level: "Medium", title: "Familiar rooms, new angles",
    question: "Which altered version of Zebes did feral5x run at AGDQ 2017?",
    choices: ["Hyper Metroid", "Super Metroid Rotation", "Super Metroid Ascent", "Super Metroid Impossible"], answer: 1,
    explanation: "Rotation reorients familiar rooms. The challenge was navigating the altered hack under marathon conditions.",
    source: "https://www.youtube.com/watch?v=y5S3gREX5TI"
  },
  {
    category: "Runners & races", level: "Hard", title: "An anniversary game board",
    question: "Which format did azder and Just_Defend play during GDQ’s 25th anniversary Super Metroid celebration?",
    choices: ["Map Randomizer", "Full-map relay", "Low% Ice", "Double Anti-Bingo"], answer: 3,
    explanation: "Their March 2019 match used a bingo board. Alucard2004 and crossproduct provided commentary.",
    source: "https://www.youtube.com/watch?v=TG70-wZONxY"
  },
  {
    category: "Runners & races", level: "Medium", title: "A seventeen-minute marathon run",
    question: "What kind of Super Metroid run did Ivan showcase in 17:11 at SGDQ 2014?",
    choices: ["Glitched Any%", "Reverse Boss Order", "100% Map", "14% Ice"], answer: 0,
    explanation: "GDQ listed Ivan’s run as Glitched Any%. Its category allowed major shortcuts outside the usual four-boss route.",
    source: "https://www.youtube.com/watch?v=UHhPjJPen3o"
  },
  {
    category: "Runners & races", level: "Medium", title: "A different kind of memory test",
    question: "Ponktus took on an extra constraint for a 100% run at Metroid Marathon 2019. What was it?",
    choices: ["Playing with a single button", "Playing blindfolded", "Playing a newly randomized map", "Playing on two consoles at once"], answer: 1,
    explanation: "SpeedGaming archived the run as blindfolded 100%. The challenge combined collecting every item with navigating without sight.",
    source: "https://www.youtube.com/watch?v=c04i0-o8JNc"
  },
  {
    category: "Runners & races", level: "Hard", title: "One hundred and one",
    question: "LinkaMeister and Sapphron raced to 101% at Metroid Marathon 2019. Which ROM hack used that target?",
    choices: ["Super Metroid Arrival", "Kaizo Super Metroid", "Super Metroid Rotation", "Hyper Metroid"], answer: 0,
    explanation: "The organizer labeled their Arrival race 101%. That completion target belongs to the hack.",
    source: "https://www.youtube.com/watch?v=nsm0cDLVvkU"
  },
  {
    category: "Runners & races", level: "Medium", title: "Sorting out the bosses",
    question: "What decided the order of fights in BluePlasmaSpark’s True ABO showcase at Metroid Marathon 2019?",
    choices: ["Room coordinates", "Alphabetical boss names", "Boss health totals", "Color of the area on the map"], answer: 1,
    explanation: "The event spelled the category out as True Alphabetical Boss Order. The boss names determined the route constraint.",
    source: "https://www.youtube.com/watch?v=okxFi88XNPc"
  },
  {
    category: "Runners & races", level: "Hard", title: "Four letters on the schedule",
    question: "Toastymuffins5 ran DPRK Any% at Metroid Marathon 2019. Which boss did that route save for fourth?",
    choices: ["Kraid", "Draygon", "Phantoon", "Ridley"], answer: 0,
    explanation: "Read the initials in order. The run went Draygon, Phantoon, Ridley, Kraid.",
    source: "https://www.youtube.com/watch?v=NT-h3yp5gDY"
  },
  {
    category: "Runners & races", level: "Medium", title: "Back to the Basement",
    question: "Which runner hosted Back to the Basement and opened its first day sharing a controller with zoast?",
    choices: ["Frenom", "Kottpower", "ShinyZeni", "sweetnumb"], answer: 2,
    explanation: "ShinyZeni described hosting the gathering at home. The opening event paired the two runners on one controller.",
    source: "https://www.youtube.com/watch?v=yp_9qKf09JY"
  },
  {
    category: "Runners & races", level: "Medium", title: "Running the schedule back",
    question: "Why was zoast’s 42:13 Any% run part of a Classic Games Done Quick celebration in 2019?",
    choices: ["Each runner used the original event’s controller", "Every game had to finish in under an hour", "It was a tournament for original world-record holders", "GDQ was replaying the original event’s schedule"], answer: 3,
    explanation: "For its tenth anniversary, GDQ revisited the lineup from its first marathon.",
    source: "https://www.youtube.com/watch?v=E8ATuVAel-A"
  },
  {
    category: "Runners & races", level: "Medium", title: "Who wrote the run?",
    question: "TASBot presented a 35:59 Super Metroid Any% run at AGDQ 2024. Who authored the tool-assisted performance?",
    choices: ["DarkXoa", "dwangoAC", "stump", "Sniq"], answer: 3,
    explanation: "GDQ billed the run under Sniq’s name. dwangoAC, DarkXoa and stump appeared on commentary.",
    source: "https://www.youtube.com/watch?v=jkwGTu1TNzE"
  },
  {
    category: "Runners & races", level: "Hard", title: "A missile on the way",
    question: "In Smokey and Red Scarlet’s early Wrecked Ship demonstration, what could Samus pick up during the crossing itself?",
    choices: ["An Energy Tank", "A Power Bomb pack", "A Missile Tank", "A Reserve Tank"], answer: 2,
    explanation: "Their shinespark carried Samus across without Grapple and put the Missile Tank on the flight path.",
    source: "https://www.metroid2002.com/3/speed_tricks_early_wrecked_ship_break-in.php"
  },
  {
    category: "Runners & races", level: "Hard", title: "The other side of the gate",
    question: "Metroid 2002 credits MathOnNapkins with a discovery involving which obstacle?",
    choices: ["A sandfall above Spring Ball", "A closing shutter in Early Supers", "A Zebetite in Mother Brain’s room", "A green gate approached from its wrong side"], answer: 3,
    explanation: "The documented trick opens a left-facing green switch from the far side using a Super Missile.",
    source: "https://www.metroid2002.com/3/speed_tricks_green_gate_glitch.php"
  },
  {
    category: "Runners & races", level: "Medium", title: "One pixel at a time",
    question: "Who is credited by Metroid 2002 with discovering that changing Samus’s arm angle can move her forward an extra pixel?",
    choices: ["Kejardon", "JXQ", "Michael Flatley", "David Wonn"], answer: 2,
    explanation: "The extra movement adds up across long stretches of running. Runners call the technique arm pumping.",
    source: "https://www.metroid2002.com/3/techniques_arm_pumping.php"
  },
  {
    category: "Runners & races", level: "Medium", title: "Walking away mid-refill",
    question: "In David Wonn’s remote recharge demonstration, what could Samus do while the station normally held her in place?",
    choices: ["Reload a previous save", "Move back toward the door", "Choose a different ammo type", "Carry the station to the next room"], answer: 1,
    explanation: "A well-timed pause let Samus start her exit during time otherwise spent standing at the refill.",
    source: "https://www.metroid2002.com/3/speed_tricks_refill_station_remote_recharge.php"
  },
  {
    category: "Runners & races", level: "Hard", title: "Water as a runway",
    question: "Why did Red Scarlet’s shinespark on the way to Gravity Suit make use of the rising water?",
    choices: ["The water supplied energy for the spark", "The tide removed the need for Speed Booster", "Submersion kept doors open longer", "The water slowed Samus while she built charge"], answer: 3,
    explanation: "Suitless underwater movement covered less ground while charging. A short stretch could serve as a usable runway.",
    source: "https://www.metroid2002.com/3/speed_tricks_gravity_suit_shinespark.php"
  },
  {
    category: "Runners & races", level: "Easy", title: "Missing one button",
    question: "Nate’s tongue-in-cheek Noob Bridge demonstration deliberately left which ordinary action off the table?",
    choices: ["Changing beam equipment", "Dashing", "Canceling a missile", "Aiming diagonally"], answer: 1,
    explanation: "The demonstration turned an infamous beginner obstacle into a challenge by removing the straightforward way across.",
    source: "https://www.metroid2002.com/3/other_noob_bridge_without_run_button.php"
  },
  {
    category: "Runners & races", level: "Medium", title: "The hidden rulebook",
    question: "In the DASH Mystery tournament, runners discovered the settings as they played. What goal stayed fixed?",
    choices: ["Defeat the four main bosses and Mother Brain, then escape", "Collect every major item before entering Tourian", "Fill the map before fighting the last boss", "Defeat the four bosses in reverse order"], answer: 0,
    explanation: "The race could shuffle bosses, areas and items. The organizers kept the finish condition consistent across those combinations.",
    source: "https://www.dashrando.net/events/mystery/info"
  },
  {
    category: "Runners & races", level: "Hard", title: "An accidental spoiler",
    question: "Why did DASH Mystery organizers prohibit the FUNtoon2SNES room-time tracker during races?",
    choices: ["It showed the opponent’s item count", "It could reveal which boss shuffle was active", "It automatically selected the strongest beam", "It paused the game at every transition"], answer: 1,
    explanation: "The tracker could distinguish Surprise from Shifted boss settings. Discovering the settings was part of the competition.",
    source: "https://www.dashrando.net/events/mystery/info"
  },
  {
    category: "Runners & races", level: "Medium", title: "Running a race at different times",
    question: "In a DASH Mystery asynchronous match, what did the first runner do to keep the seed hidden from the second?",
    choices: ["Hide only the missile counter on stream", "Record locally and give the organizer an unlisted video", "Play a second seed with identical settings", "Play without saving the run"], answer: 1,
    explanation: "A local recording preserved a checkable result while keeping the first trip through the seed off a public stream.",
    source: "https://www.dashrando.net/events/mystery/info"
  },
  {
    category: "Runners & races", level: "Hard", title: "The randomizer family tree",
    question: "DASH grew out of the item randomizer used at the 2017 Super Metroid Randomizer Tournament. Who developed that predecessor?",
    choices: ["Frenom", "Kewlan", "Total", "Maddo"], answer: 2,
    explanation: "The DASH team credits Total’s item randomizer as its foundation. DASH expanded the options available to competitive runners.",
    source: "https://www.dashrando.net/"
  },
  {
    category: "Runners & races", level: "Medium", title: "A fair draw",
    question: "What did Dessyreqt’s original item randomizer recommend racers share before starting?",
    choices: ["A save after the first boss", "The same random seed", "A completed spoiler log", "A preset number of deaths"], answer: 1,
    explanation: "Sharing a seed gives each player the same item placement. Their different decisions can then be compared on equal footing.",
    source: "https://github.com/Dessyreqt/smrandomizer"
  },
  {
    category: "Runners & races", level: "Hard", title: "An unusual first pickup",
    question: "In Dessyreqt’s randomizer guide, a runner finds Speed Booster first. Which technique gets them past the bomb blocks left of the ship?",
    choices: ["A gravity jump", "A short charge", "A crystal flash", "A midair springball"], answer: 1,
    explanation: "The guide points to that exact starting situation. Delaying dash leaves enough runway to enter the blocks with blue speed.",
    source: "https://github.com/Dessyreqt/smrandomizer"
  },
  {
    category: "Runners & races", level: "Hard", title: "Designing a new Zebes",
    question: "Who shares the game-design credit with kyleb and is also credited with Map Rando’s map generation and escape timings?",
    choices: ["Osse101", "Maddo", "Kewlan", "Selicre"], answer: 1,
    explanation: "The project separates its design credit from the generator, which must fit rooms together and set a workable escape deadline.",
    source: "https://maprando.com/about"
  },
  {
    category: "Runners & races", level: "Medium", title: "A timer that fits the seed",
    question: "In Map Rando, what does the generator use when setting the final countdown for a shuffled world?",
    choices: ["The estimated route from Mother Brain to the ship", "The number of collected Missile Tanks", "The original region containing Mother Brain", "The runner’s time at the fourth boss"], answer: 0,
    explanation: "A shuffled map can put the ship much closer or farther away. The project computes a route before setting the escape time.",
    source: "https://maprando.com/about"
  },
  {
    category: "Runners & races", level: "Medium", title: "What survives a wipe?",
    question: "A Map Rando racer dies after exploring an unfamiliar branch. Which information did the designers let the player keep?",
    choices: ["Damage dealt to the last boss", "The map tiles they explored", "Their last stored shinespark", "The pickups since their last save"], answer: 1,
    explanation: "Persistent map knowledge helps the runner recognize hazards and reconsider the path after reloading.",
    source: "https://maprando.com/about"
  },
  {
    category: "Runners & races", level: "Medium", title: "What cost the frames?",
    question: "The community practice hack shows one door time before a transition and a total afterward. What does the first number measure?",
    choices: ["The next room’s enemy load time", "The time spent pointing at the door", "The previous item fanfare", "Door alignment time"], answer: 3,
    explanation: "The two readouts let a runner distinguish alignment delays from the full cost of the transition.",
    source: "https://smpractice.speedga.me/help"
  },
  {
    category: "Runners & races", level: "Medium", title: "A pair of connected worlds",
    question: "Which crossover format did Alucard2004 and Solski showcase at SpeedGaming Live 2019?",
    choices: ["SMZ3 Multiworld", "DASH Mystery", "Rotation co-op", "Map Rando bingo"], answer: 0,
    explanation: "Their run used the Super Metroid and Zelda crossover in its multiworld format, with players exploring connected games.",
    source: "https://www.youtube.com/watch?v=URODYA7lG6A"
  },
  {
    category: "Runners & races", level: "Easy", title: "Forty-one minutes together",
    question: "Zoast and ShinyZeni finished the SGDQ 2023 co-op run in 41:14. What were they working toward together?",
    choices: ["100% item collection", "A blindfolded four-boss relay", "A reverse-order map bingo", "All rooms without collecting items"], answer: 0,
    explanation: "The finale featured co-op 100%. The two runners could divide the work of collecting Zebes’s items.",
    source: "https://www.youtube.com/watch?v=ilG70fc-IJA"
  },
  {
    category: "Runners & races", level: "Medium", title: "An unconventional finish line",
    question: "Which offbeat short category did ptoil showcase at Metroid Marathon 2019?",
    choices: ["Gauntlet RTA", "Spore Spawn RTA", "Beat the Ceres Clock", "Tickle the Fish RTA"], answer: 3,
    explanation: "The target is the red fish in Maridia. Reaching it with Grappling Beam supplies the finish.",
    source: "https://www.youtube.com/watch?v=jKV8uFGs4Ik"
  },
  {
    category: "Runners & races", level: "Hard", title: "More than a full inventory",
    question: "Hypo and susreime appeared together at RTA in Japan 2019. Which category made the Golden Torizo code part of an item-count challenge?",
    choices: ["Low% Ice", "GT Classic", "Max% GT Code", "100% Map"], answer: 2,
    explanation: "The event lists Max% GT Code. Using the code changes what item percentage a runner can aim for.",
    source: "https://www.youtube.com/watch?v=8dXi7pfGndQ"
  },
  {
    category: "Runners & races", level: "Medium", title: "Two games, two blindfolds",
    question: "For a blindfolded cross-game race at Metroid Marathon 2019, which game ran alongside Super Metroid?",
    choices: ["Metroid II", "Metroid: Zero Mission", "Metroid Prime", "Metroid Fusion"], answer: 1,
    explanation: "SpeedGaming paired the Super Nintendo game with Zero Mission for a blindfolded Any% race across different games.",
    source: "https://www.youtube.com/watch?v=mJ7tKLE93_o"
  },
  {
    category: "Runners & races", level: "Hard", title: "Golden Torizo as a team",
    question: "ESA Winter 2026 paired Dyce_NL and Soren for which co-op category?",
    choices: ["Full-map bingo", "Reverse Boss Order", "Low% X-Ice", "GT Classic"], answer: 3,
    explanation: "ESA’s run archive lists the cooperative version of GT Classic, a category built around the Golden Torizo equipment code.",
    source: "https://www.youtube.com/watch?v=dZo9dckSL_0"
  },
  {
    category: "Runners & races", level: "Easy", title: "A different Zebes for summer",
    question: "Two years after showcasing Impossible at AGDQ, what did Oatsngoats play at SGDQ 2022?",
    choices: ["Super Metroid Rotation", "Hyper Metroid", "Super Metroid Arrival", "Kaizo Super Metroid"], answer: 3,
    explanation: "The 2022 marathon featured another difficulty hack. GDQ archived the Kaizo performance at 2:28:19.",
    source: "https://www.youtube.com/watch?v=rjXprx6ulGs"
  },
  {
    category: "Runners & races", level: "Hard", title: "The hatchling on a good split",
    question: "What did ShinyZeni specifically celebrate landing in the recording of the 56:35 Reverse Boss Order run?",
    choices: ["The moat wall jump", "Early Ice", "A one-round Botwoon", "Baby Skip"], answer: 3,
    explanation: "The runner singled out Baby Skip in the upload notes. Avoiding the giant Metroid’s grab saves time late in Tourian.",
    source: "https://www.youtube.com/watch?v=9u7QAmkF_7o"
  },
  {
    category: "Runners & races", level: "Medium", title: "An archive opens",
    question: "Whose 100% run appeared alongside a 72% NBMB challenge when Metroid 2002 launched its Super Metroid section in 2004?",
    choices: ["David Clemens", "Tranquilite", "Red Scarlet", "Ultima4701"], answer: 2,
    explanation: "The site’s February 8 launch announcement lists both of Red Scarlet’s runs. Her all-items clear displayed one hour.",
    source: "https://www.metroid2002.com/3/"
  },
  {
    category: "Development", level: "Medium", title: "A scene on tape",
    question: "How did director Yoshio Sakamoto show the team the mood he wanted for the opening sequence?",
    choices: ["He staged it with clay figures", "He wrote a radio play", "He made a VHS video", "He cut together footage from the NES game"], answer: 2,
    explanation: "Sakamoto used a camcorder to sketch the sequence before the team built it in the game.",
    source: "https://www.nintendo.com/en-gb/News/2017/September/Nintendo-Classic-Mini-SNES-developer-interview-Volume-3-Super-Metroid-1285309.html"
  },
  {
    category: "Development", level: "Medium", title: "Roadside recording",
    question: "Kenji Yamamoto thought of the opening theme on his motorbike. How did he save the idea?",
    choices: ["He pulled over and sang into a recorder", "He wrote sheet music on his helmet", "He called the office answering machine", "He programmed it into a Game Boy"], answer: 0,
    explanation: "He stopped in a parking lot to record the melody. The next day he played a digitized version for Sakamoto.",
    source: "https://www.nintendo.com/en-gb/News/2017/September/Nintendo-Classic-Mini-SNES-developer-interview-Volume-3-Super-Metroid-1285309.html"
  },
  {
    category: "Development", level: "Hard", title: "Storm over Crateria",
    question: "Which earlier project gave Yamamoto practice timing the kind of lightning sound heard on Crateria?",
    choices: ["F-Zero", "Pilotwings", "Famicom Detective Club", "Kid Icarus"], answer: 2,
    explanation: "A lightning scene in Nintendo’s detective series had already pushed Yamamoto and Sakamoto to work on the timing of thunder.",
    source: "https://www.nintendo.com/en-gb/News/2017/September/Nintendo-Classic-Mini-SNES-developer-interview-Volume-3-Super-Metroid-1285309.html"
  },
  {
    category: "Development", level: "Medium", title: "More than one cry",
    question: "Why did the sound team give the hatchling several cries?",
    choices: ["To localize its voice for each language", "To signal different ammo drops", "To identify the region on the map", "To express different emotions"], answer: 3,
    explanation: "Sakamoto wanted players to hear the difference between the hatchling recognizing Samus and the hatchling being hurt.",
    source: "https://www.nintendo.com/en-gb/News/2017/September/Nintendo-Classic-Mini-SNES-developer-interview-Volume-3-Super-Metroid-1285309.html"
  },
  {
    category: "Development", level: "Hard", title: "Room on the sound chip",
    question: "How many simultaneous channels of recorded sound did Yamamoto say the Super NES offered?",
    choices: ["Eight", "Four", "Six", "Sixteen"], answer: 0,
    explanation: "The sound hardware let the team layer unusual textures such as the chorus in the score.",
    source: "https://www.nintendo.com/en-gb/News/2017/September/Nintendo-Classic-Mini-SNES-developer-interview-Volume-3-Super-Metroid-1285309.html"
  },
  {
    category: "Development", level: "Hard", title: "Green light",
    question: "Who proposed a Super NES Metroid to Yoshio Sakamoto and became its producer?",
    choices: ["Makoto Kano", "Kenji Yamamoto", "Minako Hamano", "Hirokazu Tanaka"], answer: 0,
    explanation: "Kano approached Sakamoto about the project and offered to put the development team in place.",
    source: "https://www.nintendo.com/en-gb/News/2017/September/Nintendo-Classic-Mini-SNES-developer-interview-Volume-3-Super-Metroid-1285309.html"
  },
  {
    category: "Development", level: "Medium", title: "An audience overseas",
    question: "What surprised Sakamoto on a trip to Seattle before Super Metroid went into development?",
    choices: ["A theater was showing a Metroid film", "A fan had built a Super NES prototype", "People in local shops recognized Metroid", "A shop already sold the sequel’s soundtrack"], answer: 2,
    explanation: "Nintendo of America staff introduced him as a Metroid developer. The recognition encouraged him to make a sequel.",
    source: "https://www.nintendo.com/en-gb/News/2017/September/Nintendo-Classic-Mini-SNES-developer-interview-Volume-3-Super-Metroid-1285309.html"
  },
  {
    category: "Development", level: "Medium", title: "Let the scene breathe",
    question: "Why did Sakamoto want a stretch of the final battle in which the player could do very little?",
    choices: ["To make the hatchling’s rescue feel desperate", "To hide a loading screen", "To give players time to change controls", "To stop the in-game clock"], answer: 0,
    explanation: "He wanted the player to experience Samus’s helplessness before the hatchling intervened.",
    source: "https://www.nintendo.com/en-gb/News/2017/September/Nintendo-Classic-Mini-SNES-developer-interview-Volume-3-Super-Metroid-1285309.html"
  },
  {
    category: "Development", level: "Hard", title: "Lunch for the team",
    question: "When producer Kano fetched lunch during the holiday crunch, how large was the development staff?",
    choices: ["Seven people", "Thirty-two people", "Sixty-four people", "Seventeen people"], answer: 3,
    explanation: "Sakamoto recalled a 17-person team and a producer who bought box lunches when the nearby restaurants were closed.",
    source: "https://www.nintendo.com/en-gb/News/2017/September/Nintendo-Classic-Mini-SNES-developer-interview-Volume-3-Super-Metroid-1285309.html"
  },
  {
    category: "Development", level: "Medium", title: "Back to the sound archive",
    question: "While working on which later game did Yamamoto reopen Super Metroid’s sound data to hear the baby’s cries?",
    choices: ["Metroid: Samus Returns", "Metroid Prime Hunters", "Metroid Fusion", "Metroid: Zero Mission"], answer: 0,
    explanation: "The 3DS remake brought him back to the original samples and the different feelings they conveyed.",
    source: "https://www.nintendo.com/en-gb/News/2017/September/Nintendo-Classic-Mini-SNES-developer-interview-Volume-3-Super-Metroid-1285309.html"
  },
  {
    category: "World & lore", level: "Easy", title: "Before the distress call",
    question: "On which planet did Samus find the hatchling before the events at Ceres?",
    choices: ["Zebes", "ZDR", "SR388", "Tallon IV"], answer: 2,
    explanation: "Samus encountered the newborn at the end of her mission on SR388, before taking it to the Federation.",
    source: "https://www.nintendo.com/au/news-and-articles/metroid-dread-report-vol-4-unravelling-a-saga-35-years-in-the-making/"
  },
  {
    category: "World & lore", level: "Medium", title: "A face at hatching",
    question: "Why does the last Metroid initially treat Samus as its mother?",
    choices: ["Her suit mimics a Queen’s call", "She fed it energy at Ceres", "She is the first creature it sees", "A scientist trained it to follow her"], answer: 2,
    explanation: "The newly hatched larva imprints on Samus. Their bond drives the events on Zebes.",
    source: "https://www.nintendo.com/au/news-and-articles/metroid-dread-report-vol-4-unravelling-a-saga-35-years-in-the-making/"
  },
  {
    category: "World & lore", level: "Medium", title: "After the Queen",
    question: "Which fight immediately precedes Samus’s discovery of the hatchling in the story leading into Super Metroid?",
    choices: ["The Queen Metroid on SR388", "Mother Brain in Tourian", "Ridley at Ceres", "Draygon in Maridia"], answer: 0,
    explanation: "After defeating the Queen, Samus meets a newborn and decides to spare it.",
    source: "https://www.nintendo.com/au/news-and-articles/metroid-dread-report-vol-4-unravelling-a-saga-35-years-in-the-making/"
  },
  {
    category: "World & lore", level: "Easy", title: "A civilian destination",
    question: "Before Ridley attacks, why has Samus brought the surviving Metroid to Federation scientists?",
    choices: ["To install it in a ship engine", "To let them study it", "To exchange it for an upgrade", "To train it as a tracker"], answer: 1,
    explanation: "The Federation’s Space Science Academy takes custody of the larva for research.",
    source: "https://www.nintendo.com/au/news-and-articles/metroid-dread-report-vol-4-unravelling-a-saga-35-years-in-the-making/"
  },
  {
    category: "World & lore", level: "Medium", title: "What the pirates want",
    question: "Why do the Space Pirates want the Ceres specimen alive?",
    choices: ["It knows the entrance code to Tourian", "Its shell is needed to repair Ridley", "It controls the weather on Zebes", "They want to weaponize its species"], answer: 3,
    explanation: "The hatchling gives the Pirates another chance to exploit the Metroids after Samus’s earlier missions.",
    source: "https://www.nintendo.com/au/news-and-articles/metroid-dread-report-vol-4-unravelling-a-saga-35-years-in-the-making/"
  },
  {
    category: "World & lore", level: "Easy", title: "A familiar fortress",
    question: "Why can the Pirates operate from Zebes again after Samus’s first mission there?",
    choices: ["Survivors have rebuilt the fortress", "Ceres has been renamed Zebes", "Samus is seeing a simulation", "The original fortress was on SR388"], answer: 0,
    explanation: "Super Metroid returns to the site of the first game after the surviving Pirates have rebuilt.",
    source: "https://www.nintendo.com/au/news-and-articles/metroid-dread-report-vol-4-unravelling-a-saga-35-years-in-the-making/"
  },
  {
    category: "World & lore", level: "Easy", title: "A number in the opening",
    question: "Which numbered title appears in the opening even though the box calls the game Super Metroid?",
    choices: ["Metroid 2", "Metroid 4", "Metroid 5", "Metroid 3"], answer: 3,
    explanation: "Super Metroid is third in the main 2D story, between Metroid II and Fusion.",
    source: "https://www.nintendo.com/au/news-and-articles/metroid-dread-report-vol-4-unravelling-a-saga-35-years-in-the-making/"
  },
  {
    category: "World & lore", level: "Medium", title: "A legacy in a cell culture",
    question: "How does the Ceres hatchling help Samus again in Metroid Fusion?",
    choices: ["Its shell becomes the Navigation Room", "Its cells are used to make a vaccine", "Its cry unlocks the B.S.L. elevators", "Its wings power her new ship"], answer: 1,
    explanation: "Scientists kept a cell culture. A vaccine derived from it gives Samus immunity to the X parasite.",
    source: "https://www.nintendo.com/au/news-and-articles/metroid-dread-report-vol-4-unravelling-a-saga-35-years-in-the-making/"
  },
  {
    category: "World & lore", level: "Easy", title: "What gets left behind",
    question: "What is destroyed as Samus escapes at the end of Super Metroid?",
    choices: ["The planet SR388", "The B.S.L. station", "The planet Zebes", "The planet ZDR"], answer: 2,
    explanation: "Samus reaches her ship as Zebes self-destructs. The explosion consumes the Space Pirates’ base.",
    source: "https://www.nintendo.com/au/news-and-articles/metroid-dread-report-vol-4-unravelling-a-saga-35-years-in-the-making/"
  },
  {
    category: "Game systems", level: "Medium", title: "Weapon deselect",
    question: "With Icon Cancel set to Auto, when does a selected special weapon normally switch off?",
    choices: ["When Samus lands a jump", "When Samus takes damage", "When Samus passes through a door", "When a shot hits a wall"], answer: 2,
    explanation: "Auto clears the selected special item at doorways. Manual lets the player keep it selected.",
    source: "https://www.nintendo.co.jp/clvs/manuals/common/pdf/CLV-P-SAAHE.pdf"
  },
  {
    category: "Game systems", level: "Medium", title: "Backing away",
    question: "Which setting lets Samus retreat while keeping her cannon pointed toward the enemy?",
    choices: ["Moon Walk", "Icon Cancel", "Reserve Auto", "Angle Down"], answer: 0,
    explanation: "With Moon Walk enabled, holding fire and pressing back lets Samus keep facing the threat.",
    source: "https://www.nintendo.co.jp/clvs/manuals/common/pdf/CLV-P-SAAHE.pdf"
  },
  {
    category: "Game systems", level: "Medium", title: "A one-shot selection",
    question: "With default buttons, what does holding Item Cancel while selecting a special item let Samus do?",
    choices: ["Double its damage for the next hit", "Save the selection between files", "Use it once and automatically deselect it", "Fire it without using ammo"], answer: 2,
    explanation: "The temporary selection returns Samus to her regular beam after one use.",
    source: "https://www.nintendo.co.jp/clvs/manuals/common/pdf/CLV-P-SAAHE.pdf"
  },
  {
    category: "Game systems", level: "Hard", title: "One entry below End",
    question: "A player remapped every button and wants the original layout back. Where is Reset to Default?",
    choices: ["Above Shot in controller settings", "Inside Special Setting Mode", "Below End in controller settings", "On the map screen"], answer: 2,
    explanation: "Move the cursor down past End on the controller setup screen to reach the reset option.",
    source: "https://www.nintendo.co.jp/clvs/manuals/common/pdf/CLV-P-SAAHE.pdf"
  },
  {
    category: "Game systems", level: "Medium", title: "Aiming from a crouch",
    question: "With the original layout, what does holding L and R together while kneeling let Samus do?",
    choices: ["Aim behind her", "Aim straight up", "Fire a charged Missile", "Start a stationary spin jump"], answer: 1,
    explanation: "The shoulder buttons normally aim diagonally. Together, they point the cannon overhead from a kneel.",
    source: "https://www.nintendo.co.jp/clvs/manuals/common/pdf/CLV-P-SAAHE.pdf"
  },
  {
    category: "Game systems", level: "Easy", title: "A file worth keeping",
    question: "Which Samus Data command can create a second copy of a save before a player experiments with a route?",
    choices: ["Data Copy", "Data Clear", "Special Setting Mode", "Icon Cancel"], answer: 0,
    explanation: "Copy the chosen file to another slot to keep its progress available for a second attempt.",
    source: "https://www.nintendo.co.jp/clvs/manuals/common/pdf/CLV-P-SAAHE.pdf"
  },
  {
    category: "Items & abilities", level: "Medium", title: "An empty reserve",
    question: "Samus has 1 energy and empty reserves when she collects an Energy Tank. Which supply fills up?",
    choices: ["Only the newest 100 units", "Only her reserves", "All of her main energy", "Both main energy and reserves"], answer: 2,
    explanation: "An Energy Tank raises maximum energy by 100 and refills the main meter. Reserve energy is a separate pool.",
    source: "https://wiki.supermetroid.run/Energy_Tank"
  },
  {
    category: "Items & abilities", level: "Medium", title: "Overflow energy",
    question: "With full main energy and a partly empty Reserve Tank, where does a collected energy drop go?",
    choices: ["Into the reserve pool", "Into missile ammo", "Into the next tank pickup", "It is discarded"], answer: 0,
    explanation: "A full main meter lets energy drops top up the reserves for later.",
    source: "https://wiki.supermetroid.run/Reserve_Tank"
  },
  {
    category: "Game systems", level: "Hard", title: "Saving some for later",
    question: "Samus starts a manual reserve transfer. How can the player interrupt it to keep some reserve energy for later?",
    choices: ["Release the dash button", "Press Up during the transfer", "Toggle Moon Walk", "Tap Item Cancel twice"], answer: 1,
    explanation: "The manual transfer can be cut short from the inventory screen. An automatic activation spends the available reserves.",
    source: "https://wiki.supermetroid.run/Reserve_Tank"
  },
  {
    category: "Game systems", level: "Medium", title: "Heat during a refill",
    question: "Why can a full Reserve Tank yield less than 100 usable energy when it triggers in a superheated room?",
    choices: ["Automatic mode always discards half", "Heat keeps draining energy during the refill", "The tank deducts the last enemy hit twice", "The HUD rounds every transfer down to 50"], answer: 1,
    explanation: "The refill animation takes time, and unprotected heat damage continues during it.",
    source: "https://wiki.supermetroid.run/Reserve_Tank"
  },
  {
    category: "Items & abilities", level: "Medium", title: "Shots in flight",
    question: "What makes firing a second Super Missile unusually risky across a long room?",
    choices: ["The first one can disappear before impact", "The second always tracks the first", "The first reverses direction", "Both lose their splash damage"], answer: 0,
    explanation: "Only one Super Missile can remain in flight at a time.",
    source: "https://wiki.supermetroid.run/Super_Missile"
  },
  {
    category: "Items & abilities", level: "Medium", title: "Ammo versus cadence",
    question: "Against a neutral target, which weapon has the shorter firing cooldown?",
    choices: ["Super Missiles", "Both have the same cooldown", "Regular Missiles", "It depends on the suit color"], answer: 2,
    explanation: "Regular Missiles can be fired again after nine frames. Supers hit harder but have a longer interval between shots.",
    source: "https://wiki.supermetroid.run/Missile"
  },
  {
    category: "Items & abilities", level: "Medium", title: "A lock with a yellow cap",
    question: "A blue door opens to a beam shot. What normally unlocks a yellow door?",
    choices: ["A Power Bomb blast", "Five regular Missiles", "A charged Ice Beam", "A Super Missile"], answer: 0,
    explanation: "Yellow door caps respond to the Power Bomb’s expanding blast.",
    source: "https://wiki.supermetroid.run/Power_Bomb"
  },
  {
    category: "Items & abilities", level: "Hard", title: "Reading a stubborn block",
    question: "Why might Samus lay a regular Bomb to investigate a block after a Power Bomb failed to break it?",
    choices: ["They do more damage at close range", "Regular Bombs can expose the block’s symbol", "They cycle the block to a new type", "They reverse the last blast"], answer: 1,
    explanation: "A Power Bomb can clear compatible blocks across a large area, but its blast does not display the symbols on the rest.",
    source: "https://wiki.supermetroid.run/Power_Bomb"
  },
  {
    category: "Game systems", level: "Hard", title: "Twice in the blast",
    question: "How can one Power Bomb damage the same vulnerable creature twice?",
    choices: ["It crosses a door transition with Samus", "It stays in the blast for most of the explosion", "It is hit by two ordinary Bombs first", "It is frozen after the blast ends"], answer: 1,
    explanation: "An enemy caught from near the start to near the end of the explosion can take a second hit.",
    source: "https://wiki.supermetroid.run/Power_Bomb"
  },
  {
    category: "Items & abilities", level: "Medium", title: "A hit for 40",
    question: "A normal enemy hit deals 40 energy in the Power Suit. With only Varia equipped, how much does that hit cost?",
    choices: ["10 energy", "30 energy", "20 energy", "40 energy"], answer: 2,
    explanation: "Varia cuts ordinary incoming damage in half as well as shielding Samus from room heat.",
    source: "https://wiki.supermetroid.run/Varia_Suit"
  },
  {
    category: "Items & abilities", level: "Medium", title: "The lava test",
    question: "Beyond free underwater movement, which environmental hazard can the vanilla Gravity Suit let Samus stand in safely?",
    choices: ["Acid", "Spikes", "Lava", "Crumbling floors"], answer: 2,
    explanation: "Gravity protects Samus from lava damage. The more dangerous liquid in Lower Norfair is acid.",
    source: "https://wiki.supermetroid.run/Gravity_Suit"
  },
  {
    category: "Items & abilities", level: "Easy", title: "A switch beyond a wall",
    question: "Which beam property lets Samus hit a target on the far side of a solid wall?",
    choices: ["Wave shots pass through terrain", "Spazer shots bounce at right angles", "Ice shots turn corners", "Plasma shots travel around walls"], answer: 0,
    explanation: "Wave lets a shot cross terrain. Plasma’s distinctive piercing property applies to enemies.",
    source: "https://wiki.supermetroid.run/Wave_Beam"
  },
  {
    category: "Items & abilities", level: "Medium", title: "Targets in a line",
    question: "Two vulnerable enemies are lined up with no wall between them. What lets a single beam shot continue through the first target?",
    choices: ["Ice Beam alone", "Plasma Beam", "Spazer alone", "Charge Beam alone"], answer: 1,
    explanation: "Plasma gives the projectile enemy penetration, so a second enemy behind the first can also be hit.",
    source: "https://wiki.supermetroid.run/Plasma_Beam"
  },
  {
    category: "Items & abilities", level: "Hard", title: "When the freeze happens",
    question: "Against a standard freezable enemy, what usually triggers the Ice Beam’s freeze effect?",
    choices: ["The first shot after entering a room", "Three hits regardless of damage", "Holding the shot button after impact", "A hit that would otherwise deplete its health"], answer: 3,
    explanation: "The freeze check depends on damage and remaining health. A stronger enemy may need several hits before freezing.",
    source: "https://wiki.supermetroid.run/Ice_Beam"
  },
  {
    category: "Items & abilities", level: "Hard", title: "Ice in Norfair",
    question: "What changes about an ordinary enemy freeze in Norfair compared with most of Zebes?",
    choices: ["It thaws sooner", "It takes two charged shots to trigger", "The platform becomes slippery", "The frozen enemy slowly sinks"], answer: 0,
    explanation: "The normal freeze lasts 400 frames. In Norfair the timer is 300 frames.",
    source: "https://wiki.supermetroid.run/Ice_Beam"
  },
  {
    category: "Game systems", level: "Medium", title: "Before the flash",
    question: "Samus starts charging and releases fire before she flashes. What leaves her cannon?",
    choices: ["A half-strength charged shot", "An ordinary beam shot", "Nothing at all", "A Bomb Spread"], answer: 1,
    explanation: "The flash signals that charging is complete. Releasing earlier still fires the regular beam.",
    source: "https://wiki.supermetroid.run/Charge_Beam"
  },
  {
    category: "Items & abilities", level: "Hard", title: "Charged Wave arithmetic",
    question: "A Wave-only shot deals 50 base damage. Against a neutral target, how much does the fully charged version deal?",
    choices: ["75", "150", "100", "200"], answer: 1,
    explanation: "A normal beam configuration deals triple its uncharged damage at full charge.",
    source: "https://wiki.supermetroid.run/Damage"
  },
  {
    category: "Items & abilities", level: "Hard", title: "Turning while charging",
    question: "Why can repeatedly reversing direction delay a fully charged shot?",
    choices: ["Each turn equips the Power Beam", "The cannon must be held level to charge", "Turning resets all beam upgrades", "Each turnaround interrupts the charging process"], answer: 3,
    explanation: "Turnarounds delay charging by several frames. Charging while standing still avoids that loss.",
    source: "https://wiki.supermetroid.run/Charge_Beam"
  },
  {
    category: "Items & abilities", level: "Hard", title: "A silent beam combo",
    question: "Charge is on, Power Bombs are selected, and both Wave and Ice are active. Why is no special beam combo launching?",
    choices: ["Only one extra beam may be active", "Samus needs exactly one Power Bomb left", "The combo requires an empty Reserve Tank", "All four beam upgrades must be active"], answer: 0,
    explanation: "Choose one beam alongside Charge and hold a long charge. That beam determines the special attack.",
    source: "https://wiki.supermetroid.run/Charge_Beam_Combos"
  },
  {
    category: "Items & abilities", level: "Medium", title: "A shield of crystals",
    question: "What happens to the Ice Shield crystals that have not struck anything when their orbit ends?",
    choices: ["They refill the Power Bomb supply", "They fuse into one charged shot", "They freeze Samus in place", "They fly out from Samus"], answer: 3,
    explanation: "The four crystals circle Samus first. Surviving crystals eventually shoot outward.",
    source: "https://wiki.supermetroid.run/Charge_Beam_Combos"
  },
  {
    category: "Items & abilities", level: "Hard", title: "A rain of beams",
    question: "Which special beam combo sends three-pronged projectiles overhead before they rain down?",
    choices: ["Ice with Charge", "Spazer with Charge", "Wave with Charge", "Plasma with Charge"], answer: 1,
    explanation: "The Spazer combo sweeps below and above Samus before the projectiles fall straight down.",
    source: "https://wiki.supermetroid.run/Charge_Beam_Combos"
  },
  {
    category: "Items & abilities", level: "Hard", title: "Green rings",
    question: "What sets the Plasma Power Bomb combo’s green rings apart when they hit an enemy?",
    choices: ["They attach and turn into missiles", "They stop and become platforms", "They return ammo to Samus", "They can pass through the target"], answer: 3,
    explanation: "The rings retain Plasma’s piercing behavior as they expand, contract and fly away.",
    source: "https://wiki.supermetroid.run/Charge_Beam_Combos"
  },
  {
    category: "Items & abilities", level: "Medium", title: "Five at once",
    question: "With Bombs equipped and Power Bombs deselected, what does morphing with a fully charged beam normally produce?",
    choices: ["A stored shinespark", "One larger Power Bomb", "A pair of Super Missiles", "A spread of five Bombs"], answer: 3,
    explanation: "The maneuver converts the stored beam charge into a symmetrical group of ordinary Bombs.",
    source: "https://wiki.supermetroid.run/Bomb_Spread"
  },
  {
    category: "Items & abilities", level: "Hard", title: "A spread without lift",
    question: "Why does standing in a charged Bomb Spread fail as a substitute for an ordinary bomb jump?",
    choices: ["They only explode above her head", "The spread’s Bombs do not push Samus", "They detonate only upon enemy contact", "They cannot be made near a floor"], answer: 1,
    explanation: "The five Bombs can damage things around Samus, but their blasts give her no lift.",
    source: "https://wiki.supermetroid.run/Bomb_Spread"
  },
  {
    category: "Items & abilities", level: "Medium", title: "Yellow flash on contact",
    question: "Without Screw Attack, Samus spin-jumps with a charged beam and damages an enemy by touching it. What did the hit spend?",
    choices: ["One Power Bomb", "Some reserve energy", "A Super Missile", "The stored beam charge"], answer: 3,
    explanation: "The pseudo-Screw uses the beam charge for a contact attack. Samus needs another charge to repeat it.",
    source: "https://wiki.supermetroid.run/Pseudo_Screw_Attack"
  },
  {
    category: "Items & abilities", level: "Easy", title: "A distant pickup",
    question: "An energy drop is about to vanish across a gap. Which tool can collect it without Samus touching it herself?",
    choices: ["Grappling Beam", "X-Ray Scope", "Wave Beam", "Spazer"], answer: 0,
    explanation: "The Grappling Beam collects drops that its tip reaches.",
    source: "https://wiki.supermetroid.run/Grappling_Beam"
  },
  {
    category: "Items & abilities", level: "Easy", title: "Reading the ceiling",
    question: "Which marking identifies an ordinary block that the Grappling Beam can latch onto?",
    choices: ["A plus sign on a gray block", "Three diagonal arrows", "A hollow missile silhouette", "An X over a blue circle"], answer: 0,
    explanation: "Grapple blocks have a cross in the middle. A series of them can form a swinging path.",
    source: "https://wiki.supermetroid.run/Grappling_Beam"
  },
  {
    category: "Game systems", level: "Hard", title: "A scanner that won’t start",
    question: "Samus is falling normally when the player tries X-Ray. Why does the scope fail to activate?",
    choices: ["Samus has vertical speed", "Samus has too little reserve energy", "Only Morph Ball can scan downward", "She is facing away from a save station"], answer: 0,
    explanation: "One condition for X-Ray activation is zero vertical speed.",
    source: "https://wiki.supermetroid.run/X-Ray_Scope"
  },
  {
    category: "Items & abilities", level: "Medium", title: "Catching the next jump",
    question: "During a Space Jump, when should the player make the next jump input?",
    choices: ["At the moment Samus leaves the ground", "While she is still accelerating upward", "Just after the peak, while falling", "Only after she touches a wall"], answer: 2,
    explanation: "Space Jump checks Samus’s falling speed. There is a window on the way down in which she can jump again.",
    source: "https://wiki.supermetroid.run/Space_Jump"
  },
  {
    category: "Items & abilities", level: "Hard", title: "Air versus water",
    question: "Where is the window for repeating a Space Jump wider?",
    choices: ["In open air", "In a room with a map station", "It is identical everywhere", "Underwater"], answer: 3,
    explanation: "The acceptable falling-speed range gives the player a longer input window underwater.",
    source: "https://wiki.supermetroid.run/Space_Jump"
  },
  {
    category: "Items & abilities", level: "Medium", title: "Too much height",
    question: "Why might a player unequip Hi-Jump Boots before crossing a room with a low ceiling?",
    choices: ["To keep the jump from hitting the ceiling", "To give beams a longer range", "To make doors open on contact", "To charge the Speed Booster while airborne"], answer: 0,
    explanation: "The boots add upward speed. A shallower jump can follow a cleaner path under an overhang.",
    source: "https://wiki.supermetroid.run/Hi-Jump_Boots"
  },
  {
    category: "Items & abilities", level: "Easy", title: "A gift at the end",
    question: "Which weapon does Samus receive after the hatchling sacrifices itself in the final battle?",
    choices: ["Plasma Beam", "Wave Beam", "Hyper Beam", "Charge Beam"], answer: 2,
    explanation: "The rainbow-colored Hyper Beam becomes available for the last phase of Mother Brain and the escape.",
    source: "https://wiki.supermetroid.run/Hyper_Beam"
  },
  {
    category: "Items & abilities", level: "Medium", title: "A gate during the escape",
    question: "What lets Samus break the descending gates in the first room after Mother Brain?",
    choices: ["Scanning them with X-Ray", "Shooting one Ice shot at the floor", "Waiting for a Chozo statue", "Firing the Hyper Beam"], answer: 3,
    explanation: "Several objects on the escape route are vulnerable to the new beam, including those gates.",
    source: "https://wiki.supermetroid.run/Hyper_Beam"
  },
  {
    category: "Items & abilities", level: "Medium", title: "Rapid fire from the start",
    question: "Before finding Charge Beam, which can fire ordinary shots faster than simply holding fire?",
    choices: ["Tapping fire at the cooldown rhythm", "Holding both aim buttons", "Holding dash while standing still", "Turning Moon Walk on"], answer: 0,
    explanation: "Automatic fire settles into a slower rhythm. Well-timed taps can use the shorter shot cooldown.",
    source: "https://wiki.supermetroid.run/Power_Beam"
  },
  {
    category: "World & lore", level: "Easy", title: "Glass beneath the water",
    question: "Samus is inside the clear tube under Maridia. What can break the glass and open a route into the flooded caverns?",
    choices: ["A Power Bomb", "A regular Missile into the floor", "A charged Wave shot", "Holding X-Ray on a crack"], answer: 0,
    explanation: "A Power Bomb breaks the tube and turns a sealed passage into a junction.",
    source: "https://wiki.supermetroid.run/Glass_Tunnel"
  },
  {
    category: "World & lore", level: "Hard", title: "A delayed shatter",
    question: "Samus lays a Power Bomb in Maridia’s glass tube and stands still. Which action can trigger the shattering animation after the blast?",
    choices: ["Waiting for the music to loop", "Refilling an Energy Tank", "Changing the selected item", "Opening a map station"], answer: 2,
    explanation: "The glass waits for an input such as a shot, a jump or a change of selected item.",
    source: "https://wiki.supermetroid.run/Glass_Tunnel"
  },
  {
    category: "World & lore", level: "Easy", title: "Beneath the statues",
    question: "When the four-boss monument sinks, where does the exposed elevator lead?",
    choices: ["Tourian", "Lower Norfair", "The Wrecked Ship", "Maridia"], answer: 0,
    explanation: "The shaft under the monument connects to Tourian’s first room.",
    source: "https://wiki.supermetroid.run/Statues_Room"
  },
  {
    category: "World & lore", level: "Hard", title: "One room, three pickups",
    question: "In vanilla West Ocean, what kind of expansion accounts for all three item locations?",
    choices: ["Energy Tanks", "Super Missile Tanks", "Regular Missile Tanks", "Power Bomb Tanks"], answer: 2,
    explanation: "West Ocean holds three regular Missile expansions. Its doors connect the outside of the Wrecked Ship at different heights.",
    source: "https://wiki.supermetroid.run/West_Ocean"
  },
  {
    category: "World & lore", level: "Medium", title: "But wait, there’s more",
    question: "Why do runners call Blue Brinstar’s double Missile room the Billy Mays Room?",
    choices: ["There is a second, hidden Missile pickup", "A pirate throws an endless stream of ammo", "A Chozo offers two beams at once", "A door opens whenever Samus jumps"], answer: 0,
    explanation: "Finding the obvious pack does not finish the room. A second Missile expansion is concealed there.",
    source: "https://wiki.supermetroid.run/Billy_Mays_Room"
  },
  {
    category: "World & lore", level: "Medium", title: "A suspicious approach",
    question: "What hazard can catch Samus as she approaches the Energy Tank near the Etecoons?",
    choices: ["A rising acid tide", "A moving laser fence", "An invisible pit in the floor", "A row of closing shutters"], answer: 2,
    explanation: "The floor before the tank gives way. A well-timed jump clears the trap.",
    source: "https://wiki.supermetroid.run/Etecoon_Energy_Tank_Room"
  },
  {
    category: "World & lore", level: "Hard", title: "A statue with a condition",
    question: "Which ability does the Lower Norfair acid-room statue check before it will activate?",
    choices: ["Screw Attack", "Space Jump", "Spring Ball", "Wave Beam"], answer: 1,
    explanation: "The statue needs Space Jump. Reaching its hand by another means does not meet that condition.",
    source: "https://wiki.supermetroid.run/Acid_Statue_Room"
  },
  {
    category: "World & lore", level: "Medium", title: "A pickup with a deadline",
    question: "What changes in the room and hallway after Samus collects Speed Booster?",
    choices: ["All the exits freeze", "The ground shakes and lava rises", "The lights go out until a boss dies", "The doors begin switching colors"], answer: 1,
    explanation: "The rising lava gives Samus an immediate reason to try the new ability on the way back.",
    source: "https://wiki.supermetroid.run/Speed_Booster_Room"
  },
  {
    category: "World & lore", level: "Medium", title: "Beyond Crocomire",
    question: "Beyond Crocomire, Samus crosses a wide gap in the room nicknamed Indiana Jones. Which major upgrade is on the far side?",
    choices: ["Ice Beam", "Spring Ball", "Grappling Beam", "Plasma Beam"], answer: 2,
    explanation: "The destination on the left of the jump room is the Grapple Beam chamber.",
    source: "https://wiki.supermetroid.run/Post_Crocomire_Jump_Room"
  },
  {
    category: "World & lore", level: "Medium", title: "Maridia at a crossroads",
    question: "Coming straight up out of the broken glass tube puts Samus in which room on the community map?",
    choices: ["Main Street", "Bubble Mountain", "Big Pink", "Green Hill Zone"], answer: 0,
    explanation: "Main Street sits directly above the glass and branches toward Fish Tank and Mt. Everest.",
    source: "https://wiki.supermetroid.run/Main_Street"
  },
  {
    category: "World & lore", level: "Hard", title: "Two Norfair landmarks",
    question: "Which small room connects Bubble Mountain to the long Speed Booster Hall?",
    choices: ["Sponge Bath", "Fish Tank", "Bat Cave", "The Attic"], answer: 2,
    explanation: "Bat Cave links the climb up Bubble Mountain to the long corridor leading to the upgrade.",
    source: "https://wiki.supermetroid.run/Bat_Cave"
  },
  {
    category: "World & lore", level: "Medium", title: "Into the dark",
    question: "Which upgrade waits just beyond the Red Brinstar Fireflea Room?",
    choices: ["Spazer", "Grappling Beam", "X-Ray Scope", "Spring Ball"], answer: 2,
    explanation: "The Fireflea room leads into a small item chamber where a Chozo statue holds the scope.",
    source: "https://wiki.supermetroid.run/X-Ray_Scope_Room"
  },
  {
    category: "World & lore", level: "Medium", title: "Past the Golden Torizo",
    question: "What major upgrade sits between Golden Torizo’s chamber and Fast Ripper Room?",
    choices: ["Space Jump", "Speed Booster", "Varia Suit", "Screw Attack"], answer: 3,
    explanation: "The Lower Norfair statue on that path holds Screw Attack.",
    source: "https://wiki.supermetroid.run/Screw_Attack_Room"
  },
  {
    category: "World & lore", level: "Hard", title: "Two legs of the Pants Room",
    question: "Why can entering the east side of Maridia’s Pants Room through a door behave like entering a different room?",
    choices: ["The game loads a smaller room for that side", "The door always warps to Norfair", "It changes with the selected beam", "The room rotates when Gravity is equipped"], answer: 0,
    explanation: "The east side has its own room data even though it looks like part of the same landmark.",
    source: "https://wiki.supermetroid.run/Pants_Room"
  },
  {
    category: "World & lore", level: "Medium", title: "A beam among the missiles",
    question: "Alongside Missile expansions, which beam upgrade is down in Brinstar’s Big Pink?",
    choices: ["Wave Beam", "Plasma Beam", "Charge Beam", "Ice Beam"], answer: 2,
    explanation: "The large pink hub contains multiple pickups. The passage down to Charge is easy to pass on a first visit.",
    source: "https://wiki.supermetroid.run/Big_Pink"
  },
  {
    category: "World & lore", level: "Medium", title: "A path you can stand on",
    question: "In the Blue Brinstar Boulder Room, why use X-Ray on what looks like empty air?",
    choices: ["To see invisible solid platforms", "To stop the boulders permanently", "To open the red door remotely", "To make the water drain"], answer: 0,
    explanation: "The scan shows surfaces that are solid even while they are invisible.",
    source: "https://wiki.supermetroid.run/Blue_Brinstar_Boulder_Room"
  },
  {
    category: "World & lore", level: "Medium", title: "Four reserves to find",
    question: "Three vanilla Reserve Tanks are in Brinstar, Norfair and Maridia. Where is the fourth?",
    choices: ["Crateria", "Wrecked Ship", "Tourian", "Ceres Station"], answer: 1,
    explanation: "The Wrecked Ship’s Bowling Alley contains the fourth region’s Reserve Tank.",
    source: "https://wiki.supermetroid.run/List_of_Reserve_Tanks"
  },
  {
    category: "World & lore", level: "Hard", title: "Choosing a sand pit",
    question: "Samus wants the Power Bomb pack beneath Maridia’s aqueduct. Which sand hole should she descend?",
    choices: ["West Sand Hole", "Either pit leads to that pack", "East Sand Hole", "Neither pit contains ammunition"], answer: 2,
    explanation: "The eastern pit has a Power Bomb expansion and a Missile pack. The western one holds Maridia’s Reserve Tank.",
    source: "https://wiki.supermetroid.run/East_Sand_Hole"
  },
  {
    category: "World & lore", level: "Medium", title: "Above the landing site",
    question: "What permanent pickup lies at the far end of the Gauntlet’s entrance route from the Landing Site?",
    choices: ["A Reserve Tank", "An Energy Tank", "A beam upgrade", "The Hi-Jump Boots"], answer: 1,
    explanation: "The entrance leads from Samus’s landing area to the Gauntlet Energy Tank room.",
    source: "https://wiki.supermetroid.run/Gauntlet_Entrance"
  },
  {
    category: "World & lore", level: "Hard", title: "Back in familiar territory",
    question: "Which familiar Crateria shaft does Samus reach when she exits the fourth Tourian escape room?",
    choices: ["Red Tower", "The Wrecked Ship main shaft", "Climb", "Mt. Everest"], answer: 2,
    explanation: "The escape joins Climb, bringing Samus back toward the surface through a shaft she descended early in the mission.",
    source: "https://wiki.supermetroid.run/Tourian_Escape_Room_4"
  },
  {
    category: "Game systems", level: "Hard", title: "A ship save that sticks",
    question: "At Samus’s gunship, when is it safe to reset and rely on the new save?",
    choices: ["After clearing the Save Completed message", "As soon as the hatch opens", "As soon as Samus faces forward", "As soon as Yes is highlighted"], answer: 0,
    explanation: "Ship saving finishes later than an ordinary save-station confirmation. Dismissing the completion message lets it finish.",
    source: "https://wiki.supermetroid.run/Landing_Site"
  },
  {
    category: "Game systems", level: "Easy", title: "Missing from the download",
    question: "Samus uses a map station. Why might a hidden room still be absent from the downloaded map?",
    choices: ["Only rooms with enemies are included", "A map station shows only save rooms", "The download omits secret passages and rooms", "Map stations only display the path to bosses"], answer: 2,
    explanation: "Map data helps survey the area, but finding hidden routes still takes exploration.",
    source: "https://www.nintendo.com/es-es/games/oms/snes-classic/manuals/super-metroid/manual.pdf"
  },
  {
    category: "Game systems", level: "Easy", title: "A choice after defeat",
    question: "After a game over, what does selecting Yes on the continue screen restore?",
    choices: ["The last saved game", "The start of the boss fight", "The moment of the last item pickup", "The last elevator ride"], answer: 0,
    explanation: "The continue prompt reloads saved progress. An item collected since that save must be found again.",
    source: "https://www.nintendo.com/es-es/games/oms/snes-classic/manuals/super-metroid/manual.pdf"
  },
  {
    category: "Game systems", level: "Medium", title: "A stubborn metal hatch",
    question: "A gray metal hatch stays shut after repeated missile hits. What can make this kind of hatch start flashing?",
    choices: ["Equipping two beams at once", "Emptying all missile ammo", "Turning off the minimap", "Defeating the enemies tied to its room"], answer: 3,
    explanation: "Some metal hatches check a room objective. Once the condition is met, the flashing hatch can be opened.",
    source: "https://www.nintendo.co.jp/clvs/manuals/common/pdf/CLV-P-SAAHE.pdf"
  },
  {
    category: "Game systems", level: "Easy", title: "Which screen is which?",
    question: "While paused, which screen lets a player switch an acquired beam upgrade off?",
    choices: ["The Samus equipment screen", "The area map", "The Samus Data copy screen", "The controller setup screen"], answer: 0,
    explanation: "The equipment screen shows installed items and lets the player change which ones are active.",
    source: "https://www.nintendo.com/es-es/games/oms/snes-classic/manuals/super-metroid/manual.pdf"
  },
  {
    category: "Items & abilities", level: "Hard", title: "A full-time collector",
    question: "How many permanent Energy Tanks can Samus collect in vanilla Super Metroid, counting main tanks only?",
    choices: ["10", "12", "14", "18"], answer: 2,
    explanation: "There are fourteen main Energy Tanks spread across Zebes. Reserve Tanks belong to a separate collection.",
    source: "https://wiki.supermetroid.run/List_of_Energy_Tanks"
  },
  {
    category: "World & lore", level: "Hard", title: "After Botwoon",
    question: "The tunnel between Botwoon’s chamber and Halfie Climb hides which pickup?",
    choices: ["A Super Missile expansion", "An Energy Tank", "A Reserve Tank", "The Spring Ball"], answer: 1,
    explanation: "The Energy Tank sits along the low passage after Botwoon.",
    source: "https://wiki.supermetroid.run/Botwoon_Energy_Tank_Room"
  },
  {
    category: "World & lore", level: "Hard", title: "Return to the pedestal",
    question: "Besides Morph Ball itself, which ammo type has a pickup in the same Blue Brinstar room?",
    choices: ["Super Missiles", "Power Bombs", "Regular Missiles", "Hyper Beam cells"], answer: 1,
    explanation: "The room visited for Morph Ball early on also has a Power Bomb expansion for a later visit.",
    source: "https://wiki.supermetroid.run/Morph_Ball_Room"
  },
  {
    category: "Randomizers", level: "Medium", title: "Worth another check?",
    question: "In a DASH Full Item Split race, what two counts on the HUD can help a runner decide whether to leave an area?",
    choices: ["Unopened doors and save stations", "Remaining major items and Energy Tanks", "Missile packs and Super Missile packs", "Bosses and unused elevators"], answer: 1,
    explanation: "Those counters tell the runner what is still worth searching for in the current area.",
    source: "https://www.dashrando.net/info/hud"
  },
  {
    category: "Randomizers", level: "Medium", title: "A gray Double Jump",
    question: "A DASH racer owns Double Jump. Which pickup grays out its HUD icon?",
    choices: ["Hi-Jump Boots", "Spring Ball", "Speed Booster", "Space Jump"], answer: 3,
    explanation: "Space Jump takes over the role of the extra midair jump. A gray icon can mean the upgrade has been superseded.",
    source: "https://www.dashrando.net/info/hud"
  },
  {
    category: "Randomizers", level: "Hard", title: "Two Phantoons, one fewer check",
    question: "A DASH seed rolls two Phantoons. Why are there only 99 item locations?",
    choices: ["A duplicate boss shares its item with the first", "One fewer save station can spawn", "Phantoon has no attached reward room", "His second death locks a ship attic"], answer: 2,
    explanation: "The boss rooms bring their own layouts. An extra Phantoon replaces a fight that would have had an item location attached.",
    source: "https://www.dashrando.net/info/duplicate"
  },
  {
    category: "Randomizers", level: "Medium", title: "A dead end on purpose",
    question: "In DASH Area Randomization, what makes Tourian a dead end on the portal map?",
    choices: ["It has exactly one portal", "All its portals face down", "Its return portal closes after entry", "It only connects to Crateria"], answer: 0,
    explanation: "The term describes how many connections the area has. Kraid’s Lair and Crocomire’s Lair also have one portal each.",
    source: "https://www.dashrando.net/info/area"
  },
  {
    category: "Randomizers", level: "Medium", title: "Checking a seed",
    question: "After DASH places the items, what does Verified Fill do before accepting the seed?",
    choices: ["Runs a recorded world-record route", "Uses a solver to check that the game can be beaten", "Checks that every area has a beam", "Moves the last upgrade into Tourian"], answer: 1,
    explanation: "The solver checks the finished placement for a way to complete the seed.",
    source: "https://www.dashrando.net/info/verified-fill"
  },
  {
    category: "Randomizers", level: "Hard", title: "An honorary major",
    question: "In DASH Major/Minor split, which vanilla ammo location can hold a major upgrade?",
    choices: ["Early Supers in Brinstar", "The Missile in Billy Mays Room", "The right-side Super in Wrecked Ship", "The Missile below the moat"], answer: 2,
    explanation: "DASH trades two location classifications for balance. The Energy Tank near Hi-Jump becomes a minor location.",
    source: "https://www.dashrando.net/info/item-pools"
  },
  {
    category: "Randomizers", level: "Medium", title: "Following the statues",
    question: "In DASH Chozo split, which pair of location types holds enough equipment to finish?",
    choices: ["Map stations and elevators", "Missile alcoves and hidden walls", "Save rooms and refill rooms", "Chozo statues and boss rewards"], answer: 3,
    explanation: "A runner can concentrate on those checks for progression. They also hold a small guaranteed supply of tanks and ammo.",
    source: "https://www.dashrando.net/info/item-pools"
  },
  {
    category: "Randomizers", level: "Hard", title: "A new use for Spazer",
    question: "In DASH Classic, which beam opens a route through Botwoon Hallway when a runner lacks Speed Booster?",
    choices: ["Ice Beam", "Spazer", "Plasma Beam", "Wave Beam"], answer: 1,
    explanation: "Classic gives Spazer a route-opening use in this hallway and at the Waterway Energy Tank.",
    source: "https://www.dashrando.net/info/classic"
  },
  {
    category: "Randomizers", level: "Hard", title: "A Wrecked Ship shortcut",
    question: "A DASH Classic runner wants the Wrecked Ship Reserve Tank. Which pickup gains a new use at this location?",
    choices: ["Bombs", "X-Ray Scope", "Ice Beam", "Spring Ball"], answer: 0,
    explanation: "Classic changes the access to this tank so finding Bombs can put it in reach.",
    source: "https://www.dashrando.net/info/classic"
  },
  {
    category: "Randomizers", level: "Medium", title: "Holding the spin",
    question: "A Map Rando player enables Spin Lock. Which input can Samus now press without breaking her spin?",
    choices: ["Shoot", "Item cancel", "Up or down", "Pause twice"], answer: 2,
    explanation: "Spin Lock lets the runner steer the next action without accidentally standing upright. Firing cancels the mode.",
    source: "https://maprando.com/about"
  },
  {
    category: "Randomizers", level: "Medium", title: "Reading the border",
    question: "On Map Rando’s pause map, what do the colored letters at area transitions identify?",
    choices: ["The beam needed at the next lock", "The neighboring area", "The nearest refill type", "The direction to Mother Brain"], answer: 1,
    explanation: "A runner can identify the region beyond a transition while planning a route across the shuffled map.",
    source: "https://maprando.com/about"
  },
  {
    category: "Randomizers", level: "Hard", title: "A suit for the heat",
    question: "With Map Rando’s complementary suits, which protection does Samus still need Varia for after finding Gravity?",
    choices: ["Protection from ambient heat", "Moving freely underwater", "Crossing quicksand at normal gravity", "Reducing damage from ordinary enemy contact"], answer: 0,
    explanation: "In this setting Varia supplies heat protection. Gravity still changes underwater movement.",
    source: "https://maprando.com/about"
  },
  {
    category: "Randomizers", level: "Medium", title: "The escape-only start",
    question: "A runner starts a Map Rando Escape seed with an unrevealed map. Which station still works during the countdown?",
    choices: ["Save station", "Gunship save menu", "A station that resets the timer", "Map station"], answer: 3,
    explanation: "Map stations can reveal the way to the ship during an Escape start. Save stations are disabled during the countdown.",
    source: "https://maprando.com/generate"
  },
  {
    category: "Randomizers", level: "Hard", title: "Four Chozos",
    question: "A Map Rando race rolls the Chozos objective. Which pair of statues must be activated as well as defeating the two Torizos?",
    choices: ["The Golden Four and the Varia statue", "The Hi-Jump and Spring Ball statues", "Bowling Alley and Acid Chozo", "The Screw Attack and Ice Beam statues"], answer: 2,
    explanation: "Both statue events count toward the objective. The Bowling Alley event also requires power in the Wrecked Ship.",
    source: "https://maprando.com/generate"
  },
  {
    category: "Randomizers", level: "Medium", title: "Opening the return trip",
    question: "In Map Rando, Samus opens one side of a randomized beam door. What lock will she face if she returns through the opposite side?",
    choices: ["A second lock of the same color", "The original lock is already open", "A new random beam lock", "A gray enemy-clear lock"], answer: 1,
    explanation: "Both sides share a lock. The route stays open for the return trip.",
    source: "https://maprando.com/generate"
  }
];
