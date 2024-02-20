import {Component, OnDestroy, OnInit} from '@angular/core';
import {ClientDataService} from "./client-data.service";
import {catchError, finalize, Observable, ReplaySubject, takeUntil, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {IClientsData} from "./client.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {
  title = 'initium';

  public clients?: IClientsData;
  private _onDestroy$: ReplaySubject<void>;

  constructor(private _clientDataService: ClientDataService) {
    this._onDestroy$ = new ReplaySubject<void>(1);
  }

  ngOnInit(): void {
    this.getClients();
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  public getClients(): void {
    this._clientDataService.getClients().pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error)),
      takeUntil(this._onDestroy$)
    ).subscribe((response: IClientsData) => {
      this.clients = response;
    })
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => error);
  }
}
