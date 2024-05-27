import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-donate-dialog',
  templateUrl: './donate-dialog.component.html',
  styleUrls: ['./donate-dialog.component.scss']
})
export class DonateDialogComponent {
  amount: number;
  title: string;
  buttonText: string;
  balance: string;

  constructor(
    public dialogRef: MatDialogRef<DonateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
        this.title = data.title;
        this.buttonText = data.buttonText;
        this.balance = data.balance;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
