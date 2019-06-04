import React , { Component } from 'react';
import moment from 'moment';

class CreateExpense extends Component {
  state = {
    doc_no:null,
    category:'',
    date:new Date(),
    expenseAccount:'',
    cashAmount:'',
    total:null,
    narration:'',

  }
  componentDidMount(){
    this.setState({
      date:moment(new Date()).format('YYYY-MM-DD'),
    })
  }
  handleInputChange = (event) => {
    event.preventDefault();
    console.log(event.target.name,event.target.value)
    let key = event.target.name
    let  value = event.target.value
  this.setState({[key]:value})

  }
  render() {
    return(
      <div>

        <br />
        <div className="row-wrapper1">
          <div><h1 className="ptag"> Create Expense</h1></div>

        </div>
        <br />
        <div className="row-wrapper">
          <div>
            <label>Doc No</label><br />
            <input readOnly className="grand"  />
          </div>
          <div>
            <label>CATEGORY</label><br />
            <select className="select" onChange={(e) => this.setState({selectedName:e.target.value})}>
                <option value=""></option>

            </select>
          </div>
          <div>
          <label>DATE</label><br />
          <input
              className="dates"
              type='date'
              name='date'
              value={this.state.date}
              onChange={this.handleInputChange}
              required='required'/>
          </div>
        </div>
        <br />
        <div className="row-wrapper">
          <div>
            <label>EXPENSE ACCOUNT</label><br />
            <select className="select" onChange={(e) => this.setState({selectedName:e.target.value})}>
                <option value=""></option>

            </select>
          </div>
          <div>
          <label>CASH AMOUNT</label><br />
          <select className="select" onChange={(e) => this.setState({selectedName:e.target.value})}>
              <option value=""></option>
          </select>
          </div>
          <div>
            <label>TOTAL</label><br />
            <input readOnly className="grand"  />
          </div>
        </div>
        <br  />
        <div>
              <label>NARRATION</label><br />
              <input
                className="narration"
                name="narration"
                onChange={this.handleInputChange}
                value={this.state.narration}/>
        </div>
        <br />
        <div className="btn-gap-reciept">

        <div>
        <button className="cancelBtn" onClick={this.submitDataHandler}>SAVE</button>
        </div>
        <div>
        <button className="cancelBtn" onClick={(e)=>this.cancelDataHandler(e)}>CANCEL</button>
        </div>
        </div>

      </div>
    )
  }
}
export default CreateExpense
