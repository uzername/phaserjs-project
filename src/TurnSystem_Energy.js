function TurnSystem_Energy () {
	/*
	The game time is separated into "ticks" -- they are like turns in the "simple turns" approach. 
	A main loop iterates over all the actors every tick, increasing their "energy" counters. Every action has an energy cost. 
	When an actor declares an action, it's first checked whether it has enough energy for it -- if yes, the energy is deducted and the action is performed instantly. 
	If no, the actor waits until it accumulates enough. If he decides to interrupt the wait, he can use up the accumulated energy right away.
    Alternatively, when the actor wishes to perform an action, given that the actor has greater than 0 energy, it performs it and has the action's cost deducted from its energy amount; 
	depending on the current game speed (potentially customizable), a certain amount of energy is restored to every actor every tick. Games such as Dwarf Fortress use this approach.
	*/
	this.allActors = [];
}

function TurnActor(name, maxEnergy) {
	this.name = name;
	this.maxEnergy = maxEnergy;
}