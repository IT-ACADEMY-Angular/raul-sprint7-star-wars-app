import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StarshipDetailComponent } from './starship-detail.component';
import { AppService } from '../../services/app.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('StarshipDetailComponent', () => {
    let component: StarshipDetailComponent;
    let fixture: ComponentFixture<StarshipDetailComponent>;
    let mockAppService: jasmine.SpyObj<AppService>;
    let mockActivatedRoute: any;

    beforeEach(async () => {

        mockAppService = jasmine.createSpyObj('AppService', ['getStarshipById', 'extractIdFromUrl', 'getStarshipImageUrl']);

        mockActivatedRoute = {
            snapshot: {
                paramMap: {
                    get: jasmine.createSpy('get').and.returnValue('1'),
                },
            },
        };

        await TestBed.configureTestingModule({
            imports: [StarshipDetailComponent, HttpClientTestingModule],
            providers: [
                { provide: AppService, useValue: mockAppService },
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(StarshipDetailComponent);
        component = fixture.componentInstance;
    });

    it('debe crearse', () => {
        expect(component).toBeTruthy();
    });

    it('debe llamar loadStarshipDetail en la inicializacino', () => {
        const spyLoadStarshipDetails = spyOn(component, 'loadStarshipDetails').and.callThrough();
        mockAppService.getStarshipById.and.returnValue(of({ name: 'X-Wing' }));

        fixture.detectChanges();

        expect(mockActivatedRoute.snapshot.paramMap.get).toHaveBeenCalledWith('id');
        expect(spyLoadStarshipDetails).toHaveBeenCalledWith('1');
    });

    it('debe cargar un detalle de nave y asignar a la propiedad de la nave', () => {
        const mockStarship = {
            name: 'X-Wing',
            url: 'https://swapi.dev/api/starships/1/',
            pilots: [],
            films: [],
        };
        mockAppService.getStarshipById.and.returnValue(of(mockStarship));

        component.loadStarshipDetails('1');

        expect(mockAppService.getStarshipById).toHaveBeenCalledWith('1');
        expect(component.starship).toEqual(mockStarship);
    });

    it('debe generar correctamente la URL de la imagen de la nave', () => {
        const mockStarship = {
            url: 'https://swapi.dev/api/starships/1/',
        };
        component.starship = mockStarship;
        mockAppService.extractIdFromUrl.and.returnValue('1');
        mockAppService.getStarshipImageUrl.and.returnValue('https://starwars-visualguide.com/assets/img/starships/1.jpg');

        const imageUrl = component.getStarshipImage();

        expect(mockAppService.extractIdFromUrl).toHaveBeenCalledWith(mockStarship.url);
        expect(mockAppService.getStarshipImageUrl).toHaveBeenCalledWith('1');
        expect(imageUrl).toBe('https://starwars-visualguide.com/assets/img/starships/1.jpg');
    });

    it('debe poner imagen de not found image en el error de imagen loading', () => {
        const mockEvent = {
            target: {
                src: '',
            },
        } as unknown as Event;
        component.onImageError(mockEvent);

        expect((mockEvent.target as HTMLImageElement).src).toBe(
            'https://starwars-visualguide.com/assets/img/big-placeholder.jpg'
        );
    });
});
