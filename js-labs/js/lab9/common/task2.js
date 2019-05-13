function task2() {
    class Task {
        constructor(name, description, start, end){
            this.name = name;
            this.description = description;
            this.start = start;
            this.end = end;
            this.subtasks = [];
        }
        
        addSubtask (task) {
            if (task instanceof Task){
                this.subtasks.push(task);
            }
        }
        
        toString(){
            return `name: ${this.name}\ndescription: ${this.description}\nstart: ${this.start.toLocaleString()}\nend: ${this.end.toLocaleString()}\n`
        }
    }
    
    class CompletableTask extends Task {
        constructor(name, description, start, end){
            super(name, description,start,end);
            this.progress = 0;
            this.isCompleted = false;
        }
        
        toString() {
            return super.toString() + `progress: ${this.progress}\ncompleted: ${this.isCompleted}`
        }
    }

    var task = new CompletableTask("task","", new Date(), new Date());
    var subTask = new Task("", "",Date.now());
    var subTask2 = new CompletableTask("task2","", new Date(), new Date());
    task.addSubtask(subTask);
    task.addSubtask(subTask2);
    Date.prototype.toLocaleString
    alert(task)
}

