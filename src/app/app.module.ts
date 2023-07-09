import {NgModule} from "@angular/core";
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent} from "@azure/msal-angular";
import {InteractionType, PublicClientApplication} from "@azure/msal-browser";
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {environment} from "../environments/environment";
import {BackendInterceptor} from "./core/backend-interceptor";

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    AppRoutingModule,
    HttpClientModule,
    MsalModule.forRoot(new PublicClientApplication({
      auth: {
        clientId: environment.clientId, // Application (client) ID from the app registration
        authority: environment.authority, // The Azure cloud instance and the app's sign-in audience (tenant ID, common, organizations, or consumers),
        redirectUri: environment.redirectUri
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE
      }
    }), {
      interactionType: InteractionType.Redirect,
      authRequest: {
        scopes: [
          'user.read',
          environment.apiScope
        ]
      }
    }, {
      interactionType: InteractionType.Redirect,
      protectedResourceMap: new Map([
        ['*/api', [environment.apiScope]],
        ['https://graph.microsoft.com/v1.0/me', ['user.read']]
      ])
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BackendInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalGuard
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule {
}
