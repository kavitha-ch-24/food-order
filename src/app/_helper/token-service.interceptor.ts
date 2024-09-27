import { HttpInterceptorFn } from '@angular/common/http';

export const tokenServiceInterceptor: HttpInterceptorFn = (req, next) => {
  let token = '';

  if (typeof localStorage !== 'undefined') {
    const authToken = localStorage.getItem('userData');
    if (authToken) {
      try {
        const userDataInfo = JSON.parse(authToken);
        token = userDataInfo?.data.token || '';
        // console.log(token); 
      } catch (e) {
        console.error('Error parsing userData from localStorage', e);
      }
    }
  }

  if (token) {
    // console.log(token, "api token");
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  } else {
    console.log("bearer token", token);
  }

  return next(req);
};
