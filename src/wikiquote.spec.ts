import {Wikiquote, Section, SectionIndexes, Quotes} from "./wikiquote"

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

    it("getRandomId returns id of article", function(done) {
        Wikiquote.getRandomId().subscribe(
            (id: number) => {
                expect(id).toBeGreaterThan(0);
                done();
            }
        );
    });

    it("getSections returns sections of article", function(done) {
        const id: number = 11810;
        Wikiquote.getSectionIndexes(id).subscribe(
            (sections: SectionIndexes) => {
                expect(sections.sections.length).toBeGreaterThanOrEqual(1);
                let sectionTitle: string = sections.titles;
                expect(sectionTitle).toBe("Gespenst");
                done();
            }
        );
    });

    it("getQuotes returns quotes of article", function(done) {
        const id: number = 11810;
        Wikiquote.getQuotesForSection(id, "1").subscribe(
            (quotes: string[]) => {
                expect(quotes.length).toBeGreaterThan(0);
                let quote: string = quotes[0];
                expect(quote).toBeDefined();
                expect(quote.length).toBeGreaterThan(0);
                done();
            }
        );
    });


});
