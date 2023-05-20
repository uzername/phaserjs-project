import { UtilClass } from './Utils.js'
import { MessageService } from './MessageService.js'
export class StoryMode {
    static currentMap = "map0"
    static storyState = "INIT" //INIT, PROLOGUE
    // there may be story-related NPCs, they should be referenced here in sort of array maybe
    // like, map key and list of NPCs with x and y coords to spawn, they are to be recreated every time we reload map
    static storyNPCs = {
        "map0": {
            "enchantress": {
                "sprite": "enchantress_controllable_sprites",
                "sprite_states": 4,
                "sprite_index":0,
                "coordX": 42,
                "coordY": 70,
                "isHostile": 0,
                "sizeH": UtilClass.SPRITEHEIGHTLARGE,
                "name": "Enchantress"
            },
            "squad_goblin1": {
                "sprite": "characters",
                "sprite_states": 1,
                "sprite_index":0,
                "coordX": 45,
                "coordY": 70,
                "isHostile": 0,
                "sizeH": UtilClass.SPRITEHEIGHT,
                "name": "Trorl Gloomy"
            },
            "squad_goblin2": {
                "sprite": "characters",
                "sprite_states": 1,
                "sprite_index": 1,
                "coordX": 46,
                "coordY": 70,
                "isHostile": 0,
                "sizeH": UtilClass.SPRITEHEIGHT,
                "name": "Truul Shady"
            },
            "squad_goblin3": {
                "sprite": "characters",
                "sprite_states": 1,
                "sprite_index": 2,
                "coordX": 47,
                "coordY": 71,
                "isHostile": 0,
                "sizeH": UtilClass.SPRITEHEIGHT,
                "name": "Wrunk Chainmail"
            },
             "squad_goblin4": {
                "sprite": "characters",
                "sprite_states": 1,
                "sprite_index": 3,
                "coordX": 49,
                 "coordY": 72,
                 "isHostile": 0,
                 "sizeH": UtilClass.SPRITEHEIGHT,
                 "name": "Hedge Wizkid"
            },
            "squad_goblin5": {
                "sprite": "characters",
                "sprite_states": 1,
                "sprite_index": 4,
                "coordX": 49,
                "coordY": 73,
                "isHostile": 0,
                "sizeH": UtilClass.SPRITEHEIGHT,
                "name": "Robin Junior"
            },
            
        }

    }
    // we talk to NPC 
    static talkToNPC(strNPC_ID) {
        var fetchedNPC = this.storyNPCs[this.currentMap][strNPC_ID];
        if (fetchedNPC) {
            MessageService.addMessage("You talk to: " + fetchedNPC.name);
        } else {
            MessageService.addMessage("You stare at them. Let's say, it's because of Goblin's low speech skill, but not because of programming error")
        }
    }
}

export class Quest {

}