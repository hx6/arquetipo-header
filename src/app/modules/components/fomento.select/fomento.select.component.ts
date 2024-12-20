import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

interface MenuData {
	secciones: Array<{
	  name: string;
	  url: string;
	  id: string;
	  icon: string;
	  familyIcon: string;
	  subSecciones: Array<{url: string; titulo: string}>;
	}>;
	perfil?: Array<{
	  url: string;
	  funcion?: string;
	  ultimoAcceso?: string;
	  iconChangeRol?: string;
	  labelBotonCambiaRol?: string;
	  iconLogOut?: string;
	  labelBotonlogOut?: string;
	}>;
  }
@Component({
  selector: 'lib-fomento-select',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './fomento.select.component.html',
  styleUrls: ['./fomento.select.component.scss'],
})
export class FomentoSelectComponent {
  @Input() data: { value: string; description: string; }[] | undefined;
  @Input() label = '';
  @Input() disabled: boolean= false;
  @Input() default = '- Elija una opción -';
  @Input() formControlName = "";
  @Input() additionalDescription =''; // Texto que aparecerá debajo del select mientras que no se seleccione ninguuna opción.
  @Input() ariaLabel = '';
  @Input() ariaLabelledby = ''; 
  @Input() isRequired = false; 
  @Input() readonly = false; 
  @Input() endpoint: string | undefined;
  hideRequiredMarker = false;
  hasError = false; 
  errorMessage = ''; 
  hasSelectedOption = false;	

  selectId = 'fomento-select-' + Math.random().toString(36).substring(2);
  @Output() changeOptionAction = new EventEmitter<unknown>();

  descriptionId = 'fomento-select-description'; 
  @Input() selected = 'option1';

  constructor(){}
	  
  selectEvent() {
    if (this.selected !== 'option1') {
      this.additionalDescription = ''; 
    }
    this.changeOptionAction.emit(this.selected);
  }

  // Manejador de errores
  handleError(message: string) {
    this.hasError = true;
    this.errorMessage = message;
  }

  // Manejador de cambio de opción
  onOptionChange(selectedOption: unknown) {  // Cambiar el tipo a unknown
    if (typeof selectedOption === 'string') {
      //TODO el valor del selector puede cambiar, por lo que, de mantener esta función, habría que revisar otras posibilidades que no fueran comprobar un valor estático.
      if (selectedOption !== 'option1') {
        this.hasSelectedOption = true;
        this.additionalDescription = ''; 
      } else {
        this.hasSelectedOption = false;
        this.additionalDescription = 'Seleccione una opción para continuar'; 
      }
      console.log('Opción seleccionada:', selectedOption);
    } else {
      console.error('El valor seleccionado no es un string:', selectedOption);
    }
  }
}
