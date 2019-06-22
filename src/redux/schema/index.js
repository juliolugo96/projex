import { schema } from "normalizr";

export const user = new schema.Entity("users");

export const tasks = new schema.Entity("tasks");

export const boards = new schema.Entity("boards", {
    tasks: [tasks]
}, {
    processStrategy: (value, parent, key) => {
        return {...value, parentId: parent.id};
    }
});

export const projects = new schema.Entity("projects", {
    boards: [boards]
});

