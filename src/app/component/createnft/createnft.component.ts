import { Component } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-createnft',
  templateUrl: './createnft.component.html',
  styleUrl: './createnft.component.css'
})
export class CreatenftComponent {
  img !: any;

  
  constructor(private auth : AuthService){}
  
  onSubmit(form : NgForm){
    
    const title = form.value.nome
    const tags = form.value.tag
    const tag: string[] = tags.split(',').map((tag: string) => tag.trim());
    const caption = form.value.descr
    const value = form.value.prezzo

    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('title', title);
    formData.append('value', value);

    tag.forEach((tagItem, index) => {
    formData.append(`tag[${index}]`, tagItem);
  });

    formData.append('data', form.value.immagine);
  
    this.auth.createNFT(formData);
  }


  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
  
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.img = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  showImage(): void {}
}



