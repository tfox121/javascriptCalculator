
import React from 'react';
import ReactDOM from 'react-dom';

Number.prototype.round = function(places) {
    return Number(Math.round(this + "e+" + places) + "e-" + places);
}

/* eslint-disable react/react-in-jsx-scope */
// eslint-disable-next-line no-undef
class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            log: "",
            current: "0"
        };
        this.clicked = this.clicked.bind(this)
        this.calculate = this.calculate.bind(this)
        this.swapState = this.swapState.bind(this)
        this.operatorSet = this.operatorSet.bind(this)
        this.operatorReset = this.operatorReset.bind(this)
    }

    add = 0

    subtract = 0

    multiply = 0

    divide = 0

    total = 0

    operator = false

    equals = true

    decimal = false

    calculated = false

    clicked(event) {
        switch (event.target.innerHTML) {
            default:
                if (this.state.current === "-") { 
                    this.setState({
                        log: this.subtract === 0
                        ? this.state.log 
                        : this.state.log + this.state.current,
                        current: Number(this.subtract === 0
                            ? this.state.current + event.target.innerHTML
                            : event.target.innerHTML)
                        })
                    this.operator = false
                } else if (this.operator) {
                    this.setState({
                        log: this.state.log + this.state.current,
                        current: Number(event.target.innerHTML)
                        })
                    this.operator = false
                } else {
                    this.setState({
                        log: this.equals ? "" : this.state.log,
                        current: this.equals || this.state.current === "0"
                        ? event.target.innerHTML 
                        : this.state.current + 
                        event.target.innerHTML
                        })
                    this.add = this.equals ? 0 : this.add
                    this.subtract = this.equals ? 0 : this.subtract
                    this.multiply = this.equals ? 0 : this.multiply
                    this.divide = this.equals ? 0 : this.divide
                    this.total = this.equals ? 0 : this.total
                    this.equals = false
                }
                break

            case "AC":
                this.setState({
                    log: "",
                    current: "0"
                })
                this.operatorReset()
                this.total = 0
                this.equals = true
                this.decimal = false
                this.operator = false
                this.calculated = false
                break
            case "=":
                if (!isNaN(this.state.current)) {
 this.calculate()
}
                if (!this.equals && !(this.state.log.slice(0, 1) === "x") && !(this.state.log.toString().slice(0, 1) === "/")) {
                            this.setState({
                                log: this.state.log + this.state.current
                            })
                            if (this.total === 0 && !this.calculated) {
                                this.total = this.state.current
                                this.setState({
                                    log: this.state.current+"=",
                                    current: this.total
                                })
                            } else if (this.operator) {
                                
                                this.setState({
                                    current: this.swapState(),
                                    log: this.state.log+"="
                                })
                            } else {
                                this.setState({
                                    log: this.state.log+this.state.current+"=",
                                    current: this.total
                                })
                            }
                        
                        this.decimal = false
                        this.equals = true
                        this.operator = false
                        this.calculated = false
                }
                break
            case ".":
                if (!this.decimal) {
                    this.setState({
                        log: this.operator ? this.state.log + this.state.current : this.equals ? "" : this.state.log,
                        current:
                            this.state.current === "+" || this.state.current === "-" || this.state.current === "x" || this.state.current === "/" || this.equals
                            ? "0."
                            : this.state.current + event.target.innerHTML
                        })
                    this.add = this.equals ? 0 : this.add
                    this.subtract = this.equals ? 0 : this.subtract
                    this.multiply = this.equals ? 0 : this.multiply
                    this.divide = this.equals ? 0 : this.divide
                    this.total = this.equals ? 0 : this.total
                    this.equals = false
                    this.operator = false
                    this.decimal = true
                }
                break
            case "+":
                this.operatorSet("add", "+")
                break
            case "-":
                this.operatorSet("subtract", "-")
                break
            case "x":
                this.operatorSet("multiply", "x")
                break
            case "/":
                this.operatorSet("divide", "/")
                break
        }
    }

    operatorSet(operatorName, operatorSymbol) {
        if (this.state.current !== 0 && !isNaN(this.state.current)) {
            this.calculate()
        } 
        
        if (this.operator) {
            if (operatorSymbol === "-" && this.add === 0) {
                this.setState({
                    log: this.add === 0 && this.subtract === 0 && this.multiply === 0 && this.divide === 0
                    ? ""
                    : this.state.log + this.state.current,
                    current: operatorSymbol
                })
            } else if (this.state.current === "-") {
                this[operatorName] = this.swapState()
                this.setState({
                    log: this.state.log.slice(0, this.state.log.length-1),
                    current: operatorSymbol
                })
            } else {
                this[operatorName] = this.swapState()
                this.setState({
                    log: this.state.log,
                    current: operatorSymbol
                })
            }
        } else {
            this[operatorName] = Number(this.total !== 0 ? this.total : this.state.current)
                this.setState({
                    log: this.equals ? this.total === 0 ? "" : this.state.current : this.state.log + this.state.current,
                    current: operatorSymbol
                })
            this.operator = true
            this.decimal = false
            this.equals = false
        }
    }

    calculate() {
            if (this.add !== 0) {
                this.total = this.add + Number(this.state.current)
                this.calculated = true
                this.operatorReset()
            } else if (this.divide !== 0) {
                if (this.state.current === "0") {
                    this.total = "INFINITY"
                    this.calculated = true
                    this.operatorReset()
                } else {
                    this.total = this.divide / Number(this.state.current)
                    this.calculated = true
                    this.operatorReset()
                }
            } else if (this.multiply !== 0) {
                this.total = this.multiply * Number(this.state.current)
                this.calculated = true
                this.operatorReset()
            } else if (this.subtract !== 0) {
                this.total = this.subtract - Number(this.state.current)
                this.calculated = true
                this.operatorReset()
            }
        
    }

    swapState() {
        const sum = this.add + this.subtract + this.multiply + this.divide
        this.operatorReset()
        return sum
    }
    
    operatorReset() {
        this.add = 0
        this.subtract = 0
        this.multiply = 0
        this.divide = 0
    }

    render() {
        return (

        <div className="h-100 row align-items-center justify-content-center">
            <div className="col-md-6 text-center">
                <div className="bg-light" id="calculator">
                    <div id="screen">
                        <div className="" id="log">{this.state.log + (this.state.current !== 0 && this.state.current !== "0" ? this.state.current : "").toString().toUpperCase()}</div>
                        <div className="" id="display">{!this.equals ? this.state.current : Number(this.state.current).round(12)}</div>
                    </div>
                    <button id="equals" onClick={this.clicked}>=</button>
                    <button id="zero" onClick={this.clicked}>0</button>
                    <button id="one" onClick={this.clicked}>1</button>
                    <button id="two" onClick={this.clicked}>2</button>
                    <button id="three" onClick={this.clicked}>3</button>
                    <button id="four" onClick={this.clicked}>4</button>
                    <button id="five" onClick={this.clicked}>5</button>
                    <button id="six" onClick={this.clicked}>6</button>
                    <button id="seven" onClick={this.clicked}>7</button>
                    <button id="eight" onClick={this.clicked}>8</button>
                    <button id="nine" onClick={this.clicked}>9</button>
                    <button id="add" onClick={this.clicked}>+</button>
                    <button id="subtract" onClick={this.clicked}>-</button>
                    <button id="multiply" onClick={this.clicked}>x</button>
                    <button id="divide" onClick={this.clicked}>/</button>
                    <button id="decimal" onClick={this.clicked}>.</button>
                    <button id="clear" onClick={this.clicked}>AC</button>
                </div>
                <div className="post">Designed and coded by tom fox</div>
            </div>
        </div>

        );
    }
}

// eslint-disable-next-line no-undef
ReactDOM.render(<Calculator />, document.getElementById('root'))
