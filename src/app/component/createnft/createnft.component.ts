import { Component } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-createnft',
  templateUrl: './createnft.component.html',
  styleUrl: './createnft.component.css'
})
export class CreatenftComponent {
  img !: string;

  constructor(private auth : AuthService){}
  
  onSubmit(form : NgForm){
    let title = form.value.nome
    let tag: string[] = form.value.tag
    let caption = form.value.descr
    let value = form.value.prezzo
    this.auth.createNFT({title, tag, caption, value}).subscribe(data =>{})

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
}
