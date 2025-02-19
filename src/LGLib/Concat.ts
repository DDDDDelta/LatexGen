import { PrologProvider, BodyProvider, EpiLogProvider } from "src/LGLib/Provider"
import { LOStream } from "src/LGLib/Output"

function Concat(
  S: LOStream, PP: PrologProvider, 
  BP: BodyProvider, EP: EpiLogProvider
): void {
  S.Insert(PP.getProlog()).Insert(BP.getBody()).Insert(EP.getEpilog());
}

export default Concat;
