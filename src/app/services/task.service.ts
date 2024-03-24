import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Task } from "../interfaces/Task";

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    constructor(private http: HttpClient) { }

    get(id: number): Observable<Task[]> {
        return this.http.get<Task[]>(`http${environment.secure ? 's' : ''}://${environment.ip}:${environment.port}/projects/${id}/tasks`);
    }

    deleteTaskById(projectId: number | undefined, taskId: number):  Observable<Task> {
        return this.http.delete<Task>(`http${environment.secure ? 's' : ''}://${environment.ip}:${environment.port}/projects/${projectId}/tasks/${taskId}`);
    }
}

