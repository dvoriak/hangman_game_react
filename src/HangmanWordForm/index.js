import React from "react";
import hangman_image0 from '../resources/hangman_images/0.jpeg';
import hangman_image1 from '../resources/hangman_images/1.jpeg';
import hangman_image2 from '../resources/hangman_images/2.jpeg';
import hangman_image3 from '../resources/hangman_images/3.jpeg';
import hangman_image4 from '../resources/hangman_images/4.jpeg';
import hangman_image5 from '../resources/hangman_images/5.jpeg';
import hangman_image6 from '../resources/hangman_images/6.jpeg';

const hangmanImages = [
    hangman_image0,
    hangman_image1,
    hangman_image2,
    hangman_image3,
    hangman_image4,
    hangman_image5,
    hangman_image6,
]

const defaultState = {
    error: '',
    word: 'default',
    char: '',
    hiddenWordArray: [],
    missedCharacters: [],
};

class HangmanWordForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = defaultState;
    }
    validateInputText = () => {
        if (this.state.word.length > 15) {
            this.setState({...this.state, error: 'Word must be shorter'});
        } else if (this.state.word.includes(' ')) {
            this.setState({...this.state, error: 'There must be just 1 word'});
        }
        else {
            this.setState({...this.state, error: ''});
        }
    }

    validateInputChar = () => {
        if (this.state.char.length > 1) {
            this.setState({...this.state, error: 'Char must be just one letter'});
        }
    }

    handleWordInputChange = (event) => {
        console.log('handleWordInputChange', event.target);
        this.setState({
            ...this.state,
            word: event.target.value.toLowerCase()
        });
    }

    handleCharInputChange = (event) => {
        console.log('handleCharInputChange', event.target);
        this.setState({
            ...this.state,
            char: event.target.value.toLowerCase()
        });
    }

    handleWordSubmit = (event) => {
        event.preventDefault();
        this.validateInputText();
        this.setState({
            ...this.state,
            hiddenWordArray: this.createUnderscoresFromWord()
        });
    }

    handleCharSubmit = (event) => {
        event.preventDefault();
        this.validateInputChar();
        if (this.state.word.includes(this.state.char)){
            this.openHiddenWordLetterFromChar();
        } else {
            this.addToUsedChars();
        }
        if (this.state.missedCharacters.length === 6) {
            this.setState(defaultState);
        }
    }

    createUnderscoresFromWord() {
        let  outputArray = [];
        for (var i = 0; i < this.state.word.length; i++) {
            outputArray.push('_ ');
        }
        return outputArray
    }

    openHiddenWordLetterFromChar() {
        let word = this.state.word;
        let hiddenWordArray = this.state.hiddenWordArray;
        let char = this.state.char;
        let lettersToOpen = [];

        for (var i = 0; i < word.length; i++) {
            if (word[i] === char) {
                lettersToOpen.push(i);
            }
        }

        lettersToOpen.forEach(element => {
            hiddenWordArray[element] = char;
        })

        this.setState({
            ...this.state,
            hiddenWordArray: hiddenWordArray});
    }

    addToUsedChars() {
        if (!this.state.missedCharacters.includes(this.state.char)) {
            this.setState({
                ...this.state,
                missedCharacters: [...this.state.missedCharacters, this.state.char ],
            });
        }
    }
    
    render() {
        return(
            <div>
                <h3 style={{color: "red"}}>{this.state.error}</h3>
                <p>HangmanWordForm</p>
                <form onSubmit={this.handleWordSubmit}>
                    <input type="text" onChange={this.handleWordInputChange} value={this.state.word}></input>
                    <input type="submit"></input>
                </form>
                <h1>{this.state.hiddenWordArray}</h1>
                <p>CharInputForm</p>
                <form onSubmit={this.handleCharSubmit}>
                    <input type="text" onChange={this.handleCharInputChange} value={this.state.char}></input>
                    <input type="submit"></input>
                </form>
                <p>Characters that are not in the word</p>
                <h3>{this.state.missedCharacters.join(', ')}</h3>
                <img src={hangmanImages[this.state.missedCharacters.length]} alt="Man being hanged"></img>
            </div>
        )
    }
}

export default HangmanWordForm;