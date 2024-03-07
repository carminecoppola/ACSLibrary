import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog-component.component.html',
  styleUrls: ['./dialog-component.component.css']
})
export class DialogComponentComponent {

  /*
   * To pass information to the dialog component, the data option is used.
   * To access the data in the dialog component, the MAT_DIALOG_DATA injection token is used
   * (it is injected into the dialog component). If using a template-based dialog,
   * the data is implicitly available in the template.
   */
  constructor(
    public dialogRef: MatDialogRef<DialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, codISBN: number }
  ) { }

  /**
   * Closes the dialog when the close button is clicked.
   */
  onCloseDialog(): void {
    this.dialogRef.close();
  }
}
