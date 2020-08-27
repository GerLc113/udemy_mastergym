import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  show_password: boolean;
  formulario: FormGroup;

  constructor(private fb: FormBuilder, public auth: AngularFireAuth, private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.show_password = false;
    this.formulario = this.fb.group({
      email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.formulario.valid) {
      this.spinner.show();
      this.auth.signInWithEmailAndPassword(this.formulario.value.email, this.formulario.value.password)
        .then((usuario) => {
          this.spinner.hide();
        }).catch((error) => {
          this.spinner.hide();
          this.toastr.error('Correo y/o contraseña incorrectos', 'Error', {
            positionClass: 'toast-bottom-right',
          });
        });
    }
  }

}
