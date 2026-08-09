import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ReciveComponent } from './recive/recive.component';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'products',
                component: ProductListComponent
            },
            {
                path: 'products/add',
                component: ProductFormComponent
            },
            {
                path: 'products/edit/:id',
                component: ProductFormComponent
            },

            {
                path: 'receive/:id',
                component: ReciveComponent
            },

            {
                path: 'transactions',
                component: TransactionsComponent
            }
        ]
    }


];
