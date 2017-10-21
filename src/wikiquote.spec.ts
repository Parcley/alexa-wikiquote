import {Wikiquote} from "./wikiquote"

describe("Wikiquote", function() {
  
    it("randomTitle returns non-empty title", function(done) {
        Wikiquote.getRandomTitle().subscribe(
            (title: string) => {
                expect(title).toBeDefined();
                expect(title).not.toEqual("");
                done();
            }
        );
    });

});
