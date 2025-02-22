import Concat from "src/LGLib/Concat";
import { LOFStream } from "src/LGLib/Output";
import { InvokeMain } from "src/Support/Process";
import { TrivialBodyProvider, TrivialEpilogProvider, TrivialPrologProvider } from "src/LGLib/Provider";

function main(argv: string[]): number {
  let out = new LOFStream("114514.tex");

  let pro = new TrivialPrologProvider("114514");
  let body = new TrivialBodyProvider("114514");
  let epi = new TrivialEpilogProvider("114514");

  Concat(out, pro, body, epi);

  return 0;
}

InvokeMain(main);
