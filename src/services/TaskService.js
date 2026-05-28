
class TaskService{

    constructor(){
        this.tarefas = [];
        this.NextId = 1;
    }

    GetService(){
        return this.tarefas;
    }   

    SearchService(ParamId){
        const index = this.tarefas.findIndex(t => t.id === ParamId);

        if(index === -1){
            return null;
        }
        return this.tarefas[index];
    }

    PostService(title){
        const processedMsg = {
            "id":this.NextId,
            "title":title
        }

        this.tarefas.push(processedMsg);
        this.NextId++;
        return processedMsg;
    }

    PutService(OBJ, ParamId){
        const index = this.tarefas.findIndex(t => t.id === ParamId);

        if(index === -1){
            return null;
        }

        this.tarefas[index] = {
            ...this.tarefas[index],
            ...OBJ
        }
        return this.tarefas[index];
    }

    DeleteService(ParamId){
        const index = this.tarefas.findIndex(t => t.id === ParamId);

        if(index === -1){
            return false;
        }

        this.tarefas.splice(index, 1);

        return true;
    }
}

export default new TaskService();