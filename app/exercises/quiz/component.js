import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as styles from './styles.css'
import * as fns from './fns.js'
import { generateClassHelper } from '../../shared/shared_fns.js'
import { Exercise_Header } from '../shared/exercise_header/component.js'

import {
    HashRouter,
    Route,
    Link,
} from 'react-router-dom'

const classes = generateClassHelper(styles)

function getQuizQuestion() {
    return 'This is a test question'
}


export class Quiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: this.props.match.params.language, //pass as param in url
            courses: {},
        };

        //get the courses for the language
        this.state.courses = this.getCourses();
    }

    /**
      Returns courses base on the language
    */
    getCourses(){
      fetch(new Request('http://localhost:8080/api/exercises/getCourses', {
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        method: 'POST',
        body: JSON.stringify({
          "language": this.props.match.params.language,
          "exerciseType": "quiz"
          })
      })).then((response) => {
        //get json full response after is done processing
        return response.json();
      }).then((data)=>{
        //return value from above
        console.log(data);
        return data;
      });
    }

    render() {

      if(localStorage.user_id == undefined){
        return(
          <div className={classes('page_container', 'flex_container')}>
            <div className={classes('center_container')}>
                <h1>
                  <center>
                    Please login to see this exercise <Link to='/Login' className={styles.login_link}>here</Link>
                  </center>
                </h1>

            </div>
          </div>
        );
      }

      return (
        <div className={classes('page_container', 'flex_container')}>

            <div className={classes('exercise_container', 'flex_container')}>

              <div className={classes('exercise_header', 'flex_container')}>
                  <Exercise_Header language = {this.state.language} />
              </div>


                <div className={classes('exercise_content', 'flex_container')}>


                    <div className={classes('input_panel', 'flex_container')}>


                        <div className={styles.user_input}>

                            <h5 className={classes('blue_text', 'input_header')}>{getQuizQuestion()}</h5>

                            <div className={classes('quiz_btns_container', 'flex_container')}>
                                <a className={classes('quiz_option')} href="#">First answer to the question
                            which has a bit of a long answer, possibly two lines?
                                </a>
                                <a className={classes('quiz_option')} href="#">Second answer to the question</a>
                                <a className={classes('quiz_option')} href="#">Third answer to the question</a>
                                <a className={classes('quiz_option')} href="#">Fourth answer to the question</a>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
      );


    }
}
