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
      optionalImage: {type: String},
      answers: { type: Array }, 
      unshuffledAnswers: {type: Array }, //I had to create an unshuffled answers array list due to issues with the shuffleAnswers() method interfering with index numbers, thus making it impossible to print the correct explanations for wrong answers. This is the only solution I found.
      droppedAnswer: { type: String },
      correctAnswers: { type: Array },
      explanations: { type: Array},


      
    };
  }

  constructor() {
    super();
    this.question = "What color is the sky?";
    this.optionalImage = null;
    this.answers = ["Red","Blue","Light Blue","Pink","Black","Yellow","Azul","Blueish","RAINBOW!","Sky Blue"];
    this.unshuffledAnswers = ["Blue","Light Blue","Sky Blue","Blueish","Azul","Yellow","Pink","Black","RAINBOW!","Red"]; 
    this.droppedAnswer = null;
    this.correctAnswers = ["Blue","Light Blue","Sky Blue","Blueish","Azul"]; //Correct answers in this array list for identification
    this.submitDisabled = false;
    this.optionalImage = "https://wallpaperaccess.com/full/530682.jpg"; //If image set to null, iamge is gone and leaves no placeholder seamlessly
    this.explanations = [
      "The sky is blue.",
      "At sunrise, the sky can appear light blue",
      "Sky blue is the color of the sky, believe it or not!",
      "The sky is indeed blueish.",
      "Azul means blue in spanish.",
      "The sky is definitely NOT yellow!",
      "A pink sky would certainly be weird.",
      "The sky is black at night due to low light, but technically the sky isn't this color...", //All explanations in order. These are for my instance, I decided to set them as default for efficiency.
      "Hope the humor was worth it!",
      "On red planet mars maybe..? But I'm no astronomer!"
    ]

     
  }

  //Decided to use similar styles to what I used one project one, I just find them attractive. Also makes the two projects more cohesive.

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

      .optional-image img
      {
        max-height: 500px;
        margin: var(--ddd-spacing-10);
        width: auto;
      }

      .optional-image
      {
        display: flex;
        justify-content: center;
        align-items: center;

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

      .answer-chips p 
      {
        background-color: var(--ddd-theme-default-link80);
        text-align: center;
        margin: var(--ddd-spacing-4);
        padding: var(--ddd-spacing-1);
        transition: background-color 0.4s ease-in-out;

      }

      .answer-chips p:hover 
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

      .correct 
      {
        box-shadow: 0 0 10px 2px rgba(0, 255, 0, 1.0);
      }


      .incorrect 
      {
        box-shadow: 0 0 10px 2px rgba(255, 0, 0, 1.0);
     }

      

    `];
  }
//Sets data of answer  being dragged for easy transfer to drop zone
  handleDragStart(event, answer) 
  {
    event.dataTransfer.setData("text/plain", answer);
  }

//Prevents default of element being dragged
  handleDragOver(event) 
  {
    event.preventDefault();
  }
//Below is where actual transfer happens
  handleDrop(event) 
  {
    event.preventDefault();
    const answer = event.dataTransfer.getData("text/plain");
    this.droppedAnswer = answer;
    const dropZone = this.shadowRoot.getElementById('drop-zone');
    dropZone.innerHTML = `<p>${answer}</p>`;
  }
  

  
//For RENDER: Line 228 is from chatGPT. This section of code generates the list of answer choices and creates draggable <p> elements for each index in answers array, where it passes to handleDragStart when drag operation starts


  render() {
    return html`
     <confetti-container id="confetti">
    
    <div class= "question-wrapper">

    
        <div class= "question">

          <div class= "title-icon">
            <h1 class="test-knowledge">Test your knowledge!</h1> <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fclipartcraft.com%2Fimages%2Fquestion-mark-transparent-background-1.png&f=1&nofb=1&ipt=42894b62a02c15d9247f1d0e36382a5d1a2cfdf522c9d3bb748d6c1bc653c3e2&ipo=images" alt="Icon" />
          </div>

           <slot class="optional-image">${this.optionalImage ? html`<img src="${this.optionalImage}" alt="Optional Image" />` : ''}</slot>

          
          <h2>${this.question}</h2>

        </div>

        <div class="potential-answers-wrapper">
          <h4>Answer Choices:</h4>

            <div class = "answer-chips"> 
            ${this.answers.map((answer, index) => html`
              <p id="answer${index + 1}" draggable="true" @dragstart=${(e) => this.handleDragStart(e, answer)}>${answer}</p> 
            `)}
             
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
  //Make it rain code taken from like week 3 or something lol, i just added some audio 

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

 

  handleSubmit(event) {
    this.answers.forEach((answer, index) => {
      // Check if the current answer is in the correct answers list
      if (this.correctAnswers.includes(answer)) {
        // If it is correct, assign a class to make it glow green see above css 
        this.shadowRoot.getElementById(`answer${index + 1}`).classList.add('correct');
      } else {
        // If it is incorrect, assign a class to make it glow red
        this.shadowRoot.getElementById(`answer${index + 1}`).classList.add('incorrect');
      }
    });

    if (this.correctAnswers.includes(this.droppedAnswer)) {
      this.makeItRain();
      alert(`Correct! ${this.explanations[this.correctAnswers.indexOf(this.droppedAnswer)]}`);
    } else {
      // This part i struggled a lot with, and had to do a lot of research. The shuffle answers interferes with the index numbers, making it extremely difficult to map each answer to its proper explanation. but i was able to figure this out eventually
      if (this.answers.includes(this.droppedAnswer) && !this.correctAnswers.includes(this.droppedAnswer)) {
        const error = new Audio('https://www.myinstants.com/media/sounds/error_CDOxCYm.mp3');
        error.play();
        alert(`Wrong! ${this.explanations[this.unshuffledAnswers.indexOf(this.droppedAnswer)]}`);
      } 
    }


    
    event.target.disabled = true; //SUBMIT Button disables itself when pressed until reactivated by reset button
  }

  

  handleReset(event) {

    this.answers.forEach((answer, index) => {
      const answerElement = this.shadowRoot.getElementById(`answer${index + 1}`); //Removes all the incorrect/correct attributes from each element, therefore removing the glowing red or green colr respectively.
      if (answerElement) {
        answerElement.classList.remove('correct', 'incorrect');
      }
    });

    
    this.shuffleAnswers(); //Shuffles all answers so people cant cheat
    this.droppedAnswer = null; //Resets dropped answer.
    const dropZone = this.shadowRoot.getElementById('drop-zone');
    dropZone.innerHTML = `<p>Drop answer here!</p>`;
    this.submitDisabled = false;

    const submitButton = this.shadowRoot.querySelector('.buttons button:first-child'); //This button reactivation on reset is from ChatGPT, but I do understand how it works.
    if (submitButton) {
        submitButton.disabled = false;
    }
  }

  shuffleAnswers() {
    const answers = [...this.answers]; // This is from chatGPT, shuffles all answers using functions like math.random
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    this.answers = answers; // Updates the answers array with the  generated shuffled values
}


  

  
}

customElements.define(TaggingQuestion.tag, TaggingQuestion);