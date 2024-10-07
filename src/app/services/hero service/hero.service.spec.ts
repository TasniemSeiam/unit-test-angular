import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MessageService } from '../message/message.service';
import { HeroService } from './hero.service';

describe('hero service:', () => {
  let mockMessageService: jasmine.SpyObj<MessageService>;
  let service: HeroService, httpTesting: HttpTestingController;
  let heroesUrl = 'http://localhost:3000/heroes';
  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(['add']);
    // 1
    TestBed.configureTestingModule({
      providers: [
        // ... other test providers
        provideHttpClient(),
        provideHttpClientTesting(),
        {provide:MessageService,useValue:mockMessageService}
      ],
    });
    // 2
    httpTesting = TestBed.inject(HttpTestingController);
    // 3
    service = TestBed.inject(HeroService);
  });
  it('getHero()', () => {
    service.getHero(3).subscribe({
      next: (data) => {
        expect(data.name).toBe('spider man');
      },
    });

    let testReq = httpTesting.expectOne(heroesUrl + '/3');
    expect(testReq.request.method).toBe('GET');

    testReq.flush({ id: 3, name: 'spider man', strength: 11 });
  });
  it("addHero()",()=>{
    let mockHero={ id: 3, name: 'spider man', strength: 11 }
    service.addHero(mockHero).subscribe({next:(data)=>{
      expect(data).toEqual(mockHero)
    }})

   let testReq= httpTesting.expectOne(heroesUrl)
   expect(testReq.request.method).toBe("POST")

   testReq.flush(mockHero)
   
  })
  afterAll(()=>{
    httpTesting.verify()
  })
});
