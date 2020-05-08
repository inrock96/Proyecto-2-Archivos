import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-accessdenied',
  templateUrl: './accessdenied.component.html',
  styleUrls: ['./accessdenied.component.css']
})
export class AccessdeniedComponent implements OnInit {

  constructor(sgoarage:StorageService) { 
    var s = sessionStorage.getItem('current');
    console.log('s es igual a '+s)
  }

  ngOnInit() {
    
  }

}
