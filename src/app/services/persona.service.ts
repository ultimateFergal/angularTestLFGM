import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Persona } from '../models/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService { 

  personList: AngularFireList<any>;
  selectedPersona: Persona = new Persona();

  constructor( private firebase: AngularFireDatabase) { }

  getPeopleList(){
    return this.personList = this.firebase.list('people');
  }

  insertPerson(persona: Persona){
    if(!this.personList){
      this.personList = this.getPeopleList();
    }
    this.personList.push({
      tipoProfPac: persona.tipoProfPac,
      tipoDocumento: persona.tipoDocumento,
      documento: persona.documento,
      nombres: persona.nombres,
      apellidos: persona.apellidos,
      fechaNacimiento: persona.fechaNacimiento,
      correo: persona.correo,
      telefono: persona.telefono,
      tipoRefAcom: persona.tipoRefAcom,
      nombresRefPac: persona.nombresRefAcom,
      apellidosRefPac: persona.apellidosRefAcom,
      parentescoRefPac: persona.parentescoRefAcom,
      telefonoRefPac: persona.telefonoRefAcom,
      correoRefPac: persona.correoRefAcom
    });
  }

  updatePerson(persona: Persona){
    this.personList.update(persona.$key, {
      tipoProfPac: persona.tipoProfPac,
      tipoDocumento: persona.tipoDocumento,
      documento: persona.documento,
      nombres: persona.nombres,
      apellidos: persona.apellidos,
      fechaNacimiento: persona.fechaNacimiento,
      correo: persona.correo,
      telefono: persona.telefono,
      tipoRefAcom: persona.tipoRefAcom,
      nombresRefPac: persona.nombresRefAcom,
      apellidosRefPac: persona.apellidosRefAcom,
      parentescoRefPac: persona.parentescoRefAcom,
      telefonoRefPac: persona.telefonoRefAcom,
      correoRefPac: persona.correoRefAcom
    });
  }

  deletePersona($key: string){
    this.personList.remove($key);
  }
}
