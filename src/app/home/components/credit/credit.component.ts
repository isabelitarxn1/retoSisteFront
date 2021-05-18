import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { ServiceHomeService } from '../../services/service-home.service';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.scss']
})
export class CreditComponent implements OnInit {

  num = 1;
  credit;
  paramsObject;
  creditForm: FormGroup;

  action;

  constructor(private formBuilder: FormBuilder,
              private cookie: CookieService,
              private service: ServiceHomeService,
              private router: Router,) {
                this.credit = this.cookie.get('credit');
               }

  ngOnInit(): void {    
    if(this.credit){this.credit = JSON.parse(atob(this.credit))}  
    if(this.credit.nombres){
      this.creditForm = this.formBuilder.group({
        nombres: [this.credit.nombres, [Validators.required]],
        apellidos: [this.credit.apellidos, [Validators.required]],
        celular: [this.credit.celular, [Validators.required]],
        correo: [this.credit.correo, [Validators.required]],
        tipoID: [this.credit.tipoID, [Validators.required]],
        numeroID: [this.credit.numeroID, [Validators.required]],
        direccionResidencia: [this.credit.direccionResidencia, [Validators.required]],
        ciudad: [this.credit.ciudad, [Validators.required]],
        valor: [this.credit.valor, [Validators.required]],
        cuotas: [this.credit.cuotas, [Validators.required]],
        estado: [this.credit.estado, [Validators.required]]      
      });
      this.action = 1;
    }else{
      this.creditForm = this.formBuilder.group({
        nombres: ['', [Validators.required]],
        apellidos: ['', [Validators.required]],
        celular: ['', [Validators.required]],
        correo: ['', [Validators.required]],
        tipoID: ['', [Validators.required]],
        numeroID: ['', [Validators.required]],
        direccionResidencia: ['', [Validators.required]],
        ciudad: ['', [Validators.required]],
        valor: ['', [Validators.required]],
        cuotas: ['', [Validators.required]],
        estado: ['', [Validators.required]]      
      });
      this.action = 2
    }
  }

  pasos(num){    
    if(num == 4){
      this.router.navigate(['/Home']);
    }
    this.num = num;
  }

  crearCredito(){
    console.log(this.creditForm.value);
    if(this.action == 1){
      //Actualizar
      this.service.updateCredit(this.creditForm.value).subscribe(response => {
        console.log(response);        
      },succes => {
        Swal.fire({
          title: '<p style="color: #10BBB5; font: normal normal bold 20px/24px Raleway;">¡Listo! has actualizado el crédito</p>',
          html:  '¿Qué tal si miras toda tu<br>' +
                 'lista de créditos?',
          icon: 'success',
          iconColor: '#10BBB5',
          confirmButtonText: 'Si quiero verla',
          confirmButtonColor: '#10BBB5'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/Home']);
          }
        })
      });
    }else{
      console.log(this.action);
      debugger
      //crear
      this.service.createCredit(this.creditForm.value).subscribe(response => {                      
      },succes => {
        Swal.fire({
          title: '<p style="color: #10BBB5; font: normal normal bold 20px/24px Raleway;">¡Listo! Has creado <br> un nuevo crédito</p>',
          html:  '¿Qué tal si miras toda tu<br>' +
                 'lista de créditos?',
          icon: 'success',
          iconColor: '#10BBB5',
          confirmButtonText: 'Si quiero verla',
          confirmButtonColor: '#10BBB5'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/Home']);
          }
        })
      });
     
    }
  }

}
