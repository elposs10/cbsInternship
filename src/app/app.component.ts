import { Component } from '@angular/core';
import { Record } from './models/record';
import { RecServiceService } from './services/rec-service.service';
import { Chart, registerables } from 'chart.js';
import {FormControl} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cbsInternship';
  
  date = new FormControl(new Date());
  result: any;
  records!: Record;
  fields: any;
  sysImbalance: any
  datetime!: any;
  recDates: any = [];
  chart: any = [];
  startDate!: string;
  endDate!: string;

  constructor(private rec: RecServiceService, private http: HttpClient) { 
    Chart.register(...registerables)
  }

  async getValue(val:string, val2:string) {
    this.startDate = val
    this.endDate = val2
    console.warn(this.startDate, this.endDate)
    const urlx = 'https://cors-anywhere.herokuapp.com/https://opendata.elia.be/api/records/1.0/search/?dataset=ods047&q=datetime'+this.startDate+'+TO+'+this.endDate
    var data = this.http.get(urlx);
    return await lastValueFrom(data);
  }

  ngOnInit() {
    this.rec.getData().then((data) => {
      this.result = data
      this.records = this.result.records.map((record: any) => {
        return record.fields
      })

      this.sysImbalance = this.result.records.map((record: any) => {
        return record.fields.systemimbalance
      })

      this.datetime = this.result.records.map((record: any) => {
        return record.fields.datetime
      })
      console.log(this.datetime, this.sysImbalance); 

      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.datetime,
          datasets: [
            {
            data: this.sysImbalance,
            label: 'System Imbalance',
            borderColor: '#3cba9f',
            borderWidth: 2,
            fill: false,
            backgroundColor: 'rgba(93, 175, 89, 0.1)',
            tension: 0.2,
            },
          ],
        },
        options: {
          maintainAspectRatio: true,
          scales: {
            y: {
              type: 'linear',
              min: -250,
              max: 250
            }
          }
        }
      });

      /*this.fields = this.records.fields
      .map((record: { fields: { datetime: any; systemimbalance: any; }; }) => {
        record.fields
      })*/
      //console.log(this.sysImbalance);
      /*const list = this.result.records
    .map((record: { fields: { datetime: any; systemimbalance: any; }; }) => {
      return `
            <div class="record">
                <p>${record.fields.datetime}</p>
                <p>${record.fields.systemimbalance}</p>
            </div>`;
      
    })
    .join();
    console.log(list)*/
    })

  }
}
