import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, public router: Router) { }

  async setToken(token: string) { 
    await localStorage.setItem('medcontrolToken', token);
  }
  getToken() {
    return localStorage.getItem('medcontrolToken') || '';
  }
  async setProfile(profile:any) {
    await localStorage.setItem('medcontrolProfile', JSON.stringify(profile));
  }
  getProfile(data?:string) {
    let profile = JSON.parse(localStorage.getItem('medcontrolProfile') || '');
    if (data) {
      return profile[data];
    } else {
      return profile;
    } 
  }

  /* Masters */
  getProfiles() {
    return this.get('/v1/profile');
  }
  getShifttypes() {
    return this.get('/v1/shifttype');
  }
  getSuperadminDashboard() {
    return this.get('/v1/user/superadmin-dashboard')
  }

  /* Customer manager */
  getCustomerDashboard() {
    return this.get('/v1/customer/dashboard');
  }
  getCustomers() {
    return this.get('/v1/customer');
  }
  getCustomer(id:string) {
    return this.get('/v1/customer/' + id);
  }
  addCustomer(data:any){
    return this.post('/v1/customer', data);
  }
  editCustomer(data:any) {
    return this.post('/v1/customer/' + data._id, data);
  }
  removeCustomer(id:string) {
    return this.delete('/v1/customer/'+id);
  } 

  /* Profile Management */
  getCustomerUsers() {
    return this.get("/v1/customer/users");
  }
  addUser(data:any){
    return this.post('/v1/user', data);
  }
  editUser(data:any) {
    return this.post('/v1/user/' + data._id, data);
  }
  removeUser(id:string) {
    return this.delete('/v1/user/'+id);
  }

  /* Shifts Management */
  getShifts() {
    return this.get("/v1/shift");
  }
  addShift(data:any){
    return this.post('/v1/shift', data);
  }
  editShift(data:any) {
    return this.post('/v1/shift/' + data._id, data);
  }
  removeShift(id:string) {
    return this.delete('/v1/shift/'+id);
  }

  /* Store management */
  uploadStoreImage(data: any) {
    return this.post('/v1/store/upload-image', data);
  }
  getStores() {
    return this.get('/v1/store');
  }
  addStore(data:any){
    return this.post('/v1/store', data);
  }
  editStore(data:any) {
    return this.post('/v1/store/' + data._id, data);
  }
  removeStore(id:string) {
    return this.delete('/v1/store/' + id);
  }
  
  /* User management */
  getUsers(data:any){
    let d = '';
    if (data) { d = new URLSearchParams(data).toString(); }
    return this.get("/v1/user?" + d); 
  }
  
  /* Jobs management */
  getJobs(){
    return this.get('/v1/job');
  }
  addJob(job: any){
    return this.post('/v1/job', job);
  }
  editJob(job: any){
    return this.post('/v1/job/' + job._id, job);
  }
  getJob(id: string){
    return this.get('/v1/job/' + id);
  }
  deleteJob(id: string){
    return this.delete('/v1/job/' + id);
  }
  getUnits(){
    return this.get('/v1/unit');
  } 
  addUnit(job: any){
    return this.post('/v1/unit', job);
  }
  editUnit(job: any){
    return this.post('/v1/unit/' + job._id, job);
  }
  getUnit(id: string){
    return this.get('/v1/unit/' + id);
  }
  deleteUnit(id: string){
    return this.delete('/v1/unit/' + id);
  }
  

  /* Auth services */
  login(data:any) {
    return this.post('/v1/auth/login', data);
  }
  register(data:any) {
    return this.post('/v1/auth/register', data);
  }
  lostpassword(data:any) {
    return this.post('/v1/auth/lost-password', data);
  }
  logout() {
    localStorage.removeItem('medcontrolProfile');
    localStorage.removeItem('medcontrolToken');
    this.router.navigateByUrl('/auth/login');
  }
  setActivation(id:string, status: boolean) {
    return this.post('/v1/user/active', {
      id: id,
      status: status
    });
  }

  /* Injector */
  get(servicio: string): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer '+localStorage.getItem('medcontrolToken') || '' });
    const o = { headers: headers }; 
    return this.http.get(environment.url + servicio, o);
  }

  post(servicio: string, request: any): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer '+localStorage.getItem('medcontrolToken') || '' });
    const o = { headers: headers };
    return this.http.post(environment.url + servicio, request, o);
  }

  delete(servicio: string): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer '+localStorage.getItem('medcontrolToken') || '' });
    const o = { headers: headers };
    return this.http.delete(environment.url + servicio, o);
  }

  public upload(url: string, file: File) {
    let formData = new FormData();
    formData.append('upload', file);
    let params = new HttpParams();
    const options = { headers: new HttpHeaders().append('Authorization', 'Bearer '+localStorage.getItem('medcontrolToken') || '') };
    return this.http.post(environment.url+url, formData, options);
  }

  uploadImage(url: string, name: string, file: any) {
    let params = new HttpParams();
    const options = { headers: new HttpHeaders().append('Authorization', 'Bearer '+localStorage.getItem('medcontrolToken') || '') };
    return this.http.post(environment.url+url, {
      name: name,
      file: file
    }, options);
  }


  error(msg?:string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: msg ?? 'Error de conexión',
      showConfirmButton: false,
      cancelButtonColor: '#142748',
      showCancelButton: true,
      cancelButtonText: 'Aceptar'
    });
  }
  toastError(msg?:string) {
    Swal.fire({
      title: 'Error',
      text: (msg ? msg : 'Error al comunicar'),
      icon: 'error',
      toast: true,
      position: 'top-right',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });
  }
  toastOk(msg?:string) {
    Swal.fire({
      title: 'Listo',
      text: (msg ? msg : 'Realizado correctamente'),
      icon: 'success',
      toast: true,
      position: 'top-right',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });
  }
  confirmModal(title?:string, msg?:string) {
    return Swal.fire({
      title: (title ? title : '¿Estas seguro?'),
      text: (msg ? msg : "Puedes cancelar o volver si no estas seguro."),
      iconHtml: '<img src="assets/svg/icon-alert.svg">',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#089BAB',
      showCloseButton: true,
      showCancelButton: true,
      cancelButtonText: 'Volver',
      buttonsStyling: false,
      reverseButtons: true,
      customClass: {
        icon: 'border-0',
        htmlContainer: 'text-center my-3',
        confirmButton: 'btn btn-primary text-white w-40',
        cancelButton: 'btn btn-outline-primary me-3 w-40',
        actions: ' w-100'
      },
    })
  }
  ok(title?:string, text?:string) {
    return Swal.fire({
      title: (title ? title : 'Listo'),
      text: (text ? text : 'Realizado correctamente'),
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#089BAB',
      showCloseButton: false,
      buttonsStyling: false,
      customClass: {
        htmlContainer: 'text-center my-3',
        confirmButton: 'btn btn-primary text-white w-100',
      },
    })
  }
}
