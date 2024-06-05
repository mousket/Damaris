// Define an enum for stage status
enum StageStatus {
    NotStarted,
    InProgress,
    Completed,
}

// Define a class for each stage
class DamarisProcessStage {
    constructor(public name: string, public status: StageStatus) {}

    // Function to move to the next stage
    goToNextStage(): void {
        if (this.status === StageStatus.NotStarted) {
            this.status = StageStatus.InProgress;
        } else if (this.status === StageStatus.InProgress) {
            this.status = StageStatus.Completed;
        }
    }

    // Function to get information/component needed for the stage
    getStageInfo(): string {
        // Placeholder logic (e.g., return a message or component)
        return `Information for ${this.name}`;
    }


    process(): void {

    }
}

// Create a ShippingProcessItem with stages
class DamarisProcess {
    stages: DamarisProcessStage[] = [];

    constructor(stageNames: string[]) {
        // Initialize stages
        stageNames.forEach((name) => {
            this.stages.push(new DamarisProcessStage(name, StageStatus.NotStarted));
        });
    }
}

// Example usage
const shippingStages = ['Get Origin Address', 'Get Destination Address', 'Get Shipment Items'];
const damarisProcess = new DamarisProcess(shippingStages);

// Move to the next stage (for demonstration purposes)
damarisProcess.stages[0].goToNextStage();
console.log(damarisProcess.stages[0].status); // Should be InProgress

// Get information for a specific stage
const originAddressInfo = damarisProcess.stages[0].getStageInfo();
console.log(originAddressInfo);
