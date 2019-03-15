import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule, MatTableModule, MatMenuModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatDatepicker, MatDatepickerModule, MatNativeDateModule, MatRadioModule, MatOptionModule, MatSlideToggleModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,    
    MatDatepickerModule,        
    MatNativeDateModule,      
    MatRadioModule,          
    MatOptionModule,      
    MatSlideToggleModule   
    
  ],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,    
    MatDatepickerModule,
    MatNativeDateModule,      
    MatRadioModule,          
    MatOptionModule,      
    MatSlideToggleModule   
  ]
})
export class MaterialModule { }
