import { of } from 'rxjs';
import { HeroService } from '../services/hero service/hero.service';
import { HeroesComponent } from './heroes.component';
import { Hero } from '../hero';

describe('heroes component (class only)', () => {
  let component: HeroesComponent, heroServiceMock: jasmine.SpyObj<HeroService>;
  let mockHeroes:Hero[]
  beforeEach(() => {
    mockHeroes=[
      {id:100,name:"super man",strength:20},
      {id:101,name:"bat man",strength:24},
    ]
    //mock for hero service
    heroServiceMock = jasmine.createSpyObj([
      'getHeroes',
      'addHero',
      'deleteHero',
    ]);
    heroServiceMock.getHeroes.and.returnValue(of(mockHeroes))
    component = new HeroesComponent(heroServiceMock);
  });
  it('after calling ngOninit should have heroes', () => {
    component.ngOnInit()
    expect(heroServiceMock.getHeroes).toHaveBeenCalled()
    expect(component.heroes).toHaveSize(2)
  });
});
