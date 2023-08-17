/**
* Essentially, AI resolver. Contains decl of behavior of actors
*/
class TurnSystem_EnergyActionResolver {
	constructor (){
	/**
	* Current map
	*/	
	this.CurrentMap = 
	   [[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
	    [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,0,0,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,0,0,2,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,0,0,2,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,0,0,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,2,2,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,2,2,2,2,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],];
	/**
	 * Turn System Instance . instance of TurnSystem_Energy
	 * */
		this.turnSystem_EnergyInst = new TurnSystem_Energy();
		this.spawnActor(0); this.spawnActor(0); this.spawnActor(0); this.spawnActor(0);
		this.spawnActor(1); this.spawnActor(1); this.spawnActor(1); this.spawnActor(1);
	}
	/**
	 * Generate randomly and spawn actor by type. 0 - gnome. 1 - critter
	 * */
	spawnActor(in_actorType) {
		switch (in_actorType) {
			case 0: {
				var gnomeActor = new GardenGnomeActor();
				gnomeActor.Xpos = Math.floor(rand(3, 7))+1;
				gnomeActor.Ypos = Math.floor(rand(3, 7))+1;
				this.turnSystem_EnergyInst.allActors.push(gnomeActor);
				break;
			}
			case 1: {
				var flyActor = new BadBugActor();
				flyActor.Xpos = Math.floor(rand(10, (this.CurrentMap[0].length) - 2))+1;
				flyActor.Ypos = Math.floor(rand(1, (this.CurrentMap.length) - 2))+1;
				this.turnSystem_EnergyInst.allActors.push(flyActor);
				break;
			}
            default:
        }
	}
}
// this should be initialized in TurnSystem_EnergyTest::MainRoutine
energyActionResolverInst = null;
// place where to put text messages
logBoxReference = null;
/**
* subclass from TurnActor. Contains info about turn-related stuff. Make sure that TurnSystem_Energy is added first and RandUtils
*/
class GardenGnomeActor extends TurnActor {
	/**
	* generate Garden Gnome. He can plant flowers (numberSeeds) and has item to fend off enemies
	*/
	constructor ()	{
		var gnomeItems = [{name:"hoe",damage:10, energy: 20}, {name:"shovel", damage:8, energy:15}, {name:"garden trovel", damage:3, energy:10}]
		var gnomeNames = ["Udib", "Urist", "Dobar", "Obok", "Udol", "Odun"];
		var name0 = get_random(gnomeNames);
		var maxEnergy0 = rand(40, 80);
		var initialRecoveryRate0 = rand(3, 10);
		var initialEnergy0 = rand(0, maxEnergy0);

		super(name0, maxEnergy0, initialEnergy0, initialRecoveryRate0);
		this.energyCost_step = 5;

		var initialMaxHP = 100;

		this.maxHP = initialMaxHP;
		this.currentHP = initialMaxHP;	
		this.numberSeeds = Math.floor((Math.random()*10));
		this.currentItem = get_random(gnomeItems);

		this.Xpos = 0;
		this.Ypos = 0;

		this.tileIndex = 0;
	}
	performAction() {
		// only walk now
		if (this.currentEnergy > this.energyCost_step) {
			this.currentEnergy -= this.energyCost_step;
			var canProceed = false; var attempts = 0; var maxAttempts = 5;
			while (canProceed == false) {
				if (attempts >= maxAttempts) return;
				var desiredPositionX = this.Xpos + get_random([-1, 0, 1]);
				var desiredPositionY = this.Ypos + get_random([-1, 0, 1]);
				if (energyActionResolverInst.CurrentMap[desiredPositionY][desiredPositionX] == 2) {
					this.Xpos = desiredPositionX;
					this.Ypos = desiredPositionY;
					canProceed = true;
				} else { attempts += 1; }
			}
		}
	}
}

class BadBugActor extends TurnActor {
	/**
	* generate Bad Bug
	*/
	constructor ()	{
		var bugNames = ["fly", "roach", "bug", "mosquito", "wasp", "spider"];
		
		var name0 = get_random(bugNames);
		var maxEnergy0 = rand(20, 50);
		var initialRecoveryRate0 = rand(5, 10);
		var initialEnergy0 = rand(0, maxEnergy0);

		super (name0, maxEnergy0, initialEnergy0, initialRecoveryRate0);
		this.energyCost_step = 5;

		var initialMaxHP = 30;

		this.maxHP = initialMaxHP;
		this.currentHP = initialMaxHP;		

		this.Xpos = 0;
		this.Ypos = 0;

		this.tileIndex = 1;
	}
	performAction() {
		// only walk now
		if (this.currentEnergy > this.energyCost_step) {
			var canProceed = false; var attempts = 0; var maxAttempts = 5;
			while (canProceed == false) {
				if (attempts >= maxAttempts) return;
				var desiredPositionX = this.Xpos + get_random([-1, 0, 1]);
				var desiredPositionY = this.Ypos + get_random([-1, 0, 1]);
				if (energyActionResolverInst.CurrentMap[desiredPositionY][desiredPositionX] == 2) {
					this.Xpos = desiredPositionX;
					this.Ypos = desiredPositionY;
					canProceed = true;
				} else { attempts += 1; }
			}
			
		}
	}
}