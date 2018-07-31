import { Component, OnInit } from '@angular/core';

//Service
import { PersonaService } from '../../services/persona.service';

//Clase Persona
import { Persona } from '../../models/persona';


@Component({
  selector: 'app-list-info',
  templateUrl: './list-info.component.html',
  styleUrls: ['./list-info.component.css']
})
export class ListInfoComponent implements OnInit {

  peopleList: Persona[];

  constructor(private personaService: PersonaService) { }
  
  ngOnInit() {
    this.personaService.getPeopleList()
      .snapshotChanges()
      .subscribe(item => {
        this.peopleList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.peopleList.push(x as Persona);
        })
      })
  }

}
