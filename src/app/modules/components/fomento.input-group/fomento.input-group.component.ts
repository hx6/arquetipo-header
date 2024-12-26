import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
	selector: 'lib-fomento-input-group',
	templateUrl: './fomento.input-group.component.html',
	styleUrls: ['./fomento.input-group.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class FomentoInputGroupComponent {
	@Input() typeStyle = 'material';

	@Input() width_input = '100%';
	@Input() input_msgError = '';
	@Input() placeholder = 'Placeholder';
	@Input() type = 'text';
	@Input() value = '';
	@Input() id = 'sample';
	@Input() name = 'name';
	@Input() button_label = '';
	@Input() button_icon = 'search';
	@Input() button_icon_theme = 'info';
	@Input() button_href = '#';
	@Input() button_target = '_self';
	@Input() disabled = false;
}
