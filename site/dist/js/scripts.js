"use strict";function checkSquares(){var a=[cardStrHeroes,cardKillStreaks,cardQuickBlink,cardFarmFail,cardMoneyHand,cardRandomWin,cardThrowGame,cardSpeedrun,cardLongGame,cardSalty,cardDrowStrat,cardSoloSupport,cardObjectiveGamer,cardBountiful,cardStopComing],e=shuffle(a,player_id),r=0;for(matchHeroes();e[r];)for(var t=1;t<6;t++)for(var i=1;i<6;i++)3==i&&3==t||void 0!==e[r]&&(e[r]("card-"+t+"-"+i),r++)}function addSquare(a,e,r,t){var i="<div class='tooltip'>"+r+"</div><span>"+e+"</span>",n=document.getElementById(a);n.innerHTML=i,t?n.className+=" has-square":n.classList.remove("has-square")}function ifExists(a){return a||0}function matchHeroes(){for(var a=0;a<10;a++)for(var e=data.players[a].hero_id,r=0;r<heroes.length;r++)heroes[r].id==e&&current_heroes.push(heroes[r])}function cardKillStreaks(a){player.kill_streaks?player.kill_streaks[15]>=1?addSquare(a,"Running Riot","15+ kill streak",!0):player.kill_streaks[10]>=1?addSquare(a,"Killing Frenzy","10+ kill streak",!0):addSquare(a,"Killing Frenzy","10+ kill streak",!1):addSquare(a,"Killing Frenzy","10+ kill streak",!1)}function cardStrHeroes(a){for(var e=0,r=0;r<10;r++)"str"==current_heroes[r].primary_attr&&e++;addSquare(a,"Strength in Numbers","6+ strength heroes in the game",e>=6)}function cardQuickBlink(a){addSquare(a,"In a blink","Farm a blink dagger before 12 minutes",(player.first_purchase_time.blink||1e3)<720)}function cardFarmFail(a){addSquare(a,"Team???","Lots of farm during laning, but lose the game",player.lane_efficiency_pct>=80&&0==player_won)}function cardMoneyHand(a){for(var e=0,r=0;r<10;r++)data.players[r].item_usage.hand_of_midas&&e++;addSquare(a,"Not Listening","5+ midases in the game",e>=5)}function cardRandomWin(a){addSquare(a,"Gaben's Choice","Random your hero and then win the game",1==player.randomed&&1==player_won)}function cardThrowGame(a){var e=0;if(1==player_side)for(var r=0;r<data.radiant_gold_adv.length;r++)data.radiant_gold_adv[r]>e&&(e=data.radiant_gold_adv[r]);else for(var t=0;t<data.radiant_gold_adv.length;t++)-1*data.radiant_gold_adv[t]>e&&(e=-1*data.radiant_gold_adv[t]);var i=e.toLocaleString("en-US",{minimumFractionDigits:0});e>1e4&&0==player_won?addSquare(a,"322","You threw a "+i+" gold lead",!0):addSquare(a,"322","Be 10k+ gold ahead, but lose anyway",!1)}function cardSpeedrun(a){addSquare(a,"Dota2 speedrun (any %)","Win in under 25 minutes",data.duration<1500&&player_won)}function cardLongGame(a){addSquare(a,"5 more minutes mom","Win a game that went on for longer than 1 hr",data.duration>3600&&player_won)}function cardSalty(a){var e=0;if(data.radiant_win&&data.chat)for(var r=0;r<data.chat.length;r++)data.chat[r].slot>4&&data.chat[r].key.toLowerCase().includes("gg")&&e++;else if(data.chat)for(var t=0;t<data.chat.length;t++)data.chat[t].slot<5&&data.chat[t].key.toLowerCase().includes("gg")&&e++;addSquare(a,"Salty","Nobody on the losing team said GG",0==e)}function cardSoloSupport(a){for(var e=0,r=0,t=0,i=0;i<10;i++)data.players[i].isRadiant==player_side&&(e+=ifExists(data.players[i].purchase_ward_observer),e+=ifExists(data.players[i].purchase_ward_sentry));r=ifExists(player.purchase_ward_observer)+ifExists(player.purchase_ward_sentry),e>0&&(t=r/e),addSquare(a,"Single Mother of 4","Buy 90%+ of the obs/sentries",t>=.9)}function cardDrowStrat(a){for(var e=0,r=null,t=0;t<10;t++)"6"==data.players[t].hero_id&&(r=data.players[t].isRadiant);if(null!=r)if(r)for(var i=0;i<5;i++)e++;else for(var n=5;n<10;n++)e++;addSquare(a,"Drow Strat","Drow Ranger with 3+ ranged heroes",e>=3)}function cardObjectiveGamer(a){addSquare(a,"Wolves need no armor","More building damage than hero damage",ifExists(player.tower_damage)>ifExists(player.hero_damage))}function cardBountiful(a){addSquare(a,"Bountiful","Pick up 10+ Bounty runes",ifExists(player.runes[5])>10)}function cardStopComing(a){console.log(player.killed.length);for(var e=0;e<player.killed.length;e++)player.killed[e].includes("npc_dota_hero")&&console.log(player.killed[e]);addSquare(a,"Stay Dead","Kill the same player 5+ times",!0)}function makeCard(){var a=new XMLHttpRequest;console.log("Match ID: "+match_id),console.log("Steam ID: "+player_id),console.log("Player Name: "+player_name),a.open("GET","https://api.opendota.com/api/matches/"+match_id,!0),a.onload=function(){if(this.status>=200&&this.status<400){if(data=JSON.parse(this.response),console.log("Entire match's data "),console.log(data),player_name)for(var a=0;a<10;a++)data.players[a].personaname&&data.players[a].personaname.toLowerCase()==player_name&&(player_id=data.players[a].account_id,player_slot=a,setPlayerVars());else if(player_id)for(var e=0;e<10;e++)data.players[e].account_id&&data.players[e].account_id==player_id&&(player_name=data.players[e].personaname.toLowerCase(),player_slot=e,setPlayerVars());checkSquares()}else console.log("opendota api error")},a.send()}function setPlayerVars(){player=data.players[player_slot],console.log("Just the player's data"),console.log(player),player_won=!!player.win,player_side=player.isRadiant,player_hero=player.hero_id}function createSeed(a){for(var e=Math.random();a>1;)e*=a--;return e=Math.floor(e)}function shuffle(a,e){var r=a.length;e=e||0===e?Math.floor(e):createSeed(r);for(var t=0,i=void 0,n=void 0;t!==r-1&&e;)i=e%(r-t),e=(e-i)/(r-t),n=a[t],a[t]=a[t+i],a[t+i]=n,t++;return a}var heroes=[{id:1,name:"npc_dota_hero_antimage",localized_name:"Anti-Mage",primary_attr:"agi",attack_type:"Melee",roles:["Carry","Escape","Nuker"]},{id:2,name:"npc_dota_hero_axe",localized_name:"Axe",primary_attr:"str",attack_type:"Melee",roles:["Initiator","Durable","Disabler","Jungler"]},{id:3,name:"npc_dota_hero_bane",localized_name:"Bane",primary_attr:"int",attack_type:"Ranged",roles:["Support","Disabler","Nuker","Durable"]},{id:4,name:"npc_dota_hero_bloodseeker",localized_name:"Bloodseeker",primary_attr:"agi",attack_type:"Melee",roles:["Carry","Disabler","Jungler","Nuker","Initiator"]},{id:5,name:"npc_dota_hero_crystal_maiden",localized_name:"Crystal Maiden",primary_attr:"int",attack_type:"Ranged",roles:["Support","Disabler","Nuker","Jungler"]},{id:6,name:"npc_dota_hero_drow_ranger",localized_name:"Drow Ranger",primary_attr:"agi",attack_type:"Ranged",roles:["Carry","Disabler","Pusher"]},{id:7,name:"npc_dota_hero_earthshaker",localized_name:"Earthshaker",primary_attr:"str",attack_type:"Melee",roles:["Support","Initiator","Disabler","Nuker"]},{id:8,name:"npc_dota_hero_juggernaut",localized_name:"Juggernaut",primary_attr:"agi",attack_type:"Melee",roles:["Carry","Pusher","Escape"]},{id:9,name:"npc_dota_hero_mirana",localized_name:"Mirana",primary_attr:"agi",attack_type:"Ranged",roles:["Carry","Support","Escape","Nuker","Disabler"]},{id:10,name:"npc_dota_hero_morphling",localized_name:"Morphling",primary_attr:"agi",attack_type:"Ranged",roles:["Carry","Escape","Durable","Nuker","Disabler"]},{id:11,name:"npc_dota_hero_nevermore",localized_name:"Shadow Fiend",primary_attr:"agi",attack_type:"Ranged",roles:["Carry","Nuker"]},{id:12,name:"npc_dota_hero_phantom_lancer",localized_name:"Phantom Lancer",primary_attr:"agi",attack_type:"Melee",roles:["Carry","Escape","Pusher","Nuker"]},{id:13,name:"npc_dota_hero_puck",localized_name:"Puck",primary_attr:"int",attack_type:"Ranged",roles:["Initiator","Disabler","Escape","Nuker"]},{id:14,name:"npc_dota_hero_pudge",localized_name:"Pudge",primary_attr:"str",attack_type:"Melee",roles:["Disabler","Initiator","Durable","Nuker"]},{id:15,name:"npc_dota_hero_razor",localized_name:"Razor",primary_attr:"agi",attack_type:"Ranged",roles:["Carry","Durable","Nuker","Pusher"]},{id:16,name:"npc_dota_hero_sand_king",localized_name:"Sand King",primary_attr:"str",attack_type:"Melee",roles:["Initiator","Disabler","Nuker","Escape","Jungler"]},{id:17,name:"npc_dota_hero_storm_spirit",localized_name:"Storm Spirit",primary_attr:"int",attack_type:"Ranged",roles:["Carry","Escape","Nuker","Initiator","Disabler"]},{id:18,name:"npc_dota_hero_sven",localized_name:"Sven",primary_attr:"str",attack_type:"Melee",roles:["Carry","Disabler","Initiator","Durable","Nuker"]},{id:19,name:"npc_dota_hero_tiny",localized_name:"Tiny",primary_attr:"str",attack_type:"Melee",roles:["Carry","Nuker","Pusher","Initiator","Durable","Disabler"]},{id:20,name:"npc_dota_hero_vengefulspirit",localized_name:"Vengeful Spirit",primary_attr:"agi",attack_type:"Ranged",roles:["Support","Initiator","Disabler","Nuker","Escape"]},{id:21,name:"npc_dota_hero_windrunner",localized_name:"Windranger",primary_attr:"int",attack_type:"Ranged",roles:["Carry","Support","Disabler","Escape","Nuker"]},{id:22,name:"npc_dota_hero_zuus",localized_name:"Zeus",primary_attr:"int",attack_type:"Ranged",roles:["Nuker"]},{id:23,name:"npc_dota_hero_kunkka",localized_name:"Kunkka",primary_attr:"str",attack_type:"Melee",roles:["Carry","Disabler","Initiator","Durable","Nuker"]},{id:25,name:"npc_dota_hero_lina",localized_name:"Lina",primary_attr:"int",attack_type:"Ranged",roles:["Support","Carry","Nuker","Disabler"]},{id:26,name:"npc_dota_hero_lion",localized_name:"Lion",primary_attr:"int",attack_type:"Ranged",roles:["Support","Disabler","Nuker","Initiator"]},{id:27,name:"npc_dota_hero_shadow_shaman",localized_name:"Shadow Shaman",primary_attr:"int",attack_type:"Ranged",roles:["Support","Pusher","Disabler","Nuker","Initiator"]},{id:28,name:"npc_dota_hero_slardar",localized_name:"Slardar",primary_attr:"str",attack_type:"Melee",roles:["Carry","Durable","Initiator","Disabler","Escape"]},{id:29,name:"npc_dota_hero_tidehunter",localized_name:"Tidehunter",primary_attr:"str",attack_type:"Melee",roles:["Initiator","Durable","Disabler","Nuker"]},{id:30,name:"npc_dota_hero_witch_doctor",localized_name:"Witch Doctor",primary_attr:"int",attack_type:"Ranged",roles:["Support","Nuker","Disabler"]},{id:31,name:"npc_dota_hero_lich",localized_name:"Lich",primary_attr:"int",attack_type:"Ranged",roles:["Support","Nuker"]},{id:32,name:"npc_dota_hero_riki",localized_name:"Riki",primary_attr:"agi",attack_type:"Melee",roles:["Carry","Escape","Disabler"]},{id:33,name:"npc_dota_hero_enigma",localized_name:"Enigma",primary_attr:"int",attack_type:"Ranged",roles:["Disabler","Jungler","Initiator","Pusher"]},{id:34,name:"npc_dota_hero_tinker",localized_name:"Tinker",primary_attr:"int",attack_type:"Ranged",roles:["Carry","Nuker","Pusher"]},{id:35,name:"npc_dota_hero_sniper",localized_name:"Sniper",primary_attr:"agi",attack_type:"Ranged",roles:["Carry","Nuker"]},{id:36,name:"npc_dota_hero_necrolyte",localized_name:"Necrophos",primary_attr:"int",attack_type:"Ranged",roles:["Carry","Nuker","Durable","Disabler"]},{id:37,name:"npc_dota_hero_warlock",localized_name:"Warlock",primary_attr:"int",attack_type:"Ranged",roles:["Support","Initiator","Disabler"]},{id:38,name:"npc_dota_hero_beastmaster",localized_name:"Beastmaster",primary_attr:"str",attack_type:"Melee",roles:["Initiator","Disabler","Durable","Nuker"]},{id:39,name:"npc_dota_hero_queenofpain",localized_name:"Queen of Pain",primary_attr:"int",attack_type:"Ranged",roles:["Carry","Nuker","Escape"]},{id:40,name:"npc_dota_hero_venomancer",localized_name:"Venomancer",primary_attr:"agi",attack_type:"Ranged",roles:["Support","Nuker","Initiator","Pusher","Disabler"]},{id:41,name:"npc_dota_hero_faceless_void",localized_name:"Faceless Void",primary_attr:"agi",attack_type:"Melee",roles:["Carry","Initiator","Disabler","Escape","Durable"]},{id:42,name:"npc_dota_hero_skeleton_king",localized_name:"Wraith King",primary_attr:"str",attack_type:"Melee",roles:["Carry","Support","Durable","Disabler","Initiator"]},{id:43,name:"npc_dota_hero_death_prophet",localized_name:"Death Prophet",primary_attr:"int",attack_type:"Ranged",roles:["Carry","Pusher","Nuker","Disabler"]},{id:44,name:"npc_dota_hero_phantom_assassin",localized_name:"Phantom Assassin",primary_attr:"agi",attack_type:"Melee",roles:["Carry","Escape"]},{id:45,name:"npc_dota_hero_pugna",localized_name:"Pugna",primary_attr:"int",attack_type:"Ranged",roles:["Nuker","Pusher"]},{id:46,name:"npc_dota_hero_templar_assassin",localized_name:"Templar Assassin",primary_attr:"agi",attack_type:"Ranged",roles:["Carry","Escape"]},{id:47,name:"npc_dota_hero_viper",localized_name:"Viper",primary_attr:"agi",attack_type:"Ranged",roles:["Carry","Durable","Initiator","Disabler"]},{id:48,name:"npc_dota_hero_luna",localized_name:"Luna",primary_attr:"agi",attack_type:"Ranged",roles:["Carry","Nuker","Pusher"]},{id:49,name:"npc_dota_hero_dragon_knight",localized_name:"Dragon Knight",primary_attr:"str",attack_type:"Melee",roles:["Carry","Pusher","Durable","Disabler","Initiator","Nuker"]},{id:50,name:"npc_dota_hero_dazzle",localized_name:"Dazzle",primary_attr:"int",attack_type:"Ranged",roles:["Support","Nuker","Disabler"]},{id:51,name:"npc_dota_hero_rattletrap",localized_name:"Clockwerk",primary_attr:"str",attack_type:"Melee",roles:["Initiator","Disabler","Durable","Nuker"]},{id:52,name:"npc_dota_hero_leshrac",localized_name:"Leshrac",primary_attr:"int",attack_type:"Ranged",roles:["Carry","Support","Nuker","Pusher","Disabler"]},{id:53,name:"npc_dota_hero_furion",localized_name:"Nature's Prophet",primary_attr:"int",attack_type:"Ranged",roles:["Carry","Jungler","Pusher","Escape","Nuker"]},{id:54,name:"npc_dota_hero_life_stealer",localized_name:"Lifestealer",primary_attr:"str",attack_type:"Melee",roles:["Carry","Durable","Jungler","Escape","Disabler"]},{id:55,name:"npc_dota_hero_dark_seer",localized_name:"Dark Seer",primary_attr:"int",attack_type:"Melee",roles:["Initiator","Jungler","Escape","Disabler"]},{id:56,name:"npc_dota_hero_clinkz",localized_name:"Clinkz",primary_attr:"agi",attack_type:"Ranged",roles:["Carry","Escape","Pusher"]},{id:57,name:"npc_dota_hero_omniknight",localized_name:"Omniknight",primary_attr:"str",attack_type:"Melee",roles:["Support","Durable","Nuker"]},{id:58,name:"npc_dota_hero_enchantress",localized_name:"Enchantress",primary_attr:"int",attack_type:"Ranged",roles:["Support","Jungler","Pusher","Durable","Disabler"]},{id:59,name:"npc_dota_hero_huskar",localized_name:"Huskar",primary_attr:"str",attack_type:"Ranged",roles:["Carry","Durable","Initiator"]},{id:60,name:"npc_dota_hero_night_stalker",localized_name:"Night Stalker",primary_attr:"str",attack_type:"Melee",roles:["Carry","Initiator","Durable","Disabler","Nuker"]},{id:61,name:"npc_dota_hero_broodmother",localized_name:"Broodmother",primary_attr:"agi",attack_type:"Melee",roles:["Carry","Pusher","Escape","Nuker"]},{id:62,name:"npc_dota_hero_bounty_hunter",localized_name:"Bounty Hunter",primary_attr:"agi",attack_type:"Melee",roles:["Escape","Nuker"]},{id:63,name:"npc_dota_hero_weaver",localized_name:"Weaver",primary_attr:"agi",attack_type:"Ranged",roles:["Carry","Escape"]},{id:64,name:"npc_dota_hero_jakiro",localized_name:"Jakiro",primary_attr:"int",attack_type:"Ranged",roles:["Support","Nuker","Pusher","Disabler"]},{id:65,name:"npc_dota_hero_batrider",localized_name:"Batrider",primary_attr:"int",attack_type:"Ranged",roles:["Initiator","Jungler","Disabler","Escape"]},{id:66,name:"npc_dota_hero_chen",localized_name:"Chen",primary_attr:"int",attack_type:"Ranged",roles:["Support","Jungler","Pusher"]},{id:67,name:"npc_dota_hero_spectre",localized_name:"Spectre",primary_attr:"agi",attack_type:"Melee",roles:["Carry","Durable","Escape"]},{id:68,name:"npc_dota_hero_ancient_apparition",localized_name:"Ancient Apparition",primary_attr:"int",attack_type:"Ranged",roles:["Support","Disabler","Nuker"]},{id:69,name:"npc_dota_hero_doom_bringer",localized_name:"Doom",primary_attr:"str",attack_type:"Melee",roles:["Carry","Disabler","Initiator","Durable","Nuker"]},{id:70,name:"npc_dota_hero_ursa",localized_name:"Ursa",primary_attr:"agi",attack_type:"Melee",roles:["Carry","Jungler","Durable","Disabler"]},{id:71,name:"npc_dota_hero_spirit_breaker",localized_name:"Spirit Breaker",primary_attr:"str",attack_type:"Melee",roles:["Carry","Initiator","Disabler","Durable","Escape"]},{id:72,name:"npc_dota_hero_gyrocopter",localized_name:"Gyrocopter",primary_attr:"agi",attack_type:"Ranged",roles:["Carry","Nuker","Disabler"]},{id:73,name:"npc_dota_hero_alchemist",localized_name:"Alchemist",primary_attr:"str",attack_type:"Melee",roles:["Carry","Support","Durable","Disabler","Initiator","Nuker"]},{id:74,name:"npc_dota_hero_invoker",localized_name:"Invoker",primary_attr:"int",attack_type:"Ranged",roles:["Carry","Nuker","Disabler","Escape","Pusher"]},{id:75,name:"npc_dota_hero_silencer",localized_name:"Silencer",primary_attr:"int",attack_type:"Ranged",roles:["Carry","Support","Disabler","Initiator","Nuker"]},{id:76,name:"npc_dota_hero_obsidian_destroyer",localized_name:"Outworld Devourer",primary_attr:"int",attack_type:"Ranged",roles:["Carry","Nuker","Disabler"]},{id:77,name:"npc_dota_hero_lycan",localized_name:"Lycan",primary_attr:"str",attack_type:"Melee",roles:["Carry","Pusher","Jungler","Durable","Escape"]},{id:78,name:"npc_dota_hero_brewmaster",localized_name:"Brewmaster",primary_attr:"str",attack_type:"Melee",roles:["Carry","Initiator","Durable","Disabler","Nuker"]},{id:79,name:"npc_dota_hero_shadow_demon",localized_name:"Shadow Demon",primary_attr:"int",attack_type:"Ranged",roles:["Support","Disabler","Initiator","Nuker"]},{id:80,name:"npc_dota_hero_lone_druid",localized_name:"Lone Druid",primary_attr:"agi",attack_type:"Ranged",roles:["Carry","Pusher","Jungler","Durable"]},{id:81,name:"npc_dota_hero_chaos_knight",localized_name:"Chaos Knight",primary_attr:"str",attack_type:"Melee",roles:["Carry","Disabler","Durable","Pusher","Initiator"]},{id:82,name:"npc_dota_hero_meepo",localized_name:"Meepo",primary_attr:"agi",attack_type:"Melee",roles:["Carry","Escape","Nuker","Disabler","Initiator","Pusher"]},{id:83,name:"npc_dota_hero_treant",localized_name:"Treant Protector",primary_attr:"str",attack_type:"Melee",roles:["Support","Initiator","Durable","Disabler","Escape"]},{id:84,name:"npc_dota_hero_ogre_magi",localized_name:"Ogre Magi",primary_attr:"int",attack_type:"Melee",roles:["Support","Nuker","Disabler","Durable","Initiator"]},{id:85,name:"npc_dota_hero_undying",localized_name:"Undying",primary_attr:"str",attack_type:"Melee",roles:["Support","Durable","Disabler","Nuker"]},{id:86,name:"npc_dota_hero_rubick",localized_name:"Rubick",primary_attr:"int",attack_type:"Ranged",roles:["Support","Disabler","Nuker"]},{id:87,name:"npc_dota_hero_disruptor",localized_name:"Disruptor",primary_attr:"int",attack_type:"Ranged",roles:["Support","Disabler","Nuker","Initiator"]},{id:88,name:"npc_dota_hero_nyx_assassin",localized_name:"Nyx Assassin",primary_attr:"agi",attack_type:"Melee",roles:["Disabler","Nuker","Initiator","Escape"]},{id:89,name:"npc_dota_hero_naga_siren",localized_name:"Naga Siren",primary_attr:"agi",attack_type:"Melee",roles:["Carry","Support","Pusher","Disabler","Initiator","Escape"]},{id:90,name:"npc_dota_hero_keeper_of_the_light",localized_name:"Keeper of the Light",primary_attr:"int",attack_type:"Ranged",roles:["Support","Nuker","Disabler","Jungler"]},{id:91,name:"npc_dota_hero_wisp",localized_name:"Io",primary_attr:"str",attack_type:"Ranged",roles:["Support","Escape","Nuker"]},{id:92,name:"npc_dota_hero_visage",localized_name:"Visage",primary_attr:"int",attack_type:"Ranged",roles:["Support","Nuker","Durable","Disabler","Pusher"]},{id:93,name:"npc_dota_hero_slark",localized_name:"Slark",primary_attr:"agi",attack_type:"Melee",roles:["Carry","Escape","Disabler","Nuker"]},{id:94,name:"npc_dota_hero_medusa",localized_name:"Medusa",primary_attr:"agi",attack_type:"Ranged",roles:["Carry","Disabler","Durable"]},{id:95,name:"npc_dota_hero_troll_warlord",localized_name:"Troll Warlord",primary_attr:"agi",attack_type:"Ranged",roles:["Carry","Pusher","Disabler","Durable"]},{id:96,name:"npc_dota_hero_centaur",localized_name:"Centaur Warrunner",primary_attr:"str",attack_type:"Melee",roles:["Durable","Initiator","Disabler","Nuker","Escape"]},{id:97,name:"npc_dota_hero_magnataur",localized_name:"Magnus",primary_attr:"str",attack_type:"Melee",roles:["Initiator","Disabler","Nuker","Escape"]},{id:98,name:"npc_dota_hero_shredder",localized_name:"Timbersaw",primary_attr:"str",attack_type:"Melee",roles:["Nuker","Durable","Escape"]},{id:99,name:"npc_dota_hero_bristleback",localized_name:"Bristleback",primary_attr:"str",attack_type:"Melee",roles:["Carry","Durable","Initiator","Nuker"]},{id:100,name:"npc_dota_hero_tusk",localized_name:"Tusk",primary_attr:"str",attack_type:"Melee",roles:["Initiator","Disabler","Nuker"]},{id:101,name:"npc_dota_hero_skywrath_mage",localized_name:"Skywrath Mage",primary_attr:"int",attack_type:"Ranged",roles:["Support","Nuker","Disabler"]},{id:102,name:"npc_dota_hero_abaddon",localized_name:"Abaddon",primary_attr:"str",attack_type:"Melee",roles:["Support","Carry","Durable"]},{id:103,name:"npc_dota_hero_elder_titan",localized_name:"Elder Titan",primary_attr:"str",attack_type:"Melee",roles:["Initiator","Disabler","Nuker","Durable"]},{id:104,name:"npc_dota_hero_legion_commander",localized_name:"Legion Commander",primary_attr:"str",attack_type:"Melee",roles:["Carry","Disabler","Initiator","Durable","Nuker"]},{id:105,name:"npc_dota_hero_techies",localized_name:"Techies",primary_attr:"int",attack_type:"Ranged",roles:["Nuker","Disabler"]},{id:106,name:"npc_dota_hero_ember_spirit",localized_name:"Ember Spirit",primary_attr:"agi",attack_type:"Melee",roles:["Carry","Escape","Nuker","Disabler","Initiator"]},{id:107,name:"npc_dota_hero_earth_spirit",localized_name:"Earth Spirit",primary_attr:"str",attack_type:"Melee",roles:["Nuker","Escape","Disabler","Initiator","Durable"]},{id:108,name:"npc_dota_hero_abyssal_underlord",localized_name:"Underlord",primary_attr:"str",attack_type:"Melee",roles:["Support","Nuker","Disabler","Durable","Escape"]},{id:109,name:"npc_dota_hero_terrorblade",localized_name:"Terrorblade",primary_attr:"agi",attack_type:"Melee",roles:["Carry","Pusher","Nuker"]},{id:110,name:"npc_dota_hero_phoenix",localized_name:"Phoenix",primary_attr:"str",attack_type:"Ranged",roles:["Support","Nuker","Initiator","Escape","Disabler"]},{id:111,name:"npc_dota_hero_oracle",localized_name:"Oracle",primary_attr:"int",attack_type:"Ranged",roles:["Support","Nuker","Disabler","Escape"]},{id:112,name:"npc_dota_hero_winter_wyvern",localized_name:"Winter Wyvern",primary_attr:"int",attack_type:"Ranged",roles:["Support","Disabler","Nuker"]},{id:113,name:"npc_dota_hero_arc_warden",localized_name:"Arc Warden",primary_attr:"agi",attack_type:"Ranged",roles:["Carry","Escape","Nuker"]},{id:114,name:"npc_dota_hero_monkey_king",localized_name:"Monkey King",primary_attr:"agi",attack_type:"Melee",roles:["Carry","Escape","Disabler","Initiator"]}],player_id="",match_id="",player_name="",player_slot="",player_side="",player_won="",player_hero="",data="",player="",current_heroes=[],queryString=window.location.search.substring(1);if(queryString){for(var queries=queryString.split("&"),i=0;i<queries.length;i++){var param=queries[i].split("=");"match_id"==param[0]&&(match_id=String(param[1]),document.getElementById("match-id").value=match_id),"player_id"==param[0]&&(player_id=String(param[1]),document.getElementById("steam-acc").value=player_id),"player_name"==param[0]&&(player_name=decodeURI(String(param[1])),document.getElementById("steam-name").value=player_name,player_name=player_name.toLowerCase())}makeCard()}document.getElementById("submit-button").onclick=function(){if(match_id=document.getElementById("match-id").value,player_name=document.getElementById("steam-name").value,player_name=player_name.toLowerCase(),player_id=document.getElementById("steam-acc").value,""==match_id&&console.log("No Match ID"),""==player_name&&""==player_id)console.log("No player info");else{var a="match_id="+match_id+"&player_id="+player_id+"&player_name="+encodeURI(player_name);history.pushState(null,null,"?"+a),makeCard()}};