import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'

export interface Area {
  action: string,
  reaction: string
}

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  areas: Area[] = []

  constructor(private UserService: UserService) {
  }

  async ngOnInit(): Promise<void> {
    var payload = {
      UserName: this.UserService.getUser(),
    }

    var tmp = await fetch('http://localhost:8080/db/get/area', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(response => response.json())
      .then(data => {
        this.areas = JSON.parse(data[0].AREA)
        console.log(this.areas)
      })
  }

}
