export interface PrologProvider {
  getProlog(): string;
};

export interface BodyProvider {
  getBody(): string;
};

export interface EpiLogProvider {
  getEpilog(): string;
};

export class TrivialPrologProvider implements PrologProvider {
  private P: string;

  constructor(p: string) {
    this.P = p;
  }

  public getProlog(): string {
    return this.P;
  }
};

export class TrivialBodyProvider implements BodyProvider {
  private P: string;

  constructor(p: string) {
    this.P = p;
  }

  public getBody(): string {
    return this.P;
  }
};

export class TrivialEpilogProvider implements EpiLogProvider {
  private P: string;

  constructor(p: string) {
    this.P = p;
  }

  public getEpilog(): string {
    return this.P;
  }
}
