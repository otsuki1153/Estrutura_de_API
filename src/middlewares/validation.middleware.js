import TaskSchema from "../schemas/TaskSchema.js"

export default function validationMiddleware(req, res,next) {
    // if(req.method === "GET" || req.method === "DELETE"){
    //     return next();
    // }

    // const {title} = req.body;
    // if(title === undefined){
    //     return res.status(400).send("Error 400 Bad Request");
    // }
    // if(typeof title !== "string"){
    //     return res.status(400).send("Error 400 Bad Request");
    // }
    // if(title.trim() === ""){
    //     return res.status(400).send("Error 400 Bad Request");
    // }

    const result = TaskSchema.safeParse(req.body);

    if(!result.success){
        return res.status(400).json({
            errors: result.error.issues.map(issue =>({
                field: issue.path.join("."),
                message: issue.message
            }))
        });
    }
    req.body = result.data;
    next();
};
