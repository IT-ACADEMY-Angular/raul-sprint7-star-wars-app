import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('LoginComponent (Standalone)', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let mockAuthService: jasmine.SpyObj<AuthService>;
    let mockRouter: jasmine.SpyObj<Router>;

    beforeEach(async () => {

        mockAuthService = jasmine.createSpyObj('AuthService', ['login']);

        mockRouter = jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl'], {
            events: of({})
        });

        await TestBed.configureTestingModule({
            imports: [LoginComponent, FormsModule],
            providers: [
                { provide: AuthService, useValue: mockAuthService },
                { provide: Router, useValue: mockRouter },
                { provide: ActivatedRoute, useValue: { snapshot: { queryParams: {} } } },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('debe crearse', () => {
        expect(component).toBeTruthy();
    });

    it('debe salir error si el mail o pass es incorrecto', () => {
        component.email = 'invalidemail';
        component.password = 'short';
        component.onSubmit();
        expect(component.errorMessage).toBe('Invalid email or password.');
    });

    it('debe llamar AuthService.login con las credenciales correctas', async () => {
        component.email = 'test@example.com';
        component.password = 'password123';
        mockAuthService.login.and.returnValue(Promise.resolve());
        await component.onSubmit();
        expect(mockAuthService.login).toHaveBeenCalledWith('test@example.com', 'password123');
    });

    it('debe redireccionar a returnUrl despues de logear correctamente', async () => {
        component.email = 'test@example.com';
        component.password = 'password123';
        mockAuthService.login.and.returnValue(Promise.resolve());
        spyOn(localStorage, 'getItem').and.returnValue('/starship');
        spyOn(localStorage, 'removeItem');

        mockRouter.navigate.and.returnValue(Promise.resolve(true));
        mockRouter.navigateByUrl.and.returnValue(Promise.resolve(true));

        await component.onSubmit();

        await fixture.whenStable();

        expect(mockRouter.navigate).toHaveBeenCalledWith([{ outlets: { modal: null } }]);
        expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/starship');
    });

    it('debe setear correctamente errorMessage si el login falla', async () => {
        component.email = 'test@example.com';
        component.password = 'wrongpassword';
        mockAuthService.login.and.returnValue(Promise.reject('Invalid login'));

        await component.onSubmit();

        expect(component.errorMessage).toBe('Invalid email or password.');
    });
});
