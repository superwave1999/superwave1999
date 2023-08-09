import TubleBlock, {
  NO_CONNECTION,
  TYPE_BENEFIT_MOVES,
  TYPE_BENEFIT_TIME,
  TYPE_ENDPOINT,
  TYPE_PENALTY_MOVES,
  TYPE_PENALTY_TIME,
} from "assets/js/tuble-block";
import TubleFunctions from "assets/js/tuble-functions";

export default class TubleValidator {
  public timeMs;
  public moves;

  public netTimeMs;
  private netMoves;

  public timeBenefitBlocks = 0;
  public timePenaltyBlocks = 0;

  public moveBenefitBlocks = 0;
  public movePenaltyBlocks = 0;

  private readonly map: TubleBlock[][];
  private readonly mapLimits: [number, number];

  public constructor(timeMs: number, moves: number, map: TubleBlock[][]) {
    this.timeMs = timeMs;
    this.moves = moves;
    this.netTimeMs = timeMs;
    this.netMoves = moves;
    this.map = map;
    this.mapLimits = [0, this.map.length - 1]; // Assume map is square
  }

  private findStartingPoint(): TubleBlock | null {
    let activeBlock = null;
    for (let valueX = 0; valueX < this.map.length; valueX++) {
      for (let valueY = 0; valueY < this.map[valueX].length; valueY++) {
        if (
          this.map[valueX][valueY].type === TYPE_ENDPOINT &&
          this.map[valueX][valueY].connections[0] === NO_CONNECTION
        ) {
          activeBlock = this.map[valueX][valueY];
          break;
        }
      }
      if (activeBlock) {
        break;
      }
    }
    return activeBlock;
  }

  private coordsAreWithinLimits(coords: [number, number]): boolean {
    return (
      coords[0] >= this.mapLimits[0] &&
      coords[0] <= this.mapLimits[1] &&
      coords[1] >= this.mapLimits[0] &&
      coords[1] <= this.mapLimits[1]
    );
  }

  public validate(): boolean {
    let prevCoords = null;
    let activeBlock = this.findStartingPoint();
    if (!activeBlock) {
      return false;
    }
    let coords: [number, number] = [activeBlock.x, activeBlock.y];
    const troddenPath: [number, number][] = [];
    while (true) {
      const isFirstBlock = prevCoords === null;
      if (
        !this.coordsAreWithinLimits(coords) || // out of bounds
        (!isFirstBlock &&
          !activeBlock.isConnectedFrom(<[number, number]>prevCoords)) || // Not first endpoint and connection is invalid
        (troddenPath.length !== 0 &&
          TubleFunctions.includesArray(coords, troddenPath)) // Not first and connected to already onto itself
      ) {
        return false; // Map is not connected
      }
      // Current block is in limits and connected to previous
      switch (activeBlock.type) {
        case TYPE_ENDPOINT:
          if (!isFirstBlock) {
            return activeBlock.connections[1] === NO_CONNECTION;
          }
          break;
        case TYPE_BENEFIT_MOVES:
          this.netMoves -= 3;
          this.moveBenefitBlocks++;
          break;
        case TYPE_BENEFIT_TIME:
          this.netTimeMs -= 5000;
          this.timeBenefitBlocks++;
          break;
        case TYPE_PENALTY_MOVES:
          this.netMoves += 2;
          this.movePenaltyBlocks++;
          break;
        case TYPE_PENALTY_TIME:
          this.netTimeMs += 10000;
          this.timePenaltyBlocks++;
          break;
      }
      troddenPath.push(coords);
      const prevCoordsToAvoid = prevCoords;
      prevCoords = coords;
      coords = activeBlock.nextConnectedBlockCoords(prevCoordsToAvoid);
      activeBlock = this.map[coords[0]][coords[1]];
    }
  }
}
