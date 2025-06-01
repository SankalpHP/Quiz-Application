import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent {
   
  showMsg = false;
  message:any;
  showExam:boolean = false;
  showQuestions = true;
  questionId:any = '';

  categoryArray:any[] = [
    {category:"Programming Languages",subcategory:["JavaScript","Python","Java","C","C++","C#","Go","Swift","Rust","Kotlin","Ruby","PHP","TypeScript"]},
    {category:"Web Development",subcategory:["HTML","CSS","JavaScript","React","Angular","Node js","Spring Boot","Django"]},
    {category:"Database & Query Languages",subcategory:["MYSQL","MongoDB"]}
  ];

  subCategoryArray:any[]|undefined;

   ExamId:any;
   Question:any;
   QuestionFormType:any;

   // Creating instance FormGroup
    ExamForm:FormGroup|any;  // Declare a FormGroup to manage the form structure
    QuestionForm:FormGroup|any;

  // Injecting activatedRoute service constructor injection
  // Injecting http service constructor injection
  // Injecting FormBilder service constructor injection
  constructor(private route:ActivatedRoute,private http:HttpService,private fb:FormBuilder){}

  ngOnInit(){
    // getting parameter from the route url
     this.ExamId = this.route.snapshot.paramMap.get('id');
  
    // Initialize the Exam form with empty values first 
     this.ExamForm = this.fb.group({
      examName:['',[Validators.required]],
      examDuration:['',[Validators.required]],
      category:['',[Validators.required]],
      subcategory:['',[Validators.required]],
    });

     if(this.ExamId){
      // Getting the Exam Details by ExamId 
      this.http.getExamById(this.ExamId).subscribe({ // subscribe method consume the observer emitted by the getExamById
        next:(ExamDetails)=>{ // for success
          // if ExamDetails is present
            if(ExamDetails){
              // Initialize the Exam form with Existing Exam details 
              this.ExamForm = this.fb.group({
                examName:[ExamDetails['examName'],[Validators.required]],
                examDuration:[ExamDetails['examDuration'],[Validators.required]],
                category:[ExamDetails['category'],[Validators.required]],
                subcategory:[ExamDetails['subcategory'],[Validators.required]],
              });
            }
            
            // setting the subCategory
            this.SubCategorySet();
        },
        error:(error)=>{ // for error
          console.error(error);
        },
        complete:()=>{ // for complete
          // console.log("Exam By ID is loaded");
        }
      });
     }
    
     //  Question form Initialize
    this.QuestionInitializeForm('add');

    // get question
    this.getQuestion(this.ExamId);
  }
  
  // Switch between exam and questions tabs
     Switch(type:string){
        if(type == 'Exam'){
          this.showExam = false;
          this.showQuestions = true;
        }else{
          this.showExam = true;
          this.showQuestions = false;
        }
     }

   // dropdown subcategory
   SubCategorySet(){
  
       if(this.categoryArray[0].category == this.ExamForm.value.category){
          this.subCategoryArray = this.categoryArray[0].subcategory;
      //  Code from here
       }else if(this.categoryArray[1].category == this.ExamForm.value.category){
          this.subCategoryArray = this.categoryArray[1].subcategory;
       }else{
        this.subCategoryArray = this.categoryArray[2].subcategory;
       }
  }   

   // Exam form submit
   ExamUpdatedForm(){
    // if ExamForm valid
      if(this.ExamForm.valid){
        const {examName,examDuration,category,subcategory} = this.ExamForm.value;
        let body = {
          _id:this.ExamId,
          examName:examName,
          examDuration:examDuration,
          category:category,
          subcategory:subcategory,
        }
        // updating the exam 
         this.http.updateExams(body).subscribe({ // subscribe method consume the observer emitted by the updateExams
            next:(value)=>{// successfully
              // console.log(value);
              this.message = value.message;
            },
            error:(error)=>{// failure
              console.error(error);
            }
         });
      }
   } 

  QuestionInitializeForm(type:any){
    if(type === 'add'){
      //  Question form Initialize
        this.QuestionForm = this.fb.group({
          question:['',[Validators.required]],
          a:['',[Validators.required]],
          b:['',[Validators.required]],
          c:['',[Validators.required]],
          d:['',[Validators.required]],
          correct:['',[Validators.required]],
          marks:['',[Validators.required]]
      });
      this.QuestionFormType = "Add Question";
      // show the successfully msg
      this.showMsg = false;
    }else{
       //  Question form Initialize
       this.QuestionForm = this.fb.group({
        question:[type.question,[Validators.required]],
        a:[type.options.a,[Validators.required]],
        b:[type.options.b,[Validators.required]],
        c:[type.options.c,[Validators.required]],
        d:[type.options.d,[Validators.required]],
        correct:[type.correct,[Validators.required]],
        marks:[type.marks,[Validators.required]]
      });
      // assignment question id
      this.questionId = type._id;
      this.QuestionFormType = "Update Question";
      // show the successfully msg
      this.showMsg = false;
      
    }
  }
   
   // Question form submit
   QuestionFormSubmit(type:any){
      // delete the question
      if(type?.type === "Delete"){
        this.http.deleteQuestion({_id:type._id}).subscribe({ // subscribe method consume the observer emitted by deleteQuestion
          next:(value)=>{ // successfully
            //  console.log(value.msg);
             // Load the question in row
             this.getQuestion(this.ExamId);
          },
          error:(error)=>{ // failed
            console.log(error);
          }
        });
      }else if(this.QuestionForm.valid){
         let body = {
            examId:this.ExamId,
            question:this.QuestionForm.value.question,
            options:{
              a:this.QuestionForm.value.a,
              b:this.QuestionForm.value.b,
              c:this.QuestionForm.value.c,
              d:this.QuestionForm.value.d
            },
            correct:this.QuestionForm.value.correct,
            marks:this.QuestionForm.value.marks,
            _id:type=="Add"?'':this.questionId,
         }
         
        // Saving the Question
        if(type === "Add"){
          this.http.saveQuestion(body).subscribe({ // subscribe method consume the observer emitted by the saveQuestion
            next:(value)=>{// successfully
              // console.log(value);
              
              // set the successfully msg
              this.message = value.msg;
              // show the successfully msg
              this.showMsg = true;

              // Load the question in row
              this.getQuestion(this.ExamId);
            },
            error:(error)=>{// failure
              console.log(error);
            }
          });

          // Updating the Question 
        }else if(type === "Update"){
           this.http.updateQuestion(body).subscribe({ // subscribe method consume the observer emitted by the updateQuestion
              next:(value)=>{ // successfully

                // set the successfully msg
                this.message = value.msg;
                // show the successfully msg
                this.showMsg = true;

                // Load the question in row
                this.getQuestion(this.ExamId);
              },
              error:(error)=>{ // failure
                console.log(error);
              }
           })
        }
      }
   }

  //  get question
  getQuestion(id:string){
    // get Question
    this.http.getQuestion(id).subscribe({ // subscribe method consume the observer emitted by the getQuestion
      next:(value)=>{ // successfully
        // console.log(value);
        this.Question = value
        
        if(this.Question.msg == "No question found"){
          this.Question = false;
        }
      },
      error:(error)=>{ // failure
        console.log(error);
      }
    });
  }
}
