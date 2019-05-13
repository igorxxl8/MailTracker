function ind_task1(){
    class Tuple2{
        constructor(item1, item2){
            this.item1 = item1;
            this.item2 = item2;
        }

        toString() {
            return `(${this.item1}, ${this.item2})`
        }
    }

    class TaskList {
        constructor(tasks=[]){
            this.tasks = tasks;
        }

        addTask(task){
            if (!task instanceof Task) return;
            this.tasks.push(task);
        }

        removeTask(task){
            var tasks = this.tasks;
            for (var index in tasks){
                if (tasks[index] == task) 
                    delete tasks[index];
            }
        }

        findTaskByAttr(attr,value){
            var tasks = this.tasks;
            for (var index in tasks){
                if (tasks[index][attr] != value) continue;
                return tasks[index];
            }
        }

        correct(job, data) {
            var task = this.findTaskByAttr("job", job);

            if (data.project_name !== undefined)
                task.project_name = data.project_name;
            if (data.job !== undefined)
                task.job = data.job;
            if (data.lead !== undefined)
                task.lead = data.lead;
            if (data.performer !== undefined)
                task.performer = data.performer;
            if (data.start !== undefined)
                task.start = data.start;
            if (data.end !== undefined)
                task.end = data.end;
            alert(task);
        }

        sortByProjectName(){
            this.sort('project_name');
        }

        sortByTaskName(){
            this.sort('job');
        }

        sortByLead(){
            this.sort('lead');
        }

        sortByPerformer(){
            this.sort('performer');
        }

        sortByStart(){
            this.sort('start');
        }

        sortByEnd(){
            this.sort('end');
        }
            
        sort(attr) {
            this.tasks.sort(preducate);

            function preducate(current, next) {
                var a = current[attr];
                var b = next[attr];
                var returnValue = -1;
                if (a > b){
                    returnValue = 1;
                }
                if (a == b){
                    returnValue = 0;
                }
                return returnValue;
            }
        }
    
        getTasksByProject(project_name){
            var filtered = this.tasks.filter(p => p.project_name == project_name)
            var result = filtered.map(t => new Tuple2(`Task: ${t.job}`, `Performer: ${t.performer}`));
            return result;
        }

        getTasksWithComingMonthDeadline() {
            var date = new Date();
            var nextMonth = new Date();
            nextMonth.setMonth((date.getMonth()+1)%12);
            return this.tasks.filter(t => +date <= +t.end && +t.end <= +nextMonth);
        }

        toString() {
            return this.tasks.toString();
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
            return `\nProject: ${this.project_name}
                    job: ${this.job}
                    lead: ${this.lead}
                    performer: ${this.performer}
                    start: ${this.start.toLocaleString()}
                    end: ${this.end.toLocaleString()}`
        }
    }  

    var proj_name1 = "Proj";
    var proj_name2 = "Another";
    var date = new Date();
    var end1 = new Date();
    end1.setMonth((date.getMonth()+1)%12);
    var end2 = new Date();
    end2.setMonth((date.getMonth()+2)%12)
    var task1 = new Task(proj_name1, "Make graphic", "Ivanov Ivan", "Turcevich Igor", date, end1);
    var task2 = new Task(proj_name1, "Make cake", "Ivanov Ivan", "Petrov", date, end1);
    var task3 = new Task(proj_name2, "Make task", "Ivanov Ivan", "Turcevich Igor", date, end2);
    var task4 = new Task(proj_name2, "Make tree", "Genrich", "Petrov", date, end2);
    var tasks = new TaskList([task1, task2, task3]);
    tasks.addTask(task4);
    var projTasks = tasks.getTasksByProject(proj_name1);
    alert(`Project: ${proj_name1}:\nTasks: ${projTasks}`)

    tasks.removeTask(task2);
    var projTasks2 = tasks.getTasksByProject(proj_name1);
    alert(`Project: ${proj_name1}:\nTasks: ${projTasks2}`)

    var test = tasks.getTasksByProject(proj_name2);
    alert(`Project: ${proj_name2}:\nTasks: ${test}`)
    
    var tasksMonth = tasks.getTasksWithComingMonthDeadline();
    alert(`Comming month deadline: ${tasksMonth}`);

    tasks.sortByProjectName();
    alert(`Sorted by project name: ${tasks}`);

    tasks.sortByTaskName();
    alert(`Sorted by task name: ${tasks}`);

    tasks.sortByLead();
    alert(`Sorted by lead: ${tasks}`);

    tasks.sortByPerformer();
    alert(`Sorted by performer: ${tasks}`);

    tasks.sortByStart();
    alert(`Sorted by start: ${tasks}`);

    tasks.sortByEnd();
    alert(`Sorted by end: ${tasks}`);
    
    tasks.correct(
        "Make tree", 
        {
            "job":"Make graphic", 
            "lead":"Ivanov Ivan",
            "performer": "Turcevich Igor", 
            "start":date, 
            "end":end1
        }
    )

    alert(tasks);
}