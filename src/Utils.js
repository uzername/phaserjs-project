import Phaser from 'phaser';
export class UtilClass {
	static SPRITEWIDTH = 32;
	static SPRITEHEIGHT = 32;
	static pixelCoordsFromLogicCoords(x, y) {
		var xNew = x * this.SPRITEWIDTH + this.SPRITEWIDTH / 2;
		var yNew = y * this.SPRITEHEIGHT + this.SPRITEHEIGHT / 2
		return [xNew, yNew];
	}
	static LONGDOORH_STARTINDEX = 194;
	static LONGDOORH_ENDINDEX = 194 + 3 * 6; //six groups of long doors
}