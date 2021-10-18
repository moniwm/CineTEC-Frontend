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
        return this.http.get<any>("api/movie/filter_movie/"+ theater)
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
        return this.http.get<any>("api/screening/filter_screening/" + theater+ "/" + movie)
    }

    getSeatByScreeningNumber(number:string):Observable<any>{
        return this.http.get<any>("api/seat/" + number)
    }

    getSpecificSeat(number:string, row:string, column:string):Observable<any>{
        return this.http.get<any>("api/seat/"+number+"/"+row+"/"+column);
    }

    // Post requests

    postClient(clientData : any):Observable<any>{
        return this.http.post<any>("api/client", clientData)
    }

    postCinema(cinemaData : any):Observable<any>{
        return this.http.post<any>("api/cinema", cinemaData)
    }

    postMovie(movieData : any):Observable<any>{
        return this.http.post<any>("api/movie", movieData)
    }

    postActor(actorData : any):Observable<any>{
        return this.http.post<any>("api/actor", actorData)
    }

    postScreening(screeningData : any):Observable<any>{
        return this.http.post<any>("api/screening", screeningData)
    }

    postTheater(theaterData : any):Observable<any>{
        return this.http.post<any>("api/MovieTheater", theaterData)
    }

    postInvoice(invoiceData : any):Observable<any>{
        return this.http.post<any>("api/Purchase", invoiceData)
    }

    // Delete requests

    deleteClient(clientId : any):Observable<any>{
        return this.http.delete<any>("api/client/"+ clientId)
    }

    deleteCinema(cinemaNumber : any):Observable<any>{
        return this.http.delete<any>("api/cinema/"+ cinemaNumber)
    }

    deleteMovie(movieName: any):Observable<any>{
        return this.http.delete<any>("api/movie/"+ movieName)
    }

    deleteTheater(theaterName : any):Observable<any>{
        return this.http.delete<any>("api/MovieTheater/"+ theaterName)
    }

    deleteScreening(screeningId : any):Observable<any>{
        return this.http.delete<any>("api/screening/"+ screeningId)
    }



}

