import {InjectionToken} from "@angular/core";

export const CONFIG = new InjectionToken<Config>('Config')

export interface Config {
  apiUrl: string,
  redirectUrl: string,
  clientId: string,
  authority: string,
  apiScope: string
}
