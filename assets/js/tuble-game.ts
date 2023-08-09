import dayjs, { Dayjs } from "dayjs";
import TubleBlock, { NO_CONNECTION } from "assets/js/tuble-block";
import TubleValidator from "assets/js/tuble-validator";

export default class TubleGame {
  public map: TubleBlock[][] = [];

  public moves = 0;

  public timeLog: Dayjs[] = [];

  public activeCoords: [number, number] = [NO_CONNECTION, NO_CONNECTION];

  public constructor(map: TubleBlock[][]) {
    this.map = map;
  }

  public getTime(asTimestamp = false, current = true): string | number {
    let total = 0;
    for (let i = 0; i < this.timeLog.length; i++) {
      if (i % 2 !== 0) {
        continue;
      }
      const nextIndex = i + 1;
      if (this.timeLog[nextIndex]) {
        total += this.timeLog[nextIndex].diff(this.timeLog[i]);
      } else if (current) {
        total += dayjs().diff(this.timeLog[i]);
      }
    }
    if (asTimestamp) {
      return total;
    } else {
      return dayjs(total).format("mm:ss");
    }
  }

  public startTime(): boolean {
    if (this.timeLog.length % 2 === 0) {
      // Even numbers -> can start
      this.timeLog.push(dayjs());
      return true;
    }
    return false;
  }

  public stopTime(): boolean {
    if (this.timeLog.length % 2 !== 0) {
      // Odd numbers -> can stop
      this.timeLog.push(dayjs());
      return true;
    }
    return false;
  }

  private addMove(): void {
    this.moves++;
  }

  public actionSelectBlock(coords: [number, number]): void {
    this.activeCoords = coords;
  }

  public actionRotate(isClockwise: boolean): void {
    this.addMove();
    this.startTime();
    if (isClockwise) {
      this.map[this.activeCoords[0]][this.activeCoords[1]].rotateClockwise();
    } else {
      this.map[this.activeCoords[0]][
        this.activeCoords[1]
      ].rotateCounterClockwise();
    }
  }

  public validate(): void {
    this.stopTime();
    const timeMs = <number>this.getTime(true, false);
    const v = new TubleValidator(timeMs, this.moves, this.map);
    if (v.validate()) {
      console.log(v);
    } else {
      this.startTime();
      this.moves++;
    }
  }
}
