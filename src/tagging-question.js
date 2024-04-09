import { html, css } from "lit";
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";

export class PartyUI extends DDD { //PERSON GRADING THIS: PLEASE LET ME KNOW OF THINGS I CAN IMPROVE, CHANGE ETC IN CANVAS GRADE COMMENTS IN EACH CHECKPOINT. THANKS!

  static get tag() {
    return 'tagging-question';
  }

  static get properties() {
    return {
      ...super.properties,
      
    };
  }

  constructor() {
    super();
    
  }

  static get styles() {
    return [
      super.styles,
      css`

      :host {
        display: block;
      }

      

    `];
  }
  


  render() {
    return html`
    
    <div class= "question-wrapper">
        <h1>This is a placeholder!</h1>




     
    </div>
   
    `;
  }

  
}

customElements.define(PartyUI.tag, PartyUI);