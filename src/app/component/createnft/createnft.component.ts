import { Component } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-createnft',
  templateUrl: './createnft.component.html',
  styleUrl: './createnft.component.css'
})
export class CreatenftComponent {
  nome = new FormControl ();
  tag  = new FormControl ();
  img !: string;
  descrizione  = new FormControl ();
  prezzo = new FormControl();

  onSubmit(form : NgForm){
    let nome = this.nome.value
    let tag = this.tag.value
    let descrizione = this.descrizione.value
    let prezzo = this.prezzo.value
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
