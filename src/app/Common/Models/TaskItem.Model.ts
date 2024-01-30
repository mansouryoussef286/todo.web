export namespace TaskItem {
    export class Model {
        Id!: number;
        Title!: string;
        Description!: string;
        Status!: boolean;
        CreatedAt!: Date;
        UpdatedAt!: Date;
    }

    export class ReqModel {
        UserId!: number;
        Title!: string;
        Description!: string;
    }
}
