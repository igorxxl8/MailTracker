function ind_task1(){
    class TaskList {
        constructor(tasks){
            this.tasks = tasks;
        }
    
        getTasksByProject(project_name){
            return this.tasks.filter(p => p.project_name == project_name)
        }
    }
    
    class Task {
        constructor(project_name, job,  lead, performer, start, end){
            this.project_name = project_name;
            this.job = job;
            this.start = start;
            this.end = end;
            this.lead = lead;
            this.performer = performer;
            this.subtasks = [];
        }
    
        toString(){
            return `Project: ${this.project_name}
                    job: ${this.job}
                    lead: ${this.lead}
                    performer: ${this.performer}
                    start: ${this.start.toLocaleString()}
                    end: ${this.end.toLocaleString()}\n`
        }
    }  

    var task1 = new Task("Proj", "Make graphic", "Ivanov Ivan", "Turcevich Igor", new Date(), new Date());
    var task2 = new Task("Proj", "Make cake", "Ivanov Ivan", "Petrov", new Date(), new Date());
    var tasks = new TaskList([task1, task2]);
    var projTasks = tasks.getTasksByProject("Proj");
    alert(projTasks)

    
}


//Использовать массив объектов класса, 
//который содержит данные в соответствии с заданием. 
//В каждом варианте задания реализовать следующие 
//функции класса: 
//инициализации данных класса, 
//добавления, 
//удаления, 
//корректировки, 
//сортировки  и 
//просмотра записей.  