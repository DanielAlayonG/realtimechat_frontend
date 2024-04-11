import { Component } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';

  session: boolean = false
  constructor(){
    let token: string = localStorage.getItem("token") || ""
    
    if(token || token.trim() != "") {
      this.session = true
    }
  }

  logout() {
    Swal.fire({
      text: '¿Quieres cerrar la sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí colocas la lógica para cerrar la sesión
        localStorage.removeItem("token");
        this.session = false;
        Swal.fire(
          '¡Sesión cerrada!',
          'Tu sesión ha sido cerrada.',
          'success'
        );
      }
    });
  }
}
