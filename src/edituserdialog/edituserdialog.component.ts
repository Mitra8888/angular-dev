import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { User } from '../data/model';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-edituserdialog',
  imports: [MatFormField, MatLabel, MatInput,FormsModule,MatButtonModule ],
  templateUrl: './edituserdialog.component.html',
  styleUrl: './edituserdialog.component.css'
})
export class EdituserdialogComponent {
user:any
constructor(
  public dialogRef: MatDialogRef<EdituserdialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data:any
){
  this.user = {...data.user};
}
save():void{
  this.dialogRef.close(this.user);
}
cancel(): void{
  this.dialogRef.close(null)
}
}
