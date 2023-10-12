import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  ingreso = new FormGroup({
    usuario: new FormControl(''),
    clave: new FormControl(''),
  });

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(form: FormGroup) {
    this.authService.login(form.value.usuario, form.value.clave).subscribe(
      {
        next: (resp)=> {
          localStorage.setItem('us', resp.token);
          this.router.navigate(['csv/read-csv']);
        },
        error: (e)=>{
          console.error(e);
          this.setOpen(false);
        }
      }
    )

  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
    this.ingreso.reset();
    this.noValido = 'Usuario o Clave erróneos.'
  }

}

