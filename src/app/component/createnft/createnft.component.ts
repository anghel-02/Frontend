import { Component } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { NFTService } from '../../nft.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createnft',
  templateUrl: './createnft.component.html',
  styleUrl: './createnft.component.css'
})
export class CreatenftComponent {
  img !: ArrayBuffer;
  imageUrl: string | undefined;

  
  constructor(private auth : AuthService, private nftservice: NFTService, private route: Router){}
  
  onSubmit(form : NgForm){
    
    const title = form.value.nome
    const tag = form.value.tag
    const tags: string[] = tag.split(',').map((tag: string) => tag.trim());
    const caption = form.value.descr
    const value = form.value.prezzo
    const data = btoa(String.fromCharCode(...new Uint8Array(this.img)));

    this.nftservice.createNFT({title, tags, caption, value, data});
    this.route.navigate(['home'])
  }


  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
  
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.img = e.target.result;
        this.imageUrl = 'data:image/png;base64,' + btoa(String.fromCharCode(...new Uint8Array(this.img)));
      };
      reader.readAsArrayBuffer(file);
    }
  }

}



