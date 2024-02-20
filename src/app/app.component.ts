import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ClientDataService} from "./client-data.service";
import {catchError, finalize, Observable, ReplaySubject, takeUntil, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {IClientsData} from "./client.interface";
import {MatDialog} from "@angular/material/dialog";
import {AddNewClientComponent} from "./add-new-client/add-new-client.component";
import {DeleteClientsComponent} from "./delete-clients/delete-clients.component";
import {ChangeClientComponent} from "./change-client/change-client.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {
  title = 'initium';

  public name: string = '';
  public surname: string = '';
  public email: string = '';
  public phone: string = '';
  public checked: boolean = false;

  public clients!: IClientsData;
  public parentChecked = false;
  public parentIndeterminate = false;
  private _onDestroy$: ReplaySubject<void>;

  constructor(
    private _clientDataService: ClientDataService,
    private _dialogRef: MatDialog
  ) {
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
      this.clients.users.forEach(user => {
        user.checked = false;
      });
      console.log(this.clients)
    })
  }

  public openDialogAddNewClient() {
    const dialogRef = this._dialogRef.open(AddNewClientComponent, {
      data: {name: this.name, surname: this.surname, email: this.email, phone: this.phone, checked: this.checked},
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clients.users.push(result);
        console.log(result)
      }
      console.log('The dialog was closed');

    });
  }

  public openDialogDeleteClients() {
    const checkedClientsCount = this.clients.users.reduce((count, client) => client.checked ? count + 1 : count, 0);

    const dialogRef = this._dialogRef.open(DeleteClientsComponent, {
      data: {checkedClientsCount: checkedClientsCount},
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clients.users = this.clients.users.filter(client => !client.checked);
        this.parentIndeterminate = false;
        this.parentChecked = false;
      }
    });
  }

  public openDialogChangeClient(selectedUser: number) {
    const dialogRef = this._dialogRef.open(ChangeClientComponent, {
      data: {name: this.name, surname: this.surname, email: this.email, phone: this.phone, checked: this.checked},
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clients.users[selectedUser] = result;
      }
      console.log('The dialog was closed');

    });
  }

  toggleChecked() {
    this.parentChecked = !this.parentChecked;
    for (const user of this.clients.users) {
      user.checked = this.parentChecked;
    }
    this.parentIndeterminate = false;
  }

  updateCheckboxes(index: number) {
    this.toggleUserChecked(index);
    this.updateIndeterminate();
  }

  toggleUserChecked(index: number) {
    this.clients.users[index].checked = !this.clients.users[index].checked;
  }

  updateIndeterminate() {
    let checked: number = 0;
    let unchecked: number = 0;
    const length = this.clients.users.length;
    this.clients.users.forEach((user) => {
      user.checked ? checked++ : unchecked++;
    });
    this.parentIndeterminate = (checked !== length && unchecked !== length);
    this.parentChecked = this.parentIndeterminate || length === checked;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => error);
  }
}
