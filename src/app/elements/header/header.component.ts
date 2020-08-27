import { Component, OnInit, HostListener } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase/app';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  usuario: User;
  tamano_pantalla: number;

  constructor(public auth: AngularFireAuth) {
    this.auth.user.subscribe((usuario) => {
      this.usuario = usuario;
    });
  }

  ngOnInit(): void {
    this.tamano_pantalla = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.tamano_pantalla = window.innerWidth;
  }

  logout() {
    this.auth.signOut();
  }

  expande() {
    if (this.tamano_pantalla < 768) {
      var btn = document.getElementById("btn-expand").click();
    }
  }

}