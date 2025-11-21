import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-interview-evaluation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './interview-evaluation.component.html',
  styleUrl: './interview-evaluation.component.scss'
})
export class InterviewEvaluationComponent {
  private fb = inject(FormBuilder);

  evaluationForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    puesto: ['', Validators.required],
    categoria: ['', Validators.required],
    clonar: [''],
    preguntas: this.fb.array([])
  });

  get preguntas() {
    return this.evaluationForm.get('preguntas') as FormArray;
  }

  opciones(index: number) {
    return this.preguntas.at(index).get('opciones') as FormArray;
  }

  addPregunta() {
    const preguntaGroup = this.fb.group({
      texto: ['', Validators.required],
      nivel: ['', Validators.required],
      tipo: ['seleccion', Validators.required],
      peso: ['', Validators.required],
      esObligatorio: [false],
      parametroIA: [''],
      opciones: this.fb.array([])
    });

    this.preguntas.push(preguntaGroup);
    this.addOpcion(this.preguntas.length - 1);
  }

  removePregunta(index: number) {
    this.preguntas.removeAt(index);
  }

  addOpcion(questionIndex: number) {
    const opcionGroup = this.fb.group({
      nombre: ['', Validators.required],
      esRespuesta: [false]
    });

    this.opciones(questionIndex).push(opcionGroup);
  }

  removeOpcion(questionIndex: number, optionIndex: number) {
    this.opciones(questionIndex).removeAt(optionIndex);
  }

  showModal: boolean = false;
  submittedData: any = null;

  onSubmit() {
    if (this.evaluationForm.valid) {
      console.log('Formulario enviado:', this.evaluationForm.value);
      this.submittedData = this.evaluationForm.value;
      this.showModal = true;
    } else {
      console.log('Formulario inválido');
      this.evaluationForm.markAllAsTouched();
    }
  }

  closeModal() {
    this.showModal = false;
    this.submittedData = null;
  }
}