import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  show = false;
  isAlertOpen = false;
  noValido='';
  validate = false;

  ingres = new FormGroup({
    user: new FormControl({ value: '', disabled: false }, Validators.required),
    pass: new FormControl({ value: '', disabled: false }, Validators.required),
  });

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(form: FormGroup) {
    if(form.valid){
      this.authService.login(form.value.user, form.value.pass).subscribe(
        {
          next: (resp)=> {
            if(resp.token){
              this.router.navigate(['csv/read-csv']);
              localStorage.setItem('us', resp.token);
            }
          },
          error: (e)=>{
            console.error(e);
            this.noValido = '';
            this.setOpen(false);
          }
        }
      )
    } else {
      this.validate = true;
      this.ingres.setValidators;
    }

  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
    this.ingres.reset();
    this.noValido = 'Usuario o Clave erróneos.'
    setTimeout(()=>{
      this.noValido='';
    },4000)
  }

}

