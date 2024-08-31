import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CreateEmployeeComponent } from './components/employees/create-employee/create-employee.component';
import { CreateEntityComponent } from './components/entities/create-entity/create-entity.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { GetEntitiesComponent } from './components/entities/get-entities/get-entities.component';
import { isAdminGuard } from './shared/components/guards/is-admin.guard';
import { GetEmployeesComponent } from './components/employees/get-employees/get-employees.component';


export const routes: Routes = [

    {path:'', component: LandingPageComponent},
    {path:'entities', component: GetEntitiesComponent},
    {path:'employees', component: GetEmployeesComponent },
    {path:'login', component: LoginComponent },
    {path:'register', component: RegisterComponent },
    {path:'createEntity', component: CreateEntityComponent,canActivate:[isAdminGuard] },
    {path:'createEmployee', component: CreateEmployeeComponent, canActivate:[isAdminGuard] }

];

