import TaskService from "../services/TaskService.js";
import AppError from "../utils/AppError.js";

class TaskControll{
    GetControll(req, res, next){
        try {
            const Objlist = TaskService.GetService();
            res.json(Objlist); 
        } catch (error) {
            next(error);
        }
        
    }

    SearchControll(req, res, next){
        try {
            const ParamId = parseInt(req.params.id);

            if (isNaN(ParamId)) {
                throw new AppError("ID inválido", 400);
            }

            const Objlist = TaskService.SearchService(ParamId);

            if(Objlist === null){
                throw new AppError("Tarefa não encontrada", 404);
            } else{
                res.json(Objlist); 
            }
        } catch (error) {
			//retorna uma reposta 404
            next(error);
        }
    }
	

    PostControll(req, res, next){
        try {
            const {title} = req.body;
            const PostedOBJ = TaskService.PostService(title);
            res.status(201).json(PostedOBJ);
        } catch (error) {
			// retorna resposta json
            next(error);
        }
    }

    PutControll(req, res, next){
        try {
            const ParamId = parseInt(req.params.id);
            if (isNaN(ParamId)) {
                throw new AppError("ID inválido", 400);
            }
            const JSONbody = req.body;
            const AlteredOBJ = TaskService.PutService(JSONbody, ParamId);

			res.json(AlteredOBJ);
        } catch (error) {
            next(error);
        }
    }


    DeleteControll(req, res, next){
        try{

            const ParamId = parseInt(req.params.id);
            if (isNaN(ParamId)) {
                throw new AppError("ID inválido", 400);
            }
            const ItemDeleted = TaskService.DeleteService(ParamId);
    
            if(!ItemDeleted){
				// exceções são apenas tratadas no controller, e não geradas aqui
                throw new AppError("Tarefa não encontrada", 404);
            } else{
                res.status(204).send();
            }
        } catch (error) {
            next(error);
        }
    }
}

export default new TaskControll();