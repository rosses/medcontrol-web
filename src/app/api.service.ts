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
  
  getBudgetStatus() {
    return this.get('/v1/budget-status');
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
  
  /* Labs */
  getLabs(){
    return this.get('/v1/lab');
  }
  addLab(data: any){
    return this.post('/v1/lab', data);
  }
  editLab(data: any){
    return this.post('/v1/lab/' + data.LabID, data);
  }
  getLab(id: string){
    return this.get('/v1/lab/' + id);
  }
  deleteLab(id: string){
    return this.delete('/v1/lab/' + id);
  }
  /* Evolutions */ 
  addEvolution(data: any){
    return this.post('/v1/evolution', data);
  }
  editEvolution(data: any){
    return this.post('/v1/evolution/' + data.EvolutionID, data);
  }
  getEvolutions(id: string){
    return this.get('/v1/evolution/' + id);
  }
  deleteEvolution(id: string){
    return this.delete('/v1/evolution/' + id);
  }
  getStatuses(data?:any){
    let d = '';
    if (data) { d = new URLSearchParams(data).toString(); }
    return this.get('/v1/status?' + d);
  }
  /* Groups */
  getGroups(){
    return this.get('/v1/group');
  }
  addGroup(data: any){
    return this.post('/v1/group', data);
  }
  editGroup(data: any){
    return this.post('/v1/group/' + data.GroupID, data);
  }
  getGroup(id: string){
    return this.get('/v1/group/' + id);
  }
  deleteGroup(id: string){
    return this.delete('/v1/group/' + id);
  }
  /* People */
  getPeoples(data:any){
    let d = '';
    if (data) { d = new URLSearchParams(data).toString(); }
    return this.get('/v1/people?' + d);
  }
  addPeople(data: any){
    return this.post('/v1/people', data);
  }
  editPeople(data: any){
    return this.post('/v1/people/' + data.PeopleID, data);
  }
  getPeople(id: string){
    return this.get('/v1/people/' + id);
  }
  deletePeople(id: string){
    return this.delete('/v1/people/' + id);
  }
  getPeopleDates(id: string){
    return this.get('/v1/people/'+id+'/dates');
  }
  getPeopleExams(id: string){
    return this.get('/v1/people/'+id+'/exams');
  }
  getPeopleRecipes(id: string) {
    return this.get('/v1/people/'+id+'/recipes');
  }
  getPeopleCertificates(id: string) {
    return this.get('/v1/people/'+id+'/certificates');
  }
  getPeopleEvolutions(id: string){
    return this.get('/v1/people/'+id+'/evolutions');
  }
  getPeopleFicha(id: string) {
    return this.get('/v1/people/'+id+'/text');
  }
  changeStatusPeople(data:any) {
    return this.post('/v1/people/'+data.PeopleID+'/change-status', data);
  }
  changeDatesPeople(data:any) {
    return this.post('/v1/people/'+data.PeopleID+'/change-dates', data);
  }
  changeDatesPeople2(data:any) {
    return this.post('/v1/people/'+data.PeopleID+'/change-dates2', data);
  }
  /* Health */
  getHealths(){
    return this.get('/v1/health');
  }
  addHealth(data: any){
    return this.post('/v1/health', data);
  }
  editHealth(data: any){
    return this.post('/v1/health/' + data.HealthID, data);
  }
  getHealth(id: string){
    return this.get('/v1/health/' + id);
  }
  deleteHealth(id: string){
    return this.delete('/v1/health/' + id);
  }
  /* Health */
  getExamDatas(){
    return this.get('/v1/examdata');
  }
  addExamData(data: any){
    return this.post('/v1/examdata', data);
  }
  editExamData(data: any){
    return this.post('/v1/examdata/' + data.ExamDataID, data);
  }
  getExamData(id: string){
    return this.get('/v1/examdata/' + id);
  }
  deleteExamData(id: string){
    return this.delete('/v1/examdata/' + id);
  }
  
  /* Medicines */
  getMedicines(){
    return this.get('/v1/medicine');
  }
  addMedicine(data: any){
    return this.post('/v1/medicine', data);
  }
  editMedicine(data: any){
    return this.post('/v1/medicine/' + data.MedicineID, data);
  }
  getMedicine(id: string){
    return this.get('/v1/medicine/' + id);
  }
  deleteMedicine(id: string){
    return this.delete('/v1/medicine/' + id);
  }
  /* Dates */
  getDates(){
    return this.get('/v1/date');
  }
  addDate(data: any){
    return this.post('/v1/date', data);
  }
  editDate(data: any){
    return this.post('/v1/date/' + data.id, data);
  }
  getDate(id: string){
    return this.get('/v1/date/' + id);
  }
  deleteDate(id: string){
    return this.delete('/v1/date/' + id);
  }
  getDatesNext() {
    return this.get('/v1/date/next')
  }
  getDatesFilter(data?:any) {
    let d = '';
    if (data) { d = new URLSearchParams(data).toString(); }
    return this.get('/v1/date/find?' + d)
  }
  addDatesConfirm(data:any) {
    return this.post('/v1/date/confirm', data)
  }
  /* Diagnosis */
  getDiagnosis(){
    return this.get('/v1/diagnosis');
  }
  addDiagnosis(data: any){
    return this.post('/v1/diagnosis', data);
  }
  editDiagnosis(data: any){
    return this.post('/v1/diagnosis/' + data.DiagnosisID, data);
  }
  getUniqueDiagnosis(id: string){
    return this.get('/v1/diagnosis/' + id);
  }
  deleteDiagnosis(id: string){
    return this.delete('/v1/diagnosis/' + id);
  }
  /* CertificateTypes */
  getCertificateTypes(){
    return this.get('/v1/certificate-type');
  }
  addCertificateType(data: any){
    return this.post('/v1/certificate-type', data);
  }
  editCertificateType(data: any){
    return this.post('/v1/certificate-type/' + data.CertificateTypeID, data);
  }
  getCertificateType(id: string){
    return this.get('/v1/certificate-type/' + id);
  }
  deleteCertificateType(id: string){
    return this.delete('/v1/certificate-type/' + id);
  }
  /* Exams */
  getExams(){
    return this.get('/v1/exam');
  }
  addExam(data: any){
    return this.post('/v1/exam', data);
  }
  editExam(data: any){
    return this.post('/v1/exam/' + data.ExamID, data);
  }
  getExam(id: string){
    return this.get('/v1/exam/' + id);
  }
  deleteExam(id: string){
    return this.delete('/v1/exam/' + id);
  }
  /* ExamTypes */
  getExamTypes(){
    return this.get('/v1/exam-type');
  }
  addExamType(data: any){
    return this.post('/v1/exam-type', data);
  }
  editExamType(data: any){
    return this.post('/v1/exam-type/' + data.ExamTypeID, data);
  }
  getExamType(id: string){
    return this.get('/v1/exam-type/' + id);
  }
  deleteExamType(id: string){
    return this.delete('/v1/exam-type/' + id);
  }
  /* Specialists */
  getSpecialists(){
    return this.get('/v1/specialist');
  }
  addSpecialist(data: any){
    return this.post('/v1/specialist', data);
  }
  editSpecialist(data: any){
    return this.post('/v1/specialist/' + data.SpecialistID, data);
  }
  getSpecialist(id: string){
    return this.get('/v1/specialist/' + id);
  }
  deleteSpecialist(id: string){
    return this.delete('/v1/specialist/' + id);
  }
  /* Surgerys */
  getSurgerys(){
    return this.get('/v1/surgery');
  }
  addSurgery(data: any){
    return this.post('/v1/surgery', data);
  }
  editSurgery(data: any){
    return this.post('/v1/surgery/' + data.SurgeryID, data);
  }
  getSurgery(id: string){
    return this.get('/v1/surgery/' + id);
  }
  deleteSurgery(id: string){
    return this.delete('/v1/surgery/' + id);
  }

  /* Templates */
  loadTemplate(id: string) {
    return this.get('/v1/template/'+id);
  }
  setTemplate(id: string, data:any) {
    return this.post('/v1/template/'+id, data);
  }
  /* Evolutions */
  /* Interviews */
  /* Recipes */
  /* Orders */
  /* Certificates */
  /* Users */
  /* Profiles */
  /* Anthropometrys */
  
  saveSession(data:any) {
    return this.post("/v1/date/"+data.DateID, data);
  }
  saveExamData(data:any) {
    return this.post("/v1/examdata/save", data);
  }
  getExamValuesByDate(DateID:string) {
    return this.get("/v1/examdata/get-by-date/"+DateID);
  }
  

  /* Auth services */
  login(data:any) {
    return this.http.post(environment.url + '/v1/auth/login', data);
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
