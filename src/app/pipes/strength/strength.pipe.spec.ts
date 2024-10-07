import { StrengthPipe } from "./strength.pipe";

describe("strength pipe:", () => {
  let pipe:StrengthPipe
  beforeEach(()=>{
     pipe= new StrengthPipe()
  })
  it('transform():when passing 8 should return "8 (weak)"', () => {
    
    expect(pipe.transform(8)).toMatch(/\(weak\)$/)
  });
  it('transform():when passing 12 should return "12 (strong)"', () => {
    
    expect(pipe.transform(12)).toMatch(/\(strong\)$/)
  });
  it('transform():when passing 22 should return "22 (unbelievable)"', () => {
    
    expect(pipe.transform(22)).toMatch(/\(unbelievable\)$/)
  });
  
})