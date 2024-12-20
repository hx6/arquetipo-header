import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SecurityContext,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { FomentoButtonComponent } from '../fomento.button/fomento.button.component';
import { FomentoSelectComponent } from '../fomento.select/fomento.select.component';

@Component({
  selector: 'lib-fomento-user',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatMenuModule,
    MatDividerModule,
    MatFormFieldModule,
    FormsModule,
    FomentoButtonComponent,
    FomentoSelectComponent
  ],
  templateUrl: './fomento.user.component.html',
  styleUrls: ['./fomento.user.component.scss'],
})
export class FomentoUserComponent implements OnChanges, OnInit {

  constructor(
    private sanitizer: DomSanitizer,
    public dialog: MatDialog,
  ) {} // Inyecta DomSanitizer aquí


  /*****************************************************************/
  @ViewChild('template') customTemplate!: TemplateRef<unknown>;
  @Input() width = '30%';
  @Input() height = '35%';


  //Atributos del select
  @Input() listaPrivilegios: any[] = [
    'privilegio',
    'role'
  ];
  @Input() label = 'Cambiar privilegio a:';
  @Input() disabled = false;
  @Input() default = 'Selecciona privilegio';


  //Atributos del button dialog
  @Input() style = 'material';
  @Input() labelButtonCancelar = 'Cancelar';
  @Input() disabledButtonCancelar = false;
  @Input() labelButtonCambiar = 'Cambiar';
  @Input() disabledButtonCambiar = true;
  @Input() themeButton = 'secondary';


  //Atributos del button user
  @Input() styleButtonUser = 'material';
  @Input() labelButtonCerrarSesion = 'Cerrar sesión';
  @Input() disabledButtonCerrarSesion = false;
  @Input() labelButtonCambiarRol = 'Cambiar de rol';
  @Input() disabledButtonCambiarRol = false;
  @Input() themeButtonUser = 'secondary';
  @Input() apiPLDA = false;
  @Input() data: any;
  @Input() usuario = 'Nombre Ejemplo';
  @Input() privilegioUsuario = '';
  @Input() ultimoAcceso = '';
  iniciales_usuario = '';
  errores = false;
  selectedPrivilege = '';


  privilegio = '';


  //Atributo para indicar el tipo de desplegable del botón usuario
  @Input() type = '';
  @Input() labelButtonOff = 'Cerrar sesión';
  /********************************************************************/


  @Output() boton_cambiaRol = new EventEmitter();
  @Output() boton_logOut = new EventEmitter();
  @Output() privilegioGuardado = new EventEmitter<string>();

  ngOnChanges() {
    this.errores = false;
    this.iniciales_usuario = this.generarNombrePerfil();
    // this.actualizarLista();
  }

  ngOnInit(): void {
    // this.actualizarLista();
  }

/*  actualizarLista() {
    this.privilegioUsuario = localStorage.getItem('privilegio_actual');
    console.log(
      'PRIVILEGIO ENCONTRADO',
      this.listaPrivilegios.find((x) => x.codigo === this.privilegioUsuario),
      'USUARIO',
      this.privilegioUsuario,
      'LISTA',
      this.listaPrivilegios,
    );
    this.privilegio = this.listaPrivilegios.find(
      (x) => x.codigo === this.privilegioUsuario,
    ).nombre;
    this.listaParse = this.generarListaPrivilegios();
  } */

  sanitizeContent(content: string): string {
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

  generarNombrePerfil() {
    let res = this.usuario.toLocaleUpperCase();
    try {
      this.sanitizeContent(res);
    } catch (err) {
      this.errores = true;
      console.log(err);
    }

    try {
      if (res.length < 5) {
        throw new Error(
          'El nombre de usuario debe contener al menos 5 carácteres',
        );
      }
    } catch (err) {
      this.errores = true;
      console.log(err);
    }
    let words: string[] = res.split(' ');

    if (words.length > 1) {
      words = words.map((word) => {
        return word[0];
      });
      res = words.join('');
    }
    return res.slice(0, 2);
  }

  listaParse = [];
  generarListaPrivilegios(): string[] {
    const res: string[] = [];
    this.listaPrivilegios.forEach((x) => res.push(x.nombre));
    return res;
  }

  clickBotonCambiaRol(event: Event) {
    this.boton_cambiaRol.emit(event);
    this.dialog.open(this.customTemplate, {
      width: this.width,
      height: this.height,
    });
  }

  clickBotonLogOut(event: Event) {
    this.boton_logOut.emit(event);
  }

  closeDialog() {
    this.dialog.closeAll();
    this.disabledButtonCambiar = true;
  }

  selectPrivilegio(event: unknown) {
    this.privilegioUsuario = event ? String(event) : '';
    if (this.privilegioUsuario) {
      this.disabledButtonCambiar = false;
    }
  }

  openDialog() {
    this.dialog.open(this.customTemplate, {
      width: this.width,
      height: this.height,
    });
  }

  changeRole() {
    if (this.selectedPrivilege) {
      this.privilegioUsuario = this.selectedPrivilege;
      this.boton_cambiaRol.emit(this.selectedPrivilege);
      this.closeDialog();
    }
  }

  guardarPrivilegioEnLocalStorage() {
    if (this.privilegioUsuario) {
      let aux = this.listaPrivilegios.find(
        (x) => x.nombre === this.privilegioUsuario,
      ).codigo;
      localStorage.setItem('privilegio_actual', aux);
      console.log(
        'Privilegio seleccionado guardado en localStorage:',
        localStorage,
      );
      this.privilegioGuardado.emit(this.privilegioUsuario);
      this.privilegio = this.privilegioUsuario;
      this.privilegioUsuario = aux;
      this.dialog.closeAll();
    } else {
      console.error('No hay ningún privilegio seleccionado.');
    }
  }
}
