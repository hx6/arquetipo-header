import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	Output,
	SecurityContext,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
	selector: 'lib-fomento-button',
	standalone: true,
	imports: [
		CommonModule,
		MatButtonModule,
		MatRippleModule,
		MatBadgeModule
	],
	templateUrl: './fomento.button.component.html',
	styleUrls: ['./fomento.button.component.scss'],
})
export class FomentoButtonComponent implements OnChanges {
	constructor(private sanitizer: DomSanitizer) {
		this.validIcon = false;
	}

	@Input() type: 'button'|'submit'|'reset' = 'button'

	//Atributos matter-button
	@Input() label = '';
	@Input() theme = 'primary';
	@Input() icon = '';
	@Input() href = '';
	@Input() target = '';
	@Input() disabled = false;
	@Input() aria_label = '';
	@Input() disableRipple = true;
	@Input() badge = '';

	@Output() onclickevent = new EventEmitter<unknown>();	

	validIcon = false;

	clickbutton(event: Event) {
		if (this.href) {
		  if (this.target === '_blank') {
			window.open(this.href, '_blank'); // Abre en nueva pestaña si target es _blank
		  } else {
			window.location.href = this.href; // Redirige a la URL especificada en href
		  }
		}
		this.onclickevent.emit(event);
	  }

	ngOnChanges() {
		this.inputValidation();
	}

	inputValidation() {
		if (this.label === '' && this.icon === '') {
			// Lanza un error solo si ambos, label e icon, están vacíos.
			throw new Error(
				"Los campos 'label' e 'icono' no pueden ser ambos a la vez vacíos",
			);
		}

		// Solo sanitiza y asigna un nuevo valor a label si no está vacío.
		if (this.label !== '') {
			try {
				this.sanitizeContent(this.label);
			} catch (error: unknown) {
				this.label = 'Error';
				this.icon = 'times-circle';
				if (error instanceof Error) {
					console.error(error.message);
				} else {
					console.error('An unknown error occurred');
				}
			}
		}
	}

	private sanitizeContent(content: string): string {
		// Usa DomSanitizer para sanitizar el contenido
		const sanitizedContent = this.sanitizer.sanitize(
			SecurityContext.HTML,
			content,
		);
		if (!sanitizedContent) {
			throw new Error("Intento de ataque vía 'HTML injection'");
		}
		return sanitizedContent;
	}
}
