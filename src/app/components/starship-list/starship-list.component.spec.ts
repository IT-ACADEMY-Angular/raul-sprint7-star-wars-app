import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StarshipListComponent } from './starship-list.component';
import { AppService } from '../../services/app.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

describe('StarshipListComponent', () => {
    let component: StarshipListComponent;
    let fixture: ComponentFixture<StarshipListComponent>;
    let mockAppService: jasmine.SpyObj<AppService>;

    beforeEach(async () => {
        mockAppService = jasmine.createSpyObj('AppService', ['getStarships'], {
            apiUrl: 'https://swapi.dev/api/starships',
        });

        await TestBed.configureTestingModule({
            imports: [
                StarshipListComponent,
                HttpClientTestingModule,
                InfiniteScrollModule,
                CommonModule,
                RouterModule.forRoot([])
            ],
            providers: [
                { provide: ActivatedRoute, useValue: { snapshot: { paramMap: new Map() } } },
            ],
        })
            .overrideProvider(AppService, { useValue: mockAppService })
            .compileComponents();

        fixture = TestBed.createComponent(StarshipListComponent);
        component = fixture.componentInstance;
    });

    it('debe crearse', () => {
        expect(component).toBeTruthy();
    });

    it('debe iniciar con un starship list vacio', () => {
        expect(component.starships).toEqual([]);
        expect(component.nextUrl).toBeNull();
        expect(component.loading).toBe(false);
    });

    it('debe cargar naves en la inicializacion', async () => {
        const mockResponse = {
            results: [{ id: '1', name: 'X-Wing', model: 'T-65 X-wing' }],
            next: 'https://swapi.dev/api/starships?page=2',
        };

        mockAppService.getStarships.and.returnValue(of(mockResponse));

        fixture.detectChanges();

        await fixture.whenStable();

        expect(mockAppService.getStarships).toHaveBeenCalledWith('https://swapi.dev/api/starships');

        expect(component.starships).toEqual(mockResponse.results);
        expect(component.nextUrl).toBe(mockResponse.next);
        expect(component.loading).toBe(false);
    });

    it('debe cargar naves cuando se scrollea', async () => {
        const initialMockResponse = {
            results: [{ id: '1', name: 'X-Wing', model: 'T-65 X-wing' }],
            next: 'https://swapi.dev/api/starships?page=2',
        };

        const scrollMockResponse = {
            results: [{ id: '2', name: 'TIE Fighter', model: 'TIE/LN starfighter' }],
            next: null,
        };

        mockAppService.getStarships.and.returnValues(
            of(initialMockResponse),
            of(scrollMockResponse)
        );

        fixture.detectChanges();

        await fixture.whenStable();

        expect(mockAppService.getStarships).toHaveBeenCalledWith('https://swapi.dev/api/starships');

        expect(component.starships).toEqual(initialMockResponse.results);
        expect(component.nextUrl).toBe(initialMockResponse.next);
        expect(component.loading).toBe(false);

        component.onScroll();

        fixture.detectChanges();
        await fixture.whenStable();

        expect(mockAppService.getStarships).toHaveBeenCalledWith('https://swapi.dev/api/starships?page=2');

        expect(component.starships).toEqual([
            { id: '1', name: 'X-Wing', model: 'T-65 X-wing' },
            { id: '2', name: 'TIE Fighter', model: 'TIE/LN starfighter' },
        ]);
        expect(component.nextUrl).toBeNull();
        expect(component.loading).toBe(false);
    });


    it('debe cargar naves si estas logeado', () => {
        component.loading = true;

        component.onScroll();

        expect(mockAppService.getStarships).not.toHaveBeenCalled();
    });

    it('no debe cargar naves si nextUrl es null', () => {
        component.nextUrl = null;

        component.onScroll();

        expect(mockAppService.getStarships).not.toHaveBeenCalled();
    });
});
