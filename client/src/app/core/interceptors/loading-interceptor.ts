import { HttpInterceptorFn } from '@angular/common/http';
import { delay, finalize } from 'rxjs';
import { Busy } from '../services/busy';
import { inject } from '@angular/core';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const busyService = inject(Busy);

  busyService.busy();

  return next(req).pipe(
    // delay(1000),
    finalize(() => busyService.idle())
  );
};
