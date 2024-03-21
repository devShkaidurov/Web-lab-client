import { HttpClient, HttpHeaders } from "@angular/common/http";
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

    getAll(): Observable<Project[]> {
        return this.http.get<Project[]>(`http${environment.secure ? 's' : ''}://${environment.ip}:${environment.port}/projects`);
    }

    getOpenedTask(): Observable<Object> {
        return this.http.get<Object>(`http${environment.secure ? 's' : ''}://${environment.ip}:${environment.port}/projects/open`);
    }
}

