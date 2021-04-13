import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Router } from '@angular/router';
import { Items } from 'src/shared/items.model'


@Injectable({
    providedIn: 'root'
  })
export class ItemsService{
    
    constructor(private http: HttpClient, private router: Router){
    }

    options = {
        headers: new HttpHeaders().append('Content-type', 'application/json')
    }

    public createItem(item: Items): Observable<any> {
        return this.http.post('/api/items/create', JSON.stringify(item), this.options)
    }
}