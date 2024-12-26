import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FomentoNavComponent } from './modules/components/fomento.nav/fomento.nav.component';
import { FomentoInputGroupComponent } from './modules/components/fomento.input-group/fomento.input-group.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    FomentoNavComponent,
    FomentoInputGroupComponent,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
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
