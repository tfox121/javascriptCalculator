Number.prototype.round = function(places) {
    return +(Math.round(this + "e+" + places)  + "e-" + places);
}

/* eslint-disable react/react-in-jsx-scope */
// eslint-disable-next-line no-undef
class MarkupInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            log: "",
            current: "0",
            total: 0,
            add: 0,
            subtract: 0,
            multiply: 0,
            divide: 0,
            equals: true,
            decimal: false
        };
        this.clicked = this.clicked.bind(this)
        this.calculate = this.calculate.bind(this)
        this.endLog = this.endLog.bind(this)
        this.swapState = this.swapState.bind(this)
        this.startLog = this.startLog.bind(this)
        this.operatorSet = this.operatorSet.bind(this)
    }

    clicked(event) {
        console.log("YOU CLICKED:", event.target.innerHTML)
        this.startLog()
        if (event.target.innerHTML) {

        }
        switch (event.target.innerHTML) {
            default:
                this.setState({
                    current:
                        this.state.current === "+" || this.state.current === "-" || this.state.current === "x" || this.state.current === "/" || this.state.equals
                        ? event.target.innerHTML
                        : this.state.current + event.target.innerHTML,
                    log: 
                        this.state.equals
                        ? event.target.innerHTML 
                        : this.state.log += event.target.innerHTML,
                    total: this.state.equals ? 0 : this.state.total,
                    add: this.state.equals ? 0 : this.state.add,
                    subtract: this.state.equals ? 0 : this.state.subtract,
                    multiply: this.state.equals ? 0 : this.state.multiply,
                    divide: this.state.equals ? 0 : this.state.divide,
                    equals: false,

                })
                break
            case "AC":
                this.setState({
                    log: "",
                    current: "0",
                    total: 0,
                    add: 0,
                    subtract: 0,
                    multiply: 0,
                    divide: 0,
                    equals: true,
                })
                break
            case "=":
                if (!this.state.equals) {
                    setTimeout(() => {
                        if(this.state.total === 0) {
                            this.setState({
                                log: this.state.current+"="+this.state.current
                            })
                        } else {
                        this.setState({
                            log: this.state.log+"="+this.state.total,
                            current: this.state.total,
                            equals: true
                            })
                        }
                    }, 0);
                }
                break
            case ".":
                this.setState({
                current: this.state.decimal ? this.state.current : `${this.state.current}.`,
                log: this.state.decimal ? this.state.log : `${this.state.log}.`,
                decimal: true,
                })
                break
            case "/":
                if(this.state.current != "/") {
                    this.setState({
                        divide: this.state.total > 0
                        ? this.state.total
                        : this.state.current,
                        log: `${this.state.log}/`,
                        current: "/",
                    })}
                if(this.state.equals) {
                    this.setState({
                        log: `${this.state.current}/`,
                        equals: false
                    })
                }
                break
        }
        if ((event.target.innerHTML == "+" || event.target.innerHTML == "-" || event.target.innerHTML == "x" || event.target.innerHTML == "/" || event.target.innerHTML == "=") && this.state.current > 0) {
                this.calculate()
        }

        this.endLog()
        // Console.log(this.state.total)
    }

    operatorSet(operator, operatorSymbol) {
        this.setState({
            operator: this.state.total > 0
            ? this.state.total
            : this.state.current
        })
        this.setState({
            log: `${this.state.log}/${operatorSymbol}`,
            current: operatorSymbol
        })
    }

    endLog() {
        setTimeout(() => {
            console.log("Current:", this.state.current)
            console.log("Divide:", this.state.divide)
            console.log("Total:", this.state.total)
            console.log("------------END---------------")
        }, 0);
    }

    startLog() {
        console.log("------------START-------------")
        console.log("Current:", this.state.current)
        console.log("Divide:", this.state.divide)
        console.log("Total:", this.state.total)
        console.log("------------------------------")
    }

    calculate() {
        console.log("Calulcating...")
        if (this.state.add > 0) {
            console.log("Adding...")
            this.setState({
                total: this.state.add + this.state.current,
                add: 0,
            })
        } else if (this.state.divide > 0) {
            console.log("Dividing...", this.state.divide, this.state.current)
            this.setState({
                total: (this.state.divide / this.state.current).round(12),
                divide: 0,
            })
        }

        this.setState({

            subtract: 0,
            multiply: 0,

        })
    }

    swapState() {
        const sum = this.state.add + this.state.subtract + this.state.multiply + this.state.divide

        this.setState({
            add: 0,
            subtract: 0,
            multiply: 0,
            divide: 0,
        })
        return sum
    }

    


    render() {
        return (

        /*
         *<div className="container-fluid" id="primary">
         * <div className="card bg-success mx-auto" id="editor-box">
         * <div className="card-header">Editor</div>
         * <textarea className="card-body" id="editor" value={this.state.input} onChange={this.handleChange}></textarea>
         * </div>
         * <br />
         * <div className="card bg-warning mx-auto" id="preview-box">
         * <div className="card-header">Previewer</div>
         * <div className="card-body" id="preview">{this.state.input}</div>
         * </div>
         *</div>
         */

        <div className="h-100 row align-items-center" id="wrapper">
            <div className="row mx-auto bg-light" id="calculator">
            <div id="display">
                <div className="" id="log">{this.state.log}</div>
                <div className="" id="current">{this.state.current}</div>
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
        </div>

        );
    }
}

// eslint-disable-next-line no-undef
ReactDOM.render(<MarkupInput />, document.getElementById('render'))

const operators = {
    "x": "*"
}

