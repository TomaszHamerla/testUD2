import {HttpInterceptorFn} from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const reqClone = req.clone({
    setHeaders: {'X-TEST': 'Test'}
  });
  return next(reqClone);
};
