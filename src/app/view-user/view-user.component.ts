import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user-service.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
	id: number;
  private sub:any = [];
  public userTodos:any = [];
  title: string = '';
  checkboxStatus:boolean;


   constructor(private user:UserService, private route: ActivatedRoute) {  
	  this.user = user;
  }
  
  ngOnInit(){
	  
	this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number
    });
	  this.user.getTodos(this.id).subscribe(data => {
		  this.userTodos = data
	    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  deleteUserTodo(id:number){
	  console.log(id);
	  this.user.deleteUserTodos(id).subscribe(data => {
		  window.location.reload()
		  alert("User todo Deleted successfully");
		});
  }
  updateUserTodo(id:number, completedStatus:boolean){
	  	this.user.updateUserTodos(id, completedStatus).subscribe(data => {
		  alert("User details updated successfully");
		  window.location.reload();
		});
  }
  createUserTodo(title:string, id:number){
	  this.user.createUserTodos(title,id).subscribe(data => {
		  
		  alert("New User todo Created successfully");
		  window.location.reload();
		});
  }

}
