import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  constructor(private UserService: UserService) { }

  public connected_to_discord: boolean = false
  public connected_to_spotify: boolean = false
  public connected_to_github: boolean = false
  public connected_to_reddit: boolean = false
  public connected_to_twitter: boolean = false

  ngOnInit(): void {
    let user = this.UserService.getUser()

    if (user) {
      console.log("welcome " + user)
    }
    //this.connected_to_discord = true
  }

  async Connect_to_Discord() {
    const payload = {
      UserName: this.UserService.getUser()
    }

    fetch('http://localhost:8080/discord/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data == "status:connected")
          this.connected_to_discord = true
      }).catch(console.error)
  }

  async Connect_to_Twitter() {
    const payload = {
      UserName: this.UserService.getUser()
    }
    fetch('http://localhost:8080/twitter/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(response => response.json())
      .then(data => {
        console.log(data)
        if (data == "status:connected")
          this.connected_to_twitter = true
      }).catch(console.error)
  }

  async Connect_to_Spotify() {
    const payload = {
      UserName: this.UserService.getUser()
    }
    fetch('http://localhost:8080/spotify/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(response => response.json())
      .then(data => {
        console.log(data)
        if (data == "status: you are logged")
          this.connected_to_spotify = true
      }).catch(console.error)
  }

  async Connect_to_Github() {
    const payload = {
      UserName: this.UserService.getUser()
    }
    fetch('http://localhost:8080/github/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(response => response.json())
      .then(data => {
        console.log(data)
        if (data == "status:connected")
          this.connected_to_github = true
      }).catch(console.error)
  }
}

/*
get Connected_to_discord(): boolean {
    return this.connected_to_discord
  }

  set Connected_to_discord(value: boolean) {
    this.connected_to_discord = value
  }

  get Connected_to_spotify(): boolean {
    return this.connected_to_spotify
  }

  set Connected_to_spotify(value: boolean) {
    this.connected_to_spotify = value
  }
*/