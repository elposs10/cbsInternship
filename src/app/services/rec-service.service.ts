import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

const apiKey = '8c6107d174aec2a5f6a83ac75ccefaeebd474781b0b09cb71161ba4a';
const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type': 'application/json',
    'X-My-custom-header': `${apiKey}`,
    'Access-Control-Allow-Origin': '*',
    "Access-Control-Allow-Methods": "GET"
  })
}
@Injectable({
  providedIn: 'root'
})
export class RecServiceService {

  private baseUrl = 'https://opendata.elia.be/api/records/1.0/search/?dataset=ods047&q=datetime%3A%5B2022-01-16T23%3A00%3A00Z+TO+2022-01-19T22%3A59Z%5D';
  private proxyUrl = 'https://cors-anywhere.herokuapp.com/';

  constructor(private http: HttpClient) { }

  async getData() {
    const url = `${this.proxyUrl}${this.baseUrl}`
    var data = this.http.get(url);
    return await lastValueFrom(data);
  }

  /*fetchData() {
    const url = `${this.proxyUrl}${this.baseUrl}`
    fetch (url)
    .then(response => {
      if (!response.ok) {
          throw Error("ERROR");
      }
      return response.json();
  })
  .then(data => {
    const list = data.records
    .map((record: { fields: { datetime: any; systemimbalance: any; }; }) => {
      return `
            <div class="record">
                <p>${record.fields.datetime}</p>
                <p>${record.fields.systemimbalance}</p>
            </div>`;
      
    })
    .join();
    console.log(list)
  })
  }*/
}
