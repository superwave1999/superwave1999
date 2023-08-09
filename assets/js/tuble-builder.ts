import TubleFunctions from "assets/js/tuble-functions";
import TubleBlock, { NO_CONNECTION, TYPE_ENDPOINT } from "./tuble-block";

export default class TubleBuilder {
  private readonly mapSize: number = 6;
  private validPath: [number, number][] = [];
  private readonly creatorEdgeLimits: [number, number];
  private creatorEdgeCoords: [number, number][] = [];
  private gameMap: TubleBlock[][] = [];

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
    this.creatorEdgeLimits = [0, this.mapSize - 1];
    for (let valueX = 0; valueX < this.mapSize; valueX++) {
      for (let valueY = 0; valueY < this.mapSize; valueY++) {
        if (
          this.creatorEdgeLimits.includes(valueX) ||
          this.creatorEdgeLimits.includes(valueY)
        ) {
          this.creatorEdgeCoords.push([valueX, valueY]);
        }
        if (!this.gameMap[valueX]) {
          this.gameMap[valueX] = [];
        }
        this.gameMap[valueX][valueY] = new TubleBlock(valueX, valueY);
      }
    }
  }

  public build(): void {
    this.createValidPath();
    this.randomizeBlocks(); // Set random initial state
    this.connectBlocksOnPath(); // Connect blocks using coords in validPath
    this.randomRotatePathBlocks(); // Rotate the connected blocks using seed
  }

  private randomizeBlocks(): void {
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

  /**
   * Create start and finish blocks, making sure that the map can always be completed.
   * @private
   */
  private createValidPath(): void {
    const minConnected = this.mapSize + 5;
    const mustFinishOnEdge = true;
    let coords =
      this.creatorEdgeCoords[
        TubleFunctions.overflow(
          this.creatorEdgeCoords.length - 1,
          this.getValidPathSeedNumber()
        )
      ]; // Starting edge block
    while (true) {
      this.validPath.push(coords);
      if (
        minConnected <= this.validPath.length &&
        (!mustFinishOnEdge ||
          this.creatorEdgeLimits.includes(coords[0]) ||
          this.creatorEdgeLimits.includes(coords[1]))
      ) {
        // Halt if current coords are finished (on edge or anywhere)
        return;
      }
      const coordinateCandidates = this.getValidSurroundingCoords(coords);
      if (coordinateCandidates.length === 0) {
        // No valid coordinates around -> rewind validPath until
        coords = this.rewindPathUntilValid();
      } else {
        // Valid path available -> continue
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
      [coords[0], coords[1] - 1], // Towards top
      [coords[0] + 1, coords[1]], // Towards right
      [coords[0], coords[1] + 1], // Towards bottom
      [coords[0] - 1, coords[1]], // Towards left
    ];
    return coordOptions.filter(
      (testCoords: [number, number]) =>
        this.coordsAreWithinLimits(testCoords) &&
        !TubleFunctions.includesArray(testCoords, this.validPath) // Only options within map borders, and not been stepped on
    );
  }

  private coordsAreWithinLimits(coords: [number, number]): boolean {
    return (
      coords[0] >= this.creatorEdgeLimits[0] &&
      coords[0] <= this.creatorEdgeLimits[1] &&
      coords[1] >= this.creatorEdgeLimits[0] &&
      coords[1] <= this.creatorEdgeLimits[1]
    );
  }

  /**
   * If the map generator reaches a dead-end, rewind until a different connection can be made.
   * @private
   */
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

  /**
   * Connect block connections together following the path in validPath.
   * @private
   */
  private connectBlocksOnPath(): void {
    const lastKey = this.validPath.length - 1;
    let prevKey = 0;
    for (let key = 1; key <= lastKey; key++) {
      const coords = this.validPath[key];
      const prevCoords = this.validPath[prevKey];

      // Connect previous and current blocks
      if (prevKey === 0) {
        this.gameMap[prevCoords[0]][prevCoords[1]].setStartingBlock(coords);
      } else {
        this.gameMap[prevCoords[0]][prevCoords[1]].setConnectionToCoords(
          coords,
          true
        );
      }
      this.gameMap[coords[0]][coords[1]].setConnectionToCoords(
        prevCoords,
        false
      );
      if (key === lastKey) {
        this.gameMap[coords[0]][coords[1]].setType(TYPE_ENDPOINT);
        this.gameMap[coords[0]][coords[1]].setSecondConnection(NO_CONNECTION);
      }
      prevKey = key;
    }
  }

  /**
   * Rotate the blocks of the valid block path by salt value.
   * @private
   */
  private randomRotatePathBlocks(): void {
    for (const coords of this.validPath) {
      if (this.gameMap[coords[0]][coords[1]].isMovable()) {
        this.gameMap[coords[0]][coords[1]].setRandomRotation(
          this.getRotationSeedNumber()
        );
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

  public getMap(): TubleBlock[][] {
    return this.gameMap;
  }
}
