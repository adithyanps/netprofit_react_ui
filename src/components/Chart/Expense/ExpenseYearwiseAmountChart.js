import React, { Component } from 'react';
import {Bar,Pie,Doughnut} from 'react-chartjs-2';
import axios from '../../../axios';

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

class SalesYearwiseIncomeChart extends Component {
   constructor(props) {
      super(props);
      this.state ={
        Data: {}
       }
  }
  componentDidMount() {
    axios.get('invoice/expense-year-chart/')
      .then(res=>{
        const customer = res.data;
        let year = []
        let amount = []
        customer.forEach(element => {
          year.push(element.year)
          amount.push(element.grant_total);
        });
        this.setState({Data: {
          labels: year,
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
        }})
      })
    }
   render()
   {
      return(
         <div style={styles}>
            <Doughnut
            data = {this.state.Data}

            options={{maintainAspectRatio: false}}/>

         </div>
      )
   }
}
export default SalesYearwiseIncomeChart;
