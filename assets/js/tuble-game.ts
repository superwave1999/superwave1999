import dayjs, { Dayjs } from "dayjs";
import TubleBlock, { NO_CONNECTION } from "assets/js/tuble-block";
import TubleValidator from "assets/js/tuble-validator";
import TubleFunctions from "assets/js/tuble-functions";
import TubleBuilder from "assets/js/tuble-builder";

export default class TubleGame {
  public isFrozen = false;

  private readonly dateString;

  public map: TubleBlock[][] = [];

  public moves = 0;

  public timeLog: Dayjs[] = [];

  public activeCoords: [number, number] = [NO_CONNECTION, NO_CONNECTION];

  public constructor(dateString: string) {
    this.dateString = dateString;
  }

  public async build() {
    if (!this.loadFromStorage()) {
      // Generate new map
      const layoutSeed = await TubleFunctions.newHash(this.dateString);
      const modifierSeed = await TubleFunctions.newHash(
        `${this.dateString} MODIFIER`,
      );
      const rotationSeed = await TubleFunctions.newHash(
        `${this.dateString} ROTOR`,
      );
      const tubleBuilder = new TubleBuilder(
        6,
        layoutSeed,
        modifierSeed,
        rotationSeed,
      );
      tubleBuilder.build();
      this.map = tubleBuilder.getMap();
    }
  }

  public getTime(asTimestamp = false, current = true): string | number {
    let total = 0;
    for (let i = 0; i < this.timeLog.length; i++) {
      if (i % 2 !== 0) {
        continue;
      }
      const nextIndex = i + 1;
      if (this.timeLog[nextIndex]) {
        total += dayjs(this.timeLog[nextIndex]).diff(this.timeLog[i]);
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

  public addMove(): void {
    this.moves++;
  }

  public actionSelectBlock(coords: [number, number]): void {
    this.activeCoords = coords;
  }

  public actionRotate(isClockwise: boolean): void {
    if (!this.map[this.activeCoords[0]][this.activeCoords[1]].isMovable()) {
      return;
    }
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

  public validate(): TubleValidator | boolean {
    this.stopTime();
    const timeMs = <number>this.getTime(true, false);
    const v = new TubleValidator(timeMs, this.moves, this.map);
    if (v.validate()) {
      return v;
    } else {
      return false;
    }
  }

  public finish() {
    this.isFrozen = true;
    const data = {
      mapDate: this.dateString,
      map: this.map,
      moves: this.moves,
      time: this.timeLog,
    };
    localStorage.setItem("_tbl_state", JSON.stringify(data));
  }

  private loadFromStorage(): boolean {
    const state = localStorage.getItem("_tbl_state");
    if (state) {
      try {
        const obj = JSON.parse(state);
        if (obj.mapDate === this.dateString) {
          this.isFrozen = true;
          this.timeLog = obj.time;
          this.moves = obj.moves;
          this.map = obj.map.map((x: any[], valueX: number) =>
            x.map((y: any, valueY: number) =>
              new TubleBlock(valueX, valueY).load(y),
            ),
          );
          return true;
        }
      } catch (e) {}
    }
    return false;
  }
}
