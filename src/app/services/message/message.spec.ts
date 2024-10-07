import { MessageService } from "./message.service";

describe("message service:",()=>{
  let messageService:MessageService
  beforeEach(()=>{
    messageService= new MessageService()
  })
  it('add(): when passing msg should add it to messages', () => {
    messageService.add("msg 1")

    expect(messageService.messages).toHaveSize(1)
  });
  it("clear(): should remove all messages",()=>{
    messageService.add("msg 1")
    messageService.add("msg 2")

    messageService.clear()

    expect(messageService.messages).toHaveSize(0)
  })
})