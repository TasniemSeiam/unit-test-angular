import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CounterComponent } from "./counter.component";
import { By } from "@angular/platform-browser";

describe('counter component: ', () => {
  let fixture:ComponentFixture<CounterComponent>,component:CounterComponent

  beforeEach(/* async */()=>{
    // 1
   /* await  */TestBed.configureTestingModule({imports:[CounterComponent]})/* .compileComponents() */
    // 2
     fixture= TestBed.createComponent(CounterComponent)
     component= fixture.componentInstance
  })
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('p tag in template has counter=10', () => {
    expect(component.counter).toBe(0)
    component.counter=10
    fixture.detectChanges()
    // access p tag (1)
   let p= fixture.debugElement.query( By.css("p") )
   expect(p.nativeElement.textContent).toContain("10")
  });
  it("should increase counter when clicking btn and update it in template",()=>{
    // access btn
   let btn= fixture.debugElement.query( By.css("#inc") )
    // trigger click
    btn.triggerEventHandler("click")
    btn.triggerEventHandler("click")
    btn.triggerEventHandler("click")

    fixture.detectChanges()
    // assert counter
    expect(component.counter).toBe(3)
    // assert counter in template
      // access p tag (2)
     let p= fixture.nativeElement.querySelector("p")
     expect(p.textContent).toContain("3")
  })
});
