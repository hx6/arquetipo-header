import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FomentoUserComponent } from '../fomento.user/fomento.user.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'lib-fomento-menu',
	standalone: true,
	imports: [CommonModule, FomentoUserComponent, MatMenuModule, MatButtonModule],
	templateUrl: './fomento.menu.component.html',
	styleUrls: ['./fomento.menu.component.scss'],
})
export class FomentoMenuComponent implements OnChanges {
	@Input() DATA: any;
	@Input() nombre_usuario = '';
	@Input() mostrarmenu_usuario = true;
	@Input() listaPrivilegios: any[] = [];
	@Input() ultimoAcceso = '';
	@Input() type = '';
	errores = false;

	ngOnChanges() {
		this.inputValidation();
	}

	changeFocus(name: string) {
		const el = document.getElementById('header-' + name) as HTMLInputElement;
		el.focus();
	}

	inputValidation() {
		if (typeof this.DATA === 'string') {
			try {
				this.DATA = JSON.parse(this.DATA);
			} catch (err) {
				this.errores = true;
				console.log('Error => JSON no valido');
			}
		}
	}
}
