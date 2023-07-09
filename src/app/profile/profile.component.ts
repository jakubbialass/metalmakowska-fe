import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProfileType} from "./profile-type";

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: ProfileType;
  apiVersion: string;
  securedText: string;

  constructor(private http: HttpClient) {
    this.apiVersion = '';
    this.securedText = '';
    this.profile = {} as ProfileType
  }

  ngOnInit() {
    this.getProfile();
    this.getVersion();
    this.getSecured();
  }

  getProfile() {
    this.http.get(GRAPH_ENDPOINT)
      .subscribe(profile => {
        this.profile = profile;
        console.log(profile);
      })
  }

  getVersion() {
    console.log('bedzie wersja');
    this.http.get('api/version', {responseType: 'text'})
      .subscribe(ver => {
        console.log(ver);
        this.apiVersion = ver;
    })
  }

  getSecured() {
    console.log('bedzie secured');
    this.http.get('api/secured', {responseType: 'text'})
      .subscribe(securedText => {
        console.log(securedText);
        this.securedText = securedText;
      })
  }
}
