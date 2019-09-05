import React , { Component } from 'react';
import axios from '../../../axios'
import {Bar,Pie,Doughnut} from 'react-chartjs-2';

class UserYearviceChart extends Component {
  state = {
    selectedOption:'option1',
    customer:[],
    users:[],
    selectedName:'',
    selectedYear:'',
    yearList:[],
    isNameselected:true,
    customer_year_data:[],
    year:[]

  }
  componentDidMount(){
    this.loadCustomer()
    this.userchart()
    this.loadYear()
    this.loadCustomerYearChart()

  }
  loadYear=()=>{
    axios.get('invoice/sales-year-chart/').then(
      res=> {
          this.setState({yearList:res.data});
          console.log(res.data.map(i=>i.year))

      }
    )
  }
  loadCustomer=()=>{
    axios.get('invoice/partner/').then(
      res => {
        this.setState({customer:res.data});
        console.log(res.data)
      }
    )
  }

  userchart=()=>{
    axios.get('invoice/sales-partner-chart/').then(
      res => {
        this.setState({users:res.data});
        console.log(res.data)
      }
    )
  }
  loadCustomerYearChart =()=> {
    axios.get('/invoice/sales-PartnerWithYear-chart/').then(res => {
      this.setState({customer_year_data:res.data});
    })
  }

  handleOptionChange=(e)=> {
    this.setState({
     selectedOption: e.target.value
   });
  }
  customerChangeHandler =(e)=> {
    this.setState({selectedName:e.target.value,isNameselected:false})

  }
  testrender = () => {
    const year = Number(this.state.selectedYear)
    console.log(this.state.customer_year_data)

    let test = [this.state.customer_year_data.filter(m=>this.state.selectedName === m.customer && year === m.year)[0]]
    // let test1 = this.state.customer_year_data.filter(m=>console.log(typeof m.year))

    console.log(test)
    if (test[0] !== undefined){
      let x =[]
      x = test.map(element=> element.child)[0]
      let month = []
      let amount = []
      x.forEach(element=> {
      month.push(element.month)
      amount.push(element.amount);
          });
        this.state.month=month
        this.state.amount=amount
        console.log(month)
        console.log(amount)
        const Data = {
          labels: month,
          datasets:[
            {
              label:"collection",
              data:amount,
              backgroundColor:[
                       'rgba(255,105,145,0.6)',
                       'rgba(155,100,210,0.6)',
                       'rgba(90,178,255,0.6)',
                       'hsl(120, 100%, 75%)',
                       'rgba(240,134,67,0.6)',
                       'rgba(120,120,120,0.6)',
                       'rgba(250,55,197,0.6)',
                       'rgba(255, 0, 0, 0.3)',
                       'hsl(120, 60%, 70%)',
                       'hsl(120, 100%, 50%)',
                       'hsl(120, 100%, 25%)',
                  ]
            }
          ]
        }
        return (
          <div>
            <Pie
              data = {Data}
              options={{maintainAspectRatio: false}}
            />
          </div>
        )
  }
}
  render() {
    return(
      <div>
      <select id="select" onChange={(e)=>this.customerChangeHandler(e)}>
          <option value="">select partner</option>
          {this.state.customer.map((m ,index)=>
              <option key={m.id} value={m.customer}>
          {m.name}</option>
              )
          }
      </select>
      <select disabled={this.state.isNameselected} id="select" onChange={(e)=>this.setState({selectedYear:e.target.value})}>
          <option value="">select year</option>
          {this.state.yearList.map((m ,index)=>
              <option key={m.id} value={m.year}>{m.year}</option>
              )
          }
      </select>
      {(this.state.selectedName && this.state.selectedYear) ? (this.testrender()) : (null)}

      </div>
    )
  }
}
export default UserYearviceChart;
