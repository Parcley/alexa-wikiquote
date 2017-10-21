# wiki quote skill

Using [Alexa SDK for nodeJs](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs) to build 
a skill reading quotes from de.wikiquote.org

# Getting Started

## toolchain

  ```
  npm install
  ```
  - open Visual Studio Code
  - build with Ctrl+Shift+B

## Step 2: Creating Your Skill Logic Using AWS Lambda

 5. Compress the files inside the src directory into a zip file. **Remember**, do not compress the src directory itself, just the files within the directory, the index.js file and the node_modules folder. Your compressed file should show up in the src directory. You will use this file in a later step.

### Not working (getting an invalid response)?
* Do you have the right ARN copied from your Developer Portal/Skill into your your Lambda function?
* Are you calling the right invocation name?
* Are you saying launch, start or open?
* Are you sure you have no other skills in your accounts with the same invocation name?
* For this template specifically, you should have a minimum of 20 questions for a good customer experience.

## Step 5: Make it Yours

 1. In the Skill Information section in the Developer Console, edit the Skill Information Tab to reflect your new trivia skill:

 2. Open the source file for your Lambda function, index.js, in an editor of your choice. This is in the src directory of the repository you downloaded earlier. Look for corresponding locale strings in languageStrings object. "Ctrl-F" **en** for English and **de** for German. If there are different expressions between U.S. and U.K, we encourage you to specify them using **en-US** and **en-GB** while keeping a generic **en** for other countries. You can learn more about how language resources are looked up by visiting [i18next's documentation](http://i18next.com/translate/). You will see all strings defined for current language in the Reindeer Trivia example. **Note**: **'%s'** in the string represents code logic variable.
![](https://s3.amazonaws.com/lantern-code-samples-images/trivia/source_code1.png)
![](https://s3.amazonaws.com/lantern-code-samples-images/trivia/source_code2.png)


## Step 7: Publish Your Skill

     An incorrect example phrase is the most likely reason why your skill submission may fail. Here are the four most important failure points for example phrases.
     1. Example phrases do not adhere to supported phrases.</br>
         *Example: Alexa start over (You cannot use wake word without the invocation name. Further, start over can be a response from the user when the stream is open, in which case, wake word and invocation name do not make sense.)</br>*
         *Example: Alexa, Social Headline (A supported format would be Alexa, launch Social Headline)*
     2. Example phrases are not modeled on sample utterances specified in skill’s intent schema
     3. First example phrase does not contain wake word and invocation name</br>
         *Example: Incorrect example phrase - Alexa, where can I eat (Missing invocation name)*
     4. Example phrases do not provide a contextual response. These are the invariably the phrases users are most likely to try the first time they interact with the skill. Therefore, make sure that they work well and provide a good user experience.

## Check out These Other Developer Resources

* [Alexa Skills Kit (ASK)](https://developer.amazon.com/ask)
* [Alexa Developer Forums](https://forums.developer.amazon.com/spaces/165/index.html)
* [Knowledge Base](https://goto.webcasts.com/starthere.jsp?ei=1090197)
* [Intro to Alexa Skills Kit  - On Demand Webinar](https://goto.webcasts.com/starthere.jsp?ei=1090197)
* [Voice Design 101 - On Demand Webinar](https://goto.webcasts.com/starthere.jsp?ei=1087594)
* [Developer Office Hours](https://attendee.gotowebinar.com/rt/8389200425172113931)
* [Developing Skills in Multiple Languages](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/developing-skills-in-multiple-languages)

