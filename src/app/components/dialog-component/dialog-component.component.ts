import {Component, Inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog-component.component.html',
  styleUrls: ['./dialog-component.component.css']
})
export class DialogComponentComponent {

  /*
   * Per passare informazioni al componente dialog, si utilizza l'opzione data.
   * Per accedere ai dati nel componente dialog, si utilizza il token di
   * iniezione MAT_DIALOG_DATA (si inietta nel dialog component). Se si utilizza un dialog basato su template,
   *  i dati sono disponibili implicitamente nel template. */
  constructor(
    public dialogRef: MatDialogRef<DialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{title: string, codISBN: number}
  ){}


  onCloseDialog(): void {
    this.dialogRef.close();
  }

}
