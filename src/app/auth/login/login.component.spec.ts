import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs'; // Importar 'of' para simular observables

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: Partial<ActivatedRoute>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['login']);
    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate']);

    // Simula los observables en ActivatedRoute
    mockActivatedRoute = {
      queryParams: of({ returnUrl: '/starship' }), // Simula queryParams como un observable
    };

    await TestBed.configureTestingModule({
      imports: [FormsModule], // Importa FormsModule para manejo de formularios
      declarations: [LoginComponent], // Declara el componente
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }, // Proveedor mock para ActivatedRoute
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit', () => {
    it('should show error message if email or password is invalid', () => {
      component.email = 'invalid-email';
      component.password = 'short';
      component.onSubmit();

      expect(component.errorMessage).toBe('Invalid email or password.');
    });

    it('should call AuthService.login with valid credentials', async () => {
      component.email = 'test@example.com';
      component.password = 'validpassword';
      mockAuthService.login.and.returnValue(Promise.resolve());

      await component.onSubmit();

      expect(mockAuthService.login).toHaveBeenCalledWith(
        'test@example.com',
        'validpassword'
      );
    });

    it('should navigate to returnUrl on successful login', async () => {
      component.email = 'test@example.com';
      component.password = 'validpassword';
      localStorage.setItem('returnUrl', '/starship');
      mockAuthService.login.and.returnValue(Promise.resolve());

      await component.onSubmit();

      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/starship');
      expect(localStorage.getItem('returnUrl')).toBeNull();
    });

    it('should display an error message on login failure', async () => {
      component.email = 'test@example.com';
      component.password = 'invalidpassword';
      mockAuthService.login.and.returnValue(Promise.reject(new Error('Login failed')));

      await component.onSubmit();

      expect(component.errorMessage).toBe('Invalid email or password.');
    });
  });

  describe('closeModal', () => {
    it('should navigate to null modal outlet', () => {
      component.closeModal();
      expect(mockRouter.navigate).toHaveBeenCalledWith([{ outlets: { modal: null } }]);
    });
  });

  describe('navigateToRegister', () => {
    it('should navigate to register modal', () => {
      component.navigateToRegister();
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/(modal:register)', {
        replaceUrl: true,
      });
    });
  });
});
