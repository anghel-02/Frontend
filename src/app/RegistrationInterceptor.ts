import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RegistrationInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Implementa la logica del tuo interceptor qui
    const modifiedReq = req.clone({
      // Configura le modifiche necessarie alle richieste, se necessario
    });

    // Passa la richiesta modificata al gestore successivo nell'interceptor chain
    return next.handle(modifiedReq);
  }
}
