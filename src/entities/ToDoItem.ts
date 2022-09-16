export default class ToDoItem {
    public title: string;
    public done: boolean;
    public description: string;

    constructor(title = "", done = false, description = "") {
        this.title = title;
        this.done = done;
        this.description = description;
    }
}