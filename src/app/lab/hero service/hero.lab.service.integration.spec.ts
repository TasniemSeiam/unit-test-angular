import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { HeroServiceForLab } from './hero.lab.service';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

describe('3-hero service (http) integration testing:', () => {
  let service: HeroServiceForLab, httpTesting: HttpTestingController;
  let heroesUrl = 'http://localhost:3000/heroes';
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        // ... other test providers
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    httpTesting = TestBed.inject(HttpTestingController);

    service = TestBed.inject(HeroServiceForLab);
  });
  it('getHeroes function: send request and receive response successfully', () => {
    service.getHeroes().subscribe({
      next: (data) => {
        expect(data).toEqual([]);
      },
    });
    const testReq = httpTesting.expectOne(heroesUrl);
    expect(testReq.request.method).toBe('GET');
    testReq.flush([]);
  });
  it('updateHero function: send request and receive response successfully', () => {
    service
      .updateHero({ id: 1, name: 'Tasniem', strength: 10 })
      .subscribe({
        next: (data) => {
          expect(data).toEqual({});
        },
      });

    const testReq = httpTesting.expectOne(heroesUrl);
    expect(testReq.request.method).toBe('PUT');
    testReq.flush({});
  });
  afterAll(()=>{
    httpTesting.verify()
  })
});
