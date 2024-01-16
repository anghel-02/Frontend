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
    
    const title = form.value.nome
    const tag = form.value.tag
    const tagsArray: string[] = tag.split(',').map((tag: string) => tag.trim());
    const caption = form.value.descr
    const value = form.value.prezzo
    const data = form.value.immagine 
    console.log(tagsArray)
    this.auth.createNFT({caption,title,value,tagsArray,data})
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



