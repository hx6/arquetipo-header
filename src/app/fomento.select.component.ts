import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'lib-fomento-select',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  templateUrl: './fomento.select.component.html',
  styleUrls: ['./fomento.select.component.scss'],
})
export class FomentoSelectComponent {
  @Input() data: {value: string, description: string}[] = [];
  @Input() label = '';
  @Input() disabled = false;
  @Input() default = '- Elija una opción -';
  @Input() formControlName = '';
  @Input() additionalDescription = '';
  @Input() ariaLabel = '';
  @Input() ariaLabelledby = ''; 
  @Input() isRequired = false; 
  @Input() readonly = false; 
  @Input() endpoint = '';
  hideRequiredMarker = false;
  hasError = false; 
  errorMessage = ''; 
  hasSelectedOption = false;	

  selectId = 'fomento-select-' + Math.random().toString(36).substring(2);
  @Output() changeOptionAction = new EventEmitter<unknown>();

  descriptionId = 'fomento-select-description'; 
  @Input() selected = 'option1';

  constructor() {}
  
  selectEvent() {
    if (this.selected !== 'option1') {
      this.additionalDescription = ''; 
    }
    this.changeOptionAction.emit(this.selected);
  }

  handleError(message: string) {
    this.hasError = true;
    this.errorMessage = message;
  }

  onOptionChange(selectedOption: unknown) {
    if (typeof selectedOption === 'string') {
      this.hasSelectedOption = true;
      this.selected = selectedOption;
      this.selectEvent();
    }
  }
}
