import TubleBlock, { NO_CONNECTION, TYPE_ENDPOINT } from "./tuble-block";
import TubleFunctions from "assets/js/tuble-functions";

export default class TubleGame {
  private readonly mapSize: number = 6;
  private validPath: [number, number][] = [];
  private readonly creatorEdgesX: [number, number];
  private readonly creatorEdgesY: [number, number];
  private creatorEdges: [number, number][] = [];
  public gameMap: TubleBlock[][] = [];

  private readonly validPathSeed: number[];
  private validPathSeedPos = 0;
  private readonly modifierSeed: number[];
  private modifierSeedPos = 0;
  private readonly rotationSeed: number[];
  private rotationSeedPos = 0;

  /**
   * Sets edges and fills the game map with block objects for further modification.
   */
  public constructor(
    mapSize: number,
    validPathSeed: number[],
    modifierSeed: number[],
    rotationSeed: number[]
  ) {
    this.mapSize = mapSize;
    this.validPathSeed = validPathSeed;
    this.modifierSeed = modifierSeed;
    this.rotationSeed = rotationSeed;
    this.creatorEdgesX = [0, this.mapSize - 1];
    this.creatorEdgesY = [0, this.mapSize - 1];
    for (let valueX = 0; valueX < this.mapSize; valueX++) {
      for (let valueY = 0; valueY < this.mapSize; valueY++) {
        if (
          this.creatorEdgesX.includes(valueX) ||
          this.creatorEdgesY.includes(valueY)
        ) {
          this.creatorEdges.push([valueX, valueY]);
        }
        if (!this.gameMap[valueX]) {
          this.gameMap[valueX] = [];
        }
        this.gameMap[valueX][valueY] = new TubleBlock(valueX, valueY);
      }
    }
  }

  public build() {
    this.createValidPath();
    this.randomizeBlocks(); //Set random initial state
    this.connectBlocksOnPath(); //Connect blocks using coords in validPath
    this.randomRotatePathBlocks(); //Rotate the connected blocks using seed
  }

  private randomizeBlocks() {
    for (let valueX = 0; valueX < this.mapSize; valueX++) {
      for (let valueY = 0; valueY < this.mapSize; valueY++) {
        this.gameMap[valueX][valueY].setRandomConnections(
          this.getRotationSeedNumber()
        );
        this.gameMap[valueX][valueY].setRandomSpecialType(
          this.getModifierSeedNumber()
        );
      }
    }
  }

  private createValidPath() {
    const minConnected = this.mapSize + 1;
    const mustFinishOnEdge = true;
    let coords =
      this.creatorEdges[
        TubleFunctions.overflow(
          this.creatorEdges.length - 1,
          this.getValidPathSeedNumber()
        )
      ]; //Starting edge block
    while (true) {
      this.validPath.push(coords);
      if (
        minConnected <= this.validPath.length &&
        (!mustFinishOnEdge ||
          this.creatorEdgesX.includes(coords[0]) ||
          this.creatorEdgesY.includes(coords[1]))
      ) {
        //Halt if current coords are finished (on edge or anywhere)
        return;
      }
      const coordinateCandidates = this.getValidSurroundingCoords(coords);
      if (coordinateCandidates.length === 0) {
        //No valid coordinates around -> rewind validPath until
        coords = this.rewindPathUntilValid();
      } else {
        //Valid path available -> continue
        coords =
          coordinateCandidates[
            TubleFunctions.overflow(
              coordinateCandidates.length - 1,
              this.getValidPathSeedNumber()
            )
          ];
      }
    }
  }

  private getValidSurroundingCoords(
    coords: [number, number]
  ): [number, number][] {
    const coordOptions: [number, number][] = [
      [coords[0], coords[1] - 1], //Towards top
      [coords[0] + 1, coords[1]], //Towards right
      [coords[0], coords[1] + 1], //Towards bottom
      [coords[0] - 1, coords[1]], //Towards left
    ];
    return coordOptions.filter((testCoords: [number, number]) => {
      return (
        this.coordsAreWithinLimits(testCoords) &&
        !this.validPath.includes(testCoords)
      ); //Only options within map borders, and not been stepped on
    });
  }

  private coordsAreWithinLimits(coords: [number, number]): boolean {
    return (
      coords[0] >= this.creatorEdgesX[0] &&
      coords[0] <= this.creatorEdgesX[1] &&
      coords[1] >= this.creatorEdgesY[0] &&
      coords[1] <= this.creatorEdgesY[1]
    );
  }

  private rewindPathUntilValid(): [number, number] {
    const prevValidCoords = this.validPath[this.validPath.length - 2]; // -1 is current, -2 is previous
    const coordinateCandidates =
      this.getValidSurroundingCoords(prevValidCoords);
    this.validPath.pop();
    if (coordinateCandidates.length === 0) {
      return this.rewindPathUntilValid();
    } else {
      return coordinateCandidates[
        TubleFunctions.overflow(
          coordinateCandidates.length - 1,
          this.getValidPathSeedNumber()
        )
      ];
    }
  }

  private connectBlocksOnPath() {
    const lastKey = this.validPath.length - 1;
    const prevKey = 0;
    for (let key = 1; key <= lastKey; key++) {
      const coords = this.validPath[key];
      const activeBlock = this.gameMap[coords[0]][coords[1]];
      const prevCoords = this.validPath[prevKey];
      const prevBlock = this.gameMap[prevCoords[0]][prevCoords[1]];

      //Connect previous and current blocks
      if (prevKey === 0) {
        prevBlock.setStartingBlock(coords);
      } else {
        prevBlock.setConnectionToCoords(coords, true);
      }
      activeBlock.setConnectionToCoords(prevCoords, false);
      if (key === lastKey) {
        activeBlock.setType(TYPE_ENDPOINT);
        activeBlock.setSecondConnection(NO_CONNECTION);
      }
    }
  }

  /**
   * Rotate the blocks of the valid block path by salt value
   * @private
   */
  private randomRotatePathBlocks() {
    for (const coords of this.validPath) {
      const activeBlock = this.gameMap[coords[0]][coords[1]];
      if (activeBlock.isMovable()) {
        activeBlock.setRandomRotation(this.getRotationSeedNumber());
      }
    }
  }

  /**
   * Seed function.
   * Get current hash char and use its numeric value for valid path generation.
   * @private
   */
  private getValidPathSeedNumber(): number {
    const n = this.validPathSeed[this.validPathSeedPos];
    if (this.validPathSeedPos + 1 >= this.validPathSeed.length) {
      this.validPathSeedPos = 0;
    } else {
      this.validPathSeedPos++;
    }
    return n;
  }

  /**
   * Seed function.
   * Get current hash char and use its numeric value to rotate blocks.
   * @private
   */
  private getRotationSeedNumber(): number {
    const n = this.rotationSeed[this.rotationSeedPos];
    if (this.rotationSeedPos + 1 >= this.rotationSeed.length) {
      this.rotationSeedPos = 0;
    } else {
      this.rotationSeedPos++;
    }
    return n;
  }

  /**
   * Seed function.
   * Get current hash char and use its numeric value to change block type.
   * @private
   */
  private getModifierSeedNumber(): number {
    const n = this.modifierSeed[this.modifierSeedPos];
    if (this.modifierSeedPos + 1 >= this.modifierSeed.length) {
      this.modifierSeedPos = 0;
    } else {
      this.modifierSeedPos++;
    }
    return n;
  }
}
