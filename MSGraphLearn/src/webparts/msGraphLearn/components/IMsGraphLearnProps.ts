import { MSGraphClient } from "@microsoft/sp-client-preview";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IMsGraphLearnProps {
  description: string;
  context:WebPartContext;
  
}
