import * as Alexa from "alexa-sdk";
import {Wikiquote} from "./wikiquote";

const handlers: Alexa.Handlers<Alexa.Request> = {
    'LaunchRequest': function() {
        console.log("in LaunchRequest");
        this.emit('SayHello');
    },
    'HelloWorldIntent': function() {
        this.emit('SayHello');
    },
    'SayHello': function() {
        console.log("in SayHello");
        Wikiquote.getRandomTitle().subscribe(
            (data: string) => {
                this.emit(':tell', 'Hallo Wiki Zitate!');
            }
        );
    }
};

export function handler (event: Alexa.RequestBody<Alexa.Request>, context: Alexa.Context, callback: ()=>void){
    console.log("event.request: " + JSON.stringify(event.request));
    console.log("context: " + JSON.stringify(context));
    const alexa: Alexa.AlexaObject<Alexa.Request> = Alexa.handler(event, context, callback);
    alexa.appId = "amzn1.ask.skill.675c7d8f-66b2-4502-90fa-e4ca1795cbd2";
    alexa.resources = {};
    alexa.registerHandlers(handlers);
    alexa.execute();
}
