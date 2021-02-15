import index from "../src/index";

test("test sum", ()=>{
    expect(index.sum(1, 2)).toEqual(3);
});