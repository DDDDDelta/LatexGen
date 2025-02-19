import { PrologProvider, BodyProvider, EpiLogProvider } from "./Provider"
import { LOStream } from "./Output"

function Concat(
  S: LOStream, PP: PrologProvider, 
  BP: BodyProvider, EP: EpiLogProvider
): void {
  S.Insert(PP.getProlog()).Insert(BP.getBody()).Insert(EP.getEpilog());
}

export default Concat;
