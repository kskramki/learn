import { SPHttpClient } from "@microsoft/sp-http";

export interface IReactandSpfxProps {
  description: string;
  siteURL?:string;
  spHttpClient:SPHttpClient
}
