import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';//No needed
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { debounceTime } from 'rxjs/operators';

// Service
import { PersonaService } from '../../services/persona.service';

// Persona Class
import { Persona } from '../../models/persona';


//Función a la medida para validación de teléfono
function soloTelefono(c: AbstractControl): {[key: string]: boolean} | null{
  //var reg = new RegExp('/^[0-9]{0,10}$/');
  if (c.value != undefined && (isNaN(c.value) || !/^[0-9]{7,10}$/.test(c.value))){
    return { 'noTelefono': true };
  }
  return null;
}

//Función a la medida para validación de fecha de nacimiento
function noFuturas(c: AbstractControl): {[key: string]: boolean} | null{
  
  var rightnow = new Date();
  var cCompare = new Date(c.value)
  if (c.value != undefined && cCompare >= rightnow){
    return { 'noFecha': true };
  }
  return null;
}


@Component({
  selector: 'app-form-info',
  templateUrl: './form-info.component.html',
  styleUrls: ['./form-info.component.css']
})
export class FormInfoComponent implements OnInit {

  
  personaForm: FormGroup;
  persona: Persona = new Persona();
  apellidosMessage: string;

  private apellidosValidationMessages = {
    required: 'Por favor ingrese los apellidos',
    minlength: 'Los apellidos deben ser de mínimo dos caraceres'
  }

  constructor(private personaService: PersonaService, private fb: FormBuilder) { }

  ngOnInit() {

    this.personaForm = this.fb.group({
      tipoProfPac:['', [Validators.required]],
      tipoDocumento: ['', [Validators.required]],
      documento: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      nombres: ['', [Validators.required, Validators.minLength(2)]],
      apellidos: ['', [Validators.required, Validators.minLength(2)]],
      fechaNacimiento: ['', [Validators.required, noFuturas]],
      correo: ['', [ Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
      telefono: ['', [ Validators.required, soloTelefono]],
      sinTelefono: false,
      sintipoRefAcom: false,
      tipoRefAcom: '',
      nombresRefAcom: ['', [Validators.required, Validators.minLength(2)]],
      apellidosRefAcom: ['', [Validators.required, Validators.minLength(2)]],
      sinTelefonoRefAcom: false,
      parentescoRefAcom: ['', [Validators.required]],
      telefonoRefAcom: ['', [ Validators.required, soloTelefono]],
      correoRefAcom: ['', [ Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
    })

    const parentescoRefAcomContro1l = this.personaForm.get('parentescoRefAcom');

    //Cuando cambia el valor asigna la ejecucion de una funcion -  watcher del FormContrl
    //Asigna y remueve validaciones al tiempo que oculta o muestra campos
    this.personaForm.get('sinTelefono').valueChanges
          .subscribe(value => this.setTelefonoRequiredNot());
    
    this.personaForm.get('sinTelefonoRefAcom').valueChanges
          .subscribe(value => this.setTelefonoRefAcomRequiredNot());
    
    this.personaForm.get('sintipoRefAcom').valueChanges
          .subscribe(value => this.setRefAcomRequiredNot());



    //Manejo de validación y mensajes de control teléfono con watcher del formControl
    //para no manejarlos en el HTML
    const apellidosControl = this.personaForm.get('apellidos');
    apellidosControl.valueChanges.pipe(debounceTime(1000)).subscribe(value =>
        this.setMessageApellidos(apellidosControl))   
  }

  //Remover y agregar validators a campos de teléfono
  setTelefonoRequiredNot(): void{
    const telefonoControl = this.personaForm.get('telefono');
    if (this.personaForm.get('sinTelefono').value){
      telefonoControl.clearValidators();

      telefonoControl.setValue('');

    } else{
      telefonoControl.setValidators(Validators.required);
      telefonoControl.setValidators(soloTelefono);
    }
    telefonoControl.updateValueAndValidity();
  }

  //Remover y agregar validators a campos de teléfono de Referencia/Acompañante
  setTelefonoRefAcomRequiredNot(): void{
    const telefonoControl = this.personaForm.get('telefonoRefAcom');
    if (this.personaForm.get('sinTelefonoRefAcom').value){
      telefonoControl.clearValidators();

      telefonoControl.setValue('');

    } else{
      telefonoControl.setValidators(Validators.required);
      telefonoControl.setValidators(soloTelefono);
    }
    telefonoControl.updateValueAndValidity();
  }

  //Remover y agregar validators a campos de Referencia/Acompañante
  setRefAcomRequiredNot(): void{
    const nombresRefAcomControl = this.personaForm.get('nombresRefAcom');
    const apellidosRefAcomControl = this.personaForm.get('apellidosRefAcom');
    const parentescoRefAcomControl = this.personaForm.get('parentescoRefAcom');
    const correoRefAcomControl = this.personaForm.get('correoRefAcom');
    const telefonoRefAcomControl = this.personaForm.get('telefonoRefAcom');

    if (this.personaForm.get('sintipoRefAcom').value){
      nombresRefAcomControl.clearValidators();
      apellidosRefAcomControl.clearValidators();
      parentescoRefAcomControl.clearValidators();
      correoRefAcomControl.clearValidators();
      //this.personaForm.get('sinTelefonoRefAcom').setValue(true);
      telefonoRefAcomControl.clearValidators();

      nombresRefAcomControl.setValue('');
      apellidosRefAcomControl.setValue('');
      parentescoRefAcomControl.setValue('');
      correoRefAcomControl.setValue('');
      telefonoRefAcomControl.setValue('');

    } else{
      nombresRefAcomControl.setValidators(Validators.required);
      nombresRefAcomControl.setValidators(Validators.minLength(2));
      apellidosRefAcomControl.setValidators(Validators.required);
      apellidosRefAcomControl.setValidators(Validators.minLength(2));
      parentescoRefAcomControl.setValidators(Validators.required);
      correoRefAcomControl.setValidators(Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+'));
      //this.personaForm.get('sinTelefonoRefAcom').setValue(false);
      telefonoRefAcomControl.setValidators(Validators.required);
      telefonoRefAcomControl.setValidators(soloTelefono);
      
    }
    nombresRefAcomControl.updateValueAndValidity();
    apellidosRefAcomControl.updateValueAndValidity();
    parentescoRefAcomControl.updateValueAndValidity();
    telefonoRefAcomControl.updateValueAndValidity();
  }


  //Función validadora y de mensajes para FormControl de apellidos
  setMessageApellidos(c: AbstractControl): void{
    this.apellidosMessage = '';
    if ((c.touched || c.dirty) && c.errors){
      this.apellidosMessage = Object.keys(c.errors).map(key =>
            this.apellidosValidationMessages[key]).join(' ');
    }
  }

  //Para llenar todos los campos del Form con setValue y solo alguno con patchValue
  populateTestData(): void {
    this.personaForm.setValue({
      //tipoProfPac: new FormControl(),
      //tipoDocumento: new FormControl(),
      documento: '234234243',
      nombres: 'qertwert',
      apellidos: 'asdfasf',
      //fechaNacimiento: new FormControl(),
      correo: 'asdfs@asdf.com',
      //telefono: new FormControl(),
      sinTelefono: true,
      sintipoRefAcom: false,
      //tipoRefAcom: new FormControl(),
      //nombresRefPac: new FormControl(),
      //apellidosRefPac: new FormControl(),
      //parentescoRefPac: new FormControl(),
      //telefonoRefPac: new FormControl(),
      //correoRefPac: new FormControl()
    })
  }


  save() {
    console.log('Saved: ' + JSON.stringify(this.personaForm.value));
    if (this.personaForm.get('tipoProfPac').value == "Profesional")
      this.personaForm.get('tipoRefAcom').setValue("Referencia");
    else
      this.personaForm.get('tipoRefAcom').setValue("Acompañante");

    this.personaService.insertPerson(this.personaForm.value); 
    if (this.personaForm != null) {
      this.personaForm.reset();
      this.personaService.selectedPersona = new Persona();
    }
  }


}
