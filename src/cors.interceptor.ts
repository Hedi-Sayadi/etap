import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CorsInterceptor implements HttpInterceptor {
  
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const modifiedRequest = request.clone({
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*', // Replace with specific origins
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': '*'
      })
    });

    return next.handle(modifiedRequest);
  }
}