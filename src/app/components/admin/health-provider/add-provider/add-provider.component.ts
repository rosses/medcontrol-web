import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faXmark, faArrowUpFromBracket, faCircleXmark, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { RutService } from 'rut-chileno';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-provider',
  templateUrl: './add-provider.component.html',
  styleUrls: ['./add-provider.component.scss']
})
export class AddProviderComponent implements OnInit {

  @Input() onEditProvider: boolean = false;
  @Input() providerAdded: boolean = false;
  @Input() data: any = {
    name: '',
    rut: '',
    review: '',
    address: '',
    email: '',
    website: '',
    logo: '',
    image1: '',
    image2: '',
    accesscode: 1234,
    lat: '',
    lng: '',
    county: '',
    state: '',
    country: ''
  }

  @Output() onAddProvider: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCloseModal: EventEmitter<any> = new EventEmitter<any>();

  loading: boolean = false;

  faXmark = faXmark;
  faArrowUpFromBracket = faArrowUpFromBracket;
  faCircleXmark = faCircleXmark;
  faCircleCheck = faCircleCheck;

  mapOptions: any = {
    componentRestrictions: { country: 'CL' }
  };

  constructor(public api: ApiService, private rutService: RutService) { }

  ngOnInit(): void {
  }

  handleAddressChange(address: Address) {
    let numero = "", calle = "", comuna = "", pais = "", region = "";
    for (let i = 0; i < address.address_components.length; i++) {
      for (let j = 0; j < address.address_components[i].types.length; j++) {
        if (address.address_components[i].types[j] == "street_number") {
          numero = address.address_components[i].short_name;
        }
        if (address.address_components[i].types[j] == "route") {
          calle = address.address_components[i].short_name;
        }
        if (address.address_components[i].types[j] == "locality" || address.address_components[i].types[j] == "administrative_area_level_3") {
          comuna = address.address_components[i].short_name;
        }
        if (address.address_components[i].types[j] == "administrative_area_level_1") {
          region = address.address_components[i].short_name;
        }
        if (address.address_components[i].types[j] == "country") {
          pais = address.address_components[i].short_name;
        }
      }
    }
    this.data.address = calle + " " + numero;
    this.data.lat = ""+address.geometry.location.lat()+"";
    this.data.lng = ""+address.geometry.location.lng()+"";
    this.data.country = pais;
    this.data.county = comuna;
    this.data.state = region;
    //this.data.address = address.formatted_address;
  }

  uploadFile(e: any) {
    var files = e.srcElement.files;
    if (files.length > 0) {
      let file = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      let uploadedFile = '';
      
      reader.onload = () => {
        Swal.showLoading();
        this.api.uploadStoreImage({
          file: reader.result,
          name: file.name
        }).subscribe((data: any) => {
          Swal.close();
          uploadedFile = data.url;
          let fieldName = e.target.name;
      
          switch (fieldName) {
            case 'logoFile':
              this.data.logo = uploadedFile;
              break;
            case 'providerImg1':
              this.data.image1 = uploadedFile;
              break;
            case 'providerImg2':
              this.data.image2 = uploadedFile;
              break;

          }
        });
      };
    }
  }

  addProvider() {
    this.loading = true;
    this.data.accesscode = Math.floor(Math.random() * 90000 + 10000);
    this.api.addCustomer(this.data).subscribe(data => {
      this.onAddProvider.emit();
      this.loading = false;
      this.providerAdded = true;
    },(err)=>{
      this.loading = false;
      this.api.toastError(err.error.error);
    });

  }

  editProvider() {
    this.loading = true;
    this.api.editCustomer(this.data).subscribe(data => {
      this.onAddProvider.emit();
      this.closeModal();
      this.loading = false;
    },(err:any) => {
      this.loading = false;
      this.api.toastError(err.error.error);
    });

  }
  inputEvent(event : Event) {
    let rut = this.rutService.getRutChileForm(1, (event.target as HTMLInputElement).value)
    this.data.rut = rut;
  }
  closeModal() {
    this.providerAdded = false;
    this.onCloseModal.emit();
  }

  openImage(url: string){
    window.open(url,'popup', 'top=0,left=0,width=600,height=400');
  }
  
  deleteImageUrl(image: string){
    switch (image) {
      case 'logo':
        this.data.logo = '';
        break;
      case 'image1':
        this.data.image1 = '';
        break;
      case 'image2':
        this.data.image2 = '';
        break;
    
      default:
        break;
    }
  }
}
