import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  loginUsuario: FormGroup;
  showError = false;
  errorMessage = '';
  loading = false; // Agrega la declaración de la variable loading

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.loginUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    const { email, password } = this.loginUsuario.value;
  
    if (!email || !password) {
      // Muestra el mensaje de error si el formulario está incompleto
      this.errorMessage = 'Ingrese sus credenciales';
      this.showError = true;
      return;  // Sale de la función si el formulario está incompleto
    }
  
    this.loading = true;
  
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.loading = false;
        this.router.navigate(['/bienvenida']);
      })
      .catch((error) => {
        console.error('Error durante el inicio de sesión:', error);
        this.loading = false;
  
        if (error.code === 'auth/invalid-email') {
          this.errorMessage = 'Correo o contraseña incorrectos';
        } else {
          this.errorMessage = error.message || 'Credenciales inválidas';
        }
  
        this.showError = true;
      });
  }
  
  // Método para verificar si el formulario está vacío
  private isFormEmpty(): boolean {
    const { email, password } = this.loginUsuario.value;
    return !email.trim() && !password.trim();
  }
}
