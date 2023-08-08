import TubleBlock, {
    NO_CONNECTION,
    TYPE_BENEFIT_MOVES,
    TYPE_BENEFIT_TIME,
    TYPE_ENDPOINT,
    TYPE_PENALTY_MOVES, TYPE_PENALTY_TIME
} from "assets/js/tuble-block";
import TubleFunctions from "assets/js/tuble-functions";

export default class TubleValidator {

    private timeMs;
    private moves;

    private netTimeMs;
    private netMoves;

    private timeBenefitBlocks = 0;
    private timePenaltyBlocks = 0;

    private moveBenefitBlocks = 0;
    private movePenaltyBlocks = 0;

    public map: TubleBlock[][];
    private mapLimits: [number, number]

    public constructor(timeMs: number, moves: number, map: TubleBlock[][]) {
        this.timeMs = timeMs;
        this.moves = moves;
        this.netTimeMs = timeMs;
        this.netMoves = moves;
        this.map = map;
        this.mapLimits = [0, this.map.length - 1]; //Assume map is square
    }

    private findStartingPoint(): TubleBlock | null {
        let activeBlock = null;
        for (let valueX = 0; valueX < this.map.length; valueX++) {
            for (let valueY = 0; valueY < this.map[valueX].length; valueY++) {
                if (this.map[valueX][valueY].type === TYPE_ENDPOINT && this.map[valueX][valueY].connections[0] === NO_CONNECTION) {
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

    public validate() {
        //Find a starting point
        let prevCoords = null;
        let activeBlock = this.findStartingPoint();
        if (!activeBlock) {
            return false;
        }
        let coords: [number, number] = [activeBlock.x, activeBlock.y]
        const troddenPath: [number,number][] = [];
        while (true) {
            const isFirstBlock = prevCoords === null;
            if ((!isFirstBlock && activeBlock.isConnectedFrom(prevCoords)) || (troddenPath.length === 0)) { //TODO: Add missing array search and function
                return false; //Map is not connected
            }
            //Current block is in limits and connected to previous
            switch (activeBlock.type) {
                case TYPE_ENDPOINT:
                    if (!isFirstBlock) {
                        return activeBlock.connections[1] === NO_CONNECTION;
                    }
                    break
                case TYPE_BENEFIT_MOVES:
                    this.netMoves -= 3
                    this.moveBenefitBlocks++;
                    break;
                case TYPE_BENEFIT_TIME:
                    this.netTimeMs -= 5000
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
            troddenPath.push(coords)
            const prevCoordinateForConnection = <[number,number]>prevCoords;
            prevCoords = coords;
            coords = activeBlock.nextConnectedBlockCoords(prevCoordinateForConnection)
            activeBlock = this.map[coords[0]][coords[1]]
        }

    }

}