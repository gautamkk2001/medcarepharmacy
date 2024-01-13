import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { cpasswordvalid } from '../cpasswordvalid';
import { UserService } from '../user.service';
import { ProductdataService } from '../productdata.service';
import { environment } from 'src/environments/environment';
import { NGXLogger } from 'ngx-logger';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DeactivateComponent } from '../deactive.guard';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, DeactivateComponent {

  environment = environment;
  constructor(
    private logger : NGXLogger, private fb:FormBuilder,private user:UserService,private route:Router,private data:ProductdataService,  private http : HttpClient
  ) { }
  formRegister=this.fb.group({
    fullname1:[,Validators.required],
    email1:[,Validators.required],
    mobile1:[,Validators.required],
    date:[,Validators.required],
    password1:[,Validators.required],
    cpassword1:[,Validators.required],
    gender:[,Validators.required],
  },
  {validator : cpasswordvalid
         ('password1','cpassword1')
   }
  );


  submitForm(){

    var  username=this.formRegister.value.fullname1;
    var  email=this.formRegister.value.email1;
    var mobile=this.formRegister.value.mobile1;
    var date=this.formRegister.value.date;
    var password1=this.formRegister.value.password1;
    var  cpassword1=this.formRegister.value.cpassword1;
    var gender=this.formRegister.value.gender;

    var userRegistrationForm = new FormData();

    userRegistrationForm.append("username",username);
    userRegistrationForm.append("email",email);
    userRegistrationForm.append("gender",gender);
    userRegistrationForm.append("mobile",mobile)
    userRegistrationForm.append("date",date);
    userRegistrationForm.append("password1",password1);
    userRegistrationForm.append("cpassword1",cpassword1);

    if(!this.formRegister.valid){
       alert("Enter all fields")
     }

    else if((this.formRegister.valid)){

      this.http.get<any>(environment.mongodbGetUser).subscribe(data=>{
        const users=data.find((b:any)=>{
            return b.email===this.formRegister.value.email1
          });

        if(users){
         alert("Already Registered");
        }
        else{
          this.http.post<any>("https://mean-backend-ib24.onrender.com/api/application/addUsers",userRegistrationForm).subscribe(data=>{
            alert(data);
           })
      this.route.navigate(['/main']);
     }
    });
   }
}

show: boolean = false;

visiblePassword() {
  this.show = !this.show;
}

  ngOnInit() {
  }
  canExit(){
    if(this.formRegister.invalid)
      {
      return confirm("Your content was not saved");
    }
    else{
      return true;
    }
  }

}
