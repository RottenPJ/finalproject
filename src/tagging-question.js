import { html, css } from "lit";
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";

export class TaggingQuestion extends DDD { //PERSON GRADING THIS: PLEASE LET ME KNOW OF THINGS I CAN IMPROVE, CHANGE ETC IN CANVAS GRADE COMMENTS IN EACH CHECKPOINT. THANKS!

  static get tag() {
    return 'tagging-question';
  }

  static get properties() {
    return {
      ...super.properties,
      question: { type: String },
      answer1: { type: String }, //Answer1 is correct answer every time. 
      answer2: { type: String },
      answer3: { type: String },
      answer4: {type: String },
      droppedAnswer: { type: String },
      wrongExplanation: { type: String },
      correctAnswer: { type: String }


      
    };
  }

  constructor() {
    super();
    this.question = "What color is the sky?";
    this.answer1 = "Blue";
    this.answer2 = "Red";
    this.answer3 = "Yellow";
    this.answer4 = "Pink";
    this.droppedAnswer = null;
    this.correctAnswer = "Blue";
    this.wrongExplanation = "You need to touch grass. Go outside."
    
  }

  static get styles() {
    return [
      super.styles,
      css`

      :host {
        display: block;
      }

      .question-wrapper
      {
        margin: var(--ddd-spacing-2); 
        color: var(--ddd-theme-default-beaverBlue);
        border: 3px solid black;
        background-color: var(--ddd-theme-default-pughBlue);
        padding: var(--ddd-spacing-2);
      }

      .title-icon
      {
        display: flex;
        margin: var(--ddd-spacing-1);

      }
      
      .title-icon img
      {
        height: 80px;
        width: 80px;
        display: flex;
        align-items: center;
        margin-top: var(--ddd-spacing-4);
        margin-left: var(--ddd-spacing-5);
      }

      .test-knowledge
      {
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        
        
      }

      .potential-answers
      {
        border: 3px solid black;
        padding: var(--ddd-spacing-1);
      }

      .answer-chips
      {
        display: inline;
        
      }

      #answer1
      {
        background-color: var(--ddd-theme-default-link80);
        text-align: center;
        margin: var(--ddd-spacing-1);
        padding: var(--ddd-spacing-1);
        transition: background-color 0.4s ease-in-out;
      }

      #answer1:hover 
      {
        background-color: var(--ddd-theme-default-skyLight);
      }

      #answer2
      {
        background-color: var(--ddd-theme-default-link80);
        text-align: center;
        margin: var(--ddd-spacing-1);
        padding: var(--ddd-spacing-1);
        transition: background-color 0.4s ease-in-out;
      }

      #answer2:hover 
      {
        background-color: var(--ddd-theme-default-skyLight);
      }

      #answer3
      {
        background-color: var(--ddd-theme-default-link80);
        text-align: center;
        margin: var(--ddd-spacing-1);
        padding: var(--ddd-spacing-1);
        transition: background-color 0.4s ease-in-out;
      }

      #answer3:hover 
      {
        background-color: var(--ddd-theme-default-skyLight);
      }

      #answer4
      {
        background-color: var(--ddd-theme-default-link80);
        text-align: center;
        margin: var(--ddd-spacing-1);
        padding: var(--ddd-spacing-1);
        transition: background-color 0.4s ease-in-out;
      }

      #answer4:hover 
      {
        background-color: var(--ddd-theme-default-skyLight);
      }

      #drop-zone
      {
        background-color: var(--ddd-theme-default-link80);
        padding: var(--ddd-spacing-3);

      }

      .buttons button
      {
        padding: var(--ddd-spacing-1);
        margin-bottom: var(--ddd-spacing-4);
        margin-top: var(--ddd-spacing-4);
        background-color: var(--ddd-theme-default-link80);
        color: var(--ddd-theme-default-beaverBlue);
        margin-left: var(--ddd-spacing-1);


      }

      

    `];
  }

  handleDragStart(event, answer) 
  {
    event.dataTransfer.setData("text/plain", answer);
  }

  handleDragOver(event) 
  {
    event.preventDefault();
  }

  handleDrop(event) 
  {
    event.preventDefault();
    const answer = event.dataTransfer.getData("text/plain");
    this.droppedAnswer = answer;
    const dropZone = this.shadowRoot.getElementById('drop-zone');
    dropZone.innerHTML = `<p>${answer}</p>`;
  }

  


  render() {
    return html`
     <confetti-container id="confetti">
    
    <div class= "question-wrapper">

    
        <div class= "question">

          <div class= "title-icon">
            <h1 class="test-knowledge">Test your knowledge!</h1> <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fclipartcraft.com%2Fimages%2Fquestion-mark-transparent-background-1.png&f=1&nofb=1&ipt=42894b62a02c15d9247f1d0e36382a5d1a2cfdf522c9d3bb748d6c1bc653c3e2&ipo=images" alt="Icon" />
          </div>

          <slot> </slot> <!-- Slot for an image if needed -->

          
          <h2>${this.question}</h2>

        </div>

        <div class="potential-answers-wrapper">
          <h4>Answer Choices:</h4>

            <div class = "answer-chips">
             <p id="answer1" draggable="true" @dragstart=${(e) => this.handleDragStart(e, this.answer1)}>${this.answer1}</p>
             <p id="answer2" draggable="true" @dragstart=${(e) => this.handleDragStart(e, this.answer2)}>${this.answer2}</p>
             <p id="answer3" draggable="true" @dragstart=${(e) => this.handleDragStart(e, this.answer3)}>${this.answer3}</p>
             <p id="answer4" draggable="true" @dragstart=${(e) => this.handleDragStart(e, this.answer4)}>${this.answer4}</p>
            </div>
        
        </div>

        <div class="insert-answer">
          <h4>Drag and drop the correct answer here:</h4>
          <div id="drop-zone" @drop=${this.handleDrop} @dragover=${this.handleDragOver}>
          ${this.droppedAnswer ? html`<p>${this.droppedAnswer}</p>` : html`<p>Drop answer here!</p>`}
        </div>

        </div>


        <div class="buttons">
          <button @click=${this.handleSubmit}>Submit</button>
          <button @click=${this.handleReset}>Reset</button>
        </div>
        
    </div>
    </confetti-container>
   
    `;
  }

  makeItRain() {
    
    import("@lrnwebcomponents/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        
        setTimeout(() => {
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");  //Make it rain code, given to us by Prof 
        }, 0);
        const success = new Audio('https://hax.psu.edu/cdn/1.x.x/build/es6/node_modules/@lrnwebcomponents/app-hax/lib/assets/sounds/success.mp3');   //Code has sound effects, turn sound on!!!!
      success.play();
      } 
      
    );
  }

 

  handleSubmit() {
    if (this.droppedAnswer === this.correctAnswer) {
      this.makeItRain();
    } else {
      alert(`Sorry, the correct answer is: ${this.correctAnswer}. ${this.wrongExplanation}`);
    }
  }

  

  handleReset() {
    this.droppedAnswer = null;
  }

  

  
}

customElements.define(TaggingQuestion.tag, TaggingQuestion);