export namespace TaskItem {
    export class Model {
        Id!: number;
        Title!: string;
        Description!: string;
        Status!: number;
        CreatedAt!: Date;
        UpdatedAt!: Date;
    }

    export class ReqModel {
        UserId!: number;
        Title!: string;
        Description!: string;
    }

    export enum Status {
        NotCompleted = 0,
        Completed = 1
    }
}
