import { of } from 'rxjs';
import { MessageService } from '../../services/message/message.service';
import { MessagesComponentForLab } from './messages.lab.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('2-message component integration testing:', () => {
  let component: MessagesComponentForLab,
    messageServiceMock: jasmine.SpyObj<MessageService>;
  let fixture: ComponentFixture<MessagesComponentForLab>;
  beforeEach(() => {
    messageServiceMock = jasmine.createSpyObj(['messages']);
    component = new MessagesComponentForLab(messageServiceMock);

    TestBed.configureTestingModule({ imports: [MessagesComponentForLab] });

    fixture = TestBed.createComponent(MessagesComponentForLab);
    component = fixture.componentInstance;
  });

  it('expect component template to be empty', () => {
    //Note: there is @if"messageService.messages.length" in line 1 in template

    component.ngOnInit();
    expect(messageServiceMock.messages.length).toBe(0);

    expect(component.messageService.messages.length).toBe(0);
    expect(fixture.nativeElement.querySelector('.msg')).toBeNull();
  });
  it('then expect div.msg to have the messages after setting it', () => {
    const messages = [
      { id: 1232, message: 'Hello' },
      { id: 1233, message: 'Tasniem' },
    ];
    component.messageService.messages = messages;
    component.ngOnInit();
    expect(component.messageService.messages.length).toBe(2);
    fixture.detectChanges();
    let div = fixture.nativeElement.querySelector('.msg');
    expect(div.textContent).toContain('Hello');
  });
});
