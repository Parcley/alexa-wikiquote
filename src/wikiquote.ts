import {Observable} from "rxjs";
import {RxHR, RxHttpRequestResponse} from "@akanass/rx-http-request";

export class Wikiquote {

    public static getRandomTitle(): Observable<string> {
        console.log("getting random title");
        return RxHR.get("https://en.wikiquote.org/w/api.php?action=query&list=random&format=json")
        .map( (data: RxHttpRequestResponse, idx: number) => {
            console.log("body: "+data.body);
            let reply = JSON.parse(data.body);
            return reply.query.random[0].title;
        });
    }

}