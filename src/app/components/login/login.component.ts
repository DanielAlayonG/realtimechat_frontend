import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginVisible: boolean = true;
  user: string = '';
  name: string = '';
  password: string = '';
  type: string = '2';

  constructor(private authService: AuthService) { 
   
  }

  toggleForm(): void {
    this.loginVisible = !this.loginVisible;
  }

  login() {

    if(this.user.trim() == "" || this.password.trim()  == "" ) {
      Swal.fire('Datos incompletos', 'Por favor, complete todos los campos', 'warning');
      return;
    }

    let dataEnviar = {
      "email": this.user.trim(),
      "password": this.password.trim()
    }

    this.authService.postLogin(dataEnviar).subscribe({
      next: response => {
        if(response.error) {
          Swal.fire('Error', response.mensaje, 'error');
        } else {
          localStorage.setItem("nombre", response.nombre)
          localStorage.setItem("token", response.token)
          localStorage.setItem("type", response.type)
          window.location.reload()
        }
      },
      error: error => {
        Swal.fire('Error al enviar datos', error, 'error');
      },
    });

  }

  register() {
    if(this.user.trim() == "" || this.password.trim()  == "" || this.name.trim() == "") {
      Swal.fire('Datos incompletos', 'Por favor, complete todos los campos', 'warning');
      return;
    }

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.user.trim())) {
      console.log("a")
      Swal.fire('Correo electrónico inválido', 'Por favor, ingrese un correo electrónico válido', 'error');
      return;
    }

    let dataEnviar = {
      "email": this.user.trim(),
      "password": this.password.trim(),
      "name":  this.name.trim(),
      "type":  this.type.trim()
    }

    this.authService.postRegister(dataEnviar).subscribe({
      next: response => {
        if(response.error) {
          Swal.fire('Error', response.mensaje, 'error');
        } else {
          Swal.fire({
            title: 'Registro exitoso',
            text: 'Por favor, inicia sesión',
            icon: 'success',
            showCancelButton: false, // Ocultar el botón de cancelar
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload(); // Recargar la página si el usuario hace clic en "Aceptar"
            }
          });
        }
      },
      error: error => {
        Swal.fire('Error al enviar datos', error, 'error');
      }
    });
  }
}

