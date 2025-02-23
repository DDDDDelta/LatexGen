import panic, { GetPanicError } from "src/Support/Panic";
import { z } from "zod";

function OnExit(): void {
  process.on("exit", (code) => {
    let p = GetPanicError();
    if (p) {
      console.log(p);
    }
    console.log(`Application exiting with code: ${code}`);
  });
}

const EnvSchema = z.object({
  PORT: z.number().int().default(4000),
  MONGO_URI: z.string(),
  DB_NAME: z.string(),
});

export type EnvConfig = z.infer<typeof EnvSchema>;

let Env: EnvConfig;

export function ParseEnv(): void {
  try {
    Env = EnvSchema.parse(process.env);
  }
  catch(e: any) {
    panic(e);
  }
}

export function getEnvConfig(): EnvConfig {
  return Env;
}
export function getProcEnvNoFail(name: string): string {
  let res = process.env[name];
  if (res) {
    return res;
  }
  else {
    panic(new Error(`Environment variable ${name} not set`));
  }
}

export function InvokeMain(main: (argv: string[]) => number): void {
  OnExit();
  // ParseEnv();
  process.exitCode = main(process.argv.slice(2));
}
