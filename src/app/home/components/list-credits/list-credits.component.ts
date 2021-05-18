import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceHomeService } from '../../services/service-home.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Credit } from 'src/assets/model/credit';

@Component({
  selector: 'app-list-credits',
  templateUrl: './list-credits.component.html',
  styleUrls: ['./list-credits.component.scss']
})
export class ListCreditsComponent implements OnInit {

  listCredits;
  listCreditsFilter;

  filtro: FormGroup;


  constructor(
              private formBuilder: FormBuilder,
              private service: ServiceHomeService,
              private cookie: CookieService,
              private router: Router
            ) { }

  ngOnInit(): void {
    this.cookie.deleteAll();
    this.filtro = this.formBuilder.group({
      filtroNombre: [''],
      filtroID: ['',Validators.maxLength(1)]
    });
    this.getCredits();
  }

  getCredits(){
    this.service.getCredits().subscribe(result => {
      this.listCredits = result
      this.listCreditsFilter = this.listCredits;  
        }, error => {
          console.log(error);
        })
  }

  filtrarNombre(){    
    this.listCreditsFilter = this.listCredits.filter(element => {      
      return element.nombres.includes((this.filtro.get('filtroNombre').value)) ||    
      element.apellidos.includes((this.filtro.get('filtroNombre').value))
    });    
  }

  filtrarID(){
    this.listCreditsFilter = this.listCredits.filter(element => {      
      return element.tipoID.includes(this.filtro.get('filtroID').value.toUpperCase());
    });
  }

  createCredit(){
    this.router.navigate(['/Credit'])
  }

  editCredit(credit: Credit){      
    this.cookie.set('credit', btoa(JSON.stringify(credit)));
    this.router.navigate(['Credit'])
  }

  deleteCredit(credit){
    Swal.fire({
      title: '<p style="color: #10BBB5; font: normal normal bold 20px/24px Raleway;">Eliminar credito</p>',
      html:  'Eliminarás toda la información <br>' +
             'de este crédito. ¿Estás segur@?',
      icon: 'warning',
      iconColor: '#10BBB5',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#10BBB5'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteCredits(credit.id).subscribe(response => {
        },error => {
          Swal.fire(
            'Eliminado!',
            'El credito ah sido eliminado correctamente.',
            'success'
          )
          this.getCredits();
        })        
      }
    })
  }

}
