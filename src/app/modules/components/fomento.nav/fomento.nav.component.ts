import { Component, OnChanges, Input, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FomentoCabeceraComponent } from '../fomento.header/fomento.header.component';
import { FomentoMenuComponent } from '../fomento.menu/fomento.menu.component';
import { FomentoBrandComponent } from '../fomento.brand/fomento.brand.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'lib-fomento-nav',
  standalone: true,
  imports: [
    CommonModule, 
    FomentoCabeceraComponent, 
    FomentoMenuComponent, 
    FomentoBrandComponent,
    MatToolbarModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './fomento.nav.component.html',
  styleUrls: ['./fomento.nav.component.scss']
})
export class FomentoNavComponent implements OnChanges, OnInit {
  isMobileLayout = false;
  @Input() typeStyle = 'material';
  @Input() mostrar_menu = true;
  @Input() mostrarmenu_usuario = true;
  @Input() mostrarfecha = true;
  @Input() mostrarhora = true;
  @Input() mostrarAyuda = true;
  @Input() urlAyuda = '';
  @Input() brandStyle = 'material';
  @Input() brandName = '';
  @Input() brandCaption = '';
  @Input() brandSrc = '';
  @Input() data_mat: any = {
    secciones: [{
      name: "La Junta",
      url: "",
      id: "iconos_Junta",
      icon: "jda",
      familyIcon: "fac",
      subSecciones: [{url:"", titulo: "La Junta"}]
    }]
  };
  @Input() nombre_usuario = '';
  @Input() listaPrivilegios: any[] = [];
  @Input() ultimoAcceso = '';
  @Input() type = '';
  @Input() version = '';

  constructor() {
    this.isMobileLayout = window.innerWidth < 768;
    window.addEventListener('resize', () => {
      this.isMobileLayout = window.innerWidth < 768;
    });
  }

  ngOnInit() {
    console.log('Nav Component Initialized');
    console.log('Brand Style:', this.brandStyle);
    console.log('Brand Name:', this.brandName);
  }

  ngOnChanges() {
    console.log('Nav Component Properties Changed');
    console.log('Brand Style:', this.brandStyle);
    console.log('Brand Name:', this.brandName);
  }

  mostrarDesplegable(event: Event) {
    console.log('Toggle menu clicked', event);
    const target = event.target as HTMLElement;
    const menuElement = target.closest('mat-toolbar')?.querySelector('lib-fomento-menu');
    const bgElement = document.querySelector('.barraH') as HTMLElement;

    if (menuElement && bgElement) {
      const menuClassList = menuElement.classList;
      if (menuClassList.contains('responsive')) {
        menuClassList.remove('responsive');
        bgElement.style.display = 'none';
      } else {
        menuClassList.add('responsive');
        bgElement.style.display = 'block';
        if (this.data_mat?.secciones) {
          bgElement.style.height = this.data_mat.secciones.length * 40 + 25 + 'px';
        }
      }
    }
  }
}
