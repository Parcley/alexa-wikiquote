import {Observable} from "rxjs";
import {RxHR, RxHttpRequestResponse} from "@akanass/rx-http-request";
import * as cheerio from "cheerio";

export interface Section {
    anchor: string,
    byteoffset: number,
    fromtitle: string,
    index: string, 
    level: string,
    line: string,
    number: string,
    tocLevel: number
}

export interface SectionIndexes {
    titles: string, 
    sections: string[]
}

export class Wikiquote {

    private static endpoint: string = "https://de.wikiquote.org/w/api.php";

    // https://de.wikiquote.org/wiki/Spezial:ApiSandbox#action=parse&format=json&pageid=11810&prop=sections

    public static getRandomId(): Observable<number> {
        return RxHR.get(Wikiquote.endpoint+"?action=query&list=random&format=json&rnnamespace=0")
        .map( (data: RxHttpRequestResponse, idx: number) => {
            let reply = JSON.parse(data.body);
            return reply.query.random[0].id;
        });
    }

    public static getSectionIndexes(pageId: number): Observable<SectionIndexes> {
        let uri: string = Wikiquote.endpoint+"?action=parse&format=json&pageid="+pageId+"&prop=sections"
        console.log(uri);
        return RxHR.get(uri)
        .map( (data: RxHttpRequestResponse, idx: number) => {
            let reply = JSON.parse(data.body);
            let sectionsIn: Section[] = reply.parse.sections;
            let sectionsOut: any[] =[];
            for(let section of sectionsIn) {
                var splitNum = section.number.split('.');
                if(splitNum.length > 1 && splitNum[0] === "1") {
                    sectionsOut.push(section.index);
                }
            }
            // Use section 1 if there are no "1.x" sections
            if(sectionsOut.length === 0) {
                sectionsOut.push("1");
            }
            return { titles: reply.parse.title, sections: sectionsOut };
        });
    }

    public static getRandomTitle(): Observable<string> {
        console.log("getting random title");
        return RxHR.get("https://de.wikiquote.org/w/api.php?action=query&list=random&format=json&rnnamespace=0")
        .map( (data: RxHttpRequestResponse, idx: number) => {
            console.log("body: "+data.body);
            let reply = JSON.parse(data.body);
            return reply.query.random[0].title;
        });
    }

    private static htmlToText(inputHtml: string): string{
        const loaded: CheerioStatic = cheerio.load(inputHtml);
        let parsed: Cheerio = loaded('*');
        return parsed.text();
    }

    private static getAllTopLevelLis(input: string): string[]{
        let output: string[] = [];
        const cheerioContent: CheerioStatic = cheerio.load(input);
        let lis: Cheerio = cheerioContent('li:not(li li)');
        lis.each( (i: number, element: CheerioElement)=>{
            let content: CheerioStatic = cheerio.load(element.children[0]);
            let h: string = content.html();
            output.push(h);
        } );
        return output;
    }

    public static getQuotesForSection(pageId: number, sectionIndex: string): Observable<string[]> {
        let uri: string = Wikiquote.endpoint+"?action=parse&format=json&pageid="+pageId+"&noimages=&section="+sectionIndex;
        console.log(uri);
        return RxHR.get(uri)
        .map( (data: RxHttpRequestResponse, idx: number) => {
            let reply = JSON.parse(data.body);
            let content = reply.parse.text["*"];
            let lis: string[] = Wikiquote.getAllTopLevelLis(content);
            let lisText: string[] = lis.map(Wikiquote.htmlToText);
            return lisText;
        });
    }
}