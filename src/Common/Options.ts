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

function ParseMode(Mode?: string): "CLI" | "WS" | undefined {
  if (!Mode) {
    return undefined;
  }

  if (Mode == "CLI" || Mode == "WS") {
    return Mode;
  }
  else {
    return undefined;
  }
}

const ModeSchema = { 
  Mode: ParseMode,
  Port: { type: Number, optional: true },
  Type: { type: String, optional: true },
};

const CLISchema = { Type: Number };

const WSSchema = { Port: Number };

export function getLGMode(): "CLI" | "WS" {
  const res = parse<LGOpt & Partial<LGCLIOpt> & Partial<LGCLIOpt>>(ModeSchema);
  return res.Mode;
}
