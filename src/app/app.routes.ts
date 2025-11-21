import { Routes } from '@angular/router';
import { InterviewEvaluationComponent } from './components/product-reviews/interview-evaluation.component';

export const routes: Routes = [
    { path: '', component: InterviewEvaluationComponent },
    { path: '**', redirectTo: '' }
];
