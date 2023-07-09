import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable()
export class BackendInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let apiRequest = req;
    if (apiRequest.url.startsWith('/api')) {
      apiRequest = req.clone({url: `${environment.apiUrl}${req.url}`});
    } else if (apiRequest.url.startsWith('api')) {
      apiRequest = req.clone({url: `${environment.apiUrl}/${req.url}`});
    }
    return next.handle(apiRequest);
  }
}
