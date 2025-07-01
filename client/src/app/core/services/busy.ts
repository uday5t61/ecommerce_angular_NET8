import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Busy {
  loading = false;
  busyCount = 0;
  busy() {
    this.busyCount++;
    this.loading = true;
  }

  idle() {
    this.busyCount--;
    if (this.busyCount <= 0) {
      this.loading = false;
      this.busyCount = 0;
    }
  }
}
