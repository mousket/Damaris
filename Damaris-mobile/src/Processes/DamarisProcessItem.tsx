// Define an enum for stage status
enum StageStatus {
    NotStarted,
    InProgress,
    Completed,
}

// Define a class for each stage
class DamarisProcessStage {
    constructor(public status: StageStatus) {
        this.stageStatus = status;
    }
    //Where transcribed data is saved
    data : string[] = [];

    stageInformation: string = "";
    stageStatus: StageStatus = StageStatus.NotStarted;


    // Function to get information/component needed for the stage
    getStageInfo(): string {
      return this.stageInformation;
    }

    process(): void {

        this.status = StageStatus.Completed;
    }
}

// Create a ShippingProcessItem with stages
class DamarisProcess {
    processStages: DamarisProcessStage[] = [];

    // Variable that links to the stage of the process that is currently being worked on.
    currentStage: number = 0;
    status : StageStatus = StageStatus.NotStarted

    // Function to move to the next stage
    goToNextStage(): void {
        //Current Stage Completed
        this.processStages[this.currentStage].status = StageStatus.Completed;

        if (this.currentStage < this.processStages.length - 1) {
            // Move to the next stage
            this.currentStage++;
            this.processStages[this.currentStage].status = StageStatus.InProgress;
        }
    }

    constructor(stages: DamarisProcessStage[]) {  
        // Initialize stages
        stages.forEach((name) => {
            this.processStages.push(new DamarisProcessStage(StageStatus.NotStarted));
        });
    }

}

/*
// Example usage

//const damarisProcess = new DamarisProcess(StageStatus.NotStarted);


// Move to the next stage (for demonstration purposes)
//damarisProcess.goToNextStage();
// Get information for a specific stage
const originAddressInfo = damarisProcess.processStages[0].getStageInfo();
console.log(originAddressInfo);
*/