import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IDeleteClient} from "../client.interface";

@Component({
  selector: 'app-delete-clients',
  templateUrl: './delete-clients.component.html',
  styleUrls: ['./delete-clients.component.scss']
})
export class DeleteClientsComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteClientsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDeleteClient,
  ) {
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
}
