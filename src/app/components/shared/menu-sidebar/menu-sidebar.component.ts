import { Component, OnInit } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {

  faXmark = faXmark;
  open: boolean = true;

  adminMenu = [
    {
      icon: "icon-dashboard",
      name: "Dashboard",
      url: "dashboard"
    },
/*     {
      icon: "icon-bell-bold",
      name: "Notificaciones",
      url: "notifications"
    }, 
    {
      icon: "icon-prestador-de-salud",
      name: "Agenda",
      url: "health-provider1"
    },*/
    {
      icon: "icon-users",
      name: "Pacientes",
      url: "people"
    },
/*     {
      icon: "icon-doc",
      name: "Facturación",
      url: "billing"
    },
    {
      icon: "icon-doc",
      name: "Doctores",
      url: "superintendencia1"
    }, */
    {
      icon: "icon-settings",
      name: "Configuración",
      url: "setting"
    },/*
    {
      icon: "icon-circle-x",
      name: "Cerrar Sesión",
      url: "logout"
    },*/
  ];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  toggleMenu(state: boolean) {
    this.open = state;
  }

  logOut() {
    //this.router.navigate(['/']);
    this.api.confirmModal('¿Deseas salir de Medcontrol?').then((data:any) => {
      if (data.isConfirmed) {
        this.api.logout();
      }
    });
  }

}
