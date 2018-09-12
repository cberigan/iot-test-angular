import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface State {
  on: boolean;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'iot-test-app';
  greenState = false;
  reqInFlight = false;
  
  constructor(private http: HttpClient) {

  }
  ngOnInit() {
    this.http.get<State>('/api/state').subscribe((state: any) => this.greenState = state.on);
  }

  get greenClass() {
    return this.greenState ? 'btn-success' : 'btn-success-outline'; 
  }

  toggleGreen() {
    this.reqInFlight = true;
    this.http.post<State>('/api/state', {}).subscribe((state: any) => {
      this.greenState = state.on;
      this.reqInFlight = false;
    });
  }
}
