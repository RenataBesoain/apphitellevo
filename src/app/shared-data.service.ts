// shared-data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private viajesProgramadosSource = new BehaviorSubject<any[]>([]);
  viajesProgramados$ = this.viajesProgramadosSource.asObservable();

  agregarViajeProgramado(viaje: any) {
    const viajesActuales = this.viajesProgramadosSource.value;
    this.viajesProgramadosSource.next([...viajesActuales, viaje]);
  }
}
