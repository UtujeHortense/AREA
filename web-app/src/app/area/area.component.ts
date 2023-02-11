import { Component, OnInit, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Logo, action, LOGOS_ACTION, LOGOS_REACTION, ExtraInfoEnum } from "../logo"
import { UserService } from '../user.service'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  actions = LOGOS_ACTION
  reactions = LOGOS_REACTION

  selectedLogoAction?: Logo;
  selectedLogoReaction?: Logo;

  selectedAction?: action;
  selectedReaction?: action;

  //@ViewChildren('cmp') components?:QueryList<ElementRef>;
  @ViewChild('action_input1') action_input1?: ElementRef;
  @ViewChild('action_input2') action_input2?: ElementRef;
  @ViewChild('reaction_input1') reaction_input1?: ElementRef;
  @ViewChild('reaction_input2') reaction_input2?: ElementRef;

  constructor(private UserService: UserService) { }

  ngOnInit(): void {
  }

  onSelectLogoAction(logo: Logo): void {
    this.selectedLogoAction = logo;
  }

  onSelectLogoReaction(logo: Logo): void {
    this.selectedLogoReaction = logo;
  }

  onSelectAction(value: action): void {
    this.selectedAction = value;
  }

  onSelectReaction(value: action): void {
    this.selectedReaction = value;
  }

  async apply(): Promise<void> {
    if (this.action_input1) {
      console.log(this.action_input1!.nativeElement.value)
    }
    if (this.action_input2) {
      console.log(this.action_input2!.nativeElement.value)
    }
    if (this.reaction_input1) {
      console.log(this.reaction_input1!.nativeElement.value)
    }
    if (this.reaction_input2) {
      console.log(this.reaction_input2!.nativeElement.value)
    }
    console.log(this.selectedAction!.name + ", I " + this.selectedReaction!.name)

    if (this.selectedAction!.name === "when a twitter user tweets") {
      var username = ""

      if (this.action_input1!.nativeElement.value) {
        username = this.action_input1!.nativeElement.value
      } else {
        fetch('http://localhost:8080/twitter/user', {
          headers: {
            'Accept': 'application/json',
          }
        }).then(response => response.json())
          .then(data => {
            username = data.user
          }).catch(console.error)
      }

      var payload_tweet = {
        UserName: username,
        Reaction: this.selectedReaction?.route,
        text: this.reaction_input1!.nativeElement.value
      }
      console.log("payload : ", payload_tweet)

      fetch('http://localhost:8080/twitter/action/tweet', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload_tweet)
      }).then(response => response.json())
        .then(data => {
          console.log(data)
          alert("area successfully created !")
        }).catch(console.error)

    } else if (this.selectedAction!.name === "when someone @ you") {
      fetch('http://localhost:8080/twitter/user', {
        headers: {
          'Accept': 'application/json',
        }
      }).then(response => response.json())
        .then(data => {
          console.log("data : ", data)
          var payload = {
            UserName: data.user,
            Id: data.id,
            Reaction: this.selectedReaction?.route,
            text: this.reaction_input1!.nativeElement.value
          }
          console.log("payload : ", payload)

          fetch('http://localhost:8080/twitter/action/mention', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          }).then(response => response.json())
            .then(data => {
              console.log(data)
              alert("area successfully created !")
            }).catch(console.error)

        }).catch(console.error)
    } else if (this.selectedAction!.name === "when temperature changes") {
      var payload = {
        UserName: this.UserService.getUser(),
        city: this.action_input1!.nativeElement.value,
        Reaction: this.selectedReaction?.route,
        text: this.reaction_input1!.nativeElement.value
      }
      console.log("payload : ", payload)

      fetch('http://localhost:8080/weather/temp_change', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }).then(response => response.json())
        .then(data => {
          console.log(data)
          alert("area successfully created !")
        }).catch(console.error)
    } else if (this.selectedAction!.name === "when there is high wind") {
      var payload = {
        UserName: this.UserService.getUser(),
        city: this.action_input1!.nativeElement.value,
        Reaction: this.selectedReaction?.route,
        text: this.reaction_input1!.nativeElement.value
      }
      console.log("payload : ", payload)

      fetch('http://localhost:8080/weather/wind_speed', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }).then(response => response.json())
        .then(data => {
          console.log(data)
          alert("area successfully created !")
        }).catch(console.error)
    } else if (this.selectedAction!.name === "when there is high UV index") {
      var payload = {
        UserName: this.UserService.getUser(),
        city: this.action_input1!.nativeElement.value,
        Reaction: this.selectedReaction?.route,
        text: this.reaction_input1!.nativeElement.value
      }
      console.log("payload : ", payload)

      fetch('http://localhost:8080/weather/uv_index', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }).then(response => response.json())
        .then(data => {
          console.log(data)
          alert("area successfully created !")
        }).catch(console.error)
    } else if (this.selectedAction!.name === "when there is high humidity") {
      var payload = {
        UserName: this.UserService.getUser(),
        city: this.action_input1!.nativeElement.value,
        Reaction: this.selectedReaction?.route,
        text: this.reaction_input1!.nativeElement.value
      }
      console.log("payload : ", payload)

      fetch('http://localhost:8080/weather/humidity', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }).then(response => response.json())
        .then(data => {
          alert("area successfully created !")
          console.log(data)
        }).catch(console.error)
    } else if (this.selectedAction!.name === "every XX second") {
      var payload_timer = {
        UserName: this.UserService.getUser(),
        Reaction: this.selectedReaction?.route,
        text: this.reaction_input1!.nativeElement.value
      }
      console.log("payload : ", payload_timer)

      fetch('http://localhost:8080/timer/every_x_seconds', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload_timer)
      }).then(response => response.json())
        .then(data => {
          console.log(data)
          alert("area successfully created !")
        }).catch(console.error)
    } else if (this.selectedAction!.name === "at given date") {
      var payload_timer = {
        UserName: this.UserService.getUser(),
        Reaction: this.selectedReaction?.route,
        text: this.reaction_input1!.nativeElement.value
      }
      console.log("payload_timer : ", payload_timer)

      fetch('http://localhost:8080/timer/on_date', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload_timer)
      }).then(response => response.json())
        .then(data => {
          console.log(data)
          alert("area successfully created !")
        }).catch(console.error)
    }
    //post request to lh3000
  }
}
