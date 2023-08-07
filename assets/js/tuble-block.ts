import Chooser from "random-seed-weighted-chooser";

export const NO_CONNECTION = -1;
export const TYPE_NORMAL = "n";
export const TYPE_ENDPOINT = "e";
export const TYPE_PENALTY_TIME = "x";
export const TYPE_PENALTY_MOVES = "z";
export const TYPE_BENEFIT_TIME = "a";
export const TYPE_BENEFIT_MOVES = "b";
export default class TubleBlock {
  public connections: [number, number];
  public type: string;
  public readonly x: number;
  public readonly y: number;

  public constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.type = TYPE_NORMAL;
    this.connections = [NO_CONNECTION, NO_CONNECTION];
  }

  public setStartingBlock(nextCoords: [number, number]) {
    this.type = TYPE_ENDPOINT;
    this.setFirstConnection(NO_CONNECTION);
    this.setConnectionToCoords(nextCoords, true);
  }

  public setConnectionToCoords(
    nextCoords: [number, number],
    isSecond: boolean
  ) {
    let fun = -1;
    const diffX = this.x - nextCoords[0];
    const diffY = this.y - nextCoords[1];
    if (diffY > 0) {
      fun = 3;
    }
    if (diffY < 0) {
      fun = 1;
    }
    if (diffX > 0) {
      fun = 0;
    }
    if (diffX < 0) {
      fun = 2;
    }
    if (fun !== -1) {
      !isSecond ? this.setFirstConnection(fun) : this.setSecondConnection(fun);
    }
  }

  public setRandomSpecialType(seedNumber: number) {
    const weights = [56, 4, 4, 3, 3];
    const options = [
      TYPE_NORMAL,
      TYPE_PENALTY_TIME,
      TYPE_PENALTY_MOVES,
      TYPE_BENEFIT_TIME,
      TYPE_BENEFIT_MOVES,
    ];
    const pickedIdx = Chooser.chooseWeightedIndex(
      weights,
      `${seedNumber.toString(10)} TYPE`,
      10
    );
    this.type = options[pickedIdx];
  }

  public setRandomConnections(seedNumber: number) {
    const conn = [0, 1, 2, 3];
    const firstIdx = Chooser.chooseWeightedIndex(
      [1, 1, 1, 1],
      `${seedNumber.toString(10)} C1`,
      1
    );
    this.setFirstConnection(conn[firstIdx]);
    conn.splice(firstIdx, 1);
    const secondIdx = Chooser.chooseWeightedIndex(
      [1, 1, 1],
      `${seedNumber.toString(10)} C2`,
      1
    );
    this.setSecondConnection(conn[secondIdx]);
  }

  public rotateClockwise() {
    for (let i = 0; i < this.connections.length; i++) {
      // Here we increment each connection, overflowing when necessary
      let n = this.connections[i] + 1;
      if (n > 3) {
        n = 0;
      }
      this.connections[i] = n;
    }
  }

  public rotateCounterClockwise() {
    for (let i = 0; i < this.connections.length; i++) {
      // Here we decrement each connection, overflowing when necessary
      let n = this.connections[i] - 1;
      if (n < 0) {
        n = 3;
      }
      this.connections[i] = n;
    }
  }

  public setRandomRotation(seedNumber: number) {
    for (let i = 0; i < seedNumber; i++) {
      this.rotateClockwise();
    }
  }

  public setFirstConnection(c: number) {
    this.connections[0] = c;
  }

  public setSecondConnection(c: number) {
    this.connections[1] = c;
  }

  public setType(t: "n" | "e" | "x" | "z" | "a" | "b") {
    this.type = t;
  }

  public isMovable(): boolean {
    return (
      this.connections[0] !== NO_CONNECTION &&
      this.connections[1] !== NO_CONNECTION
    );
  }

  public isFrontendModifiable(): boolean {
    return (
      this.type !== TYPE_ENDPOINT && !this.connections.includes(NO_CONNECTION)
    );
  }

  // TODO: Add map verification code.
}
