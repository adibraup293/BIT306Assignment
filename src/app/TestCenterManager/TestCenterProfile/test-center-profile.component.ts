import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-manager-createTestCenter',
  templateUrl: './test-center-profile.component.html',
  styleUrls: ['./test-center-profile.component.css']
})

export class ManagerCreateTestCenterComponent {
  onCreateProfile(form: NgForm){
    if (form.invalid){
      return;
    }
  }
}
