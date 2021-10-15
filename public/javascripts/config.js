class Config {
	static canvasWidth = 750;
	static canvasHeight = 750;
	static cellSize = 75;
	static encounterProbability = 1;
	static gridSize = 100;
	static spriteSize = 75;
	static playerColour = 155;
	static wallColour = [150, 50, 150];
	static battleFontSize = 32;
	static battleTextColor = [212, 217, 166];
	static playerHealth = 500;
	static critAttackMultiplier = 3;
	static victoryScreenBackground = [251, 72, 196];
	static dodgeChance = 0.1;
	static critChance = 0.1;
	static fleeFailureChance = 0.1;
	static defaultEnemyHealth = 50;
  static bossGitHealth = 500;
  static bossJasmineHealth = 100;
  static bossZoomHealth = 250;
	static mapDimension = 100;
	static NoOfTunnels = 550;
	static maxTunnelLength = 20;
	static regionDivisor = 10;
  static winningScore = 3000;
	static calculatedProcess = new Ability("Calculated Process", "Damaging", 25, 30, 0, 0);
	static stabInTheDark = new Ability("Stab in the Dark", "Damaging", 10, 45, 0, 0);
	static refreshHeal = new Ability("Refresh", "Heal", 0, 0, 80, 120);
  static breakAttack = new Ability("Break", "Damaging", 18, 22, 0, 0);
  static crashAttack = new Ability("Crash", "Damaging", 35, 45, 0, 0);
	static undefinedReality = new Ability("Undefined Reality", "Damaging", 40, 60, 0, 0);
	static failureBombardment = new Ability("Failure Bombardment", "Damaging", 80, 100, 0, 0);
  static confusionAndChaos = new Ability("Confusion & Chaos", "Damaging", 100, 120, 0, 0);  
  static visualTermination = new Ability("Visual Termination", "Damaging", 30, 60, 0, 0);
  static countdownInitiated = new Ability("Countdown Initiated", "Damaging", 80, 110, 0, 0);
  static timesEnd = new Ability("Time's End", "Damaging", 100, 120, 0, 0);
  static unforseenBlackout = new Ability("Unforseen Blackout", "Damaging", 1, 200, 0, 0);
  static unknownOrigin = new Ability("Unknown Origin", "Damaging", 20, 50, 0, 0);
  static pushUpstream = new Ability("Push Upstream", "Heal", 0, 0, 20, 40);
  static conflictiveMerge = new Ability("Conflictive Merge", "Damaging", 60, 110, 0, 0);
  static invisibileBranch = new Ability("Invisible Branch", "Damaging", 20, 110, 0, 0);
  static detatchHead = new Ability("Detatch Head", "Damaging", 100, 150, 0, 0);
  static noiseScale = 0.01;
  static noiseRange = 10000;
  static bossSpawnThreshold = 75;
  static difficultyNoiseOffset = 0.05;
  static luckNoiseOffset = 0.376;
  static itemSpawnThreshold = 65;
}
