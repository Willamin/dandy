import { CharacterSheet } from "./DataModel/CharacterSheet";

const example: CharacterSheet = {
    sheetView: {
        currentLevel: 4,
        namePreference: "short",
        inventoryHistoryVisible: true,
        currentInventory: 0,
    },
    descriptive: {
        longName: "Finnian Darkthorn",
        shortName: "Finn",
        alignment: "Neutral-Good",
    },
    baseScores: {
        strength: 10,
        dexterity: 15,
        constitution: 11,
        intelligence: 12,
        wisdom: 10,
        charisma: 14,
    },
    species: {
        name: "Half-Elf",
        features: [
            {
                name: "Ability Score Increase",
                effects: [
                    { increaseAbility: "charisma" },
                    { increaseAbility: "charisma" },
                    { increaseAbility: "dexterity" },
                    { increaseAbility: "constitution" },
                ]
            },
            {
                name: "Darkvision",
                effects: [{vision: "dark", distance: 60}],
                description: "Thanks to your elf blood, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can’t discern color in darkness, only shades of gray.",
            },
            { 
                name: "Fey Ancestry", 
                description: "You have advantage on saving throws against being charmed, and magic can’t put you to sleep.",
            },
            {
                name: "Skill Versatility",
                effects: [
                  { skillProficiency: "persuasion" },
                  { skillProficiency: "performance" },
                ],
            },
            {
                name: "Languages",
                effects: [
                  { language: "Common" },
                  { language: "Elvish" },
                  { language: "Draconic" },
                ],
            },
            {
                name: "Walking Speed",
                effects: [
                  { walking: 30 },
                ],
            },
        ],
    },
    background: {
        name: "Sage",
        features: [
            {
                name: "Languages",
                effects: [
                    { language: "Dwarvish" },
                    { language: "Goblin" },
                ],
            },
            {
                name: "Skill Proficiency",
                effects: [
                    { skillProficiency: "arcana" },
                    { skillProficiency: "history" },
                ],
            },
        ],
        characteristics: {
            personality: [
              "There’s nothing I like more than a good mystery.",
              "I’ve read every book in the world’s greatest libraries—or I like to boast that I have.",
            ],
            ideals: [
              "Knowledge. The path to power and self-improvement is through knowledge. (Neutral)",
            ],
            bonds: [
              "I’ve been searching my whole life for the answer to a certain question.",
            ],
            flaws: [
              "Unlocking an ancient mystery is worth the price of a civilization.",
            ],
          },
    },
    inventoryHistory: [
        {
            comment: "Shopping: got mystery potions for free",
            items: [
                { name: "Gold Pieces", quantity: 635, currency: true },
                { name: "Gauntlets of Ogre Power", equipped: true, attuned: true },
                { name: "Studded Leather Armor", equipped: true },
                { name: "Waterskin" },
                { name: "Rations", quantity: 5 },
                { name: "Torch", quantity: 2 },
                { name: "Component Pouch" },
                { name: "Cultist Outfit", equipped: false },
                { name: "Cultist Sword", equipped: false },
                { name: "Sleepy Hat", equipped: true },
                { name: "Bag of Holding" },
                { name: "Nine Lives Stealer Longsword", attuned: true, equipped: true },
                { name: "Dragon Egg", quantity: 2, contained: "Bag of Holding"},
                { name: "Rapier +1 (Lamp)" },
                { name: "Mysterious Potion", quantity: 2, comment: "probably not health potions", contained: "Bag of Holding" },
            ]
        },
        {
            comment: "Shopping: bought rapier for 80gp",
            items: [
                { name: "Gold Pieces", quantity: 635, currency: true },
                { name: "Gauntlets of Ogre Power", equipped: true, attuned: true },
                { name: "Studded Leather Armor", equipped: true },
                { name: "Waterskin" },
                { name: "Rations", quantity: 5 },
                { name: "Torch", quantity: 2 },
                { name: "Component Pouch" },
                { name: "Cultist Outfit", equipped: false },
                { name: "Cultist Sword", equipped: false },
                { name: "Sleepy Hat", equipped: false },
                { name: "Bag of Holding" },
                { name: "Nine Lives Stealer Longsword", attuned: true, equipped: true },
                { name: "Dragon Egg", quantity: 2, contained: "Bag of Holding" },
                { name: "Rapier +1 (Lamp)", contained: "Bag of Holding" },
            ]
        },
        {
            comment: "Shopping: gave away bat corpse",
            items: [
                { name: "Gold Pieces", quantity: 715, currency: true },
                { name: "Gauntlets of Ogre Power", equipped: true, attuned: true },
                { name: "Studded Leather Armor", equipped: true },
                { name: "Waterskin" },
                { name: "Rations", quantity: 5 },
                { name: "Torch", quantity: 2 },
                { name: "Component Pouch" },
                { name: "Cultist Outfit", equipped: false },
                { name: "Cultist Sword", equipped: false },
                { name: "Sleepy Hat", equipped: false },
                { name: "Bag of Holding" },
                { name: "Nine Lives Stealer Longsword", attuned: true, equipped: true },
                { name: "Dragon Egg", quantity: 2, contained: "Bag of Holding"},
            ]
        },
        {
            comment: "Shopping: sold Greatsword for 45gp",
            items: [
                { name: "Gold Pieces", quantity: 715, currency: true },
                { name: "Gauntlets of Ogre Power", equipped: true, attuned: true },
                { name: "Studded Leather Armor", equipped: true },
                { name: "Waterskin" },
                { name: "Rations", quantity: 5 },
                { name: "Torch", quantity: 2 },
                { name: "Component Pouch" },
                { name: "Cultist Outfit", equipped: false },
                { name: "Cultist Sword", equipped: false },
                { name: "Sleepy Hat", equipped: false },
                { name: "Exsanguinated Bat Corpse" },
                { name: "Bag of Holding" },
                { name: "Nine Lives Stealer Longsword", attuned: true, equipped: true },
                { name: "Dragon Egg", quantity: 2, contained: "Bag of Holding"},
            ]
        },
        {
            comment: "Camped outside: gave wand to Di and broke an egg",
            items: [
                { name: "Gold Pieces", quantity: 670, currency: true },
                { name: "Gauntlets of Ogre Power", equipped: true, attuned: true },
                { name: "Studded Leather Armor", equipped: true },
                { name: "Waterskin" },
                { name: "Rations", quantity: 5 },
                { name: "Torch", quantity: 2 },
                { name: "Component Pouch" },
                { name: "Cultist Outfit", equipped: false },
                { name: "Cultist Sword", equipped: false },
                { name: "Sleepy Hat", equipped: false },
                { name: "Greatsword +1", equipped: false },
                { name: "Exsanguinated Bat Corpse" },
                { name: "Bag of Holding" },
                { name: "Nine Lives Stealer Longsword", attuned: true, equipped: true },
                { name: "Dragon Egg", quantity: 2, contained: "Bag of Holding"},
            ]
        },
        {
            comment: "Looted from hatchery",
            items: [
                { name: "Gold Pieces", quantity: 670, currency: true },
                { name: "Gauntlets of Ogre Power", equipped: true, attuned: true },
                { name: "Studded Leather Armor", equipped: true },
                { name: "Waterskin" },
                { name: "Rations", quantity: 5 },
                { name: "Torch", quantity: 2 },
                { name: "Component Pouch" },
                { name: "Cultist Outfit", equipped: false },
                { name: "Cultist Sword", equipped: false },
                { name: "Sleepy Hat", equipped: false },
                { name: "Greatsword +1", equipped: true, comment: "bonded as pact weapon" },
                { name: "Exsanguinated Bat Corpse" },
                { name: "Bag of Holding" },
                { name: "Wand of Wonder", attuned: true },
                { name: "Nine Lives Stealer Longsword", attuned: false, equipped: true },
                { name: "Dragon Egg", quantity: 3, contained: "Bag of Holding"},
            ]
        },
        {
            comment: "Looted from treasure chest",
            items: [
                { name: "Gold Pieces", quantity: 670, currency: true },
                { name: "Gauntlets of Ogre Power", equipped: true, attuned: true },
                { name: "Studded Leather Armor", equipped: true },
                { name: "Waterskin" },
                { name: "Rations", quantity: 5 },
                { name: "Torch", quantity: 2 },
                { name: "Component Pouch" },
                { name: "Cultist Outfit", equipped: false },
                { name: "Cultist Sword", equipped: false },
                { name: "Sleepy Hat", equipped: false },
                { name: "Greatsword +1", equipped: true, comment: "bonded as pact weapon" },
                { name: "Exsanguinated Bat Corpse" },
                { name: "Bag of Holding" },
                { name: "Wand of Wonder", attuned: true },
            ]
        },
        {
            comment: "Looted from barracks",
            items: [
                { name: "Gold Pieces", quantity: 345, currency: true },
                { name: "Gauntlets of Ogre Power", equipped: true, attuned: true },
                { name: "Studded Leather Armor", equipped: true },
                { name: "Waterskin" },
                { name: "Rations", quantity: 5 },
                { name: "Torch", quantity: 2 },
                { name: "Component Pouch" },
                { name: "Cultist Outfit", equipped: false },
                { name: "Cultist Sword", equipped: false },
                { name: "Sleepy Hat", equipped: false },
                { name: "Greatsword +1", equipped: true, comment: "bonded as pact weapon" },
                { name: "Exsanguinated Bat Corpse" },
                { name: "Bag of Holding" },
                { name: "Wand of Wonder", attuned: true },
            ]
        },
        {
            comment: "Looted after fighting Cyanwrath",
            items: [
                { name: "Gold Pieces", quantity: 335, currency: true },
                { name: "Gauntlets of Ogre Power", equipped: true, attuned: true },
                { name: "Studded Leather Armor", equipped: true },
                { name: "Waterskin" },
                { name: "Rations", quantity: 5 },
                { name: "Torch", quantity: 2 },
                { name: "Component Pouch" },
                { name: "Cultist Outfit", equipped: false },
                { name: "Cultist Sword", equipped: false },
                { name: "Sleepy Hat", equipped: false },
                { name: "Greatsword +1", equipped: true, comment: "bonded as pact weapon" },
                { name: "Exsanguinated Bat Corpse" },
                { name: "Bag of Holding" },
                { name: "Wand of Wonder", attuned: true },
            ]
        },
        { comment: "---" },
        {
            comment: "Looted after fighting trash monsters",
            items: [
                { name: "Gold Pieces", quantity: 335, currency: true },
                { name: "Gauntlets of Ogre Power", equipped: true, attuned: true },
                { name: "Studded Leather Armor", equipped: true },
                { name: "Waterskin" },
                { name: "Rations", quantity: 5 },
                { name: "Torch", quantity: 2 },
                { name: "Component Pouch" },
                { name: "Cultist Outfit", equipped: false },
                { name: "Cultist Sword", equipped: false },
                { name: "Sleepy Hat", equipped: false },
                { name: "Greatsword +1", equipped: true, comment: "bonded as pact weapon" },
                { name: "Exsanguinated Bat Corpse" },
            ]
        },
        {
            comment: "Looted after fighting stirges",
            items: [
                { name: "Gold Pieces", quantity: 222, currency: true },
                { name: "Gauntlets of Ogre Power", equipped: true, attuned: true },
                { name: "Studded Leather Armor", equipped: true },
                { name: "Waterskin" },
                { name: "Rations", quantity: 5 },
                { name: "Torch", quantity: 2 },
                { name: "Component Pouch" },
                { name: "Cultist Outfit", equipped: false },
                { name: "Cultist Sword", equipped: false },
                { name: "Sleepy Hat", equipped: false },
                { name: "Greatsword +1", equipped: true, comment: "bonded as pact weapon" },
                { name: "Exsanguinated Bat Corpse" },
            ]
        },
        { comment: "---" },
        {
            comment: "Shopping: bought greatsword for 50gp",
            items: [
                { name: "Gold Pieces", quantity: 222, currency: true },
                { name: "Gauntlets of Ogre Power", equipped: true, attuned: true },
                { name: "Studded Leather Armor", equipped: true },
                { name: "Waterskin" },
                { name: "Rations", quantity: 5 },
                { name: "Torch", quantity: 2 },
                { name: "Component Pouch" },
                { name: "Cultist Outfit", equipped: false },
                { name: "Cultist Sword", equipped: false },
                { name: "Sleepy Hat", equipped: true },
                { name: "Greatsword +1", equipped: true, comment: "bonded as pact weapon" }
            ]
        },
        {
            comment: "Shopping: bought hat for 1gp",
            items: [
                { name: "Gold Pieces", quantity: 272, currency: true },
                { name: "Gauntlets of Ogre Power", equipped: true, attuned: true },
                { name: "Studded Leather Armor", equipped: true },
                { name: "Waterskin" },
                { name: "Rations", quantity: 5 },
                { name: "Torch", quantity: 2 },
                { name: "Component Pouch" },
                { name: "Cultist Outfit", equipped: false },
                { name: "Cultist Sword", equipped: false },
                { name: "Sleepy Hat", equipped: true },
            ]
        },
        {
            comment: "Reward for returning with info about the camp",
            items: [
                { name: "Gold Pieces", quantity: 273, currency: true },
                { name: "Gauntlets of Ogre Power", equipped: true, attuned: true },
                { name: "Studded Leather Armor", equipped: true },
                { name: "Waterskin" },
                { name: "Rations", quantity: 5 },
                { name: "Torch", quantity: 2 },
                { name: "Component Pouch" },
                { name: "Cultist Outfit", equipped: false },
                { name: "Cultist Sword", equipped: false },
            ]
        },
        {
            comment: "Looted equipment from encounter",
            items: [
                { name: "Gold Pieces", quantity: 23, currency: true },
                { name: "Gauntlets of Ogre Power", equipped: true, attuned: true },
                { name: "Studded Leather Armor", equipped: true },
                { name: "Waterskin" },
                { name: "Rations", quantity: 5 },
                { name: "Torch", quantity: 2 },
                { name: "Component Pouch" },
                { name: "Cultist Outfit", equipped: false },
                { name: "Cultist Sword", equipped: false },
            ]
        },
        { comment: "---" },
        {
            comment: "Starting Magic Item",
            items: [
                { name: "Gold Pieces", quantity: 23, currency: true },
                { name: "Gauntlets of Ogre Power", equipped: true, attuned: true },
                { name: "Studded Leather Armor", equipped: true },
                { name: "Waterskin" },
                { name: "Rations", quantity: 5 },
                { name: "Torch", quantity: 2 },
                { name: "Component Pouch" }
            ]
        },
        {
            comment: "Starting Equipment",
            items: [
                { name: "Gold Pieces", quantity: 23, currency: true },
                { name: "Studded Leather Armor", equipped: true },
                { name: "Waterskin" },
                { name: "Rations", quantity: 5 },
                { name: "Torch", quantity: 2 },
                { name: "Component Pouch" }
            ]
        },
        {
            comment: "Starting Gold",
            items: [
                { name: "Gold Pieces", quantity: 100, currency: true }
            ]
        },
    ],
    compendium: {
        classes: [
            {
                name: "Warlock",
                hitDice: 8,
            },
            {
                name: "Fighter",
                hitDice: 10,
            }
        ],
        spells: [
            {
                "name": "Minor Illusion",
                "level": 0,
                "description": "Illusion Cantrip\n---\nCasting Time: 1 action\nRange/Area: 30 ft./5ft cube\nComponents: S, M (a bit of fleece)\nDuration: 1 minute\n---\nYou create a sound or an image of an object within range that lasts for the duration. The illusion also ends if you dismiss it as an action or cast this spell again.\nIf you create a sound, its volume can range from a whisper to a scream. It can be your voice, someone else's voice, a lion's roar, a beating of drums, or any other sound you choose. The sound continues unabated throughout the duration, or you can make discrete sounds at different times before the spell ends.\nIf you create an image of an object--such as a chair, muddy footprints, or a small chest--it must be no larger than a 5-foot cube. The image can't create sound, light, smell, or any other sensory effect. Physical interaction with the image reveals it to be an illusion, because things can pass through it.\nIf a creature uses its action to examine the sound or image, the creature can determine that it is an illusion with a successful Intelligence (Investigation) check against your spell save DC. If a creature discerns the illusion for what it is, the illusion becomes faint to the creature.\n"
            },
            {
                "name": "Prestidigitation",
                "level": 0,
                "description": "Transmutation Cantrip \n---\nCasting Time: 1 action\nRange/Area: 10ft.\nComponents: V, S\nDuration: 1 hour\n---\nThis spell is a minor magical trick that novice spellcasters use for practice. You create one of the following magical effects within range:\n  * You create an instantaneous, harmless sensory effect, such as a shower of sparks, a puff of wind, faint musical notes, or an odd odor.\n  * You instantaneously light or snuff out a candle, a torch, or a small campfire.\n  * You instantaneously clean or soil an object no larger than 1 cubic foot.\n  * You chill, warm, or flavor up to 1 cubic foot of nonliving material for 1 hour.\n  * You make a color, a small mark, or a symbol appear on an object or a surface for 1 hour.\n  * You create a nonmagical trinket or an illusory image that can fit in your hand and that lasts until the end of your next turn.\nIf you cast this spell multiple times, you can have up to three of its non-instantaneous effects active at a time, and you can dismiss such an effect as an action.\n"
            },
            {
                "name": "Vicious Mockery",
                "level": 0,
                "description": "Enchantment Cantrip\n---\nCasting Time: 1 action\nRange/Area: 60 feet\nComponents: V\nDuration: Instantaneous\n---\nYou unleash a string of insults laced with subtle enchantments at a creature you can see within range. If the target can hear you (though it need not understand you), it must succeed on a Wisdom saving throw or take 1d4 psychic damage and have disadvantage on the next attack roll it makes before the end of its next turn.\nThis spell's damage increases by 1d4 when you reach 5th level (2d4), 11th level (3d4), and 17th level (4d4).\n"
            },
            {
                "name": "Eldritch Blast",
                "level": 0,
                "description": "Evocation Cantrip\n---\nCasting Time: 1 action\nRange: 120 feet\nComponents: V, S\nDuration: Instantaneous\n---\nA beam of crackling energy straks toward a creature within range. Make a ranged spell attack against the target. On a hit, the target takes 1d10 force damage.\nThe spell creates more than one beam when you reach higher levels: two beams at 5th level, three beams at 11th level, and four beams at 17th level. You can direct the beams at the same target or at different ones. Make a separate attack roll for each beam.\n"
            },
            {
                "name": "Bestow Curse",
                "level": 3,
                "description": "3rd-level Necromancy\n---\nCasting Time: 1 action\nRange: Touch\nComponents: V, S\nDuration: Concentration, up to 1 minute\n---\nYou touch a creature, and that creature must succeed a Wisdom saving throw or become cursed for the duration of the spell. When you cast this spell, choose the nature of the curse from the following options:\n  * Choose one ability score. While cursed, the target has disadvantage on ability checks and saving throws made with that ability score.\n  * While cursed, the target has disadvantage on attack rolls against you.\n  * While cursed, the target must make a Wisdom saving throw at the start of each of its turns. If it fails, it wastes its action that turn doing nothing.\n  * While the target is cursed, your attacks and spells deal an extra 1d8 necrotic damage to the target.\nA remove curse spell ends this effect. At the GM's option, you may choose an alternative curse effect, but it should be no more powerful than those described above. The GM has final say on such a curse's effect.\nAt Higher Levels. If you cast this spell using a spell slot of 4th level or higher, the duration is concentration, up to 10 minutes. If you use a spell slot of 5th level or higher, the duration is 8 hours. If you use a spell slot of 7th level or higher, the duration is 24 hours. If you use a 9th level spell slot, the spell lasts until it is dispelled. Using a spell slot of 5th level or higher grants a duration that doesn't require concentration.\n"
            },
            {
                "name": "Charm Person",
                "level": 1,
                "description": "1st-level Enchantment\n---\nCasting Time: 1 action\nRange: 30 feet\nComponents: V, S\nDuration: 1 hour\n---\nYou attempt to charm a humanoid you can see within range. It must make a Wisdom saving throw, and does so with advantage if you or your companions are fighting it. If it fails the saving throw, it is charmed by you until the spell ends or until you or your companions do anything harmful to it. The charmed creature regards you as a friendly acquaintance. When the spell ends, the creature knows it was charmed by you.\nAt Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, you can target one additional creature for each slot level above 1st. The creatures must be within 30 feet of each other when you target them.\n"
            },
            {
                "name": "Cure Wounds",
                "level": 1,
                "description": "1st-level evocation\n---\nCasting Time: 1 action\nRange: Touch\nComponents: V, S\nDuration: Instantaneous\n---\nA creature you touch regains a number of hit points equal to 1d8 + your spellcasting ability modifier. This spell has no effect on undead of constructs.\nAt Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, the healing increases by 1d8 for each slot level above 1st.\n"
            },
            {
                "name": "Healing Word",
                "level": 1,
                "description": "1st-level evocation\n---\nCasting Time: 1 bonus action\nRange: 60 feet\nComponents: V\nDuration: Instantaneous\n---\nA creature of your choice that you can see within range regains hit points equal to 1d4 + your spellcasting ability modifier. This spell has no effect on undead of constructs.\nAt Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, the healing increases by 1d4 for each slot level above 1st.\n"
            },
            {
                "name": "Unseen Servant",
                "level": 1,
                "description": "1st-level conjuration (ritual)\n---\nCasting Time: 1 action\nRange: 60 feet\nComponents: V, S, M (a piece of string and a bit of wood)\nDuration: 1 hour\n---\nThis spell creates an invisible, mindless, shapeless force that performs simple tasks at your command until the spell ends. The servant springs into existence in an unoccupied space on the ground within range. It has AC 10, 1 hit point, and a Strength of 2, and it can’t attack. If it drops to 0 hit points, the spell ends.\nOnce on each of your turns as a bonus action, you can mentally command the servant to move up to 15 feet and interact with an object. The servant can perform simple tasks that a human servant could do, such as fetching things, cleaning, mending, folding clothes, lighting fires, serving food, and pouring wine. Once you give the command, the servant performs the task to the best of its ability until it completes the task, then waits for your next command.\nIf you command the servant to perform a task that would move it more than 60 feet away from you, the spell ends.\n"
            },
            {
                "name": "Comprehend Languages",
                "level": 1,
                "description": "1st-level divination (ritual)\n---\nCasting Time: 1 action\nRange: self\nComponents: V, S, M (a pinch of soot and salt)\nDuration: 1 hour\n---\nFor the duration, you understand the literal meaning of any spoken language that you hear. You also understand any written language that you see, but you must be touching the surface on which the words are written. It takes about 1 minute to read one page of text.\nThis spell doesn’t decode secret messages in a text or a glyph, such as an arcane sigil, that isn’t part of a written language.\n"
            },
            {
                "name": "Invisibility",
                "level": 2,
                "description": "2nd-level illusion\n---\nCasting Time: 1 action\nRange: Touch\nComponents: V, S, M (an eyelash encased in gum arabic)\nDuration: Concentration, up to 1 hour\n---\nA creature you touch becomes invisible until the spell ends. Anything the target is wearing or carrying is invisible as long as it is on the target's person. The spell ends for a target that attacks or casts a spell.\nAt Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, you can target one additional creature for each slot level above 2nd.\n"
            },
            {
                "name": "Detect Thoughts",
                "level": 2,
                "description": "2nd-level divination\n---\nCasting Time: 1 action\nRange: Self\nComponents: V, S, M (a copper piece)\nDuration: Concentration, up to 1 minute\n---\nFor the duration, you can read the thoughts of certain creatures. When you cast the spell and as your action on each turn until the spell ends, you can focus your mind on any one creature that you can see within 30 feet of you. If the creature you choose has an Intelligence of 3 or lower or doesn’t speak any language, the creature is unaffected.\nYou initially learn the surface thoughts of the creature—what is most on its mind in that moment. As an action, you can either shift your attention to another creature’s thoughts or attempt to probe deeper into the same creature’s mind. If you probe deeper, the target must make a Wisdom saving throw. If it fails, you gain insight into its reasoning (if any), its emotional state, and something that looms large in its mind (such as something it worries over, loves, or hates). If it succeeds, the spell ends. Either way, the target knows that you are probing into its mind, and unless you shift your attention to another creature’s thoughts, the creature can use its action on its turn to make an Intelligence check contested by your Intelligence check; if it succeeds, the spell ends.\nQuestions verbally directed at the target creature naturally shape the course of its thoughts, so this spell is particularly effective as part of an interrogation.\nYou can also use this spell to detect the presence of thinking creatures you can’t see. When you cast the spell or as your action during the duration, you can search for thoughts within 30 feet of you. The spell can penetrate barriers, but 2 feet of rock, 2 inches of any metal other than lead, or a thin sheet of lead blocks you. You can’t detect a creature with an Intelligence of 3 or lower or one that doesn’t speak any language.\nOnce you detect the presence of a creature in this way, you can read its thoughts for the rest of the duration as described above, even if you can’t see it, but it must still be within range.\n"
            },
            {
                "name": "Sending",
                "level": 3,
                "description": "3rd-level evocation\n---\nCasting Time: 1 action\nRange: Unlimited\nComponents: V, S, M (a short piece of fine copper wire)\nDuration: 1 round\n---\nYou send a short message of twenty-five words or less to a creature with which you are familiar. The creature hears the message in its mind, recognizes you as the sender if it knows you, and can answer in a like manner immediately. The spell enables creatures with Intelligence scores of at least 1 to understand the meaning of your message.\nYou can send the message across any distance and even to other planes of existence, but if the target is on a different plane than you, there is a 5 percent chance that the message doesn’t arrive.\n"
            },
            {
                "name": "Command",
                "level": 1,
                "description": "1st-level enchantment\n---\nCasting Time: 1 action\nRange: 60 feet\nComponents: V\nDuration: 1 round\n---\nYou speak a one-word command to a creature you can see within range. The target must succeed on a Wisdom saving throw or follow the command on its next turn. The spell has no effect if the target is undead, if it doesn’t understand your language, or if your command is directly harmful to it.\nSome typical commands and their effects follow. You might issue a command other than one described here. If you do so, the GM determines how the target behaves. If the target can’t follow your command, the spell ends.\n  * Approach. The target moves toward you by the shortest and most direct route, ending its turn if it moves within 5 feet of you.\n  * Drop. The target drops whatever it is holding and then ends its turn.\n  * Flee. The target spends its turn moving away from you by the fastest available means.\n  * Grovel. The target falls prone and then ends its turn.\n  * Halt. The target doesn’t move and takes no actions. A flying creature stays aloft, provided that it is able to do so. If it must move to stay aloft, it flies the minimum distance needed to remain in the air.\nAt Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, you can affect one additional creature for each slot level above 1st. The creatures must be within 30 feet of each other when you target them.\n"
            },
            {
                "name": "Greater Invisibility",
                "level": 4,
                "description": "4th-level illusion\n---\nCasting Time: 1 action\nRange: Touch\nComponents: V, S\nDuration: Concentration, up to 1 minute\n---\nYou or a creature you touch becomes invisible until the spell ends. Anything the target is wearing or carrying is invisible as long as it is on the target’s person.\n"
            },
            {
                "name": "Misty Step",
                "level": 2,
                "description": "2nd-level conjuration\n---\nCasting Time: 1 bonus action\nRange: self\nComponents: V\nDuration: Instantaneous\n---\nBriefly surrounded by silvery mist, you teleport up to 30 feet to an unoccupied space that you can see.\n"
            },
            {
                "name": "Dissonant Whispers",
                "level": 1,
                "description": "1st-level enchantment\n---\nCasting Time: 1 action\nRange: 60 feet\nComponents: V\nDuration: Instantaneous\n---\nYou whisper a discordant melody that only one creature of your choice within range can hear, wracking it with terrible pain. The target must make a Wisdom saving throw. On a failed save, it takes 3d6 psychic damage and must immediately use its reaction, if available, to move as far as its speed allows away from you. The creature doesn’t move into obviously dangerous ground, such as a fire or a pit. On a successful save, the target takes half as much damage and doesn’t have to move away. A deafened creature automatically succeeds on the save.\nAt Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d6 for each slot level above 1st.\n"
            },
            {
                "name": "Dimension Door",
                "level": 4,
                "description": "4th-level conjuration\n---\nCasting Time: 1 action\nRange: 500 feet\nComponents: V\nDuration: Instantaneous\n---\nYou teleport yourself from your current location to any other spot within range. You arrive at exactly the spot desired. It can be a place you can see, one you can visualize, or one you can describe by stating distance and direction, such as “200 feet straight downward” or “upward to the northwest at a 45-degree angle, 300 feet.”\nYou can bring along objects as long as their weight doesn’t exceed what you can carry. You can also bring one willing creature of your size or smaller who is carrying gear up to its carrying capacity. The creature must be within 5 feet of you when you cast this spell.\nIf you would arrive in a place already occupied by an object or a creature, you and any creature traveling with you each take 4d6 force damage, and the spell fails to teleport you.\n"
            },
            {
                "name": "Geas",
                "level": 5,
                "description": "5th-level enchantment\n---\nCasting Time: 1 minute\nRange: 60 feet\nComponents: V\nDuration: 30 days\n---\nYou place a magical command on a creature that you can see within range, forcing it to carry out some service or refrain from some action or course of activity as you decide. If the creature can understand you, it must succeed on a Wisdom saving throw or become charmed by you for the duration. While the creature is charmed by you, it takes 5d10 psychic damage each time it acts in a manner directly counter to your instructions, but no more than once each day. A creature that can’t understand you is unaffected by the spell.\nYou can issue any command you choose, short of an activity that would result in certain death. Should you issue a suicidal command, the spell ends.\nYou can end the spell early by using an action to dismiss it. A remove curse, greater restoration, or wish spell also ends it.\nAt Higher Levels. When you cast this spell using a spell slot of 7th or 8th level, the duration is 1 year. When you cast this spell using a spell slot of 9th level, the spell lasts until it is ended by one of the spells mentioned above.\n"
            },
            {
                "name": "Counterspell",
                "level": 3,
                "description": "3rd-level abjuration\n---\nCasting Time: 1 reaction, which you take when you see a creature within 60 feet of you casting a spell\nRange: 60 feet\nComponents: S\nDuration: Instantaneous\n---\nYou attempt to interrupt a creature in the process of casting a spell. If the creature is casting a spell of 3rd level or lower, its spell fails and has no effect. If it is casting a spell of 4th level or higher, make an ability check using your spellcasting ability. The DC equals 10 + the spell's level. On a success, the creature's spell fails and has no effect.\nAt Higher Levels. When you cast this spell using a spell slot of 4th level or higher, the interrupted spell has no effect if its level is less than or equal to the level of the spell slot you used.\n"
            },
            {
                "name": "Seeming",
                "level": 5,
                "description": "5th-level illusion\n---\nCasting Time: 1 action \nRange: 30 feet \nComponents: V, S \nDuration: 8 hours\n---\nThis spell allows you to change the appearance of any number of creatures that you can see within range. You give each target you choose a new, illusory appearance. An unwilling target can make a Charisma saving throw, and if it succeeds, it is unaffected by this spell.\nThe spell disguises physical appearance as well as clothing, armor, weapons, and equipment. You can make each creature seem 1 foot shorter or taller and appear thin, fat, or in between. You can’t change a target’s body type, so you must choose a form that has the same basic arrangement of limbs. Otherwise, the extent of the illusion is up to you. The spell lasts for the duration, unless you use your action to dismiss it sooner.\nThe changes wrought by this spell fail to hold up to physical inspection. For example, if you use this spell to add a hat to a creature’s outfit, objects pass through the hat, and anyone who touches it would feel nothing or would feel the creature’s head and hair. If you use this spell to appear thinner than you are, the hand of someone who reaches out to touch you would bump into you while it was seemingly still in midair.\nA creature can use its action to inspect a target and make an Intelligence (Investigation) check against your spell save DC. If it succeeds, it becomes aware that the target is disguised.\n"
            },
            {
                "name": "Burning Hands",
                "level": 1,
                "description": "1st-level evocation\n---\nCasting Time: 1 action\nRange: self / 15-foot cone\nComponents: V, S\nDuration: Instantaneous\n---\nAs you hold your hands with thumbs touching and fingers spread, a thin sheet of flames shoots forth from your outstretched fingertips. Each creature in a 15-foot cone must make a Dexterity saving throw. A creature takes 3d6 fire damage on a failed save, or half as much damage on a successful one.\nThe fire ignites any flammable objects in the area that aren't being worn or carried.\nAt Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d6 for each slot level above 1st."
            },
            {
                "name": "Scorching Ray",
                "level": 2,
                "description": "2nd-level evocation\n---\nCasting Time: 1 action\nRange: 120 feet\nComponents: V, S\nDuration: Instantaneous\n---\nYou create three rays of fire and hurl them at targets within range. You can hurl them at one target or several.\nMake a ranged spell attack for each ray. On a hit, the target takes 2d6 fire damage.\nAt Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, you create one additional ray for each slot level above 2nd."
            },
            {
                "name": "Hex",
                "level": 1,
                "description": "1st-level enchantment\n---\nCasting Time: 1 bonus action\nRange: 90 feet\nComponents: V, S, M (the petrified eye of a newt)\nDuration: Concentration, up to 1 hour\n---\nYou place a curse on a creature that you can see within range. Until the spell ends, you deal an extra 1d6 necrotic damage to the target whenever you hit it with an attack. Also, choose one ability when you cast the spell. The target has disadvantage on ability checks made with the chosen ability.\nIf the target drops to 0 hit points before this spell ends, you can use a bonus action on a subsequent turn of yours to curse a new creature.\nA remove curse cast on the target ends this spell early.\nAt Higher Levels. When you cast this spell using a spell slot of 3rd or 4th level, you can maintain your concentration on the spell for up to 8 hours. When you use a spell slot of 5th level or higher, you can maintain your concentration on the spell for up to 24 hours."
            },
            {
                "name": "Witch Bolt",
                "level": 1,
                "description": "1st-level evocation\n---\nCasting Time: 1 action\nRange: 30 feet\nComponents: V, S, M (a twig from a tree that has been struck by lightning)\nDuration: Concentration, up to 1 minute\n---\nA beam of crackling, blue energy lances out toward a creature within range, forming a sustained arc of lightning between you and the target. Make a ranged spell attack against that creature. On a hit, the target takes 1d12 lightning damage, and on each of your turns for the duration, you can use your action to deal 1d12 lightning damage to the target automatically. The spell ends if you use your action to do anything else. The spell also ends if the target is ever outside the spell’s range or if it has total cover from you.\nAt Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, the initial damage increases by 1d12 for each slot level above 1st."
            }
              
        ],
        items: [
            { 
                name: "Studded Leather Armor",
                type: "armor",
                armorType: "light",
                description: "Light armor\nAC: 12 + Dex modifier\n---\nMade from tough but flexible leather, studded leather is reinforced with close-set rivets or spikes.",
                equippedEffects: [
                    {
                        armorClassBase: 12,
                        dexModMultiplier: 1,
                    }
                ]
            },
            {
                name: "Gauntlets of Ogre Power",
                description: "Wondrous item, uncommon (requires attunement)\n---\nYour Strength score is 19 while you wear these gauntlets. They have no effect on you if your Strength is 19 or higher without them.",
                type: "item",
                equippedAndAttunedEffects: [
                    {
                        setAbility: "strength",
                        minimum: 19,
                    }
                ]
            },
            {
                name: "Component Pouch",
                description: "A Component Pouch is a small, watertight leather belt pouch that has compartments to hold all the material components and other special items you need to cast your spells, except for those components that have a specific cost (as indicated in a spell's description).",
                type: "item",
            },
            {
                name: "Greatsword +1",
                description: "You have a +1 bonus to attack and damage rolls made with this magic weapon.",
                type: "weapon",

                heavy: true,
                twoHanded: true,

                equippedEffects: [
                    {
                        attackType: "melee",
                        reach: 5, // feet
        
                        damageType: "slashing",
                        damage: {
                            d6: 2,
                            bonus: 1,
                        },       
                    },
                ]
            },
            {
                name: "Nine Lives Stealer Longsword",
                description: "Weapon (longsword), very rare (requires attunement)\n---\nOne-handed: melee, 5 ft reach, slashing: 1d8 + STR mod + 2\n\nTwo-handed: melee, 5ft reach, slashing: 1d10 + STR mod + 2\n---\nYou gain a +2 bonus to attack and damage rolls made with this magic weapon.\n\nThe sword has 1d8 + 1 charges. If you score a critical hit against a creature that has fewer than 100 hit points, it must succeed on a DC 15 Constitution saving throw or be slain instantly as the sword tears its life force from its body (a construct or an undead is immune). The sword loses 1 charge if the creature is slain. When the sword has no charges remaining, it loses this property.",
                type: "weapon",

                versatile: true,
                equippedEffects: [
                    {
                        name: "one-handed",
                        attackType: "melee",
                        reach: 5, // feet
        
                        damageType: "slashing",
                        damage: {
                            d8: 1,
                            bonus: 2,
                        },       
                    },
                    {
                        name: "two-handed",
                        attackType: "melee",
                        reach: 5, // feet
        
                        damageType: "slashing",
                        damage: {
                            d10: 1,
                            bonus: 2,
                        },       
                    },
                ]
            },
            {
                name: "Bag of Holding",
                type: "item",
                description: "This bag has an interior space considerably larger than its outside dimensions, roughly 2 feet in diameter at the mouth and 4 feet deep. The bag can hold up to 500 pounds, not exceeding a volume of 64 cubic feet. The bag weighs 15 pounds, regardless of its contents. Retrieving an item from the bag requires an action.\n\nIf the bag is overloaded, pierced, or torn, it ruptures and is destroyed, and its contents are scattered in the Astral Plane. If the bag is turned inside out, its contents spill forth, unharmed, but the bag must be put right before it can be used again. Breathing creatures inside the bag can survive up to a number of minutes equal to 10 divided by the number of creatures (minimum 1 minute), after which time they begin to suffocate.\n\nPlacing a bag of holding inside an extradimensional space created by a handy haversack, portable hole, or similar item instantly destroys both items and opens a gate to the Astral Plane. The gate originates where the one item was placed inside the other. Any creature within 10 feet of the gate is sucked through it to a random location on the Astral Plane. The gate then closes. The gate is one-way only and can’t be reopened."
            },
            {
                name: "Sleepy Hat",
                type: "item",
                description: "When willingly worn, puts the wearer to sleep.",
            },
            {
                name: "Rapier +1 (Lamp)",
                type: "weapon",
                description: "a button on the hilt toggles the blade being lit",
                
                finesse: true,
                equippedEffects: [
                    {
                        name: "attack",
                        attackType: "melee",
                        reach: 5, // feet
        
                        damageType: "piercing",
                        damage: {
                            d8: 1,
                            bonus: 1,
                        },       
                    },
                ],
            }
        ]
    },
    levels: [
        {
            class: "Fighter",
            features: [
                {
                    name: "Armor Proficiency",
                    effects: [
                        { armorProficiency: "light" },
                        { armorProficiency: "medium" },
                        { armorProficiency: "heavy" },
                        { armorProficiency: "shields" },
                    ],
                },
                {
                    name: "Weapon Proficiency",
                    effects: [
                        { weaponProficiency: "simple"},
                        { weaponProficiency: "martial"},
                    ],
                },
                {
                    name: "Saving Throw Proficiency",
                    effects: [
                        { savingProficiency: "strength" },
                        { savingProficiency: "constitution" },
                    ],
                },
                {
                    name: "Skill Proficiency",
                    effects: [
                        { skillProficiency: "perception" },
                        { skillProficiency: "insight" },
                    ],
                },
                {
                    name: "Fighting Style: Two Weapon Fighting",
                    description: "When you engage in two-weapon fighting, you can add your ability modifier to the damage of the second attack."
                },
                {
                    name: "Second Wind",
                    description: "You have a limited well of stamina that you can draw on to protect yourself from harm. On your turn, you can use a bonus action to regain hit points equal to 1d10 + your fighter level. Once you use this feature, you must finish a short or long rest before you can use it again."
                }
            ],
        },
        {
            class: "Warlock",
            features: [
                {
                    name: "Skill Proficiency",
                    effects: [
                        { skillProficiency: "deception" },
                        { skillProficiency: "intimidation" },
                    ],
                }, {
                    name: "Otherworldly Patron: The Fiend",
                    description: "At 1st level, you have struck a bargain with an otherworldly being of your choice: the Fiend, which is detailed at the end of the class description, or one from another source. Your choice grants you features at 1st level and again at 6th, 10th, and 14th level.",
                }, {
                    name: "Pact Magic",
                    description: "You can cast known warlock spells using CHA as your spellcasting modifier. You can use an arcane focus as a spellcasting focus."
                }, {
                    name: "Dark One’s Blessing",
                    description: "Starting at 1st level, when you reduce a hostile creature to 0 hit points, you gain temporary hit points equal to your Charisma modifier + your warlock level (minimum of 1).",
                }, {
                    name: "Spells Learned",
                    effects: [
                        { spell: "Eldritch Blast" },
                        { spell: "Prestidigitation" },
                        { spell: "Burning Hands" },
                        { spell: "Hex" },
                    ],
                },
            ],
        },
        {
            class: "Warlock",
            features: [
                {
                    name: "Eldritch Invocations",
                    description: "In your study of occult lore, you have unearthed eldritch invocations, fragments of forbidden knowledge that imbue you with an abiding magical ability.\n\nAt 2nd level, you gain two eldritch invocations of your choice. Your invocation options are detailed at the end of the class description. When you gain certain warlock levels, you gain additional invocations of your choice, as shown in the Invocations Known column of the Warlock table.\n\nAdditionally, when you gain a level in this class, you can choose one of the invocations you know and replace it with another invocation that you could learn at that level.\n\nIf an eldritch invocation has prerequisites, you must meet them to learn it. You can learn the invocation at the same time that you meet its prerequisites. A level prerequisite refers to your level in this class.",
                },
                {
                    name: "Invocation: Agonizing Blast",
                    description: "Prerequisite: eldritch blast cantrip\n\nWhen you cast eldritch blast, add your Charisma modifier to the damage it deals on a hit.",
                },
                {
                    name: "Invocation: Devil’s Sight",
                    description: "You can see normally in darkness, both magical and nonmagical, to a distance of 120 feet.",
                    effects: [
                        { vision: "dark", distance: 120, magical: true }
                    ]
                },
                {
                    name: "Spells Learned",
                    effects: [
                        { spell: "Witch Bolt" }
                    ]
                }
            ]
        },
        {
            class: "Warlock",
            features: [
              {
                name: "Pact Boon: Pact of the Blade",
                description: "At 3rd level, your otherworldly patron bestows a gift upon you for your loyal service. You gain one of the following features of your choice.\n---\nYou can use your action to create a pact weapon in your empty hand. You can choose the form that this melee weapon takes each time you create it (see the Weapons section for weapon options). You are proficient with it while you wield it. This weapon counts as magical for the purpose of overcoming resistance and immunity to nonmagical attacks and damage.\n\nYour pact weapon disappears if it is more than 5 feet away from you for 1 minute or more. It also disappears if you use this feature again, if you dismiss the weapon (no action required), or if you die.\n\nYou can transform one magic weapon into your pact weapon by performing a special ritual while you hold the weapon. You perform the ritual over the course of 1 hour, which can be done during a short rest. You can then dismiss the weapon, shunting it into an extradimensional space, and it appears whenever you create your pact weapon thereafter. You can’t affect an artifact or a sentient weapon in this way. The weapon ceases being your pact weapon if you die, if you perform the 1-hour ritual on a different weapon, or if you use a 1-hour ritual to break your bond to it. The weapon appears at your feet if it is in the extradimensional space when the bond breaks.",
              },
              {
                name: "Spells Learned",
                effects: [
                  { spell: "Scorching Ray" },
                ],
              },
            ],
        },
    ]
}

export default example;
