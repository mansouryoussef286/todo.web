export namespace TaskItem {
    export class Model {
        Id!: number;
        title!: string;
        description!: string;
        completed!: boolean;
        CreatedAt!: Date;
        UpdatedAt!: Date;
    }

    export class ReqModel {
        title!: string;
        description!: string;
    }
}
