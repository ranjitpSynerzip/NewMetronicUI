// Angular
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
//import { debug } from 'util';
import { environment } from '../../../../../environments/environment';

/**
 * More information there => https://medium.com/@MetonymyQT/angular-http-interceptors-what-are-they-and-how-to-use-them-52e060321088
 */
@Injectable()
export class InterceptService implements HttpInterceptor {

	// intercept request and add token
	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
	
		// modify request
		
		const baseurl = environment.baseUrl;
		
		let token = '';

		if (localStorage.getItem('user')) {
			const user = JSON.parse(localStorage.getItem('user'));
			token = user.access_Token;
		}

		// if (request.url.toString().indexOf('assets/i18n') < 1) {
            request = request.clone({
                url: baseurl+request.url,

                setHeaders: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
	   // }

		return next.handle(request).pipe(
			tap(
				event => {
					if (event instanceof HttpResponse) {
						// console.log('all looks good');
					}
				},
				error => {
					// http response status code
					// console.log('----response----');
					// console.error('status code:');
					//console.error(error.status);
					//console.error(error.message);
					
					// console.log('--- end of response---');
				}
			)
		);
	}
}
