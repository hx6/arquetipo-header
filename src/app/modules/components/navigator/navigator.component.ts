import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FomentoNavComponent } from '../fomento.nav/fomento.nav.component';

@Component({
  selector: 'app-navigator',
  standalone: true,
  imports: [CommonModule, FomentoNavComponent],
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent {
  ngOnInit(): void {
  console.log('NavigatorComponent');
  }
}
