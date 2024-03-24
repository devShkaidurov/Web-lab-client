import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Project } from "../interfaces/Project";

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    constructor(private http: HttpClient) { }

    get(id: number): Observable<Project> {
        return this.http.get<Project>(`http${environment.secure ? 's' : ''}://${environment.ip}:${environment.port}/projects/${id}`);
    }

    getAll(filter: string): Observable<Project[]> {
        return this.http.get<Project[]>(`http${environment.secure ? 's' : ''}://${environment.ip}:${environment.port}/projects?search=${filter}`);
    }

    getOpenedTask(): Observable<Object> {
        return this.http.get<Object>(`http${environment.secure ? 's' : ''}://${environment.ip}:${environment.port}/projects/open`);
    }

    updateProject(id: number, project: Project): Observable<Object> {
        return this.http.put<Project>(`http${environment.secure ? 's' : ''}://${environment.ip}:${environment.port}/projects/${id}`,
            project);
    }

    createProject(project: Project): Observable<Object> {
        return this.http.post<Project>(`http${environment.secure ? 's' : ''}://${environment.ip}:${environment.port}/projects`,
            project);
    }

    deleteById (id: number | undefined): Observable<Object> {
        return this.http.delete<Object>(`http${environment.secure ? 's' : ''}://${environment.ip}:${environment.port}/projects/${id}`);
    }
}

