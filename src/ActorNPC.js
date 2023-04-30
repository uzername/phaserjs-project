import { ActorMain } from './ActorMain';

export class ActorNPC extends ActorMain {    
    //known properties: Behavior, Name
    constructor(scene, x, y, spritesheetref) {
        super(scene, x, y, spritesheetref, 0);    
        // NPC behaviors: 0 is friendly, 1 is hostile.
        this.Behavior = 0;
        this.Name = "UnKnown";
    }
    
    }
