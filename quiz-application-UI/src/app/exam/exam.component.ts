import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.scss'
})
export class ExamComponent {
  
  message:any
  showMsg:boolean = false;
  Exams:any|undefined;
  categoryArray:any[] = [
    {category:"Programming Languages",subcategory:["JavaScript","Python","Java","C","C++","C#","Go","Swift","Rust","Kotlin","Ruby","PHP","TypeScript"]},
    {category:"Web Development",subcategory:["HTML","CSS","JavaScript","React","Angular","Node js","Spring Boot","Django"]},
    {category:"Database & Query Languages",subcategory:["MYSQL","MongoDB"]}
  ];

  subCategoryArray:any[]|undefined = this.categoryArray[0].subcategory;

  // Creating instance FormGroup
  ExamForm:FormGroup;  // Declare a FormGroup to manage the form structure

  // Inject FormBuilder service to simplify form creation (constructor injection)
  // Inject http service to call backend api (constructor injection)
  constructor(private fb:FormBuilder,private http:HttpService){
    // Initialize FormGroup using FormBuilder
    this.ExamForm = this.fb.group({
        examName:['',[Validators.required,Validators.pattern(/^\S.*\S$/)]], // formControlName fields with empty values "" and validators []
        examDuration:['',[Validators.required]],
        category:['',[Validators.required]],
        subcategory:['',[Validators.required]],
    });
  }

  ngOnInit(){
    // getting the exams
    this.getExam();
  }

  // get Exams 
  getExam(){
    // get the exams data 
    this.http.getExams().subscribe({ // subscribe method consume the observer emitted by the getExams
      next:(value)=>{ // for success
          this.Exams = value

          if(this.Exams.msg == "No exams found!"){
            this.Exams = false;
          }
          // console.log(this.Exams);   
      },
      error:(err)=> { // for error
         console.log(err);
      },
      complete:()=>{ // for complete
        // console.log("Exams are loaded");
      },
    })
  }
  
  // dropdown subcategory
  SubCategorySet(){
    // console.log(this.ExamForm.value);
       if(this.categoryArray[0].category == this.ExamForm.value.category){
          this.subCategoryArray = this.categoryArray[0].subcategory;
      //  Code from here
       }else if(this.categoryArray[1].category == this.ExamForm.value.category){
          this.subCategoryArray = this.categoryArray[1].subcategory;
       }else{
        this.subCategoryArray = this.categoryArray[2].subcategory;
       }
  }
 
  // Submit Exam Form function
  ExamFormSubmit(){
    // if form is not invalid
    if(!this.ExamForm.invalid){
      //  console.log(this.ExamForm.value);
       // save the exams data 
       this.http.addExams(this.ExamForm.value).subscribe((data)=>{
        // set the successfully added message
          this.message = data.message;
        // show the message
          this.showMsgBox('Successfully');
          // Load exams again in table
          this.getExam();
       });
    }
  }

  // Delete Exam
  RemoveExams(examId:string){
    let body = {
      examId:examId
    }
    // deleting the exam 
    this.http.deleteExams(body).subscribe({ // subscribe method cosume the observer emitted by deleteExams
        next:(value)=>{ // successfully
            // console.log(value);
            // load the exam in table
            this.getExam();
        },
        error:(error)=>{ // failed
          console.log(error);
        }
    });
  }
  
  // show/hide msg box 
  showMsgBox(type:string){
    if(type == "Add")
      // hide the successfully added message
      this.showMsg = false;
    else if(type == "Successfully")
      this.showMsg = true
  }
}
