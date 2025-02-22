import { parse } from "ts-command-line-args";

export interface LGCLIOpt {
  readonly Type: "Resume";
};

export interface LGWSOpt {
  readonly Port: number;
};

export interface LGOpt {
  readonly Mode: "CLI" | "WS";
};

