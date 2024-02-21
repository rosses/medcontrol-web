import { Component, Input, OnInit, Output, EventEmitter, ViewChild, SimpleChanges, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxRutService } from '@numetalsour/ngx-rut';
import { ApiService } from 'src/app/api.service';
import { DummyService } from 'src/app/dummy.service';
import { MaskService } from 'src/app/mask.service';
import { AddMedicalExpressComponent } from '../add-medical-express/add-medical-express.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-single-recipe',
  templateUrl: './single-recipe.component.html',
  styleUrls: ['./single-recipe.component.scss']
})
export class SingleRecipeComponent implements OnInit {

  public dropRecipes: any = [];
  public PeopleID: string = '';
  public loading: boolean = false;
  public render: boolean = false;
  public faSpinner = faSpinner; 

  public Medicines: any[] = [];
  public recipes: any[] = [];

  constructor(
    private api: ApiService,
    public modal: NgbActiveModal,
    public mdl: NgbModal,
    public dummy: DummyService,
    public rut: NgxRutService,
    public mask: MaskService
  ) { }

  ngOnInit(): void { 
    this.loading = true;
    this.api.getMedicines().subscribe((data:any)=>{ this.Medicines = data; });
    this.render = true;
    this.loading = false;
  }
  addRecipe() {
    this.recipes.push({
      MedicineID: 0,
      Dose: '',
      Period: '',
      Periodicity: '',
      PeopleID: 0,
      DateID: 0
    });
  }
  examEvaluate(index:number) {
    
  } 
  borrar(topic:any, index:number) {
    if (topic=="recipes") {
      if (this.recipes[index].RecipeID || (parseInt(this.recipes[index].RecipeID) || 0) > 0) {
        this.dropRecipes.push(this.recipes[index].RecipeID);
      }
      this.recipes.splice(index,1); 
    }
  } 

  save(withClose:boolean, options?:any) {
    this.loading = true;
    let w:any = null;
    if (options && options.orders) { 
      w = window.open('', 'w2','width=700,height=500');
      w.document.write("<h4>Preparando PDF... no cierres esta ventana hasta que aparezca tu PDF, espere por favor</h4>");
    }
    this.api.saveSingleRecipe({
      PeopleID: this.PeopleID,
      data: this.recipes,
      drop: this.dropRecipes
    }).subscribe((data:any) => {
      this.api.toastOk("Guardado correctamente");
      if (withClose){ 
        if (options && options.orders) {
          w.location.href = environment.url + '/v1/pdf-render/single-recipes/'+data.SingleOrderID;
        }
        this.modal.close({...data, ...options});
      }
      else {
        // TODO: never is false...
      }
      this.loading = false;
    },(err:any) => {
      this.api.toastError(err.error.message);
      this.loading = false;
    });
  }
  cancel() {
    this.modal.dismiss();
  }
  pareo(o:any) : any[] {
    let r:any[] = [];
    for (let i=0; i < o.length;i++) {
      r.push(i);
      i++;
    }
    return r;
  }
 
}
