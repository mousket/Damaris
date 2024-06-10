
/*
import convertTextToSpeech from "../../Components/Speech/textToAudio";
import transcribeAudioFromMicrophone from "../../Components/Speech/audioToText";
import {customEntityExtraction} from "../../Components/CustomEntityExtraction/customeEntityExtraction";
import {getSentimentScore} from "../../Components/Sentiment/textSentimentAnalysis";
*/

import convertTextToSpeech from "@/Domain/Speech/textToAudio";
import transcribeAudioFromMicrophone from "@/Domain/Speech/audioToText";
import customEntityExtraction from "@/Domain/CustomEntityExtraction/customeEntityExtraction";
import getSentimentScore from "@/Domain/Sentiment/textSentimentAnalysis";

class ShippingProcess {
    public addressLine1: string = '';
    public cityTown: string = '';
    public stateProvince: string = '';
    public postalCode: string = '';
    public dateOfShipment :Date = new Date();
    public parcelLength : number = 0;
    public parcelWidth: number = 0;
    public parcelHeight : number = 0;
    public dimUnit : string = "IN";
    public weightUnit : string = "OZ";

    public mapValuesFromList(list: Record<string, string>[]): void {
        for (const item of list) {
            for (const key in item) {
                if (item.hasOwnProperty(key) && item[key]) {
                    // Assign value to class property if not empty or null
                    this[key] = item[key];
                }
            }
        }
    }
    public carrierAccounts : string [] = ["jg5Z5pgl29A"]

    public promptDictionary: Record<string, string> = {
        addressLine1: "What’s the street address for the delivery?",
        cityTown: "May I have your city or town name?",
        stateProvince: "Which state are we shipping to?",
        specialService: "Special Service",
        postalCode: "And the postal code or ZIP code?",
        shippingItem: "Now let's talk about the item you want to ship. What can you tell me about the item you're shipping? Dimensions and weight.",
        parcelLength: "How long is the item?",
        parcelWidth: "How wide is the item you're shipping today?",
        parcelHeight: "Can you remind me of the height of the item you're shipping again?",
        carrier: "Carrier",
        dateOfShipment: "Are you shipping your item today or do you have another date in mind?",
        shippingService: "Lastly, any idea of how fast you want your item to get to its destination?",
    };


    public async checkAndFillProperties(): Promise<void> {
        const propertiesToFill = Object.keys(this);

        while (propertiesToFill.length > 0) {
            const propertyName = propertiesToFill.pop();
            if (propertyName && !this[propertyName]) {
                const promptValue = this.promptDictionary[propertyName];
                if (promptValue) {
                    // You can prompt the user here or handle it as needed
                    await convertTextToSpeech(promptValue);

                    //the user answers the question we will transcribe  it
                    const userReply = await transcribeAudioFromMicrophone();

                    //Sending for entity extraction
                    const entityList = await customEntityExtraction(userReply);

                    //mapping values
                    this.mapValuesFromList(entityList);
                }
            }
        }
        // Trigger the function sendForShipmentRate when all members are filled
        this.confirmShipment();
    }


    private async confirmShipment(): Promise<void> {
        let confirmationString = `Now let me confirm the destination address. You said that the street address was "${this.addressLine1}" in ${this.cityTown}, ${this.stateProvince}, ${this.postalCode}.`;

        // Add more details for other members
        confirmationString += ` Your shipment is scheduled for ${this.dateOfShipment.toDateString()}.`;
        confirmationString += ` The dimensions of your parcel are ${this.parcelLength} ${this.dimUnit} (length), ${this.parcelWidth} ${this.dimUnit} (width), and ${this.parcelHeight} ${this.dimUnit} (height).`;
        confirmationString += ` The weight unit is ${this.weightUnit}.`;
        confirmationString += ` Looks like we have all the information we need! Let’s get those rates! Could you kindly give me a big “yes” to proceed `;

        // The system prompts the confirmation to the user
        await convertTextToSpeech(confirmationString);

        //the user answers the question we will transcribe  it
        const userReply = await transcribeAudioFromMicrophone();

        //confirm that the user agrees
        if(await this.checkUserReplySentiment(userReply))
        {
            const systemText = `Great! Let’s move forward with finding the rates.`;
            await convertTextToSpeech(systemText);

            //Redirect To The Rates pages
        }
        else {

            const systemText = `I can see that you don't feel totally confident. Did we I miss something? 
            Let's still look at the rates and if something there doesn't get you excited, I promise we'll go back and fix it.             `

            await convertTextToSpeech(systemText);

            //Redirect To The Rates pages
        }
    }


    private async checkUserReplySentiment(userReply: string): Promise<boolean> {
        const keywords = ["Yes", "Of course", "Definitely", "Let's do this", "awesome"];

        //Get Sentiment Score
        const sentiment = await getSentimentScore(userReply)
        const sentimentScore = Number(sentiment);

        for (const keyword of keywords) {
            if ((userReply.includes(keyword)) && (sentimentScore > 0.7)) {
                return true;
            }
        }
        return false; // User's reply does not match any of the phrases
    }

}