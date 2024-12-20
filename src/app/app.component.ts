import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FomentoNavComponent } from './modules/components/fomento.nav/fomento.nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FomentoNavComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'arquetipo-header';
  menuData = {
    secciones: [
      {
        name: "La Junta",
        url: "",
        id: "iconos_Junta",
        icon: "jda",
        familyIcon: "fac",
        subSecciones: [{url:"", titulo: "La Junta"}]
      },
      {
        name: "Servicios",
        url: "#",
        id: "iconos_Servicios",
        icon: "laptop",
        familyIcon: "fas",
        subSecciones: []
      },
      {
        name: "Noticias",
        url: "#",
        id: "iconos_Noticias",
        icon: "newspaper",
        familyIcon: "fas",
        subSecciones: []
      }
    ]
  };
}
