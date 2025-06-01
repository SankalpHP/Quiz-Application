import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrl: './start-quiz.component.scss'
})
export class StartQuizComponent {
  
  examId:any;
  quizQuestions:any;
  quizIndex:number = 0;
  question:any;
  showQuiz:boolean = false;
  selectedOption:any;
  btnType:string = "Next";
  timerInterval:any;
  displayTimer:any;
  userId:number = 0;

  // Inject the ActivatedRoute service, http service
  constructor(private route:ActivatedRoute, private http:HttpService){}

  ngOnInit(){

    // get the token from browser localStorage 
    const token = localStorage.getItem('token');
    if(token != null){
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.userId = payload.id;
    }
    

    // getting parameter from the url
    this.examId = this.route.snapshot.paramMap.get('id');
    // getting question by exam Id
    this.getQuestions(this.examId);
     
    // getting quiz duration
      this.getQuizDuration(this.examId);
  }

  // get questions
  getQuestions(id:any){
    this.http.getQuestion(id).subscribe({ // subscribe method consume the observer emitted by getQuestion
        next:(value)=>{ // successfull
          this.quizQuestions = value;
          // Setting the first question
          this.question = this.quizQuestions[this.quizIndex];
          // ShowQuiz
          this.showQuiz = true;
        },
        error:(error)=>{ // failed
          console.log(error);
        }
    })
  }
 
  // next Question in the quiz
  nextQuestion(type:any){
    // console.log(type);
    // console.log(this.selectedOption);
    
    // next question setting
    this.quizIndex += 1;
    this.question = this.quizQuestions[this.quizIndex];
    
    if(this.quizIndex === this.quizQuestions.length-1){
      this.btnType = "Submit";
    }else if(this.quizIndex === this.quizQuestions.length){
      this.question = `You’ve successfully completed the exam!
      Thank you for your time and effort. We wish you the very best in your results!`;
      this.showQuiz = false;
      clearInterval(this.timerInterval);
    }
  }
   
  // submit the quiz question
  questionSubmit(selected:any){
        // adding class to selected option
        this.selectedOption = selected;
    
        let Correct = false;
        
        // Checking the user Answer
        for (const key in this.question.options) {
            const element = this.question.options[key];
            // If user ans is correct 
            if(element === selected && key === this.question.correct)
              Correct = true;
        }
        
        let body = {
          questionId:this.question._id,
          examId:this.question.examId,
          question:this.question.question,
          options:{
            a:this.question.options.a,
            b:this.question.options.b,
            c:this.question.options.c,
            d:this.question.options.d,
          },
          correct:this.question.correct,
          userSelected:selected,
          userId:this.userId,
          isCorrect:Correct,
          marks:this.question.marks,
          attempted:true
        };

        // save the quiz
        this.http.saveQuiz(body).subscribe({ // subscribe method consume the observer emitted by the saveQuiz 
          next:(value)=>{ // successfully
            // console.log(value);
          },
          error:(error)=>{ // failed
            console.log(error);
          }
        });
  }

  // getting quiz duration
  getQuizDuration(examId:any){
    this.http.getDuration(examId).subscribe({ // subscribe method consume the observer emitted by the getDuration
      next:(value)=>{ // successfully
        // Starting the quiz timer
        this.timer(value.examDuration); // Start the timer
      },
      error:(error)=>{ // failed
        console.log(error);
      }
    });
  }

  // exam timer
  timer(minute:number){
    let seconds:number = minute * 60;
    let textSec:any = '0';
    let statsec:number = 60;

    const prefix = seconds < 10 ? '0':'';

     this.timerInterval = setInterval(()=>{
      seconds--;

      if(statsec != 0){
        statsec--
      }else{
        statsec = 59;
      }

      if(statsec < 10){
         textSec = '0'
      }else{
         textSec = statsec;
      }

      this.displayTimer = `${prefix}${Math.floor(seconds/60)}:${textSec}`;

      if(seconds == 0){
        // console.log('Exam finished!');
        clearInterval(this.timerInterval);

      // final message
        this.question = `You’ve successfully completed the exam!
                          Thank you for your time and effort. We wish you the very best in your results!`;
        this.showQuiz = false;
      }
    },1000);
  }  
}