import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import { User } from './model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormsModule,} from '@angular/forms'
import { UserService } from '../app/user.service';
import { EdituserdialogComponent } from '../edituserdialog/edituserdialog.component';
@Component({
  selector: 'app-data',
  imports: [ RouterModule, CommonModule, FormsModule,],
  templateUrl: './data.component.html',
  styleUrl: './data.component.css'
})
export class DataComponent  implements OnInit{

users:User[] = [];
newuser = {name:"", email:"", }
userFilter: User[] = [];
constructor(private userService: UserService, public dialog:MatDialog){}

ngOnInit(): void {
  this.fetchData();
}

fetchData(): void{
  this.userService.getUsers().subscribe((data)=>{
    this.users = data;
    this.userFilter = this.users;
  })
}

onUserAdd(): void{
  this.userService.addUser(this.newuser).subscribe((response)=>{
    alert("student uspesno dodat");
    this.newuser={name:"",email:""}
  })
}
deleteUser(id: number): void {
  const confirmDelete = confirm("Da li ste sigurni da želite da obrišete korisnika?");
  if (!confirmDelete) return;

  this.userService.deleteUser(id).subscribe(() => {
    alert("Korisnik uspešno obrisan");
    this.users = this.users.filter((user) => user.id !== id);
    this.userFilter = this.users; // update the filtered list if needed
  });
}

filter(event:any){
  if(!event.target.value)
    return;
  this.users.filter = event.target.value.trim().toLowerCase();
}

searchTerm: string = '';
filteredData = [this.users];

filterData(){
  this.userFilter = this.users.filter((item)=>
    Object.values(item).some((value)=>
      value.toString().toLowerCase().includes(this.searchTerm.toLowerCase()))
  )
}

editUser(user:any):void{
  const dialogRef = this.dialog.open(EdituserdialogComponent,{
     width:'auto',
     data:{user}
  });
  dialogRef.afterClosed().subscribe((user: User)=>{
    if(user){
      this.userService.updateUser(user).subscribe((updatedUser)=>{
        alert("Koristnik uspesno izmenjen");
        const index=this.users.findIndex((s)=>s.id === updatedUser.id)
        this.users[index] = updatedUser;
      })
    }
  })
}
}
