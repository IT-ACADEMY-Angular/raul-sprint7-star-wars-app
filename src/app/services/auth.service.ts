import { Inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, fetchSignInMethodsForEmail } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { Validations } from '../auth/validations/validations';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    @Inject(Auth) private auth: Auth,
    private router: Router
  ) {
    this.auth.onAuthStateChanged((user) => {
      this.currentUserSubject.next(user);
    });
  }
  async register(email: string, password: string): Promise<void> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      this.currentUserSubject.next(userCredential.user);
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        throw new Error(Validations.emailAlreadyInUseMessage);
      } else {
        throw new Error('Ocurrió un error inesperado.');
      }
    }
  }

  async checkEmailExists(email: string): Promise<void> {
    try {
      const signInMethods = await fetchSignInMethodsForEmail(this.auth, email);
      if (signInMethods.length > 0) {
        throw new Error('Este email ya está registrado.');
      }
    } catch (error: any) {
      if (error.code === 'auth/invalid-email') {
        throw new Error('Por favor, introduce un email válido.');
      }
      throw error;
    }
  }

  async login(email: string, password: string): Promise<void> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      this.currentUserSubject.next(userCredential.user);
    } catch (error) {
      throw new Error('Invalid email or password.');
    }
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return !!this.auth.currentUser;
  }
}