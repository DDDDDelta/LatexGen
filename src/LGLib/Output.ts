import Disposable from "../Support/Dispose";
import panic from "../Support/Panic"

import * as fs from "fs"

export interface LOStream {
  Insert(S: string): LOStream;
  Flush(): boolean;
  Error(): string;
};

export class LOFStream implements LOStream, Disposable {
  private FD: number;
  private ErrM: string;

  get File() {
    return this.FD;
  }

  constructor(path: string) {
    try {
      this.FD = fs.openSync(path, "w");
      this.ErrM = "";
    }
    catch(e: any) {
      this.FD = -1;
      this.ErrM = e.message;
    }
  }

  public Insert(S: string): LOStream {
    if (this) {
      try {
        fs.writeSync(this.FD, S);
      }
      catch (e: any) {
        this.ErrM = e.message;
      }
    }
    return this;
  }

  public Flush(): boolean {
    return false;
  }

  public Error(): string {
    return this.ErrM;
  }

  public Dispose(): void {
    this.Flush();

    if (this.FD >= 0) {
      try {
        fs.closeSync(this.FD);
      }
      catch(e: any) {
        panic(e.message);
      }
    }
  }

  public valueOf(): boolean {
    return !this.ErrM;
  }
};
