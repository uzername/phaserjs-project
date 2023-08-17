class TurnSystem_Energy  {
	/*
	The game time is separated into "ticks" -- they are like turns in the "simple turns" approach. 
	A main loop iterates over all the actors every tick, increasing their "energy" counters. Every action has an energy cost. 
	When an actor declares an action, it's first checked whether it has enough energy for it -- if yes, the energy is deducted and the action is performed instantly. 
	If no, the actor waits until it accumulates enough. If he decides to interrupt the wait, he can use up the accumulated energy right away.
    Alternatively, when the actor wishes to perform an action, given that the actor has greater than 0 energy, it performs it and has the action's cost deducted from its energy amount; 
	depending on the current game speed (potentially customizable), a certain amount of energy is restored to every actor every tick. Games such as Dwarf Fortress use this approach.
	*/
	constructor() {
		/**
		* array that contains ActualActor instances
		*/
		this.allActors = [];		
	}
	nextStep() {		
		for (const actorSel of this.allActors) {
			actorSel.recoverEnergy();
			actorSel.performAction();
        }
	}
}
/**
* Expresses Turn Agent entity
*/
class TurnActor {
	constructor(name, maxEnergy, initialEnergy, initialRecoveryRate)
	{
	this.name = name;
	this.maxEnergy = maxEnergy;
	this.currentEnergy = initialEnergy;
	this.energyRecoverRate = initialRecoveryRate;
	}	
	/**
	* a function that performs real action of actor. Declared in TurnSystem_EnergyActionResolver.js for this case, and passed here, as it is allowed in JS.
	* TurnSystem Energy knows nothing about AI of actors, it just manages turns of actors. It does not have to know about coordinates too. it is more about action AI
	* 
	*/
	performAction() {

	}
	// Turn system knows nothing about AI! But AI may be aware of Turn System
	/**
	 * recover energy and clamp on maximum
	 * */
	recoverEnergy() {
		this.currentEnergy += this.energyRecoverRate;
		if (this.currentEnergy > this.maxEnergy) {
			this.currentEnergy = this.maxEnergy;
		}
	}
}