import { Injectable } from '@angular/core';
import swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  fireWarning(text: string)  {
    return swal.fire({
      title: 'Weet u het zeker?',
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ja, verwijder het',
      cancelButtonText: 'Nee, annuleer het',
    })
  }

  fireSuccess(text: string) {
    return swal.fire({
      title: 'Gelukt!',
      text: text,
      icon: 'success',
      iconColor: 'green',
      confirmButtonText: 'Ok',
      confirmButtonColor: '#a50205',
    })
  }

  fireError(text: string) {
    return swal.fire({
      title: 'Oeps!',
      text: text,
      icon: 'error',
      confirmButtonText: 'Ok',
      confirmButtonColor: '#a50205',
    })
  }
}
