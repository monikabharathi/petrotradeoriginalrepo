import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DepotComponent } from './depot/depot.component';
import { RouterModule } from '@angular/router';
import { LayoutRoutes } from './layout.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { StockComponent } from './stock/stock.component';
import { ForecastComponent } from './forecast/forecast.component';
import { AdddepotComponent } from './adddepot/adddepot.component';
import { UllageComponent } from './ullage/ullage.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgxSpinnerModule } from "ngx-spinner";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';
import { ProfileComponent } from './profile/profile.component';
import { UserComponent } from './user/user.component';
import { AddprofileComponent } from './addprofile/addprofile.component';


import { AccordionModule } from 'ngx-bootstrap/accordion';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { ViewprofileComponent } from './viewprofile/viewprofile.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { DeleteprofileComponent } from './deleteprofile/deleteprofile.component';
import { Deleteauthorizedataprofile } from './deleteauthorizedataprofile/deleteauthorizedataprofile.component';
import { Deleteauthorizeprofile } from './deleteauthorizeprofile/deleteauthorizeprofile.component';

import { ViewuserComponent } from './viewuser/viewuser.component';
import { DeleteuserComponent } from './deleteuser/deleteuser.component';
import { AdduserComponent } from './adduser/adduser.component';
import { EdituserComponent } from './edituser/edituser.component';
import { Authorizeuser } from './authorizeuser/authorizeuser.component';
import { viewauthorizeuser } from './viewauthorizeuser/viewauthorizeuser.component';
import { Deleteauthorizeuser } from './deleteauthorizeuser/deleteauthorizeuser.component';
import { Viewdeleteauthorizeuser } from './viewdeleteauthorizeuser/viewdeleteauthorizeuser.component';

import { AuthorizeprofileComponent } from './authorizeprofile/authorizeprofile.component';
import { ViewauthorizeprofileComponent } from './viewauthorizeprofile/viewauthorizeprofile.component';
import { ViewdepotComponent } from './viewdepot/viewdepot.component';
import { EditdepotComponent } from './editdepot/editdepot.component';
import { DeletedepotComponent } from './deletedepot/deletedepot.component';
import { AuthorizedepotComponent } from './authorizedepot/authorizedepot.component';
import { ViewauthorizedepotComponent } from './viewauthorizedepot/viewauthorizedepot.component';
import { ViewdeleteauthorizedepotComponent } from './viewdeleteauthorizedepot/viewdeleteauthorizedepot.component';
import { DeleteauthorizedepotComponent } from './deleteauthorizedepot/deleteauthorizedepot.component';

import { ProductComponent } from './product/product.component';
import { ViewproductComponent } from './viewproduct/viewproduct.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { DeleteproductComponent } from './deleteproduct/deleteproduct.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AuthorizeproductComponent } from './authorizeproduct/authorizeproduct.component';
import { ViewauthorizeproductComponent } from './viewauthorizeproduct/viewauthorizeproduct.component';
import { DeleteauthorizeproductComponent } from './deleteauthorizeproduct/deleteauthorizeproduct.component';
import { ViewdeleteauthorizeproductComponent } from './viewdeleteauthorizeproduct/viewdeleteauthorizeproduct.component';
import { SupplierComponent } from './supplier/supplier.component';
import { AddsupplierComponent } from './addsupplier/addsupplier.component';
import { AddlinksupplierComponent } from './addlinksupplier/addlinksupplier.component';
import { ViewsupplierComponent } from './viewsupplier/viewsupplier.component';
import { DeletesupplierComponent } from './deletesupplier/deletesupplier.component';
import { EditsupplierComponent } from './editsupplier/editsupplier.component';
import { AuthorizesupplierComponent } from './authorizesupplier/authorizesupplier.component';
import { ViewauthorizesupplierComponent } from './viewauthorizesupplier/viewauthorizesupplier.component';
import { DeleteauthorizesupplierComponent } from './deleteauthorizesupplier/deleteauthorizesupplier.component';
import { ViewdeleteauthorizesupplierComponent } from './viewdeleteauthorizesupplier/viewdeleteauthorizesupplier.component';
import { AddullageComponent } from './addullage/addullage.component';
import { ViewullageComponent } from './viewullage/viewullage.component';
import { EditullageComponent } from './editullage/editullage.component';
import { DeleteullageComponent } from './deleteullage/deleteullage.component';
import { ViewullagetankComponent } from './viewullagetank/viewullagetank.component';
import { EditullagetankComponent } from './editullagetank/editullagetank.component';
import { EdittankComponent } from './edittank/edittank.component';
import { DeleteullagetankComponent } from './deleteullagetank/deleteullagetank.component';
import { AuthorizeullageComponent } from './authorizeullage/authorizeullage.component';
import { ViewauthorizeullageComponent } from './viewauthorizeullage/viewauthorizeullage.component';
import { DeleteauthorizeullageComponent } from './deleteauthorizeullage/deleteauthorizeullage.component';
import { ViewdeleteauthorizeullageComponent } from './viewdeleteauthorizeullage/viewdeleteauthorizeullage.component';
import { SafetyComponent } from './safety/safety.component';
import { AddsafetyComponent } from './addsafety/addsafety.component';
import { ViewsafetyComponent } from './viewsafety/viewsafety.component';
import { ViewsafetyhistoryComponent } from './viewsafetyhistory/viewsafetyhistory.component';
import { EditsafetyComponent } from './editsafety/editsafety.component';
import { EditsafetystockComponent } from './editsafetystock/editsafetystock.component';
import { Userpasswordgeneratepage } from './userpasswordgeneratepage/userpasswordgeneratepage.component';
import { BulkstockComponent } from './bulkstock/bulkstock.component';
import { AddbulkstockComponent } from './addbulkstock/addbulkstock.component';
import { EditbulkstockComponent } from './editbulkstock/editbulkstock.component';
import { ViewbulkstockComponent } from './viewbulkstock/viewbulkstock.component';
import { ForecastweekComponent } from './forecastweek/forecastweek.component';
import { AddforecastweekComponent } from './addforecastweek/addforecastweek.component';
import { ViewforecastweekComponent } from './viewforecastweek/viewforecastweek.component';
import { EditforecastweekComponent } from './editforecastweek/editforecastweek.component';
import { DailyforecastComponent } from './dailyforecast/dailyforecast.component';
import { EditdailyforecastComponent } from './editdailyforecast/editdailyforecast.component';
import { SupplyplanComponent } from './supplyplan/supplyplan.component';
import { AddsupplyplanComponent } from './addsupplyplan/addsupplyplan.component';
import { ViewsupplyplanComponent } from './viewsupplyplan/viewsupplyplan.component';
import { EditsupplyplanComponent } from './editsupplyplan/editsupplyplan.component';
import { ReportbulkstockComponent } from './reportbulkstock/reportbulkstock.component';

import { ReportauditComponent } from './reportaudit/reportaudit.component';




import { ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule,MatButtonModule, MatInputModule,MatSelectModule,MatRadioModule,MatIconModule,
  MatTooltipModule,MatPaginatorModule,MatSnackBarModule} from '@angular/material';
import { ReportviewbulkstockComponent } from './reportviewbulkstock/reportviewbulkstock.component';
import { BulkstockuploadComponent } from './bulkstockupload/bulkstockupload.component';

/* const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true
}; */

@NgModule({
  declarations: [DepotComponent, DashboardComponent, StockComponent, ForecastComponent,
    AdddepotComponent, UllageComponent, ProfileComponent, UserComponent, AddprofileComponent,
    ViewprofileComponent,
    EditprofileComponent, DeleteprofileComponent, Deleteauthorizedataprofile,
    Deleteauthorizeprofile, ViewuserComponent, DeleteuserComponent, AdduserComponent,
    EdituserComponent,
    Authorizeuser, viewauthorizeuser, Deleteauthorizeuser, Viewdeleteauthorizeuser,
    AuthorizeprofileComponent,
    ViewauthorizeprofileComponent,
    ViewdepotComponent,
    EditdepotComponent,
    DeletedepotComponent,
    AuthorizedepotComponent,
    ViewauthorizedepotComponent,
    ViewdeleteauthorizedepotComponent,
    DeleteauthorizedepotComponent,
    ProductComponent,
    ViewproductComponent,
    EditproductComponent,
    DeleteproductComponent,
    AddproductComponent,
    AuthorizeproductComponent,
    ViewauthorizeproductComponent,
    DeleteauthorizeproductComponent,
    ViewdeleteauthorizeproductComponent,
    SupplierComponent,
    AddsupplierComponent,
    AddlinksupplierComponent,
    ViewsupplierComponent,
    DeletesupplierComponent,
    EditsupplierComponent,
    AuthorizesupplierComponent,
    ViewauthorizesupplierComponent,
    DeleteauthorizesupplierComponent,
    ViewdeleteauthorizesupplierComponent,
    AddullageComponent,
    ViewullageComponent,
    EditullageComponent,
    DeleteullageComponent,
    ViewullagetankComponent,
    EditullagetankComponent,
    EdittankComponent,
    DeleteullagetankComponent,
    AuthorizeullageComponent,
    ViewauthorizeullageComponent,
    DeleteauthorizeullageComponent,
    ViewdeleteauthorizeullageComponent,
    SafetyComponent,
    AddsafetyComponent,
    ViewsafetyComponent,
    ViewsafetyhistoryComponent,
    EditsafetyComponent,
    EditsafetystockComponent,
    Userpasswordgeneratepage,
    BulkstockComponent,
    AddbulkstockComponent,
    EditbulkstockComponent,
    ViewbulkstockComponent,
    ForecastweekComponent,
    AddforecastweekComponent,
    ViewforecastweekComponent,
    EditforecastweekComponent,
    DailyforecastComponent,
    EditdailyforecastComponent,
    SupplyplanComponent,
    AddsupplyplanComponent,
    ViewsupplyplanComponent,
    EditsupplyplanComponent,
    ReportbulkstockComponent,
    ReportviewbulkstockComponent,
    ReportauditComponent,
    BulkstockuploadComponent
    

  ],
  imports: [
    CommonModule, FormsModule, BsDatepickerModule.forRoot(),
    ModalModule, ChartsModule, BsDropdownModule,
    NgxSpinnerModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    RouterModule.forChild(LayoutRoutes),
    AccordionModule.forRoot(),
    TooltipModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    PerfectScrollbarModule,
    
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatIconModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatButtonModule
       

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [BsModalService],
  // bootstrap: [LayoutComponent],
})

export class LayoutModule { }
