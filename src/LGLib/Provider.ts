export interface PrologProvider {
  getProlog(): string;
};

export interface BodyProvider {
  getBody(): string;
};

export interface EpiLogProvider {
  getEpilog(): string;
}


