import { tap } from 'rxjs/internal/operators/tap';
import { Component, OnInit } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';
@Component({
  selector: 'app-interceptor',
  templateUrl: './interceptor.component.html',
  // styleUrls: ['./interceptor.component.css']
})
export class InterceptorComponent implements HttpInterceptor {

  constructor() { }

  ngOnInit() {
  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add a custom header
    console.log("request");
    const customReq = request.clone({
      headers: request.headers.set('refer', 'it11'), params: request.params.set('refer', 'it')
    });
    return next.handle(customReq)
      .pipe(tap(
        (response: HttpEvent<any>) => {
          console.log(response); // this runs always 
          // not the same as "next?" parameter of .subscribe
        },
        (error: HttpErrorResponse) => {
          console.log(error); // this runs when you get error 
          // same as "error?" parameter of .subscribe
        },
        () => {
          console.log("completed successfully"); // this runs when you don't get error
          // same as "complete?" parameter of .subscribe
        }
      ));

  }
}