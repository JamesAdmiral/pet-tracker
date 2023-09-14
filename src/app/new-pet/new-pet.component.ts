import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AppService } from '../app.service';

@Component({
  selector: 'app-new-pet',
  templateUrl: './new-pet.component.html',
  styleUrls: ['./new-pet.component.sass']
})
export class NewPetComponent {
  fileUpload = new FormControl('');
  type = 'Dog';
  breed = '';
  imageSrc = '';
  loading = false;

  constructor(private service: AppService){}

  fileUploaded(event: Event) {
    this.loading = true;
    const files = (event.target as HTMLInputElement).files;
    const file = (files as FileList)[0]; // Here we use only the first file (single file)
    this.service.getPetData(file).subscribe(data => {
      this.loading = false;
      this.breed = data.predictions[0].tagName;
      this.imageSrc = URL.createObjectURL(file);
    })
  }

}
