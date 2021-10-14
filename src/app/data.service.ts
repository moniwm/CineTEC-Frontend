import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()

export class DataService{

    constructor(private http:HttpClient){}

    // Get requests

    getClients():Observable<any>{
        return this.http.get<any>("api/client")
    }

    getClientById(id:string):Observable<any>{
        return this.http.get<any>("api/client/"+id)
    }

    getActors():Observable<any>{
        return this.http.get<any>("api/actor")
    }

    getCinemas():Observable<any>{
        return this.http.get<any>("api/cinema")
    }

    getCinemaByNumber(number: string):Observable<any>{
        return this.http.get<any>("api/cinema/"+number)
    }

    getMovies():Observable<any>{
        return this.http.get<any>("api/movie")
    }

    getMovieByName(name: string):Observable<any>{
        return this.http.get<any>("api/movie/"+name)
    }

    getMovieByTheater(theater: string):Observable<any>{
        return this.http.get<any>("api/movie/"+ theater)
    }

    getTheaters():Observable<any>{
        return this.http.get<any>("api/MovieTheater")
    }

    getTheaterByName(name: string):Observable<any>{
        return this.http.get<any>("api/movie/"+ name)
    }

    getScreenings():Observable<any>{
        return this.http.get<any>("api/screening")
    }

    getScreeningById(id:string):Observable<any>{
        return this.http.get<any>("api/screening/" + id)
    }

    getScreeningByTheaterMovie(theater:string, movie:string):Observable<any>{
        return this.http.get<any>("api/screening/" + theater+ "/" + movie)
    }

    getSeatByNumber(number:string):Observable<any>{
        return this.http.get<any>("api/screening/" + number)
    }

    // Post requests

    postClient(clientData : any):Observable<any>{
        return this.http.post<any>("api/client", clientData)
    }

}

